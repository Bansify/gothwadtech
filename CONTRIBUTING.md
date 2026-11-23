# Contributing

## Before you start

- Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — pages are data-driven, so most content
  changes never touch a component.
- Run the site once: `npm install && npm run dev` (see [docs/BUILD.md](docs/BUILD.md)).

## Ground rules

1. **Assets come from the master set.** Never redraw the logo — see
   [docs/BRANDING.md](docs/BRANDING.md).
2. **No secrets in the repo.** This is a static site; anything sensitive belongs in a Worker.
3. **English only**, sentence case in the UI.
4. **One concern per pull request.** A content update and a layout refactor do not belong in
   the same PR.
5. **No dependency added for something the platform already does** (routing, theming,
   icons).

## Branches and commits

```text
main                    always deployable
feat/<short-name>       new page or feature
content/<short-name>    copy, product list, links
fix/<short-name>        bug fix
docs/<short-name>       documentation only
brand/<short-name>      logo, icons, social image
```

```text
feat(ecosystem): add the notes app to the directory
content: correct the Drive description
brand: apply the official logo to favicons and og:image
```

## Pull request checklist

- [ ] `npm run verify` passes (typecheck + build)
- [ ] new route added to `ROUTES`, `public/sitemap.xml` and the nav where it belongs
- [ ] links checked — every subdomain resolves
- [ ] screenshots for any visual change, light **and** dark theme
- [ ] docs updated in the same PR when behaviour changes
- [ ] no secrets, no generated `dist/`

## Review

Reviewers look for: correct data file rather than hard-coded markup, accessible names on
interactive elements, no layout shift from images without dimensions, and canonical/SEO tags
left intact.
