-- Live authorization: no person-specific IDs, no credentials, no legal content changes.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;
create table public.admin_user_permissions (
 user_id uuid primary key references auth.users(id) on delete cascade,
 profile text not null default 'custom' check (profile in ('owner','reviewer','writer','custom')),
 permissions jsonb not null default '{}' check (jsonb_typeof(permissions)='object'),
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null
);
alter table public.admin_user_permissions enable row level security;
revoke all on public.admin_user_permissions from anon, authenticated;
grant select,insert,update,delete on public.admin_user_permissions to authenticated;
grant all on public.admin_user_permissions to service_role;

create function private.admin_allowed(permission text) returns boolean
language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists (
  select 1 from auth.users u left join public.admin_user_permissions p on p.user_id=u.id
  where u.id=auth.uid() and (u.banned_until is null or u.banned_until<=now())
  and (u.raw_app_meta_data->>'role'='owner' or
   (permission not in ('owner','summary_delete_publication','users_create','users_edit','permissions_manage')
    and p.permissions->permission='true'::jsonb))
 );
$$;
revoke all on function private.admin_allowed(text) from public,anon;
grant execute on function private.admin_allowed(text) to authenticated;
create policy own_permissions_read on public.admin_user_permissions for select to authenticated
 using (user_id=(select auth.uid()) or (select private.admin_allowed('owner')));
create policy owner_permissions_write on public.admin_user_permissions for all to authenticated
 using ((select private.admin_allowed('owner'))) with check ((select private.admin_allowed('owner')));

-- Seed existing editors without silently granting new capabilities.
insert into public.admin_user_permissions(user_id,profile,permissions)
 select id,case when raw_app_meta_data->>'role'='owner' then 'owner' else 'custom' end,
 jsonb_build_object('legislation_access',exists(select 1 from public.permisos_editor e where e.user_id=u.id),
 'converter_access',exists(select 1 from public.permisos_editor e where e.user_id=u.id and e.puede_importar),
 'summary_access',raw_app_meta_data->'can_publish_summary'='true'::jsonb or raw_app_meta_data->'can_create_summary_card'='true'::jsonb,
 'summary_publish',raw_app_meta_data->'can_publish_summary'='true'::jsonb,
 'summary_cards_manage',raw_app_meta_data->'can_create_summary_card'='true'::jsonb)
 from auth.users u where raw_app_meta_data->>'role' in ('owner','editor');

create function private.admin_roster() returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
 if not private.admin_allowed('users_manage') then raise insufficient_privilege using message='Usuarios: acceso denegado'; end if;
 return (select coalesce(jsonb_agg(jsonb_build_object('id',u.id,'email',u.email,
 'name',coalesce(u.raw_user_meta_data->>'name',u.raw_user_meta_data->>'full_name',''),
 'role',u.raw_app_meta_data->>'role','profile',case when u.raw_app_meta_data->>'role'='owner' then 'owner' else coalesce(p.profile,'custom') end,
 'permissions',coalesce(p.permissions,'{}'), 'status',case when u.banned_until>now() then 'Bloqueado' when u.email_confirmed_at is null then 'Pendiente' else 'Activo' end,
 'last_sign_in_at',u.last_sign_in_at) order by u.created_at),'[]')
 from auth.users u left join public.admin_user_permissions p on p.user_id=u.id);
end; $$;
revoke all on function private.admin_roster() from public,anon;
grant execute on function private.admin_roster() to authenticated;
create function public.admin_list_users() returns jsonb language sql stable security invoker set search_path='' as $$ select private.admin_roster(); $$;
revoke all on function public.admin_list_users() from public,anon;
grant execute on function public.admin_list_users() to authenticated;

create function private.protect_last_owner() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if old.raw_app_meta_data->>'role'='owner' and (TG_OP='DELETE' or new.raw_app_meta_data->>'role' is distinct from 'owner' or new.banned_until>now()) then
  perform pg_advisory_xact_lock(194281,1);
  if not exists(select 1 from auth.users where id<>old.id and raw_app_meta_data->>'role'='owner' and (banned_until is null or banned_until<=now())) then
   raise exception 'No puedes eliminar, bloquear ni degradar al último OWNER';
  end if;
 end if;
 if TG_OP='DELETE' then return old; end if;
 return new;
