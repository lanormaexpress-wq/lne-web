begin;
-- One final publication per visual card. Existing snapshots retain their document identity.
alter table public.summary_publications add column template_id uuid references public.summary_templates(id);
update public.summary_publications p set template_id=d.template_id from public.summary_documents d where d.id=p.id;
alter table public.summary_publications alter column template_id set not null;
alter table public.summary_publications add constraint summary_publications_card_unique unique(template_id);
create or replace function public.summary_snapshot_guard() returns trigger language plpgsql security invoker set search_path = '' as $$
declare d public.summary_documents; t public.summary_templates;
begin
 if not public.can_publish_summary() then raise exception 'Publicación no autorizada'; end if;
 select * into d from public.summary_documents where id=new.id and status='PUBLICADO';
 if not found then raise exception 'Documento no publicado'; end if;
 select * into strict t from public.summary_templates where id=d.template_id and is_active;
 new.template_id=t.id; new.area_id=d.area_id; new.course_id=d.course_id; new.title=d.title;
 new.template_name=t.name; new.image_path=t.image_path; new.preview_html=d.preview_html; new.published_at=d.published_at;
 return new;
end; $$;
create function public.can_create_summary_card() returns boolean language sql stable security invoker set search_path = '' as $$
 select auth.uid() is not null and coalesce((auth.jwt()->'app_metadata'->>'role' = 'owner' or
 (auth.jwt()->'app_metadata'->>'role' = 'editor' and auth.jwt()->'app_metadata'->'can_create_summary_card'='true'::jsonb)),false);
$$;
revoke all on function public.can_create_summary_card() from public,anon;
grant execute on function public.can_create_summary_card() to authenticated;
alter policy summary_templates_insert on public.summary_templates with check (
 (select public.can_create_summary_card()) and created_by=(select auth.uid()));
alter policy summary_template_images_insert on storage.objects with check (
 bucket_id='summary-template-images' and (select public.can_create_summary_card()) and (storage.foldername(name))[1]=(select auth.uid())::text);
alter policy summary_template_images_delete on storage.objects using (
 bucket_id='summary-template-images' and (
 ((select auth.jwt())->'app_metadata'->>'role')='owner' or
 ((select public.can_create_summary_card()) and (storage.foldername(name))[1]=(select auth.uid())::text))
 and not exists(select 1 from public.summary_templates t where t.image_path=storage.objects.name)
 and not exists(select 1 from public.summary_publications p where p.image_path=storage.objects.name));
commit;
