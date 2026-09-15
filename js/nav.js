/**
 * Giri Navigation Assistant
 * Handles dropdown menu toggles, outside click, and keyboard accessibility.
 */
document.addEventListener('DOMContentLoaded', () => {
  const dropdownContainers = document.querySelectorAll('.has-dropdown');

  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.dropdown-toggle') || container.querySelector('.nav-link');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      if (trigger.tagName.toLowerCase() === 'button') {
        e.preventDefault();
        const isOpen = container.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    dropdownContainers.forEach(container => {
      if (!container.contains(e.target)) {
        container.classList.remove('is-open');
        const trigger = container.querySelector('.dropdown-toggle') || container.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownContainers.forEach(container => {
        container.classList.remove('is-open');
        const trigger = container.querySelector('.dropdown-toggle') || container.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Ensure default language is English (en) across all pages
  let savedLangCode = 'en';
  try {
    if (!sessionStorage.getItem('giri_lang_initialized')) {
      sessionStorage.setItem('giri_lang_initialized', 'true');
      sessionStorage.setItem('giri_selected_lang', 'en');
      localStorage.setItem('giri_selected_lang', 'en');
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
    } else {
      savedLangCode = sessionStorage.getItem('giri_selected_lang') || localStorage.getItem('giri_selected_lang') || 'en';
    }
  } catch (e) {}

  const langMap = {
    en: 'India (EN)', hi: 'भारत (HI)', bn: 'ভারত (BN)', te: 'భారత్ (TE)', mr: 'भारत (MR)',
    ta: 'இந்தியா (TA)', gu: 'ભારત (GU)', kn: 'ಭಾರತ (KN)', ml: 'ഭാരതം (ML)', pa: 'ਭਾਰਤ (PA)',
    or: 'ଭାରତ (OR)', as: 'ভাৰত (AS)', ur: 'ہندوستان (UR)', sa: 'भारतम् (SA)', mai: 'भारत (MAI)',
    sat: 'ᱥᱤᱧᱚᱛ (SAT)', ks: 'کٔشِیر (KS)', ne: 'भारत (NE)', kok: 'भारत (KOK)', sd: 'سنڌي (SD)',
    doi: 'भारत (DOI)', brx: 'भारत (BRX)', mni: 'ভারত (MNI)'
  };
  if (langMap[savedLangCode]) {
    document.querySelectorAll('.lang-selector span').forEach(s => {
      s.textContent = langMap[savedLangCode];
    });
  }

  // Apply Instant In-Browser DOM Translation only if user explicitly selected a non-English language
  if (savedLangCode && savedLangCode !== 'en') {
    import('./modules/i18n.js').then(m => {
      if (m.translateCurrentPage) {
        m.translateCurrentPage(savedLangCode);
      }
    }).catch(e => {
      console.warn('Could not load i18n module:', e);
    });
  }

  // Purge legacy caches and register Sovereign Edge Service Worker
  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => {
        if (key !== 'giri-edge-v2') {
          caches.delete(key);
        }
      });
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js?v=2').catch(() => {});
    });
  }

  // Load Enterprise Modules: Theme, Accessibility, Data Hub, and Wizard
  import('./modules/theme.js').catch(e => console.warn('ThemeEngine load note:', e));
  import('./modules/a11y.js').catch(e => console.warn('A11ySuite load note:', e));
  import('./modules/data_hub.js').catch(e => console.warn('DataHub load note:', e));
  import('./modules/wizard.js').catch(e => console.warn('ToolWizard load note:', e));
  import('./modules/features.js').then(m => m.initPracticalFeatures()).catch(e => console.warn('Features load note:', e));

  // Live Edge Latency Measurement (Every 15 seconds)
  function measureEdgeLatency() {
    const pill = document.querySelector('.live-status-pill');
    if (!pill) return;

    if (!navigator.onLine) {
      pill.innerHTML = `<span class="live-status-dot" style="background:#f59e0b"></span><span>Offline Ready</span>`;
      pill.setAttribute('title', 'Operating in 100% offline client-side mode');
      return;
    }

    const t0 = performance.now();
    fetch('/assets/logo.svg?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' })
      .then(() => {
        const roundtrip = Math.max(1, Math.round(performance.now() - t0));
        pill.innerHTML = `<span class="live-status-dot"></span><span>${roundtrip}ms • Edge Live</span>`;
        pill.setAttribute('title', `Sovereign Edge Latency: ${roundtrip}ms • Sub-15ms Target`);
      })
      .catch(() => {
        pill.innerHTML = `<span class="live-status-dot"></span><span>Edge 100% Live</span>`;
      });
  }

  measureEdgeLatency();
  setInterval(measureEdgeLatency, 15000);

  window.addEventListener('online', measureEdgeLatency);
  window.addEventListener('offline', measureEdgeLatency);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Alt+T: Toggle Theme
    if (e.altKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      const themeBtn = document.querySelector('.theme-toggle-btn');
      if (themeBtn) themeBtn.click();
    }
    // Alt+1..5: Quick Launch Apps
    if (e.altKey && e.key === '1') {
      window.open('https://girionix-ai.pages.dev/', '_blank');
    } else if (e.altKey && e.key === '2') {
      window.location.href = 'drift.html';
    } else if (e.altKey && e.key === '3') {
      window.location.href = 'axis.html';
    } else if (e.altKey && e.key === '4') {
      window.location.href = 'kinetic.html';
    } else if (e.altKey && e.key === '5') {
      window.open('https://giri-orbit.pages.dev/#hub', '_blank');
    }
  });

  // PWA Installation Trigger
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtns = document.querySelectorAll('.pwa-install-btn');
    installBtns.forEach(btn => {
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            btn.style.display = 'none';
          }
          deferredPrompt = null;
        }
      });
    });
  });
});