end; $$;
revoke all on function private.protect_last_owner() from public,anon,authenticated;
create trigger protect_last_owner before update or delete on auth.users for each row execute function private.protect_last_owner();

create or replace function public.can_publish_summary() returns boolean language sql stable set search_path='' as $$
 select private.admin_allowed('summary_access') and private.admin_allowed('summary_publish'); $$;
create or replace function public.can_create_summary_card() returns boolean language sql stable set search_path='' as $$
 select private.admin_allowed('summary_access') and private.admin_allowed('summary_cards_manage'); $$;
revoke all on function public.can_publish_summary(),public.can_create_summary_card() from public,anon;
grant execute on function public.can_publish_summary(),public.can_create_summary_card() to authenticated;

drop policy summary_documents_read on public.summary_documents;
drop policy summary_documents_create on public.summary_documents;
drop policy summary_documents_edit on public.summary_documents;
create policy summary_documents_read on public.summary_documents for select to authenticated using (
 (select private.admin_allowed('summary_access')) and (author_id=(select auth.uid()) or
 (select private.admin_allowed('owner')) or (status in ('EN_REVISION','PUBLICADO') and
 ((select private.admin_allowed('summary_review')) or (select private.admin_allowed('summary_publish'))))));
create policy summary_documents_create on public.summary_documents for insert to authenticated with check (
 (select private.admin_allowed('summary_access')) and (select private.admin_allowed('summary_create'))
 and (select private.admin_allowed('summary_save')) and author_id=(select auth.uid()) and status='BORRADOR');
create policy summary_documents_edit on public.summary_documents for update to authenticated using (
 status<>'PUBLICADO' and (select private.admin_allowed('summary_access')) and
 ((select private.admin_allowed('owner')) or (author_id=(select auth.uid()) and
 (select private.admin_allowed('summary_edit')) and (select private.admin_allowed('summary_save'))) or
 (status='EN_REVISION' and ((select private.admin_allowed('summary_review')) or (select private.admin_allowed('summary_publish'))))))
 with check ((select private.admin_allowed('summary_access')));

-- Keep original validation trigger and add independent per-action authorization.
create function private.summary_action_guard() returns trigger language plpgsql set search_path='' as $$
begin
 if not private.admin_allowed('summary_access') then raise insufficient_privilege; end if;
 if TG_OP='UPDATE' then
  if new.status='PUBLICADO' and old.status<>'PUBLICADO' and not public.can_publish_summary() then raise insufficient_privilege; end if;
  if new.status='EN_REVISION' and old.status='BORRADOR' and not private.admin_allowed('summary_submit_review') then raise insufficient_privilege; end if;
  if (new.content_lne is distinct from old.content_lne or new.title is distinct from old.title or new.preview_html is distinct from old.preview_html or new.template_id is distinct from old.template_id)
   and not (private.admin_allowed('summary_edit') and private.admin_allowed('summary_save')) then raise insufficient_privilege; end if;
 end if;
 return new;
end; $$;
revoke all on function private.summary_action_guard() from public,anon,authenticated;
create trigger summary_action_guard before insert or update on public.summary_documents for each row execute function private.summary_action_guard();

drop policy summary_templates_read on public.summary_templates;
drop policy summary_templates_update on public.summary_templates;
drop policy summary_templates_delete on public.summary_templates;
create policy summary_templates_read on public.summary_templates for select to authenticated using ((select private.admin_allowed('summary_access')));
create policy summary_templates_update on public.summary_templates for update to authenticated using ((select public.can_create_summary_card())) with check ((select public.can_create_summary_card()));
create policy summary_templates_delete on public.summary_templates for delete to authenticated using ((select public.can_create_summary_card()));
drop policy summary_template_images_read on storage.objects;
create policy summary_template_images_read on storage.objects for select to authenticated using (bucket_id='summary-template-images' and (select private.admin_allowed('summary_access')));
-- Additional restrictions cannot widen any existing legislation grant.
create policy admin_legislation_access on public.articulos_legales as restrictive for all to authenticated
 using (estado='publicado' or (select private.admin_allowed('legislation_access')))
 with check ((select private.admin_allowed('legislation_access')));
