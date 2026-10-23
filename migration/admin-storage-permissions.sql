-- Remove the final legacy JWT-owner branch from summary image deletion.
drop policy summary_template_images_delete on storage.objects;
create policy summary_template_images_delete on storage.objects for delete to authenticated using (
 bucket_id='summary-template-images' and
 ((select private.admin_allowed('owner')) or ((select public.can_create_summary_card()) and (storage.foldername(name))[1]=(select auth.uid())::text))
 and not exists(select 1 from public.summary_templates t where t.image_path=objects.name)
 and not exists(select 1 from public.summary_publications p where p.image_path=objects.name)
);
