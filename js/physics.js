/**
 * GIRI — ZERO-GRAVITY PHYSICS ENGINE
 * Self-contained Vanilla JS Anti-Gravity Simulation
 * 
 * Features:
 * - Weightless ambient harmonic drift with continuous micro-tilt [-1.5deg, 1.5deg]
 * - Soft-cushion boundary collisions with elastic restitution
 * - Focus stabilization: Dead stop, 0deg level, scale(1.025), and elevated shadow on hover
 * - Flawless kinetic throw with pointer tracking & progressive frictional decay
 * - Canvas-relative coordinate tracking compatible with page scroll
 */

export class ZeroGravityEngine {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      topPadding: 24,       // Clearance inside canvas
      bottomPadding: 24,    // Clearance above bottom
      sidePadding: 24,      // Edge cushion
      restitution: 0.72,    // Soft cushion bounce restitution
      friction: 0.945,      // Progressive kinetic decay factor
      ambientPower: 0.22,   // Ambient harmonic drift acceleration
      maxVelocity: 26,      // Maximum throw velocity clamp
      minVelocityThreshold: 0.08 // Cutoff where kinetic transitions to ambient
    }, options);

    this.cards = [];
    this.isRunning = true;
    this.rafId = null;
    this.lastTime = performance.now();

    this.onResize = this.onResize.bind(this);
    this.loop = this.loop.bind(this);

    window.addEventListener('resize', this.onResize);
    this.start();
  }

  /**
   * Register a card element into the anti-gravity physics simulation
   */
  register(element, initialX = null, initialY = null) {
    const width = element.offsetWidth || 420;
    const height = element.offsetHeight || 320;

    // Viewport bounds within container
    const bounds = this.getBounds(width, height);

    // Initial position distribution
    const x = initialX !== null ? Math.min(Math.max(initialX, bounds.minX), bounds.maxX) : bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
    const y = initialY !== null ? Math.min(Math.max(initialY, bounds.minY), bounds.maxY) : bounds.minY + Math.random() * (bounds.maxY - bounds.minY);

    const initialPhase = Math.random() * Math.PI * 2;
    const initialAngle = (Math.random() * 2 - 1) * 1.5; // -1.5deg to +1.5deg

    const cardState = {
      element,
      width,
      height,
      x,
      y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      angle: initialAngle,
      targetAngle: initialAngle,
      scale: 1,
      targetScale: 1,
      phase: initialPhase,
      driftSpeed: 0.4 + Math.random() * 0.4,
      isHovered: false,
      isDragging: false,
      isKinetic: false,
      dragPointerId: null,
      dragOffset: { x: 0, y: 0 },
      dragHistory: []
    };

    this.bindInteractions(cardState);
    this.cards.push(cardState);

    // Apply immediate transform
    this.renderCard(cardState);
    return cardState;
  }

  /**
   * Calculate collision and movement boundary for given card dimensions
   */
  getBounds(cardWidth, cardHeight) {
    const w = this.container.clientWidth || 1200;
    const h = this.container.clientHeight || 840;

    return {
      minX: this.options.sidePadding,
      maxX: Math.max(this.options.sidePadding, w - cardWidth - this.options.sidePadding),
      minY: this.options.topPadding,
      maxY: Math.max(this.options.topPadding, h - cardHeight - this.options.bottomPadding)
    };
  }

  /**
   * Bind hover stabilization and kinetic pointer drag handlers
   */
  bindInteractions(card) {
    const el = card.element;

    // Focus Stabilization: Hover Enter
    el.addEventListener('pointerenter', () => {
      if (card.isDragging) return;
      card.isHovered = true;
      card.targetScale = 1.025; // User spec: scale up gracefully (scale(1.025))
      card.targetAngle = 0;     // User spec: instantly level its tilt to 0deg
      el.classList.add('is-focused-card');
    });

    // Focus Stabilization: Hover Leave
    el.addEventListener('pointerleave', () => {
      if (card.isDragging) return;
      card.isHovered = false;
      card.targetScale = 1.0;
      el.classList.remove('is-focused-card');
    });

    // Kinetic Throw & Drag: Pointer Down
    el.addEventListener('pointerdown', (e) => {
      // Don't drag if user clicked an interactive control inside card
      const interactive = e.target.closest('button, input, select, textarea, a, .glyph-btn, .thumbnail-node');
      if (interactive && !interactive.classList.contains('drag-handle')) {
        return;
      }

      card.isDragging = true;
      card.isKinetic = false;
      card.dragPointerId = e.pointerId;
      card.targetScale = 1.03;

      this.bringToFront(card);
      el.classList.add('is-dragging');

      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) {}

      // Calculate initial grab offset relative to container
      const containerRect = this.container.getBoundingClientRect();
      const pointerCanvasX = e.clientX - containerRect.left;
      const pointerCanvasY = e.clientY - containerRect.top;

      card.dragOffset = {
        x: pointerCanvasX - card.x,
        y: pointerCanvasY - card.y
      };

      card.dragHistory = [{
        x: pointerCanvasX,
        y: pointerCanvasY,
        time: performance.now()
      }];
    });

    // Kinetic Throw & Drag: Pointer Move
    el.addEventListener('pointermove', (e) => {
      if (!card.isDragging || card.dragPointerId !== e.pointerId) return;

      const containerRect = this.container.getBoundingClientRect();
      const pointerCanvasX = e.clientX - containerRect.left;
      const pointerCanvasY = e.clientY - containerRect.top;
      const now = performance.now();

      card.x = pointerCanvasX - card.dragOffset.x;
      card.y = pointerCanvasY - card.dragOffset.y;

      card.dragHistory.push({
        x: pointerCanvasX,
        y: pointerCanvasY,
        time: now
      });

      while (card.dragHistory.length > 1 && (now - card.dragHistory[0].time) > 80) {
        card.dragHistory.shift();
      }

      if (card.dragHistory.length >= 2) {
        const pOld = card.dragHistory[0];
        const dx = pointerCanvasX - pOld.x;
        const dt = (now - pOld.time) || 16;
        const speedX = (dx / dt) * 16;
        card.angle = Math.max(-6, Math.min(6, speedX * 0.4));
      }
    });

    // Kinetic Throw & Drag: Pointer Up & Cancel
    const handlePointerRelease = (e) => {
      if (!card.isDragging || card.dragPointerId !== e.pointerId) return;

      card.isDragging = false;
      card.dragPointerId = null;
      card.targetScale = card.isHovered ? 1.025 : 1.0;
      el.classList.remove('is-dragging');

      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      // Release throw velocity calculation
      const now = performance.now();
      if (card.dragHistory.length >= 2) {
        const oldest = card.dragHistory[0];
        const newest = card.dragHistory[card.dragHistory.length - 1];
        const dt = Math.max(16, newest.time - oldest.time);
        
        const rawVx = ((newest.x - oldest.x) / dt) * 16;
        const rawVy = ((newest.y - oldest.y) / dt) * 16;

        const speed = Math.hypot(rawVx, rawVy);
        if (speed > 0.5) {
          const factor = Math.min(speed, this.options.maxVelocity) / speed;
          card.vx = rawVx * factor;
          card.vy = rawVy * factor;
          card.isKinetic = true;
        } else {
          card.vx = (Math.random() - 0.5) * 0.3;
          card.vy = (Math.random() - 0.5) * 0.3;
          card.isKinetic = false;
        }
      } else {
        card.isKinetic = false;
      }
    };

    el.addEventListener('pointerup', handlePointerRelease);
    el.addEventListener('pointercancel', handlePointerRelease);
  }

  bringToFront(activeCard) {
    this.cards.forEach(c => {
      if (c === activeCard) {
        c.element.style.zIndex = '45';
      } else {
        if (c.element.style.zIndex === '45') {
          c.element.style.zIndex = '20';
        }
      }
    });
  }

  /**
   * Main Physics Animation Loop
   */
  loop(currentTime) {
    if (!this.isRunning) {
      this.rafId = requestAnimationFrame(this.loop);
      return;
    }

    this.lastTime = currentTime;
    const timeSec = currentTime * 0.001;

    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      if (card.isDragging) {
        this.renderCard(card);
        continue;
      }

      const bounds = this.getBounds(card.width, card.height);

      if (card.isHovered) {
        // Focus Stabilization: Smoothly decelerate to a dead stop
        card.vx *= 0.84;
        card.vy *= 0.84;
        if (Math.abs(card.vx) < 0.01) card.vx = 0;
        if (Math.abs(card.vy) < 0.01) card.vy = 0;

        // Level tilt cleanly to 0deg
        card.angle += (0 - card.angle) * 0.2;
      } else if (card.isKinetic) {
        // Kinetic Throw Coasting: Progressive frictional decay
        card.vx *= this.options.friction;
        card.vy *= this.options.friction;
        card.angle += (0 - card.angle) * 0.08;

        const currentSpeed = Math.hypot(card.vx, card.vy);
        if (currentSpeed < this.options.minVelocityThreshold) {
          card.isKinetic = false;
          card.vx = (Math.random() - 0.5) * 0.3;
          card.vy = (Math.random() - 0.5) * 0.3;
        }
      } else {
        // Ambient Weightless Drift (Brownian Harmonic Wandering)
        const t = timeSec * card.driftSpeed + card.phase;
        
        const ax = Math.sin(t * 0.8) * this.options.ambientPower * 0.05;
        const ay = Math.cos(t * 0.6) * this.options.ambientPower * 0.05;

        card.vx += ax;
        card.vy += ay;

        const maxAmbient = 0.55;
        const currentSpeed = Math.hypot(card.vx, card.vy);
        if (currentSpeed > maxAmbient) {
          card.vx = (card.vx / currentSpeed) * maxAmbient;
          card.vy = (card.vy / currentSpeed) * maxAmbient;
        }

        // Sway / tilt bounded precisely between -1.5deg and 1.5deg (User Spec)
        card.targetAngle = Math.sin(t * 0.7) * 1.5;
        card.angle += (card.targetAngle - card.angle) * 0.06;
      }

      // Integrate velocity into position
      card.x += card.vx;
      card.y += card.vy;

      // Soft Cushion Boundary Collisions
      if (card.x <= bounds.minX) {
        card.x = bounds.minX;
        card.vx = Math.abs(card.vx) * this.options.restitution;
        card.angle *= -0.7;
      } else if (card.x >= bounds.maxX) {
        card.x = bounds.maxX;
        card.vx = -Math.abs(card.vx) * this.options.restitution;
        card.angle *= -0.7;
      }

      if (card.y <= bounds.minY) {
        card.y = bounds.minY;
        card.vy = Math.abs(card.vy) * this.options.restitution;
      } else if (card.y >= bounds.maxY) {
        card.y = bounds.maxY;
        card.vy = -Math.abs(card.vy) * this.options.restitution;
      }

      // Smooth Scale Interpolation (1.0 -> 1.025 on hover, 1.03 on drag)
      card.scale += (card.targetScale - card.scale) * 0.15;

      this.renderCard(card);
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  renderCard(card) {
    const rx = Math.round(card.x * 10) / 10;
    const ry = Math.round(card.y * 10) / 10;
    const rot = Math.round(card.angle * 100) / 100;
    const scl = Math.round(card.scale * 1000) / 1000;

    card.element.style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${rot}deg) scale(${scl})`;
  }

  onResize() {
    for (const card of this.cards) {
      const bounds = this.getBounds(card.width, card.height);
      card.x = Math.min(Math.max(card.x, bounds.minX), bounds.maxX);
      card.y = Math.min(Math.max(card.y, bounds.minY), bounds.maxY);
      this.renderCard(card);
    }
  }

  scatter() {
    const total = this.cards.length;
    if (total === 0) return;

    const bounds = this.getBounds(400, 300);
    const availableW = bounds.maxX - bounds.minX;
    const availableH = bounds.maxY - bounds.minY;

    const cols = total > 4 ? 3 : 2;
    const rows = Math.ceil(total / cols);

    this.cards.forEach((card, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const cellW = availableW / cols;
      const cellH = availableH / rows;

      const targetX = bounds.minX + col * cellW + (cellW - card.width) * 0.5 + (Math.random() - 0.5) * 30;
      const targetY = bounds.minY + row * cellH + (cellH - card.height) * 0.5 + (Math.random() - 0.5) * 20;

      const cardBounds = this.getBounds(card.width, card.height);
      card.x = Math.min(Math.max(targetX, cardBounds.minX), cardBounds.maxX);
      card.y = Math.min(Math.max(targetY, cardBounds.minY), cardBounds.maxY);

      card.vx = (Math.random() - 0.5) * 0.8;
      card.vy = (Math.random() - 0.5) * 0.8;
      card.angle = (Math.random() * 2 - 1) * 1.5;
      card.isKinetic = true;
    });
  }

  togglePause() {
    this.isRunning = !this.isRunning;
    return this.isRunning;
  }

  start() {
    if (!this.rafId) {
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.loop);
    }
  }
}
