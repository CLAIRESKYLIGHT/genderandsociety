/**
 * BENA — Motion System
 * Ambient falling leaves, scroll-following candle, scroll-driven central vine, and particle bursts
 */

export function isReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ── 1. Tranquil Ambient Falling Leaves ───────────────────────────────── */
const LEAF_SVGS = [
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 2C6 7 4 14 6 20C12 22 19 18 20 12C21 6 16 3 12 2Z" fill="currentColor"/><path d="M12 2Q12 11 6 20" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/></svg>`,
  `<svg viewBox="0 0 24 24" width="18" height="22" fill="none"><path d="M12 1C8 8 7 16 11 23C15 16 16 8 12 1Z" fill="currentColor"/><path d="M12 1V23" stroke="rgba(255,255,255,0.4)" stroke-width="1"/></svg>`,
  `<svg viewBox="0 0 24 24" width="22" height="18" fill="none"><path d="M2 18C7 16 14 18 22 12C16 6 9 8 2 18Z" fill="currentColor"/><path d="M2 18C8 14 15 13 22 12" stroke="rgba(255,255,255,0.4)" stroke-width="1"/></svg>`,
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 3C4 8 3 17 8 21C14 23 20 19 21 13C22 7 17 4 12 3Z" fill="currentColor"/><path d="M12 3C10 9 9 15 8 21" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/></svg>`,
];

const LEAF_COLORS = ["#3B6E4A", "#8EBC85", "#5A936C", "#345942"];
let leafListenersBound = false;

export function initFallingLeaves() {
  const existing = document.querySelector(".falling-leaves-container");
  if (isReducedMotion()) {
    existing?.remove();
    return;
  }

  existing?.remove();

  if (!leafListenersBound) {
    leafListenersBound = true;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => initFallingLeaves();
    if (motionQuery.addEventListener)
      motionQuery.addEventListener("change", handleMotionChange);
    else motionQuery.addListener(handleMotionChange);

    let resizeTimer;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initFallingLeaves, 250);
      },
      { passive: true },
    );
  }

  const container = document.createElement("div");
  container.className = "falling-leaves-container";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  const isMobile = window.innerWidth <= 640;
  const leafCount = isMobile ? 5 : 8;

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("div");
    leaf.className = "falling-leaf";

    const color =
      !isMobile && i === 7 ? "#C9A227" : LEAF_COLORS[i % LEAF_COLORS.length];
    const svgStr = LEAF_SVGS[i % LEAF_SVGS.length];
    leaf.innerHTML = svgStr;
    leaf.style.color = color;

    const leftPct =
      i % 2 === 0 ? 2 + Math.random() * 8 : 90 + Math.random() * 8;
    const duration = 18000 + Math.random() * 10000;
    const scale = 0.6 + Math.random() * 0.4;
    const swayAmount = 40 + Math.random() * 40;
    const swayCycles = 2 + Math.random() * 2;
    const rotations = 3 + Math.floor(Math.random() * 6);
    leaf.style.left = `${leftPct}%`;

    const frames = Array.from({ length: 33 }, (_, frameIndex) => {
      const progress = frameIndex / 32;
      const fadeIn = Math.min(progress / (2000 / duration), 1);
      const fadeOut = Math.min((1 - progress) / (2000 / duration), 1);
      const opacity = Math.min(fadeIn, fadeOut) * 0.62;
      const sway = Math.sin(progress * swayCycles * Math.PI * 2) * swayAmount;
      const fall = -15 + progress * 130;
      const rotation = progress * rotations * 360;

      return {
        offset: progress,
        opacity,
        transform: `translate3d(${sway}px, ${fall}vh, 0) rotate(${rotation}deg) scale(${scale})`,
      };
    });

    leaf.animate(frames, {
      duration,
      delay: -Math.random() * duration,
      iterations: Infinity,
      easing: "linear",
    });

    container.appendChild(leaf);
  }
}

