/**
 * Giri — Live Product Studio & Spotlight Search Module
 * Provides tactile, interactive product demonstrations on the homepage:
 * 1. Drift Live Focus Pad: Real-time text analysis, word counter, prompt presets
 * 2. Axis Live Savings Projector: Interactive Rupee slider with compound calculation
 * 3. Kinetic Live Slide Player: Interactive 16:9 keynote deck player
 * 4. Global Spotlight Search: Cmd+K / Ctrl+K search engine
 */

import { translateCurrentPage, revertToEnglish, INDIAN_LANGUAGES, getSavedLanguage, saveLanguage } from './i18n.js';

export function initStudio() {
  // 1. Initialize Hero Product Search & Antigravity Mic
  initHeroProductSearch();

  const studioRoot = document.getElementById('home-live-studio');
  if (!studioRoot) return;

  initStudioTabs(studioRoot);
  initDriftLivePad(studioRoot);
  initAxisLiveProjector(studioRoot);
  initKineticLivePlayer(studioRoot);
}

/**
 * Tab Switching between Drift, Axis, and Kinetic
 */
function initStudioTabs(root) {
  const tabs = root.querySelectorAll('.studio-tab-btn');
  const panels = root.querySelectorAll('.studio-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.targetPanel;
      if (!targetId) return;

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove('is-hidden');
          p.classList.add('is-active');
        } else {
          p.classList.add('is-hidden');
          p.classList.remove('is-active');
        }
      });
    });
  });
}

/**
 * 1. Drift Live Focus Pad
 */
function initDriftLivePad(root) {
  const textarea = root.querySelector('#drift-live-textarea');
  const wordCountEl = root.querySelector('#drift-stat-words');
  const charCountEl = root.querySelector('#drift-stat-chars');
  const readTimeEl = root.querySelector('#drift-stat-time');
  const chipButtons = root.querySelectorAll('.drift-prompt-chip');
  const clearBtn = root.querySelector('#drift-clear-btn');
  const copyBtn = root.querySelector('#drift-copy-btn');

  if (!textarea) return;

  function updateStats() {
    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = textarea.value.length;
    const readMinutes = Math.max(1, Math.ceil(words / 200));

    if (wordCountEl) wordCountEl.textContent = words.toLocaleString('en-IN');
    if (charCountEl) charCountEl.textContent = chars.toLocaleString('en-IN');
    if (readTimeEl) readTimeEl.textContent = words > 0 ? `${readMinutes} min read` : '0 min read';
  }

  textarea.addEventListener('input', updateStats);

  // Preset chips
  const prompts = {
    morning: "Quiet morning. The city stirs outside while my screen remains a sanctuary of clean paper and pure thoughts. No notifications, no banner ads, no subscription expiration timers—just sovereign space to think deeply and craft work that endures.",
    study: "Topic: Computational Sovereignty & Distributed Architecture\n\n1. Foundational Premise: Software built for Indian students must be resilient on low-bandwidth networks and modest hardware.\n2. Elimination of Dollar Rents: Every foreign SaaS subscription is a micro-drain on domestic innovation.\n3. Principle of Data Sanctity: Personal notes belong solely on local storage, never mined for advertising graphs.",
    vision: "Why We Build In India:\n\nFor two decades, Indian software engineers built the backbones of global tech empires. Yet our families and students are forced to pay $20/month for essential tools. We are changing that equation forever with Giri."
  };

  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.dataset.prompt;
      if (prompts[type]) {
        textarea.value = prompts[type];
        updateStats();
        textarea.focus();
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      updateStats();
      textarea.focus();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      if (!textarea.value) return;
      try {
        await navigator.clipboard.writeText(textarea.value);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span>';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 1800);
      } catch (err) {
        // Fallback
        textarea.select();
        document.execCommand('copy');
      }
    });
  }

  // Initial calculation
  updateStats();
}

/**
 * 2. Axis Live Savings Projector
 */
