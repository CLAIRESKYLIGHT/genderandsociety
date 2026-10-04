/**
 * BENA — Main Application Coordinator
 * Under the Forest Canopy • Gender & Society Sanctuary
 */

import { QUOTES } from "./quotes.js";
import { ACHIEVEMENTS } from "./achievements.js";
import { BOOK_PAGES } from "./book.js";
import { REFERENCES } from "./references.js";
import { CREDITS } from "./credits.js";
import { SHIELD_DATA, setupReportForm } from "./shield.js";
import { State } from "./state.js";
import { escapeHTML, getDayOfYear } from "./utils.js";
import { showToast } from "./toast.js";
import { initRouter } from "./router.js";
import {
  initFallingLeaves,
  initScrollCandle,
  initScrollReveal,
  triggerPledgeBurst,
  initVineSpine,
} from "./motion.js";

/* ==========================================================================
   1. THEME MANAGEMENT
   ========================================================================== */
function initTheme() {
  const currentTheme = State.getTheme();
  State.setTheme(currentTheme);

  const toggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  function updateBtnUI(theme) {
    if (theme === "dark") {
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeLabel) themeLabel.textContent = "Glade";
    } else {
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeLabel) themeLabel.textContent = "Dusk";
    }
  }

  updateBtnUI(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = State.getTheme() === "dark" ? "light" : "dark";
      State.setTheme(next);
      updateBtnUI(next);
    });
  }
}

function initButtonMicroMotion() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".btn--primary");
    if (
      !button ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const bounds = button.getBoundingClientRect();
    const diameter = Math.max(bounds.width, bounds.height) * 2;
    const ring = document.createElement("span");
    ring.className = "button-click-ring";
    ring.setAttribute("aria-hidden", "true");
    ring.style.width = `${diameter}px`;
    ring.style.height = `${diameter}px`;
    ring.style.left = `${event.clientX - bounds.left - diameter / 2}px`;
    ring.style.top = `${event.clientY - bounds.top - diameter / 2}px`;
    button.appendChild(ring);
    window.setTimeout(() => ring.remove(), 320);
  });
}

/* ==========================================================================
   2. YAKAP WELCOME MODAL
   ========================================================================== */
function initYakapModal() {
  const overlay = document.getElementById("yakapModalOverlay");
  const dismissBtn = document.getElementById("yakapDismissBtn");
  const neverShowBtn = document.getElementById("yakapNeverBtn");
  const helpBtn = document.getElementById("headerHelpBtn");

  let returnFocusTo = helpBtn;

  function showModal(trigger = helpBtn) {
    if (!overlay) return;
    returnFocusTo = trigger;
    overlay.classList.remove("is-hidden");
    dismissBtn?.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.add("is-hidden");
    if (returnFocusTo?.isConnected) returnFocusTo.focus();
  }

  if (!State.hasVisited() && overlay) {
    overlay.classList.remove("is-hidden");
    dismissBtn?.focus();
  }

  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      State.setVisited(true);
      closeModal();
      showToast("Maligayang pagdating sa BENA 🌻");
    });
  }

  if (neverShowBtn) {
    neverShowBtn.addEventListener("click", () => {
      State.setVisited(true);
      closeModal();
      showToast("Maligayang pagdating sa BENA 🌻");
    });
  }

  if (helpBtn) {
    helpBtn.addEventListener("click", () => showModal(helpBtn));
  }

  document.addEventListener("keydown", (e) => {
    if (!overlay || overlay.classList.contains("is-hidden")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;

    const focusable = [
      ...overlay.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ];
    if (!focusable.length) {
      e.preventDefault();
      overlay.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (
      e.shiftKey &&
      (document.activeElement === first ||
        !overlay.contains(document.activeElement))
    ) {
      e.preventDefault();
      last.focus();
    } else if (
      !e.shiftKey &&
      (document.activeElement === last ||
        !overlay.contains(document.activeElement))
    ) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ==========================================================================
   3. DAILY FILIPINO PRIDE REMINDER (QUOTES)
   ========================================================================== */
function initQuotes() {
  const quoteTlEl = document.getElementById("dailyQuoteTl");
  const quoteEnEl = document.getElementById("dailyQuoteEn");
  const newQuoteBtn = document.getElementById("newQuoteBtn");
  const copyBtn = document.getElementById("copyQuoteBtn");

  if (!QUOTES || !QUOTES.length) return;

  // Day-of-year auto select
  const dayIndex = getDayOfYear() % QUOTES.length;
  let currentIndex = dayIndex;

  function renderQuote(idx) {
    if (!quoteTlEl) return;
    const q = QUOTES[idx];
    quoteTlEl.style.opacity = "0";
    if (quoteEnEl) quoteEnEl.style.opacity = "0";

    setTimeout(() => {
      quoteTlEl.textContent = `“${q.tl}”`;
      if (quoteEnEl) quoteEnEl.textContent = q.en ? `“${q.en}”` : "";
      quoteTlEl.style.opacity = "1";
      if (quoteEnEl) quoteEnEl.style.opacity = "1";
    }, 180);
  }

  renderQuote(currentIndex);

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", () => {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * QUOTES.length);
      } while (nextIdx === currentIndex && QUOTES.length > 1);
      currentIndex = nextIdx;
      renderQuote(currentIndex);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const q = QUOTES[currentIndex];
      const text = `“${q.tl}”\n(${q.en})\n— BENA • Gender and Society Sanctuary`;
      try {
        await navigator.clipboard.writeText(text);
        showToast("Na-kopyang matagumpay ang paalala! 🍃", "success");
      } catch {
        showToast("Hindi ma-access ang clipboard.", "error");
      }
    });
  }
}

