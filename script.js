(() => {
  "use strict";

  const STORAGE_KEY = "bena_posts_v2";
  const YAKAP_SEEN_KEY = "bena_yakap_seen_v2";
  const SOUND_PREF_KEY = "bena_sound_pref_v2";
  const LIKES_KEY = "bena_likes_v2";

  /* ==========================================================================
     API LAYER — Backend-first with localStorage fallback
     When server.js is running at localhost:3000, all posts/panata/dambana
     data is saved to data/bena_db.json and shared across ALL users/devices.
     When opened as a plain file (no server), falls back to localStorage.
     ========================================================================== */
  const API_BASE = (() => {
    // Auto-detect: if the page is served by our Node server, use API
    const { protocol, hostname, port } = window.location;
    if (protocol === "file:") return null; // opened as local file, no backend
    // When served via Node (port 3000) or deployed, use same origin
    return `${protocol}//${hostname}${port ? ":"+port : ""}/api`;
  })();

  let _serverAvailable = null; // null = unknown, true/false after first check

  async function checkServerAvailable() {
    if (API_BASE === null) return (_serverAvailable = false);
    if (_serverAvailable !== null) return _serverAvailable;
    try {
      const r = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
      _serverAvailable = r.ok;
    } catch {
      _serverAvailable = false;
    }
    return _serverAvailable;
  }

  /* ── Posts API ── */
  async function apiGetPosts() {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/posts`);
      if (!r.ok) return null;
      return await r.json();
    } catch { return null; }
  }

  async function apiCreatePost(data) {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!r.ok) return null;
      return await r.json();
    } catch { return null; }
  }

  async function apiLikePost(id, action) {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/posts/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      if (!r.ok) return null;
      return await r.json();
    } catch { return null; }
  }

  async function apiAddComment(postId, data) {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!r.ok) return null;
      return await r.json();
    } catch { return null; }
  }

  async function apiDeletePost(id) {
    if (!(await checkServerAvailable())) return false;
    try {
      const r = await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
      return r.ok;
    } catch { return false; }
  }

  /* ── Panata API ── */
  async function apiGetPanata() {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/panata`);
      return r.ok ? await r.json() : null;
    } catch { return null; }
  }

  async function apiCreatePanata(data) {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/panata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      return r.ok ? await r.json() : null;
    } catch { return null; }
  }

  async function apiBlessPanata(id) {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/panata/${id}/bless`, { method: "POST" });
      return r.ok ? await r.json() : null;
    } catch { return null; }
  }

  /* ── Dambana API ── */
  async function apiGetDambana() {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/dambana`);
      return r.ok ? await r.json() : null;
    } catch { return null; }
  }

  async function apiLightCandle() {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/dambana/candle`, { method: "POST" });
      return r.ok ? await r.json() : null;
    } catch { return null; }
  }

  async function apiOfferSampaguita() {
    if (!(await checkServerAvailable())) return null;
    try {
      const r = await fetch(`${API_BASE}/dambana/sampaguita`, { method: "POST" });
      return r.ok ? await r.json() : null;
    } catch { return null; }
  }

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
     1. HABLON SCROLL THREAD CONTROLLER
     A thin 2px vertical gold thread runs down the left edge of the viewport.
     Fills via scaleY transform. Mobile: horizontal 2px on top edge via scaleX.
     Respects prefers-reduced-motion (freezes at full scale).
     ========================================================================== */
  function initHablonThread() {
    const fill = document.getElementById("hablonFill");
    if (!fill) return;

    let ticking = false;

    function update() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        fill.style.transform = "scale(1)";
        ticking = false;
        return;
      }

      const docEl = document.documentElement;
      const scrollMax = docEl.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        fill.style.transform = `scaleX(${progress})`;
      } else {
        fill.style.transform = `scaleY(${progress})`;
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener("resize", () => {
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ==========================================================================
     DARK MODE / THEME CONTROLLER ("Araw at Gabi")
     ========================================================================== */
  const THEME_KEY = "bena_theme_v1";

  function initThemeToggle() {
    const themeBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");
    const themeLabel = document.getElementById("themeLabel");

    function getPreferredTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeIcon) themeIcon.textContent = "☀️";
        if (themeLabel) themeLabel.textContent = "Araw";
        if (themeBtn) themeBtn.title = "Lumipat sa Maliwanag na Tema (Araw)";
      } else {
        document.documentElement.removeAttribute("data-theme");
        if (themeIcon) themeIcon.textContent = "🌙";
        if (themeLabel) themeLabel.textContent = "Gabi";
        if (themeBtn) themeBtn.title = "Lumipat sa Madilim na Tema (Gabi ng mga Ninuno)";
      }
    }

    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const nextTheme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
        playGentleChime();
        showToast(nextTheme === "dark" ? "Nasa temang Gabi ng mga Ninuno ka na 🌙" : "Nasa temang Liwanag ng Araw ka na ☀️");
      });
    }

    // Listen for OS color scheme changes if user hasn't explicitly set preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  /* ==========================================================================
     NAVIGATION TABS ROUTER & 3. NAV TAB WOVEN INDICATOR
     Active tab underline is a woven thread that slides between tabs using
     transform: translateX(), NEVER animating width. 320ms, ease-out-soft.
     ========================================================================== */
  function initNavigation() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const pages = document.querySelectorAll(".page");
    const wovenIndicator = document.getElementById("wovenIndicator");
    const scrollContainer = document.querySelector(".tabs-scroll-container");

    const ALL_TABS = [
      "tahanan", "aralin", "dangal", "galing",
      "dambana", "kalasag", "sanggunian", "magpost", "manifesto"
    ];

    function updateWovenIndicator(activeTabBtn) {
      if (!wovenIndicator || !activeTabBtn || !scrollContainer) return;

      // Indicator has a fixed width (60px), slide to center horizontally under active tab
      const tabLeft = activeTabBtn.offsetLeft;
      const tabWidth = activeTabBtn.offsetWidth;
      const targetX = tabLeft + (tabWidth - 60) / 2;

      wovenIndicator.style.transform = `translateX(${Math.round(targetX)}px)`;

      // Smoothly bring tab into view inside horizontally scrolling nav if overflowing
      const containerScrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;

      if (tabLeft < containerScrollLeft) {
        scrollContainer.scrollTo({ left: tabLeft - 16, behavior: "smooth" });
      } else if (tabLeft + tabWidth > containerScrollLeft + containerWidth) {
        scrollContainer.scrollTo({ left: tabLeft + tabWidth - containerWidth + 16, behavior: "smooth" });
      }
    }

    function setActiveTab(targetId) {
      let activeBtn = null;

      tabButtons.forEach(btn => {
        const isMatch = btn.dataset.tab === targetId;
        btn.classList.toggle("is-active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
        if (isMatch) activeBtn = btn;
      });

      pages.forEach(page => {
        const isMatch = page.id === targetId;
        page.classList.toggle("is-active", isMatch);
        page.hidden = !isMatch;
      });

      if (activeBtn) {
        updateWovenIndicator(activeBtn);
      }

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
      if (ALL_TABS.includes(hash)) {
        setActiveTab(hash);
      } else {
        const currentActive = document.querySelector(".tab-btn.is-active");
        if (currentActive) updateWovenIndicator(currentActive);
      }
    }

    window.addEventListener("popstate", checkHash);
    window.addEventListener("resize", () => {
      const currentActive = document.querySelector(".tab-btn.is-active");
      if (currentActive) updateWovenIndicator(currentActive);
    }, { passive: true });

    // Initial positioning
    setTimeout(() => {
      checkHash();
      const currentActive = document.querySelector(".tab-btn.is-active");
      if (currentActive) updateWovenIndicator(currentActive);
    }, 50);

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

  async function initDambana() {
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

    // Load initial stats — try API first
    const apiStats = await apiGetDambana();
    const stats = apiStats || getDambanaStats();
    if (!apiStats) saveDambanaStats(stats); // sync to localStorage
    if (candleCountEl) candleCountEl.textContent = stats.candles.toLocaleString("fil-PH");
    if (sampaguitaCountEl) sampaguitaCountEl.textContent = stats.sampaguita.toLocaleString("fil-PH");

    // Action 1: Light a candle
    if (btnLightCandle) {
      btnLightCandle.addEventListener("click", async () => {
        // Try API first
        const apiResult = await apiLightCandle();
        if (apiResult) {
          if (candleCountEl) candleCountEl.textContent = apiResult.candles.toLocaleString("fil-PH");
          saveDambanaStats(apiResult);
        } else {
          const curStats = getDambanaStats();
          curStats.candles += 1;
          saveDambanaStats(curStats);
          if (candleCountEl) candleCountEl.textContent = curStats.candles.toLocaleString("fil-PH");
        }
        if (candleCountEl) {
          candleCountEl.classList.add("is-bumped");
          setTimeout(() => candleCountEl.classList.remove("is-bumped"), 300);
        }
        playGentleChime();
        showToast("Nagsindi ka ng kandila para sa pagkakapantay-pantay! 🕯️ Salamat sa iyong liwanag.");
      });
    }

    // Action 2: Offer Sampaguita
    if (btnOfferSampaguita) {
      btnOfferSampaguita.addEventListener("click", async () => {
        const apiResult = await apiOfferSampaguita();
        if (apiResult) {
          if (sampaguitaCountEl) sampaguitaCountEl.textContent = apiResult.sampaguita.toLocaleString("fil-PH");
          saveDambanaStats(apiResult);
        } else {
          const curStats = getDambanaStats();
          curStats.sampaguita += 1;
          saveDambanaStats(curStats);
          if (sampaguitaCountEl) sampaguitaCountEl.textContent = curStats.sampaguita.toLocaleString("fil-PH");
        }
        if (sampaguitaCountEl) {
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
     9. POST SUCCESS & COMMENT PARTICLE BURST HELPER (MOTION INVENTORY #9)
     12 small gold dots drift upward and fade over 600ms, then canvas is removed.
     Capped at 1 concurrent burst. Skipped if prefers-reduced-motion.
     ========================================================================== */
  let _activeBurstCanvas = null;
  let _activeBurstRaf = null;

  function triggerGoldParticleBurst(originX, originY) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cap at 1 concurrent burst
    if (_activeBurstCanvas) {
      if (_activeBurstRaf) cancelAnimationFrame(_activeBurstRaf);
      _activeBurstCanvas.remove();
      _activeBurstCanvas = null;
    }

    const canvas = document.createElement("canvas");
    canvas.className = "particle-burst-canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    _activeBurstCanvas = canvas;

    const ctx = canvas.getContext("2d");
    const colors = ["#F7C948", "#FFD875", "#E5B643", "#FFF4D4", "#C59828"];
    const particles = [];
    const count = 12;

    const startX = originX ?? (window.innerWidth / 2);
    const startY = originY ?? (window.innerHeight / 2);

    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5; // Upward spray
      const speed = Math.random() * 3.5 + 2.2;
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }

    const startTime = performance.now();
    const duration = 600;

    function render(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // Soft gravity
        p.alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (progress < 1) {
        _activeBurstRaf = requestAnimationFrame(render);
      } else {
        if (_activeBurstCanvas === canvas) {
          canvas.remove();
          _activeBurstCanvas = null;
          _activeBurstRaf = null;
        }
      }
    }

    _activeBurstRaf = requestAnimationFrame(render);
  }

  /* ==========================================================================
     8. BUTTON MICRO-MOTION HELPER (MOTION INVENTORY #8)
     Expanding gold ring from click point (300ms, then removes itself).
     ========================================================================== */
  function attachButtonRipples() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--gold, .btn-action, #submitPostBtn, .btn-reveal-sensitive");
      if (!btn) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-gold-ripple";
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 320);
    });
  }

  /* ==========================================================================
     5. CARD ENTRANCE INTERSECTION OBSERVER (MOTION INVENTORY #5)
     First entry: opacity 0 → 1 and translateY(16px) → 0 over 400ms, ease-out-soft.
     Stagger siblings by 60ms via transition-delay. Unobserve after animating.
     ========================================================================== */
  function observeCardEntrances(containerEl) {
    if (!containerEl) return;
    const cards = containerEl.querySelectorAll(".post-card, .dangal-card, .module-shell-card");
    if (!cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach(c => c.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, idx) => {
      if (!card.classList.contains("is-visible")) {
        card.style.transitionDelay = `${(idx % 8) * 60}ms`;
        observer.observe(card);
      }
    });
  }

  /* ==========================================================================
     KALASAG REPORT BANNER & ROUTING HELPER
     ========================================================================== */
  const REPORT_TARGET_KEY = "bena_report_target_v1";

  function reportToKalasag(target) {
    sessionStorage.setItem(REPORT_TARGET_KEY, JSON.stringify(target));
    
    // Switch tab to Kalasag
    const kalasagTab = document.querySelector('.tab-btn[data-tab="kalasag"]');
    if (kalasagTab) kalasagTab.click();

    updateKalasagReportBanner();
    showToast(`Inilipat sa Kalasag para sa pag-uulat ng ${target.type === 'post' ? 'post' : 'komento'}. 🛡️`);
    playGentleChime();
  }

  function updateKalasagReportBanner() {
    const banner = document.getElementById("kalasagReportBanner");
    const titleEl = document.getElementById("reportBannerTitle");
    const descEl = document.getElementById("reportBannerDesc");
    const clearBtn = document.getElementById("clearReportBannerBtn");
    if (!banner) return;

    const raw = sessionStorage.getItem(REPORT_TARGET_KEY);
    if (!raw) {
      banner.hidden = true;
      return;
    }

    try {
      const data = JSON.parse(raw);
      banner.hidden = false;
      if (titleEl) {
        titleEl.textContent = `Nakatanggap ng Kahilingan sa Pagsusuri ng ${data.type === 'post' ? 'Post' : 'Komento'}`;
      }
      if (descEl) {
        descEl.innerHTML = `<strong>ID:</strong> ${escapeHTML(data.id)} • <strong>May-akda:</strong> ${escapeHTML(data.author || 'Kapwa Pilipino')} ${data.title ? `• <strong>Pamagat:</strong> "${escapeHTML(data.title)}"` : ''}<br>Ang buong pormal na Kalasag reporting form ay darating sa Yugto 6. Naitala na ang item na ito para sa pagsusuri.`;
      }
      if (clearBtn) {
        clearBtn.onclick = () => {
          sessionStorage.removeItem(REPORT_TARGET_KEY);
          banner.hidden = true;
          showToast("Naalis na ang abiso ng ulat.");
        };
      }
    } catch {
      banner.hidden = true;
    }
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

    // Filter pills (Lahat | Artikulo | Sining | Pinaka-bago | Karanasan)
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

  async function renderFeed() {
    const list = document.getElementById("feedList");
    const skeleton = document.getElementById("feedSkeleton");
    const template = document.getElementById("postCardTemplate");
    if (!list || !template) return;

    // Show skeleton shimmer while preparing content
    if (skeleton) skeleton.hidden = false;

    // Try backend API first, fall back to localStorage
    let allPosts = await apiGetPosts();
    if (!allPosts) allPosts = getPosts();
    const countAllEl = document.getElementById("countAll");
    if (countAllEl) countAllEl.textContent = allPosts.length;

    // Hide skeleton immediately once data is ready
    if (skeleton) skeleton.hidden = true;

    // Reverse-chronological render (strictly newest first)
    let filtered = allPosts.slice().sort((a, b) => b.timestamp - a.timestamp);

    // Filter pills logic
    if (currentFeedFilter === "latest") {
      // Pinaka-bago: keep all categories, strictly sorted newest
      filtered = filtered.sort((a, b) => b.timestamp - a.timestamp);
    } else if (currentFeedFilter !== "all") {
      filtered = filtered.filter(p => p.category === currentFeedFilter);
    }

    if (feedSearchQuery) {
      filtered = filtered.filter(p => {
        const titleMatch = (p.title || "").toLowerCase().includes(feedSearchQuery);
        const contentMatch = (p.content || "").toLowerCase().includes(feedSearchQuery);
        const authorMatch = (p.author || "").toLowerCase().includes(feedSearchQuery);
        const tagsMatch = (p.tags || []).some(t => t.toLowerCase().includes(feedSearchQuery));
        return titleMatch || contentMatch || authorMatch || tagsMatch;
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

      // Report button on post card
      const reportBtn = node.querySelector(".btn-report-post");
      if (reportBtn) {
        reportBtn.addEventListener("click", () => {
          reportToKalasag({
            type: "post",
            id: post.id,
            author: post.author,
            title: post.title
          });
        });
      }

      // Likes / Reaction Button
      const reactionBtn = node.querySelector(".btn-reaction");
      const reactionCount = node.querySelector(".reaction-count");
      const hasLiked = !!userLikes[post.id];
      reactionBtn.classList.toggle("is-reacted", hasLiked);
      reactionCount.textContent = post.likes || 0;

      reactionBtn.addEventListener("click", async () => {
        const currentLikes = getUserLikes();
        const alreadyLiked = !!currentLikes[post.id];
        const action = alreadyLiked ? "unlike" : "like";

        if (alreadyLiked) {
          delete currentLikes[post.id];
          reactionBtn.classList.remove("is-reacted");
        } else {
          currentLikes[post.id] = true;
          reactionBtn.classList.add("is-reacted");
          playGentleChime();
        }
        saveUserLikes(currentLikes);

        // Try backend first
        const result = await apiLikePost(post.id, action);
        if (result) {
          reactionCount.textContent = result.likes;
        } else {
          // localStorage fallback
          const posts = getPosts();
          const targetPost = posts.find(p => p.id === post.id);
          if (targetPost) {
            targetPost.likes = Math.max(0, (targetPost.likes || 0) + (alreadyLiked ? -1 : 1));
            reactionCount.textContent = targetPost.likes;
            savePosts(posts);
          }
        }
      });

      // Usapan (Comments) Toggle & Total Count (including nested replies)
      const usapanToggle = node.querySelector(".usapan-toggle");
      const usapanSection = node.querySelector(".usapan-section");
      const commentCount = node.querySelector(".comment-count");
      
      const totalCommentsCount = (post.comments || []).reduce((acc, c) => {
        return acc + 1 + (c.replies ? c.replies.length : 0);
      }, 0);
      commentCount.textContent = totalCommentsCount;

      usapanToggle.addEventListener("click", () => {
        const isOpen = !usapanSection.hidden;
        usapanSection.hidden = isOpen;
        usapanToggle.setAttribute("aria-expanded", String(!isOpen));
      });

      // Render existing comments with one-level-deep replies
      const commentList = node.querySelector(".comment-list");
      renderPostComments(commentList, post.id, post.comments || []);

      // Add main comment form setup
      const commentForm = node.querySelector(".comment-form");
      const textInput = commentForm.querySelector(".comment-input");
      const authorInput = commentForm.querySelector(".comment-author-input");
      const anonCheckbox = commentForm.querySelector(".comment-anon-checkbox");
      const charCountEl = commentForm.querySelector(".comment-char-count");

      if (textInput && charCountEl) {
        textInput.addEventListener("input", () => {
          const len = textInput.value.length;
          charCountEl.textContent = `${len} / 1000`;
          charCountEl.classList.toggle("is-warning", len > 900);
        });
      }

      commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const textVal = textInput.value.trim();
        if (!textVal) return;

        const isAnon = anonCheckbox ? anonCheckbox.checked : false;
        const authorVal = isAnon
          ? "Kapwa Pilipino (Lihim)"
          : (authorInput.value.trim() || "Kapwa Pilipino");

        // Spawn gold particle burst from submit button
        const btnRect = commentForm.querySelector('button[type="submit"]').getBoundingClientRect();
        triggerGoldParticleBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2);

        await addCommentToPost(post.id, authorVal, textVal, isAnon);
        textInput.value = "";
        authorInput.value = "";
        if (charCountEl) charCountEl.textContent = "0 / 1000";
      });

      list.appendChild(node);
    });

    // Apply IntersectionObserver card entrance animation with stagger
    observeCardEntrances(list);
  }

  /* ==========================================================================
     USAPAN: COMMENTS & ONE-LEVEL-DEEP REPLIES RENDERING
     ========================================================================== */
  function renderPostComments(listEl, postId, comments) {
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
        li.dataset.commentId = c.id;

        li.innerHTML = `
          <div class="comment-header">
            <div class="comment-author-wrap">
              <span class="comment-author">${escapeHTML(c.author)}</span>
              ${c.anonymous ? '<span class="comment-anon-badge">Lihim</span>' : ''}
            </div>
            <div class="comment-meta-right">
              <span class="comment-time">${timeAgo(c.timestamp)}</span>
              <button type="button" class="btn-report-comment" title="I-report ang komento">I-report</button>
            </div>
          </div>
          <p class="comment-body">${escapeHTML(c.text)}</p>
          <div class="comment-actions-bar">
            <button type="button" class="btn-reply-toggle">
              <span aria-hidden="true">↳</span>
              <span>Tumugon</span>
            </button>
          </div>

          <!-- 1-Level-Deep Replies Thread -->
          <ul class="reply-list" ${(!c.replies || c.replies.length === 0) ? 'hidden' : ''}></ul>

          <!-- Inline Reply Form (Hidden until Tumugon clicked) -->
          <form class="reply-form" hidden>
            <div class="comment-form-head">
              <input type="text" class="comment-author-input reply-author-input" placeholder="Pangalan mo (o iwang blangko)" maxlength="30">
              <label class="comment-anon-pill">
                <input type="checkbox" class="reply-anon-checkbox">
                <span>Lihim</span>
              </label>
            </div>
            <textarea class="comment-input reply-input" rows="2" placeholder="Isulat ang iyong tugon sa komentong ito..." required maxlength="1000"></textarea>
            <div class="reply-form-bottom">
              <span class="char-count reply-char-count">0 / 1000</span>
              <div style="display:flex; gap:0.4rem;">
                <button type="button" class="btn btn--small btn--ghost-gold btn-cancel-reply">Kanselahin</button>
                <button type="submit" class="btn btn--gold btn--small">
                  <span>Ipahayag ang Tugon</span>
                </button>
              </div>
            </div>
          </form>
        `;

        // Report comment link
        const reportCommentBtn = li.querySelector(".btn-report-comment");
        reportCommentBtn.addEventListener("click", () => {
          reportToKalasag({
            type: "comment",
            id: c.id,
            author: c.author,
            text: c.text
          });
        });

        // Populate existing 1-level deep replies
        const replyListEl = li.querySelector(".reply-list");
        if (c.replies && c.replies.length > 0) {
          replyListEl.hidden = false;
          c.replies
            .slice()
            .sort((a, b) => a.timestamp - b.timestamp)
            .forEach(r => {
              const rLi = document.createElement("li");
              rLi.className = "reply-item";
              rLi.innerHTML = `
                <div class="comment-header">
                  <div class="comment-author-wrap">
                    <span class="comment-author">${escapeHTML(r.author)}</span>
                    ${r.anonymous ? '<span class="comment-anon-badge">Lihim</span>' : ''}
                  </div>
                  <div class="comment-meta-right">
                    <span class="comment-time">${timeAgo(r.timestamp)}</span>
                    <button type="button" class="btn-report-comment btn-report-reply" title="I-report ang tugon">I-report</button>
                  </div>
                </div>
                <p class="comment-body">${escapeHTML(r.text)}</p>
              `;

              const reportReplyBtn = rLi.querySelector(".btn-report-reply");
              reportReplyBtn.addEventListener("click", () => {
                reportToKalasag({
                  type: "comment",
                  id: r.id || c.id,
                  author: r.author,
                  text: r.text
                });
              });

              replyListEl.appendChild(rLi);
            });
        }

        // Toggle Reply Form
        const replyToggle = li.querySelector(".btn-reply-toggle");
        const replyForm = li.querySelector(".reply-form");
        const cancelReplyBtn = li.querySelector(".btn-cancel-reply");
        const replyInput = li.querySelector(".reply-input");
        const replyAuthorInput = li.querySelector(".reply-author-input");
        const replyAnonCheckbox = li.querySelector(".reply-anon-checkbox");
        const replyCharCount = li.querySelector(".reply-char-count");

        replyToggle.addEventListener("click", () => {
          replyForm.hidden = !replyForm.hidden;
          if (!replyForm.hidden) {
            replyInput.focus();
          }
        });

        cancelReplyBtn.addEventListener("click", () => {
          replyForm.hidden = true;
          replyInput.value = "";
          replyCharCount.textContent = "0 / 1000";
        });

        replyInput.addEventListener("input", () => {
          const len = replyInput.value.length;
          replyCharCount.textContent = `${len} / 1000`;
          replyCharCount.classList.toggle("is-warning", len > 900);
        });

        // Submit Reply
        replyForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const rText = replyInput.value.trim();
          if (!rText) return;

          const isAnon = replyAnonCheckbox.checked;
          const rAuthor = isAnon
            ? "Kapwa Pilipino (Lihim)"
            : (replyAuthorInput.value.trim() || "Kapwa Pilipino");

          // Burst effect
          const submitBtn = replyForm.querySelector('button[type="submit"]');
          const sRect = submitBtn.getBoundingClientRect();
          triggerGoldParticleBurst(sRect.left + sRect.width / 2, sRect.top + sRect.height / 2);

          await addReplyToComment(postId, c.id, rAuthor, rText, isAnon);
        });

        listEl.appendChild(li);
      });
  }

  async function addCommentToPost(postId, author, text, anonymous = false) {
    // Try backend first
    const result = await apiAddComment(postId, { author, text, anonymous });
    if (!result) {
      // localStorage fallback
      const posts = getPosts();
      const targetPost = posts.find(p => p.id === postId);
      if (!targetPost) return;
      if (!targetPost.comments) targetPost.comments = [];
      targetPost.comments.push({
        id: uid(),
        author,
        text,
        anonymous,
        timestamp: Date.now(),
        replies: []
      });
      savePosts(posts);
    }
    await renderFeed();
    showToast("Naipahayag na ang iyong komento! Salamat sa pakikibahagi. 🌻");
    playGentleChime();
  }

  async function addReplyToComment(postId, commentId, author, text, anonymous = false) {
    const posts = getPosts();
    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;
    if (!targetPost.comments) targetPost.comments = [];

    const targetComment = targetPost.comments.find(c => c.id === commentId);
    if (!targetComment) return;
    if (!targetComment.replies) targetComment.replies = [];

    targetComment.replies.push({
      id: uid(),
      author,
      text,
      anonymous,
      timestamp: Date.now()
    });

    savePosts(posts);
    await renderFeed();
    showToast("Naipahayag na ang iyong tugon sa usapan! 🌻");
    playGentleChime();
  }

  /* ==========================================================================
     MAG-POST (SUBMISSION FORM WITH CANVAS COMPRESSION & VALIDATION)
     ========================================================================== */
  function initPostForm() {
    const form = document.getElementById("postForm");
    if (!form) return;

    const titleInput = document.getElementById("postTitle");
    const authorInput = document.getElementById("postAuthor");
    const contentInput = document.getElementById("postContent");
    const anonCheckbox = document.getElementById("postAnonymous");
    const categoryRadios = form.querySelectorAll('input[name="postCategory"]');
    const imageInput = document.getElementById("postImage");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");
    const removeImageBtn = document.getElementById("removeImageBtn");
    const contentLabel = document.getElementById("contentLabel");
    const dropzone = document.getElementById("uploadDropzone");
    const siningRecommendTag = document.getElementById("siningRecommendTag");
    const guidelinesConsent = document.getElementById("postGuidelinesConsent");
    const authorReqStar = document.getElementById("authorReqStar");

    // Errors
    const titleError = document.getElementById("postTitleError");
    const authorError = document.getElementById("postAuthorError");
    const contentError = document.getElementById("postContentError");
    const guidelinesError = document.getElementById("guidelinesError");

    // Live Char Counters
    const titleCharCount = document.getElementById("titleCharCount");
    const authorCharCount = document.getElementById("authorCharCount");
    const contentCharCount = document.getElementById("contentCharCount");

    let compressedImageBase64 = null;

    // Character counter listeners
    if (titleInput && titleCharCount) {
      titleInput.addEventListener("input", () => {
        const len = titleInput.value.length;
        titleCharCount.textContent = `${len} / 120`;
        titleCharCount.classList.toggle("is-warning", len > 110);
        if (len >= 3) {
          titleInput.setAttribute("aria-invalid", "false");
          if (titleError) titleError.hidden = true;
        }
      });
    }

    if (authorInput && authorCharCount) {
      authorInput.addEventListener("input", () => {
        const len = authorInput.value.length;
        authorCharCount.textContent = `${len} / 50`;
        authorCharCount.classList.toggle("is-warning", len > 45);
        if (len >= 2) {
          authorInput.setAttribute("aria-invalid", "false");
          if (authorError) authorError.hidden = true;
        }
      });
    }

    if (contentInput && contentCharCount) {
      contentInput.addEventListener("input", () => {
        const len = contentInput.value.length;
        contentCharCount.textContent = `${len} / 2000`;
        contentCharCount.classList.toggle("is-warning", len > 1850);
        if (len >= 10) {
          contentInput.setAttribute("aria-invalid", "false");
          if (contentError) contentError.hidden = true;
        }
      });
    }

    if (guidelinesConsent && guidelinesError) {
      guidelinesConsent.addEventListener("change", () => {
        if (guidelinesConsent.checked) {
          guidelinesConsent.setAttribute("aria-invalid", "false");
          guidelinesError.hidden = true;
        }
      });
    }

    // Anonymous checkbox handling
    if (anonCheckbox) {
      anonCheckbox.addEventListener("change", () => {
        if (anonCheckbox.checked) {
          authorInput.placeholder = "Naka-post nang Lihim (Anonymous)";
          if (authorReqStar) authorReqStar.hidden = true;
          authorInput.setAttribute("aria-invalid", "false");
          if (authorError) authorError.hidden = true;
        } else {
          authorInput.placeholder = "Halimbawa: Tala ng Kabisayaan";
          if (authorReqStar) authorReqStar.hidden = false;
        }
      });
    }

    // Category changes (Conditional Sining highlighting)
    function updateCategoryUI() {
      const selected = form.querySelector('input[name="postCategory"]:checked')?.value || "Artikulo";
      if (selected === "Sining") {
        contentLabel.innerHTML = 'Ilarawan ang iyong sining at mensahe <span class="required">*</span>';
        if (siningRecommendTag) siningRecommendTag.hidden = false;
        if (dropzone) dropzone.style.borderColor = "var(--gold-bright)";
      } else if (selected === "Karanasan") {
        contentLabel.innerHTML = 'Ibahagi ang iyong sariling kwento o patotoo <span class="required">*</span>';
        if (siningRecommendTag) siningRecommendTag.hidden = true;
        if (dropzone) dropzone.style.borderColor = "";
      } else {
        contentLabel.innerHTML = 'Isulat ang iyong artikulo o sanaysay <span class="required">*</span>';
        if (siningRecommendTag) siningRecommendTag.hidden = true;
        if (dropzone) dropzone.style.borderColor = "";
      }
    }

    categoryRadios.forEach(r => r.addEventListener("change", updateCategoryUI));
    updateCategoryUI();

    // Canvas Compression function: max 800px / 500KB
    function processAndCompressImage(file) {
      if (!file || !file.type.startsWith("image/")) {
        showToast("Mangyaring pumili ng wastong larawan (JPG, PNG, o WebP).");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Scale down image to max 800px wide/tall
          const maxDim = 800;
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

          // Convert to JPEG at 0.80 quality (well under 500KB, ~60-150KB)
          compressedImageBase64 = canvas.toDataURL("image/jpeg", 0.80);
          imagePreview.src = compressedImageBase64;
          imagePreviewContainer.hidden = false;
          showToast("Matagumpay na na-compress ang larawan para sa mabilis na pag-save! 🖼️");
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

    // Form Submission with Strict Validation & Particle Burst
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = titleInput.value.trim();
      const isAnon = anonCheckbox ? anonCheckbox.checked : false;
      const author = isAnon ? "Kapwa Pilipino" : authorInput.value.trim();
      const category = form.querySelector('input[name="postCategory"]:checked')?.value || "Artikulo";
      const content = contentInput.value.trim();
      
      const selectedPronoun = form.querySelector('input[name="postPronouns"]:checked')?.value || "siya/kanya";
      const selectedTags = Array.from(form.querySelectorAll('input[name="postTags"]:checked')).map(el => el.value);
      const isSensitive = document.getElementById("postSensitiveWarning")?.checked || false;
      const hasConsented = guidelinesConsent ? guidelinesConsent.checked : true;

      // Validation
      let hasError = false;

      if (!title || title.length < 3) {
        titleInput.setAttribute("aria-invalid", "true");
        if (titleError) titleError.hidden = false;
        if (!hasError) titleInput.focus();
        hasError = true;
      } else {
        titleInput.setAttribute("aria-invalid", "false");
        if (titleError) titleError.hidden = true;
      }

      if (!isAnon && (!author || author.length < 2)) {
        authorInput.setAttribute("aria-invalid", "true");
        if (authorError) authorError.hidden = false;
        if (!hasError) authorInput.focus();
        hasError = true;
      } else {
        authorInput.setAttribute("aria-invalid", "false");
        if (authorError) authorError.hidden = true;
      }

      if (!content || content.length < 10) {
        contentInput.setAttribute("aria-invalid", "true");
        if (contentError) contentError.hidden = false;
        if (!hasError) contentInput.focus();
        hasError = true;
      } else {
        contentInput.setAttribute("aria-invalid", "false");
        if (contentError) contentError.hidden = true;
      }

      if (!hasConsented) {
        guidelinesConsent.setAttribute("aria-invalid", "true");
        if (guidelinesError) guidelinesError.hidden = false;
        if (!hasError) guidelinesConsent.focus();
        hasError = true;
      } else {
        guidelinesConsent.setAttribute("aria-invalid", "false");
        if (guidelinesError) guidelinesError.hidden = true;
      }

      if (hasError) {
        showToast("Pakiaayos ang mga kulang o maling patlang sa itaas.");
        return;
      }

      const submitBtn = document.getElementById("submitPostBtn");
      const btnRect = submitBtn.getBoundingClientRect();

      // Trigger particle burst at submit button
      triggerGoldParticleBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2);

      const newPost = {
        id: uid(),
        title,
        author: isAnon ? "Kapwa Pilipino" : author,
        pronouns: selectedPronoun,
        tags: selectedTags,
        isSensitive,
        anonymous: isAnon,
        category,
        content,
        image: compressedImageBase64,
        likes: 1,
        timestamp: Date.now(),
        comments: []
      };

      // Save to backend or fallback
      const savedPost = await apiCreatePost(newPost);
      if (savedPost) {
        newPost.id = savedPost.id;
      } else {
        const posts = getPosts();
        posts.unshift(newPost);
        savePosts(posts);
      }

      // Auto-like
      const userLikes = getUserLikes();
      userLikes[newPost.id] = true;
      saveUserLikes(userLikes);

      // Reset form & live counters
      form.reset();
      compressedImageBase64 = null;
      imagePreviewContainer.hidden = true;
      imagePreview.src = "";
      if (titleCharCount) titleCharCount.textContent = "0 / 120";
      if (authorCharCount) authorCharCount.textContent = "0 / 50";
      if (contentCharCount) contentCharCount.textContent = "0 / 2000";
      updateCategoryUI();

      showToast(savedPost
        ? "Matagumpay na naipahayag ang iyong likha sa Tahanan! 🌻"
        : "Naibahagi na ang iyong kwento (naka-save sa iyong browser)."
      );
      playGentleChime();

      // Navigate smoothly to Tahanan feed
      const tahananTab = document.querySelector('.tab-btn[data-tab="tahanan"]');
      if (tahananTab) tahananTab.click();
      await renderFeed();
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
    initThemeToggle();
    initHablonThread();
    initYakap();
    initGenderGuide();
    initPrideBanner();
    initNavigation();
    initDangal();
    initDambana();
    initPostForm();
    initFeed();
    attachButtonRipples();
    updateKalasagReportBanner();
    initFooter();
  });
})();
