# Residual Review Findings — feat/terminal-design-redesign

Source: `ce-code-review mode:agent` + `ce-work` implementation of
`docs/plans/2026-07-25-001-feat-terminal-design-redesign-plan.md`.
Recorded at HEAD `101bf74`. These are review/implementation residuals that were
**not** auto-applied — durable record, no tracker ticket required.

## Actionable (downstream-resolver)

- **[P2] Extract a shared `fu-page-header` partial** — `layouts/_default/taxonomy.html:2`
  (and 8 sibling templates: `terms.html`, `list.html`, `single.html`,
  `meetups.html`, `contact/list.html`, `authors/list.html`, `authors/single.html`,
  `blog/list.html`). The `fu-page-header` + breadcrumb + title + optional lead
  shell is duplicated across 9 templates; a markup change means editing all 9.
  *Deferred, not applied:* breadcrumb depth genuinely varies (single-crumb vs
  two-level for taxonomy/authors/single), so a partial needs a `crumbs` slice
  design and byte-for-byte output verification before landing. Both the simplify
  pass and code review flagged and consciously deferred it as a
  behavior-preservation risk not worth taking mid-pipeline. `blog/single.html`
  uses a deliberately different `fu-post-header` and must stay out of the shared
  partial.

## Proceeded-and-flagged (settled-decision conflict — KTD6) — RESOLVED

- **Interactive clubhouse hero images.** KTD6 (user-directed: full interactive
  hero incl. the two Gemini clubhouse images) is fully implemented. The source
  PNGs exceeded the Claude Design MCP `get_file` 256 KiB export cap, so the hero
  initially shipped with `banner.png` placeholders. **Resolved:** the user added
  `assets/images/clubhouse-outside.png` (exterior) and `clubhouse-inside.png`
  (interior); `layouts/index.html` now points at them and runs them through Hugo
  image processing (`.Resize "2400x webp q82"`), taking the 9.6MB/7.8MB sources
  down to ~482KB/~224KB WebP. The placeholder files were removed.

## Advisory / residual risks (informational — no action required)

- `layouts/partials/fu-image-url.html` falls back to the raw front-matter string
  when `resources.Get` misses. Correct for leading-slash paths (`/images/x.png`,
  all current content); a bundle-relative value would resolve page-relative.
- Nav active-state and some links assume root `baseURL` + single language
  (current config). Would need revisiting if served under a path prefix.
- Related-posts query excludes the current post by title equality; harmless
  (titles are unique; one published post today).
- No automated test harness exists (static Hugo site); verification is the
  production `hugo --minify` build + rendered-output assertions.
- Draft `content/english/blog/post-2.md` references `/images/image-placeholder.png`
  which is absent; unpublished (`draft: true`), pre-existing, not introduced here.

## Deferred follow-ups (from the plan)

- Brand favicon / OG-image refresh (no local SVG rasterizer available; existing
  Forge mark retained).
- Font-loading optimization (move `@import` in `colors_and_type.css` to
  preconnected `<link>`s).
