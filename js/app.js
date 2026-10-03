/**
 * BENA — Main Application Coordinator
 * Under the Forest Canopy • Gender & Society Sanctuary
 */

import { QUOTES } from './quotes.js';
import { ACHIEVEMENTS } from './achievements.js';
import { BOOK_PAGES } from './book.js';
import { REFERENCES } from './references.js';
import { CREDITS } from './credits.js';
import { SHIELD_DATA, setupReportForm } from './shield.js';
import { State } from './state.js';
import { escapeHTML, getDayOfYear } from './utils.js';
import { showToast } from './toast.js';
import { initRouter } from './router.js';
import { initFallingLeaves, initScrollCandle, initScrollReveal, triggerPledgeBurst, initVineSpine } from './motion.js';

/* ==========================================================================
   1. THEME MANAGEMENT
   ========================================================================== */
function initTheme() {
  const currentTheme = State.getTheme();
  State.setTheme(currentTheme);

  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  function updateBtnUI(theme) {
    if (theme === 'dark') {
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'Glade';
    } else {
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'Dusk';
    }
  }

  updateBtnUI(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = State.getTheme() === 'dark' ? 'light' : 'dark';
      State.setTheme(next);
      updateBtnUI(next);
    });
  }
}

/* ==========================================================================
   2. YAKAP WELCOME MODAL
   ========================================================================== */
function initYakapModal() {
  const overlay = document.getElementById('yakapModalOverlay');
  const dismissBtn = document.getElementById('yakapDismissBtn');
  const neverShowBtn = document.getElementById('yakapNeverBtn');
  const helpBtn = document.getElementById('headerHelpBtn');

  if (!State.hasVisited() && overlay) {
    overlay.classList.remove('is-hidden');
  }

  function closeModal() {
    if (overlay) overlay.classList.add('is-hidden');
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      closeModal();
      showToast('Maligayang pagdating sa BENA 🌻');
    });
  }

  if (neverShowBtn) {
    neverShowBtn.addEventListener('click', () => {
      State.setVisited(true);
      closeModal();
      showToast('Maligayang pagdating sa BENA 🌻');
    });
  }

  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.remove('is-hidden');
    });
  }

  // Focus Trap & Escape key
  document.addEventListener('keydown', e => {
    if (overlay && !overlay.classList.contains('is-hidden') && e.key === 'Escape') {
      closeModal();
    }
  });
}

/* ==========================================================================
   3. DAILY FILIPINO PRIDE REMINDER (QUOTES)
   ========================================================================== */
function initQuotes() {
  const quoteTlEl = document.getElementById('dailyQuoteTl');
  const quoteEnEl = document.getElementById('dailyQuoteEn');
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  const copyBtn = document.getElementById('copyQuoteBtn');

  if (!QUOTES || !QUOTES.length) return;

  // Day-of-year auto select
  const dayIndex = getDayOfYear() % QUOTES.length;
  let currentIndex = dayIndex;

  function renderQuote(idx) {
    if (!quoteTlEl) return;
    const q = QUOTES[idx];
    quoteTlEl.style.opacity = '0';
    if (quoteEnEl) quoteEnEl.style.opacity = '0';

    setTimeout(() => {
      quoteTlEl.textContent = `“${q.tl}”`;
      if (quoteEnEl) quoteEnEl.textContent = q.en ? `“${q.en}”` : '';
      quoteTlEl.style.opacity = '1';
      if (quoteEnEl) quoteEnEl.style.opacity = '1';
    }, 180);
  }

  renderQuote(currentIndex);

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', () => {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * QUOTES.length);
      } while (nextIdx === currentIndex && QUOTES.length > 1);
      currentIndex = nextIdx;
      renderQuote(currentIndex);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const q = QUOTES[currentIndex];
      const text = `“${q.tl}”\n(${q.en})\n— BENA • Gender and Society Sanctuary`;
      try {
        await navigator.clipboard.writeText(text);
        showToast('Na-kopyang matagumpay ang paalala! 🍃', 'success');
      } catch {
        showToast('Hindi ma-access ang clipboard.', 'error');
      }
    });
  }
}

/* ==========================================================================
   4. ACHIEVEMENTS GALLERY ("WALANG KASARIAN ANG TALENTO")
   ========================================================================== */
