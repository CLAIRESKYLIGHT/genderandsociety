/**
 * BENA — Thread Weave & Floating Candle Interactive Engine
 * Connects all sections with a woven vine thread and manages floating candle interactions.
 */

(function () {
  'use strict';

  // Leaf color palette (Filipino Forest Canopy & Gold)
  const LEAF_COLORS = [
    { fill: '#3a6b46', vein: 'rgba(255,255,255,0.45)' }, // Forest Emerald
    { fill: '#c99732', vein: 'rgba(255,255,255,0.5)' },  // Warm Gold
    { fill: '#5a9367', vein: 'rgba(255,255,255,0.4)' },  // Sage Green
    { fill: '#8b6914', vein: 'rgba(255,255,255,0.4)' },  // Raw Ochre
    { fill: '#4d7c58', vein: 'rgba(255,255,255,0.45)' }, // Deep Sprout
    { fill: '#e5b85c', vein: 'rgba(255,255,255,0.5)' }   // Sunlit Gold
  ];

  // Distribution percentages down the vertical spine
  const LEAF_POSITIONS = [3, 11, 20, 30, 41, 52, 63, 74, 84, 94];

  /**
   * Generates an SVG leaf element with authentic botanical curvature
   */
  function createLeafSvg(colorObj, isRight) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'thread-node-leaf');
    svg.setAttribute('aria-hidden', 'true');

    // Asymmetrical leaf blade pointing outward from the spine
    const pathBlade = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (isRight) {
      pathBlade.setAttribute('d', 'M4,18 C6,10 14,4 21,3 C21,11 16,19 4,18 Z');
    } else {
      pathBlade.setAttribute('d', 'M20,18 C18,10 10,4 3,3 C3,11 8,19 20,18 Z');
    }
    pathBlade.setAttribute('fill', colorObj.fill);
    pathBlade.setAttribute('opacity', '0.9');

    // Leaf center vein
    const pathVein = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (isRight) {
      pathVein.setAttribute('d', 'M4,18 Q12,12 21,3');
    } else {
      pathVein.setAttribute('d', 'M20,18 Q12,12 3,3');
    }
    pathVein.setAttribute('stroke', colorObj.vein);
    pathVein.setAttribute('stroke-width', '0.9');
    pathVein.setAttribute('stroke-linecap', 'round');
    pathVein.setAttribute('fill', 'none');

    svg.appendChild(pathBlade);
    svg.appendChild(pathVein);
    return svg;
  }

  /**
   * Populates a single .thread-leaves container with leaf nodes
   */
  function populateSpine(leavesContainer) {
    if (!leavesContainer || leavesContainer.dataset.populated === 'true') return;

    const frag = document.createDocumentFragment();

    LEAF_POSITIONS.forEach((topPct, idx) => {
      const isRight = idx % 2 === 1;
      const color = LEAF_COLORS[idx % LEAF_COLORS.length];
      const delay = (idx * 0.45).toFixed(2);
      const rot = isRight ? (12 + (idx % 3) * 6) : (-12 - (idx % 3) * 6);

      const node = document.createElement('div');
      node.className = `thread-leaf-node side-${isRight ? 'right' : 'left'}`;
      node.style.top = `${topPct}%`;
      node.style.setProperty('--node-delay', `${delay}s`);
      node.style.setProperty('--node-rot', `${rot}deg`);

      const leafSvg = createLeafSvg(color, isRight);
      node.appendChild(leafSvg);
      frag.appendChild(node);
    });

    leavesContainer.appendChild(frag);
    leavesContainer.dataset.populated = 'true';
  }

  /**
   * Initializes all thread spines on the page
   */
  function initAllSpines() {
    const containers = document.querySelectorAll('.thread-spine-wrap .thread-leaves');
    containers.forEach(populateSpine);
  }

  /**
   * Sets up the Floating Candle on the Home hero
   */
  function initFloatingCandle() {
    const candle = document.getElementById('floatingCandle');
    if (!candle) return;

    function handleCandleActivation(e) {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();

      if (typeof window.openBookModal === 'function') {
        window.openBookModal();
      } else {
        const bookModal = document.getElementById('bookModalOverlay');
        if (bookModal) bookModal.classList.remove('is-hidden');
      }
    }

    candle.addEventListener('click', handleCandleActivation);
    candle.addEventListener('keydown', handleCandleActivation);
  }

  /**
   * Watch for tab switches to ensure newly revealed spines are populated
   */
  function watchTabSwitches() {
    const tabButtons = document.querySelectorAll('.tab-btn[data-tab]');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(initAllSpines, 50);
      });
    });

    const pages = document.querySelectorAll('.page');
    if (pages.length && 'MutationObserver' in window) {
      const obs = new MutationObserver(mutations => {
        mutations.forEach(m => {
          if (m.attributeName === 'class' || m.attributeName === 'hidden') {
            initAllSpines();
          }
        });
      });
      pages.forEach(p => obs.observe(p, { attributes: true }));
    }
  }

  function init() {
    initAllSpines();
    initFloatingCandle();
    watchTabSwitches();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BenaThread = {
    refresh: initAllSpines,
    refreshActive: initAllSpines
  };
})();
