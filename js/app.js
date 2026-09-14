/**
 * GIRI — SYSTEM DIRECTOR (APP.JS)
 * Central Orchestrator Module
 * 
 * - Coordinates hero & featured suite
 * - Mounts and binds ZeroGravityEngine into #giri-canvas
 * - Coordinates founder corner and search modal
 * - Strictly zero sign-in / sign-up and zero contact desk
 */

import { renderProjectCards } from './modules/projects.js';
import { renderDeveloperCards } from './modules/developers.js';
import { ZeroGravityEngine } from './physics.js';
import { initStudio, initSpotlightSearch } from './modules/studio.js';

class GiriDirector {
  constructor() {
    this.canvas = document.getElementById('giri-canvas');
    this.physics = null;
    this.allCards = [];
    this.currentFilter = 'all';

    this.init();
  }

  init() {
    // 1. Initialize interactive studio if present
    initStudio();

    // 2. Initialize global spotlight search
    initSpotlightSearch();

    // 3. Mount workspace canvas and physics if present
    if (!this.canvas) {
      return;
    }

    // 4. Mount Cards & Physics
    this.mountCards();
    this.bootPhysics();

    // 5. Bind Hero Actions & Mode Switcher
    this.bindHeroControls();

    // 6. Bind Featured Apps Quick Jump Actions
    this.bindFeaturedAppTriggers();

    // 7. Bind Dropdown Menus & Filters
    this.bindNavigationFilters();

    // 8. Bind Telemetry Controls
    this.bindHUDControls();
  }

  mountCards() {
    const projectCards = renderProjectCards();
    const developerCards = renderDeveloperCards();

    this.allCards = [
      projectCards[0],   // Giri Drift
      developerCards[0], // Abhinav Giri (Founder)
      projectCards[1],   // Giri Axis
      developerCards[1], // Elena Rostova
      projectCards[2],   // Giri Kinetic
      developerCards[2]  // Marcus Vance
    ];

    const fragment = document.createDocumentFragment();
    this.allCards.forEach(card => fragment.appendChild(card));
    this.canvas.appendChild(fragment);
  }

  bootPhysics() {
    this.physics = new ZeroGravityEngine(this.canvas, {
      topPadding: 24,
      bottomPadding: 24,
      sidePadding: 24,
      restitution: 0.75,
      friction: 0.94,
      ambientPower: 0.2
    });

    const width = this.canvas.clientWidth || 1200;
    const height = this.canvas.clientHeight || 840;
    const total = this.allCards.length;
    const cols = width > 1000 ? 3 : 2;
    const rows = Math.ceil(total / cols);

    const cellW = (width - 48) / cols;
    const cellH = (height - 48) / rows;

    this.allCards.forEach((cardEl, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const cardW = cardEl.classList.contains('card-developer') ? 370 : 430;
      const cardH = 320;

      const posX = 24 + col * cellW + Math.max(0, (cellW - cardW) * 0.5) + (Math.random() - 0.5) * 20;
      const posY = 24 + row * cellH + Math.max(0, (cellH - cardH) * 0.5) + (Math.random() - 0.5) * 15;

      this.physics.register(cardEl, posX, posY);
    });
  }

