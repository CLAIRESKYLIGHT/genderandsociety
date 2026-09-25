(() => {
  "use strict";

  const STORAGE_KEY = "bena_posts_v2";
  const YAKAP_SEEN_KEY = "bena_yakap_seen_v2";
  const SOUND_PREF_KEY = "bena_sound_pref_v2";
  const LIKES_KEY = "bena_likes_v2";

  /* ==========================================================================
     AUDIO SYNTHESIS (Gentle Kulintang / Bamboo chime via Web Audio API)
     Zero external audio files needed; works completely offline.
     ========================================================================== */
  let audioCtx = null;
  let soundEnabled = localStorage.getItem(SOUND_PREF_KEY) !== "off";

  function playGentleChime() {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === "suspended") audioCtx.resume();

      // Pentatonic warm chime chord (C5, G5, A5)
      const frequencies = [523.25, 783.99, 880.0];
      frequencies.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.12 + 1.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.12);
        osc.stop(audioCtx.currentTime + idx * 0.12 + 1.5);
      });
    } catch {
      // Graceful fallback if audio is blocked
    }
  }

  /* ==========================================================================
     DATA: PRIDE QUOTES (15+ Curated Empowering Quotes)
     ========================================================================== */
  const PRIDE_QUOTES = [
    "Ang Babaylan ay hindi nakatali sa iisang kasarian — ito ay banal na tawag ng paglilingkod.",
    "Bago tayo sakupin, tayo ay namuhay nang may pantay na dangal at walang pagkaalipin.",
    "Ang punto at wika ng iyong lalawigan ay hindi kahihiyan. Ito ang tibok ng iyong mga ninuno.",
    "Walang kasarian ang higit sa isa pa — ito ang katotohanang ibinabalik natin sa BENA.",
    "Ang kayumangging kulay ng iyong balat ay hinulma mula sa mayamang lupa ng kapuluan.",
    "Ang mga ninuno mo ay lumaban upang ikaw ay makatindig ngayon nang may buong pag-asa.",
    "Hindi ka nagsimula sa kahihiyan. Nagsimula ka sa kapayapaan at paggalang.",
    "Sa bawat Babaylan na pinarusahan ng kolonisasyon, may isang boses kang pinalalaya ngayon.",
    "Ang pag-ibig sa sariling kultura ay ang pinakamalakas na gamot laban sa sugat ng nakaraan.",
    "Ang pagiging Pilipino ay buo, maganda, at hindi kailangang baguhin para lamang tanggapin ng iba.",
    "Ang sining ng ating mga katutubo ay patunay na noon pa man, tayo ay mayaman sa diwa at karunungan.",
    "Ang katawan mo ay sagrado, anuman ang iyong anyo o kasarian. Karapat-dapat ka sa pagmamahal.",
    "Ipagmalaki mo ang iyong pinagmulan; ang iyong kasaysayan ay puno ng mga bayani at manggagamot.",
    "Ang pagkakaisa ay hindi nangangahulugang pare-pareho — ito ay pagtanggap sa bawat kulay at tinig.",
    "Sa BENA, ikaw ay ligtas. Ang iyong kwento ay may halaga at pakikinggan."
  ];

  /* ==========================================================================
     DATA: DANGAL NG LAHI (Filipino Cultural Heritage & Achievements)
     ========================================================================== */
  const DANGAL_ITEMS = [
    {
      id: "dangal1",
      category: "sayaw",
      badge: "Sayaw at Kilos",
      title: "Singkil: Ang Maharlikang Sayaw ng Katatagan",
      image: "assets/singkil_art.jpg",
      desc: "Isang tradisyonal na sayaw ng mga Maranao mula sa epikong Darangen. Ipinapakita ang biyaya, kagitingan, at pambihirang liksi sa pagitan ng nag-uumpugang kawayan habang may makukulay na payong at abaniko.",
      pride: "Patunay ng mataas na antas ng sining at panlipunang katayuan ng kababaihan sa pre-kolonyal na Mindanao."
    },
    {
      id: "dangal2",
      category: "babaylan",
      badge: "Babaylan at Bayani",
      title: "Ang Pamana ng mga Babaylan at Catalonan",
      image: "assets/babaylan_art.jpg",
      desc: "Bago pa man ang kolonyalismo, ang mga espirituwal na pinuno ng barangay ay ang mga Babaylan — kababaihan, at mga lalaking tinatawag na Asog o Bayoguin na may katangiang pambabae. Sila ay mga manggagamot, tagapamayapa, at tagapagtanggol ng kalikasan.",
      pride: "Ang ating orihinal na kultura ay walang diskriminasyon sa kasarian o sexual identity; lahat ay iginagalang ayon sa kanilang kabutihan."
    },
    {
      id: "dangal3",
      category: "musika",
      badge: "Musika at Tinig",
      title: "Kulintang: Ang Banal na Tunog ng mga Gong",
      image: null,
      desc: "Isang sinaunang instrumento ng walong maliliit na tansong gong na nakalatag sa inukit na kahoy. Tinutugtog sa Maguindanao, Maranao, Tausug, at Sama upang ipagdiwang ang kasal, ritwal, at kapayapaan.",
      pride: "Isang musikal na tradisyong hindi kailanman nabura ng pananakop ng mga Espanyol o Amerikano."
    },
    {
      id: "dangal4",
      category: "sayaw",
      badge: "Sayaw at Kilos",
      title: "Pangalay: Ang Sayaw ng mga Alon sa Sulu",
      image: null,
      desc: "Katutubong sayaw ng mga Tausug, Badjao, at Samal sa Kapuluan ng Sulu. Tanyag sa banayad na paggalaw ng mga kamay at 'janggay' (metal na kuko) na humahalintulad sa banayad na agos ng dagat.",
      pride: "Isa sa pinakamatatandang sayaw sa Asya na nagpapatuloy pa rin hanggang sa kasalukuyang henerasyon."
    },
    {
      id: "dangal5",
      category: "habi",
      badge: "Sining at Habi",
      title: "T'nalak at ang mga Dreamweavers ng T'boli",
      image: null,
      desc: "Banal na telang hinahabi mula sa abaca ng kababaihang T'boli sa Lawa ng Sebu. Ang mga disenyo ay hindi iginuguhit — ito ay ipinapakita ng espiritung Fu Dalu sa mga panaginip ng mga manghahabi tulad ng yumaong Lang Dulay.",
      pride: "Banal na sining kung saan ang panaginip at espirituwalidad ay nagiging nahahawakang tela ng pagkakakilanlan."
    },
    {
      id: "dangal6",
      category: "habi",
      badge: "Sining at Habi",
      title: "Apo Whang-Od: Ang Mambabatok ng Buscalan",
      image: null,
      desc: "Ang pinakamatandang tradisyonal na mambabatok (tattoo artist) sa Kalinga. Gumagamit ng tinik ng suha at uling upang iukit ang mga simbolo ng kagitingan at kagandahan ng mga katutubo.",
      pride: "Buhay na sagisag ng katatagan ng kulturang Cordillera laban sa banyagang asimilasyon."
    },
    {
      id: "dangal7",
      category: "musika",
      badge: "Musika at Tinig",
      title: "Kundiman at ang Makabayang Musika ng Pilipinas",
      image: null,
      desc: "Mula sa mga makabayang Kundiman na ginamit ng mga Katipunero sa lihim na paglaban, hanggang sa modernong OPM at pandaigdigang pag-angat ng P-Pop sa sariling wika.",
      pride: "Ang ating wika at himig ay may kapangyarihang magpagalaw ng puso sa buong daigdig."
    },
    {
      id: "dangal8",
      category: "babaylan",
      badge: "Babaylan at Bayani",
      title: "Gabriela Silang at Teresa Magbanua",
      image: null,
      desc: "Mga magigiting na kababaihang humawak ng espada at namuno sa mga hukbo upang ipagtanggol ang kalayaan ng Ilocos at Visayas laban sa mga kolonyalistang mananakop.",
      pride: "Pinatunayan nilang ang pamumuno sa digmaan at paglaya ay hindi eksklusibo sa kalalakihan."
    },
    {
      id: "dangal9",
      category: "tagumpay",
      badge: "Pandaigdigang Dangal",
      title: "Hidilyn Diaz at Carlos Yulo: Dangal ng Palakasan",
      image: null,
      desc: "Si Hidilyn Diaz ang nag-uwi ng kauna-unahang Olympic Gold medal para sa Pilipinas sa Tokyo 2020, sinundan ng makasaysayang dalawang gintong medalya ni Carlos Yulo sa Paris 2024 gymnastics.",
      pride: "Patunay na ang puso, disiplina, at determinasyon ng Pilipino ay kayang mangibabaw sa buong mundo."
    },
    {
      id: "dangal10",
      category: "habi",
      badge: "Sining at Habi",
      title: "Inabel ng Ilocos at Yakan Weaves ng Basilan",
      image: null,
      desc: "Mga tradisyonal na habing gawa sa kamay na gumagamit ng mga heometrikong disenyo. Bawat linya ay sumasagisag sa mga alon, kidlat, bundok, at espiritu ng kalikasan.",
      pride: "Ang tela ay hindi lamang kasuotan; ito ay aklat ng kasaysayan ng ating mga ninuno."
    }
  ];

  /* ==========================================================================
     SEED DATA: VIBRANT SAMPLE POSTS FOR TAHANAN FEED
     ========================================================================== */
  function seedPostsIfEmpty() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    const now = Date.now();
    const seed = [
      {
        id: "seed1",
        title: "Bakit Ako Nahihiya Noong Bata Ako — at Paano Ako Nagbalik-loob",
        author: "Trisha Mae",
        pronouns: "siya/her",
        tags: ["#Kababaihan", "#WikaAtKultura"],
        anonymous: false,
        category: "Artikulo",
        isSensitive: false,
        content: "Noong lumipat kami sa Maynila galing Bicol, labis kong ikinahiya ang punto ko sa Tagalog. Akala ko mababa o 'baduy' ang magsalita ng sariling wika. Ngunit habang lumalaki ako at natututo tungkol sa pre-colonial history natin, napagtanto kong ang aking wika ay hindi kapintasan — ito ay pamana ng aking lola at ng aking pinanggalingan. Sa BENA, ipinapangako kong hindi ko na ikakahiya ang aking tinig.",
        image: null,
        likes: 18,
        timestamp: now - 1000 * 60 * 60 * 5,
        comments: [
          { id: "c1", author: "Mikael R.", text: "Ramdam na ramdam kita. Ganyan din ako sa Bisaya noon. Ngayon, taas-noo na!", timestamp: now - 1000 * 60 * 60 * 3 },
          { id: "c2", author: "Kapwa", text: "Salamat sa tapang mong ibahagi ito. Tunay na nakapagpapalakas ng loob.", timestamp: now - 1000 * 60 * 60 * 1 }
        ]
      },
      {
        id: "seed2",
        title: "Likhang Sining: Ang Liwanag ng Ating mga Babaylan",
        author: "Alon ng Sining",
        pronouns: "she/they",
        tags: ["#BabaylanAtAsog", "#Kababaihan"],
        anonymous: false,
        category: "Sining",
        isSensitive: false,
        content: "Ito ay alay ko sa ating mga ninunong Babaylan na namuno sa ating mga barangay bago pumasok ang dayuhang patriarkiya. Ang kanilang kapangyarihan ay nagmula sa pagmamahal, panggagamot, at pakikipag-ugnayan sa kalikasan. Hindi natin dapat kalimutan ang kanilang kadakilaan.",
        image: "assets/babaylan_art.jpg",
        likes: 34,
        timestamp: now - 1000 * 60 * 60 * 22,
        comments: [
          { id: "c3", author: "Joana P.", text: "Napakaganda ng mga kulay at ng diwa sa likod ng sining na ito. Nakakataba ng puso!", timestamp: now - 1000 * 60 * 60 * 18 }
        ]
      },
      {
        id: "seed3",
        title: "Para sa Aking mga Kapatid na LGBTQ+: Kayo ay mga Banal na Asog",
        author: "Ronel S.",
        pronouns: "he/they (asog)",
        tags: ["#LGBTQIA+", "#BabaylanAtAsog", "#PantayNaKarapatan"],
        anonymous: false,
        category: "Artikulo",
        isSensitive: false,
        content: "Bago pa man tayo turuan ng kolonyalismo na ang pagiging queer o trans ay kasalanan, ang ating mga ninuno ay may mga 'Asog' at 'Bayoguin' — mga taong may damdaming pambabae o lalaki na hindi sumusunod sa simpleng kahon. Sila ay iginagalang bilang espirituwal na lider, hindi kinukutya. Ang inyong kasarian ay biyaya, hindi kahihiyan.",
        image: null,
        likes: 42,
        timestamp: now - 1000 * 60 * 60 * 48,
        comments: [
          { id: "c4", author: "Lihim na Tagapakinig", text: "Umiyak ako nang mabasa ko ito. Matagal ko nang kailangan marinig ito mula sa kapwa ko Pilipino.", timestamp: now - 1000 * 60 * 60 * 36 }
        ]
      },
      {
        id: "seed4",
        title: "Karanasan: Pagtindig Laban sa Mapanghusgang Salita sa Silid-aralan",
        author: "Minda T.",
        pronouns: "siya/kanya",
        tags: ["#LabanSaPatriarkiya", "#PantayNaKarapatan"],
        anonymous: true,
        category: "Karanasan",
        isSensitive: true,
        content: "Nais kong ibahagi ang naranasan ko noong hayskul kung saan sinabihan ako na 'pambahay lang ang babae' at huwag nang mangarap maging lider ng student council. Masakit noon, ngunit nang matutunan ko ang kasaysayan ng ating mga ninuno kung saan pantay ang kababaihan sa datu, nahanap ko ang tapang kong lumaban. Huwag nating hahayaang manahimik ang ating kapwa dahil lamang sa kasarian.",
        image: "assets/singkil_art.jpg",
        likes: 29,
        timestamp: now - 1000 * 60 * 60 * 72,
        comments: []
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }

  /* ==========================================================================
     STORAGE HELPERS
     ========================================================================== */
  function getPosts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function savePosts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (err) {
      console.error("Storage save error:", err);
      showToast("Hindi ma-save ang post. Maaaring puno na ang browser storage.");
    }
  }

  function getUserLikes() {
    try {
      return JSON.parse(localStorage.getItem(LIKES_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveUserLikes(likes) {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  }

  /* ==========================================================================
     UTILITIES
     ========================================================================== */
  function escapeHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function uid() {
    return "p_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  function timeAgo(ts) {
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 60) return "ngayon lang";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ang nakalipas`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ang nakalipas`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay === 1) return "kahapon";
    if (diffDay < 30) return `${diffDay} araw ang nakalipas`;
    return new Date(ts).toLocaleDateString("fil-PH", { month: "short", day: "numeric" });
  }

  function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>🌻</span><span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  /* ==========================================================================
     YAKAP WELCOME MODAL CONTROLLER
     ========================================================================== */
  function initYakap() {
    const overlay = document.getElementById("yakapOverlay");
    const closeBtn = document.getElementById("yakapClose");
    const reopenBtn = document.getElementById("reopenYakapBtn");
    const footerHugBtn = document.getElementById("footerHugBtn");
    const soundToggle = document.getElementById("yakapMuteSound");
    const soundText = document.getElementById("soundStatusText");

    function openModal() {
      overlay.classList.remove("is-hidden");
      playGentleChime();
    }

    function closeModal() {
      overlay.classList.add("is-hidden");
      localStorage.setItem(YAKAP_SEEN_KEY, "1");
    }

    // Check if first time visitor
    if (!localStorage.getItem(YAKAP_SEEN_KEY)) {
      openModal();
    } else {
      overlay.classList.add("is-hidden");
    }

    closeBtn.addEventListener("click", closeModal);
    if (reopenBtn) reopenBtn.addEventListener("click", openModal);
    if (footerHugBtn) footerHugBtn.addEventListener("click", openModal);

    // Escape key closes modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.classList.contains("is-hidden")) {
        closeModal();
      }
    });

    // Sound toggle in modal
    if (soundToggle) {
      soundText.textContent = soundEnabled ? "🎵 Ambiance: Naka-on" : "🔇 Ambiance: Naka-off";
      soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem(SOUND_PREF_KEY, soundEnabled ? "on" : "off");
        soundText.textContent = soundEnabled ? "🎵 Ambiance: Naka-on" : "🔇 Ambiance: Naka-off";
        if (soundEnabled) playGentleChime();
      });
    }
  }

  /* ==========================================================================
     GENDER SENSITIVITY & SOGIESC GUIDE CONTROLLER
     ========================================================================== */
  function initGenderGuide() {
    const overlay = document.getElementById("genderGuideOverlay");
    const openBtn = document.getElementById("openGenderGuideBtn");
    const footerBtn = document.getElementById("footerGuideBtn");
    const closeBtn = document.getElementById("closeGenderGuideBtn");
    const acceptBtn = document.getElementById("acceptGenderGuideBtn");

    if (!overlay) return;

    function openGuide() {
      overlay.classList.remove("is-hidden");
      playGentleChime();
    }

    function closeGuide() {
      overlay.classList.add("is-hidden");
    }

    if (openBtn) openBtn.addEventListener("click", openGuide);
    if (footerBtn) footerBtn.addEventListener("click", openGuide);
    if (closeBtn) closeBtn.addEventListener("click", closeGuide);
    if (acceptBtn) acceptBtn.addEventListener("click", closeGuide);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.classList.contains("is-hidden")) {
        closeGuide();
      }
    });
  }

  /* ==========================================================================
     DAILY FILIPINO PRIDE REMINDER
     ========================================================================== */
  function initPrideBanner() {
    const quoteEl = document.getElementById("prideQuote");
    const nextBtn = document.getElementById("newQuoteBtn");
    const copyBtn = document.getElementById("copyQuoteBtn");
    const copyText = document.getElementById("copyQuoteText");
    let lastIdx = -1;

    function renderQuote() {
      quoteEl.classList.add("is-transitioning");
      setTimeout(() => {
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * PRIDE_QUOTES.length);
        } while (nextIdx === lastIdx && PRIDE_QUOTES.length > 1);
        lastIdx = nextIdx;
        quoteEl.textContent = `“${PRIDE_QUOTES[nextIdx]}”`;
        quoteEl.classList.remove("is-transitioning");
      }, 180);
    }

    renderQuote();
    nextBtn.addEventListener("click", () => {
      renderQuote();
      playGentleChime();
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const textToCopy = `${quoteEl.textContent} — BENA (Yakap sa Kaluluwang Pilipino)`;
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyText.textContent = "Nakopya na!";
          showToast("Nakopya na ang paalala sa clipboard!");
          setTimeout(() => {
            copyText.textContent = "Kopyahin";
          }, 2500);
        } catch {
          showToast("Paumanhin, hindi awtomatikong nakopya.");
        }
      });
    }
  }

  /* ==========================================================================
     NAVIGATION TABS ROUTER
     ========================================================================== */
  function initNavigation() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const pages = document.querySelectorAll(".page");

    function setActiveTab(targetId) {
      tabButtons.forEach(btn => {
        const isMatch = btn.dataset.tab === targetId;
        btn.classList.toggle("is-active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });

      pages.forEach(page => {
        const isMatch = page.id === targetId;
        page.classList.toggle("is-active", isMatch);
        page.hidden = !isMatch;
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        setActiveTab(target);
        if (history.pushState) {
          history.pushState(null, null, "#" + target);
        }
      });
    });

    // Handle hash on load or popstate
    function checkHash() {
      const hash = window.location.hash.replace("#", "");
      if (["tahanan", "dangal", "dambana", "magpost", "manifesto"].includes(hash)) {
        setActiveTab(hash);
      }
    }

    window.addEventListener("popstate", checkHash);
    checkHash();

    // CTA button in Dangal to go to Mag-post
    const dangalPostCta = document.getElementById("dangalPostCta");
    if (dangalPostCta) {
      dangalPostCta.addEventListener("click", () => {
        const magpostTab = document.querySelector('.tab-btn[data-tab="magpost"]');
        if (magpostTab) magpostTab.click();
      });
    }
  }

  /* ==========================================================================
     DAMBANA NG DIWA (INTERACTIVE GENDER EQUALITY CANDLE & AFFIRMATION WALL)
     ========================================================================== */
  const DAMBANA_CANDLES_KEY = "bena_dambana_candles_v1";
  const DAMBANA_STATS_KEY = "bena_dambana_stats_v1";
  const BLESSED_CANDLES_KEY = "bena_blessed_candles_v1";

  const DEFAULT_DAMBANA_CANDLES = [
    {
      id: "c_vow_1",
      author: "Lola Rosa (Bikol)",
      tag: "🌸 Alay sa Kababaihan",
      vow: "Alay sa aking mga apo: Nawa'y mamuhay kayo sa isang bansang hindi ninyo kailangang ikahiya ang pagiging babae. Ang inyong lakas ay buo, sagrado, at may dangal.",
      blessings: 58,
      timestamp: Date.now() - 1000 * 60 * 60 * 4
    },
    {
      id: "c_vow_2",
      author: "Rey / Tala",
      tag: "🌈 Asog at LGBTQIA+ Diwa",
      vow: "Bilang isang queer Pilipino, dito ko naramdaman na hindi pala banyaga ang aking pagkatao. Tayo ay mga anak ng mga Asog at Babaylan. Mabuhay ang lahat ng kasarian!",
      blessings: 74,
      timestamp: Date.now() - 1000 * 60 * 60 * 14
    },
    {
      id: "c_vow_3",
      author: "Mark ng Iloilo",
      tag: "🛡️ Laban sa Patriarkiya",
      vow: "Ipinapangako kong bilang lalaki, ititigil ko ang kultura ng 'boys will be boys.' Titindig ako laban sa sexist jokes at pambabastos sa kapwa.",
      blessings: 49,
      timestamp: Date.now() - 1000 * 60 * 60 * 26
    },
    {
      id: "c_vow_4",
      author: "Kapwa Estudyante",
      tag: "🌻 Dangal ng Pagkatao",
      vow: "Ipinagmamalaki ko ang aking punto, ang aking kulay, at ang aking pagiging Pilipino. Walang kasarian ang mas mataas sa isa pa.",
      blessings: 63,
      timestamp: Date.now() - 1000 * 60 * 60 * 38
    }
  ];

  function getDambanaStats() {
    try {
      return JSON.parse(localStorage.getItem(DAMBANA_STATS_KEY)) || { candles: 1248, sampaguita: 612 };
    } catch {
      return { candles: 1248, sampaguita: 612 };
    }
  }

  function saveDambanaStats(stats) {
    localStorage.setItem(DAMBANA_STATS_KEY, JSON.stringify(stats));
  }

  function getDambanaCandles() {
    try {
      const stored = localStorage.getItem(DAMBANA_CANDLES_KEY);
      if (!stored) {
        localStorage.setItem(DAMBANA_CANDLES_KEY, JSON.stringify(DEFAULT_DAMBANA_CANDLES));
        return DEFAULT_DAMBANA_CANDLES;
      }
      return JSON.parse(stored) || [];
    } catch {
      return DEFAULT_DAMBANA_CANDLES;
    }
  }

  function saveDambanaCandles(candles) {
    localStorage.setItem(DAMBANA_CANDLES_KEY, JSON.stringify(candles));
  }

  function getBlessedCandles() {
    try {
      return JSON.parse(localStorage.getItem(BLESSED_CANDLES_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveBlessedCandles(blessed) {
    localStorage.setItem(BLESSED_CANDLES_KEY, JSON.stringify(blessed));
  }

  function spawnFallingPetals() {
    const emojis = ["🌸", "💮", "🌺", "✨"];
    for (let i = 0; i < 14; i++) {
      const petal = document.createElement("div");
      petal.className = "falling-petal";
      petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      petal.style.left = `${Math.random() * 92 + 4}%`;
      petal.style.top = `${Math.random() * 20 + 10}%`;
      petal.style.animationDelay = `${Math.random() * 0.4}s`;
      petal.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 3200);
    }
  }

  function initDambana() {
    const candleCountEl = document.getElementById("candleCount");
    const sampaguitaCountEl = document.getElementById("sampaguitaCount");
    const btnLightCandle = document.getElementById("btnLightCandle");
    const btnOfferSampaguita = document.getElementById("btnOfferSampaguita");
    const panataForm = document.getElementById("panataForm");
    const quickVowButtons = document.querySelectorAll(".quick-panata-btn");
    const grid = document.getElementById("dambanaCandlesGrid");
    const filterButtons = document.querySelectorAll(".dambana-wall-filter");

    if (!grid) return;

    let currentWallFilter = "all";

    // Load initial stats
    const stats = getDambanaStats();
    if (candleCountEl) candleCountEl.textContent = stats.candles.toLocaleString("fil-PH");
    if (sampaguitaCountEl) sampaguitaCountEl.textContent = stats.sampaguita.toLocaleString("fil-PH");

    // Action 1: Light a candle
    if (btnLightCandle) {
      btnLightCandle.addEventListener("click", () => {
        const curStats = getDambanaStats();
        curStats.candles += 1;
        saveDambanaStats(curStats);
        if (candleCountEl) {
          candleCountEl.textContent = curStats.candles.toLocaleString("fil-PH");
          candleCountEl.classList.add("is-bumped");
          setTimeout(() => candleCountEl.classList.remove("is-bumped"), 300);
        }
        playGentleChime();
        showToast("Nagsindi ka ng kandila para sa pagkakapantay-pantay! 🕯️ Salamat sa iyong liwanag.");
      });
    }

    // Action 2: Offer Sampaguita
    if (btnOfferSampaguita) {
      btnOfferSampaguita.addEventListener("click", () => {
        const curStats = getDambanaStats();
        curStats.sampaguita += 1;
        saveDambanaStats(curStats);
        if (sampaguitaCountEl) {
          sampaguitaCountEl.textContent = curStats.sampaguita.toLocaleString("fil-PH");
          sampaguitaCountEl.classList.add("is-bumped");
          setTimeout(() => sampaguitaCountEl.classList.remove("is-bumped"), 300);
        }
        spawnFallingPetals();
        playGentleChime();
        showToast("Nag-alay ka ng Sampaguita para sa kapwa. 🌸 Mabuhay ang iyong kabutihan.");
      });
    }

    // Quick Vow buttons
    quickVowButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const vow = btn.dataset.vow;
        const tag = btn.dataset.tag;
        const textArea = document.getElementById("panataText");
        const selectTag = document.getElementById("panataTag");
        if (textArea) textArea.value = vow;
        if (selectTag && tag) selectTag.value = tag;
        showToast("Naipili na ang panata! Maaari mo itong dagdagan bago ilayag.");
      });
    });

    // Form submit
    if (panataForm) {
      panataForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const authorInput = document.getElementById("panataAuthor");
        const tagSelect = document.getElementById("panataTag");
        const textArea = document.getElementById("panataText");

        const text = textArea.value.trim();
        if (!text) return;

        const author = authorInput.value.trim() || "Kapwa Pilipino";
        const tag = tagSelect.value;

        const candles = getDambanaCandles();
        candles.unshift({
          id: "vow_" + Date.now().toString(36),
          author,
          tag,
          vow: text,
          blessings: 1,
          timestamp: Date.now()
        });
        saveDambanaCandles(candles);

        // Also bump candle count
        const curStats = getDambanaStats();
        curStats.candles += 1;
        saveDambanaStats(curStats);
        if (candleCountEl) candleCountEl.textContent = curStats.candles.toLocaleString("fil-PH");

        panataForm.reset();
        renderCandles();
        spawnFallingPetals();
        playGentleChime();
        showToast("Nailayag na ang iyong panata sa Dambana! 🕯️ Salamat sa iyong pagtindig.");
      });
    }

    // Wall Filters
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentWallFilter = btn.dataset.wallFilter;
        renderCandles();
      });
    });

    // Render Candles Grid
    function renderCandles() {
      const candles = getDambanaCandles();
      const blessedMap = getBlessedCandles();

      let filtered = candles;
      if (currentWallFilter !== "all") {
        filtered = candles.filter(c => c.tag.toLowerCase().includes(currentWallFilter.toLowerCase()));
      }

      grid.innerHTML = "";

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; background:var(--card-bg); border:1px dashed var(--paper-border); border-radius:var(--radius-md); padding:2.5rem; text-align:center;">
            <p style="font-size:2.2rem; margin:0 0 0.5rem;">🕯️</p>
            <p style="color:var(--text-muted); font-size:0.95rem; margin:0;">Wala pang panata sa kategoryang ito. Maging unang mag-alay!</p>
          </div>
        `;
        return;
      }

      filtered.forEach(candle => {
        const card = document.createElement("article");
        card.className = "candle-card";
        const hasBlessed = !!blessedMap[candle.id];

        card.innerHTML = `
          <div class="candle-card-header">
            <span class="candle-flame-icon" aria-hidden="true">🕯️</span>
            <span class="candle-tag">${escapeHTML(candle.tag)}</span>
          </div>
          <p class="candle-vow-text">“${escapeHTML(candle.vow)}”</p>
          <div class="candle-card-footer">
            <span class="candle-author">— ${escapeHTML(candle.author)} • <small>${timeAgo(candle.timestamp)}</small></span>
            <button type="button" class="btn-candle-pray ${hasBlessed ? 'is-blessed' : ''}" data-id="${candle.id}">
              <span aria-hidden="true">🙏</span>
              <span class="pray-count">${candle.blessings || 0}</span>
            </button>
          </div>
        `;

        const prayBtn = card.querySelector(".btn-candle-pray");
        prayBtn.addEventListener("click", () => {
          const allCandles = getDambanaCandles();
          const target = allCandles.find(c => c.id === candle.id);
          if (!target) return;

          const currentBlessed = getBlessedCandles();
          if (currentBlessed[candle.id]) {
            target.blessings = Math.max(0, (target.blessings || 1) - 1);
            delete currentBlessed[candle.id];
            prayBtn.classList.remove("is-blessed");
          } else {
            target.blessings = (target.blessings || 0) + 1;
            currentBlessed[candle.id] = true;
            prayBtn.classList.add("is-blessed");
            playGentleChime();
          }

          card.querySelector(".pray-count").textContent = target.blessings;
          saveBlessedCandles(currentBlessed);
          saveDambanaCandles(allCandles);
        });

        grid.appendChild(card);
      });
    }

    renderCandles();
  }

  /* ==========================================================================
     DANGAL NG LAHI SHOWCASE (NEW FEATURE: MUSIC, DANCE, ARTS, ACHIEVEMENTS)
     ========================================================================== */
  function initDangal() {
    const grid = document.getElementById("dangalGrid");
    const filterButtons = document.querySelectorAll(".dangal-filter-btn");
    let currentFilter = "all";

    function renderDangal() {
      grid.innerHTML = "";
      const filtered = DANGAL_ITEMS.filter(item => {
        if (currentFilter === "all") return true;
        return item.category === currentFilter;
      });

      filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "dangal-card";
        
        const imageMarkup = item.image
          ? `<div class="dangal-card-image-wrap">
               <img src="${item.image}" alt="${escapeHTML(item.title)}" class="dangal-card-image" loading="lazy">
               <span class="dangal-badge-overlay">${escapeHTML(item.badge)}</span>
             </div>`
          : `<div class="dangal-card-image-wrap" style="background: radial-gradient(circle at 50% 50%, #2A1F4E, #130E26); display:flex; align-items:center; justify-content:center;">
               <span style="font-size:3rem;">🇵🇭</span>
               <span class="dangal-badge-overlay">${escapeHTML(item.badge)}</span>
             </div>`;

        card.innerHTML = `
          ${imageMarkup}
          <div class="dangal-card-body">
            <h3 class="dangal-title">${escapeHTML(item.title)}</h3>
            <p class="dangal-desc">${escapeHTML(item.desc)}</p>
            <div class="dangal-pride-box">
              <span class="dangal-pride-label">Bakit Ipinagmamalaki</span>
              <span>${escapeHTML(item.pride)}</span>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentFilter = btn.dataset.dangal;
        renderDangal();
      });
    });

    renderDangal();
  }

  /* ==========================================================================
     PUBLIC FEED CONTROLLER (TAHANAN)
     ========================================================================== */
  let currentFeedFilter = "all";
  let feedSearchQuery = "";

  function initFeed() {
    const searchInput = document.getElementById("feedSearchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    const filterPills = document.querySelectorAll(".filter-pill");

    // Search event
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        feedSearchQuery = searchInput.value.trim().toLowerCase();
        if (clearBtn) clearBtn.hidden = !feedSearchQuery;
        renderFeed();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        feedSearchQuery = "";
        clearBtn.hidden = true;
        renderFeed();
        searchInput.focus();
      });
    }

    // Filter pills
    filterPills.forEach(pill => {
      pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        currentFeedFilter = pill.dataset.filter;
        renderFeed();
      });
    });

    renderFeed();
  }

  function renderFeed() {
    const list = document.getElementById("feedList");
    const template = document.getElementById("postCardTemplate");
    const allPosts = getPosts();
    const countAllEl = document.getElementById("countAll");
    if (countAllEl) countAllEl.textContent = allPosts.length;

    // Filter and search
    let filtered = allPosts.slice().sort((a, b) => b.timestamp - a.timestamp);

    if (currentFeedFilter !== "all") {
      filtered = filtered.filter(p => p.category === currentFeedFilter);
    }

    if (feedSearchQuery) {
      filtered = filtered.filter(p => {
        return (
          p.title.toLowerCase().includes(feedSearchQuery) ||
          p.content.toLowerCase().includes(feedSearchQuery) ||
          p.author.toLowerCase().includes(feedSearchQuery)
        );
      });
    }

    list.innerHTML = "";

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="background:var(--card-bg); border:1px dashed var(--paper-border); border-radius:var(--radius-md); padding:3rem 1.5rem; text-align:center;">
          <p style="font-size:2.5rem; margin:0 0 0.5rem;">🌻</p>
          <h3 style="font-family:var(--font-display); font-size:1.35rem; color:var(--ink); margin:0 0 0.5rem;">Walang natagpuang kwento</h3>
          <p style="color:var(--text-muted); font-size:0.95rem; max-width:420px; margin:0 auto 1.2rem;">
            ${feedSearchQuery ? "Subukan ang ibang salita sa paghahanap." : "Maging unang magbahagi ng iyong tinig at sining sa Tahanan!"}
          </p>
          <button class="btn btn--gold btn--small" onclick="document.querySelector('.tab-btn[data-tab=\\'magpost\\']').click()">Mag-post Ngayon</button>
        </div>
      `;
      return;
    }

    const userLikes = getUserLikes();

    filtered.forEach(post => {
      const node = template.content.cloneNode(true);
      const article = node.querySelector(".post-card");
      article.dataset.id = post.id;

      // Badge styling
      const badge = node.querySelector(".category-badge");
      badge.textContent = post.category;
      if (post.category === "Artikulo") badge.classList.add("badge--artikulo");
      else if (post.category === "Sining") badge.classList.add("badge--sining");
      else if (post.category === "Karanasan") badge.classList.add("badge--karanasan");

      node.querySelector(".post-time").textContent = timeAgo(post.timestamp);
      node.querySelector(".post-title").textContent = post.title;

      // Author representation & Pronouns
      const authorEl = node.querySelector(".post-author");
      const pronounBadge = node.querySelector(".pronoun-badge");
      if (post.anonymous) {
        authorEl.textContent = "Naka-post nang Lihim (Anonymous)";
        authorEl.classList.add("is-anon");
        if (pronounBadge) pronounBadge.hidden = true;
      } else {
        authorEl.textContent = `Ibinahagi ni ${post.author}`;
        if (pronounBadge && post.pronouns) {
          pronounBadge.textContent = `(${post.pronouns})`;
          pronounBadge.hidden = false;
        }
      }

      // Gender & Society Topic Tags
      const tagsRow = node.querySelector(".post-tags-row");
      if (tagsRow && post.tags && post.tags.length > 0) {
        tagsRow.innerHTML = post.tags.map(t => `<span class="tag-pill">${escapeHTML(t)}</span>`).join("");
        tagsRow.hidden = false;
      }

      // Sensitive Content Warning Veil
      const sensitiveVeil = node.querySelector(".sensitive-content-veil");
      const contentContainer = node.querySelector(".post-content-container");
      if (post.isSensitive && sensitiveVeil && contentContainer) {
        sensitiveVeil.hidden = false;
        contentContainer.hidden = true;
        const revealBtn = node.querySelector(".btn-reveal-sensitive");
        if (revealBtn) {
          revealBtn.addEventListener("click", () => {
            sensitiveVeil.hidden = true;
            contentContainer.hidden = false;
          });
        }
      } else if (contentContainer) {
        if (sensitiveVeil) sensitiveVeil.hidden = true;
        contentContainer.hidden = false;
      }

      // Image
      const imageFrame = node.querySelector(".post-image-frame");
      const img = node.querySelector(".post-image");
      if (post.image) {
        img.src = post.image;
        img.alt = post.title;
        imageFrame.hidden = false;
      }

      // Content
      node.querySelector(".post-content").textContent = post.content;

      // Share button
      const shareBtn = node.querySelector(".btn-share-post");
      shareBtn.addEventListener("click", () => {
        const text = `"${post.title}" - BENA: Yakap sa Kaluluwang Pilipino`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          showToast("Nakopya na ang pamagat ng kwento!");
        }
      });

      // Likes / Reaction Button
      const reactionBtn = node.querySelector(".btn-reaction");
      const reactionCount = node.querySelector(".reaction-count");
      const hasLiked = !!userLikes[post.id];
      reactionBtn.classList.toggle("is-reacted", hasLiked);
      reactionCount.textContent = post.likes || 0;

      reactionBtn.addEventListener("click", () => {
        const posts = getPosts();
        const targetPost = posts.find(p => p.id === post.id);
        if (!targetPost) return;

        const currentLikes = getUserLikes();
        if (currentLikes[post.id]) {
          targetPost.likes = Math.max(0, (targetPost.likes || 1) - 1);
          delete currentLikes[post.id];
          reactionBtn.classList.remove("is-reacted");
        } else {
          targetPost.likes = (targetPost.likes || 0) + 1;
          currentLikes[post.id] = true;
          reactionBtn.classList.add("is-reacted");
          playGentleChime();
        }

        reactionCount.textContent = targetPost.likes;
        saveUserLikes(currentLikes);
        savePosts(posts);
      });

      // Usapan (Comments) Toggle & Count
      const usapanToggle = node.querySelector(".usapan-toggle");
      const usapanSection = node.querySelector(".usapan-section");
      const commentCount = node.querySelector(".comment-count");
      commentCount.textContent = (post.comments || []).length;

      usapanToggle.addEventListener("click", () => {
        const isOpen = !usapanSection.hidden;
        usapanSection.hidden = isOpen;
        usapanToggle.setAttribute("aria-expanded", String(!isOpen));
      });

      // Render existing comments
      const commentList = node.querySelector(".comment-list");
      renderPostComments(commentList, post.comments || []);

      // Add comment form
      const commentForm = node.querySelector(".comment-form");
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const authorInput = commentForm.querySelector(".comment-author-input");
        const textInput = commentForm.querySelector(".comment-input");
        const authorVal = authorInput.value.trim() || "Kapwa Pilipino";
        const textVal = textInput.value.trim();

        if (!textVal) return;

        addCommentToPost(post.id, authorVal, textVal);
        textInput.value = "";
        authorInput.value = "";
      });

      list.appendChild(node);
    });
  }

  function renderPostComments(listEl, comments) {
    listEl.innerHTML = "";
    if (comments.length === 0) {
      const empty = document.createElement("p");
      empty.className = "comment-empty";
      empty.textContent = "Wala pang komento. Maging una sa pagpapahayag ng iyong suporta! 🌻";
      listEl.appendChild(empty);
      return;
    }

    comments
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp)
      .forEach(c => {
        const li = document.createElement("li");
        li.className = "comment-item";
        li.innerHTML = `
          <div class="comment-header">
            <span class="comment-author">${escapeHTML(c.author)}</span>
            <span class="comment-time">${timeAgo(c.timestamp)}</span>
          </div>
          <p class="comment-body">${escapeHTML(c.text)}</p>
        `;
        listEl.appendChild(li);
      });
  }

  function addCommentToPost(postId, author, text) {
    const posts = getPosts();
    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;

    if (!targetPost.comments) targetPost.comments = [];
    targetPost.comments.push({
      id: uid(),
      author,
      text,
      timestamp: Date.now()
    });

    savePosts(posts);
    renderFeed();
    showToast("Naipahayag na ang iyong komento! Salamat sa pakikibahagi.");
    playGentleChime();
  }

  /* ==========================================================================
     MAG-POST (SUBMISSION FORM WITH CANVAS IMAGE COMPRESSION)
     Compresses uploaded images so localStorage never exceeds quota limits!
     ========================================================================== */
  function initPostForm() {
    const form = document.getElementById("postForm");
    const categoryRadios = form.querySelectorAll('input[name="postCategory"]');
    const imageInput = document.getElementById("postImage");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");
    const removeImageBtn = document.getElementById("removeImageBtn");
    const contentLabel = document.getElementById("contentLabel");
    const dropzone = document.getElementById("uploadDropzone");

    let compressedImageBase64 = null;

    // Category changes
    function updateCategoryUI() {
      const selected = form.querySelector('input[name="postCategory"]:checked').value;
      if (selected === "Sining") {
        contentLabel.innerHTML = 'Ilarawan ang iyong sining at mensahe <span class="required">*</span>';
      } else if (selected === "Karanasan") {
        contentLabel.innerHTML = 'Ibahagi ang iyong sariling kwento o patotoo <span class="required">*</span>';
      } else {
        contentLabel.innerHTML = 'Isulat ang iyong artikulo o sanaysay <span class="required">*</span>';
      }
    }

    categoryRadios.forEach(r => r.addEventListener("change", updateCategoryUI));
    updateCategoryUI();

    // Canvas Compression function
    function processAndCompressImage(file) {
      if (!file || !file.type.startsWith("image/")) {
        showToast("Mangyaring pumili ng wastong larawan (JPG, PNG, o WebP).");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Scale down image to max 900px wide/tall to save storage
          const maxDim = 900;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG at 0.80 quality (typically 50KB-120KB)
          compressedImageBase64 = canvas.toDataURL("image/jpeg", 0.80);
          imagePreview.src = compressedImageBase64;
          imagePreviewContainer.hidden = false;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) processAndCompressImage(file);
    });

    // Drag and drop support
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.background = "rgba(247, 201, 72, 0.25)";
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.style.background = "";
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.background = "";
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processAndCompressImage(e.dataTransfer.files[0]);
      }
    });

    removeImageBtn.addEventListener("click", () => {
      compressedImageBase64 = null;
      imageInput.value = "";
      imagePreviewContainer.hidden = true;
      imagePreview.src = "";
    });

    // Form Submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("postTitle").value.trim();
      const author = document.getElementById("postAuthor").value.trim();
      const category = form.querySelector('input[name="postCategory"]:checked').value;
      const content = document.getElementById("postContent").value.trim();
      const anonymous = document.getElementById("postAnonymous").checked;
      
      // Gender sensitivity fields
      const selectedPronoun = form.querySelector('input[name="postPronouns"]:checked')?.value || "siya/kanya";
      const selectedTags = Array.from(form.querySelectorAll('input[name="postTags"]:checked')).map(el => el.value);
      const isSensitive = document.getElementById("postSensitiveWarning")?.checked || false;

      if (!title || !author || !content) {
        showToast("Pakipunan ang lahat ng kinakailangang bahagi.");
        return;
      }

      const posts = getPosts();
      const newPost = {
        id: uid(),
        title,
        author,
        pronouns: selectedPronoun,
        tags: selectedTags,
        isSensitive,
        anonymous,
        category,
        content,
        image: compressedImageBase64,
        likes: 1,
        timestamp: Date.now(),
        comments: []
      };

      posts.unshift(newPost);
      savePosts(posts);

      // Auto-like the author's own post
      const userLikes = getUserLikes();
      userLikes[newPost.id] = true;
      saveUserLikes(userLikes);

      // Reset form
      form.reset();
      compressedImageBase64 = null;
      imagePreviewContainer.hidden = true;
      imagePreview.src = "";
      updateCategoryUI();

      showToast("Maraming salamat! Naibahagi na ang iyong kwento sa Tahanan.");
      playGentleChime();

      // Navigate smoothly to Tahanan feed
      const tahananTab = document.querySelector('.tab-btn[data-tab="tahanan"]');
      if (tahananTab) tahananTab.click();
      renderFeed();
    });
  }

  /* ==========================================================================
     FOOTER ACTIONS & RESET
     ========================================================================== */
  function initFooter() {
    const resetBtn = document.getElementById("footerResetBtn");
    if (!resetBtn) return;

    resetBtn.addEventListener("click", () => {
      if (confirm("Nais mo bang ibalik ang BENA sa orihinal na default data? Maaalis ang mga pansariling post na ginawa sa browser na ito.")) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(LIKES_KEY);
        localStorage.removeItem(YAKAP_SEEN_KEY);
        seedPostsIfEmpty();
        renderFeed();
        showToast("Matagumpay na naibalik ang default data.");
      }
    });
  }

  /* ==========================================================================
     APP INITIALIZATION
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    seedPostsIfEmpty();
    initYakap();
    initGenderGuide();
    initPrideBanner();
    initNavigation();
    initDangal();
    initDambana();
    initPostForm();
    initFeed();
    initFooter();
  });
})();
