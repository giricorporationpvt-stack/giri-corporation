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
     HIGH-FIDELITY SOVEREIGN AUDIO READER & SPEECH SUITE
     ======================================================================== */
  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  bindAudioReader() {
    const playerBar = document.querySelector('.audio-reader-bar');
    if (!playerBar) return;

    this.audioElement = document.getElementById('founder-audio-player');
    const playBtn = document.getElementById('audio-play-trigger');
    const speedBtn = document.getElementById('audio-speed-btn');
    const rewindBtn = document.getElementById('audio-rewind-btn');
    const forwardBtn = document.getElementById('audio-forward-btn');
    const muteBtn = document.getElementById('audio-mute-btn');
    const scrubberTrack = document.getElementById('audio-scrubber-track');
    const scrubberProgress = document.getElementById('audio-scrubber-progress');
    const scrubberThumb = document.getElementById('audio-scrubber-thumb');
    const timeDisplay = document.getElementById('audio-time-display');
    const statusText = document.getElementById('audio-status-text');

    if (!this.audioElement) {
      this.audioElement = new Audio('assets/founder-letter.mp3?v=20260918');
      this.audioElement.id = 'founder-audio-player';
      this.audioElement.preload = 'metadata';
      document.body.appendChild(this.audioElement);
    }

    // Restore saved playback speed
    const savedRate = parseFloat(localStorage.getItem('giri_audio_rate'));
    if (savedRate && !isNaN(savedRate)) {
      this.playbackRate = savedRate;
      if (this.audioElement) this.audioElement.playbackRate = this.playbackRate;
      if (speedBtn) speedBtn.textContent = `${this.playbackRate}x`;
    }

    // Bind Play/Pause
    if (playBtn && !playBtn._audioBound) {
      playBtn._audioBound = true;
      playBtn.addEventListener('click', () => this.toggleAudioPlayback());
    }

    // Bind Speed Selector: 1.0x -> 1.25x -> 1.5x -> 2.0x -> 0.8x
    if (speedBtn && !speedBtn._speedBound) {
      speedBtn._speedBound = true;
      speedBtn.addEventListener('click', () => {
        const rates = [1.0, 1.25, 1.5, 2.0, 0.8];
        const nextIdx = (rates.indexOf(this.playbackRate) + 1) % rates.length;
        this.playbackRate = rates[nextIdx];
        localStorage.setItem('giri_audio_rate', this.playbackRate);
        speedBtn.textContent = `${this.playbackRate}x`;
        speedBtn.setAttribute('aria-label', `Playback speed ${this.playbackRate}x`);
        if (this.audioElement) {
          this.audioElement.playbackRate = this.playbackRate;
        }
      });
    }

    // Bind 10s Rewind
    if (rewindBtn && !rewindBtn._rewindBound) {
      rewindBtn._rewindBound = true;
      rewindBtn.addEventListener('click', () => this.seekRelative(-10));
    }

    // Bind 10s Forward
    if (forwardBtn && !forwardBtn._forwardBound) {
      forwardBtn._forwardBound = true;
      forwardBtn.addEventListener('click', () => this.seekRelative(10));
    }

    // Bind Mute Toggle
    if (muteBtn && !muteBtn._muteBound) {
      muteBtn._muteBound = true;
      muteBtn.addEventListener('click', () => this.toggleMute());
    }

    // Bind Scrubber Click & Drag
    if (scrubberTrack && !scrubberTrack._scrubberBound) {
      scrubberTrack._scrubberBound = true;

      const handleSeek = (e) => {
        if (!this.audioElement) return;
        const rect = scrubberTrack.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const duration = this.audioElement.duration || 110;
        this.audioElement.currentTime = pct * duration;
        this.updateScrubberUI(pct * duration, duration);
      };

      let isDragging = false;
      scrubberTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleSeek(e);
        const onMouseMove = (ev) => { if (isDragging) handleSeek(ev); };
        const onMouseUp = () => {
          isDragging = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });

      scrubberTrack.addEventListener('touchstart', (e) => {
        handleSeek(e);
      }, { passive: true });

      scrubberTrack.addEventListener('touchmove', (e) => {
        handleSeek(e);
      }, { passive: true });

      // Keyboard accessible scrubbing
      scrubberTrack.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.seekRelative(-5);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.seekRelative(5);
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.toggleAudioPlayback();
        }
      });
    }

    // Attach Audio Element Event Listeners
    if (this.audioElement && !this.audioElement._eventsBound) {
      this.audioElement._eventsBound = true;

      this.audioElement.addEventListener('loadedmetadata', () => {
        const duration = this.audioElement.duration || 110;
        if (timeDisplay) {
          timeDisplay.textContent = `0:00 / ${this.formatTime(duration)}`;
        }
      });

      this.audioElement.addEventListener('timeupdate', () => {
        const current = this.audioElement.currentTime;
        const duration = this.audioElement.duration || 110;
        this.updateScrubberUI(current, duration);
      });

      this.audioElement.addEventListener('play', () => {
        this.isPlayingAudio = true;
        this.updateAudioPlayerUI(true);
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlayingAudio = false;
        this.updateAudioPlayerUI(false);
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlayingAudio = false;
        this.updateAudioPlayerUI(false);
        const duration = this.audioElement.duration || 110;
        this.updateScrubberUI(0, duration);
        if (statusText) statusText.textContent = 'Completed • Click to replay';
      });

      this.audioElement.addEventListener('error', (err) => {
        console.warn('[AudioReader] MP3 load note, attempting resilient fallback:', err);
        if (statusText) statusText.textContent = 'Switching to Speech Engine...';
      });
    }
  }

  updateScrubberUI(currentTime, duration) {
    const scrubberProgress = document.getElementById('audio-scrubber-progress');
    const scrubberThumb = document.getElementById('audio-scrubber-thumb');
    const timeDisplay = document.getElementById('audio-time-display');
    const scrubberTrack = document.getElementById('audio-scrubber-track');

    const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
    if (scrubberProgress) scrubberProgress.style.width = `${pct}%`;
    if (scrubberThumb) scrubberThumb.style.left = `${pct}%`;
    if (timeDisplay) {
      timeDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`;
    }
    if (scrubberTrack) {
      scrubberTrack.setAttribute('aria-valuenow', Math.round(pct));
    }
  }

  seekRelative(deltaSeconds) {
    if (!this.audioElement) return;
    const duration = this.audioElement.duration || 110;
    const newTime = Math.max(0, Math.min(duration, this.audioElement.currentTime + deltaSeconds));
    this.audioElement.currentTime = newTime;
    this.updateScrubberUI(newTime, duration);
  }

  toggleMute() {
    if (!this.audioElement) return;
    this.audioElement.muted = !this.audioElement.muted;
    const muteBtn = document.getElementById('audio-mute-btn');
    if (!muteBtn) return;
    const iconOn = muteBtn.querySelector('.icon-vol-on');
    const iconOff = muteBtn.querySelector('.icon-vol-off');
    if (iconOn && iconOff) {
      iconOn.style.display = this.audioElement.muted ? 'none' : 'block';
      iconOff.style.display = this.audioElement.muted ? 'block' : 'none';
    }
    muteBtn.setAttribute('title', this.audioElement.muted ? 'Unmute' : 'Mute');
    muteBtn.setAttribute('aria-label', this.audioElement.muted ? 'Unmute sound' : 'Mute sound');
  }

  toggleAudioPlayback() {
    if (this.audioElement) {
      if (this.audioElement.paused) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    } else {
      // Fallback
      this.playSpeechFallback();
    }
  }

  playAudio() {
    if (!this.audioElement) {
      this.bindAudioReader();
    }
    if (this.audioElement) {
      this.audioElement.playbackRate = this.playbackRate;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlayingAudio = true;
            this.updateAudioPlayerUI(true);
          })
          .catch((err) => {
            console.warn('[AudioReader] Autoplay or playback restriction:', err);
            // Fallback to speech synthesis if audio file cannot be loaded
            this.playSpeechFallback();
          });
      }
    }
  }

  pauseAudio() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }
    this.isPlayingAudio = false;
    this.updateAudioPlayerUI(false);
  }

  stopAudio() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlayingAudio = false;
    this.updateAudioPlayerUI(false);
  }

  updateAudioPlayerUI(playing) {
    const playBtn = document.getElementById('audio-play-trigger');
    const waveWrap = document.querySelector('.audio-wave-wrap');
    const statusText = document.getElementById('audio-status-text');

    if (playBtn) {
      playBtn.setAttribute('aria-label', playing ? 'Pause speech' : 'Play speech');
      const iconPlay = playBtn.querySelector('.icon-play');
      const iconPause = playBtn.querySelector('.icon-pause');
      if (iconPlay && iconPause) {
        iconPlay.style.display = playing ? 'none' : 'block';
        iconPause.style.display = playing ? 'block' : 'none';
      } else {
        playBtn.innerHTML = playing
          ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
          : `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      }
    }

    if (waveWrap) {
      waveWrap.classList.toggle('audio-wave-active', playing);
    }

    if (statusText) {
      statusText.textContent = playing ? 'Playing audio...' : 'Click to listen';
    }
  }

  /* ========================================================================
     RESILIENT SPEECH SYNTHESIS FALLBACK (SENTENCE CHUNKED)
     ======================================================================== */
  playSpeechFallback() {
    if (!this.synth) {
      alert('Audio playback is not supported on this browser.');
      return;
    }
    this.synth.cancel();

    // Prevent GC in Chromium
    window._activeSpeechUtterances = [];

    const article = document.querySelector('.founder-letter-article');
    const fullText = article ? article.innerText.replace(/\s+/g, ' ').trim() : document.title;
    if (!fullText) return;

    // Split into sentences (under 180 chars) to prevent Chrome buffer stall bug
    const sentences = fullText.match(/[^.!?]+[.!?]+(\s|$)/g) || [fullText];
    let currentIndex = 0;

    const speakNext = () => {
      if (currentIndex >= sentences.length) {
        this.isPlayingAudio = false;
        this.updateAudioPlayerUI(false);
        return;
      }

      const chunk = sentences[currentIndex].trim();
      if (!chunk) {
        currentIndex++;
        speakNext();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = this.playbackRate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => v.lang === 'en-IN') ||
                             voices.find(v => v.lang.startsWith('en')) ||
                             voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => {
        this.isPlayingAudio = true;
        this.updateAudioPlayerUI(true);
      };

      utterance.onend = () => {
        currentIndex++;
        speakNext();
      };

      utterance.onerror = () => {
        currentIndex++;
        speakNext();
      };

      window._activeSpeechUtterances.push(utterance);
      this.synth.speak(utterance);
    };

    speakNext();
  }
}

export const a11ySuite = new AccessibilitySuite();
