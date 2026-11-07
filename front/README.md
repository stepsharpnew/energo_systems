# Энергосистемы — Nuxt 3 / Vue 3

```bash
npm ci --legacy-peer-deps
npm run dev
```

`npm run build` builds the server application; `npm run generate` creates the
static site in `.output/public` used by the nginx container.

## Service landings

The UPS (`/services/ups`) and diesel generator (`/services/dgu`) pages are Nuxt
routes composed from Vue components in `components/ups` and `components/dgu`.
Their page-specific styles live in `assets/styles`, and images in `public/ups`
and `public/dgu`. Keep page state and event handlers in Vue; files in
`public/services` must not shadow these routes with standalone HTML.

Both landings share `utils/landingLead.js` for phone formatting and acknowledged
lead submission, `composables/useLandingPage.js` for page lifecycle effects, and
`CallbackPreferences.vue` for callback scheduling. Campaign attribution and
call tracking are provided by the application plugins.

## Form regression checks

```bash
npm test
npm run generate
npx playwright install chromium
npm run test:forms
```

To use an existing Chromium installation, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chromium` for `test:forms`.
The browser tests use a local copy of the site and the real lead API validation,
with SMTP replaced by a test transport. No real emails are sent. They check
failed submissions, retries, confirmation messages, the destination mailbox,
and the interactive sections of the UPS and diesel generator pages.
