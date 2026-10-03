/**
 * BENA — Under the Forest Canopy • Gender & Society Sanctuary
 * Main application logic, interactive book ritual, achievements, living altar, and safety refuge.
 */

(() => {
  "use strict";

  // Storage keys
  const STORAGE_KEY_VOWS = "bena_sacred_vows_v3";
  const STORAGE_KEY_CANDLES = "bena_candle_count_v3";
  const STORAGE_KEY_THEME = "bena_canopy_theme_v3";
  const STORAGE_KEY_YAKAP = "bena_yakap_dismissed_v3";

  /* ==========================================================================
     1. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, duration = 3600) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `<span class="toast-leaf">🍃</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }
  window.showToast = showToast;

  /* ==========================================================================
     2. NAVIGATION & TAB SWITCHING (2 TABS: TAHANAN & KALASAG)
     ========================================================================== */
  function initNavigation() {
    const tabButtons = document.querySelectorAll(".tab-btn[data-tab]");
    const pages = document.querySelectorAll(".page");

    function switchTab(tabId) {
      tabButtons.forEach(btn => {
        const isActive = btn.getAttribute("data-tab") === tabId;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      pages.forEach(page => {
        const isTarget = page.id === tabId;
        page.classList.toggle("is-active", isTarget);
        if (isTarget) {
          page.removeAttribute("hidden");
        } else {
          page.setAttribute("hidden", "");
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });

      if (window.BenaThread && typeof window.BenaThread.refresh === "function") {
        setTimeout(window.BenaThread.refresh, 80);
      }
    }

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        if (targetTab) switchTab(targetTab);
      });
    });

    // Make switchTab globally accessible
    window.switchBenaTab = switchTab;
  }

  /* ==========================================================================
     3. DAILY FOREST WISDOM QUOTES ENGINE (js/quotes.js)
     ========================================================================== */
  function initQuotesEngine() {
    const quoteEl = document.getElementById("prideQuote");
    const quoteEnEl = document.getElementById("prideQuoteEn");
    const newQuoteBtn = document.getElementById("newQuoteBtn");
    const copyQuoteBtn = document.getElementById("copyQuoteBtn");
    const copyText = document.getElementById("copyQuoteText");

    const quotesList = window.QUOTES || [
      { tl: "Ang iyong boses ay bahagi ng kasaysayan.", en: "Your voice is part of history." },
      { tl: "Walang kasarian ang mas mataas sa iba.", en: "No gender is greater than another." },
      { tl: "Ang pagiging totoo sa sarili ay katapangan.", en: "Being true to yourself is courage." }
    ];

    let currentIndex = Math.floor(Math.random() * quotesList.length);

    function displayQuote(index) {
      if (!quoteEl) return;
      const q = quotesList[index];
      quoteEl.style.opacity = "0";
      if (quoteEnEl) quoteEnEl.style.opacity = "0";

      setTimeout(() => {
        quoteEl.textContent = `“${q.tl}”`;
        if (quoteEnEl) quoteEnEl.textContent = q.en ? `— “${q.en}”` : "";
        quoteEl.style.opacity = "1";
        if (quoteEnEl) quoteEnEl.style.opacity = "0.85";
      }, 200);
    }

    displayQuote(currentIndex);

    if (newQuoteBtn) {
      newQuoteBtn.addEventListener("click", () => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * quotesList.length);
        } while (nextIndex === currentIndex && quotesList.length > 1);
        currentIndex = nextIndex;
        displayQuote(currentIndex);
      });
    }

    if (copyQuoteBtn) {
      copyQuoteBtn.addEventListener("click", async () => {
        const currentQ = quotesList[currentIndex];
        const textToCopy = `“${currentQ.tl}”\n(${currentQ.en})\n— BENA • Gender & Society Sanctuary`;
        try {
          await navigator.clipboard.writeText(textToCopy);
          if (copyText) copyText.textContent = "Copied! ✨";
          showToast("Na-kopyang matagumpay ang paalala! 🍃");
          setTimeout(() => {
            if (copyText) copyText.textContent = "Copy";
          }, 2400);
        } catch {
          showToast("Hindi ma-access ang clipboard.");
        }
      });
    }
  }

  /* ==========================================================================
     4. ACHIEVEMENTS GALLERY: TALENT HAS NO GENDER (js/achievements.js)
     ========================================================================== */
  function initAchievementsGallery() {
    const grid = document.getElementById("achievementsGrid");
    const filterButtons = document.querySelectorAll(".galing-filter-btn");
    const achievements = window.ACHIEVEMENTS || [];

    if (!grid) return;

    let activeFilter = "all";

    function renderGallery() {
      grid.innerHTML = "";

      const filtered = achievements.filter(item => {
        if (activeFilter === "all") return true;
        if (item.category && item.category.toLowerCase() === activeFilter.toLowerCase()) return true;
        if (item.tags && item.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase())) return true;
        return false;
      });

      if (!filtered.length) {
        grid.innerHTML = `<div class="empty-state-card"><p>Walang natagpuang tala sa kategoryang ito.</p></div>`;
        return;
      }

      filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "galing-card";
        card.setAttribute("tabindex", "0");

        const tagBadges = (item.tags || []).map(t => `<span class="galing-tag-badge">${t}</span>`).join(" ");

        card.innerHTML = `
          <div class="galing-card-header">
            <span class="galing-category-badge">${item.category || "Pamana"}</span>
            <div class="galing-tags-wrap">${tagBadges}</div>
          </div>
          <h3 class="galing-card-name">${item.name}</h3>
          <p class="galing-card-desc">${item.description}</p>
          <div class="galing-why-box">
            <span class="galing-why-title">🌱 Bakit Mahalaga sa Kasarian:</span>
            <p class="galing-why-text">${item.why}</p>
          </div>
        `;

        grid.appendChild(card);
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeFilter = btn.getAttribute("data-galing") || "all";
        renderGallery();
      });
    });

    renderGallery();
  }

  /* ==========================================================================
     5. INTERACTIVE SMALL BOOK OF REMINDERS (js/book.js)
     ========================================================================== */
  function initBookOfReminders() {
    const modal = document.getElementById("bookModalOverlay");
    const closeBtn = document.getElementById("closeBookBtn");
    const prevBtn = document.getElementById("bookPrevBtn");
    const nextBtn = document.getElementById("bookNextBtn");
    const textTl = document.getElementById("bookTextTl");
    const textEn = document.getElementById("bookTextEn");
    const indicator = document.getElementById("bookPageIndicator");
    const finalActionWrap = document.getElementById("bookFinalActionWrap");
    const offerVowBtn = document.getElementById("bookOfferVowBtn");
    const heroBookBtn = document.getElementById("heroOpenBookBtn");
    const wallBookBtn = document.getElementById("btnOpenBookFromWall");
    const footerBookBtn = document.getElementById("footerBookBtn");

    const pages = window.BOOK_PAGES || [
      { tl: "Maligayang pagdating.\nIkaw ay naririto.\nSapat na iyon.", en: "Welcome.\nYou are here.\nThat is enough." }
    ];

    let currentPage = 0;

    function renderPage(idx) {
      if (!textTl || !textEn || !pages[idx]) return;
      const page = pages[idx];

      textTl.style.opacity = "0";
      textEn.style.opacity = "0";

      setTimeout(() => {
        textTl.textContent = page.tl;
        textEn.textContent = page.en;
        textTl.style.opacity = "1";
        textEn.style.opacity = "1";
      }, 150);

      if (indicator) {
        indicator.textContent = `Pahina ${idx + 1} ng ${pages.length}`;
      }

      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === pages.length - 1;

      if (finalActionWrap) {
        if (idx === pages.length - 1) {
          finalActionWrap.classList.remove("is-hidden");
        } else {
          finalActionWrap.classList.add("is-hidden");
        }
      }
    }

    function openBook(startPage = 0) {
      currentPage = startPage;
      renderPage(currentPage);
      if (modal) {
        modal.classList.remove("is-hidden");
        document.body.style.overflow = "hidden";
      }
    }

    function closeBook() {
      if (modal) {
        modal.classList.add("is-hidden");
        document.body.style.overflow = "";
      }
    }

    window.openBookModal = openBook;
    window.closeBookModal = closeBook;

    if (closeBtn) closeBtn.addEventListener("click", closeBook);
    if (modal) {
      modal.addEventListener("click", e => {
        if (e.target === modal) closeBook();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          renderPage(currentPage);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentPage < pages.length - 1) {
          currentPage++;
          renderPage(currentPage);
        }
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", e => {
      if (modal && !modal.classList.contains("is-hidden")) {
        if (e.key === "Escape") closeBook();
        if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
          currentPage++;
          renderPage(currentPage);
        }
        if (e.key === "ArrowLeft" && currentPage > 0) {
          currentPage--;
          renderPage(currentPage);
        }
      }
    });

    // Final page action: Proceed to Wall of Truth & light candle
    if (offerVowBtn) {
      offerVowBtn.addEventListener("click", () => {
        closeBook();
        incrementCandleCount();

        // Switch to Tahanan if not already there
        if (window.switchBenaTab) window.switchBenaTab("tahanan");

        setTimeout(() => {
          const vowSection = document.getElementById("panataComposerCard") || document.getElementById("wallOfTruthSection");
          if (vowSection) {
            vowSection.scrollIntoView({ behavior: "smooth", block: "center" });
            const textarea = document.getElementById("panataText");
            if (textarea) setTimeout(() => textarea.focus(), 600);
          }
        }, 200);

        showToast("Nakarating ka sa Pader ng Katotohanan. Mag-alay ng iyong panata 🕯️");
      });
    }

    if (heroBookBtn) heroBookBtn.addEventListener("click", () => openBook(0));
    if (wallBookBtn) wallBookBtn.addEventListener("click", () => openBook(0));
    if (footerBookBtn) footerBookBtn.addEventListener("click", () => openBook(0));
  }

  /* ==========================================================================
     6. WALL OF TRUTH: VOWS & CANDLE ALTAR (js/vow.js)
     ========================================================================== */
  let candleCount = parseInt(localStorage.getItem(STORAGE_KEY_CANDLES), 10) || 1248;

  function incrementCandleCount() {
    candleCount++;
    localStorage.setItem(STORAGE_KEY_CANDLES, candleCount.toString());
    const countEl = document.getElementById("candleCount");
    if (countEl) countEl.textContent = candleCount.toLocaleString();
  }

  function initWallOfTruth() {
    const vowsGrid = document.getElementById("vowsGrid");
    const countEl = document.getElementById("candleCount");
    const vowCountEl = document.getElementById("vowCount");
    const form = document.getElementById("panataForm");
    const pillsContainer = document.getElementById("quickPanataPills");
    const directLightBtn = document.getElementById("btnLightCandleDirect");

    if (countEl) countEl.textContent = candleCount.toLocaleString();

    // Load seeded and local vows
    const seeded = window.SEEDED_VOWS || [
      { author: "Belen", text: "Nangangako akong igalang ang bawat kasarian.", seeded: true },
      { author: "Bio", text: "Nangangako akong hindi ako magiging dahilan ng kahihiyan ng iba.", seeded: true },
      { author: "Gibaga", text: "Nangangako akong makinig bago magsalita.", seeded: true },
      { author: "Soliman", text: "Nangangako akong igalang ang pangalan at pronouns ng bawat tao.", seeded: true },
      { author: "Monticalbo", text: "Nangangako akong panatilihing buhay ang alaala ng mga babaylan.", seeded: true },
      { author: "BENA", text: "Nangangako akong mahalin ang aking sarili, sa lahat ng anyo nito.", seeded: true }
    ];

    let localVows = [];
    try {
      localVows = JSON.parse(localStorage.getItem(STORAGE_KEY_VOWS)) || [];
    } catch {
      localVows = [];
    }

    const allVows = [...localVows, ...seeded];

    function renderVows() {
      if (!vowsGrid) return;
      vowsGrid.innerHTML = "";

      if (vowCountEl) vowCountEl.textContent = allVows.length.toString();

      allVows.forEach(v => {
        const card = document.createElement("div");
        card.className = "dambana-candle-card";
        card.innerHTML = `
          <div class="candle-glow-icon" aria-hidden="true">🕯️</div>
          <p class="candle-vow-text">“${v.text}”</p>
          <div class="candle-vow-author">
            <span>— ${v.author || "Kapwa Manlalakbay"}</span>
            ${v.tag ? `<span class="vow-category-pill">${v.tag}</span>` : ""}
          </div>
        `;
        vowsGrid.appendChild(card);
      });
    }

    // Quick Vow Inspirations
    if (pillsContainer) {
      pillsContainer.innerHTML = "";
      seeded.slice(0, 4).forEach(s => {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "quick-panata-btn";
        pill.textContent = `🌸 ${s.author}: ${s.text.slice(0, 32)}...`;
        pill.addEventListener("click", () => {
          const textarea = document.getElementById("panataText");
          if (textarea) {
            textarea.value = s.text;
            textarea.focus();
          }
        });
        pillsContainer.appendChild(pill);
      });
    }

    // Form submission
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const authorInput = document.getElementById("panataAuthor");
        const tagInput = document.getElementById("panataTag");
        const textInput = document.getElementById("panataText");

        const text = textInput ? textInput.value.trim() : "";
        if (!text) return;

        const newVow = {
          author: (authorInput && authorInput.value.trim()) || "Kapwa Manlalakbay",
          tag: tagInput ? tagInput.value : "🌸 Panata sa Pagkakapantay",
          text: text,
          date: new Date().toISOString()
        };

        allVows.unshift(newVow);
        localVows.unshift(newVow);
        localStorage.setItem(STORAGE_KEY_VOWS, JSON.stringify(localVows));

        incrementCandleCount();
        renderVows();

        form.reset();
        showToast("Naialay ang iyong sagradong panata sa altar ng katotohanan! 🕯️✨");
      });
    }

    // Direct candle lighting
    if (directLightBtn) {
      directLightBtn.addEventListener("click", () => {
        incrementCandleCount();
        showToast("Nagsindi ka ng isang kandila ng pagkakapantay-pantay! 🕯️");
      });
    }

    renderVows();
  }

  /* ==========================================================================
     7. RELICS & INTERACTIVE DECODER
     ========================================================================== */
  function initRelicsAndDecoder() {
    // Relics expansion
    const relicCards = document.querySelectorAll(".relic-card");
    relicCards.forEach(card => {
      card.addEventListener("click", () => {
        const expanded = card.getAttribute("aria-expanded") === "true";
        card.setAttribute("aria-expanded", !expanded);
        const content = card.querySelector(".relic-expanded-content");
        if (content) content.hidden = expanded;
      });
    });

    // Language decoder
    const presetBtns = document.querySelectorAll(".decoder-preset-btn");
    const customInput = document.getElementById("customDecoderInput");
    const translateBtn = document.getElementById("btnTranslateDecoder");
    const resultFil = document.getElementById("decoderFilText");
    const resultInsight = document.getElementById("decoderInsightText");

    function setDecoderResult(filText, insightText) {
      if (resultFil) resultFil.textContent = `“${filText}”`;
      if (resultInsight) resultInsight.textContent = insightText;
    }

    presetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        presetBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const fil = btn.getAttribute("data-lang-fil");
        const insight = btn.getAttribute("data-insight");
        setDecoderResult(fil, insight);
      });
    });

    if (translateBtn && customInput) {
      translateBtn.addEventListener("click", () => {
        const val = customInput.value.trim();
        if (!val) return;

        // Smart gender neutralization demonstration in Filipino
        let translated = val
          .replace(/\b(he|she)\b/gi, "siya")
          .replace(/\b(his|her|hers)\b/gi, "kanya")
          .replace(/\b(him)\b/gi, "sa kanya");

        setDecoderResult(
          translated,
          "Sa katutubong diwa, ang lahat ng tao ay tinatawag sa iisang marangal na salitang 'Siya' at 'Kanya' — walang sinuman ang ikinukulong o ibinubukod."
        );
      });
    }
  }

  /* ==========================================================================
     8. SCHOLARLY REFERENCES MODAL (js/references.js)
     ========================================================================== */
  function initReferencesModal() {
    const modal = document.getElementById("referencesModalOverlay");
    const openBtn = document.getElementById("footerReferencesBtn");
    const closeBtn = document.getElementById("closeReferencesModal");
    const grid = document.getElementById("referencesListGrid");
    const filterBtns = document.querySelectorAll(".sanggunian-filter-btn");

    const references = window.REFERENCES || [];

    let activeFilter = "all";

    function renderReferences() {
      if (!grid) return;
      grid.innerHTML = "";

      const filtered = references.filter(r => {
        if (activeFilter === "all") return true;
        return r.type === activeFilter;
      });

      filtered.forEach(r => {
        const card = document.createElement("div");
        card.className = "reference-entry-card";
        card.style.cssText = "background: rgba(139,105,20,0.08); padding: 0.9rem 1.1rem; border-radius: 10px; border-left: 3px solid var(--gold-bright);";

        const yearStr = r.year ? ` (${r.year})` : "";
        card.innerHTML = `
          <p style="margin:0 0 0.25rem 0; font-size:0.95rem; line-height:1.4;">
            <strong>${r.author}</strong>${yearStr}. <em>${r.title}</em>. ${r.source}.
          </p>
          <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; opacity:0.7; font-weight:600;">🏷️ ${r.type}</span>
        `;
        grid.appendChild(card);
      });
    }

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => {
        modal.classList.remove("is-hidden");
        renderReferences();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.add("is-hidden"));
    }

    if (modal) {
      modal.addEventListener("click", e => {
        if (e.target === modal) modal.classList.add("is-hidden");
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeFilter = btn.getAttribute("data-refcat") || "all";
        renderReferences();
      });
    });
  }

  /* ==========================================================================
     9. CREDITS & PASASALAMAT MODAL (js/credits.js)
     ========================================================================== */
  function initCreditsModal() {
    const modal = document.getElementById("creditsModalOverlay");
    const openBtn = document.getElementById("footerCreditsBtn");
    const closeBtn = document.getElementById("closeCreditsModal");
    const body = document.getElementById("creditsModalBody");

    const credits = window.CREDITS || {
      team: [
        { name: "Belen", role: "Researcher & Content Lead" },
        { name: "Bio", role: "Design & UX Architecture" },
        { name: "Gibaga", role: "Heritage & Historical Research" },
        { name: "Soliman", role: "Sociology & Legal Analysis" },
        { name: "Monticalbo", role: "Community Advocacy & SOGIESC Specialist" }
      ],
      course: "Gender and Society",
      acknowledgement: "Kinikilala namin ang mga katutubong mamamayan ng Pilipinas, ang mga babaylan, at ang lahat ng nagpapatuloy ng kanilang alaala. Ang proyektong ito ay para sa kanila."
    };

    function populateCredits() {
      if (!body) return;
      const teamList = (credits.team || []).map(m => `
        <div style="background: rgba(139,105,20,0.08); padding: 0.8rem 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
          <strong style="color: var(--gold-bright); font-size: 1.05rem;">${m.name}</strong>
          <span style="display:block; font-size:0.85rem; opacity:0.8;">${m.role}</span>
        </div>
      `).join("");

      body.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="margin: 0 0 0.4rem 0;">Mga May-akda at Tagapagtaguyod</h4>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            ${teamList}
          </div>
        </div>
        <div style="border-top: 1px solid rgba(139,105,20,0.2); padding-top: 1rem; margin-top: 1rem;">
          <p style="font-size: 0.9rem; font-style: italic; line-height: 1.5; opacity: 0.9;">
            ${credits.acknowledgement}
          </p>
        </div>
      `;
    }

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => {
        populateCredits();
        modal.classList.remove("is-hidden");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.add("is-hidden"));
    }

    if (modal) {
      modal.addEventListener("click", e => {
        if (e.target === modal) modal.classList.add("is-hidden");
      });
    }
  }

  /* ==========================================================================
     10. YAKAP WELCOME MODAL & GENDER GUIDE
     ========================================================================== */
  function initModals() {
    const yakapOverlay = document.getElementById("yakapOverlay");
    const yakapClose = document.getElementById("yakapClose");
    const reopenYakapBtn = document.getElementById("reopenYakapBtn");
    const footerHugBtn = document.getElementById("footerHugBtn");

    const guideOverlay = document.getElementById("genderGuideOverlay");
    const openGuideBtn = document.getElementById("openGenderGuideBtn");
    const closeGuideBtn = document.getElementById("closeGenderGuideBtn");
    const acceptGuideBtn = document.getElementById("acceptGenderGuideBtn");
    const footerGuideBtn = document.getElementById("footerGuideBtn");

    // Check if seen before
    const seen = localStorage.getItem(STORAGE_KEY_YAKAP);
    if (yakapOverlay) {
      if (!seen) {
        yakapOverlay.classList.remove("is-hidden");
      } else {
        yakapOverlay.classList.add("is-hidden");
      }
    }

    if (yakapClose && yakapOverlay) {
      yakapClose.addEventListener("click", () => {
        yakapOverlay.classList.add("is-hidden");
        localStorage.setItem(STORAGE_KEY_YAKAP, "true");
        showToast("Maligayang pagdating sa BENA 🌻");
      });
    }

    if (reopenYakapBtn && yakapOverlay) {
      reopenYakapBtn.addEventListener("click", () => {
        yakapOverlay.classList.remove("is-hidden");
      });
    }

    if (footerHugBtn && yakapOverlay) {
      footerHugBtn.addEventListener("click", () => {
        yakapOverlay.classList.remove("is-hidden");
      });
    }

    // Gender guide
    function openGuide() {
      if (guideOverlay) guideOverlay.classList.remove("is-hidden");
    }
    function closeGuide() {
      if (guideOverlay) guideOverlay.classList.add("is-hidden");
    }

    if (openGuideBtn) openGuideBtn.addEventListener("click", openGuide);
    if (closeGuideBtn) closeGuideBtn.addEventListener("click", closeGuide);
    if (acceptGuideBtn) acceptGuideBtn.addEventListener("click", () => {
      closeGuide();
      showToast("Salamat sa iyong paggalang at bukas na kalooban 🌈");
    });
    if (footerGuideBtn) footerGuideBtn.addEventListener("click", openGuide);
  }

  /* ==========================================================================
     11. THEME TOGGLE (GLADE / DUSK)
     ========================================================================== */
  function initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");
    const themeLabel = document.getElementById("themeLabel");

    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeUI(savedTheme);

    function updateThemeUI(theme) {
      if (theme === "dark") {
        if (themeIcon) themeIcon.textContent = "☀️";
        if (themeLabel) themeLabel.textContent = "Glade";
      } else {
        if (themeIcon) themeIcon.textContent = "🌙";
        if (themeLabel) themeLabel.textContent = "Dusk";
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(STORAGE_KEY_THEME, next);
        updateThemeUI(next);
      });
    }
  }

  /* ==========================================================================
     12. KALASAG CONFIDENTIAL REPORT FORM
     ========================================================================== */
  function initKalasagReport() {
    const form = document.getElementById("kalasagReportForm");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        showToast("Matagumpay at ligtas na naipadala ang iyong ulat. Makakaasa ka sa proteksyon at paggalang. 🛡️");
        form.reset();
      });
    }
  }

  /* ==========================================================================
     INITIALIZATION ON DOM READY
     ========================================================================== */
  function init() {
    initNavigation();
    initQuotesEngine();
    initAchievementsGallery();
    initBookOfReminders();
    initWallOfTruth();
    initRelicsAndDecoder();
    initReferencesModal();
    initCreditsModal();
    initModals();
    initThemeToggle();
    initKalasagReport();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
