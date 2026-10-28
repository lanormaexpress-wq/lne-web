# Sitemap availability

The public `/sitemap.xml` response never waits for Supabase. At process startup,
`lib/sitemap-cache.js` validates the deployable `lib/sitemap-seed.json` and any
newer runtime snapshot in the OS temporary directory, then builds XML, gzip and
ETags once. A failed refresh keeps the last valid snapshot. Only public URL and
lastmod metadata is persisted; page content and credentials are never saved.

Refresh starts 10 seconds after startup and repeats 5 minutes after completion.
It reuses the existing public catalog, publication filters, content thresholds
and canonical deduplication. Refreshes coalesce; successful results are validated
before activation and written using a temporary file plus rename. Disk failure
does not interrupt downloads. Timers do not keep the process alive.

Responses use `application/xml; charset=utf-8`, `Vary: Accept-Encoding`, a
representation-specific ETag and `Cache-Control: public, max-age=300`. gzip is
precomputed. HEAD and conditional GET work without database calls. Invalid child
sitemaps return 404. With no valid snapshot at all, the root returns a fast 503
with Retry-After rather than a misleading empty sitemap or SPA page.

There are currently 5,543 URLs (5,496 individual legal pages); one sitemap is well
below 50,000 URLs and 50 MiB. Above 10,000 entries the same module automatically
creates an index and versioned root-level child files, each with at most 10,000
entries. The previous in-memory version remains available during refresh.

Regenerate the deployable seed before future deployments when publishing changes:

```powershell
node scripts/generate-sitemap.cjs
node tests/sitemap-cache.cjs
node tests/public-seo.cjs
```

Generation uses only the existing publishable key and read-only public REST
catalog. Commit the resulting `lib/sitemap-seed.json`. Runtime refreshes do not
write Git or change publication states. The temporary runtime file survives a
process restart but is not guaranteed to survive container replacement; the
committed seed covers that case until the first successful refresh.

During a provider outage the URL list can remain older than five minutes. It
contains no private bodies; individual page publication checks remain unchanged.
Monitor Coolify logs for `[sitemap] Refreshed ... URLs in ...ms` or
`[sitemap] Refresh failed ... retaining last valid snapshot`.

Submit only `https://lanormaexpress.dpdns.org/sitemap.xml` in Search Console.
The submitted URL stays the same whether it contains a urlset or an index.
