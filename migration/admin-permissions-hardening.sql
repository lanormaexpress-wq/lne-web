create index admin_user_permissions_updated_by_idx on public.admin_user_permissions(updated_by);
-- Avoid a second permissive SELECT policy from FOR ALL.
drop policy owner_permissions_write on public.admin_user_permissions;
create policy owner_permissions_insert on public.admin_user_permissions for insert to authenticated with check ((select private.admin_allowed('owner')));
create policy owner_permissions_update on public.admin_user_permissions for update to authenticated using ((select private.admin_allowed('owner'))) with check ((select private.admin_allowed('owner')));
create policy owner_permissions_delete on public.admin_user_permissions for delete to authenticated using ((select private.admin_allowed('owner')));
