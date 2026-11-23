# Documentation — bansify.com

The official Bansify website: a Vite + React 19 single-page app that lists every Bansify
product, links each one to its live subdomain, and carries the shared account entry point.

| Document | Purpose |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Routes, components, data files, theme, account hook |
| [BUILD.md](BUILD.md) | Node/npm, scripts, environment variables, local run |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Cloudflare Pages, redirects, headers, DNS |
| [BRANDING.md](BRANDING.md) | The official logo, where it lives, how to use it |
| [SEO.md](SEO.md) | Meta tags, structured data, sitemap, canonical rules |
| [CONTENT.md](CONTENT.md) | Adding or editing a product, copy rules |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | Branch, commit and review rules |
| [../SECURITY.md](../SECURITY.md) | Reporting a vulnerability |
| [../CHANGELOG.md](../CHANGELOG.md) | Release history |

## Rules

1. **Assets are generated, not drawn.** The logo, favicons and social image all come from
   the master set in `Bansify/storage` — see [BRANDING.md](BRANDING.md).
2. **One responsibility per page.** Build steps stay in BUILD.md, SEO tags stay in SEO.md.
3. **No secrets here.** The site is static; anything sensitive belongs in the Worker, never
   in this repo.
4. **English only**, sentence case in the UI.