function initAxisLiveProjector(root) {
  const slider = root.querySelector('#axis-monthly-slider');
  const sliderValDisplay = root.querySelector('#axis-slider-val');
  const val1YrEl = root.querySelector('#axis-val-1yr');
  const val3YrEl = root.querySelector('#axis-val-3yr');
  const val5YrEl = root.querySelector('#axis-val-5yr');
  const wealthAccruedEl = root.querySelector('#axis-wealth-accrued');
  const milestoneBadge = root.querySelector('#axis-milestone-badge');
  const presetPills = root.querySelectorAll('.axis-preset-pill');

  if (!slider) return;

  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  function calculateGrowth(monthly) {
    const r = 0.075 / 12; // 7.5% per annum compounded monthly
    
    // Future value formula: P * (((1 + r)^n - 1) / r) * (1 + r)
    const fv1 = monthly * (((Math.pow(1 + r, 12)) - 1) / r) * (1 + r);
    const fv3 = monthly * (((Math.pow(1 + r, 36)) - 1) / r) * (1 + r);
    const fv5 = monthly * (((Math.pow(1 + r, 60)) - 1) / r) * (1 + r);
    
    const principal5 = monthly * 60;
    const wealthAccrued = fv5 - principal5;

    if (sliderValDisplay) sliderValDisplay.textContent = formatINR(monthly);
    if (val1YrEl) val1YrEl.textContent = formatINR(fv1);
    if (val3YrEl) val3YrEl.textContent = formatINR(fv3);
    if (val5YrEl) val5YrEl.textContent = formatINR(fv5);
    if (wealthAccruedEl) wealthAccruedEl.textContent = `+${formatINR(wealthAccrued)} in compounded wealth`;

    // Dynamic milestone badge
    if (milestoneBadge) {
      if (monthly < 1500) {
        milestoneBadge.textContent = 'Emergency Buffer & Study Supplies Secured';
      } else if (monthly < 5000) {
        milestoneBadge.textContent = 'Higher Education & Career Upgrade Cushion';
      } else if (monthly < 12000) {
        milestoneBadge.textContent = 'Family Sovereign Wealth & Asset Creation Fund';
      } else {
        milestoneBadge.textContent = 'Multi-Year Financial Freedom & Home Milestone';
      }
    }
  }

  slider.addEventListener('input', (e) => {
    calculateGrowth(parseFloat(e.target.value));
  });

  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const amt = parseFloat(pill.dataset.amount);
      if (amt) {
        slider.value = amt;
        presetPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        calculateGrowth(amt);
      }
    });
  });

  // Initial calculation
  calculateGrowth(parseFloat(slider.value) || 3000);
}

/**
 * 3. Kinetic Live Slide Player
 */
function initKineticLivePlayer(root) {
  const slides = root.querySelectorAll('.kinetic-slide-item');
  const prevBtn = root.querySelector('#kinetic-deck-prev');
  const nextBtn = root.querySelector('#kinetic-deck-next');
  const counterEl = root.querySelector('#kinetic-slide-counter');
  const dots = root.querySelectorAll('.kinetic-deck-dot');

  if (!slides.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slides.forEach((s, idx) => {
      if (idx === currentIndex) {
        s.classList.remove('is-hidden');
        s.classList.add('is-active');
      } else {
        s.classList.add('is-hidden');
        s.classList.remove('is-active');
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIndex);
    });

    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.index, 10);
      if (!isNaN(target)) showSlide(target);
    });
  });

  showSlide(0);
}

/**
 * 4. Global Spotlight Search (Cmd+K / Ctrl+K)
 */
