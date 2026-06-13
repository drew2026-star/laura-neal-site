# Laura Neal Realtor Website (v1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design quality:** When generating markup/CSS, use the `frontend-design` skill so the result is distinctive and production-grade, not generic. The design direction is **Modern Editorial** (navy/gold, airy, high-end real estate).

**Goal:** Build a fast, polished single-page personal website for Laura Neal (Broker Associate, Compass) that establishes her brand and captures leads, deployed free on GitHub Pages.

**Architecture:** Static site — semantic `index.html` + one CSS file (design tokens via CSS custom properties) + minimal vanilla JS (mobile nav, smooth scroll, form UX). Listings are hand-curated cards that link to Compass; full search links out to her Compass profile. Forms post to Formspree with a `mailto:` fallback. No framework, no build step.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid), vanilla JS, Formspree (forms), GitHub Pages (hosting). Optional self-hosted/Google fonts.

**Verification note:** This is a static design site — no unit-test framework. Verification per task = render in the preview/browser and confirm visually + validate structure/links. Use the `run` skill or the preview tooling to view `index.html`.

---

## Design Tokens (reference for all tasks)

Defined once in `css/styles.css` `:root`:

```css
:root {
  /* Color */
  --navy:    #14213d;  /* primary / headers / footer */
  --navy-2:  #2d4263;  /* secondary navy */
  --gold:    #c9a45c;  /* accent / CTAs / rules */
  --cream:   #f4f1ea;  /* page background */
  --ink:     #1c1c1c;  /* body text */
  --muted:   #6b6b6b;  /* secondary text */
  --white:   #ffffff;

  /* Type */
  --font-head: 'Helvetica Neue', Arial, sans-serif; /* headings: uppercase, light/medium */
  --font-body: Georgia, 'Times New Roman', serif;   /* body + serif accents */
  --h1: clamp(2.4rem, 6vw, 4rem);
  --h2: clamp(1.8rem, 4vw, 2.6rem);
  --h3: 1.25rem;
  --body: 1.0625rem;

  /* Spacing */
  --space-section: clamp(4rem, 9vw, 7rem); /* vertical rhythm between sections */
  --maxw: 1140px;                          /* content container width */
  --radius: 6px;
}
```

Headings: `--font-head`, uppercase, `letter-spacing: 0.04em`, light weight. Eyebrow labels: gold, 11px, `letter-spacing: 0.22em`, uppercase. Body: `--font-body` for warmth.

## Content (real copy — use verbatim, no placeholders)

- **Name/title:** Laura Neal — Broker Associate, Compass
- **Phone:** 303-304-3765 · **Email:** laura.neal@compass.com
- **Compass profile / search:** https://www.compass.com/agents/laura-neal/
- **Hero tagline:** "Real estate that's fun and fulfilling — never stressful."
- **Hero sub:** "Helping buyers and sellers across Boulder, Niwot, Lyons & the Front Range feel at home."
- **About copy:**
  > Before Laura helped people find homes, she was a teacher, an artist, and a mural painter. She came to Colorado from Texas for college at CU Boulder, spent a season with AmeriCorps in Montana, and returned to the Front Range in 2011 to put down roots. Today she lives in Lyons with her family and pets — and brings an artist's eye and a teacher's patience to every transaction. Her goal is simple: make buying or selling your home feel exciting and empowering, never overwhelming.
- **How I Help — Buyers:** "From your first showing to the closing table, I'll guide you with honest advice, local know-how, and zero pressure — so you can buy with confidence."
- **How I Help — Sellers:** "I'll help you prep, price, and present your home to stand out, with marketing that does it justice and a process that stays calm from list to close."
- **Featured listing (v1):** 7845 Monarch Road, Niwot, CO — $1,650,000 — link to its Compass listing page (pull exact URL from her Compass profile during build).
- **Testimonial (v1):**
  > "Working with Laura to purchase my first home was nothing short of extraordinary. What could have been a stressful experience turned into an exciting and empowering journey." — Jeremy H., First-time buyer
- **Compass compliance (footer):** "Laura Neal, Broker Associate · Compass" + Equal Housing Opportunity logo + brokerage disclosure line.

---

## File Structure

- Create: `index.html` — the full single-page site (all sections)
- Create: `css/styles.css` — design tokens + base + all section styles
- Create: `js/main.js` — mobile nav toggle, smooth scroll, form submit UX
- Create: `assets/` — headshot, listing image(s), Compass + Equal Housing logos, favicon (placeholders until Laura provides)
- Create: `README.md` — how to run/deploy + where to swap assets/endpoints
- Create: `.gitignore` — ignore `.superpowers/`, OS cruft
- Later: `CNAME` — only if a custom domain is added

---

### Task 1: Project scaffold, git, and design system base

