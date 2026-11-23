# Deployment

Hosted on **Cloudflare Pages** as the project behind `gothwadtech.pages.dev`, served on
**https://bansify.com** (apex, canonical) with `www` 301-redirecting to it.

## How a deploy happens

1. `npm run build` produces `dist/`.
2. Pages serves `dist/` at the project hostname; the custom domain `bansify.com` is attached
   to the project.
3. `public/_redirects` and `public/_headers` ship with the build and are applied by Pages.

## Redirects (`public/_redirects`)

| Rule | Why |
|---|---|
| `www.bansify.com/* → bansify.com/:splat` (301) | one canonical host, no duplicate indexing |
| `http://… → https://…` (301) | HTTPS only |
| `/about`, `/portfolio`, `/browser`, `/leadership`, `/legacy` (301) | old links keep working |
| `/* /index.html 200` | SPA fallback so deep links and refreshes never 404 |

Order matters: specific rules first, the SPA catch-all last. Pages serves real files
(`/favicon.ico`, `/assets/*`, `/manifest.json`) before the catch-all.

## Headers (`public/_headers`)

Sets HSTS (preload), `X-Content-Type-Options`, `X-Frame-Options: DENY`, a strict referrer
policy and a `Permissions-Policy` that disables camera, microphone, geolocation and payment.
Keep these when adding routes.

## Domains

| Host | Points at |
|---|---|
| `bansify.com` | the Pages project (apex, canonical) |
| `www.bansify.com` | CNAME to Pages, 301 to apex |
| `<app>.bansify.com` | each product's own project (accounts, mail, drive, browser, ai, store, …) |

The DNS zone lives in the Bansify Cloudflare account; every app subdomain is a proxied CNAME
to its Pages project.

## Release steps

1. Merge to `main` (or upload a build).
2. Confirm the Pages deployment finished.
3. Smoke-check: `https://bansify.com`, `/ecosystem`, a deep link refresh
   (`/products` reloaded directly), and `https://www.bansify.com` redirecting to apex.
4. If the logo or icons changed, hard-refresh once — favicons are cached aggressively by
   browsers even with cache-busting headers.

## Rollback

Pages keeps every deployment. Open the project, pick the previous deployment and promote it;
no rebuild needed.
