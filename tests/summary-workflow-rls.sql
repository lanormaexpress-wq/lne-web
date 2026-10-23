-- Safe integration fixtures: ALL identities, permissions and content roll back.
begin;
do $$ declare o uuid; w uuid:=gen_random_uuid(); r uuid:=gen_random_uuid(); t uuid:=gen_random_uuid(); d uuid:=gen_random_uuid(); x uuid:=gen_random_uuid(); blocked boolean:=false; begin
 select id into strict o from auth.users where raw_app_meta_data->>'role'='owner';
 perform set_config('test.owner',o::text,true); perform set_config('test.writer',w::text,true); perform set_config('test.reviewer',r::text,true);
 perform set_config('test.card',t::text,true); perform set_config('test.document',d::text,true); perform set_config('test.other',x::text,true);
 -- These are rollback-only DB fixtures, NOT usable Auth accounts (no password/identity/session).
 insert into auth.users(id,email,raw_app_meta_data) values(w,'rollback-writer@example.invalid','{"role":"editor"}'),(r,'rollback-reviewer@example.invalid','{"role":"editor"}');
 insert into public.admin_user_permissions(user_id,profile,permissions) values
 (w,'writer','{"summary_access":true,"summary_create":true,"summary_import":true,"summary_edit":true,"summary_save":true,"summary_submit_review":true}'),
 (r,'reviewer','{"summary_access":true,"summary_create":true,"summary_import":true,"summary_edit":true,"summary_save":true,"summary_submit_review":true,"summary_review":true,"summary_publish":true}');
 begin update auth.users set raw_app_meta_data=raw_app_meta_data||'{"role":"editor"}' where id=o; exception when others then
  if position('último OWNER' in sqlerrm)=0 then raise; end if; blocked:=true;
 end;
 if not blocked then raise exception 'Last owner demotion allowed'; end if;
 blocked:=false;
 begin delete from auth.users where id=o; exception when others then
  if position('último OWNER' in sqlerrm)=0 then raise; end if; blocked:=true;
 end;
 if not blocked then raise exception 'Last owner deletion allowed'; end if;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',o,'role','authenticated')::text,true);
end $$;
set local role authenticated;
do $$ declare t uuid:=current_setting('test.card')::uuid; x uuid:=current_setting('test.other')::uuid; begin
 if not private.admin_allowed('future_permission_not_yet_defined') then raise exception 'OWNER lost future access'; end if;
 perform public.admin_list_users();
 insert into public.summary_templates(id,course_id,name,image_path,created_by) values(t,'contratos','ROLLBACK',auth.uid()::text||'/'||t||'/'||gen_random_uuid()||'.webp',auth.uid());
 insert into public.summary_documents(id,title,author_id,author_label,content_lne) values(x,'PRIVATE OWNER DRAFT',auth.uid(),'OWNER','{"bloques":[{"texto":"private"}]}');
end $$;
do $$ begin perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.writer'),'role','authenticated','app_metadata',jsonb_build_object('role','owner','can_publish_summary',true))::text,true); end $$;
do $$ declare d uuid:=current_setting('test.document')::uuid; blocked boolean:=false; n int; begin
 if private.admin_allowed('owner') or public.can_publish_summary() or private.admin_allowed('legislation_access') or private.admin_allowed('converter_access') or private.admin_allowed('users_manage') then raise exception 'Writer privilege escalation'; end if;
 begin perform public.admin_list_users(); exception when insufficient_privilege then blocked:=true; end;
 if not blocked then raise exception 'Writer roster access'; end if;
 select count(*) into n from public.summary_documents where id=current_setting('test.other')::uuid; if n<>0 then raise exception 'Writer IDOR'; end if;
 blocked:=false;
 begin update public.admin_user_permissions set permissions='{"summary_publish":true}' where user_id=auth.uid(); if found then raise exception 'Self escalation'; end if; exception when insufficient_privilege then blocked:=true; end;
 insert into public.summary_documents(id,title,author_id,author_label,content_lne) values(d,'WRITER TEST',auth.uid(),'WRITER','{"bloques":[{"texto":"first"}]}');
 update public.summary_documents set title='WRITER SAVED' where id=d; if not found then raise exception 'Writer save denied'; end if;
 update public.summary_documents set area_id='civil',course_id='contratos',template_id=current_setting('test.card')::uuid,preview_html='<p>Test</p>',status='EN_REVISION' where id=d;
 update public.summary_documents set title='WRITER CORRECTED REVIEW' where id=d; if not found then raise exception 'Writer review edit denied'; end if;
 blocked:=false; begin update public.summary_documents set status='PUBLICADO' where id=d; exception when others then blocked:=true; end;
 if not blocked then raise exception 'Writer published'; end if;
 blocked:=false; begin perform public.withdraw_summary_publication(d); exception when insufficient_privilege then blocked:=true; end;
 if not blocked then raise exception 'Writer withdrew publication'; end if;
