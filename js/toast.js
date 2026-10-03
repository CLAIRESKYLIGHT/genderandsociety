/**
 * BENA — Toast Notification System
 * Accessible aria-live, auto-dismiss in 4s, maximum 3 stacked
 */

import { escapeHTML } from './utils.js';

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer) {
    toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      toastContainer.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
}

export function showToast(message, type = 'info', duration = 4000) {
  const container = ensureContainer();

  // Cap at 3 stacked toasts
  const existing = container.querySelectorAll('.toast');
  if (existing.length >= 3) {
    existing[0].remove();
  }

  const icon = type === 'success' ? '✨' : (type === 'error' ? '⚠️' : '🍃');

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span aria-hidden="true">${icon}</span> <span>${escapeHTML(message)}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 320);
  }, duration);
}
