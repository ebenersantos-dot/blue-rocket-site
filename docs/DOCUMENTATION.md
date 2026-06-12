# Blue Rocket Co. Website — Technical Documentation

© 2026 Blue Rocket Co. All rights reserved. See [LICENSE](../LICENSE).

This document covers the architecture, the CSS and JavaScript systems, the brand rules, and how to make common edits. The audience is anyone maintaining the site — no framework knowledge required.

---

## 1. Architecture overview

The site is five static HTML pages sharing the same header, footer, and discovery call modal. There is no build step: what's in the repository is exactly what ships.

- Each page links **one stylesheet**, `css/main.css`, which composes the component files in `css/Components/` via `@import`. Import order matters: tokens and reset load first (`base.css`), breakpoint overrides load last (`responsive.css`).
- Each page loads **one script**, `js/main.js`, at the end of `<body>`. Every feature in it is guarded — if a page lacks a given element (e.g. the gallery), that feature simply doesn't initialize.
- The header, footer, and modal markup is **duplicated on every page** (the cost of having no templating). If you change one, change all five pages. Search for a unique string from the block you're editing to find every copy.

## 2. CSS system

### Design tokens

All colors, fonts, spacing, and motion values are CSS custom properties defined once in `css/Components/base.css` under `:root`. Change a token there and it propagates everywhere.

| Variable | Value | Use |
|---|---|---|
| `--indigo-deep` | `#0B2545` | Primary backgrounds, headings |
| `--indigo-mid` | `#1B4480` | Gradient depth |
| `--blue-bright` | `#1B98D4` | Accent — keep rare (~10% of any view) |
| `--blue-light` | `#85B7EB` | Secondary text on dark backgrounds |
| `--cream` | `#F1EFE8` | Light section backgrounds |
| `--ink` | `#2D3748` | Body text |
| `--space-section` | fluid clamp | Vertical rhythm between sections |
| `--container-max` / `--container-pad` | 1200px / fluid | Page gutter system |
| `--ease-out` | cubic-bezier | Shared easing for all motion |
| `--header-height` | 76px (64px ≤380px) | Header sizing & hero offsets |

### File responsibilities

| File | Owns |
|---|---|
| `base.css` | Tokens, reset, global element styles, cursor dot, page-transition veil, `.reveal` primitives, reduced-motion handling |
| `typography.css` | Headline scale, `.split-lines` two-line stagger, eyebrows, editorial closing statements |
| `layout.css` | `.container`, `.section` variants (cream/indigo), card grids, CTA strip, inner-page hero band, footer |
| `buttons.css` | `.btn` base + `-accent`, `-outline`, `-outline-light`, `-lg`, `-block`, `-nav` variants |
| `header.css` | Fixed header, transparent/solid states, nav underlines, hamburger icon animation |
| `hero.css` | Homepage full-viewport hero, accent stripe, scroll indicator |
| `components.css` | Cards (light/dark/tier), horizontal gallery, forms, contact cards, process steps, prose blocks |
| `modal.css` | Modal layout, backdrop, open/close transitions |
| `responsive.css` | All `@media` overrides: ≤1024px, ≤860px (mobile nav), ≤560px, ≤380px |

### Layout conventions

- Sections alternate cream (`.section-cream`) and indigo gradient (`.section-indigo`).
- Cards live in `.card-grid` with `-2`/`-3`/`-4` column modifiers; columns collapse in `responsive.css`.
- Fluid sizing uses `clamp()` throughout, so most scaling needs no media queries; the breakpoints handle structural changes only (nav, column counts).
- The site is functional down to a **360px** viewport.

## 3. JavaScript behaviors (`js/main.js`)

One IIFE, no globals, no dependencies. Features in file order:

| Feature | Hook | Notes |
|---|---|---|
| Sticky header | `[data-header]` | Adds `.is-solid` past 40px scroll, `.is-transparent` at top |
| Hamburger menu | `[data-hamburger]`, `[data-nav]` | Toggles `.is-open`; closes on any nav link/button click; locks body scroll |
| Scroll reveals | `.reveal` | IntersectionObserver adds `.is-visible` once per element; children of `.card-grid` get staggered `transition-delay` |
| Hero load-in | `.reveal-hero` | Plays on page load (not scroll), staggered ~120ms apart |
| Horizontal gallery | `[data-gallery]` | Pointer-drag scrolling, post-drag click suppression, vertical wheel translated to horizontal while hovering |
| Modal | `[data-modal]`, `[data-modal-open]`, `[data-modal-close]` | Any element with `data-modal-open` opens it; closes on backdrop, ×, or Escape; focuses first field |
| Form validation | `form[data-validate]` | Validates on blur, re-validates on input once a field has erred; checks required, `minlength`, and email format; shows `.form-success` then resets (and closes the modal if the form is inside it) |
| Cursor follow | `.cursor-dot` | Desktop fine pointers only; eased trailing ring; grows over interactive elements |
| Page transitions | `.page-transition` | Internal `*.html` links fade through an indigo veil (~380ms); back/forward cache handled via `pageshow` |