**Files:**
- Create: `index.html`, `css/styles.css`, `js/main.js`, `README.md`, `.gitignore`
- Create: `assets/.gitkeep`

- [ ] **Step 1: Initialize git and ignore file**

```bash
cd /Users/drewneal/lauraneal-site
git init
printf '.superpowers/\n.DS_Store\n*.log\n' > .gitignore
mkdir -p css js assets && touch assets/.gitkeep
```

- [ ] **Step 2: Create `index.html` skeleton with all section anchors**

Semantic HTML5 with `<head>` containing: charset, viewport, `<title>Laura Neal · Boulder & Niwot Realtor · Compass</title>`, meta description, Open Graph tags, link to `css/styles.css`, defer `js/main.js`. `<body>` has `<header>` nav, `<main>` with empty `<section>` placeholders carrying ids: `#hero #about #help #listings #valuation #reviews #contact`, and `<footer>`. Sections get filled in later tasks.

- [ ] **Step 3: Write design tokens + base styles in `css/styles.css`**

Add the `:root` token block from the Design Tokens section above, plus: CSS reset/normalize basics, `body` background `--cream`, color `--ink`, `--font-body`; container utility `.container { max-width: var(--maxw); margin-inline: auto; padding-inline: 1.25rem; }`; heading styles; `.section { padding-block: var(--space-section); }`; button styles `.btn` (primary = gold bg/navy text) and `.btn-ghost` (navy outline).

- [ ] **Step 4: Stub `js/main.js`**

```js
// Mobile nav toggle, smooth scroll, and form UX wired up in later tasks.
document.addEventListener('DOMContentLoaded', () => {});
```

- [ ] **Step 5: Write `README.md`**

Document: what the site is, how to preview (`open index.html` or a static server), how to deploy to GitHub Pages, and where to swap in real assets + the Formspree endpoint.

- [ ] **Step 6: Verify render**

Open `index.html` in the preview/browser. Expected: cream background, no console errors, page loads (sections empty for now).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold static site, git, and design tokens"
```

---

### Task 2: Header nav + hero

**Files:**
- Modify: `index.html` (`<header>`, `#hero`)
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Build sticky header nav**

In `<header>`: brand wordmark "Laura Neal" (left); nav links to `#about #help #listings #reviews #contact`; primary button "Search Listings" linking to her Compass profile (`https://www.compass.com/agents/laura-neal/`, `target="_blank" rel="noopener"`); a hamburger `<button class="nav-toggle" aria-label="Menu" aria-expanded="false">`. Sticky, navy text on cream, gold underline on hover.

- [ ] **Step 2: Build hero section (`#hero`)**

Full-width hero: eyebrow "BOULDER · NIWOT · LYONS — COMPASS"; `<h1>` "Laura Neal"; tagline (serif italic) "Real estate that's fun and fulfilling — never stressful."; sub line; two CTAs — "Search All Listings" (→ Compass, primary) and "Let's Talk" (→ `#contact`, ghost). Reserve space for headshot/Boulder image (placeholder `assets/hero-placeholder.jpg` — use a tasteful neutral placeholder for now, e.g. a solid navy block with a note, swap later). Navy or image-overlay background, cream text.

- [ ] **Step 3: Style header + hero in `css/styles.css`**

Sticky header; responsive nav (links hidden behind hamburger under 800px). Hero: min-height ~80vh, flex layout, generous spacing, gold accent rule under tagline.

- [ ] **Step 4: Wire mobile nav + smooth scroll in `js/main.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // close menu on link click (mobile)
  nav?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }));
});
```
Add `html { scroll-behavior: smooth; }` in CSS (respect `prefers-reduced-motion`).

- [ ] **Step 5: Verify render**

Open in preview at desktop and mobile widths. Expected: sticky nav, hamburger toggles menu under 800px, hero looks polished, CTAs link correctly (Compass opens new tab, "Let's Talk" scrolls to contact).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: header nav and hero section"
```

---

### Task 3: About / Her Story

**Files:**
- Modify: `index.html` (`#about`), `css/styles.css`

- [ ] **Step 1: Build `#about`**

Two-column on desktop (portrait placeholder `assets/laura-placeholder.jpg` left, text right), single column mobile. Eyebrow "MEET LAURA"; `<h2>` e.g. "An artist's eye, a teacher's patience"; the About copy verbatim from the Content section; small signature/line. Reflows to single column on mobile.

- [ ] **Step 2: Style it**

Portrait with subtle border/shadow or gold frame accent; comfortable measure (~60ch) on body text.

- [ ] **Step 3: Verify render**

Preview desktop + mobile. Expected: readable, warm, image+text balanced, reflows cleanly.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: about section"
```

---

### Task 4: How I Help (Buyers / Sellers)

**Files:**
- Modify: `index.html` (`#help`), `css/styles.css`

- [ ] **Step 1: Build `#help`**

