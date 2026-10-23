begin;
create or replace function public.can_publish_summary() returns boolean language sql stable security invoker set search_path = '' as $$
 select auth.uid() is not null and coalesce((auth.jwt()->'app_metadata'->>'role' = 'owner' or
 (auth.jwt()->'app_metadata'->>'role' = 'editor' and auth.jwt()->'app_metadata'->'can_publish_summary' = 'true'::jsonb)),false);
$$;
commit;
