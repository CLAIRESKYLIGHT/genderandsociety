/**
 * BENA — Forest Canopy Falling Leaves System
 * ==========================================
 * Creates subtle, tranquil leaves that drift slowly across the margins
 * and background.
 *
 * Requirements:
 * - 4 to 5 leaves on mobile, 6 to 8 on desktop (never more than 9).
 * - Each leaf takes 18 to 28 seconds to fall.
 * - Gentle swaying, slow rotation, fade in at top, fade out at bottom.
 * - Soft green palette with rare sunlit gold.
 * - Confined to margins & behind content layer (never blocks reading).
 * - Strictly disabled for prefers-reduced-motion.
 */

(function () {
  "use strict";

  const LEAF_SVGS = [
    // Shape 1: Curved Ovate Leaf with delicate vein
    `<svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6 10 3 20 12 34C21 20 18 10 12 2Z" fill="currentColor" fill-opacity="0.85"/>
      <path d="M12 2V34M12 12C9 14 7 16 7 16M12 18C15 20 17 22 17 22M12 24C9 26 8 28 8 28" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" stroke-linecap="round"/>
    </svg>`,

    // Shape 2: Slender Willow / Banyan Leaf
    `<svg viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1C4 11 3 24 9 39C15 24 14 11 9 1Z" fill="currentColor" fill-opacity="0.8"/>
      <path d="M9 1V39M9 14C6 17 5 19 5 19M9 22C12 24 13 26 13 26" stroke="rgba(255,255,255,0.35)" stroke-width="0.75" stroke-linecap="round"/>
    </svg>`,

    // Shape 3: Soft Rounded Forest Leaf
    `<svg viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2C5 8 2 18 14 30C26 18 23 8 14 2Z" fill="currentColor" fill-opacity="0.82"/>
      <path d="M14 2V30M14 10C10 12 8 15 8 15M14 16C18 18 20 21 20 21" stroke="rgba(255,255,255,0.35)" stroke-width="0.8" stroke-linecap="round"/>
    </svg>`,
  ];

  const LEAF_COLORS = [
    "#67b9a5", // forest teal
    "#f0c95d", // warm gold
    "#d87d7a", // coral blush
    "#7a8ed5", // spring lilac
    "#f7b9c6", // rose-pink
    "#5cae91", // leafy green
    "#e9bf55", // amber gold
    "#d3738d", // magenta rose
    "#7bbfc7", // seafoam
  ];

  let container = null;
  let leaves = [];
  let isReducedMotion = false;

  function checkReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function createLeaf(index, totalLeaves) {
    const el = document.createElement("div");
    el.className = "canopy-falling-leaf";
    el.setAttribute("aria-hidden", "true");

    // Color: mostly greens, 1 or 2 gold
    const isGold = index % 4 === 3;
    const color = isGold
      ? index % 2 === 0
        ? "#f3d168"
        : "#eebd48"
      : LEAF_COLORS[index % LEAF_COLORS.length];
    const shape = LEAF_SVGS[index % LEAF_SVGS.length];

    el.innerHTML = shape;
    el.style.color = color;

    // Distribute to margins & edges so it NEVER covers text
    // 0 -> left margin (1% - 14%)
    // 1 -> right margin (86% - 98%)
    // 2 -> left margin (2% - 12%)
    // 3 -> right margin (87% - 97%)
    let leftPercent;
    if (index % 2 === 0) {
      leftPercent = 1 + ((index * 2.5) % 13); // 1% to 14%
    } else {
      leftPercent = 86 + ((index * 2.3) % 12); // 86% to 98%
    }

    // Size: small, subtle (16px to 26px)
    const size = 16 + (index % 4) * 3;
    el.style.width = `${size}px`;
    el.style.height = `${Math.round(size * 1.4)}px`;
    el.style.left = `${leftPercent}%`;

    // Duration: 18 to 28 seconds (as requested)
    const duration = 18 + ((index * 1.3) % 10);
    // Stagger start: negative delay so leaves are already drifting on page load
    const delay = -(index * (duration / totalLeaves));

    // Sway oscillation amount
    const swayAmount = 25 + (index % 3) * 12; // 25px - 49px
    const swayPeriod = 4.5 + (index % 3) * 1.2; // 4.5s - 6.9s

    el.style.setProperty("--leaf-duration", `${duration.toFixed(1)}s`);
    el.style.setProperty("--leaf-delay", `${delay.toFixed(1)}s`);
    el.style.setProperty("--leaf-sway", `${swayAmount}px`);
    el.style.setProperty("--leaf-sway-period", `${swayPeriod.toFixed(1)}s`);

    return el;
  }

  function initLeaves() {
    isReducedMotion = checkReducedMotion();
    if (isReducedMotion) {
      if (container) container.innerHTML = "";
      return;
    }

    if (!container) {
      container = document.createElement("div");
      container.id = "canopyLeavesContainer";
      container.className = "canopy-falling-leaves";
      container.setAttribute("aria-hidden", "true");
      document.body.appendChild(container);
    }

    container.innerHTML = "";
    leaves = [];

    // Subtle leaf count: 4-5 on mobile, 7 on desktop (Never more than 9)
    const isMobile = window.innerWidth <= 768;
    const leafCount = isMobile ? 4 : 7;

    for (let i = 0; i < leafCount; i++) {
      const leaf = createLeaf(i, leafCount);
      container.appendChild(leaf);
      leaves.push(leaf);
    }
  }

  // Handle Resize and Motion Preference Changes
  let resizeTimeout;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        initLeaves();
      }, 300);
    },
    { passive: true },
  );

  if (window.matchMedia) {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", initLeaves);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(initLeaves);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLeaves);
  } else {
    initLeaves();
  }

  // Expose toggle capability
  window.BenaLeaves = {
    refresh: initLeaves,
    toggle: function (enable) {
      if (!container) return;
      container.style.display = enable ? "block" : "none";
    },
  };
})();
