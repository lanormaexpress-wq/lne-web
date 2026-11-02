-- Applied by Supabase MCP, version 20261102125048 (CLI unavailable locally).
-- Additive transport optimization. Existing rows, triggers and RLS are unchanged.
-- Rollback: DROP FUNCTION public.save_summary_document_compact(uuid,timestamptz,jsonb,jsonb);
CREATE FUNCTION public.save_summary_document_compact(document_id uuid, expected_updated_at timestamptz, payload jsonb, reuse_images jsonb DEFAULT '[]'::jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE old_state jsonb; state jsonb := payload->'content_lne'; html text := payload->>'preview_html';
 ref jsonb; source text; idx integer; result jsonb;
BEGIN
 IF auth.uid() IS NULL THEN RAISE insufficient_privilege; END IF;
 IF jsonb_typeof(state->'bloques') IS DISTINCT FROM 'array' OR jsonb_array_length(state->'bloques')=0
    OR length(btrim(payload->>'title')) NOT BETWEEN 1 AND 300
    OR jsonb_typeof(reuse_images) IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'Contenido inválido'; END IF;
 -- RLS applies both to this read/lock and to the update; existing guards authorize all writes.
 SELECT content_lne INTO old_state FROM public.summary_documents
 WHERE id=document_id AND updated_at=expected_updated_at FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION USING ERRCODE='40001', MESSAGE='Versión del documento no disponible'; END IF;
 IF state->>'documentoId' IS DISTINCT FROM old_state->>'documentoId' THEN RAISE EXCEPTION 'Identidad del editor inmutable'; END IF;
 FOR ref IN SELECT value FROM jsonb_array_elements(reuse_images) LOOP
  IF ref->>'token' !~ '^__LNE_REUSE_IMAGE_[0-9]+__$' THEN RAISE EXCEPTION 'Referencia inválida'; END IF;
  SELECT b->'propiedades'->>'src' INTO source FROM jsonb_array_elements(old_state->'bloques') b WHERE b->>'id'=ref->>'id';
  SELECT (ordinality-1)::integer INTO idx FROM jsonb_array_elements(state->'bloques') WITH ORDINALITY b(value,ordinality)
   WHERE value->>'id'=ref->>'id' AND value->'propiedades'->>'src'=ref->>'token';
  IF source IS NULL OR idx IS NULL THEN RAISE EXCEPTION 'La imagen original no está disponible'; END IF;
  state=jsonb_set(state,ARRAY['bloques',idx::text,'propiedades','src'],to_jsonb(source),false);
  IF html IS NOT NULL THEN html=replace(html,ref->>'token',source); END IF;
 END LOOP;
 IF EXISTS(SELECT 1 FROM jsonb_array_elements(state->'bloques') b WHERE b->'propiedades'->>'src' LIKE '__LNE_REUSE_IMAGE_%') THEN
  RAISE EXCEPTION 'Referencia de imagen sin resolver';
 END IF;
 UPDATE public.summary_documents SET title=payload->>'title',content_lne=state,
  preview_html=CASE WHEN payload ? 'preview_html' THEN html ELSE preview_html END,
  area_id=payload->>'area_id',course_id=payload->>'course_id',template_id=(payload->>'template_id')::uuid
 WHERE id=document_id AND updated_at=expected_updated_at
 RETURNING jsonb_build_object('id',id,'title',title,'status',status,'updated_at',updated_at,
  'area_id',area_id,'course_id',course_id,'template_id',template_id,'author_id',author_id,'author_label',author_label,
  'submitted_at',submitted_at,'published_at',published_at,'published_by',published_by) INTO result;
 IF result IS NULL THEN RAISE EXCEPTION USING ERRCODE='40001',MESSAGE='Guardado no disponible'; END IF;
 RETURN result;
END;
$$;
REVOKE ALL ON FUNCTION public.save_summary_document_compact(uuid,timestamptz,jsonb,jsonb) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.save_summary_document_compact(uuid,timestamptz,jsonb,jsonb) TO authenticated;
