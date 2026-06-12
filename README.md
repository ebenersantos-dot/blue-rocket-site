# Blue Rocket Co. — Website

Multi-page marketing website for **Blue Rocket Co.**, an operations consultancy that implements CRM and automation systems for service businesses.

> Operations systems for service businesses.
> From spreadsheets to Salesforce — we build what your business actually needs.

**Live repository:** https://github.com/ebenersantos-dot/blue-rocket-site

## Stack

No frameworks. No build step. No dependencies to install.

- **HTML5** — five static pages
- **CSS3** — custom properties, grid, `@import`-composed component files
- **Vanilla JavaScript** — one file, no libraries
- **Inter** (Google Fonts) — the only external resource

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage — hero, problem, services preview, gallery, why us, CTA |
| `services.html` | Four pricing tiers (Starter / Pro / CRM / Salesforce) in full detail |
| `about.html` | Brand story and founder background (Ebener Santos) |
| `process.html` | The four-step engagement process |
| `contact.html` | Contact form and contact details |

## Project structure

```
blue-rocket-site/
├── index.html              Homepage
├── services.html           Services & pricing
├── about.html              About / founder
├── process.html            How it works
├── contact.html            Contact form + details
├── assets/
│   ├── svg/                Logo lockups, marks, favicon (SVG)
│   └── png/                Logo exports at multiple sizes (PNG)
├── css/
│   ├── main.css            Aggregator — the only stylesheet pages link
│   └── Components/
│       ├── base.css        Design tokens, reset, global styles
│       ├── typography.css  Type scale, split-line headlines
│       ├── layout.css      Containers, sections, grids, footer
│       ├── buttons.css     Button variants
│       ├── header.css      Sticky header, nav, hamburger
│       ├── hero.css        Homepage hero
│       ├── components.css  Cards, gallery, forms, process steps
│       ├── modal.css       Discovery call modal
│       └── responsive.css  Breakpoint overrides (down to 360px)
├── js/
│   └── main.js             All interactions
└── docs/
    └── DOCUMENTATION.md    Full technical & content documentation
```

## Run locally

No install needed. From the project folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` directly also works; a local server is closer to production behavior.)

## Key interactions

- Full-screen hero with staggered load-in animation
- Scroll-triggered reveals throughout (Intersection Observer)
- Two-line split section headlines with staggered rise
- Horizontal scroll gallery — mouse drag, touch, and wheel supported
- Sticky header, transparent over the hero → solid indigo on scroll
- Animated mobile hamburger menu
- Discovery call modal (any "Book a call" button; closes on backdrop, ×, or Esc)
- Real-time form validation
- Subtle cursor-follow ring on desktop (fine pointers only)
- Fade transitions between pages
- All motion respects `prefers-reduced-motion`

## Brand system

| Token | Value | Role |
|---|---|---|
| Deep Indigo | `#0B2545` | Primary |
| Mid Indigo | `#1B4480` | Depth / gradients |
| Bright Blue | `#1B98D4` | Accent — used sparingly (~10%) |
| Light Blue | `#85B7EB` | Secondary text on dark |
| Warm Cream | `#F1EFE8` | Light background |
| Ink | `#2D3748` | Body text |

Typography: **Inter** — Medium 500 for headings, Regular 400 for body. Fallback: Helvetica Neue, Arial, sans-serif.

Full brand and content rules are in [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md).

## Contact

- **Email:** bluerocketco.7@gmail.com
- **Phone / WhatsApp:** +34 677 96 53 48
- **Website:** bluerocketcompany.com
- **Location:** Logroño, Spain · Remote-first · Serving Europe & the Americas

## Copyright

© 2026 Blue Rocket Co. All rights reserved.

This repository contains proprietary brand assets, content, and design. See [LICENSE](LICENSE) for details.