Eyebrow "HOW I HELP"; `<h2>`; two cards side by side (stack on mobile): "For Buyers" + buyer copy; "For Sellers" + seller copy (verbatim). Each card: small gold icon/numeral, heading, paragraph, optional "Let's talk" link to `#contact`.

- [ ] **Step 2: Style cards**

Cream cards on navy band (or navy cards on cream) with gold accent; equal heights via grid.

- [ ] **Step 3: Verify render**

Preview desktop + mobile. Expected: two balanced cards, stack on mobile, copy correct.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: how I help section"
```

---

### Task 5: Featured Listings

**Files:**
- Modify: `index.html` (`#listings`), `css/styles.css`

- [ ] **Step 1: Build `#listings`**

Eyebrow "FEATURED LISTINGS"; `<h2>`; responsive grid of listing cards. Card = photo (placeholder `assets/listing-1.jpg`), address line "7845 Monarch Road, Niwot, CO", price "$1,650,000", short detail line (beds/baths/sqft if known, else omit), and "View Listing" button linking to the listing's Compass page (fetch the exact URL from her Compass profile during build; fall back to her Compass profile URL if not found). Below the grid: a centered "See All My Listings" button → Compass profile.

- [ ] **Step 2: Style listing cards**

Image top, details below; hover lift; price in gold or navy bold; consistent aspect ratio on images (`object-fit: cover`).

- [ ] **Step 3: Verify render**

Preview. Expected: card(s) render, links resolve to Compass, grid reflows 1-col on mobile.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: featured listings section"
```

---

### Task 6: "What's Your Home Worth?" lead form

**Files:**
- Modify: `index.html` (`#valuation`), `css/styles.css`, `js/main.js`

- [ ] **Step 1: Build `#valuation`**

A visually distinct band (navy bg, cream/gold text). Eyebrow "FREE HOME VALUATION"; `<h2>` "Curious what your home is worth?"; short reassuring line. A compact form with fields: Property address (text, required), Name (text, required), Email (email, required), Phone (tel, optional), optional message. Submit button "Get My Estimate". `<form action="https://formspree.io/f/PLACEHOLDER" method="POST">` plus a `mailto:` fallback link: "Prefer email? Reach me at laura.neal@compass.com". Include hidden `_subject` field "New home valuation request — laura-neal site".

- [ ] **Step 2: Style form**

Inputs with labels (visible or `aria-label`), gold focus ring, full-width on mobile, two-column on desktop where sensible.

- [ ] **Step 3: Add form UX in `js/main.js`**

Progressive enhancement: on submit, POST via `fetch` to the form's `action`, show inline success ("Thanks! Laura will be in touch shortly.") or error message; fall back to native submit if JS fails. Required-field validation before submit.

```js
function enhanceForm(form) {
  form.addEventListener('submit', async (e) => {
    if (!form.action.includes('formspree.io') || form.action.includes('PLACEHOLDER')) return; // let native/mailto handle until configured
    e.preventDefault();
    const status = form.querySelector('.form-status');
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { form.reset(); status.textContent = 'Thanks! Laura will be in touch shortly.'; }
      else status.textContent = 'Something went wrong — please email laura.neal@compass.com.';
    } catch { status.textContent = 'Something went wrong — please email laura.neal@compass.com.'; }
  });
}
document.querySelectorAll('form[data-enhance]').forEach(enhanceForm);
```
Add `data-enhance` and a `.form-status` element to the form.

- [ ] **Step 4: Verify render**

Preview desktop + mobile. Expected: form looks clean, validates required fields, mailto fallback visible. (Live submit verified after endpoint set in Task 10.)

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: home valuation lead form"
```

---

### Task 7: Testimonials

**Files:**
- Modify: `index.html` (`#reviews`), `css/styles.css`

- [ ] **Step 1: Build `#reviews`**

Eyebrow "KIND WORDS"; `<h2>`; testimonial card(s) with the Jeremy H. quote verbatim, 5 gold stars, attribution "Jeremy H. · First-time buyer". Structure as a list so more can be added easily. Optional link "Read more reviews on Compass" → Compass profile.

- [ ] **Step 2: Style testimonials**

Large serif quote, gold quotation mark accent, centered or card layout; star row in gold.

- [ ] **Step 3: Verify render**

Preview. Expected: quote renders, stars show, attribution correct.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: testimonials section"
```

---

### Task 8: Contact + footer (Compass compliance)

**Files:**
- Modify: `index.html` (`#contact`, `<footer>`), `css/styles.css`

- [ ] **Step 1: Build `#contact`**

Eyebrow "GET IN TOUCH"; `<h2>` "Let's find your place."; contact info block (phone `tel:303-304-3765`, email `mailto:laura.neal@compass.com`) beside a contact form (Name, Email, Phone, Message — required: Name, Email, Message). Same Formspree pattern + `data-enhance` + `.form-status` + hidden `_subject` "New contact — laura-neal site". Mailto fallback line.

