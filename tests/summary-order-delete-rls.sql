-- Real Postgres/RLS tests with simulated JWT claims. Always rolled back.
begin;
set local statement_timeout='10s';
select set_config('request.jwt.claims','{"sub":"06e75511-e1ef-4f60-a534-8fbcf1503068","role":"authenticated"}',true);
set local role authenticated;
do $$
declare a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); c uuid:=gen_random_uuid();
 d uuid; original uuid[]; listed jsonb; item public.summary_documents; shared uuid;
begin
 insert into public.summary_templates(id,course_id,name,image_path,created_by) values
 (a,'__lne_order_delete_rollback__','LNE_ROLLBACK_1',auth.uid()||'/'||a||'/'||gen_random_uuid()||'.webp',auth.uid()),
 (b,'__lne_order_delete_rollback__','LNE_ROLLBACK_2',auth.uid()||'/'||b||'/'||gen_random_uuid()||'.webp',auth.uid()),
 (c,'__lne_order_delete_rollback__','LNE_ROLLBACK_3',auth.uid()||'/'||c||'/'||gen_random_uuid()||'.webp',auth.uid());
 original=array[a,b,c];
 if (select array_agg(sort_order order by sort_order) from public.summary_templates where course_id='__lne_order_delete_rollback__')<>array[1,2,3] then raise exception 'Append order failed'; end if;
 perform public.reorder_summary_templates('__lne_order_delete_rollback__',original,array[c,a,b]);
 if (select array_agg(id order by sort_order) from public.summary_templates where course_id='__lne_order_delete_rollback__')<>array[c,a,b] then raise exception 'Reorder failed'; end if;
 begin
  perform public.reorder_summary_templates('__lne_order_delete_rollback__',original,array[a,b,c]);
  raise exception 'Stale order accepted';
 exception when serialization_failure then null; end;
 foreach d in array original loop
  insert into public.summary_documents(id,title,area_id,course_id,template_id,author_id,author_label,content_lne,preview_html)
  values(d,'LNE_ROLLBACK','fundamentos','__lne_order_delete_rollback__',d,auth.uid(),'Rollback',
   '{"bloques":[{"tipo":"parrafo","texto":"Temporal"}]}','<p>Temporal</p>');
  update public.summary_documents set status='EN_REVISION' where id=d;
  update public.summary_documents set status='PUBLICADO' where id=d;
 end loop;
 listed=public.ordered_summary_publications('__lne_order_delete_rollback__');
 if array[(listed->0->>'id')::uuid,(listed->1->>'id')::uuid,(listed->2->>'id')::uuid]<>array[c,a,b] then raise exception 'Public order differs'; end if;
 -- Publication updates must not change card order, document IDs or card IDs.
 update public.summary_documents set title='LNE_ROLLBACK_EDITED' where id=c returning * into item;
 perform public.update_summary_publication(c,item.updated_at);
 if (select sort_order from public.summary_templates where id=c)<>1 then raise exception 'Publication reordered card'; end if;
 -- Shared card is retained when another draft points at it.
 shared=gen_random_uuid();
 insert into public.summary_documents(id,title,area_id,course_id,template_id,author_id,author_label,content_lne,preview_html)
 values(shared,'LNE_ROLLBACK_SHARED','fundamentos','__lne_order_delete_rollback__',a,auth.uid(),'Rollback','{"bloques":[]}','');
 select * into item from public.summary_documents where id=a;
 perform public.delete_summary_document(a,item.updated_at);
 if not exists(select 1 from public.summary_templates where id=a) then raise exception 'Shared card removed'; end if;
 if not exists(select 1 from public.summary_documents where id=shared) then raise exception 'Shared draft removed'; end if;
 select * into item from public.summary_documents where id=shared;
 perform public.delete_summary_document(shared,item.updated_at);
 -- Published and review deletion remove only their own rows.
 select * into item from public.summary_documents where id=b;
 perform public.delete_summary_document(b,item.updated_at);
 if exists(select 1 from public.summary_publications where id=b) or exists(select 1 from public.summary_documents where id=b) or exists(select 1 from public.summary_templates where id=b) then raise exception 'Published deletion incomplete'; end if;
 -- Preserve one target for denied role checks below.
 perform set_config('test.summary_delete_target',c::text,true);
 d=gen_random_uuid();
 insert into public.summary_documents(id,title,area_id,course_id,template_id,author_id,author_label,content_lne,preview_html)
 values(d,'LNE_ROLLBACK_REVIEW','fundamentos','__lne_order_delete_rollback__',c,auth.uid(),'Rollback','{"bloques":[{}]}','<p>Temporal</p>');
 update public.summary_documents set status='EN_REVISION' where id=d returning * into item;
 perform public.delete_summary_document(d,item.updated_at);
 if exists(select 1 from public.summary_documents where id=d) or exists(select 1 from public.summary_publications where id=d) then raise exception 'Review deletion incomplete'; end if;
 if not exists(select 1 from public.summary_templates where id=c) then raise exception 'Existing publication card removed'; end if;
end; $$;
reset role;
select set_config('request.jwt.claims','{"sub":"28518803-c84a-4594-bf01-41f896bfb76e","role":"authenticated"}',true);
set local role authenticated;
do $$ begin
 begin
  perform public.delete_summary_document(current_setting('test.summary_delete_target')::uuid,now());
  raise exception 'Writer delete allowed';
 exception when insufficient_privilege then null; end;
 begin
  perform public.summary_cleanup_tasks();
  raise exception 'Writer cleanup allowed';
 exception when insufficient_privilege then null; end;
end; $$;
reset role;
select set_config('request.jwt.claims','{"sub":"1862daab-ae6a-4ff1-8757-9a9b9c185d49","role":"authenticated"}',true);
set local role authenticated;
do $$ begin
 begin
  perform public.delete_summary_document(current_setting('test.summary_delete_target')::uuid,now());
  raise exception 'Reviewer delete allowed';
 exception when insufficient_privilege then null; end;
end; $$;
reset role;
select set_config('request.jwt.claims','{"role":"anon"}',true);
set local role anon;
do $$ begin
 if jsonb_array_length(public.ordered_summary_publications('__lne_order_delete_rollback__'))<>1 then raise exception 'Anonymous public catalog failed'; end if;
 begin
  perform public.delete_summary_document(gen_random_uuid(),now());
  raise exception 'Anonymous delete allowed';
 exception when insufficient_privilege then null; end;
end; $$;
reset role;
rollback;
