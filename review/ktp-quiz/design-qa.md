# KTP quiz — design and functional QA

Date: 2026-09-21. Route: `/equipment/ktp#equipment-request`.

## Design target

Apply the compact white/amber generator-quiz direction to the KTP technical questionnaire. Replace native dropdowns with directly visible selection panels, keep the engineering data, and avoid a long first screen. Existing page typography (Arial), hero, gallery and other equipment forms are retained.

- White `#ffffff`, ink `#23252a`, muted `#73767c`, light frame `#eeefec`, line `#e3e4e2`, amber `#f7aa33`.
- 1000 px maximum width; 7 px frame; 3 px progress; 25 px question, 15 px options, 14 px labels, 46 px buttons. Numeric quantities use a compact three-option row.
- Six short technical stages plus contacts. All 29 source fields and their original API labels/options remain available exactly once; no required fields are hidden in disclosures.
- Optional engineering details use native disclosures. The final screen shows a compact configuration summary, all submitted answers on demand, and contact fields beside it on desktop.

## Evidence

- `before.png`: previous form, 1280 × 900 viewport. Its large heading/stepper and first fields extend below the viewport.
- `desktop.png`: final first step, 1280 × 900; frame is 1000 × 538.54 CSS px. Two transformers and insulated panels selected.
- `comparison.png`: before/after at the same 50% image scale. Scroll positions differ; no card-size normalization or stretching is used.
- `connection.png`, `transformers.png`, `contact.png`: later stages, 1280 × 900.
- `tablet.png`: first step, 768 × 1024, two material columns.
- `mobile.png`: final first step, 375 × 850, single material column, 343 × 698.48 CSS px frame.
- `mobile-contact.png`: contact fields and summary at 375 × 850; input text is 16 px, preventing iOS focus zoom.
- `preview.png`: mechanical crop of the final desktop card for convenient review.

Full-size screenshots were inspected. The combined comparison is an overview; native-size mobile captures and DOM measurements were used to check label legibility and overflow.

## Corrections during review

1. Reduced the initial draft's first card from 599 to 539 px by removing a redundant stage label and tightening panels/spacing.
2. Kept the quantity control in one compact row on phones, reducing first-step height from 818 to 698 px.
3. Fixed wrapping of “Другое” in the narrow quantity tile. All three final quantity labels fit without clipping.
4. Optional details are collapsed initially; selecting them does not force a step transition. Returning to previous stages retains both main and optional answers.

## Verification

- 20 tests passed (`node --test tests/*.test.mjs`): 9 new KTP tests plus 11 generator regression tests.
- Coverage includes original field completeness, required-step guards, custom transformer counts, back navigation, string-valued numeric answers for the existing API, contact validation, consent, duplicate submission prevention, HTTP 429/500, network errors, negative acknowledgements, retry and reset.
- Browser walked all seven stages, entered optional corridor/HV fields, checked the summary and captured the actual `/api/lead` payload (16 correctly labelled answers, product `КТП`, Russian phone mask, consent version `2026-07-13`).
- Browser verified missing-consent validation, HTTP 429, network failure, pending-state disabled controls, success after `{ ok: true }`, and complete reset. Exactly three test requests: 429, network failure, success. No emails were sent.
- Keyboard Space/ArrowRight/Tab works with native radio inputs; visible focus surrounds the whole panel. Step headings receive focus; scrolling respects the fixed navigation area.
- No horizontal overflow at 375, 768 or 1280 px; material panels stack on small phones, contacts stack below 768 px.
- `npm run generate` passed, including client/SSR bundles and 56 prerendered routes. `git diff --check` passed.
- During regeneration an already-open preview reported stale prefetch payload warnings; these came from rebuilding the local static output while it was being served. Final clean reload checked separately for hydration errors.

## Limits

This is the technical-request flow, with no automatic sizing or price calculation. Real SMTP delivery was intentionally not exercised; the existing production API contract is preserved. Expanded optional sections can be long, but users open them explicitly. Values live only in component memory for the current page visit.

Final result: passed.
