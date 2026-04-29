(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');

  function icon(mode) {
    if (mode === 'dark') {
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>';
  }

  function renderTheme() {
    root.setAttribute('data-theme', theme);
    if (!toggle) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    toggle.innerHTML = icon(theme);
  }

  function markActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const normalized = href.replace(/^\.\//, '');
      link.classList.toggle('active', normalized === current || (current === '' && normalized === 'index.html'));
    });
  }

  function initReveal() {
    const targets = document.querySelectorAll('.board-card, .panel, .page-card, .phase-card, .role-card, .recommendation-card, .framework-card, .impact-card');
    if (!('IntersectionObserver' in window) || !targets.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (item, index) {
      item.classList.add('fade-up');
      item.style.transitionDelay = Math.min(index % 6, 5) * 40 + 'ms';
      observer.observe(item);
    });
  }

  renderTheme();
  markActiveNav();
  initReveal();

  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      renderTheme();
    });
  }
})();