- [ ] **Step 2: Build `<footer>` with Compass compliance**

Navy footer: "Laura Neal, Broker Associate · Compass", phone/email, Equal Housing Opportunity logo (`assets/equal-housing.svg` placeholder), brokerage disclosure line, copyright "© 2026 Laura Neal". Small print kept legible (AA contrast on navy).

- [ ] **Step 3: Style contact + footer**

Two-column contact (info + form) → stack on mobile; footer tidy and well-spaced.

- [ ] **Step 4: Verify render**

Preview desktop + mobile. Expected: contact form + info render, footer shows compliance items, tel/mailto links work.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact section and compliant footer"
```

---

### Task 9: Responsive, accessibility, SEO & performance polish

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Accessibility pass**

Verify: one `<h1>`, logical heading order, `alt` on every image, every form field has an associated `<label>`, visible `:focus-visible` styles, `aria-expanded` on nav toggle, color contrast AA (navy/cream/gold). Add `aria-label`s where needed.

- [ ] **Step 2: SEO + social**

Confirm `<title>` + meta description; add Open Graph (`og:title`, `og:description`, `og:image` → headshot/listing) and Twitter card. Add `RealEstateAgent` JSON-LD in `<head>`:

```html
<script type="application/ld+json">
{ "@context":"https://schema.org","@type":"RealEstateAgent","name":"Laura Neal",
  "telephone":"+1-303-304-3765","email":"laura.neal@compass.com",
  "areaServed":["Boulder, CO","Niwot, CO","Lyons, CO","Longmont, CO"],
  "memberOf":{"@type":"Organization","name":"Compass"},
  "url":"https://www.compass.com/agents/laura-neal/" }
</script>
```

- [ ] **Step 3: Performance**

Add `loading="lazy"` to below-the-fold images, set explicit width/height to avoid layout shift, ensure fonts load efficiently (system stack or `font-display: swap`), add a favicon.

- [ ] **Step 4: Responsive sweep**

Check 360px, 768px, 1024px, 1440px. Fix any overflow, cramped spacing, or broken stacking.

- [ ] **Step 5: Verify**

Preview at all breakpoints; run an HTML validation pass (e.g. paste into validator or use a linter) and confirm no errors; tab through the page to confirm focus order.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "polish: a11y, SEO/JSON-LD, responsive, performance"
```

---

### Task 10: Form wiring, final verification & GitHub Pages deploy

**Files:**
- Modify: `index.html` (Formspree endpoints), `README.md`
- Create: GitHub repo + Pages config

- [ ] **Step 1: Wire Formspree (or document handoff)**

If Laura has created a free Formspree account: replace `PLACEHOLDER` in both form `action`s with her real endpoint and test a live submission (confirm she receives the email). If not yet: leave the `mailto:` fallback active, and document in `README.md` exactly where/how to paste the endpoint later. Either way the site captures leads.

- [ ] **Step 2: Final full-page verification**

Open the full site in the preview. Walk every section top to bottom on desktop and mobile. Confirm: all links resolve (Compass profile, listing, tel, mailto), forms validate, no console errors, images load (placeholders acceptable), footer compliance present.

- [ ] **Step 3: Create GitHub repo and push**

```bash
gh repo create laura-neal-site --public --source=. --remote=origin --push
```
(If `gh` not authed, document manual steps in README: create repo on github.com, `git remote add origin …`, `git push -u origin main`.)

- [ ] **Step 4: Enable GitHub Pages**

In repo Settings → Pages, set source to `main` branch / root. (Or via CLI: `gh api -X POST repos/:owner/laura-neal-site/pages -f source.branch=main -f source.path=/`.) Confirm the published URL loads the site.

- [ ] **Step 5: Verify live site**

Open the GitHub Pages URL in a browser. Confirm it renders identically to local and is mobile-friendly. Note the URL in `README.md`.

- [ ] **Step 6: Final commit**

```bash
git add -A && git commit -m "chore: wire forms, deploy to GitHub Pages" && git push
```

---

## Asset & Handoff Checklist (track separately; placeholders OK for build)

- [ ] Professional headshot → `assets/laura.jpg`
- [ ] Hero image (Boulder/Front Range or lifestyle) → `assets/hero.jpg`
- [ ] Featured listing photo(s) → `assets/listing-1.jpg`
- [ ] Compass logo + Equal Housing Opportunity logo → `assets/`
- [ ] Confirm exact featured-listing Compass URL
- [ ] Formspree account → endpoint pasted into both forms
- [ ] Confirm lead-delivery email (default: laura.neal@compass.com)
- [ ] Optional: custom domain → add `CNAME`, configure DNS
- [ ] Laura's quick check with Compass manager re: branding/disclosure rules
