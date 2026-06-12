/* Blue Rocket Co. — main.js
   Sticky header · hamburger · scroll reveals · horizontal gallery ·
   modal · form validation · cursor follow · page transitions */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky header: transparent → solid ---------- */
  var header = document.querySelector('[data-header]');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-solid');
      header.classList.remove('is-transparent');
    } else {
      header.classList.add('is-transparent');
      header.classList.remove('is-solid');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---------- Hamburger menu ---------- */
  var hamburger = document.querySelector('[data-hamburger]');
  var nav = document.querySelector('[data-nav]');

  function closeMenu() {
    if (!hamburger || !nav) return;
    hamburger.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Scroll reveals (Intersection Observer) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Stagger siblings inside card grids
    document.querySelectorAll('.card-grid').forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (child, i) {
        child.style.transitionDelay = (i * 0.08) + 's';
      });
    });
  }

  // Hero reveal plays on load, staggered
  document.querySelectorAll('.reveal-hero').forEach(function (el, i) {
    el.style.transitionDelay = (0.15 + i * 0.12) + 's';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('is-visible'); });
    });
  });

  /* ---------- Horizontal gallery: drag + touch ---------- */
  var gallery = document.querySelector('[data-gallery]');

  if (gallery) {
    var isDown = false;
    var startX = 0;
    var startScroll = 0;
    var moved = false;

    gallery.addEventListener('pointerdown', function (e) {
      isDown = true;
      moved = false;
      startX = e.clientX;
      startScroll = gallery.scrollLeft;
      gallery.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', function (e) {
      if (!isDown) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      gallery.scrollLeft = startScroll - dx;
    });

    window.addEventListener('pointerup', function () {
      isDown = false;
      gallery.classList.remove('is-dragging');
    });

    // Avoid accidental clicks after a drag
    gallery.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    // Translate vertical wheel into horizontal scroll while hovering
    gallery.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        var atStart = gallery.scrollLeft <= 0 && e.deltaY < 0;
        var atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          gallery.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });
  }

  /* ---------- Modal ---------- */
  var modal = document.querySelector('[data-modal]');

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var firstField = modal.querySelector('input');
    if (firstField) setTimeout(function () { firstField.focus(); }, 250);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- Form validation (real-time) + email delivery ---------- */

  // FormSubmit forwards submissions to the inbox below — no server needed.
  // First-ever submission triggers a one-time activation email to this address.
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/bluerocketco.7@gmail.com';

  function validateField(field) {
    var wrap = field.closest('.form-field');
    var error = wrap ? wrap.querySelector('.form-error') : null;
    var message = '';

    var value = field.value.trim();
    if (field.required && !value) {
      message = 'This field is required.';
    } else if (value && field.minLength > 0 && value.length < field.minLength) {
      message = 'Please add a bit more detail (min ' + field.minLength + ' characters).';
    } else if (value && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      message = 'Enter a valid email address.';
    }

    if (wrap) wrap.classList.toggle('has-error', !!message);
    if (error) error.textContent = message;
    return !message;
  }

  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    var fields = form.querySelectorAll('input, textarea');

    fields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        var wrap = field.closest('.form-field');
        if (wrap && wrap.classList.contains('has-error')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) valid = false;
      });
      if (!valid) {
        var firstInvalid = form.querySelector('.has-error input, .has-error textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      var success = form.querySelector('.form-success');
      var failure = form.querySelector('.form-failure');
      var originalLabel = submitBtn ? submitBtn.textContent : '';

      if (failure) failure.hidden = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      var payload = {
        _subject: 'New inquiry — Blue Rocket Co. website',
        _template: 'table'
      };
      fields.forEach(function (field) {
        if (field.name) payload[field.name] = field.value.trim();
      });

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed: ' + res.status);
          return res.json();
        })
        .then(function () {
          if (success) success.hidden = false;
          form.reset();
          setTimeout(function () {
            if (success) success.hidden = true;
            if (modal && modal.classList.contains('is-open') && modal.contains(form)) closeModal();
          }, 2500);
        })
        .catch(function () {
          if (failure) failure.hidden = false;
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });
  });

  /* ---------- Cursor follow (desktop, fine pointers only) ---------- */
  var cursorDot = document.querySelector('.cursor-dot');

  if (cursorDot && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    var mouseX = -100, mouseY = -100;
    var dotX = -100, dotY = -100;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.classList.add('is-active');
    });

    document.documentElement.addEventListener('mouseleave', function () {
      cursorDot.classList.remove('is-active');
    });

    document.addEventListener('mouseover', function (e) {
      var interactive = e.target.closest('a, button, input, textarea, .gallery');
      cursorDot.classList.toggle('is-hover', !!interactive);
    });

    (function animateCursor() {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      cursorDot.style.transform = 'translate(' + dotX + 'px, ' + dotY + 'px)';
      requestAnimationFrame(animateCursor);
    })();
  }

  /* ---------- Page transitions ---------- */
  var transition = document.querySelector('.page-transition');

  // Fade in on load
  document.body.classList.add('is-loaded');

  if (transition && !prefersReducedMotion) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      var isInternal = href && /\.html$/.test(href) && href.indexOf('http') !== 0;
      if (!isInternal) return;

      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
        e.preventDefault();
        transition.classList.add('is-active');
        setTimeout(function () { window.location.href = href; }, 380);
      });
    });

    // Handle back/forward cache restores
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) transition.classList.remove('is-active');
    });
  }

})();
