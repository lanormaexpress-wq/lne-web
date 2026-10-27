-- Manual card order uses the existing summary_templates.sort_order.
-- Storage cannot participate in a Postgres transaction: this private outbox
-- records ONLY exclusive images detached by a successful document deletion.
begin;
create table private.summary_image_cleanup (
 id uuid primary key default gen_random_uuid(),
 document_id uuid not null,
 image_path text not null unique,
 created_at timestamptz not null default now()
);
alter table private.summary_image_cleanup enable row level security;
revoke all on private.summary_image_cleanup from public, anon, authenticated;

create function public.reorder_summary_templates(course text, expected_ids uuid[], ordered_ids uuid[])
returns void language plpgsql set search_path = '' as $$
declare actual uuid[];
begin
 if not public.can_create_summary_card() then raise insufficient_privilege; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('summary-order:' || course,0));
 select coalesce(array_agg(id order by sort_order,created_at,id),'{}'::uuid[]) into actual
 from public.summary_templates where course_id=course and is_active;
 if actual is distinct from expected_ids then
  raise exception using errcode='40001',message='El listado cambió. Recarga las cartillas.';
 end if;
 if cardinality(ordered_ids) is distinct from cardinality(actual)
  or (select count(distinct id) from unnest(ordered_ids) id) <> cardinality(actual)
  or not (ordered_ids @> actual and actual @> ordered_ids) then
  raise exception 'El orden debe contener exactamente las cartillas actuales';
 end if;
 update public.summary_templates t set sort_order=o.position
 from unnest(ordered_ids) with ordinality o(id,position)
 where t.id=o.id and t.course_id=course;
end; $$;
revoke all on function public.reorder_summary_templates(text,uuid[],uuid[]) from public,anon;
grant execute on function public.reorder_summary_templates(text,uuid[],uuid[]) to authenticated;

create function public.summary_template_append_order() returns trigger
language plpgsql set search_path='' as $$
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('summary-order:' || new.course_id,0));
 select coalesce(max(sort_order),0)+1 into new.sort_order
 from public.summary_templates where course_id=new.course_id;
 return new;
end; $$;
revoke all on function public.summary_template_append_order() from public,anon,authenticated;
create trigger summary_template_append_order before insert on public.summary_templates
for each row execute function public.summary_template_append_order();

-- Anonymous callers get only fields that are already publicly readable in
-- summary_publications, never private cards or drafts. No anonymous card policy.
create function private.ordered_summary_publications(course text) returns jsonb
language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_agg(jsonb_build_object('id',p.id,'title',p.title,
  'template_name',p.template_name,'image_path',p.image_path,'published_at',p.published_at)
  order by t.sort_order,t.created_at,t.id),'[]'::jsonb)
 from public.summary_publications p join public.summary_templates t on t.id=p.template_id
 where p.course_id=course;
$$;
revoke all on function private.ordered_summary_publications(text) from public;
revoke all on function private.ordered_summary_publications(text) from anon,authenticated;
create function public.ordered_summary_publications(course text) returns jsonb
language sql stable security definer set search_path='' as $$ select private.ordered_summary_publications(course); $$;
revoke all on function public.ordered_summary_publications(text) from public;
grant execute on function public.ordered_summary_publications(text) to anon,authenticated;

create function private.delete_summary_document(document_id uuid,expected_updated_at timestamptz)
returns jsonb language plpgsql security definer set search_path='' as $$
declare d public.summary_documents; t public.summary_templates; removed_card uuid; cleanup uuid;
begin
 if not private.admin_allowed('owner') then raise insufficient_privilege; end if;
 select * into d from public.summary_documents where id=document_id for update;
 if not found then raise exception 'Documento no disponible'; end if;
 if d.updated_at is distinct from expected_updated_at then
  raise exception using errcode='40001',message='El documento cambió. Recarga antes de eliminar.';
 end if;
 if d.template_id is not null then
  select * into t from public.summary_templates where id=d.template_id for update;
 end if;
 delete from public.summary_publications where id=d.id;
 delete from public.summary_documents where id=d.id;
 if t.id is not null
  and not exists(select 1 from public.summary_documents where template_id=t.id)
  and not exists(select 1 from public.summary_publications where template_id=t.id) then
  delete from public.summary_templates where id=t.id;
  removed_card=t.id;
  if not exists(select 1 from public.summary_templates where image_path=t.image_path)
   and not exists(select 1 from public.summary_publications where image_path=t.image_path) then
   insert into private.summary_image_cleanup(document_id,image_path) values(d.id,t.image_path)
   on conflict(image_path) do update set image_path=excluded.image_path returning id into cleanup;
  end if;
 end if;
 return jsonb_build_object('document_id',d.id,'status',d.status,'template_deleted',removed_card,'cleanup_id',cleanup);
end; $$;
revoke all on function private.delete_summary_document(uuid,timestamptz) from public,anon;
grant execute on function private.delete_summary_document(uuid,timestamptz) to authenticated;
create function public.delete_summary_document(document_id uuid,expected_updated_at timestamptz)
returns jsonb language sql set search_path='' as $$
 select private.delete_summary_document(document_id,expected_updated_at);
$$;
revoke all on function public.delete_summary_document(uuid,timestamptz) from public,anon;
grant execute on function public.delete_summary_document(uuid,timestamptz) to authenticated;

create function private.summary_cleanup_tasks(completed_id uuid default null) returns jsonb
language plpgsql security definer set search_path='' as $$
begin
 if not private.admin_allowed('owner') then raise insufficient_privilege; end if;
 -- A task is complete only if Storage confirms absence, or the path was reused:
 -- reused/shared files must be preserved rather than retried for deletion.
 delete from private.summary_image_cleanup c where c.id=completed_id and (
  not exists(select 1 from storage.objects o where o.bucket_id='summary-template-images' and o.name=c.image_path)
  or exists(select 1 from public.summary_templates t where t.image_path=c.image_path)
  or exists(select 1 from public.summary_publications p where p.image_path=c.image_path));
 return (select coalesce(jsonb_agg(jsonb_build_object('id',c.id,'image_path',c.image_path,
  'shared',exists(select 1 from public.summary_templates t where t.image_path=c.image_path)
   or exists(select 1 from public.summary_publications p where p.image_path=c.image_path)) order by c.created_at,c.id),'[]'::jsonb)
  from private.summary_image_cleanup c);
end; $$;
revoke all on function private.summary_cleanup_tasks(uuid) from public,anon;
grant execute on function private.summary_cleanup_tasks(uuid) to authenticated;
create function public.summary_cleanup_tasks(completed_id uuid default null) returns jsonb
language sql set search_path='' as $$ select private.summary_cleanup_tasks(completed_id); $$;
revoke all on function public.summary_cleanup_tasks(uuid) from public,anon;
grant execute on function public.summary_cleanup_tasks(uuid) to authenticated;
commit;
