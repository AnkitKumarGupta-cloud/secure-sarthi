# Secure Sarthi: independent LIC insurance advisory site

A responsive multi-page site (React, TypeScript, Tailwind, Framer Motion) with a page for each LIC plan: Tech Term, New Endowment, New Money Back (20 years), Jeevan Akshay VII and Amritbaal. Plan text is written in original words from public information; the LIC brochure is the final authority. The footer and About page carry the line that this is an independent advisory, not an official LIC site.

Contact details live in `src/data/content.ts` (`BRAND`). Plan content lives in `src/data/planPages.ts`.

## Run it

```bash
npm install
npm run dev            # local dev server
npm run build          # type-check + production build in dist/
npm run build:artifact # one self-contained HTML page in artifact/ (React loads from a CDN, images are inlined)
```

Requires Node 18+.

## Stack

React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide icons · Vite 5.

## Artwork

All illustrations (hero, five plan cards, calculator, office building, six avatars) are generated 3D images
stored as transparent WebP in `src/assets/img/`. `src/data/images.ts` maps names to URLs; Vite hashes them in
the normal build and inlines them in the single-file build. Two kinds of motion are layered on top, both
disabled for `prefers-reduced-motion`: a slow CSS float and mouse parallax on the hero.

To swap an image, replace the file with a transparent WebP of similar proportions and keep the name.

## Project layout

```
src/
  components/
    hero/          Hero, sky + skyline backdrop, illustrated stage
    layout/        Header with dropdowns, mobile drawer, search palette, footer
    sections/      Products, Trust, Testimonials
    calculator/    Calculator banner, form, estimate panel
    dialogs/       Sign-in dialog
  pages/           Plans index, one page per plan, claims, about, contact, legal, 404
  lib/router.tsx   Tiny hash router (#/plans/term) with focus and title handling
    ui/            Button, Dialog, Logo, TiltCard, Reveal, social icons
  data/            content.ts (all copy: plans, claims, stats, sample testimonials, legal text), images.ts
  lib/             INR formatting/parsing, illustrative premium model, hooks
  state/           UI state (sign-in dialog, search, toasts)
  assets/img/      Illustrations (WebP)
shims/             Artifact-build shims mapping React imports to the CDN globals
```

## The premium calculator

`src/lib/premium.ts` validates age, term (including the age the policy would end at) and sum assured per
plan type, and produces an **illustrative** estimate from a simple formula. It is not based on any
insurer's rates and the UI says so next to every result. Amounts accept `50,00,000`, `50 lakh`, `50L`,
`1.5 cr` and similar.

## Accessibility notes

Hero image has descriptive alt text; decorative images are hidden from screen readers. Semantic landmarks and headings, a skip link, visible focus states, disclosure-pattern dropdowns with
arrow-key support, focus-trapped dialogs that restore focus, a combobox search (`/` or Ctrl/⌘+K),
radio-group plan selector, inline error messages linked with `aria-describedby`, and live regions for
calculator results and toasts.
