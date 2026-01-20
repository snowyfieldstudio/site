---
name: Tailwind Theme Tokens
overview: Add Tailwind v4 theme tokens for Inter/EB Garamond, colors, and typography utilities, and wire Next.js font variables for use in utility classes.
todos:
  - id: update-font-vars
    content: Update `layout.tsx` to use Inter/EB_Garamond vars
    status: pending
  - id: extend-theme
    content: Extend `globals.css` @theme tokens for fonts/colors/text sizes
    status: pending
  - id: body-font
    content: Set body default font to primary Inter
    status: pending
---

# Tailwind Theme Extension Plan

## Scope

- Wire Google fonts in the Next app and expose them as CSS variables via Tailwind v4 `@theme` so utility classes can be composed.
- Extend theme tokens for the two colors and typography sizes.

## Files to update

- [`/Users/brandon/dev/work/snowyfield/apps/web/src/app/layout.tsx`](/Users/brandon/dev/work/snowyfield/apps/web/src/app/layout.tsx): swap Google font imports to Inter + EB_Garamond, attach their `variable` classes on `<body>`.
- [`/Users/brandon/dev/work/snowyfield/apps/web/src/app/globals.css`](/Users/brandon/dev/work/snowyfield/apps/web/src/app/globals.css): extend `@theme inline` with `--font-primary`, `--font-secondary`, `--color-primary`, `--color-link`, and text-size tokens (`--text-headerXL`, `--text-labelXL`, `--text-body`), plus default body font to Inter.

## Implementation details

- Use Next font variables `--font-inter` and `--font-eb-garamond` on the `<body>` class list.
- Add Tailwind v4 tokens in `@theme inline` so utilities are available:
- `font-primary` / `font-secondary` via `--font-primary` / `--font-secondary`
- `text-headerXL`, `text-labelXL`, `text-body` via `--text-*` tokens
- `text-primary` / `text-link` colors via `--color-primary` / `--color-link`
- Keep utilities composable as requested (e.g., `font-secondary font-semibold italic text-labelXL`).

## Notes

- Existing font variables (`--font-geist-sans`, `--font-geist-mono`) will be removed from layout and theme unless still needed.
- I will apply spacing rules in JSX (two blank lines between sibling elements).
