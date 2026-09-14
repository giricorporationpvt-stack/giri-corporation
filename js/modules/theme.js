/**
 * Giri — Sovereign Theme Engine (theme.js)
 * High-performance, zero-latency dark/light luxury theme management.
 * Preserves user preference in localStorage without external dependencies.
 */

export class ThemeEngine {
  constructor() {
    this.STORAGE_KEY = 'giri_theme';
    this.currentTheme = this.getStoredTheme();
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  getStoredTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || 'system';
  }

  getEffectiveTheme() {
    if (this.currentTheme === 'system') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  init() {
    this.applyTheme(this.getEffectiveTheme());

    // Listen for OS system theme changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme(this.getEffectiveTheme());
      }
    });

    // Wire all theme toggle buttons
    this.bindButtons();

    // Re-bind buttons if DOM changes
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.bindButtons());
    } else {
      this.bindButtons();
    }
  }

  bindButtons() {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      if (!btn._themeBound) {
        btn._themeBound = true;
        btn.addEventListener('click', () => this.toggleTheme());
      }
      this.updateButtonUI(btn);
    });
  }

  toggleTheme() {
    const effective = this.getEffectiveTheme();
    const nextTheme = effective === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(this.getEffectiveTheme());
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => this.updateButtonUI(btn));

    // Dispatch custom event for sub-modules
    window.dispatchEvent(new CustomEvent('giri:theme-change', { detail: { theme } }));
  }

  updateButtonUI(btn) {
    const isDark = this.getEffectiveTheme() === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.setAttribute('title', isDark ? 'Switch to Light Mode (Alt+T)' : 'Switch to Dark Mode (Alt+T)');
    btn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <circle cx="12" cy="12" r="5"></circle>
           <line x1="12" y1="1" x2="12" y2="3"></line>
           <line x1="12" y1="21" x2="12" y2="23"></line>
           <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
           <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
           <line x1="1" y1="12" x2="3" y2="12"></line>
           <line x1="21" y1="12" x2="23" y2="12"></line>
           <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
           <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
         </svg>`
      : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
         </svg>`;
  }
}

// Global Singleton
export const themeEngine = new ThemeEngine();
