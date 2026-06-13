# Laura Neal — Realtor Website (v1) — Design Spec

**Date:** 2026-06-13
**Status:** Approved layout; pending spec review

## Goal

A polished, fast personal website for Laura Neal, Broker Associate at Compass, that
(1) establishes her personal brand and credibility and (2) captures buyer/seller leads.
Hosted free on **GitHub Pages** (static site).

## Key Decisions

- **Listings approach:** A + C from research — link out to her Compass search for full
  listings, plus a few hand-picked **featured listings** curated manually. No paid IDX in v1.
  (IDX via Showcase IDX (~$20/mo) is a documented future add-on; requires Compass managing-broker
  approval. Out of scope for v1.)
- **Visual direction:** **Modern Editorial.** Deep navy (`#14213d`), gold accent (`#c9a45c`),
  warm cream/off-white (`#f4f1ea`), airy whitespace. Uppercase sans headings (with serif accents),
  classic high-end real-estate polish.
- **Hosting:** GitHub Pages, static HTML/CSS/JS. No build step required for v1.
- **Forms / lead delivery:** **Formspree** free tier — submissions emailed to Laura. Forms wired
  to a Formspree endpoint (placeholder until she creates a free account); `mailto:` fallback link
  alongside each form so leads are never lost pre-setup.

## Agent Details (source: compass.com/agents/laura-neal)

- **Name / title:** Laura Neal — Broker Associate, Compass
- **Phone:** 303-304-3765 · **Email:** laura.neal@compass.com
- **Market area:** Boulder County / Front Range — Boulder, Niwot, Lyons, Longmont, Loveland area
- **Lives in:** Lyons, CO
- **Story:** Former teacher, artist, and mural painter. Texas → CU Boulder (BA History) →
  AmeriCorps in Montana → back to Colorado in 2011. Brand promise: real estate that's
  "fun and fulfilling, never stressful or overwhelming."
- **Compass profile:** https://www.compass.com/agents/laura-neal/
- **Featured listing (v1):** 7845 Monarch Road, Niwot, CO — $1,650,000
- **Testimonial (v1):** Jeremy H. (first-home buyer) — 5 stars.

## Site Structure (v1)

Single elegant scrolling homepage with anchored nav; one optional sub-page deferred.

1. **Header / Nav** — name/logo left; anchor links (About, Listings, Reviews, Contact);
   prominent "Search Listings" button (→ Compass). Sticky, collapses to mobile menu.
2. **Hero** — name, tagline, headshot + Boulder/Front Range imagery. Two CTAs:
   "Search All Listings" (→ Compass) and "Let's Talk" (→ contact).
3. **About / Her Story** — the teacher-artist-mural-painter → Realtor journey; trust + warmth.
4. **How I Help** — Buyers / Sellers cards; the "fun, never stressful" promise.
5. **Featured Listings** — 2–3 hand-picked listing cards (start: 7845 Monarch Rd), each links to
   full Compass listing. "See all my listings" button → Compass.
6. **What's Your Home Worth?** — soft lead-capture form (address + contact) → Formspree → Laura
   prepares a custom valuation.
7. **Testimonials** — start with Jeremy H.; structured to add more easily.
8. **Contact** — contact form (Formspree) + phone/email/social.
9. **Footer** — Compass branding, Equal Housing Opportunity logo, brokerage info & required
   disclosures, copyright.

**Deferred (not v1):** fuller standalone About page; Buyers/Sellers guide pages; blog/market
insights; embedded IDX search; neighborhood guides.

## Architecture / Components

- **Static site**, no framework. Plain semantic HTML + a single CSS file + minimal vanilla JS
  (mobile nav toggle, smooth scroll, form submit handling). Keeps it fast, dependency-free,
  and trivially hostable on GitHub Pages.
- **File layout (proposed):**
  - `index.html` — the homepage
  - `css/styles.css` — design system + section styles
  - `js/main.js` — nav toggle, smooth scroll, form UX
  - `assets/` — headshot, listing photos, Compass + Equal Housing logos, favicon
  - `CNAME` — added later if/when she gets a custom domain
- **Design tokens** (CSS custom properties): navy, gold, cream, ink, muted; type scale; spacing
  scale. Defined once in `:root` so the whole site restyles from one place.
- **Reusable patterns:** listing card, testimonial card, section wrapper, button (primary/ghost),
  form field. Built as simple, repeatable HTML blocks with shared classes.

## Data Flow

- **Listings:** static content, hand-edited in `index.html`; each links out to Compass.
- **Forms:** browser → Formspree endpoint → email to Laura. No data stored on the site.
  Client-side required-field validation; success/error message shown inline. `mailto:` fallback.
- **Search:** "Search Listings" buttons are plain links to her Compass search/profile.

## Responsive / Accessibility / Performance

- Mobile-first; most traffic is mobile. Layouts reflow to single column; sticky header → hamburger.
- Accessibility: semantic landmarks, alt text on all images, labeled form fields, visible focus
  states, AA color contrast (navy/cream and gold accents checked).
- Performance: optimized/compressed images, lazy-loading below-the-fold images, no heavy JS,
  system + web-safe fonts (or 1–2 self-hosted/Google fonts). Target near-instant load.
- SEO: title/meta description, Open Graph tags, semantic headings, descriptive `alt`,
  `LocalBusiness`/`RealEstateAgent` JSON-LD schema for local search.

## Compass Compliance (must-have in footer/contact)

- Display "Laura Neal, Broker Associate" with **Compass** brokerage name.
- **Equal Housing Opportunity** logo + brokerage info per Colorado/Compass requirements.
- This is a personal marketing site; Laura should give it a quick check with her Compass
  manager re: branding/disclosure rules (noted, not a build blocker).

## Testing / Verification

- Render `index.html` locally and via the run/preview tooling; visually verify each section.
- Check responsive breakpoints (mobile / tablet / desktop).
- Validate HTML; run a quick accessibility pass (contrast, alt text, focus, labels).
- Test form submit path (placeholder endpoint) + `mailto:` fallback.
- Confirm all external links (Compass profile, listing, search) resolve.

## Assets Needed From Laura (can use tasteful placeholders until provided)

- Professional headshot (high-res).
- 2–3 featured listing photos (or we link Compass listing thumbnails).
- Any logo/brand mark; confirm tagline wording.
- Confirm which towns/neighborhoods to name.
- Formspree account → form endpoint, and confirmed lead-delivery email.
- Compass + Equal Housing Opportunity logo files.

## Out of Scope (v1)

Embedded IDX/MLS search; CRM integration; blog/CMS; multi-page guides; custom domain setup
(can add a `CNAME` later); analytics beyond basic (can add Google Analytics/Plausible later).