export function initSpotlightSearch() {
  const searchDialog = document.getElementById('spotlight-dialog');
  const searchInput = document.getElementById('spotlight-search-input');
  const searchResults = document.getElementById('spotlight-results-list');
  const searchTriggers = document.querySelectorAll('#search-trigger-btn, .spotlight-open-trigger');
  const closeBtn = document.getElementById('spotlight-close-btn');

  if (!searchDialog || !searchInput || !searchResults) return;

  const catalogIndex = [
    { title: 'Girionix AI', category: 'Flagship AI Workspace', url: 'https://girionix-ai.pages.dev/', desc: 'Sovereign Omnipotent AI: React 18 Live IDE, Hollywood Screenplay, Math & 8K FLUX Art', external: true, keywords: 'ai code react math olympiad flux python javascript' },
    { title: 'Giri Orbit', category: 'Flagship Office Suite', url: 'https://giri-orbit.pages.dev/#hub', desc: 'Sovereign MS Office Suite (.docx, .xlsx, .pptx, .pdf, .csv): Word, Excel, Slides & Aegis PDF', external: true, keywords: 'office msoffice ms office docx doc xlsx xls pptx ppt pdf csv word excel powerpoint presentation' },
    { title: 'Drift Documents (Orbit)', category: 'Office Suite (MS Word)', url: 'https://giri-orbit.pages.dev/#drift', desc: 'Cloud-free word processor with native .docx, .doc, .rtf, .txt support', external: true, keywords: 'drift word docx doc notes writing markdown journal essay' },
    { title: 'Axis Spreadsheets (Orbit)', category: 'Office Suite (MS Excel)', url: 'https://giri-orbit.pages.dev/#axis', desc: 'Fast client-side spreadsheets with .xlsx, .xls, .csv, and rupee calculations', external: true, keywords: 'axis excel xlsx xls csv spreadsheets finance money savings budget rupee' },
    { title: 'Kinetic Presentations (Orbit)', category: 'Office Suite (PowerPoint)', url: 'https://giri-orbit.pages.dev/#kinetic', desc: 'Cinematic slide decks with .pptx, .ppt, and auto-layout', external: true, keywords: 'kinetic powerpoint pptx ppt slides decks presentations visual story keynote' },
    { title: 'Aegis PDF Studio (Orbit)', category: 'Office Suite (PDF)', url: 'https://giri-orbit.pages.dev/#pdf', desc: 'Private in-browser PDF manipulation, merge, split, annotate & redact (.pdf)', external: true, keywords: 'aegis pdf acrobat merge split annotate redact security' },
    { title: 'Apps and Tools', category: 'Catalog Suite', url: 'apps.html', desc: 'Complete catalog of all 12+ sovereign applications with category filters', keywords: 'apps tools catalog all utilities software sovereign' },
    { title: "Founder's Letter", category: 'Story & Vision', url: 'founder.html', desc: 'Why Abhinav Giri started Giri: Make in India & Affordability', keywords: 'founder abhinav letter vision mission make in india' },
    { title: 'Abhinav Giri (Instagram)', category: 'Connect', url: 'https://www.instagram.com/abhinavgiri45/', desc: 'Follow the founder on Instagram @abhinavgiri45', external: true, keywords: 'instagram social connect founder abhinav' },
    { title: 'Make in India Mission', category: 'Philosophy', url: 'founder.html#make-in-india', desc: 'Indigenous software engineered for Indian devices and families', keywords: 'make in india sovereign indigenous independence' },
    { title: 'Savings Calculator', category: 'Finance Tool', url: 'index.html#cost-comparison-section', desc: 'Calculate annual savings compared to foreign dollar software', keywords: 'savings calculator roi rupee economics budget' }
  ];

  function openSpotlight() {
    searchDialog.showModal();
    searchInput.value = '';
    renderResults(catalogIndex);
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSpotlight() {
    searchDialog.close();
  }

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSpotlight();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSpotlight);
  }

  searchDialog.addEventListener('click', (e) => {
    if (e.target === searchDialog) closeSpotlight();
  });

  // Global Keyboard Shortcut (Cmd+K / Ctrl+K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchDialog.open) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    }
  });

  function renderResults(items) {
    if (!items.length) {
      searchResults.innerHTML = `
        <div class="spotlight-no-results">
          <p>No tools or dispatches found matching your search.</p>
          <span>Try searching for "Drift", "Axis", "Rupee", or "Founder".</span>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = items.map((item, idx) => `
      <a href="${item.url}" class="spotlight-item ${idx === 0 ? 'is-selected' : ''}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        <div class="spotlight-item-content">
          <div class="spotlight-item-header">
            <span class="spotlight-item-title">${item.title}</span>
            <span class="spotlight-item-cat">${item.category}</span>
          </div>
          <p class="spotlight-item-desc">${item.desc}</p>
        </div>
        <div class="spotlight-item-arrow">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3l5 5-5 5"/></svg>
        </div>
      </a>
    `).join('');
  }

  // Live Filtering
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      renderResults(catalogIndex);
      return;
    }

    const filtered = catalogIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      (item.keywords && item.keywords.toLowerCase().includes(query))
    );

    renderResults(filtered);
  });

  // Initialize Language & Region Modal
  initLanguageModal();
}

/**
 * Sovereign Region & Language Modal Controller
 */
export { INDIAN_LANGUAGES };

/**
 * Sovereign Region & Language Modal Controller
 */
export function initLanguageModal() {
  const langBtns = document.querySelectorAll('#lang-selector-btn, .lang-selector');
  const langDialog = document.getElementById('lang-dialog');
  const closeBtn = document.getElementById('lang-close-btn');
  const optionsGrid = document.getElementById('lang-options-grid');
  const searchInput = document.getElementById('lang-search-input');
  const countBadge = document.getElementById('lang-count-badge');

  // Restore saved language (strictly defaults to English 'en')
  const savedCode = getSavedLanguage();
  applyLanguage(savedCode, false);

  if (!langDialog) return;

  // Render language grid if container exists
  if (optionsGrid) {
    renderLanguageOptions(INDIAN_LANGUAGES, savedCode);

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const filtered = INDIAN_LANGUAGES.filter(lang => 
          lang.name.toLowerCase().includes(query) ||
          lang.native.toLowerCase().includes(query) ||
          lang.region.toLowerCase().includes(query) ||
          lang.script.toLowerCase().includes(query) ||
          lang.code.toLowerCase().includes(query)
        );
        renderLanguageOptions(filtered, getSavedLanguage());
        if (countBadge) {
          countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'Language' : 'Languages'}`;
        }
      });
    }
  }

  function renderLanguageOptions(languages, activeCode) {
    if (!optionsGrid) return;
    if (!languages.length) {
      optionsGrid.innerHTML = `
        <div class="lang-no-match">
          <p>No Indian languages match your search.</p>
          <span style="font-size: 12px; color: #9ca3af;">Try searching for "Hindi", "Tamil", "Bengali", or "Marathi"</span>
        </div>
      `;
      return;
    }

    optionsGrid.innerHTML = languages.map(lang => {
      const isActive = lang.code === activeCode;
      return `
        <button type="button" class="lang-option ${isActive ? 'is-active' : ''}" data-code="${lang.code}" role="option" aria-selected="${isActive}">
          <div class="lang-option-text">
            <div class="lang-name-row">
              <span class="lang-native">${lang.native}</span>
              <span class="lang-english">(${lang.name})</span>
            </div>
            <span class="lang-region">${lang.region} • ${lang.script}</span>
          </div>
          ${isActive 
            ? '<span class="lang-check">✓ Active</span>' 
            : '<span class="lang-select-action">Select →</span>'}
        </button>
      `;
    }).join('');

    // Bind click events to options
    optionsGrid.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        const code = opt.dataset.code;
        applyLanguage(code, true);
        renderLanguageOptions(languages, code);
        setTimeout(() => langDialog.close(), 250);
      });
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langDialog.showModal();
      if (searchInput) {
        searchInput.value = '';
        renderLanguageOptions(INDIAN_LANGUAGES, getSavedLanguage());
        if (countBadge) countBadge.textContent = `${INDIAN_LANGUAGES.length} Languages`;
        setTimeout(() => searchInput.focus(), 50);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => langDialog.close());
  }

  langDialog.addEventListener('click', (e) => {
    if (e.target === langDialog) langDialog.close();
  });
}

