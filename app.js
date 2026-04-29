(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');

  function icon(mode) {
    if (mode === 'dark') {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
  }

  function renderTheme() {
    root.setAttribute('data-theme', theme);
    if (!toggle) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    toggle.innerHTML = icon(theme) + '<span>' + (theme === 'dark' ? 'Dark mode' : 'Light mode') + '</span>';
  }

  renderTheme();

  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      renderTheme();
    });
  }

  const phaseButtons = Array.from(document.querySelectorAll('[data-phase-button]'));
  const phasePanels = Array.from(document.querySelectorAll('[data-phase-panel]'));

  if (phaseButtons.length && phasePanels.length) {
    phaseButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const phase = button.dataset.phaseButton;
        phaseButtons.forEach(function (item) {
          item.setAttribute('aria-selected', String(item === button));
        });
        phasePanels.forEach(function (panel) {
          panel.classList.toggle('active', panel.dataset.phasePanel === phase);
        });
      });
    });
  }
})();
