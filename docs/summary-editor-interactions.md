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

## Flow semantics correction (2026-10-29)

Normal vertical movement is a nonnegative **leading margin**, not an absolute
coordinate or a painted translation. Following siblings reflow natively when
text, width, font or an inline image changes height. Reducing a previous drag
offset recovers the space; moving above the preceding flow requires free mode.
Square images retain native float exclusion and its existing wrap behavior.
Free text/images remain independent overlays: no follower chain or new snap.
Legacy `flowReserve` placeholders are not rendered, even if still present in
saved JSON. Opening/rendering does not migrate or persist any source changes.

The old 1150px visible minimum and 70px free-object tail are replaced with a
footer margin calculated **after** relative layout: actual main flow / visible
free-content bottom, then the existing 48px footer separation and 36px sheet
bottom padding. Logical drag bounds keep at least 1150px independently of the
short visible sheet. Empty free content and transparent free images do not
extend the page. Intentional visible free content at a large Y still does.
ResizeObserver batches text/image-size notifications via RAF and writes only
changed geometry; it never changes the model or issues save notifications.

Insertion UI uses one auxiliary absolute overlay, outside the content chain.
There are no leading/trailing gaps and no gaps adjacent to free/empty objects.
Only the actual boundary of two visible flow blocks exposes a control; it does
not select a block, affect bounds/height or enter readonly HTML/export.

Structured list markers are editable HTML spans. Deleting/changing one converts
only that item into a paragraph, retaining its content (and a typed replacement
symbol), other items and ordinary layout/style properties. Native lists in
cells/component bodies retain browser editing and existing toolbar commands.
No forced marker pseudo-element is introduced. Nested native lists get 1.5em
leading marker space, 6px trailing inset and .25em item spacing; frame padding
itself is unchanged. Explicit image widths now size the image, not only its
container; resizing uses the outer frame and a frozen inset, so actual height
growth/shrinkage propagates through the normal flow.

Specific checks: `tests/summary-flow-semantics-browser.cjs` covers A–N, wrap,
marker replacement, source immutability, an over-10,000px synthetic document,
a visible free object and an empty object at Y=30,000. Local fixtures block
non-read requests. Layout, interactions, global selection/typography, editorial
unit checks and basic Word/tools regressions are retained.

Changed resources use `20261029-flow-semantics-1`; stored publication HTML is
not rewritten or republished by this implementation.

Explicit historical document formatting intentionally remains different from the
defaults. Existing stored publication HTML requires its normal editorial update to
adopt freshly compiled markup. Subpixel font metrics can vary by browser/zoom.
Equal-spacing guides compare nearby, cross-axis-overlapping objects rather than
exhaustively comparing every possible object pair in a large document.
