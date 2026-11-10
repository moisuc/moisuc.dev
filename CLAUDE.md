# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- Astro 5 with `output: "server"` (SSR) deployed on Vercel. The adapter is imported from `@astrojs/vercel/serverless`.
- Tailwind **3** via `@astrojs/tailwind` (not the Tailwind 4 Vite plugin). Config is `tailwind.config.mjs` with `darkMode: "class"` and a custom palette, so use the custom colors and fonts, and `border-border` for borders (`border` is overridden as a color name).
- npm is the package manager.

## Verification

There are no lint or test scripts. Verify changes with `npm run build`.

## i18n (en / ro)

- English is served at `/` (`src/pages/index.astro`), Romanian at `/ro` (`src/pages/ro/index.astro`). Pages are duplicated per locale, not generated from a `[lang]` route, so a change to one page usually needs the same change in the other.
- All strings live in `src/i18n/translations.js` (plain JS, no type checking). Keep keys in sync by hand between `en` and `ro`. Some strings contain inline HTML.
- `src/middleware.js` runs only for `pathname === "/"`. It skips redirecting if a `preferred_lang` cookie exists. Otherwise it sends a 302 to `/ro` when the `x-vercel-ip-country` header is `RO` or `Accept-Language` starts with `ro`. The Vercel header doesn't exist in local dev.
- `LanguageSwitcher.astro` sets the `preferred_lang` cookie on click. Without it, Romanian visitors clicking EN would be redirected straight back to `/ro`. The click handler reads `e.target.dataset.lang`, so keep the link content plain text.
- Adding a locale means changing: `locales` in `astro.config.mjs`, a new `src/pages/<lang>/index.astro`, the middleware, and the language switcher.

## Env vars

`PUBLIC_WEB3FORMS_KEY` and `PUBLIC_TURNSTILE_SITE_KEY` are read by `ContactForm.astro`. They are `PUBLIC_`, so they are exposed to the client. The form posts directly to the Web3Forms API with Cloudflare Turnstile as captcha.
