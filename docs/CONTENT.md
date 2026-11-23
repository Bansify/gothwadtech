# Content

All copy lives in data files, so adding a product is an edit, not a component change.

## Adding a product

1. **`src/data/apps.ts`** — add an entry: name, one-line description, subdomain, category,
   GitHub repo, icon. Keep the shape identical to the neighbours.
2. **`src/data/ecosystem.ts`** — add it to the group it belongs to (this drives the
   directory and the portal bar).
3. **`public/sitemap.xml`** — only if the product gets its own page on this site; a
   subdomain link does not need one.
4. Run `npm run verify`.

## Copy rules

- **Sentence case** for headings, buttons and nav labels.
- One line of description per product, no marketing superlatives ("fastest", "world's best")
  unless the claim is measurable and the source is linked.
- Say what the product **does**, not what it aspires to.
- No emojis in the UI. No exclamation marks.
- Every external link opens with `rel="noopener"`.

## Facts about the company

`src/data/companyData.ts` feeds the company page **and** the `Organization` structured data.
When a fact changes (founding year, contact address), change it once there.

## Images

- Product icons: square PNG, transparent or on `#0494F4`, at least 512×512.
- Never embed a screenshot of text where real text can be used — it hurts both SEO and
  translation.
- Keep total page weight low: images are the usual culprit on a subdomain hub page.