  bindHeroControls() {
    const ctaBtn = document.getElementById('hero-cta-btn');
    const modeGridBtn = document.getElementById('mode-grid-btn');
    const modeZeroGBtn = document.getElementById('mode-zerog-btn');
    const spotlightLaunchBtn = document.getElementById('spotlight-launch-btn');

    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        const suite = document.getElementById('suite-section');
        if (suite) {
          suite.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (spotlightLaunchBtn) {
      spotlightLaunchBtn.addEventListener('click', () => {
        this.focusOnCard('giri-kinetic');
      });
    }

    if (modeGridBtn && modeZeroGBtn) {
      modeGridBtn.addEventListener('click', () => {
        modeGridBtn.classList.add('is-active');
        modeZeroGBtn.classList.remove('is-active');
        const suite = document.getElementById('suite-section');
        if (suite) suite.scrollIntoView({ behavior: 'smooth' });
      });

      modeZeroGBtn.addEventListener('click', () => {
        modeZeroGBtn.classList.add('is-active');
        modeGridBtn.classList.remove('is-active');
        const canvasSec = document.getElementById('giri-canvas-section');
        if (canvasSec) canvasSec.scrollIntoView({ behavior: 'smooth' });
        if (this.physics) this.physics.scatter();
      });
    }
  }

  bindFeaturedAppTriggers() {
    const appItems = document.querySelectorAll('.app-item-card');
    appItems.forEach(item => {
      item.addEventListener('click', () => {
        const cardId = item.dataset.cardId;
        if (cardId === 'dev-abhinav') {
          const founderSec = document.getElementById('founder-corner');
          if (founderSec) {
            founderSec.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        this.focusOnCard(cardId);
      });
    });

    const exploreAllLink = document.getElementById('explore-all-link');
    if (exploreAllLink) {
      exploreAllLink.addEventListener('click', (e) => {
        e.preventDefault();
        const canvasSec = document.getElementById('giri-canvas-section');
        if (canvasSec) {
          canvasSec.scrollIntoView({ behavior: 'smooth' });
          this.setFilter('all');
        }
      });
    }
  }

  focusOnCard(targetId) {
    const canvasSec = document.getElementById('giri-canvas-section');
    if (canvasSec) {
      canvasSec.scrollIntoView({ behavior: 'smooth' });
    }

    this.allCards.forEach(card => {
      const match = card.dataset.productId === targetId || card.dataset.devId === targetId;
      if (match) {
        card.classList.remove('is-filtered-out');
        card.classList.add('is-focused-card');
        setTimeout(() => card.classList.remove('is-focused-card'), 3000);
      } else {
        card.classList.add('is-filtered-out');
        setTimeout(() => card.classList.remove('is-filtered-out'), 3500);
      }
    });
  }

  bindNavigationFilters() {
    const dropdownLinks = document.querySelectorAll('.dropdown-link[data-action=filter]');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        this.setFilter(target);
        const canvasSec = document.getElementById('giri-canvas-section');
        if (canvasSec) canvasSec.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.allCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('is-filtered-out');
      } else {
        card.classList.add('is-filtered-out');
      }
    });
  }

  bindSearchDialog() {
    const searchDialog = document.getElementById('search-dialog');
    const searchTrigger = document.getElementById('search-trigger-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchInput = document.getElementById('quick-search-input');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    if (searchTrigger && searchDialog) {
      searchTrigger.addEventListener('click', () => {
        searchDialog.showModal();
        if (searchInput) searchInput.focus();
      });
    }

    if (closeSearchBtn && searchDialog) {
      closeSearchBtn.addEventListener('click', () => searchDialog.close());
    }

    if (searchDialog) {
      searchDialog.addEventListener('click', (e) => {
        const rect = searchDialog.getBoundingClientRect();
        const isIn = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isIn) searchDialog.close();
      });
    }

    suggestionTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.dataset.query.toLowerCase();
        searchDialog.close();
        if (query.includes('drift')) this.focusOnCard('giri-drift');
        else if (query.includes('axis')) this.focusOnCard('giri-axis');
        else if (query.includes('kinetic')) this.focusOnCard('giri-kinetic');
        else if (query.includes('abhinav') || query.includes('founder')) {
          const founderSec = document.getElementById('founder-corner');
          if (founderSec) founderSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  bindHUDControls() {
    const toggleBtn = document.getElementById('physics-toggle-btn');
    const statusText = document.getElementById('physics-status-text');
    const statusIndicator = toggleBtn ? toggleBtn.querySelector('.status-indicator') : null;
    const recenterBtn = document.getElementById('recenter-btn');

    if (toggleBtn && this.physics) {
      toggleBtn.addEventListener('click', () => {
        const isRunning = this.physics.togglePause();
        if (isRunning) {
          statusText.textContent = 'Zero-G: Floating';
          statusIndicator.classList.remove('paused');
          statusIndicator.classList.add('live');
        } else {
          statusText.textContent = 'Zero-G: Paused';
          statusIndicator.classList.remove('live');
          statusIndicator.classList.add('paused');
        }
      });
    }

    if (recenterBtn && this.physics) {
      recenterBtn.addEventListener('click', () => {
        this.physics.scatter();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea, select')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (toggleBtn) toggleBtn.click();
      } else if (e.key === 'r' || e.key === 'R') {
        if (recenterBtn) recenterBtn.click();
      }
    });
  }
}

function bootApp() {
  if (!window.giriApp) {
    window.giriApp = new GiriDirector();
  }

  // Purge legacy caches and register Sovereign Edge Service Worker
  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => {
        if (key !== 'giri-edge-v3') {
          caches.delete(key);
        }
      });
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js?v=3').catch(() => {});
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}

