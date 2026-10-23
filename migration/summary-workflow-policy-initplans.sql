begin;
alter policy summary_documents_read on public.summary_documents using (
 ((select auth.jwt())->'app_metadata'->>'role') in ('owner','editor') and
 (author_id=(select auth.uid()) or (select public.can_publish_summary())));
alter policy summary_documents_create on public.summary_documents with check (
 ((select auth.jwt())->'app_metadata'->>'role') in ('owner','editor') and author_id=(select auth.uid()) and status='BORRADOR');
alter policy summary_documents_edit on public.summary_documents using (
 status<>'PUBLICADO' and ((select auth.jwt())->'app_metadata'->>'role') in ('owner','editor') and
 (author_id=(select auth.uid()) or (select public.can_publish_summary()))) with check (
 ((select auth.jwt())->'app_metadata'->>'role') in ('owner','editor') and
 (author_id=(select auth.uid()) or (select public.can_publish_summary())));
commit;
