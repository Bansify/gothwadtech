# Bansify — Official Website

Official website for **Bansify** — India's sovereign software collective.

**Live:** https://bansify.com

## ✨ What this site is

- **Official portal:** Everything Bansify in one place. One Bansify Account unlocks Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser, Education, AI Studio, Docs and CEO.
- **Ecosystem directory:** All 25+ products with direct subdomain links (`{host}.bansify.com`), category filters and GitHub source links.
- **Product access hub:** Every card has a live “Open” button and a “Source” link — just like the Docs portal.
- **Same design language:** Matches `gothwadtech` (corporate) and `docs` (developer portal) repos — zinc + `#0494f4` brand, light/dark theme, responsive.

## 🗺️ Routes

| Path | Description |
|------|-------------|
| `/` | Home — hero + quick access + app shortcuts (search + category filter) |
| `/ecosystem` | Full product directory — all Bansify apps with direct links |
| `/products` | Sovereign flagships: Browser, GrixChat, Indogram + full catalog |
| `/solutions` | School ERP, restaurant POS, shop billing, custom enterprise & deep-tech |
| `/docs` | Developer documentation index (mirrors docs.bansify.com structure) |
| `/company` | About + leadership (Pawan Gothwad, Yuvkesh Meena, Vishnu) |
| `/contact` | Official inboxes + direct founder/leadership + WhatsApp/Phone |

Deep links and refreshes work via `_redirects` SPA fallback on Cloudflare Pages.

## 🎨 Assets

Moved from `Bansify/gothwadtech` repo per request:

- `public/assets/` root: `apple-touch-icon.png`, `favicon.ico`, `icon-192*.png`, `icon-512*.png`, `logo.png` (all PNG/icon images outside the two subfolders)
- `public/assets/brand/` + `public/assets/icons/` — kept as-is (two existing subfolders)
- `public/manifest.json`, `favicon.ico`, `logo.svg`, `robots.txt`, `sitemap.xml`, `_redirects`, `_headers`

## 🛠 Stack

- Vite 6 + React 19 + TypeScript 5
- Tailwind CSS 4 via `@tailwindcss/vite` (same as `gothwadtech` + `docs`)
- `lucide-react` icons, `motion` for micro-interactions

## 🚀 Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # → dist/
npm run preview  # serve built site
npm run typecheck
```

## 🔗 Ecosystem quick links

- Accounts: https://accounts.bansify.com
- Mail: https://mail.bansify.com
- Drive: https://drive.bansify.com
- Meet: https://meet.bansify.com
- Tube: https://tube.bansify.com
- GrixChat: https://grixchat.bansify.com
- Indogram: https://indogram.bansify.com
- Browser: https://browser.bansify.com
- Docs: https://docs.bansify.com
- CEO: https://ceo.bansify.com
- GitHub: https://github.com/Bansify

© 2026 Bansify Private Limited. Aatmanirbhar Bharat.
