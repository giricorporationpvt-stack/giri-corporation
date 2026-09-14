/**
 * Giri — Sovereign Client-Side Data Hub (data_hub.js)
 * Transparent local data manager. Allows users to inspect, export (JSON),
 * and air-gap wipe all locally stored data. Zero cloud leakage.
 */

export class SovereignDataHub {
  constructor() {
    this.init();
  }

  init() {
    this.bindDialog();
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.bindDialog());
    }
  }

  getStorageTelemetry() {
    let driftCount = 0;
    let axisCount = 0;
    let totalBytes = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key) || '';
      totalBytes += (key.length + val.length) * 2; // UTF-16 approximation

      if (key.includes('drift')) driftCount++;
      if (key.includes('axis')) axisCount++;
    }

    const kbUsed = (totalBytes / 1024).toFixed(1);
    return {
      driftNotes: Math.max(driftCount, localStorage.getItem('giri_drift_doc') ? 1 : 0),
      axisEntries: Math.max(axisCount, localStorage.getItem('giri_axis_ledger') ? 1 : 0),
      storageKB: kbUsed,
      totalKeys: localStorage.length
    };
  }

  bindDialog() {
    const triggers = document.querySelectorAll('.data-hub-trigger-btn, [data-action="open-data-hub"]');
    const dialog = document.getElementById('data-hub-dialog');
    const closeBtn = document.getElementById('data-hub-close-btn');
    const exportBtn = document.getElementById('data-hub-export-btn');
    const resetBtn = document.getElementById('data-hub-reset-btn');

    triggers.forEach(t => {
      if (!t._hubBound) {
        t._hubBound = true;
        t.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDialog();
        });
      }
    });

    if (closeBtn && !closeBtn._hubBound) {
      closeBtn._hubBound = true;
      closeBtn.addEventListener('click', () => this.closeDialog());
    }

    if (dialog && !dialog._hubBound) {
      dialog._hubBound = true;
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) this.closeDialog();
      });
    }

    if (exportBtn && !exportBtn._hubBound) {
      exportBtn._hubBound = true;
      exportBtn.addEventListener('click', () => this.exportAllData());
    }

    if (resetBtn && !resetBtn._hubBound) {
      resetBtn._hubBound = true;
      resetBtn.addEventListener('click', () => this.airGappedReset());
    }
  }

  openDialog() {
    const dialog = document.getElementById('data-hub-dialog');
    if (!dialog) return;

    this.renderTelemetry();

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  closeDialog() {
    const dialog = document.getElementById('data-hub-dialog');
    if (dialog && dialog.open) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  }

  renderTelemetry() {
    const stats = this.getStorageTelemetry();
    const stat1 = document.getElementById('stat-drift-notes');
    const stat2 = document.getElementById('stat-axis-entries');
    const stat3 = document.getElementById('stat-storage-kb');

    if (stat1) stat1.textContent = stats.driftNotes;
    if (stat2) stat2.textContent = stats.axisEntries;
    if (stat3) stat3.textContent = `${stats.storageKB} KB`;
  }

  exportAllData() {
    const backup = {
      brand: 'Giri Sovereign Ecosystem',
      exportedAt: new Date().toISOString(),
      localStorageDump: {},
      version: '2.0.0'
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      backup.localStorageDump[key] = localStorage.getItem(key);
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `giri-sovereign-backup-${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  airGappedReset() {
    if (confirm('Are you sure you want to erase all locally stored Giri data from this device? This cannot be undone.')) {
      localStorage.clear();
      sessionStorage.clear();
      alert('All local device data has been wiped clean.');
      window.location.reload();
    }
  }
}

export const sovereignDataHub = new SovereignDataHub();
