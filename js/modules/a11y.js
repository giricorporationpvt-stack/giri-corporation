/**
 * Giri — Sovereign Accessibility & Audio Speech Suite (a11y.js)
 * Zero external dependencies. WCAG AAA compliance, client-side font scaling,
 * high-contrast rendering, and browser-native speech synthesis.
 */

export class AccessibilitySuite {
  constructor() {
    this.FONT_KEY = 'giri_font_size';
    this.CONTRAST_KEY = 'giri_contrast';
    this.MOTION_KEY = 'giri_motion';

    this.currentFontSize = localStorage.getItem(this.FONT_KEY) || 'normal';
    this.isHighContrast = localStorage.getItem(this.CONTRAST_KEY) === 'high-contrast';
    this.isReducedMotion = localStorage.getItem(this.MOTION_KEY) === 'reduced';

    this.synth = window.speechSynthesis || null;
    this.utterance = null;
    this.isPlayingAudio = false;
    this.playbackRate = 1.0;

    this.init();
  }

  init() {
    this.applyPreferences();
    this.bindA11yDialog();
    this.bindAudioReader();

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => {
        this.bindA11yDialog();
        this.bindAudioReader();
      });
    }

    // Keyboard shortcut: Alt+A toggles accessibility dialog
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        this.toggleA11yDialog();
      }
    });
  }

  applyPreferences() {
    // Font size
    if (this.currentFontSize === 'normal') {
      document.documentElement.removeAttribute('data-font-size');
    } else {
      document.documentElement.setAttribute('data-font-size', this.currentFontSize);
    }

    // High Contrast
    if (this.isHighContrast) {
      document.documentElement.setAttribute('data-a11y', 'high-contrast');
    } else {
      document.documentElement.removeAttribute('data-a11y');
    }

    // Reduced Motion
    if (this.isReducedMotion) {
      document.documentElement.setAttribute('data-motion', 'reduced');
    } else {
      document.documentElement.removeAttribute('data-motion');
    }

    this.updateDialogUI();
  }

  setFontSize(size) {
    this.currentFontSize = size;
    localStorage.setItem(this.FONT_KEY, size);
    this.applyPreferences();
  }

  toggleContrast() {
    this.isHighContrast = !this.isHighContrast;
    localStorage.setItem(this.CONTRAST_KEY, this.isHighContrast ? 'high-contrast' : 'normal');
    this.applyPreferences();
  }

  toggleMotion() {
    this.isReducedMotion = !this.isReducedMotion;
    localStorage.setItem(this.MOTION_KEY, this.isReducedMotion ? 'reduced' : 'normal');
    this.applyPreferences();
  }

  bindA11yDialog() {
    const trigger = document.getElementById('a11y-trigger-btn') || document.querySelector('.a11y-trigger-btn');
    const dialog = document.getElementById('a11y-dialog');
    const closeBtn = document.getElementById('a11y-close-btn');

    if (trigger && !trigger._a11yBound) {
      trigger._a11yBound = true;
      trigger.addEventListener('click', () => this.toggleA11yDialog());
    }

    if (closeBtn && !closeBtn._a11yBound) {
      closeBtn._a11yBound = true;
      closeBtn.addEventListener('click', () => this.closeA11yDialog());
    }

    if (dialog && !dialog._a11yBound) {
      dialog._a11yBound = true;
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) this.closeA11yDialog();
      });
    }

    // Font size buttons inside modal
    document.querySelectorAll('[data-set-font]').forEach(btn => {
      if (!btn._fontBound) {
        btn._fontBound = true;
        btn.addEventListener('click', () => {
          this.setFontSize(btn.getAttribute('data-set-font'));
        });
      }
    });

    // Contrast toggle button
    const contrastBtn = document.getElementById('a11y-contrast-toggle');
    if (contrastBtn && !contrastBtn._contrastBound) {
      contrastBtn._contrastBound = true;
      contrastBtn.addEventListener('click', () => this.toggleContrast());
    }

    // Motion toggle button
    const motionBtn = document.getElementById('a11y-motion-toggle');
    if (motionBtn && !motionBtn._motionBound) {
      motionBtn._motionBound = true;
      motionBtn.addEventListener('click', () => this.toggleMotion());
    }

    this.updateDialogUI();
  }

  toggleA11yDialog() {
    const dialog = document.getElementById('a11y-dialog');
    if (!dialog) return;
    if (dialog.open) {
      this.closeA11yDialog();
    } else {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      this.updateDialogUI();
    }
  }

  closeA11yDialog() {
    const dialog = document.getElementById('a11y-dialog');
    if (dialog && dialog.open) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  }

  updateDialogUI() {
    document.querySelectorAll('[data-set-font]').forEach(btn => {
      const val = btn.getAttribute('data-set-font');
      btn.classList.toggle('is-active', val === this.currentFontSize);
    });

    const contrastBtn = document.getElementById('a11y-contrast-toggle');
    if (contrastBtn) {
      contrastBtn.classList.toggle('is-active', this.isHighContrast);
      contrastBtn.textContent = this.isHighContrast ? 'Enabled ✓' : 'Disabled';
    }

    const motionBtn = document.getElementById('a11y-motion-toggle');
    if (motionBtn) {
      motionBtn.classList.toggle('is-active', this.isReducedMotion);
      motionBtn.textContent = this.isReducedMotion ? 'Reduced ✓' : 'Full Motion';
    }
  }

  /* ========================================================================
     NATIVE WEB SPEECH SYNTHESIS AUDIO READER
     ======================================================================== */
  bindAudioReader() {
    const playBtn = document.getElementById('audio-play-trigger') || document.querySelector('.audio-play-btn');
    const speedBtn = document.getElementById('audio-speed-btn');

    if (playBtn && !playBtn._audioBound) {
      playBtn._audioBound = true;
      playBtn.addEventListener('click', () => this.toggleAudioPlayback());
    }

    if (speedBtn && !speedBtn._speedBound) {
      speedBtn._speedBound = true;
      speedBtn.addEventListener('click', () => {
        this.playbackRate = this.playbackRate === 1.0 ? 1.25 : (this.playbackRate === 1.25 ? 1.5 : 1.0);
        speedBtn.textContent = `${this.playbackRate}x`;
        if (this.isPlayingAudio) {
          // Restart with new rate
          this.stopAudio();
          this.playAudio();
        }
      });
    }
  }

  getTextToRead() {
    // Priority: founder letter content, or main article, or main section
    const letter = document.querySelector('.founder-letter-article');
    if (letter) {
      return letter.innerText.replace(/\s+/g, ' ').trim();
    }
    const hero = document.querySelector('.dedicated-hero-wrap, .home-hero-content');
    if (hero) {
      return hero.innerText.replace(/\s+/g, ' ').trim();
    }
    return document.title + '. ' + (document.querySelector('p')?.innerText || '');
  }

  toggleAudioPlayback() {
    if (!this.synth) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (this.synth.speaking && !this.synth.paused) {
      this.pauseAudio();
    } else if (this.synth.paused) {
      this.resumeAudio();
    } else {
      this.playAudio();
    }
  }

  playAudio() {
    if (!this.synth) return;
    this.synth.cancel();

    const text = this.getTextToRead();
    if (!text) return;

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = this.playbackRate;
    this.utterance.pitch = 1.0;

    // Pick natural voice (prefer Indian English or local language if available)
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => v.lang === 'en-IN') ||
                           voices.find(v => v.lang.startsWith('en')) ||
                           voices[0];
    if (preferredVoice) this.utterance.voice = preferredVoice;

    this.utterance.onstart = () => {
      this.isPlayingAudio = true;
      this.updateAudioPlayerUI(true);
    };

    this.utterance.onend = () => {
      this.isPlayingAudio = false;
      this.updateAudioPlayerUI(false);
    };

    this.utterance.onerror = () => {
      this.isPlayingAudio = false;
      this.updateAudioPlayerUI(false);
    };

    this.synth.speak(this.utterance);
  }

  pauseAudio() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.updateAudioPlayerUI(false);
    }
  }

  resumeAudio() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.updateAudioPlayerUI(true);
    }
  }

  stopAudio() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlayingAudio = false;
      this.updateAudioPlayerUI(false);
    }
  }

  updateAudioPlayerUI(playing) {
    const playBtn = document.getElementById('audio-play-trigger') || document.querySelector('.audio-play-btn');
    const waveWrap = document.querySelector('.audio-wave-wrap');
    const statusText = document.getElementById('audio-status-text');

    if (playBtn) {
      playBtn.setAttribute('aria-label', playing ? 'Pause speech' : 'Play speech');
      playBtn.innerHTML = playing
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }

    if (waveWrap) {
      waveWrap.classList.toggle('audio-wave-active', playing);
    }

    if (statusText) {
      statusText.textContent = playing ? 'Playing audio...' : 'Click to listen';
    }
  }
}

export const a11ySuite = new AccessibilitySuite();
