# Security policy

## Scope

This repository is the static marketing site. The attack surface is small but real:

- injected markup or script in content data files
- unsafe `target="_blank"` links (must carry `rel="noopener"`)
- exposed environment values or keys
- misconfigured headers or redirects (`public/_headers`, `public/_redirects`)

The account session is issued and stored by the Accounts Worker on its own domain; this site
never holds a token. Report issues in the Accounts service against that repository.

## Reporting

**Do not open a public issue.** Email `gothwadtech@gmail.com` with the page, the steps and
the impact. Expect an acknowledgement within a few days.

## Supported

Only the current `main` deployment is supported.

## Secrets

- Nothing sensitive belongs in this repo or in `VITE_*` variables — everything prefixed
  `VITE_` is compiled into the public bundle.
- If a value leaks, rotate it first, then remove it from the history.
