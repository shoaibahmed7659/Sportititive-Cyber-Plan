/* app.js — Sportetitive Cyber Resilience Portal */
(function () {
  'use strict';

  // ── Theme toggle ──────────────────────────────────────────────────────────
  var html = document.documentElement;
  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);

  function sunIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }
  function moonIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function setThemeIcon(btn) {
    btn.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
    btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('[data-theme-toggle]');
    if (toggleBtn) {
      setThemeIcon(toggleBtn);
      toggleBtn.addEventListener('click', function () {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        setThemeIcon(toggleBtn);
      });
    }

    // ── Mobile nav toggle ────────────────────────────────────────────────────
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // ── Scroll reveal ────────────────────────────────────────────────────────
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ── Checklist persistence (in-memory only) ───────────────────────────────
    document.querySelectorAll('.pb-item input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var block = cb.closest('.playbook-block');
        if (!block) return;
        var all = block.querySelectorAll('.pb-item input[type="checkbox"]');
        var checked = block.querySelectorAll('.pb-item input[type="checkbox"]:checked');
        if (checked.length === all.length && all.length > 0) {
          var header = block.querySelector('.pb-header');
          if (header && !header.querySelector('.complete-badge')) {
            var badge = document.createElement('span');
            badge.className = 'complete-badge';
            badge.textContent = '\u2713 Complete';
            badge.style.cssText = 'margin-left:auto;font-size:.75rem;font-weight:700;color:var(--color-success);background:var(--color-success-bg);padding:.25rem .75rem;border-radius:9999px';
            var h3 = header.querySelector('h3');
            if (h3) { header.style.display = 'flex'; header.style.alignItems = 'center'; header.style.justifyContent = 'space-between'; h3.after(badge); }
          }
        }
      });
    });

    // ── Active nav link ──────────────────────────────────────────────────────
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      var href = a.getAttribute('href').replace('./', '');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  });
})();
