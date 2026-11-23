# Build

## Requirements

| Tool | Version |
|---|---|
| Node.js | 20 or newer |
| npm | 10 or newer |
| RAM | 4 GB+ (Tailwind 4's compiler is memory hungry) |

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server on http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production build into dist/
npm run preview      # serve dist/ on port 3000
npm run verify       # typecheck + build (use this before a PR)
```

`npm run build` is the gate that matters: it type-checks and produces the static bundle that
Pages publishes.

## Environment variables

All optional — the defaults point at production.

| Variable | Default | Effect |
|---|---|---|
| `VITE_APP_DOMAIN` | `bansify.com` | domain used for every subdomain link and the Accounts URLs |
| `VITE_ACCOUNTS_WEB_URL` | `https://accounts.<domain>` | where the account menu and sign-in links point |
| `VITE_ACCOUNTS_API_URL` | `https://api.<domain>` | Accounts API base for the session check |

Set them in a local `.env` file for a preview deployment; never commit real values.

## Output

```text
dist/
├── index.html
├── assets/            # hashed JS/CSS bundles
└── …                  # everything copied from public/ (icons, robots, sitemap, _headers)
```

`public/` is copied verbatim, so `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`,
`security.txt` and the icon set ship exactly as they are written.

## Known local issue

On a machine with ~2 GB RAM the Vite build can abort with
`WebAssembly.instantiate(): Out of memory` — that is Tailwind 4's compiler, not the site
code. Build on a larger machine or in CI.