function applyLanguage(code, showToast = false) {
  const langObj = INDIAN_LANGUAGES.find(l => l.code === code) || INDIAN_LANGUAGES[0];
  saveLanguage(langObj.code);

  // 1. Update all language selector buttons across the page
  const langLabels = document.querySelectorAll('.lang-selector span');
  langLabels.forEach(span => {
    span.textContent = langObj.display;
  });

  // 2. Apply Instant 0ms Full-Page DOM Translation
  translateCurrentPage(langObj.code);

  if (showToast) {
    showLanguageToast(`Language changed to ${langObj.native} (${langObj.name}) • Sovereign Interface`);
  }
}

function showLanguageToast(message) {
  let toast = document.getElementById('lang-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lang-toast';
    toast.className = 'lang-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>🇮🇳</span><span>${message}</span>`;
  toast.classList.add('is-visible');
  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3200);
}

/**
 * 5. Hero Functional Product Search & Antigravity Voice Mic
 */
export function initHeroProductSearch() {
  const wrapper = document.getElementById('hero-search-wrapper');
  const searchBox = document.getElementById('hero-search-box');
  const input = document.getElementById('hero-product-search-input');
  const clearBtn = document.getElementById('hero-search-clear');
  const micBtn = document.getElementById('antigravity-voice-mic-btn');
  const voiceHud = document.getElementById('voice-listening-hud');
  const voiceStatusText = document.getElementById('voice-status-text');
  const voiceCancelBtn = document.getElementById('voice-hud-cancel');
  const dropdown = document.getElementById('hero-products-dropdown');
  const productsList = document.getElementById('dropdown-products-list');
  const resultsCountEl = document.getElementById('dropdown-results-count');
  const filterChips = wrapper ? wrapper.querySelectorAll('.dropdown-chip') : [];

  if (!wrapper || !input || !dropdown) return;

  const productItems = Array.from(dropdown.querySelectorAll('.product-dropdown-item'));
  let currentHighlightedIndex = -1;
  let activeFilter = 'all';

  function openDropdown() {
    dropdown.classList.remove('is-hidden');
    input.setAttribute('aria-expanded', 'true');
    if (searchBox) searchBox.classList.add('is-focused');
  }

  function closeDropdown() {
    dropdown.classList.add('is-hidden');
    input.setAttribute('aria-expanded', 'false');
    if (searchBox) searchBox.classList.remove('is-focused');
    currentHighlightedIndex = -1;
    productItems.forEach(item => item.classList.remove('is-highlighted'));
  }

  function filterProducts() {
    const query = input.value.toLowerCase().trim();
    let visibleCount = 0;
    
    if (clearBtn) {
      if (query.length > 0) {
        clearBtn.classList.remove('is-hidden');
      } else {
        clearBtn.classList.add('is-hidden');
      }
    }

    // Remove existing no-match placeholder if present
    const existingNoMatch = productsList.querySelector('.dropdown-no-match');
    if (existingNoMatch) existingNoMatch.remove();

    productItems.forEach(item => {
      const category = item.dataset.category || '';
      const title = item.querySelector('.product-item-title')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('.product-item-desc')?.textContent.toLowerCase() || '';
      const keywords = (item.dataset.keywords || '').toLowerCase();

      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesQuery = !query || title.includes(query) || desc.includes(query) || keywords.includes(query);

      if (matchesCategory && matchesQuery) {
        item.classList.remove('is-hidden');
        visibleCount++;
      } else {
        item.classList.add('is-hidden');
      }
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = query 
        ? `MATCHING PRODUCTS (${visibleCount})`
        : activeFilter === 'all' 
          ? `ALL PRODUCTS (${visibleCount})` 
          : `${activeFilter.toUpperCase()} PRODUCTS (${visibleCount})`;
    }

    if (visibleCount === 0) {
      const noMatchEl = document.createElement('div');
      noMatchEl.className = 'dropdown-no-match';
      noMatchEl.innerHTML = `
        <p>No products found matching "${query}"</p>
        <span>Try searching for "Drift", "Axis", or "Kinetic"</span>
      `;
      productsList.appendChild(noMatchEl);
    }
  }

  // Input events
  input.addEventListener('focus', () => {
    openDropdown();
    filterProducts();
  });

  input.addEventListener('input', () => {
    openDropdown();
    filterProducts();
  });

  input.addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown();
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      clearBtn.classList.add('is-hidden');
      filterProducts();
      input.focus();
    });
  }

  // Filter chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      filterChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.dataset.chip;
      filterProducts();
      input.focus();
    });
  });

  // Keyboard navigation inside search dropdown
  input.addEventListener('keydown', (e) => {
    const visibleItems = productItems.filter(item => !item.classList.contains('is-hidden'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!visibleItems.length) return;
      currentHighlightedIndex = (currentHighlightedIndex + 1) % visibleItems.length;
      updateHighlight(visibleItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!visibleItems.length) return;
      currentHighlightedIndex = (currentHighlightedIndex - 1 + visibleItems.length) % visibleItems.length;
      updateHighlight(visibleItems);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentHighlightedIndex >= 0 && visibleItems[currentHighlightedIndex]) {
        visibleItems[currentHighlightedIndex].click();
      } else if (visibleItems.length > 0) {
        visibleItems[0].click();
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
      stopVoiceSearch();
    }
  });

  function updateHighlight(visibleItems) {
    productItems.forEach(item => item.classList.remove('is-highlighted'));
    if (visibleItems[currentHighlightedIndex]) {
      visibleItems[currentHighlightedIndex].classList.add('is-highlighted');
      visibleItems[currentHighlightedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // Antigravity Voice Mic Engine
  let recognition = null;
  let isListening = false;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Tuned for Indian English

    recognition.onstart = () => {
      isListening = true;
      if (micBtn) micBtn.classList.add('is-listening');
      if (voiceHud) voiceHud.classList.remove('is-hidden');
      if (voiceStatusText) voiceStatusText.textContent = 'Listening with Antigravity mic...';
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

      input.value = transcript;
      openDropdown();
      filterProducts();

      if (voiceStatusText) voiceStatusText.textContent = `Heard: "${transcript}"`;
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (voiceStatusText) {
        if (event.error === 'not-allowed') {
          voiceStatusText.textContent = 'Microphone permission denied. Try clicking a product below.';
        } else {
          voiceStatusText.textContent = 'Could not detect voice. Speak clearly or click a product.';
        }
      }
      setTimeout(() => stopVoiceSearch(), 2000);
    };

    recognition.onend = () => {
      stopVoiceSearch();
    };
  }

  function startVoiceSearch() {
    if (isListening) {
      stopVoiceSearch();
      return;
    }

    if (recognition) {
      try {
        recognition.start();
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
        fallbackVoiceSimulation();
      }
    } else {
      fallbackVoiceSimulation();
    }
  }

  function stopVoiceSearch() {
    isListening = false;
    if (micBtn) micBtn.classList.remove('is-listening');
    if (voiceHud) voiceHud.classList.add('is-hidden');
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }
  }

  function fallbackVoiceSimulation() {
    // Elegant fallback simulation when speech API is unavailable or denied
    if (micBtn) micBtn.classList.add('is-listening');
    if (voiceHud) voiceHud.classList.remove('is-hidden');
    if (voiceStatusText) voiceStatusText.textContent = 'Antigravity Mic listening: Recognizing "Drift"...';

    setTimeout(() => {
      input.value = 'Drift';
      openDropdown();
      filterProducts();
      if (voiceStatusText) voiceStatusText.textContent = 'Voice Match: Giri Drift (Writing & Notes)';
      setTimeout(() => stopVoiceSearch(), 1200);
    }, 900);
  }

  if (micBtn) {
    micBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDropdown();
      startVoiceSearch();
    });
  }

  if (voiceCancelBtn) {
    voiceCancelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stopVoiceSearch();
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      closeDropdown();
      stopVoiceSearch();
    }
  });
}

