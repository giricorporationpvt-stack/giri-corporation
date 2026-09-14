/**
 * GIRI — DEVELOPER NOTES & VISION INTEL
 * Founded by Abhinav Giri
 * 
 * Core Mission:
 * - Proudly Made in India
 * - Affordable Digital Tools for Normal Users, Students & Families
 * - Zero Expensive Dollar Subscriptions
 * - Sovereign Tech & Total Data Privacy
 */

export const developersData = [
  {
    id: 'dev-abhinav',
    name: 'Abhinav Giri',
    role: 'Founder & Chief Architect',
    monogram: 'AG',
    badge: 'Founder & Vision',
    dispatch: 'I started Giri to break the monopoly of foreign dollar subscriptions and build sovereign, affordable software in India for everyday people.',
    instagram: '@abhinavgiri45',
    instagramUrl: 'https://www.instagram.com/abhinavgiri45/',
    assignment: {
      project: 'Giri Ecosystem',
      role: 'Make in India Mission Lead'
    },
    techStack: [
      { name: 'Make in India', iconColor: '#e11d48' },
      { name: 'Affordable Tech', iconColor: '#10b981' },
      { name: 'Zero Dollar Paywalls', iconColor: '#6366f1' },
      { name: 'Data Sovereignty', iconColor: '#111215' }
    ]
  },
  {
    id: 'dev-make-in-india',
    name: 'Make in India Systems',
    role: 'Indigenous Systems & Engineering',
    monogram: 'IN',
    badge: 'Indigenous Tech',
    dispatch: 'Engineering ultra-lightweight software locally. Designed to run smoothly on everyday Indian devices, budget phones, and PCs with zero foreign dependencies.',
    assignment: {
      project: 'Indigenous Infrastructure',
      role: 'Core Systems & Speed'
    },
    techStack: [
      { name: '100% Homegrown Code', iconColor: '#f59e0b' },
      { name: 'Runs on Any Device', iconColor: '#10b981' },
      { name: 'Strict User Privacy', iconColor: '#2563eb' },
      { name: 'Zero Foreign Lock-in', iconColor: '#e11d48' }
    ]
  },
  {
    id: 'dev-affordability',
    name: 'Public Access & Affordability',
    role: 'Democratizing Everyday Tools',
    monogram: '₹',
    badge: 'Affordable Tech',
    dispatch: 'World-class software must never cost hefty monthly dollar subscriptions. We provide honest rupee options and free tiers so students and families thrive.',
    assignment: {
      project: 'Affordable Access Suite',
      role: 'Fair Pricing & Universal Access'
    },
    techStack: [
      { name: 'Honest Rupee Pricing', iconColor: '#10b981' },
      { name: 'No Hidden Renewals', iconColor: '#3b82f6' },
      { name: 'Free Student Tier', iconColor: '#ec4899' },
      { name: 'Made for Normal Users', iconColor: '#e11d48' }
    ]
  }
];

function createDeveloperCard(dev) {
  const card = document.createElement('article');
  card.className = 'giri-card card-developer';
  card.dataset.category = 'developers';
  card.dataset.devId = dev.id;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${dev.name} — ${dev.role}`);

  const techPills = dev.techStack.map(tech => 
    `<span class="tech-tag">
      <span class="tech-tag-icon" style="background: ${tech.iconColor};"></span>
      <span>${tech.name}</span>
    </span>`
  ).join('');

  const instaBadge = dev.instagram ? 
    `<a href="${dev.instagramUrl}" target="_blank" rel="noopener noreferrer" class="dev-insta-badge" title="Connect with ${dev.name} on Instagram">
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
      <span>${dev.instagram}</span>
    </a>` : '';

  card.innerHTML = `
    <div class="card-header drag-handle">
      <div class="card-identity">
        <div class="card-icon-badge">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="card-title-group">
          <h3 class="card-title">${dev.name}</h3>
          <span class="card-category-tag">Developer & Vision Note</span>
        </div>
      </div>
      <span class="card-badge status-live">${dev.badge || 'Make in India'}</span>
    </div>

    <div class="card-body">
      <!-- Profile Header Block -->
      <div class="dev-profile-header">
        <div class="dev-avatar-ring">
          <span>${dev.monogram}</span>
          <span class="active-ping" title="Make in India"></span>
        </div>
        <div class="dev-meta-titles">
          <span class="dev-name">${dev.name}</span>
          <span class="dev-role">${dev.role}</span>
          ${instaBadge}
        </div>
      </div>

      <!-- Human Mission & Focus -->
      <div class="dev-status-dispatch">
        <span class="dispatch-icon">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2 4 8 10 14 4"/>
          </svg>
        </span>
        <span>${dev.dispatch}</span>
      </div>

      <!-- Principles & Focus in clean minimal tags -->
      <div class="dev-section-heading">Core Philosophy & Focus</div>
      <div class="dev-stack-tags">
        ${techPills}
      </div>

      <!-- Current Application Focus -->
      <div class="dev-section-heading">Mission Commitment</div>
      <div class="dev-assignment-pill">
        <span class="assignment-name">${dev.assignment.project}</span>
        <span class="assignment-badge">${dev.assignment.role}</span>
      </div>
    </div>

    <div class="card-footer">
      <span>Crafted in India • Affordable for Everyone</span>
      <span style="font-weight: 600; color: #059669;">SOVEREIGN TECH</span>
    </div>
  `;

  return card;
}

export function renderDeveloperCards() {
  return developersData.map(dev => createDeveloperCard(dev));
}
