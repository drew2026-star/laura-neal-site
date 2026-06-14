# Laura Neal — Realtor Website

A static, single-page website for **Laura Neal, Broker Associate at Compass**, serving buyers and sellers across Boulder, Niwot, Lyons, and the Front Range.

Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

## Tech / structure

```
index.html        Full single page (header, hero, about, help, listings,
                  valuation, reviews, contact, footer)
css/styles.css    Design tokens + base + all section styles
js/main.js        Mobile nav toggle + progressive form enhancement
assets/           Image assets (currently CSS placeholders — see below)
```

Visual direction: **Modern Editorial** — deep navy + gold accent, warm cream
background, airy whitespace, uppercase sans headings with serif body copy.

## Preview locally

It's a static site, so any of these work:

- **Simplest:** double-click `index.html` (or open it in a browser).
- **With a local server** (recommended, so anchor links / fetch behave like production):

  ```bash
  cd lauraneal-site
  python3 -m http.server 8000
  # visit http://localhost:8000
  ```

## Deploy to GitHub Pages

1. Create a GitHub repo and push this directory to the `main` branch.

   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** = *Deploy from a branch*,
   **Branch** = `main`, folder = `/ (root)`. Save.
4. The site publishes at `https://<you>.github.io/<repo>/` within a minute or two.

(Custom domain: add it under Settings → Pages → Custom domain, then point a
CNAME/ALIAS record at GitHub Pages.)

## What to swap before going live

### 1. Web3Forms access key (contact + valuation forms)

Both forms post to Web3Forms (free, ~250 submissions/mo, leads delivered by
email). Until you add the access key, the forms fall back to normal behavior and
a visible "Prefer email?" mailto line is always shown — no lead is ever lost.

- Go to <https://web3forms.com>, enter the email where Laura wants leads, and
  copy the **access key** it gives you (no password/account needed).
- In `index.html`, replace **both** occurrences of:

  ```
  value="WEB3FORMS_ACCESS_KEY_PLACEHOLDER"
  ```

  with the real key. That's it — the JS auto-detects the configured key and
  switches to inline AJAX submission with a success/error message.

The form handler is **provider-agnostic** (it POSTs FormData and reads a JSON
`success` flag), so switching to another backend later — Splitforms, Formspree,
etc. — is just a one-line `action` swap plus that service's key field.

### 2. Images

All imagery is currently a tasteful CSS placeholder block (navy/gold gradient
with a small label) so there are no broken `<img>` links and no layout shift.
Each placeholder has an HTML comment showing the one-line swap. Drop real files
into `assets/` and replace the placeholder `<div>` with an `<img>`:

| Placeholder location | Suggested asset | Aspect ratio |
|---|---|---|
| Hero (`.hero-media`) | `assets/hero.jpg` | wide / full-bleed |
| About portrait (`.portrait-placeholder`) | `assets/laura.jpg` | 4:5 |
| Featured listing (`.listing-media`) | `assets/listing-monarch.jpg` | 3:2 |

Example swap (hero):

```html
<div class="hero-media" aria-hidden="true">
  <img class="hero-photo" src="assets/hero.jpg" alt="">
</div>
```

The listing/portrait blocks size with `aspect-ratio`, so a correctly-sized
`<img>` (with `object-fit:cover`, already applied to `.hero-photo`) drops in
cleanly.

### 3. Featured listing

The featured listing (`#listings`) is hard-coded:
**7845 Monarch Road, Niwot, CO — $1,650,000**. Its "View Listing" button links
to Laura's Compass profile as a fallback; swap in the exact Compass listing URL
when available.

## Contact (for reference)

- Phone: 303-304-3765
- Email: laura.neal@compass.com
- Compass profile: <https://www.compass.com/agents/laura-neal/>

---

© 2026 Laura Neal · Broker Associate, Compass. Equal Housing Opportunity.
