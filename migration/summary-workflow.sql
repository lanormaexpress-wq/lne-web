begin;
create function public.can_publish_summary() returns boolean language sql stable security invoker set search_path = '' as $$
 select auth.uid() is not null and (auth.jwt()->'app_metadata'->>'role' = 'owner' or
 (auth.jwt()->'app_metadata'->>'role' = 'editor' and auth.jwt()->'app_metadata'->'can_publish_summary' = 'true'::jsonb));
$$;
revoke all on function public.can_publish_summary() from public, anon;
grant execute on function public.can_publish_summary() to authenticated;
create table public.summary_documents (
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(btrim(title)) between 1 and 300),
 area_id text, course_id text, template_id uuid references public.summary_templates(id),
 author_id uuid not null references auth.users(id), author_label text not null,
 status text not null default 'BORRADOR' check(status in ('BORRADOR','EN_REVISION','PUBLICADO')),
 content_lne jsonb not null check(jsonb_typeof(content_lne)='object' and content_lne ? 'bloques' and jsonb_typeof(content_lne->'bloques')='array'),
 preview_html text not null default '',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 submitted_at timestamptz, published_at timestamptz, published_by uuid references auth.users(id),
 check(status='BORRADOR' or (area_id is not null and course_id is not null and template_id is not null and submitted_at is not null)),
 check((status='PUBLICADO') = (published_at is not null and published_by is not null))
);
create index summary_documents_author on public.summary_documents(author_id,status,updated_at desc);
create index summary_documents_status on public.summary_documents(status,updated_at desc);
create index summary_documents_template on public.summary_documents(template_id);
create index summary_documents_publisher on public.summary_documents(published_by);
alter table public.summary_documents enable row level security;
grant select,insert,update on public.summary_documents to authenticated;
create policy summary_documents_read on public.summary_documents for select to authenticated using (
 (select auth.jwt()->'app_metadata'->>'role') in ('owner','editor') and
 (author_id=(select auth.uid()) or (select public.can_publish_summary())));
create policy summary_documents_create on public.summary_documents for insert to authenticated with check (
 (select auth.jwt()->'app_metadata'->>'role') in ('owner','editor') and author_id=(select auth.uid()) and status='BORRADOR');
create policy summary_documents_edit on public.summary_documents for update to authenticated using (
 status<>'PUBLICADO' and (select auth.jwt()->'app_metadata'->>'role') in ('owner','editor') and
 (author_id=(select auth.uid()) or (select public.can_publish_summary()))) with check (
 (select auth.jwt()->'app_metadata'->>'role') in ('owner','editor') and
 (author_id=(select auth.uid()) or (select public.can_publish_summary())));

-- Immutable public snapshot: never expose editable JSON or author details anonymously.
create table public.summary_publications (
 id uuid primary key references public.summary_documents(id),
 area_id text not null, course_id text not null, title text not null,
 template_name text not null, image_path text not null,
 preview_html text not null, published_at timestamptz not null
);
create index summary_publications_course on public.summary_publications(course_id,published_at);
create index summary_publications_image on public.summary_publications(image_path);
alter table public.summary_publications enable row level security;
grant select on public.summary_publications to anon,authenticated;
grant insert on public.summary_publications to authenticated;
create policy summary_publications_read on public.summary_publications for select to anon,authenticated using(true);
create policy summary_publications_create on public.summary_publications for insert to authenticated with check (
 (select public.can_publish_summary()) and exists(select 1 from public.summary_documents d where d.id=summary_publications.id and d.status='PUBLICADO'));

create function public.summary_document_guard() returns trigger language plpgsql security invoker set search_path = '' as $$
declare t public.summary_templates; publisher boolean := public.can_publish_summary();
begin
 if auth.uid() is null then raise exception 'Sesión requerida'; end if;
 if TG_OP='INSERT' then
  if new.author_id<>auth.uid() or new.status<>'BORRADOR' then raise exception 'Primer guardado debe ser BORRADOR del autor'; end if;
  new.created_at=clock_timestamp(); new.submitted_at=null; new.published_at=null; new.published_by=null;
 else
  if old.status='PUBLICADO' then raise exception 'Publicado: edición no disponible'; end if;
  if new.author_id<>old.author_id or new.author_label<>old.author_label or new.id<>old.id or new.created_at<>old.created_at then raise exception 'Autor e identidad inmutables'; end if;
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
 new.updated_at=clock_timestamp();
 return new;
end; $$;
revoke all on function public.summary_document_guard() from public,anon,authenticated;
create trigger summary_document_guard before insert or update on public.summary_documents for each row execute function public.summary_document_guard();

create function public.summary_snapshot_guard() returns trigger language plpgsql security invoker set search_path = '' as $$
declare d public.summary_documents; t public.summary_templates;
begin
 if not public.can_publish_summary() then raise exception 'Publicación no autorizada'; end if;
 select * into d from public.summary_documents where id=new.id and status='PUBLICADO';
 if not found then raise exception 'Documento no publicado'; end if;
 select * into strict t from public.summary_templates where id=d.template_id;
 new.area_id=d.area_id; new.course_id=d.course_id; new.title=d.title;
 new.template_name=t.name; new.image_path=t.image_path; new.preview_html=d.preview_html; new.published_at=d.published_at;
 return new;
end; $$;
revoke all on function public.summary_snapshot_guard() from public,anon,authenticated;
create trigger summary_snapshot_guard before insert on public.summary_publications for each row execute function public.summary_snapshot_guard();
create function public.summary_publish_snapshot() returns trigger language plpgsql security invoker set search_path = '' as $$
begin
 if new.status='PUBLICADO' and old.status<>'PUBLICADO' then
  insert into public.summary_publications(id) values(new.id);
 end if;
 return new;
end; $$;
revoke all on function public.summary_publish_snapshot() from public,anon,authenticated;
create trigger summary_publish_snapshot after update on public.summary_documents for each row execute function public.summary_publish_snapshot();
-- Only images used by final publications become readable to anonymous visitors.
create policy summary_publication_images_read on storage.objects for select to anon,authenticated using (
 bucket_id='summary-template-images' and exists(select 1 from public.summary_publications p where p.image_path=storage.objects.name));
drop policy summary_template_images_delete on storage.objects;
create policy summary_template_images_delete on storage.objects for delete to authenticated using (
 bucket_id='summary-template-images' and (select auth.jwt()->'app_metadata'->>'role')='owner'
 and not exists(select 1 from public.summary_templates t where t.image_path=storage.objects.name)
 and not exists(select 1 from public.summary_publications p where p.image_path=storage.objects.name));
commit;