/* ── 2. Scroll-Following Guiding Candle ───────────────────────────────── */
export function initScrollCandle(onCandleClick) {
  const beacon = document.getElementById("scrollFollowCandle");
  if (!beacon) return;

  if (onCandleClick) {
    beacon.addEventListener("click", onCandleClick);
    beacon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onCandleClick();
      }
    });
  }

  let lastScrollY = window.scrollY || window.pageYOffset;
  let rafId = null;

  function updateCandle() {
    const scrollY = window.scrollY || window.pageYOffset;
    const delta = scrollY - lastScrollY;
    lastScrollY = scrollY;

    // Show floating candle guide after user scrolls past top (120px)
    if (scrollY > 160) {
      beacon.classList.add("is-visible");
    } else {
      beacon.classList.remove("is-visible");
    }

    // Gentle dynamic tilt based on scroll velocity
    const tilt = Math.max(Math.min(delta * 0.15, 12), -12);
    beacon.style.transform = `translateY(0) rotate(${tilt}deg)`;

    // Reset tilt smoothly when scroll stops
    clearTimeout(beacon._tiltTimer);
    beacon._tiltTimer = setTimeout(() => {
      beacon.style.transform = `translateY(0) rotate(0deg)`;
    }, 120);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCandle);
    },
    { passive: true },
  );

  updateCandle();
}

/* ── 3. Spiral Vine Scroll Draw ──────────────────────────────────────── */
export function initVineSpine() {
  const spiralStem = document.getElementById("vineMainStem");
  const secondaryStem = document.getElementById("vineSecondaryStem");

  // Also handle old vine-spine-track for Kalasag page
  const spineTracks = document.querySelectorAll(".vine-spine-track");
  spineTracks.forEach((track) => {
    track.innerHTML = "";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "vine-spine-svg");
    svg.setAttribute("viewBox", "0 0 24 1000");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "vine-spine-path");
    path.setAttribute("d", "M12,0 Q8,125 14,250 T10,500 T14,750 T12,1000");
    svg.appendChild(path);
    track.appendChild(svg);
  });

  if (!spiralStem) return;

  // Measure actual path length for precise drawing
  const totalLength = spiralStem.getTotalLength
    ? spiralStem.getTotalLength()
    : 3200;
  spiralStem.style.strokeDasharray = totalLength;
  spiralStem.style.strokeDashoffset = totalLength;

  let totalSecondaryLength = 3200;
  if (secondaryStem && secondaryStem.getTotalLength) {
    totalSecondaryLength = secondaryStem.getTotalLength();
    secondaryStem.style.strokeDasharray = totalSecondaryLength;
    secondaryStem.style.strokeDashoffset = totalSecondaryLength;
  }

  let scrollTimeout = null;
  let rafId = null;

  function updateVine() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    // Draw the vine as user scrolls — offset counts down from totalLength → 0
    const drawn = totalLength * progress;
    spiralStem.style.strokeDashoffset = totalLength - drawn;

    if (secondaryStem) {
      const drawnSec = totalSecondaryLength * progress;
      secondaryStem.style.strokeDashoffset = totalSecondaryLength - drawnSec;
    }

    // Also animate old spine tracks
    document.querySelectorAll(".vine-spine-path").forEach((p) => {
      p.style.strokeDashoffset = `${scrollY * 0.15}px`;
    });

    // Sway body class for leaf clusters and leaf cards
    document.body.classList.add("is-scrolling");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove("is-scrolling");
    }, 420);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateVine);
    },
    { passive: true },
  );

  window.addEventListener(
    "resize",
    () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateVine);
    },
    { passive: true },
  );

  // Initial draw so the hero vine stem is gracefully visible right away
  requestAnimationFrame(updateVine);
  setTimeout(updateVine, 300);
}

/* ── 3. Reveal on Scroll ─────────────────────────────────────────────── */
export function initScrollReveal() {
  if (isReducedMotion()) {
    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-revealed");
          }, idx * 60);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".reveal-on-scroll")
    .forEach((el) => observer.observe(el));
}

/* ── 4. Vow Submit Particle Burst ────────────────────────────────────── */
let activeBurstCanvas = null;

export function triggerPledgeBurst() {
  if (isReducedMotion() || activeBurstCanvas) return;

  const canvas = document.createElement("canvas");
  canvas.className = "pledge-burst-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  activeBurstCanvas = canvas;

  const ctx = canvas.getContext("2d");
  const particles = [];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2 + 100;

  for (let i = 0; i < 16; i++) {
    particles.push({
      x: centerX + (Math.random() * 120 - 60),
      y: centerY + (Math.random() * 40 - 20),
      radius: Math.random() * 3 + 2,
      color: "#C9A227",
      vx: (Math.random() - 0.5) * 3,
      vy: -(Math.random() * 4 + 2),
      alpha: 1,
    });
  }

  const startTime = performance.now();
  const duration = 800;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha = 1 - progress;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 162, 39, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(201, 162, 39, 0.6)";
      ctx.fill();
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
      activeBurstCanvas = null;
    }
  }

  requestAnimationFrame(animate);
}