create policy admin_norm_access on public.normas_legales as restrictive for all to authenticated
 using (estado='publicado' or (select private.admin_allowed('legislation_access')))
 with check ((select private.admin_allowed('legislation_access')));

-- Withdrawal is atomic and owner-only. The document remains editable as BORRADOR.
create function private.withdraw_summary(document_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare d public.summary_documents;
begin
 if not private.admin_allowed('owner') then raise insufficient_privilege; end if;
 select * into d from public.summary_documents where id=document_id for update;
 if not found or d.status<>'PUBLICADO' then raise exception 'Publicación no disponible'; end if;
 delete from public.summary_publications where id=document_id;
 -- The old immutable-publication guard is retained; a narrowly scoped trigger exception follows below.
 update public.summary_documents set status='BORRADOR',published_at=null,published_by=null,submitted_at=null where id=document_id;
end; $$;
revoke all on function private.withdraw_summary(uuid) from public,anon;
grant execute on function private.withdraw_summary(uuid) to authenticated;
create function public.withdraw_summary_publication(document_id uuid) returns void language sql security invoker set search_path='' as $$ select private.withdraw_summary(document_id); $$;
revoke all on function public.withdraw_summary_publication(uuid) from public,anon;
grant execute on function public.withdraw_summary_publication(uuid) to authenticated;
create policy admin_article_delete on public.articulos_legales as restrictive for delete to authenticated using ((select private.admin_allowed('owner')));
create policy admin_norm_delete on public.normas_legales as restrictive for delete to authenticated using ((select private.admin_allowed('owner')));
create policy admin_legacy_permissions on public.permisos_editor as restrictive for all to authenticated
 using (user_id=(select auth.uid()) or (select private.admin_allowed('owner')))
 with check ((select private.admin_allowed('owner')));
create or replace function public.summary_document_guard() returns trigger language plpgsql set search_path='' as $$
declare t public.summary_templates; publisher boolean := public.can_publish_summary();
begin
 if auth.uid() is null then raise exception 'Sesión requerida'; end if;
 if TG_OP='INSERT' then
  if new.author_id<>auth.uid() or new.status<>'BORRADOR' then raise exception 'Primer guardado debe ser BORRADOR del autor'; end if;
  new.created_at=clock_timestamp(); new.submitted_at=null; new.published_at=null; new.published_by=null;
 else
  if new.author_id<>old.author_id or new.author_label<>old.author_label or new.id<>old.id or new.created_at<>old.created_at then raise exception 'Autor e identidad inmutables'; end if;
  if old.status='PUBLICADO' then
   if not private.admin_allowed('owner') or new.status<>'BORRADOR' or exists(select 1 from public.summary_publications where id=old.id)
    or new.content_lne is distinct from old.content_lne or new.preview_html is distinct from old.preview_html or new.title is distinct from old.title
    or new.template_id is distinct from old.template_id or new.area_id is distinct from old.area_id or new.course_id is distinct from old.course_id then
    raise exception 'Publicado: edición no disponible';
   end if;
   new.submitted_at=null; new.published_at=null; new.published_by=null; new.updated_at=clock_timestamp(); return new;
  end if;
  if old.status='EN_REVISION' and new.status='BORRADOR' then raise exception 'El documento permanece EN_REVISION'; end if;
  if new.status='PUBLICADO' and (old.status<>'EN_REVISION' or not publisher) then raise exception 'Publicación no autorizada'; end if;
  new.submitted_at=old.submitted_at; new.published_at=old.published_at; new.published_by=old.published_by;
 end if;
 if new.template_id is not null then
  select * into t from public.summary_templates where id=new.template_id and is_active;
  if not found or t.course_id is distinct from new.course_id then raise exception 'Plantilla y curso incompatibles'; end if;
 end if;
 if new.status in ('EN_REVISION','PUBLICADO') then
  if new.area_id is null or new.course_id is null or new.template_id is null or jsonb_array_length(new.content_lne->'bloques')=0 or length(btrim(new.preview_html))=0 then raise exception 'Faltan contenido o destino'; end if;
  new.submitted_at=coalesce(new.submitted_at,clock_timestamp());
 end if;
 if new.status='PUBLICADO' then new.published_at=clock_timestamp(); new.published_by=auth.uid(); end if;
 new.updated_at=clock_timestamp(); return new;
end; $$;