function initAchievements() {
  const grid = document.getElementById('achievementsGrid');
  const pillsContainer = document.getElementById('achievementFilterPills');
  const modal = document.getElementById('achievementModalOverlay');
  const modalTitle = document.getElementById('achModalTitle');
  const modalCategory = document.getElementById('achModalCategory');
  const modalDesc = document.getElementById('achModalDesc');
  const modalWhy = document.getElementById('achModalWhy');
  const modalClose = document.getElementById('achModalClose');

  if (!grid) return;

  const categories = ['Lahat', 'Musika', 'Sayaw', 'Panitikan', 'Sining', 'Agham', 'Aktibismo', 'Katutubo', 'LGBTQIA+', 'Babae'];
  let activeFilter = 'Lahat';

  // Render Filter Pills
  if (pillsContainer) {
    pillsContainer.innerHTML = '';
    categories.forEach(cat => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `filter-pill-btn ${cat === activeFilter ? 'is-active' : ''}`;
      pill.textContent = cat;
      pill.addEventListener('click', () => {
        pillsContainer.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('is-active'));
        pill.classList.add('is-active');
        activeFilter = cat;
        renderGrid();
      });
      pillsContainer.appendChild(pill);
    });
  }

  function openModal(item) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = item.name;
    if (modalCategory) modalCategory.textContent = `${item.category} • ${(item.tags || []).join(', ')}`;
    if (modalDesc) modalDesc.textContent = item.description;
    if (modalWhy) modalWhy.textContent = item.why;
    modal.classList.remove('is-hidden');
  }

  function closeModal() {
    if (modal) modal.classList.add('is-hidden');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  function renderGrid() {
    grid.innerHTML = '';
    const filtered = ACHIEVEMENTS.filter(item => {
      if (activeFilter === 'Lahat') return true;
      if (item.category === activeFilter) return true;
      if (item.tags && item.tags.includes(activeFilter)) return true;
      return false;
    });

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'achievement-card reveal-on-scroll';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Basahin ang kwento ni ${item.name}`);

      card.innerHTML = `
        <div class="achievement-header">
          <span class="achievement-category">${escapeHTML(item.category)}</span>
          <span class="achievement-category" style="background: rgba(201,162,39,0.12); color: var(--color-accent-gold);">${escapeHTML((item.tags || []).join(' • '))}</span>
        </div>
        <h3 class="achievement-name">${escapeHTML(item.name)}</h3>
        <p class="achievement-desc">${escapeHTML(item.description)}</p>
        <div class="achievement-why-snippet">
          <strong>Bakit Mahalaga sa Kasarian:</strong>
          <p>${escapeHTML(item.why)}</p>
        </div>
      `;

      card.addEventListener('click', () => openModal(item));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(item);
        }
      });

      grid.appendChild(card);
    });

    initScrollReveal();
  }

  renderGrid();
}

/* ==========================================================================
   5. "AKLAT NG PAALALA" (THE SMALL BOOK OF REMINDERS)
   ========================================================================== */
function initBook() {
  const modal = document.getElementById('bookModalOverlay');
  const candleBtn = document.getElementById('floatingCandle');
  const closeBtn = document.getElementById('bookCloseBtn');
  const prevBtn = document.getElementById('bookPrevBtn');
  const nextBtn = document.getElementById('bookNextBtn');
  const stage = document.getElementById('bookPageStage');
  const textTl = document.getElementById('bookPageTl');
  const textEn = document.getElementById('bookPageEn');
  const dotsContainer = document.getElementById('bookDotsContainer');
  const finalCta = document.getElementById('bookFinalCta');
  const goToVowBtn = document.getElementById('bookGoToVowBtn');

  if (!BOOK_PAGES || !BOOK_PAGES.length) return;

  let currentPage = State.getBookPage();
  if (currentPage >= BOOK_PAGES.length) currentPage = 0;

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    BOOK_PAGES.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `book-dot ${idx === currentPage ? 'is-active' : ''}`;
      dotsContainer.appendChild(dot);
    });
  }

  function displayPage(idx, direction = 'forward') {
    currentPage = idx;
    State.setBookPage(idx);

    if (stage) {
      stage.classList.remove('page-turn-forward', 'page-turn-backward');
      void stage.offsetWidth; // trigger reflow
      stage.classList.add(direction === 'forward' ? 'page-turn-forward' : 'page-turn-backward');
    }

    setTimeout(() => {
      const p = BOOK_PAGES[idx];
      if (textTl) textTl.textContent = p.tl;
      if (textEn) textEn.textContent = p.en;

      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === BOOK_PAGES.length - 1;

      if (finalCta) {
        if (idx === BOOK_PAGES.length - 1) {
          finalCta.classList.remove('is-hidden');
        } else {
          finalCta.classList.add('is-hidden');
        }
      }

      renderDots();
    }, 200);
  }

  function openBook() {
    if (modal) {
      modal.classList.remove('is-hidden');
      displayPage(currentPage);
    }
  }

  function closeBook() {
    if (modal) modal.classList.add('is-hidden');
  }

  if (candleBtn) {
    candleBtn.addEventListener('click', openBook);
    candleBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBook();
      }
    });
  }

  // Connect floating scroll-follow candle
  initScrollCandle(openBook);

  if (closeBtn) closeBtn.addEventListener('click', closeBook);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeBook();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) displayPage(currentPage - 1, 'backward');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < BOOK_PAGES.length - 1) displayPage(currentPage + 1, 'forward');
    });
  }

  document.addEventListener('keydown', e => {
    if (modal && !modal.classList.contains('is-hidden')) {
      if (e.key === 'Escape') closeBook();
      if (e.key === 'ArrowRight' && currentPage < BOOK_PAGES.length - 1) {
        displayPage(currentPage + 1, 'forward');
      }
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        displayPage(currentPage - 1, 'backward');
      }
    }
  });

  if (goToVowBtn) {
    // Vow wall removed — close book and scroll to facts instead
    goToVowBtn.addEventListener('click', () => {
      closeBook();
      const facts = document.getElementById('factsSection');
      if (facts) facts.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   6. KALASAG (SHIELD) CONTENT POPULATION
   ========================================================================== */
function initShield() {
  const guidelinesEl = document.getElementById('shieldGuidelinesList');
  const hotlinesEl = document.getElementById('shieldHotlinesGrid');
  const allyListEl = document.getElementById('shieldAllyList');

  // Guidelines
  if (guidelinesEl && SHIELD_DATA.guidelines) {
    guidelinesEl.innerHTML = '';
    SHIELD_DATA.guidelines.forEach((g, idx) => {
      const item = document.createElement('div');
      item.className = 'guideline-item';
      item.innerHTML = `
        <span class="guideline-num">${idx + 1}</span>
        <div>
          <p><strong>${escapeHTML(g.tl)}</strong></p>
          <p style="font-size: 0.88rem; font-style: italic; color: var(--color-text-secondary);">${escapeHTML(g.en)}</p>
        </div>
      `;
      guidelinesEl.appendChild(item);
    });
  }

  // Hotlines
  if (hotlinesEl && SHIELD_DATA.hotlines) {
    hotlinesEl.innerHTML = '';
    SHIELD_DATA.hotlines.forEach(h => {
      const card = document.createElement('a');
      card.className = 'hotline-card';
      if (h.tel) card.href = `tel:${h.tel}`;
      card.innerHTML = `
        <span class="hotline-name">${escapeHTML(h.name)}</span>
        <span class="hotline-number">${escapeHTML(h.number)}</span>
        <span class="hotline-verify">⚠️ ${escapeHTML(h.verifyNote)}</span>
      `;
      hotlinesEl.appendChild(card);
    });
  }

  // Ally Tips
  if (allyListEl && SHIELD_DATA.allyTips) {
    allyListEl.innerHTML = '';
    SHIELD_DATA.allyTips.forEach((tip, idx) => {
      const li = document.createElement('li');
      li.style.marginBottom = 'var(--space-2)';
      li.innerHTML = `<strong>${idx + 1}.</strong> ${escapeHTML(tip)}`;
      allyListEl.appendChild(li);
    });
  }

  setupReportForm();
}

/* ==========================================================================
   7. MODERN SANGGUNIAN (ARCHIVAL REFERENCES & CITATIONS)
   ========================================================================== */
function initFooter() {
  const refList = document.getElementById('footerReferencesList');
  const refFilters = document.querySelectorAll('.ref-filter-pill');

  let activeRefFilter = 'Lahat';

  const typeMap = {
    'Lahat': 'all',
    'Teorya': 'theory',
    'Kasaysayan': 'history',
    'Batas': 'law',
    'Datos': 'data',
    'SOGIESC': 'sogiesc'
  };

  const typeBadgeMap = {
    'theory': { label: 'Teorya', icon: '📖' },
    'history': { label: 'Kasaysayan', icon: '🏛️' },
    'law': { label: 'Batas', icon: '⚖️' },
    'data': { label: 'Datos', icon: '📊' },
    'sogiesc': { label: 'SOGIESC', icon: '🏳️‍🌈' },
    'philippine-gender': { label: 'Kasarian sa PH', icon: '🇵🇭' }
  };

  function renderReferences() {
    if (!refList || !REFERENCES) return;
    refList.innerHTML = '';

    const targetType = typeMap[activeRefFilter] || 'all';
    const filtered = REFERENCES.filter(r => targetType === 'all' || r.type === targetType);

    filtered.forEach(r => {
      const entry = document.createElement('div');
      entry.className = 'modern-ref-card';

      const badge = typeBadgeMap[r.type] || { label: r.type, icon: '&#x1F4DC;' };
      const yearStr = r.year ? ' (' + r.year + ')' : '';
      const fullCitation = r.author + yearStr + '. ' + r.title + '. ' + r.source + '.';

      entry.innerHTML =
        '<div class="modern-ref-header">' +
          '<span class="modern-ref-type-badge">' + badge.icon + ' ' + escapeHTML(badge.label) + '</span>' +
          '<button type="button" class="modern-ref-copy-btn" aria-label="Kopyahin ang sitasyon">' +
            '<span aria-hidden="true">&#x1F4CB;</span>' +
          '</button>' +
        '</div>' +
        '<p class="modern-ref-biblio-line">' +
          '<strong class="modern-ref-author-name">' + escapeHTML(r.author) + '</strong>' +
          escapeHTML(yearStr) + '. ' +
          '<em class="modern-ref-title-em">' + escapeHTML(r.title) + '</em>. ' +
          '<span class="modern-ref-source">' + escapeHTML(r.source) + '</span>.' +
        '</p>';

      entry.querySelector('.modern-ref-copy-btn').addEventListener('click', async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(fullCitation);
            showToast('Nakopya ang sitasyon!', 'success');
          } else {
            showToast('Sitasyon: ' + fullCitation);
          }
        } catch {
          showToast('Nakopya ang sitasyon!', 'success');
        }
      });

      refList.appendChild(entry);
    });
  }

  refFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      refFilters.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeRefFilter = btn.getAttribute('data-filter') || 'Lahat';
      renderReferences();
    });
  });

  renderReferences();
}

/* ==========================================================================
   9. GLOBAL DATA EXPORT & RESET
   ========================================================================== */
function initDataModals() {
  const exportBtn = document.getElementById('exportDataBtn');
  const resetBtn = document.getElementById('resetDataBtn');
  const resetConfirmModal = document.getElementById('resetConfirmModal');
  const confirmYes = document.getElementById('confirmResetYes');
  const confirmNo = document.getElementById('confirmResetNo');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = State.exportAllData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bena_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Na-download ang iyong backup JSON file! 📤', 'success');
    });
  }

  if (resetBtn && resetConfirmModal) {
    resetBtn.addEventListener('click', () => {
      resetConfirmModal.classList.remove('is-hidden');
    });
  }

  if (confirmNo && resetConfirmModal) {
    confirmNo.addEventListener('click', () => {
      resetConfirmModal.classList.add('is-hidden');
    });
  }

  if (confirmYes && resetConfirmModal) {
    confirmYes.addEventListener('click', () => {
      State.clearAllData();
      resetConfirmModal.classList.add('is-hidden');
      window.location.reload();
    });
  }
}

/* ==========================================================================
   BOOTSTRAP
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter(() => {
    setTimeout(initVineSpine, 50);
  });
  initFallingLeaves();
  initVineSpine();
  initYakapModal();
  initQuotes();
  initAchievements();
  initBook();
  initShield();
  initFooter();
  initDataModals();
});

