/**
 * BENA — Hash Router
 * Supports #tahanan and #kalasag, history popstate, and aria-current updates
 */

const VALID_ROUTES = ['tahanan', 'kalasag'];

export function initRouter(onRouteChange) {
  function getRoute() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_ROUTES.includes(hash) ? hash : 'tahanan';
  }

  function applyRoute(route) {
    // Update active tab buttons
    const tabButtons = document.querySelectorAll('.leaf-tab-btn');
    tabButtons.forEach(btn => {
      const tabTarget = btn.getAttribute('data-tab');
      const isActive = tabTarget === route;
      btn.classList.toggle('is-active', isActive);
      if (isActive) {
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.removeAttribute('aria-current');
      }
    });

    // Update active pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
      const isTarget = p.id === route;
      p.classList.toggle('is-active', isTarget);
      if (isTarget) {
        p.removeAttribute('hidden');
      } else {
        p.setAttribute('hidden', '');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof onRouteChange === 'function') {
      onRouteChange(route);
    }
  }

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    applyRoute(getRoute());
  });

  // Handle tab clicks
  document.querySelectorAll('.leaf-tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = btn.getAttribute('data-tab');
      if (target && target !== getRoute()) {
        window.location.hash = target;
        applyRoute(target);
      }
    });
  });

  // Initial load
  const initial = getRoute();
  if (window.location.hash !== `#${initial}`) {
    window.location.hash = initial;
  }
  applyRoute(initial);
}
