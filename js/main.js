/* Laura Neal — site interactions
   - mobile nav toggle (a11y aware)
   - progressive form enhancement (Formspree fetch, native until configured)
   Smooth scrolling is handled in CSS under prefers-reduced-motion. */

document.addEventListener('DOMContentLoaded', function () {

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
  }

  /* ---------- Progressive form enhancement ---------- */
  function enhanceForm(form) {
    form.addEventListener('submit', async function (e) {
      // Fall back to native submit / mailto until a real Formspree endpoint is set.
      if (!form.action.includes('formspree.io') || form.action.includes('PLACEHOLDER')) return;
      e.preventDefault();
      const status = form.querySelector('.form-status');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
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

});
