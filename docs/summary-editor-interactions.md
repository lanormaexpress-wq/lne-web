# Summary editor: reading defaults and visual interactions

## Scope and public reference

`legal-reading.css` centralizes the existing public lesson typography
(`data/clases/criterios-vinculacion.html`) and the public course modal's 48px
horizontal gutter. Public selectors retain their previous fallback values.
The editor, compiled Web view and newly rendered publications share these defaults:
Roboto 1.05rem / 400 / 1.8, #2b2b2b; Playfair Display content sections
(1.8/1.3/1.05rem). These are section/subsection styles, not the separate
document metadata header. The sheet is 1200px wide with 54px top, 48px horizontal
and 36px bottom padding, matching the public reading container.
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
Changed editor assets carry an explicit URL revision, so intermediary HTTP caches
cannot keep executing the previous selection implementation after deployment.
The resource preload manifest preserves those query strings and CSS resource types.

## Global layout/selection follow-up (2026-10-28)

The actual public `Criterios de Vinculación` viewer was measured before editing:
the `.curso-modal-content` width is capped at 1200px despite its 1280px width
declaration; 48px side padding and the scrollbar leave about 1089px usable at
the observed desktop viewport. Body: Roboto 16.8px, 400, 30.24px line-height,
normal letter-spacing, zero paragraph margins/padding. Content section: Playfair
Display 28.8px/700/51.84px, margin 0 0 20px, padding-bottom 8px; subsections:
20.8px and 16.8px. Captions: 13.6px/italic, 24.48px leading, 10px top margin.
Public strong/emphasis retain ordinary 700/italic. The public Ciencia Política
course was in preparation, so it was not treated as a non-existent font reference.

The editor's nominal usable width is now 1104px; its existing 14px block wrapper
insets leave approximately 1090px for a normal paragraph. No individual objects
or stored coordinates are expanded. Explicit widths/fonts/layout remain intact.
Canvas export, group wrapping/movement and fit zoom use the measured sheet width.
Tablet/mobile editor fit zoom keeps the same document geometry rather than
rewriting coordinates or changing line wrapping on viewport changes.

The small plus is an intentional `createInsertGap` insertion-menu button. Selection
no longer reveals adjacent insertion buttons; hovering a gap or opening its menu
still exposes the existing insertion workflow. Nothing was removed from the editor.

Blank pointer clicks clear single/group/copy selection. Object controls, editables,
toolbars, inspector, inputs and menus are excluded. Selection notifications do not
schedule local autosave; central workflow already ignores these same notification
types. Pending genuine content edits still save normally. No metadata, history or
document data is changed by deselection itself.

Changed resources, including state/app and shared reading tokens, use the
`20261028-global-3` URL revision. Service Worker already excludes private editor
routes; no PWA removal or broad cache clearing is necessary.

Arrow keys move selected movable objects by 1px, or 10px with Shift. Text editing
and form controls keep normal caret navigation. Existing snapshot, state notification,
autosave and persistence mechanisms are reused. Groups preserve their internal
spacing and existing flow reserves when deliberately moved into absolute layout.

## Verification

- `node tests/summary-interactions-browser.cjs`: 18 requested cases, real Chromium
  drags and 92px/40px equal-gap labels, group mouse/keyboard, undo/redo, F5,
  editor/export computed-style comparison using an in-memory public lesson copy.
- `node admin-summary-editor/versions/2026-10-19/tests/editorial.cjs`.
- `node tests/summary-global-layout-browser.cjs`: 13 follow-up cases, public
  section/paragraph computed styles and wrapping, inherited material fixture,
  explicit styling, no-save deselection, component/group coverage, insertion menu,
  toolbar/caret, F5, image render, new defaults and mobile fit.
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
