# SEO

The site is a static SPA, so the SEO surface is split in two: everything that can be static
lives in `index.html`; the per-route title, description and breadcrumbs are set from
`App.tsx` at navigation time.

## Static, in `index.html`

- `<title>`, `meta description`, `canonical` → `https://bansify.com/`
- Open Graph: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`,
  `og:image` (+ `secure_url`, `type`, `width`, `height`, `alt`), `og:locale`
- Twitter: `summary_large_image`, title, description, image
- `theme-color`, `color-scheme`, `application-name`
- Icon links: `favicon.ico`, 16/32/48 PNGs, `logo.svg`, Apple touch icon, `mask-icon`
- JSON-LD: `Organization`, `WebSite` (+ `SearchAction`), `WebPage`, `BreadcrumbList`,
  `ItemList` of products, `FAQPage` where the page shows an FAQ
- `<link rel="preload" as="image" href="/assets/brand/logo.png">` — the hero mark

## Per route, from `App.tsx`

`document.title`, the description meta, the canonical URL and the breadcrumb JSON-LD are
updated on every navigation. `ROUTES` is the single list of indexable pages:

```text
/  /ecosystem  /products  /solutions  /docs  /company  /contact
```

Adding a page means adding it to `ROUTES` **and** to `public/sitemap.xml`.

## Files in `public/`

| File | Purpose |
|---|---|
| `robots.txt` | allow all, points at the sitemap |
| `sitemap.xml` | one `<url>` per route, `changefreq`/`priority` set |
| `llms.txt` | a plain-text summary for AI crawlers |
| `humans.txt` | credits |
| `security.txt` | security contact |
| `manifest.json` | PWA name, colours, icon set |
| `opensearch.xml` | browser search entry |
| `browserconfig.xml` | Windows tile |

## Canonical rules

- One host: `https://bansify.com`. `www` 301s to it (`_redirects`).
- No trailing-slash variants: routes are extension-less paths.
- The SPA fallback returns `200` with `index.html`; the canonical tag tells crawlers which
  URL is the real one.

## Checklist after a content change

- [ ] new route added to `ROUTES`, `sitemap.xml` and the navbar/footer where it belongs
- [ ] title ≤ 60 characters, description 120–160
- [ ] `og:image` still 512×512 and reachable
- [ ] structured data still validates (Rich Results test)
- [ ] `robots.txt` still points at the sitemap
