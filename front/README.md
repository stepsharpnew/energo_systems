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

## Loading and accessibility

The first screen and section content are prerendered and stay visible without
JavaScript. Native scrolling and optional IntersectionObserver effects replace
the former global GSAP bootstrap. Route CSS is served as fingerprinted files;
only the small critical base layout is inline. Link prefetch runs on
interaction. ContactModal, ServiceModal, UPS/DGU callbacks and PhotoSwipe are
requested on first use.
Manifest-level prefetch is disabled as well as visibility-triggered link
prefetch. The shared DGU dialog lock stays in its own chunk so an async dialog
cannot absorb the page's SSR CSS entry. Generated-route tests verify required
stylesheets before hydration on every page.

The root layout and the six SVG icons are local components; Vuetify is no longer
loaded. Their geometry matches the previous production output, without adding a
new global CSS reset.

The head queues the initial Metrika hit with its original URL and referrer.
Metrika and Novofon load after a painted frame with a bounded idle deadline;
hidden tabs do not wait for animation frames. SPA hits are deduplicated, and
campaign attribution is captured independently of opening a form. Keep the
Novofon replacement veto installed before loading its SDK.

Responsive image metadata and previews are committed. To regenerate them from
the repository root after adding or changing source images:

```bash
uv run scripts/build-image-previews.py
```

The script pins Pillow, hashes image bytes and encoding settings into preview
URLs, preserves original files, and removes unused generated previews. Use
`imageAttrs`/`imageSource` from `utils/responsiveImage.js`; full gallery originals
are loaded only after opening PhotoSwipe. Width and height come from the static
manifest rather than eager browser downloads. Previews preserve embedded ICC
profiles so wide-gamut source logos retain their intended colors.

The three service landings self-host the original Manrope and PT Serif font
binaries under `public/fonts`, together with their OFL licenses. Their source
URLs and checksums are recorded in `data/fontManifest.json`. Keep the original
weights and Unicode ranges, and change the font URL when replacing a cached
binary. Only the first-screen Manrope subsets are preloaded; document fonts and
offscreen map widgets load when needed.

Browser regression tests cover keyboard focus, Escape, modal background
isolation, manual carousels, image requests and the existing lead flows. CI runs
the generated site through nginx and checks actual delivery headers with:

```bash
node scripts/check-static-delivery.mjs http://127.0.0.1:4173
```

Run the command above from the repository root against a frontend nginx server.
It verifies compression, cache lifetimes, server HTML, 404/410 responses and
campaign-preserving redirects. Do not measure Lighthouse against the dev server.
Use Lighthouse 13.6.0, three cold mobile runs with all SDKs enabled, and compare
medians. Novofon requires the configured production hostname and standard HTTPS
port; a localhost URL is unsuitable for validating its real initialization.
Vendor cache/cookie warnings are outside the frontend nginx configuration.

## Validation snapshot — 2026-11-08 (before the service-landing follow-up)

Production generation and all 52 unit, 70 browser and 15 deployment tests pass.
All 29 pages hydrate without errors and include their route CSS in server HTML.
Axe found no violations in 36 mobile/desktop and motion-preference contexts.
Keyboard, form retries, lazy galleries, campaign attribution, SPA hits, nginx
headers and visual comparisons are covered.

Lighthouse 13.6.0 used fresh Chromium 156 profiles and local HTTPS/HTTP2 nginx,
with the production hostname mapped only inside the test browser so both real
SDKs initialize normally. The table contains medians of three cold runs per
route and device profile. [Raw measurements and settings](performance-results.json)
are committed alongside the code. Public deployment and CrUX are not measured
by this local test.

| Route | Mobile Performance | LCP (s) | TBT (ms) | Desktop Performance | LCP (s) | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 86 | 1.67 | 559 | 100 | 0.41 | 24 |
| `/services` | 84 | 1.66 | 618 | 100 | 0.46 | 69 |
| `/services/hdd` | 89 | 2.11 | 397 | 100 | 0.60 | 50 |
| `/services/ups` | 83 | 2.86 | 488 | 100 | 0.69 | 51 |
| `/services/dgu` | 86 | 2.11 | 531 | 100 | 0.49 | 70 |
| `/services/road` | 90 | 0.80 | 429 | 99 | 0.39 | 88 |
| `/equipment` | 92 | 2.26 | 299 | 99 | 0.73 | 66 |
| `/equipment/ktp` | 91 | 0.91 | 368 | 100 | 0.50 | 39 |
| `/privacy` | 90 | 0.79 | 400 | 100 | 0.21 | 46 |

Accessibility and SEO are 100 throughout; CLS is below 0.001. Best Practices
remains 77 in both the baseline and optimized site because of third-party
cookie/DevTools issues. The homepage mobile baseline was Performance 76,
LCP 3.16s and TBT 573ms under the same local HTTPS/HTTP2 configuration.

**Remaining targets:** mobile Performance >=90 and TBT <=200ms are not met
across the site, and UPS LCP is 2.86s. On the homepage a Metrika task took 532ms
in the middle run; UPS also retains an initial rendering/processing bottleneck.
These results are not a claim that all performance targets have passed. All
analytics functions stay enabled, and no long timeout or click gate is used
to hide SDK work from the measurement. Recheck public delivery and real-user
metrics after release.

## Service-landing follow-up

HDD, UPS and DGU now serve responsive AVIF hero images with WebP fallbacks.
Lower sections keep their complete server HTML while `content-visibility: auto`
defers offscreen layout and painting. Visibility observers and sticky controls
avoid forcing those sections to render during startup. Native section links jump
directly so expanding deferred sections cannot move a smooth-scroll destination.
UPS keeps its power-loss
demonstration but skips large image-filter transitions on mobile.

The homepage and the three landings have fixed canonical URLs, sharing metadata
and structured data. UPS and DGU are linked from the service catalog and included
in the sitemap. Generated-route tests check canonical URLs, internal reachability
and sitemap coverage; browser tests cover deep links and keyboard access to
deferred contact forms. Browser suites run sequentially to avoid competing
Chromium instances producing navigation timeouts on smaller CI runners.

SCP overwrites files but does not remove deleted source files. Deployment now
retires the six obsolete plugins/style/static landing files before building the
replacement images. The regression fixture reproduces an upgrade over an older
upload and checks that current sources, application data and certificates survive.
Do not interpret a successful Git push as a successful release: verify the deploy
job and the public HTML before comparing new PageSpeed results.

Deployment upload uses the runner's native OpenSSH client with an eight-minute
workflow limit. When the server has rsync, checksum comparison and delta transfer
reuse existing files; progress and transfer statistics are logged, and 60 seconds
without data fails the transfer. Updates use private temporary directories and
delayed renames, preserving server data without a remote `--delete`.
Servers without rsync use a private archive verified with SHA-256, gzip and tar
before extraction. Only this run's temporary files are removed. Application
replacement still starts only after both images build successfully.
