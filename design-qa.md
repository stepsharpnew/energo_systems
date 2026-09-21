# Generator quiz — compact revision QA

Date: 2026-09-21. This report supersedes the initial visual acceptance: the user rejected the enlarged implementation as disproportionate to the page.

## Design target and evidence

- Preserve the supplied white/amber reference's card grid, selection treatment, progress line and rounded CTA, while correcting its scale for a normal page.
- Original source: `review/generator-quiz/reference.png` (1786 × 1268); user rejection screenshot: `/var/folders/qx/rcx5vmzj3jz7qtd6tgr1cpnr0000gn/T/codex-clipboard-4cc2a6c1-afa7-42bb-8abb-b45edcabdaed.png`.
- Current desktop: `review/generator-quiz/compact-desktop.png`, 1280 × 800 CSS/pixels, DPR 1. Both lights and heating selected.
- Before/after in one comparison input: `review/generator-quiz/compact-comparison.png`. The prior 1280 × 1100 capture is cropped to the same 1280 × 800 viewport height; both panes use identical 50% display scale. Scroll positions differ because the revised section fits into one viewport. No stretching or card-width normalization is used to hide the scale change.
- Current second step: `review/generator-quiz/compact-area.png`, 1280 × 800, 100–200 m² selected.
- Contact step: `review/generator-quiz/compact-contact.png`, 1280 × 800.
- Tablet: `review/generator-quiz/compact-tablet.png`, 768 × 1024.
- Mobile first step: `review/generator-quiz/compact-mobile.png`, 375 × 850, keyboard focus visible. Contact detail: `review/generator-quiz/compact-mobile-contact.png`, same viewport.
- Detail fidelity was checked directly in full-size desktop, contact and mobile screenshots; an additional enlarged crop was unnecessary because labels and controls are readable at 1×.

## Findings and corrections

1. **Resolved P1 — form scale dominated the page.** Earlier card height was 905.9 px at 1280 px viewport width. Removed 650 px minimum height, 80 px padding/footer spacing and oversized controls. New first-step card is 452.5 px high, second-step card 376.5 px. Content maximum width is 1000 px, options 66 px high, CTA 48 px high.
2. **Resolved P2 — heavy frame and typography.** Frame padding reduced from 22 to 7 px; progress from 8 to 3 px. Question is 26 px, labels 16 px, controls 15 px, with native 22 px selection markers and 16 px Material Design check icons. Section heading no longer has a forced line break.
3. **Resolved P2 — final step stacked all content vertically on desktop.** Summary and contact fields now share two columns; mobile retains a readable single-column layout.
4. **Resolved P2 — unnecessary page repositioning on each step.** Heading still receives focus, but scrolling occurs only if the card is outside the useful viewport.

An independent design review of `compact-desktop.png` found no material remaining desktop issues and recommended keeping the restrained treatment.

## Fidelity surfaces

- **Typography:** existing Arial/sans-serif retained; compact 32/26/16/14 px hierarchy. Mobile inputs stay 16 px to avoid iOS focus zoom.
- **Spacing/layout:** card fits a normal desktop viewport with its section heading. Two option columns at 768 px and above; single column below. No viewport overflow at 375, 768 or 1280 px.
- **Colors:** original amber `#f7aa33`, light selected fill `#fff9ef`, white card, warm-grey frame. Selection and focus do not rely on color alone.
- **Assets/icons:** existing Vuetify Material Design icons retained and scaled to the new controls. No new raster assets or decorative substitutes.
- **Copy:** questions, answers, summary, consent and submission text remain intact. No invented prices or claims.

## Verification

- Existing 11 quiz logic tests pass: `cd front && node --test tests/generatorQuiz.test.mjs`.
- Static production generation passes: `cd front && npm run generate` (56 prerendered routes; client and SSR builds pass).
- Browser verified choice selection, back/next retention, desktop contact summary, mobile name/phone/consent, pending state, mocked successful submission and restart.
- Keyboard Tab/Space and visible focus rechecked after resizing controls. Hidden mobile back-button text remains available as its accessible name.
- No new JavaScript or hydration errors observed. The pre-existing ScrollSmoother warning remains unrelated to the quiz.
- API and delivery behavior unchanged; all browser submissions use the local `/api/lead` mock. No live mail was sent.
- `git diff --check` passes.

No remaining P0/P1/P2 findings. Exact reference-font matching is not claimed; current site typography is retained. Previous screenshot artifacts remain available as revision history.

final result: passed

## KTP equipment quiz follow-up

The KTP questionnaire was subsequently redesigned as a compact selection-panel quiz. Its dedicated visual evidence, comparison, technical-field preservation checks and mocked submission results are recorded in [review/ktp-quiz/design-qa.md](review/ktp-quiz/design-qa.md). The generator implementation above remains unchanged by that follow-up.
