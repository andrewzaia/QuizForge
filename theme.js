/* Load synchronously in the head before CSS to avoid a theme flash. */
(() => {
  'use strict';
  const storageKey = 'quizforge-theme';
  const root = document.documentElement;
  const system = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  let manual = null;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') manual = saved;
  } catch (_) {
    // Restricted storage: theme switching still works for this page view.
  }
  let current = manual || (system && system.matches ? 'dark' : 'light');
  function apply(theme) {
    current = theme;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0e14' : '#f5f7fb');
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.title = label;
  }
  apply(current);
  if (system) {
    const followSystem = event => {
      if (!manual) apply(event.matches ? 'dark' : 'light');
    };
    if (typeof system.addEventListener === 'function') system.addEventListener('change', followSystem);
    else if (typeof system.addListener === 'function') system.addListener(followSystem);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    apply(current);
    toggle.addEventListener('click', () => {
      manual = current === 'dark' ? 'light' : 'dark';
      try { window.localStorage.setItem(storageKey, manual); } catch (_) {}
      apply(manual);
    });
  });
})();
