BEGIN;
SET LOCAL search_path = lne_operational_20261111, pg_catalog;
CREATE TABLE IF NOT EXISTS summary_template_images (
    path text PRIMARY KEY,
    content bytea NOT NULL CHECK (octet_length(content) BETWEEN 1 AND 4194304)
);
ALTER TABLE summary_template_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS lne_admin_runtime_access ON summary_template_images;
CREATE POLICY lne_admin_runtime_access ON summary_template_images TO lne_admin_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT ON summary_template_images TO lne_admin_runtime;
GRANT INSERT, DELETE, UPDATE (name, image_path, sort_order) ON summary_templates TO lne_admin_runtime;
COMMIT;
