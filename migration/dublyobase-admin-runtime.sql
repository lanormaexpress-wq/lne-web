BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'lne_admin_runtime') THEN
        CREATE ROLE lne_admin_runtime NOLOGIN;
    END IF;
END;
$$;

GRANT USAGE ON SCHEMA lne_operational_20261111, proj_la_norma_express TO lne_admin_runtime;
GRANT SELECT ON lne_operational_20261111.normas_legales,
    lne_operational_20261111.articulos_legales, lne_operational_20261111.permisos_editor,
    lne_operational_20261111.summary_documents, lne_operational_20261111.summary_templates,
    lne_operational_20261111.summary_publications
    TO lne_admin_runtime;
GRANT SELECT, INSERT, UPDATE ON lne_operational_20261111.identity_directory,
    lne_operational_20261111.admin_user_permissions TO lne_admin_runtime;
GRANT INSERT ON lne_operational_20261111.summary_documents TO lne_admin_runtime;
GRANT UPDATE (title,content_lne,preview_html,area_id,course_id,template_id,updated_at,
    status,submitted_at,published_at,published_by)
    ON lne_operational_20261111.summary_documents TO lne_admin_runtime;
GRANT INSERT (id,template_id,area_id,course_id,title,template_name,image_path,preview_html,published_at),
    UPDATE (title,preview_html) ON lne_operational_20261111.summary_publications TO lne_admin_runtime;
GRANT UPDATE (numero_articulo,titulo,contenido,resumen,contenido_lne,estructura,orden,estado,
    actualizado_en,publicado_en,publicado_por) ON lne_operational_20261111.articulos_legales TO lne_admin_runtime;
GRANT SELECT (id,email,disabled_at), INSERT (email,email_normalized,verified,password_hash,token_key),
    UPDATE (password_hash,token_key,updated) ON proj_la_norma_express.users TO lne_admin_runtime;

CREATE OR REPLACE FUNCTION lne_operational_20261111.revoke_lne_credentials(target uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog AS $$
DECLARE lne_project uuid;
BEGIN
    SELECT id INTO STRICT lne_project FROM _dbo.projects WHERE slug='la_norma_express'
        AND schema_name='proj_la_norma_express';
    IF NOT EXISTS (SELECT FROM lne_operational_20261111.identity_directory WHERE id=target) THEN
        RAISE EXCEPTION 'Unknown La Norma Express account';
    END IF;
    UPDATE _dbo.sessions SET revoked_at=now()
        WHERE project_id=lne_project AND collection='users' AND user_id=target AND revoked_at IS NULL;
    UPDATE _dbo.auth_tokens SET used_at=now()
        WHERE project_id=lne_project AND collection='users' AND user_id=target
          AND type='password_reset' AND used_at IS NULL;
END;
$$;
REVOKE ALL ON FUNCTION lne_operational_20261111.revoke_lne_credentials(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION lne_operational_20261111.revoke_lne_credentials(uuid) TO lne_admin_runtime;

-- The application validates Dublyobase tokens and scopes editorial queries to their actor.
-- These policies apply exclusively to the dedicated backend role.
DO $$
DECLARE item record;
BEGIN
    FOR item IN SELECT * FROM (VALUES
        ('lne_operational_20261111','normas_legales'),
        ('lne_operational_20261111','articulos_legales'),
        ('lne_operational_20261111','permisos_editor'),
        ('lne_operational_20261111','summary_documents'),
        ('lne_operational_20261111','summary_templates'),
        ('lne_operational_20261111','summary_publications'),
        ('lne_operational_20261111','identity_directory'),
        ('lne_operational_20261111','admin_user_permissions'),
        ('proj_la_norma_express','users')
    ) AS t(schema_name, table_name) LOOP
        EXECUTE format('DROP POLICY IF EXISTS lne_admin_runtime_access ON %I.%I', item.schema_name, item.table_name);
        EXECUTE format('CREATE POLICY lne_admin_runtime_access ON %I.%I TO lne_admin_runtime USING (true) WITH CHECK (true)',
            item.schema_name, item.table_name);
    END LOOP;
END;
$$;

COMMIT;