/* ==========================================================================
   4. ACHIEVEMENTS GALLERY ("WALANG KASARIAN ANG TALENTO")
   ========================================================================== */
function initAchievements() {
  const grid = document.getElementById("achievementsGrid");
  const modal = document.getElementById("achievementModalOverlay");
  const modalImage = document.getElementById("achModalImage");
  const modalTitle = document.getElementById("achModalTitle");
  const modalCategory = document.getElementById("achModalCategory");
  const modalDesc = document.getElementById("achModalDesc");
  const modalWhy = document.getElementById("achModalWhy");
  const modalSource = document.getElementById("achModalSource");
  const modalClose = document.getElementById("achModalClose");

  if (!grid) return;

  function openModal(item) {
    if (!modal) return;
    if (modalImage) {
      modalImage.src = item.image || "";
      modalImage.alt = item.image ? `Larawan ni ${item.name}` : "";
      modalImage
        .closest(".achievement-story-portrait")
        ?.classList.remove("is-placeholder");
    }
    if (modalTitle) modalTitle.textContent = item.name;
    if (modalCategory)
      modalCategory.textContent = `${item.category} • ${(item.tags || []).join(", ")}`;
    if (modalDesc) modalDesc.textContent = item.description;
    if (modalWhy) modalWhy.textContent = item.why;
    if (modalSource) {
      modalSource.hidden = !item.sourceUrl;
      if (item.sourceUrl) {
        modalSource.href = item.sourceUrl;
        modalSource.textContent = item.sourceTitle || "Sanggunian";
      }
    }
    modal.classList.remove("is-hidden");
  }

  function closeModal() {
    if (modal) modal.classList.add("is-hidden");
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function renderGrid() {
    grid.innerHTML = "";

    ACHIEVEMENTS.forEach((item) => {
      const card = document.createElement("article");
      card.className = "achievement-card reveal-on-scroll";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Basahin ang kwento ni ${item.name}`);

      card.innerHTML = `
        ${item.image ? `<img class="achievement-photo" src="${escapeHTML(item.image)}" alt="Larawan ni ${escapeHTML(item.name)}" loading="lazy">` : ""}
        <span class="achievement-name">${escapeHTML(item.name)}</span>
        <img class="achievement-frame-star" src="assets/star4.png" alt="" aria-hidden="true">
      `;

      card.addEventListener("click", () => openModal(item));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
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

function initAdvocates() {
  const grid = document.getElementById("advocatesGrid");
  const modal = document.getElementById("achievementModalOverlay");
  const modalImage = document.getElementById("achModalImage");
  const modalTitle = document.getElementById("achModalTitle");
  const modalCategory = document.getElementById("achModalCategory");
  const modalDesc = document.getElementById("achModalDesc");
  const modalWhy = document.getElementById("achModalWhy");
  const modalSource = document.getElementById("achModalSource");

  if (!grid || !modal) return;

  const advocates = [
    {
      name: "Sen. Risa Hontiveros",
      role: "Senadora at pangunahing sponsor ng SOGIE Equality Bill sa Senado.",
      image: "assets/Risa Hontiveros.jpg",
      relevance:
        "Ipinapakita ng kanyang patuloy na gawaing lehislatibo na seryoso at nagpapatuloy ang laban para sa pantay na proteksyon.",
    },
    {
      name: "Rep. Geraldine Roman",
      role: "Kauna-unahang hayagang transgender na nahalal sa House of Representatives noong 2016 at pangunahing may-akda at tagapagtaguyod ng SOGIE Equality Bill sa Kamara.",
      image: "assets/Geraldine Roman.jpg",
      relevance:
        "Ipinapakita ng kanyang paglilingkod sa Kongreso na ang LGBTQIA+ Filipinos ay hindi lamang humihingi ng puwang; nakikilahok at namumuno rin sila sa paggawa ng batas.",
    },
    {
      name: "Rep. Sarah Elago",
      role: "Dating first nominee ng Gabriela Women's Party at isa sa mga pangunahing may-akda ng SOGIE Equality Bill; nagsalita rin siya laban sa maling impormasyon tungkol sa panukala.",
      image: "assets/Sarah Elago.jpg",
      relevance:
        "Itinatampok ng kanyang adbokasiya ang pagkakaisa ng kilusan para sa karapatan ng kababaihan at ng LGBTQIA+ community.",
      sourceUrl:
        "https://www.bulatlat.org/2025/06/24/after-25-years-sogiesc-bill-still-awaits-passage/?tztc=1",
      sourceTitle:
        "Bulatlat: After 25 years, SOGIESC bill still awaits passage",
    },
    {
      name: "Rep. Perci Cendaña",
      role: "Akbayan representative, dating pangulo ng UP Babaylan, at hayagang gay na lider sa politika at LGBTQIA+ advocacy.",
      image: "assets/Perci Cendaña.jpg",
      relevance:
        "Ikinokonekta ng kanyang karanasan ang student organizing at pambansang paggawa ng batas.",
      sourceUrl:
        "https://rollingstonephilippines.com/state-of-affairs/lgbtq/perci-cendana-sogie-bill-philippines/",
      sourceTitle:
        "Rolling Stone Philippines: Perci Cendaña and the SOGIE Bill",
    },
    {
      name: "Danton Remoto",
      role: "Manunulat, propesor, at tagapagtatag ng Ang Ladlad, isang LGBTQ+ political party-list.",
      image: "assets/Danton Remoto.png",
      relevance:
        "Kinakatawan ng kanyang gawain ang mas naunang pagsisikap na magkaroon ng LGBTQ+ visibility at representasyon sa sistemang pampulitika.",
    },
    {
      name: "Etta Rosales",
      role: "Dating kinatawan ng Akbayan at tagapagtaguyod ng maagang panukalang batas laban sa diskriminasyon noong 2000.",
      image: "assets/Etta Rosales.png",
      relevance:
        "Ipinapaalala ng kanyang maagang gawaing lehislatibo na dekada na ang panawagan para sa pantay na proteksyon.",
      sourceUrl: "https://akbayan.org.ph/news/love-all-akbayan-mo",
      sourceTitle: "Akbayan: Love all, Akbayan mo",
    },
  ];

  advocates.forEach((advocate) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `advocate-leaf${advocate.image ? "" : " has-no-photo"}`;
    card.setAttribute(
      "aria-label",
      `Tingnan kung bakit mahalaga si ${advocate.name} sa BENA`,
    );
    card.innerHTML = `
      <span class="advocate-frame-scene">
        <img class="advocate-star advocate-star--one" src="assets/star1.png" alt="" aria-hidden="true">
        <img class="advocate-star advocate-star--two" src="assets/star2.png" alt="" aria-hidden="true">
        <img class="advocate-star advocate-star--three" src="assets/star3.png" alt="" aria-hidden="true">
        <span class="advocate-photo-window">
          ${advocate.image ? `<img class="advocate-photo" src="${escapeHTML(advocate.image)}" alt="Larawan ni ${escapeHTML(advocate.name)}" loading="lazy">` : ""}
          <span class="advocate-photo-fallback" aria-hidden="true">Larawan darating</span>
          <span class="advocate-name-label">${escapeHTML(advocate.name)}</span>
        </span>
        <img class="advocate-frame-art" src="assets/FRAME.png" alt="" aria-hidden="true">
      </span>
    `;

    const image = card.querySelector(".advocate-photo");
    if (!image) card.classList.add("has-no-photo");
    image?.addEventListener("error", () => card.classList.add("has-no-photo"), {
      once: true,
    });
    card.addEventListener("click", () => {
      if (modalImage) {
        modalImage.src = advocate.image || "";
        modalImage.alt = advocate.image
          ? `Larawan ni ${advocate.name}`
          : "Larawan ng tagapagtaguyod ay idaragdag pa";
        modalImage
          .closest(".achievement-story-portrait")
          ?.classList.toggle("is-placeholder", !advocate.image);
      }
      if (modalTitle) modalTitle.textContent = advocate.name;
      if (modalCategory)
        modalCategory.textContent = "Tinig sa likod ng adbokasiya";
      if (modalDesc) modalDesc.textContent = advocate.role;
      if (modalWhy) modalWhy.textContent = advocate.relevance;
      if (modalSource) {
        modalSource.hidden = !advocate.sourceUrl;
        if (advocate.sourceUrl) {
          modalSource.href = advocate.sourceUrl;
          modalSource.textContent = advocate.sourceTitle || "Sanggunian";
        }
      }
      modal.classList.remove("is-hidden");
    });

    grid.appendChild(card);
  });
}

/* ==========================================================================
   5. "AKLAT NG PAALALA" (THE SMALL BOOK OF REMINDERS)
   ========================================================================== */
function initBook() {
  const modal = document.getElementById("bookModalOverlay");
  const candleBtn = document.getElementById("floatingCandle");
  const closeBtn = document.getElementById("bookCloseBtn");
  const prevBtn = document.getElementById("bookPrevBtn");
  const nextBtn = document.getElementById("bookNextBtn");
  const stage = document.getElementById("bookPageStage");
  const textTl = document.getElementById("bookPageTl");
  const textEn = document.getElementById("bookPageEn");
  const dotsContainer = document.getElementById("bookDotsContainer");
  const finalCta = document.getElementById("bookFinalCta");
  const lightCandleBtn = document.getElementById("bookLightCandleBtn");
  const bookCandleIcon = document.getElementById("bookCandleIcon");
  const homeCandle = document.querySelector(".sanctuary-candle-wrap");
  const ritualOverlay = document.getElementById("candleRitualOverlay");
  const ritualCloseBtn = document.getElementById("candleRitualClose");
  const ritualCount = document.getElementById("candleRitualCount");

  if (!BOOK_PAGES || !BOOK_PAGES.length) return;

  let currentPage = State.getBookPage();
  let introTimer = null;
  if (currentPage >= BOOK_PAGES.length) currentPage = 0;

  function typeIntroOnce() {
    if (!textTl || State.hasTypedBookIntro()) return;
    State.setBookIntroTyped(true);
    const intro = BOOK_PAGES[0].tl.split("\n");
    const openingLine = intro.shift().slice(0, 60);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      textTl.textContent = BOOK_PAGES[0].tl;
      return;
    }

    let characterIndex = 0;
    textTl.textContent = "";
    textTl.classList.add("is-typing");
    const typeNextCharacter = () => {
      if (!modal || modal.classList.contains("is-hidden")) {
        textTl.classList.remove("is-typing");
        return;
      }
      characterIndex += 1;
      textTl.textContent = openingLine.slice(0, characterIndex);
      if (characterIndex >= openingLine.length) {
        textTl.textContent = BOOK_PAGES[0].tl;
        textTl.classList.remove("is-typing");
        return;
      }
      introTimer = window.setTimeout(typeNextCharacter, 42);
    };
    typeNextCharacter();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    BOOK_PAGES.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = `book-dot ${idx === currentPage ? "is-active" : ""}`;
      dotsContainer.appendChild(dot);
    });
  }

  function displayPage(idx, direction = "forward") {
    currentPage = idx;
    State.setBookPage(idx);

    if (stage) {
      stage.classList.remove("page-turn-forward", "page-turn-backward");
      void stage.offsetWidth; // trigger reflow
      stage.classList.add(
        direction === "forward" ? "page-turn-forward" : "page-turn-backward",
      );
    }

    setTimeout(() => {
      const p = BOOK_PAGES[idx];
      if (textTl) textTl.textContent = p.tl;
      if (textEn) textEn.textContent = p.en;

      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === BOOK_PAGES.length - 1;

      if (finalCta) {
        if (idx === BOOK_PAGES.length - 1) {
          finalCta.classList.remove("is-hidden");
        } else {
          finalCta.classList.add("is-hidden");
        }
      }

      renderDots();
    }, 400);
  }

  function openBook() {
    if (modal) {
      modal.classList.remove("is-hidden");
      modal.classList.add("is-opening");
      window.setTimeout(() => modal.classList.remove("is-opening"), 900);
      displayPage(currentPage);
      if (currentPage === 0 && !State.hasTypedBookIntro()) {
        window.setTimeout(typeIntroOnce, 420);
      }
    }
  }

  function closeBook() {
    if (modal) {
      modal.classList.add("is-hidden");
      modal.classList.remove("is-opening");
    }
    window.clearTimeout(introTimer);
  }

  function closeCandleRitual() {
    if (!ritualOverlay) return;
    ritualOverlay.classList.add("is-hidden");
    ritualOverlay.classList.remove("is-lit");
    document.body.classList.remove("is-candle-ritual-open");
    if (lightCandleBtn) lightCandleBtn.disabled = false;
    lightCandleBtn?.focus();
  }

  if (candleBtn) {
    candleBtn.addEventListener("click", openBook);
    candleBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBook();
      }
    });
  }

  // Connect floating scroll-follow candle
  initScrollCandle(openBook);

  if (closeBtn) closeBtn.addEventListener("click", closeBook);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeBook();
    });
  }

  ritualCloseBtn?.addEventListener("click", closeCandleRitual);
  ritualOverlay?.addEventListener("click", (event) => {
    if (event.target === ritualOverlay) closeCandleRitual();
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 0) displayPage(currentPage - 1, "backward");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < BOOK_PAGES.length - 1)
        displayPage(currentPage + 1, "forward");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (ritualOverlay && !ritualOverlay.classList.contains("is-hidden")) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCandleRitual();
      } else if (e.key === "Tab") {
        e.preventDefault();
        ritualCloseBtn?.focus();
      }
      return;
    }
    if (modal && !modal.classList.contains("is-hidden")) {
      if (e.key === "Escape") closeBook();
      if (e.key === "ArrowRight" && currentPage < BOOK_PAGES.length - 1) {
        displayPage(currentPage + 1, "forward");
      }
      if (e.key === "ArrowLeft" && currentPage > 0) {
        displayPage(currentPage - 1, "backward");
      }
    }
  });

  if (lightCandleBtn) {
    lightCandleBtn.addEventListener("click", () => {
      if (ritualOverlay && !ritualOverlay.classList.contains("is-hidden"))
        return;
      const candleCount = State.incrementCandleCount();
      lightCandleBtn.disabled = true;

      [bookCandleIcon, homeCandle].forEach((candle) => {
        if (!candle) return;
        candle.classList.remove("is-lighting");
        void candle.offsetWidth;
        candle.classList.add("is-lighting");
        window.setTimeout(() => candle.classList.remove("is-lighting"), 1100);
      });

      if (ritualCount) {
        ritualCount.textContent = `${new Intl.NumberFormat("fil-PH").format(candleCount)} kandilang sinindihan sa dambana.`;
      }
      if (ritualOverlay) {
        ritualOverlay.classList.remove("is-hidden", "is-lit");
        void ritualOverlay.offsetWidth;
        ritualOverlay.classList.add("is-lit");
        document.body.classList.add("is-candle-ritual-open");
        ritualCloseBtn?.focus();
      }
    });
  }
}

/* ==========================================================================
   6. KALASAG (SHIELD) CONTENT POPULATION
   ========================================================================== */
function initShield() {
  const guidelinesEl = document.getElementById("shieldGuidelinesList");
  const hotlinesEl = document.getElementById("shieldHotlinesGrid");
  const allyListEl = document.getElementById("shieldAllyList");

  // Guidelines
  if (guidelinesEl && SHIELD_DATA.guidelines) {
    guidelinesEl.innerHTML = "";
    SHIELD_DATA.guidelines.forEach((g, idx) => {
      const item = document.createElement("div");
      item.className = "guideline-item";
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
    hotlinesEl.innerHTML = "";
    SHIELD_DATA.hotlines.forEach((h) => {
      const card = document.createElement("a");
      card.className = "hotline-card";
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
    allyListEl.innerHTML = "";
    SHIELD_DATA.allyTips.forEach((tip, idx) => {
      const li = document.createElement("li");
      li.style.marginBottom = "var(--space-2)";
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
  const refList = document.getElementById("footerReferencesList");
  const refFilters = document.querySelectorAll(".ref-filter-pill");

  let activeRefFilter = "Lahat";

  const typeMap = {
    Lahat: "all",
    Teorya: "theory",
    Kasaysayan: "history",
    Batas: "law",
    Datos: "data",
    SOGIESC: "sogiesc",
  };

  const typeBadgeMap = {
    theory: { label: "Teorya", icon: "📖" },
    history: { label: "Kasaysayan", icon: "🏛️" },
    law: { label: "Batas", icon: "⚖️" },
    data: { label: "Datos", icon: "📊" },
    sogiesc: { label: "SOGIESC", icon: "🏳️‍🌈" },
    "philippine-gender": { label: "Kasarian sa PH", icon: "🇵🇭" },
  };

  function renderReferences() {
    if (!refList || !REFERENCES) return;
    refList.innerHTML = "";

    const targetType = typeMap[activeRefFilter] || "all";
    const filtered = REFERENCES.filter(
      (r) => targetType === "all" || r.type === targetType,
    );

    filtered.forEach((r) => {
      const entry = document.createElement("div");
      entry.className = "modern-ref-card";

      const badge = typeBadgeMap[r.type] || {
        label: r.type,
        icon: "&#x1F4DC;",
      };
      const yearStr = r.year ? " (" + r.year + ")" : "";
      const fullCitation =
        r.author + yearStr + ". " + r.title + ". " + r.source + ".";

      entry.innerHTML =
        '<div class="modern-ref-header">' +
        '<span class="modern-ref-type-badge">' +
        badge.icon +
        " " +
        escapeHTML(badge.label) +
        "</span>" +
        '<button type="button" class="modern-ref-copy-btn" aria-label="Kopyahin ang sitasyon">' +
        '<span aria-hidden="true">&#x1F4CB;</span>' +
        "</button>" +
        "</div>" +
        '<p class="modern-ref-biblio-line">' +
        '<strong class="modern-ref-author-name">' +
        escapeHTML(r.author) +
        "</strong>" +
        escapeHTML(yearStr) +
        ". " +
        '<em class="modern-ref-title-em">' +
        escapeHTML(r.title) +
        "</em>. " +
        '<span class="modern-ref-source">' +
        escapeHTML(r.source) +
        "</span>." +
        "</p>";

      entry
        .querySelector(".modern-ref-copy-btn")
        .addEventListener("click", async () => {
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(fullCitation);
              showToast("Nakopya ang sitasyon!", "success");
            } else {
              showToast("Sitasyon: " + fullCitation);
            }
          } catch {
            showToast("Nakopya ang sitasyon!", "success");
          }
        });

      refList.appendChild(entry);
    });
  }

  refFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      refFilters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeRefFilter = btn.getAttribute("data-filter") || "Lahat";
      renderReferences();
    });
  });

  renderReferences();
}

/* ==========================================================================
   9. GLOBAL DATA EXPORT & RESET
   ========================================================================== */
function initDataModals() {
  const exportBtn = document.getElementById("exportDataBtn");
  const resetBtn = document.getElementById("resetDataBtn");
  const resetConfirmModal = document.getElementById("resetConfirmModal");
  const confirmYes = document.getElementById("confirmResetYes");
  const confirmNo = document.getElementById("confirmResetNo");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = State.exportAllData();
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bena_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Na-download ang iyong backup JSON file! 📤", "success");
    });
  }

  if (resetBtn && resetConfirmModal) {
    resetBtn.addEventListener("click", () => {
      resetConfirmModal.classList.remove("is-hidden");
    });
  }

  if (confirmNo && resetConfirmModal) {
    confirmNo.addEventListener("click", () => {
      resetConfirmModal.classList.add("is-hidden");
    });
  }

  if (confirmYes && resetConfirmModal) {
    confirmYes.addEventListener("click", () => {
      State.clearAllData();
      resetConfirmModal.classList.add("is-hidden");
      window.location.reload();
    });
  }
}

/* ==========================================================================
   BOOTSTRAP
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initButtonMicroMotion();
  initTheme();
  initRouter(() => {
    setTimeout(initVineSpine, 50);
  });
  initFallingLeaves();
  initVineSpine();
  initYakapModal();
  initQuotes();
  initAchievements();
  initAdvocates();
  initBook();
  initShield();
  initFooter();
  initDataModals();
});
