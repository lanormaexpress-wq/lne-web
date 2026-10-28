# Summary editor: reading defaults and visual interactions

## Scope and public reference

`legal-reading.css` centralizes the existing public lesson typography
(`data/clases/criterios-vinculacion.html`) and the public course modal's 48px
horizontal gutter. Public selectors retain their previous fallback values.
The editor, compiled Web view and newly rendered publications share these defaults:
Roboto 1.05rem / 400 / 1.8, #2b2b2b; Playfair Display headings (2.4/1.8/1.3rem).
The sheet remains 860px wide with 70px vertical and 48px horizontal padding.
Explicit saved document styles take precedence. Opening a document does not
rewrite its JSON, dimensions or saved positions. Previously persisted publication
HTML is not republished by this change.

## Selection, movement and guides

`js/interactions.js` computes the visible text/child/image rectangles, with 2
screen pixels of breathing room. A subtle 1px outline and 7px handles replace
the large wrapper outline. Groups use the union of their visible members.
Images and manual components retain their existing sizing model, not text autoheight.

Drag guides use the same visible rectangles. Peer geometry and distance references
are cached at gesture start; rendering is requestAnimationFrame-coalesced. Alignment
uses a 3-screen-pixel tolerance. Equal-gap references are searched independently on
each axis and labeled in unscaled document pixels. Guides are informational only:
the former magnetizing functions now return the pointer-driven coordinate unchanged.
The DOM overlay is editor-only and is excluded from exports and document storage.

Arrow keys move selected movable objects by 1px, or 10px with Shift. Text editing
and form controls keep normal caret navigation. Existing snapshot, state notification,
autosave and persistence mechanisms are reused. Groups preserve their internal
spacing and existing flow reserves when deliberately moved into absolute layout.

## Verification

- `node tests/summary-interactions-browser.cjs`: 18 requested cases, real Chromium
  drags and 92px/40px equal-gap labels, group mouse/keyboard, undo/redo, F5,
  editor/export computed-style comparison using an in-memory public lesson copy.
- `node admin-summary-editor/versions/2026-10-19/tests/editorial.cjs`.
- Existing `summary-layout-browser`, `summary-selection-browser`,
  `summary-tools-browser` and `summary-workflow-browser` regression suites.
- Browser tests use isolated local servers and simulated editorial APIs; they do
  not create Supabase accounts, publications, cartillas or Storage objects.
- Screenshots go outside Git through `LNE_VISUAL_OUTPUT` (or OS temporary storage).

## Limitations

Explicit historical document formatting intentionally remains different from the
defaults. Existing stored publication HTML requires its normal editorial update to
adopt freshly compiled markup. Subpixel font metrics can vary by browser/zoom.
Equal-spacing guides compare nearby, cross-axis-overlapping objects rather than
exhaustively comparing every possible object pair in a large document.
