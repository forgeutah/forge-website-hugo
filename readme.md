# Forge Utah Foundation — Website

The website for **Forge Utah Foundation**, a volunteer-run, not-for-profit community for Utah's developers, data scientists, SREs, and tinkerers. It's the home for our meetups, roundtables, hack nights, and the Go West Conference — no sponsors pushing product, no recruiter pitches, just people who build things showing each other how.

Built with [Hugo](https://gohugo.io/) and a custom dark-only "terminal" design system.

---

## Tech stack

- **[Hugo](https://gohugo.io/) (Extended)** — static site generator. The [hugoplate](https://github.com/zeon-studio/hugoplate) theme is pulled in as a Hugo module base (SEO partials, search index, module plumbing); the entire visual layer is overridden by our own layouts and CSS.
- **Custom terminal design system** — hand-written CSS in `assets/css/forge/` and vanilla JS in `assets/js/forge.js`. Dark-only. No framework runtime.
- **Go modules** — the theme and its dependencies are managed via `go.mod`.
- **PostCSS + PurgeCSS + Tailwind** — from the theme base; most of the site's look is the custom `fu-*` CSS, not utility classes.

---

## Getting started

### Prerequisites

- **Hugo Extended** `0.118.2+` (CI pins `0.118.2`)
- **Node** `18+`
- **Go** `1.20+`

### Run it locally

```bash
npm install
npm run dev          # hugo server at http://localhost:1313
```

If `themes/hugoplate` is missing (fresh clone that didn't fetch modules), run `npm run project-setup` once first — this is what CI does on every build.

### Build

```bash
npm run build        # hugo --gc --minify -> ./public
```

Useful scripts (see `package.json`): `npm run preview` (production-mode server), `npm run format` (Prettier), `npm run update-modules`.

---

## Project structure

```text
content/english/          # all site content
  _index.md               #   homepage (hero, community cards, about, calendar — data-driven front matter)
  meetups/                #   meetups content section (one leaf bundle per meetup)
  blog/                   #   blog posts
  pages/                  #   standalone pages (about, roundtables, gowest, contact, ...)
  authors/                #   blog author profiles
layouts/                  # templates that override the theme
  meetups/                #   list.html (grouped landing) + single.html (per-meetup SEO page)
  blog/, authors/, _default/, partials/, shortcodes/
  partials/fu-nav.html    #   main nav (hardcoded, not menu-config driven)
  partials/fu-footer.html
assets/
  css/forge/              # the design system
    colors_and_type.css   #   design tokens (colors, fonts) + @font imports
    kit.css               #   vendored component styles (buttons, cards, nav, grids)
    site.css              #   project overrides (hero, dropdown, mobile menu, prose, chips)
  js/forge.js             # nav dropdown, mobile menu, interactive hero — no dependencies
data/                     # theme.json, social.json
config/_default/          # hugo.toml lives at root; params, menus, modules here
docs/plans/               # implementation plans (Compound Engineering workflow)
```

Key config: `hugo.toml` (site title, baseURL, outputs, permalinks), `config/_default/params.toml` (Slack invite, calendar link, SEO), `config/_default/menus.en.toml` (used for the footer; the desktop nav is hardcoded in `fu-nav.html`).

---

## Editing content

### Add or update a meetup

Each meetup is a Hugo **leaf bundle** at `content/english/meetups/<slug>/index.md`. The list page groups meetups into **Graduated** (established) and **Incubating** (newer pilots); each meetup gets its own SEO landing page at `/meetups/<slug>/`.

```yaml
---
title: "Utah Go User Group"
meta_title: "Utah Go User Group — Forge Utah meetup"   # <title> / OG
description: "One-line summary — used for the SEO meta and the detail-page lead."
slug: "utah-go"
status: "graduated"          # graduated | incubating  (anything not "incubating" -> Graduated)
weight: 10                   # ordering within its group (ascending)
meetup_host: "meetup.com/utahgophers"                  # display label on cards + the Visit button
meetup_url: "https://www.meetup.com/utahgophers/"      # external link
slack_channel: "#utah-go"                              # optional
slack_channel_url: "https://forgeutah.slack.com/..."   # optional — makes the Slack channel clickable
organizers:                  # optional; each may be a plain name OR a map
  - "Jane Doe"
  - name: "John Roe"
    slack: "@john"                                       # optional handle text
    slack_url: "https://forgeutah.slack.com/team/U0..."  # optional -> links the Slack line
    image: "john.jpg"                                    # optional avatar file in this meetup's folder
draft: false
---

Markdown body here becomes the indexable SEO copy on the detail page —
describe the audience, cadence, and what to expect.
```

To retire a meetup, delete its folder. To move it between groups, change `status`. Organizer avatars are optional; drop an image file into the meetup's folder and reference it by filename.

### Add a blog post

Create a Markdown file in `content/english/blog/` with standard front matter (`title`, `date`, `description`, `image`, `categories`, `tags`, `author`). See `content/english/blog/` for examples.

### Homepage & nav

The homepage is data-driven from the front matter of `content/english/_index.md` (hero, community cards, about, calendar sections). The main navigation is hardcoded in `layouts/partials/fu-nav.html`.

---

## Design system notes

The look is a deliberate dark, terminal-inspired aesthetic. When building new UI, **reuse the existing `fu-*` components** (`fu-btn`, `fu-mission-card`, `fu-container`, `fu-eyebrow`, `fu-cta`, etc.) and design tokens (`var(--fg-max)`, `var(--accent)`, `var(--forge-ember)`, `var(--font-mono)`, …) rather than reaching for Tailwind utilities or raw hex — the tokens live in `assets/css/forge/colors_and_type.css`. New classes must be referenced in templates so they survive PurgeCSS.

---

## Deploy

Deploy configs are checked in for **Netlify** (`netlify.toml`), **AWS Amplify** (`amplify.yml`), **Vercel** (`vercel.json` / `vercel-build.sh`), and **GitLab CI** (`.gitlab-ci.yml`). All pin **Hugo Extended 0.118.2** and **Go 1.20.5**, and build with `project-setup` (fetch theme module) followed by `hugo --gc --minify` to `public/`.

---

## Contributing

Forge is a community project — contributions are welcome. Work on a feature branch and open a pull request against `main`. Come find us on **[Slack](https://join.slack.com/t/forgeutah/shared_invite/zt-pietaeqb-HetfD2OIzn1RHtDtV~CH5g)** to say hi, pitch a blog post, or ask about helping organize a meetup.

---

## License

The site code is released under the [MIT](LICENSE) license (inherited from the hugoplate theme base). Forge Utah Foundation branding, imagery, and written content are © Forge Utah Foundation and are not covered by that license.
