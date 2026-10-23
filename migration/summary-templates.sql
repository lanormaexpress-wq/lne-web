begin;
create table if not exists public.summary_templates (
 id uuid primary key default gen_random_uuid(),
 course_id text not null check (length(course_id) between 1 and 150),
 name text not null check (length(btrim(name)) between 1 and 200),
 image_path text not null unique,
 created_at timestamptz not null default now(),
 created_by uuid not null references auth.users(id),
 is_active boolean not null default true,
 sort_order integer not null default 0
);
alter table public.summary_templates enable row level security;
grant select, insert, update, delete on public.summary_templates to authenticated;
create policy summary_templates_read on public.summary_templates for select to authenticated
 using (auth.jwt()->'app_metadata'->>'role' in ('owner','editor'));
create policy summary_templates_insert on public.summary_templates for insert to authenticated
 with check (auth.jwt()->'app_metadata'->>'role' = 'owner' and created_by = auth.uid());
create policy summary_templates_update on public.summary_templates for update to authenticated
 using (auth.jwt()->'app_metadata'->>'role' = 'owner')
 with check (auth.jwt()->'app_metadata'->>'role' = 'owner');
create policy summary_templates_delete on public.summary_templates for delete to authenticated
 using (auth.jwt()->'app_metadata'->>'role' = 'owner');
create index if not exists summary_templates_course on public.summary_templates(course_id, sort_order, created_at);
insert into storage.buckets(id,name,public,allowed_mime_types,file_size_limit)
 values ('summary-template-images','summary-template-images',false,array['image/webp'],4194304)
 on conflict (id) do nothing;
create policy summary_template_images_read on storage.objects for select to authenticated
 using (bucket_id='summary-template-images' and auth.jwt()->'app_metadata'->>'role' in ('owner','editor'));
create policy summary_template_images_insert on storage.objects for insert to authenticated
 with check (bucket_id='summary-template-images' and auth.jwt()->'app_metadata'->>'role'='owner'
 and (storage.foldername(name))[1]=auth.uid()::text);
create policy summary_template_images_delete on storage.objects for delete to authenticated
 using (bucket_id='summary-template-images' and auth.jwt()->'app_metadata'->>'role'='owner'
 and not exists (select 1 from public.summary_templates t where t.image_path=storage.objects.name));
commit;
