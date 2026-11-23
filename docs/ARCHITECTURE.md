# Architecture

Static single-page app. No server rendering, no router library: `App.tsx` owns the current
page in state and keeps the URL in step with `history.pushState`.

## Routing

```text
ROUTES = home | ecosystem | products | solutions | docs | company | contact
```

- `pageFromPathname()` maps `window.location.pathname` to a page, falling back to `home`.
- `/u/<slot>/...` account-slot prefixes are stripped before the match, so a signed-in user
  can share the same URL.
- Navigation calls `pushState`; `popstate` re-reads the path, so back/forward work.
- Deep links survive a refresh because Cloudflare Pages serves `index.html` for every
  unmatched path (`public/_redirects`, last rule).

## Layout

```text
App.tsx
├── Navbar            brand mark, primary nav, theme switch, account entry
├── PortalBar         ecosystem strip (subdomain links)
├── page              Home | Ecosystem | Products | Solutions | Docs | Company | Contact
├── Breadcrumbs       on inner pages
└── Footer
```

Each page lives in `src/pages/`. Shared pieces live in `src/components/`
(`Logo`, `AppRow`, `AppShortcuts`, `Navbar`, `Footer`, `PortalBar`, `Breadcrumbs`).

## Data

Content is data, not markup:

| File | Holds |
|---|---|
| `src/data/apps.ts` | the product catalogue: name, description, subdomain, category, repo, icon |
| `src/data/ecosystem.ts` | ecosystem groupings used by the directory and the portal bar |
| `src/data/companyData.ts` | company facts used by the company page and the structured data |
| `src/config/brand.ts` | domain and Accounts URLs, all overridable with `VITE_*` variables |

Adding a product means editing `apps.ts` (and `ecosystem.ts` if it belongs to a group) —
no component change.

## Theme

`src/context/ThemeContext.tsx` provides light/dark; the palette is zinc plus the brand blue
`#0494f4`, applied through Tailwind 4 utilities in `src/index.css`. No inline hex in
components.

## Account

`src/hooks/useGothwadSession.ts` + `src/lib/gothwadSso.ts` read the shared
`.bansify.com` session from the Accounts Worker and expose the signed-in user to the
navbar. `src/lib/accountMenuWidget.ts` loads the central account menu from Accounts, so the
avatar menu is identical to the one in Mail, Drive and Store.

The site never stores a token itself: the session lives in HttpOnly cookies on the Accounts
domain.

## SEO surface

`index.html` carries the static meta tags and JSON-LD; `App.tsx` updates the per-route title,
description and breadcrumb structured data. Details in [SEO.md](SEO.md).
