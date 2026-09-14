/**
 * Giri — Interactive Tool Selector Wizard (wizard.js)
 * Helps students, families, writers, and builders instantly discover
 * the ideal Giri application for their workflow with 1-click launch.
 */

export const WIZARD_DATA = {
  students: {
    badge: 'EDUCATION & HOMEWORK • ₹0',
    title: 'Girionix AI & Student Productivity Suite',
    desc: 'Solve complex Olympiad mathematics, draft research papers in Drift without distractions, and design school keynote presentations in minutes—with zero dollar subscriptions.',
    launchUrl: 'https://girionix-ai.pages.dev/',
    launchText: 'Launch Girionix AI Workspace ↗',
    category: 'ai',
    bullets: [
      'KaTeX math proof & Olympiad symbolic derivation engine',
      'Distraction-free essay notes with instant local autosave',
      'Rapid slide deck creator for classroom keynotes'
    ]
  },
  writers: {
    badge: 'DEEP FOCUS • 100% PRIVATE',
    title: 'Giri Drift — Mindful Writing Studio',
    desc: 'An elegant, distraction-free environment for authors, researchers, and students. Pure typography, ambient calm, and zero invasive tracking.',
    launchUrl: 'drift.html',
    launchText: 'Open Dedicated Drift Studio',
    category: 'writing',
    bullets: [
      'Zero remote tracking, zero ad interruptions',
      'Live word, character, and estimated reading time telemetry',
      'Local-first privacy: your words never leave your hardware'
    ]
  },
  finance: {
    badge: 'RUPEE-FIRST • LOCAL STORAGE',
    title: 'Giri Axis — Family & Personal Budgeting',
    desc: 'Visual personal finance designed for Indian households. Track monthly savings, compare expenditures, and build wealth with total privacy.',
    launchUrl: 'axis.html',
    launchText: 'Open Dedicated Axis Finance',
    category: 'finance',
    bullets: [
      'Visual breakdown of monthly household savings in Rupees',
      '100% Client-side: zero bank API logins, zero remote databases',
      'Instant privacy and offline calculations'
    ]
  },
  presentations: {
    badge: 'EFFORTLESS KEYNOTES • QUICK SLIDES',
    title: 'Giri Kinetic — Rapid Slide Presentation Engine',
    desc: 'Build crisp, professional presentation decks in minutes. Clean typographic layouts and intuitive keyboard shortcuts replace bloated software.',
    launchUrl: 'kinetic.html',
    launchText: 'Open Dedicated Kinetic Studio',
    category: 'presentation',
    bullets: [
      'Craft full slide decks in less than 3 minutes',
      'Keyboard-first flow (Space, Left/Right arrow keys)',
      'Zero monthly dollar license fees'
    ]
  },
  ai: {
    badge: 'FLAGSHIP TITAN AI • AIR-GAPPED',
    title: 'Girionix AI — Sovereign Polymath Workspace',
    desc: 'The complete sovereign AI operating environment unifying React 18 in-browser execution, KaTeX derivations, Hollywood screenplay beat sheets, and 8K FLUX photorealism.',
    launchUrl: 'https://girionix-ai.pages.dev/',
    launchText: 'Launch Girionix AI Workspace ↗',
    category: 'ai',
    bullets: [
      'Live React 18 & TypeScript sandbox with zero server lag',
      'KaTeX mathematical proofs & Olympiad reasoning',
      '100% On-device & air-gapped Titan physical compute'
    ]
  }
};

export class ToolWizard {
  constructor() {
    this.currentPersona = 'students';
    this.init();
  }

  init() {
    this.bindEvents();
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.bindEvents());
    }
  }

  bindEvents() {
    const chips = document.querySelectorAll('.wizard-persona-chip');
    chips.forEach(chip => {
      if (!chip._wizardBound) {
        chip._wizardBound = true;
        chip.addEventListener('click', () => {
          const persona = chip.getAttribute('data-persona');
          if (persona && WIZARD_DATA[persona]) {
            this.selectPersona(persona);
          }
        });
      }
    });
  }

  selectPersona(persona) {
    this.currentPersona = persona;
    const data = WIZARD_DATA[persona];

    // Update chips UI
    document.querySelectorAll('.wizard-persona-chip').forEach(c => {
      c.classList.toggle('is-active', c.getAttribute('data-persona') === persona);
    });

    // Update recommendation box
    const badge = document.getElementById('wizard-badge');
    const title = document.getElementById('wizard-title');
    const desc = document.getElementById('wizard-desc');
    const cta = document.getElementById('wizard-cta');
    const ctaText = document.getElementById('wizard-cta-text');
    const bulletsWrap = document.getElementById('wizard-bullets');

    if (badge) badge.textContent = data.badge;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (cta) cta.setAttribute('href', data.launchUrl);
    if (ctaText) ctaText.textContent = data.launchText;

    if (bulletsWrap) {
      bulletsWrap.innerHTML = data.bullets.map(b => `
        <div class="wizard-bullet-item">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          <span>${b}</span>
        </div>
      `).join('');
    }

    // If on apps.html, sync with filter bar
    const filterBtn = document.querySelector(`.filter-chip[data-filter="${data.category}"]`);
    if (filterBtn && typeof filterBtn.click === 'function') {
      filterBtn.click();
    }
  }
}

export const toolWizard = new ToolWizard();
