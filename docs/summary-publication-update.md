# Actualización de resúmenes publicados

Implementación local de la Fase 2. No requiere roles ni estados nuevos. Reutiliza `summary_publish`.

- Autosave: PATCH del mismo `summary_documents`, manteniendo PUBLICADO; no cambia la copia pública.
- Acción explícita: `update_summary_publication(document_id, expected_updated_at)` comprueba permiso y versión, bloquea el documento y hace UPDATE del snapshot existente. Si falta, falla sin insertar.
- El ID de publicación sigue siendo el ID del documento; destino, cartilla e imagen se conservan.
- RLS permanece activado; anónimos y redactores no obtienen UPDATE de publicaciones.
- Se conserva el guard de retirada OWNER y el guard privado de permisos por acción.

## SQL aplicado mediante MCP

La CLI de Supabase no está instalada. Este es el SQL exacto aplicado, precedido por una validación con rollback; no se generó una migración CLI ni se hizo despliegue de código.

```sql
begin;
-- Existing non-published permissions are kept verbatim.
alter policy summary_documents_edit on public.summary_documents using (
 (((status <> 'PUBLICADO'::text) AND ( SELECT private.admin_allowed('summary_access'::text) AS admin_allowed) AND (( SELECT private.admin_allowed('owner'::text) AS admin_allowed) OR ((author_id = ( SELECT auth.uid() AS uid)) AND ( SELECT private.admin_allowed('summary_edit'::text) AS admin_allowed) AND ( SELECT private.admin_allowed('summary_save'::text) AS admin_allowed)) OR ((status = 'EN_REVISION'::text) AND (( SELECT private.admin_allowed('summary_review'::text) AS admin_allowed) OR ( SELECT private.admin_allowed('summary_publish'::text) AS admin_allowed)))))) or
 (status='PUBLICADO' and (select public.can_publish_summary()))
);
CREATE OR REPLACE FUNCTION public.summary_document_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare t public.summary_templates; publisher boolean := public.can_publish_summary();
begin
 if auth.uid() is null then raise exception 'Sesión requerida'; end if;
 if TG_OP='INSERT' then
  if new.author_id<>auth.uid() or new.status<>'BORRADOR' then raise exception 'Primer guardado debe ser BORRADOR del autor'; end if;
  new.created_at=clock_timestamp(); new.submitted_at=null; new.published_at=null; new.published_by=null;
 else
  if new.author_id<>old.author_id or new.author_label<>old.author_label or new.id<>old.id or new.created_at<>old.created_at then raise exception 'Autor e identidad inmutables'; end if;
  if old.status='PUBLICADO' then
   if new.status='PUBLICADO' then
    if not publisher then raise insufficient_privilege; end if;
    if new.template_id is distinct from old.template_id or new.area_id is distinct from old.area_id or new.course_id is distinct from old.course_id then
     raise exception 'La publicación conserva su destino y cartilla'; end if;
    if jsonb_array_length(new.content_lne->'bloques')=0 or length(btrim(new.preview_html))=0 then
     raise exception 'Falta contenido publicado'; end if;
    new.submitted_at=old.submitted_at; new.published_at=old.published_at; new.published_by=old.published_by;
    new.updated_at=clock_timestamp(); return new;
   end if;
   if not private.admin_allowed('owner') or new.status<>'BORRADOR' or exists(select 1 from public.summary_publications where id=old.id)
    or new.content_lne is distinct from old.content_lne or new.preview_html is distinct from old.preview_html or new.title is distinct from old.title
    or new.template_id is distinct from old.template_id or new.area_id is distinct from old.area_id or new.course_id is distinct from old.course_id then
    raise exception 'Publicado: edición no disponible';
   end if;
   new.submitted_at=null; new.published_at=null; new.published_by=null; new.updated_at=clock_timestamp(); return new;
  end if;
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
 new.updated_at=clock_timestamp(); return new;
end; $function$
;
CREATE OR REPLACE FUNCTION public.summary_snapshot_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare d public.summary_documents; t public.summary_templates;
begin
 if TG_OP='UPDATE' and new.id is distinct from old.id then raise exception 'Identidad de publicación inmutable'; end if;
 if not public.can_publish_summary() then raise exception 'Publicación no autorizada'; end if;
 select * into d from public.summary_documents where id=new.id and status='PUBLICADO';
 if not found then raise exception 'Documento no publicado'; end if;
 select * into strict t from public.summary_templates where id=d.template_id and is_active;
 new.template_id=t.id; new.area_id=d.area_id; new.course_id=d.course_id; new.title=d.title;
 new.template_name=t.name; new.image_path=t.image_path; new.preview_html=d.preview_html; new.published_at=d.published_at;
 return new;
end; $function$
;
-- Apply the same canonical-snapshot validation to explicit updates.
drop trigger summary_snapshot_guard on public.summary_publications;
create trigger summary_snapshot_guard before insert or update on public.summary_publications
for each row execute function public.summary_snapshot_guard();
grant update on public.summary_publications to authenticated;
create policy summary_publications_update on public.summary_publications
for update to authenticated
using ((select public.can_publish_summary()) and exists (
 select 1 from public.summary_documents d where d.id=summary_publications.id and d.status='PUBLICADO'
))
with check ((select public.can_publish_summary()) and exists (
 select 1 from public.summary_documents d where d.id=summary_publications.id and d.status='PUBLICADO'
));
-- Explicit action only: autosave never invokes this function.
create function public.update_summary_publication(document_id uuid, expected_updated_at timestamptz)
returns jsonb language plpgsql security invoker set search_path='' as $update_publication$
declare d public.summary_documents; changed integer;
begin
 if auth.uid() is null or not public.can_publish_summary() then raise insufficient_privilege; end if;
 select * into d from public.summary_documents where id=document_id and status='PUBLICADO' for update;
 if not found then raise exception 'Publicación no disponible'; end if;
 if d.updated_at is distinct from expected_updated_at then
  raise exception using errcode='40001',message='El documento fue modificado por otro guardado';
 end if;
 update public.summary_publications set preview_html=d.preview_html where id=d.id;
 get diagnostics changed=row_count;
 if changed<>1 then raise exception 'La publicación original no está disponible; no se creará otra'; end if;
 return to_jsonb(d);
end;
$update_publication$;
revoke all on function public.update_summary_publication(uuid,timestamptz) from public,anon;
grant execute on function public.update_summary_publication(uuid,timestamptz) to authenticated;
commit;
```

## Pruebas

`node --test tests/summary-publication-update.cjs tests/multer-patch.cjs tests/legal-source-sync.cjs`

`node tests/summary-workflow-browser.cjs` incluye reapertura PUBLICADO, autosave privado, F5 y actualización con el mismo ID y cartilla.

Las pruebas SQL de RLS usan claims simulados y transacción revertida. Deben distinguirse de las pruebas manuales con Supabase Auth real.
