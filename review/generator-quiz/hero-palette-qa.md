# Hero quiz palette — 2026-09-22

The quiz now uses an opaque navy surface matching the HDD hero, with light text and orange actions. The white outer panel and nested frame were removed. Selection has both an orange border and a check mark; keyboard focus uses a separate pale-blue outline. Contact fields, summary, disabled controls, success and error colors use the same semantic palette.

## Contrast measurements

Colors were read from the embedded quiz's computed CSS variables in the local browser. Ratios use the WCAG sRGB relative-luminance formula. Pass/fail uses unrounded values; this table displays two decimals.

| Role | Foreground | Background | Ratio |
| --- | --- | --- | --- |
| Main text | `#f4f8fc` | `#102737` | 14.39:1 |
| Supporting text | `#b7c7d4` | `#102737` | 8.87:1 |
| Option label | `#f4f8fc` | `#18374b` | 11.67:1 |
| Hovered option label | `#f4f8fc` | `#214358` | 9.80:1 |
| Selected option label | `#f4f8fc` | `#263c48` | 10.80:1 |
| Primary button / check mark | `#102435` | `#ff7a42` | 6.12:1 |
| Hovered primary button | `#102435` | `#ff915e` | 7.14:1 |
| Disabled button text | `#b7c7d4` | `#2a4254` | 6.05:1 |
| Control boundary | `#6c8799` | `#18374b` | 3.30:1 |
| Hovered control boundary | `#9ab9ce` | `#214358` | 5.08:1 |
| Selected boundary | `#ff7a42` | `#263c48` | 4.45:1 |
| Focus outline / panel | `#a4ddff` | `#102737` | 10.51:1 |
| Progress fill / track | `#ff7a42` | `#355267` | 3.18:1 |
| Error message | `#ffc3b7` | `#462b31` | 8.33:1 |
| Summary labels / placeholders | `#b7c7d4` | `#18374b` | 7.19:1 |

All listed text pairs exceed 4.5:1; meaningful control indicators exceed 3:1. Decorative dividers do not identify controls. Disabled controls are exempt from the WCAG threshold but retain readable text here. Opaque surfaces prevent the background photograph from changing these ratios.

## Verification

- Desktop and 375 px mobile: inspected first step, selected answers, keyboard focus, contact summary, fields and footer actions. No horizontal overflow.
- At 768 and 1024 px, the layout and option labels also fit without horizontal overflow.
- Answer selection and back/next navigation retain values. All 11 existing generator quiz tests pass.
- Production generation passes: 56 prerendered routes. `git diff --check` passes.
- Progress animates with `transform`; reduced-motion preference disables transitions.
- Error color pairs were measured; delivery behavior is covered by existing mocked tests. No real lead was submitted.

## Sources

- [WCAG 2.2: text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2: non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [Material: color roles and paired foreground tokens](https://material-web.dev/theming/color/)
