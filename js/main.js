/* Laura Neal — site interactions
   - mobile nav toggle (a11y aware)
   - progressive form enhancement (Formspree fetch, native until configured)
   - hero text load-in + scroll cue
   - sticky-header scrolled state (rAF-throttled, passive)
   - scroll-reveal via IntersectionObserver
   - featured-listings carousel (graceful with 1 item)
   Smooth scrolling is handled in CSS under prefers-reduced-motion.
   ALL motion is also gated in CSS under prefers-reduced-motion: no-preference. */

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Hero text load-in ---------- */
  // Set on next frame so the initial (hidden) state paints first, then transitions.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('loaded');
    });
  });

  /* ---------- Sticky-header scrolled state + scroll cue ---------- */
  const header = document.querySelector('.site-header');
  let ticking = false;
  function onScrollFrame() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('scrolled', y > 40);
    // Hide the scroll cue once the user has scrolled a bit.
    document.body.classList.toggle('scrolled-cue', y > 30);
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScrollFrame(); // set initial state (e.g. on reload mid-page)

  /* ---------- Scroll-reveal (IntersectionObserver, once) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Reduced motion or no IO: show everything immediately, no animation.
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    const io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Featured-listings carousel ---------- */
  initCarousel(document.querySelector('[data-carousel]'));


  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the menu after a nav link is tapped
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Reset the open state when the viewport widens past the mobile breakpoint
    const mq = window.matchMedia('(max-width: 800px)');
    const resetNav = function (e) {
      if (!e.matches) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', resetNav);
    } else if (mq.addListener) {
      mq.addListener(resetNav); // older Safari
    }
  }

  /* ---------- Progressive form enhancement ---------- */
  // Provider-agnostic: works with any backend that accepts a POST of FormData and
  // returns JSON (Web3Forms, Formspree, Splitforms, etc.). Switching services is a
  // one-line endpoint swap in the form's action (+ that service's key field).
  function isConfigured(form) {
    // Not yet wired up if the action or any key field still holds a PLACEHOLDER token.
    if (/PLACEHOLDER/.test(form.action)) return false;
    const key = form.querySelector('input[name="access_key"]');
    if (key && /PLACEHOLDER/.test(key.value)) return false;
    return true;
  }

  function enhanceForm(form) {
    form.addEventListener('submit', async function (e) {
      // Fall back to native submit / mailto until a real endpoint + key are set.
      if (!isConfigured(form)) return;
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Sending…';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        // Prefer the JSON success flag (Web3Forms/Splitforms); fall back to HTTP status.
        let ok = res.ok;
        try { const data = await res.json(); if (typeof data.success === 'boolean') ok = data.success; } catch (_) {}
        if (ok) {
          form.reset();
          if (status) status.textContent = 'Thanks! Laura will be in touch shortly.';
        } else if (status) {
          status.textContent = 'Something went wrong — please email laura.neal@compass.com.';
        }
      } catch (err) {
        if (status) status.textContent = 'Something went wrong — please email laura.neal@compass.com.';
      }
    });
  }

  document.querySelectorAll('form[data-enhance]').forEach(enhanceForm);

  /* ---------- Carousel implementation ---------- */
  function initCarousel(root) {
    if (!root) return;
    const track = root.querySelector('.carousel-track');
    const slides = track ? Array.prototype.slice.call(track.children) : [];
    const prev = root.querySelector('.carousel-prev');
    const next = root.querySelector('.carousel-next');
    const dotsWrap = root.querySelector('.carousel-dots');

    // Single slide (or none): degrade cleanly — keep arrows/dots hidden, no autoplay.
    if (slides.length < 2) return;

    root.classList.add('is-carousel');
    let index = 0;
    let timer = null;

    // Build dots
    const dots = slides.map(function (_, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to listing ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.setProperty('--slide-index', index);
      dots.forEach(function (d, di) {
        d.setAttribute('aria-selected', di === index ? 'true' : 'false');
      });
    }

    prev.hidden = false;
    next.hidden = false;
    dotsWrap.hidden = false;
    prev.addEventListener('click', function () { goTo(index - 1); restart(); });
    next.addEventListener('click', function () { goTo(index + 1); restart(); });

    goTo(0);

    /* Auto-advance (~6s) — skipped under reduced motion. Pauses on hover & focus. */
    const interval = parseInt(root.getAttribute('data-autoplay'), 10) || 6000;
    function start() {
      if (prefersReducedMotion) return;
      stop();
      timer = setInterval(function () { goTo(index + 1); }, interval);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    start();
  }

  /* ---------- Scale fixed-size embeds (Infosparks chart) to fit their container ---------- */
  function scaleMarketFrames() {
    document.querySelectorAll('.market-frame').forEach(function (frame) {
      const iframe = frame.querySelector('iframe');
      if (!iframe) return;
      const base = parseInt(iframe.getAttribute('width'), 10) || 800;
      const scale = Math.min(1, frame.clientWidth / base);
      iframe.style.transform = 'scale(' + scale + ')';
    });
  }
  if (document.querySelector('.market-frame')) {
    scaleMarketFrames();
    window.addEventListener('load', scaleMarketFrames);
    let rafId = null;
    window.addEventListener('resize', function () {
      if (rafId) return;
      rafId = requestAnimationFrame(function () { rafId = null; scaleMarketFrames(); });
    }, { passive: true });
  }

});
