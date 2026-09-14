/**
 * GIRI — APPS & TOOLS (PROJECTS MODULE)
 * Thoughtful, human-centric software for everyday users, writers, creators, and teams.
 * Proudly Made in India • Truly Affordable for Everyone
 * 
 * 1. Giri Drift: Distraction-free mindful notes & writing
 * 2. Giri Axis: Visual personal & family finance made effortless
 * 3. Giri Kinetic: Intuitive slide decks and visual storytelling
 */

export const projectsData = [
  {
    id: 'giri-drift',
    title: 'Giri Drift',
    category: 'Writing & Mindful Notes',
    status: 'Private & Free',
    icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
           </svg>`,
    type: 'drift'
  },
  {
    id: 'giri-axis',
    title: 'Giri Axis',
    category: 'Visual Budget & Finance',
    status: 'Simple & Encrypted',
    icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <line x1="18" y1="20" x2="18" y2="10"/>
             <line x1="12" y1="20" x2="12" y2="4"/>
             <line x1="6" y1="20" x2="6" y2="14"/>
           </svg>`,
    type: 'axis'
  },
  {
    id: 'giri-kinetic',
    title: 'Giri Kinetic',
    category: 'Presentations & Slides',
    status: 'Smart Templates',
    icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
             <line x1="8" y1="21" x2="16" y2="21"/>
             <line x1="12" y1="17" x2="12" y2="21"/>
           </svg>`,
    type: 'kinetic'
  }
];

/**
 * Construct Giri Drift card DOM (Writing app for real humans)
 */
function createDriftNode(data) {
  const card = document.createElement('article');
  card.className = 'giri-card card-drift';
  card.dataset.category = 'projects';
  card.dataset.productId = data.id;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${data.title} — ${data.category}`);

  card.innerHTML = `
    <div class="card-header drag-handle">
      <div class="card-identity">
        <div class="card-icon-badge">${data.icon}</div>
        <div class="card-title-group">
          <h3 class="card-title">${data.title}</h3>
          <span class="card-category-tag">${data.category}</span>
        </div>
      </div>
      <span class="card-badge status-live">${data.status}</span>
    </div>

    <div class="card-body">
      <div class="editor-mock">
        <!-- Friendly Formatting Toolbar -->
        <div class="editor-toolbar">
          <div class="formatting-glyphs">
            <button type="button" class="glyph-btn active" title="Bold (Ctrl+B)">B</button>
            <button type="button" class="glyph-btn" title="Italic (Ctrl+I)"><em>I</em></button>
            <button type="button" class="glyph-btn" title="Highlight">✎</button>
            <button type="button" class="glyph-btn" title="Heading">H1</button>
            <button type="button" class="glyph-btn" title="Quote">“</button>
            <button type="button" class="glyph-btn" title="Checklist">✓</button>
          </div>
          <span class="editor-doc-tab">morning_ideas.md</span>
        </div>

        <!-- Editor Content (Relatable & Inspiring) -->
        <div class="editor-content">
          <div class="editor-gutters" aria-hidden="true">
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
          <div class="editor-text-body">
            <div class="editor-heading">The Art of Slow Thinking</div>
            <div class="editor-paragraph">The best ideas rarely arrive in a rush. Give yourself space to breathe, reflect, and write without noise.</div>
            <div class="editor-checklist-item">
              <span class="check-icon">✓</span>
              <span>Draft the community project proposal</span>
            </div>
            <div class="editor-checklist-item">
              <span class="check-icon">✓</span>
              <span>Finalize chapter 3: Building things people love</span><span class="cursor-caret"></span>
            </div>
          </div>
        </div>

        <!-- Editor Status Bar -->
        <div class="editor-status-bar">
          <span>🌿 Calming Focus Mode</span>
          <span>482 words • 3 min read • Auto-saved</span>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <span>Distraction-free space for everyday thoughts</span>
      <span style="font-weight: 600; color: #059669;">100% PRIVATE</span>
    </div>
  `;

  // Attach micro-interactions to glyph buttons
  const glyphs = card.querySelectorAll('.glyph-btn');
  glyphs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      glyphs.forEach(g => g.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  return card;
}

/**
 * Construct Giri Axis card DOM (Visual finance for everyday people)
 */
function createAxisNode(data) {
  const card = document.createElement('article');
  card.className = 'giri-card card-axis';
  card.dataset.category = 'projects';
  card.dataset.productId = data.id;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${data.title} — ${data.category}`);

  card.innerHTML = `
    <div class="card-header drag-handle">
      <div class="card-identity">
        <div class="card-icon-badge">${data.icon}</div>
        <div class="card-title-group">
          <h3 class="card-title">${data.title}</h3>
          <span class="card-category-tag">${data.category}</span>
        </div>
      </div>
      <span class="card-badge status-live">${data.status}</span>
    </div>

    <div class="card-body">
      <!-- Everyday Balance & Goals in INR -->
      <div class="axis-metrics-grid">
        <div class="metric-tile">
          <div class="metric-label">Total Savings & Goals</div>
          <div class="metric-value-row">
            <span class="metric-value">₹28,420</span>
            <span class="metric-change positive">+14.2% this mo</span>
          </div>
        </div>
        <div class="metric-tile">
          <div class="metric-label">Monthly Budget Status</div>
          <div class="metric-value-row">
            <span class="metric-value">68% spent</span>
            <span class="metric-change neutral">On track 🎯</span>
          </div>
        </div>
      </div>

      <!-- Clean Sparkline of Savings Progress -->
      <div class="axis-chart-container">
        <div class="chart-header">
          <span class="chart-title">SAVINGS GROWTH JOURNEY</span>
          <span class="chart-subvalue" style="color: #059669; font-weight: 700;">+₹3,150 saved</span>
        </div>
        <svg class="sparkline-svg" viewBox="0 0 380 54" preserveAspectRatio="none">
          <defs>
            <linearGradient id="savings-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#10b981" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <path d="M 0 45 C 50 40, 100 42, 150 28 C 200 16, 250 30, 300 18 C 340 10, 360 14, 380 4 L 380 54 L 0 54 Z" fill="url(#savings-gradient)" />
          <path d="M 0 45 C 50 40, 100 42, 150 28 C 200 16, 250 30, 300 18 C 340 10, 360 14, 380 4" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="380" cy="4" r="3.5" fill="#10b981" />
        </svg>
      </div>

      <!-- Everyday Relatable Transactions -->
      <div class="axis-stream-row">
        <div class="stream-node">
          <span class="pulse-node" style="background: #10b981;"></span>
          <span>Family Groceries & Staples</span>
        </div>
        <span style="font-weight: 600; color: #4b5563;">-₹450</span>
      </div>
    </div>

    <div class="card-footer">
      <span>No ads • No tracking • Made in India</span>
      <span style="font-weight: 600; color: #111215;">SAFE & FREE</span>
    </div>
  `;

  return card;
}

/**
 * Construct Giri Kinetic card DOM (Visual slide maker for everyone)
 */
function createKineticNode(data) {
  const card = document.createElement('article');
  card.className = 'giri-card card-kinetic';
  card.dataset.category = 'projects';
  card.dataset.productId = data.id;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${data.title} — ${data.category}`);

  card.innerHTML = `
    <div class="card-header drag-handle">
      <div class="card-identity">
        <div class="card-icon-badge">${data.icon}</div>
        <div class="card-title-group">
          <h3 class="card-title">${data.title}</h3>
          <span class="card-category-tag">${data.category}</span>
        </div>
      </div>
      <span class="card-badge status-live">${data.status}</span>
    </div>

    <div class="card-body">
      <!-- 16:9 Slide Canvas for normal humans -->
      <div class="slide-canvas-viewport">
        <div class="slide-guide-lines" aria-hidden="true"></div>
        <div class="slide-badge-pill">SLIDE 02 // 08 • STORY DECK</div>

        <div class="slide-typography-node">
          <h4 class="slide-deck-title">Bring Big Ideas to Life</h4>
          <p class="slide-deck-subtitle">Clean, effortless slides that anyone can present with total confidence.</p>
        </div>

        <svg class="slide-motion-curve" viewBox="0 0 160 90">
          <path d="M 10 75 Q 75 15, 150 35" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="3 3" />
          <circle cx="150" cy="35" r="4" fill="#2563eb" />
        </svg>
      </div>

      <!-- Slide Thumbnails Filmstrip -->
      <div class="slide-filmstrip">
        <div class="filmstrip-thumbnails">
          <button type="button" class="thumbnail-node" data-slide="1">01</button>
          <button type="button" class="thumbnail-node current" data-slide="2">02</button>
          <button type="button" class="thumbnail-node" data-slide="3">03</button>
          <button type="button" class="thumbnail-node" data-slide="4">04</button>
          <button type="button" class="thumbnail-node" data-slide="5">05</button>
        </div>
        <div class="transition-telemetry">
          <span>Smooth Reveal</span>
          <span>•</span>
          <span>Instant Share</span>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <span>Great for school, pitches, or sharing your story</span>
      <span style="font-weight: 600; color: #2563eb;">ONE-CLICK EXPORT</span>
    </div>
  `;

  // Filmstrip thumbnail switching interaction
  const thumbnails = card.querySelectorAll('.thumbnail-node');
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      thumbnails.forEach(t => t.classList.remove('current'));
      thumb.classList.add('current');
      const slideNum = thumb.dataset.slide.padStart(2, '0');
      const badge = card.querySelector('.slide-badge-pill');
      if (badge) {
        badge.textContent = `SLIDE ${slideNum} // 08 • STORY DECK`;
      }
    });
  });

  return card;
}

export function renderProjectCards() {
  return [
    createDriftNode(projectsData[0]),
    createAxisNode(projectsData[1]),
    createKineticNode(projectsData[2])
  ];
}