All animation respects `prefers-reduced-motion: reduce` — reveals render visible immediately and transitions are disabled.

### Form delivery

Submissions are delivered by email via **FormSubmit** (formsubmit.co) — a form-to-email relay that requires no server and no account. The endpoint is defined once at the top of the form section in `main.js`:

```js
var FORM_ENDPOINT = 'https://formsubmit.co/ajax/bluerocketco.7@gmail.com';
```

On submit, validated fields are POSTed as JSON to that endpoint; FormSubmit forwards them to the inbox formatted as a table, with the subject "New inquiry — Blue Rocket Co. website". While sending, the button shows "Sending…" and is disabled. On success the `.form-success` message shows and the form resets (the modal also closes); on network or service failure the `.form-failure` message shows with a fallback email address.

Two operational notes:

1. **One-time activation:** the very first submission triggers an activation email from FormSubmit to `bluerocketco.7@gmail.com`. Click the confirmation link in it once; all subsequent submissions are delivered normally.
2. **Changing the destination:** edit `FORM_ENDPOINT` in `main.js`. To switch providers entirely (e.g. Formspree, Basin, or your own API), the same handler works — only the URL and payload shape may need adjusting.

## 4. Brand & content rules

### Voice

- Direct, concrete, editorially sharp. No exclamation points in body copy.
- **Banned words:** synergy, leverage (as a verb), transformative, unleash, empower, journey, potentialize, game-changing.
- Tagline: *"Operations systems for service businesses"*
- Subhead: *"From spreadsheets to Salesforce — we build what your business actually needs"*

### Color proportion

~65% neutrals (cream/white), ~25% indigo, ~10% bright blue. The accent works because it is rare — resist adding more of it.

### Typography

Inter (Google Fonts): Medium 500 for wordmark and headings, Regular 400 for body. −1% letter-spacing on the wordmark. Fallback stack: Helvetica Neue, Arial, sans-serif.

### Logo usage

| Asset | Use |
|---|---|
| `assets/svg/blue-rocket-co_lockup_horizontal_white.svg` | Header and footer (dark backgrounds) |
| `assets/svg/blue-rocket-co_lockup_stacked_white.svg` | Homepage hero |
| `assets/svg/blue-rocket-co_favicon.svg` | Favicon (linked in every `<head>`) |
| `_white` variants | Always on dark backgrounds; non-white variants on light |

PNG exports at multiple widths live in `assets/png/` for contexts that can't take SVG.

### Contact details (keep consistent everywhere)

- Email: `bluerocketco.7@gmail.com`
- Phone / WhatsApp: `+34 677 96 53 48` — always labeled "WhatsApp available"
- Website: `bluerocketcompany.com`
- Location: Logroño, Spain

These appear in: the footer (all pages), the modal (all pages), and the contact page cards. Update all three places together.

## 5. Common edits

**Change a price or tier detail** — edit the tier card in `services.html` *and* the matching preview card in `index.html` (services preview section).

**Add a nav link** — add the `<a>` in the header nav *and* footer nav of all five pages, and add a `:nth-child` stagger rule in `responsive.css` if the mobile menu count changes.

**Add a homepage section** — follow the existing pattern: `<section class="section section-cream|section-indigo">` → `.container` → `.section-eyebrow` + `.section-headline.split-lines` + content. Add `.reveal` to anything that should animate in.

**Add a gallery card** — duplicate a `.gallery-card` inside `.gallery-track` in `index.html`; numbering is manual.

**Change motion speed** — `--duration-reveal` and `--ease-out` in `base.css` control most of it.

## 6. Deployment

The site is static; any static host works (GitHub Pages, Netlify, Vercel, plain nginx). For GitHub Pages: repo **Settings → Pages → Deploy from a branch → `main` / root**. No configuration files are required.

Local preview:

```bash
python3 -m http.server 8000
```

---

*Maintained by Blue Rocket Co. — bluerocketco.7@gmail.com*