end $$;
do $$ begin perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.reviewer'),'role','authenticated')::text,true); end $$;
do $$ declare d uuid:=current_setting('test.document')::uuid; n int; denied boolean:=false; duplicate_doc uuid:=gen_random_uuid(); begin
 if not public.can_publish_summary() or private.admin_allowed('users_manage') or private.admin_allowed('legislation_access') or private.admin_allowed('converter_access') then raise exception 'Reviewer permissions'; end if;
 select count(*) into n from public.summary_documents where id=current_setting('test.other')::uuid; if n<>0 then raise exception 'Unrelated draft leaked to reviewer'; end if;
 update public.summary_documents set title='REVIEWER CORRECTED' where id=d; if not found then raise exception 'Reviewer cannot correct'; end if;
 update public.summary_documents set status='PUBLICADO' where id=d;
 select count(*) into n from public.summary_publications where id=d; if n<>1 then raise exception 'Atomic publication missing'; end if;
 update public.summary_documents set title='Forbidden published edit' where id=d;
 if found then raise exception 'Published document mutable'; end if;
 begin update public.summary_publications set title='Forbidden snapshot edit' where id=d; exception when insufficient_privilege then denied:=true; end;
 if not denied then raise exception 'Snapshot mutable'; end if;
 insert into public.summary_documents(id,title,author_id,author_label,content_lne) values(duplicate_doc,'DUPLICATE CARD TEST',auth.uid(),'REVIEWER','{"bloques":[{"texto":"second"}]}');
 update public.summary_documents set area_id='civil',course_id='contratos',template_id=current_setting('test.card')::uuid,preview_html='<p>Second</p>',status='EN_REVISION' where id=duplicate_doc;
 denied:=false;
 begin update public.summary_documents set status='PUBLICADO' where id=duplicate_doc; exception when unique_violation then denied:=true; end;
 if not denied then raise exception 'Same card published twice'; end if;
 if not exists(select 1 from public.summary_documents where id=duplicate_doc and status='EN_REVISION') then raise exception 'Failed publication not rolled back'; end if;
end $$;
set local role anon;
do $$ declare n int; denied boolean:=false; begin
 select count(*) into n from public.summary_publications where id=current_setting('test.document')::uuid; if n<>1 then raise exception 'Public cannot read publication'; end if;
 begin perform count(*) from public.summary_documents; exception when insufficient_privilege then denied:=true; end;
 if not denied then raise exception 'Private editor JSON public'; end if;
end $$;
reset role;
-- Revoke live permission WITHOUT changing JWT; the next request must deny it.
update public.admin_user_permissions set permissions=permissions||'{"summary_publish":false}' where user_id=current_setting('test.reviewer')::uuid;
set local role authenticated;
do $$ begin if public.can_publish_summary() then raise exception 'Stale JWT grants permission'; end if;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('test.owner'),'role','authenticated')::text,true);
 perform public.withdraw_summary_publication(current_setting('test.document')::uuid);
 if exists(select 1 from public.summary_publications where id=current_setting('test.document')::uuid) then raise exception 'Withdrawal still public'; end if;
 if not exists(select 1 from public.summary_documents where id=current_setting('test.document')::uuid and status='BORRADOR') then raise exception 'Withdrawal lost draft'; end if;
 if not exists(select 1 from public.summary_templates where id=current_setting('test.card')::uuid) then raise exception 'Withdrawal deleted card'; end if;
end $$;
rollback;
select 'PASS: OWNER, reviewer, writer, IDOR, forged/stale JWT, withdrawal, last-owner protection; all fixtures rolled back' as result;
