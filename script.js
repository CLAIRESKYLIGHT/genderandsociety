(() => {
  "use strict";

  const STORAGE_KEY = "bena_posts_v1";
  const YAKAP_SEEN_KEY = "bena_yakap_seen_v1";

  /* ===================== Data: quotes ===================== */
  const PRIDE_QUOTES = [
    "Ang Babaylan ay hindi kasarian — ito ay tawag.",
    "Bago tayo sakupin, tayo ay pantay-pantay na.",
    "Ang wika mo ay hindi kahihiyan. Ito ay pamana.",
    "Walang kasarian ang higit sa isa pa — ito ang katotohanang nakalimutan.",
    "Ang kulay ng iyong balat ay kulay ng lupang pinagmulan mo.",
    "Ang ninuno mo ay lumaban upang ikaw ay mabuhay ngayon nang buo.",
    "Hindi ka nagsimula sa kahihiyan. Nagsimula ka sa paggalang.",
    "Ang pag-ibig sa sarili ay unang hakbang tungo sa pagbabalik-loob sa ating kultura.",
    "Sa bawat Babaylan na dumaing, may boses kang minana.",
    "Ang pagiging Pilipino ay hindi kailangang bawasan upang tanggapin."
  ];

  /* ===================== Data: Diwang Pinoy achievements ===================== */
  const ACHIEVEMENTS = [
    { name: "Francisca Reyes-Aquino", field: "Sayaw / Sining", desc: "Kilala bilang 'Ina ng Sayaw na Pilipino' — nagtala at nag-alaga ng daan-daang katutubong sayaw upang hindi malimutan ng bagong salinlahi." },
    { name: "Lea Salonga", field: "Musika / Teatro", desc: "Unang Asyanong panalo ng Tony Award, dinala ang tinig ng Pilipino sa mga entablado ng Broadway at West End." },
    { name: "Hidilyn Diaz", field: "Sports", desc: "Unang Pilipinang nagwagi ng Olympic gold medal, sa weightlifting noong 2020 Tokyo Olympics." },
    { name: "Whang-Od Oggay", field: "Sining ng Katawan", desc: "Pinakamatandang mambabatok (traditional tattoo artist) ng Kalinga, buhay na museo ng sining ng ating mga ninuno." },
    { name: "Darren Espanto & mga OPM na alagad", field: "Musika", desc: "Bahagi ng mahabang tradisyon ng OPM na nagpapatunay: kaya nating umawit sa sariling wika at marinig pa rin ng mundo." },
    { name: "Ramon Obusan", field: "Sayaw / Kultura", desc: "Katutubong mananayaw at koreograpo na naglakbay sa buong bansa upang idokumento ang mga nawawalang sayaw ng katutubo." }
  ];

  let achIndex = 0;

  /* ===================== Seed demo posts ===================== */
  function seedPostsIfEmpty() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    const now = Date.now();
    const seed = [
      {
        id: "seed1",
        title: "Bakit Ako Nahihiya Noong Bata Ako",
        author: "Trisha M.",
        anonymous: false,
        category: "Artikulo",
        content: "Noong bata ako, iniwasan kong magsalita ng Bikol sa harap ng mga kaklase ko sa Maynila. Akala ko 'baduy' ang punto ko. Ngayong may edad na, natutunan kong ang aking wika ay hindi dapat ikahiya — ito ang boses ng aking lola, ng aking lugar, ng aking pagkatao. Salamat, BENA, sa paalala.",
        image: null,
        timestamp: now - 1000 * 60 * 60 * 26,
        comments: [
          { id: "c1", author: "Mikael R.", text: "Ang ganda nito. Same experience din ako sa Cebuano.", timestamp: now - 1000 * 60 * 60 * 20 },
          { id: "c2", author: "Anonymously Posted", text: "Umiyak ako sa pagbasa. Salamat sa pagbahagi.", timestamp: now - 1000 * 60 * 60 * 10 }
        ]
      },
      {
        id: "seed2",
        title: "Sining ng Pagtahi: Alay sa Aking Lola",
        author: "Anonymously Posted",
        anonymous: true,
        category: "Sining",
        content: "Ginawa ko itong piraso bilang parangal sa aking lolang manghahabi ng inabel sa Ilocos. Bawat guhit ay kwento ng isang henerasyong hindi pinatahimik ng kolonyalismo.",
        image: null,
        timestamp: now - 1000 * 60 * 60 * 50,
        comments: [
          { id: "c3", author: "Joana P.", text: "Ang lalim ng kwento sa likod nito. 😭🌻", timestamp: now - 1000 * 60 * 60 * 40 }
        ]
      },
      {
        id: "seed3",
        title: "Sa Aking mga Kapatid na LGBTQ+: Kayo ay mga Babaylan",
        author: "Ronel S.",
        anonymous: false,
        category: "Artikulo",
        content: "Bago pa man tayo tawaging 'ipinagbabawal,' tayo ay tinawag na banal. Ang mga babaylan ng ating mga ninuno ay hindi laging babae sa katawan — may mga lalaking nagbibihis-babae, at sila'y iginagalang, hindi kinukutya. Ibalik natin ang alaalang iyon.",
        image: null,
        timestamp: now - 1000 * 60 * 60 * 70,
        comments: []
      },
      {
        id: "seed4",
        title: "Larawan: Ilaw ng Barangay",
        author: "Karla D.",
        anonymous: false,
        category: "Sining",
        content: "Guhit ng isang babaylan sa gitna ng ritwal, sa ilaw ng apoy. Gusto kong ipakita ang dignidad, hindi ang kakaiba.",
        image: null,
        timestamp: now - 1000 * 60 * 60 * 90,
        comments: [
          { id: "c4", author: "Anonymously Posted", text: "Kailangan ko ito bilang wallpaper. Ang ganda.", timestamp: now - 1000 * 60 * 60 * 80 }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }

  function getPosts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  /* ===================== Yakap modal ===================== */
  function initYakap() {
    const overlay = document.getElementById("yakapOverlay");
    const closeBtn = document.getElementById("yakapClose");
    if (!localStorage.getItem(YAKAP_SEEN_KEY)) {
      overlay.classList.remove("is-hidden");
    } else {
      overlay.classList.add("is-hidden");
    }
    closeBtn.addEventListener("click", () => {
      overlay.classList.add("is-hidden");
      localStorage.setItem(YAKAP_SEEN_KEY, "1");
    });
  }

  /* ===================== Pride banner ===================== */
  function initPrideBanner() {
    const quoteEl = document.getElementById("prideQuote");
    const btn = document.getElementById("newQuoteBtn");
    let lastIndex = -1;

    function showRandomQuote() {
      let idx;
      do {
        idx = Math.floor(Math.random() * PRIDE_QUOTES.length);
      } while (idx === lastIndex && PRIDE_QUOTES.length > 1);
      lastIndex = idx;
      quoteEl.textContent = "“" + PRIDE_QUOTES[idx] + "”";
    }

    showRandomQuote();
    btn.addEventListener("click", showRandomQuote);
  }

  /* ===================== Tabs ===================== */
  function initTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    const pages = document.querySelectorAll(".page");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        pages.forEach(p => p.classList.toggle("is-active", p.id === target));
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  /* ===================== Achievements carousel ===================== */
  function renderAchievement() {
    const card = document.getElementById("achievementCard");
    const a = ACHIEVEMENTS[achIndex];
    card.innerHTML = `
      <p class="ach-field">${escapeHTML(a.field)}</p>
      <p class="ach-name">${escapeHTML(a.name)}</p>
      <p class="ach-desc">${escapeHTML(a.desc)}</p>
    `;
  }

  function initAchievements() {
    renderAchievement();
    document.getElementById("achPrev").addEventListener("click", () => {
      achIndex = (achIndex - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length;
      renderAchievement();
    });
    document.getElementById("achNext").addEventListener("click", () => {
      achIndex = (achIndex + 1) % ACHIEVEMENTS.length;
      renderAchievement();
    });
  }

  /* ===================== Utilities ===================== */
  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "ngayon lang";
    if (diff < 3600) return Math.floor(diff / 60) + "m ago";
    if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
    return Math.floor(diff / 86400) + "d ago";
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  /* ===================== Feed rendering ===================== */
  function renderFeed() {
    const list = document.getElementById("feedList");
    const template = document.getElementById("postCardTemplate");
    const posts = getPosts().slice().sort((a, b) => b.timestamp - a.timestamp);

    list.innerHTML = "";

    if (posts.length === 0) {
      list.innerHTML = `<p class="comment-empty">Wala pang post. Ikaw ang maaaring maging una — pumunta sa Mag-post.</p>`;
      return;
    }

    posts.forEach(post => {
      const node = template.content.cloneNode(true);
      const article = node.querySelector(".post-card");
      article.dataset.id = post.id;

      const badge = node.querySelector(".badge");
      badge.textContent = post.category;
      if (post.category === "Sining") badge.classList.add("badge--sining");

      node.querySelector(".post-time").textContent = timeAgo(post.timestamp);
      node.querySelector(".post-title").textContent = post.title;
      node.querySelector(".post-author").textContent =
        (post.anonymous ? "Anonymously Posted" : "ni " + post.author);

      const img = node.querySelector(".post-image");
      if (post.image) {
        img.src = post.image;
        img.alt = post.title;
        img.hidden = false;
      }

      node.querySelector(".post-content").textContent = post.content;

      const commentCount = node.querySelector(".comment-count");
      commentCount.textContent = post.comments.length;

      const toggle = node.querySelector(".usapan-toggle");
      const body = node.querySelector(".usapan-body");
      toggle.addEventListener("click", () => {
        const isOpen = !body.hidden;
        body.hidden = isOpen;
        toggle.setAttribute("aria-expanded", String(!isOpen));
      });

      const commentList = node.querySelector(".comment-list");
      renderComments(commentList, post.comments);

      const form = node.querySelector(".comment-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector(".comment-input");
        const text = input.value.trim();
        if (!text) return;
        addComment(post.id, text);
        input.value = "";
      });

      list.appendChild(node);
    });
  }

  function renderComments(listEl, comments) {
    listEl.innerHTML = "";
    if (comments.length === 0) {
      const empty = document.createElement("p");
      empty.className = "comment-empty";
      empty.textContent = "Wala pang komento. Ikaw ang una!";
      listEl.appendChild(empty);
      return;
    }
    comments
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp)
      .forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="c-author">${escapeHTML(c.author)}</span>${escapeHTML(c.text)}<span class="c-time">${timeAgo(c.timestamp)}</span>`;
        listEl.appendChild(li);
      });
  }

  function addComment(postId, text) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    post.comments.push({
      id: uid(),
      author: "Ikaw", // simple MVP identity for the current visitor
      text,
      timestamp: Date.now()
    });
    savePosts(posts);
    renderFeed();
  }

  /* ===================== Mag-post form ===================== */
  function initPostForm() {
    const form = document.getElementById("postForm");
    const categoryRadios = form.querySelectorAll('input[name="postCategory"]');
    const artField = document.getElementById("artUploadField");
    const imageInput = document.getElementById("postImage");
    const imagePreview = document.getElementById("imagePreview");
    const contentLabel = document.getElementById("contentLabel");

    let currentImageBase64 = null;

    function updateCategoryUI() {
      const selected = form.querySelector('input[name="postCategory"]:checked').value;
      const isArt = selected === "Sining";
      artField.hidden = !isArt;
      contentLabel.textContent = isArt ? "Ilarawan ang iyong sining" : "Sulatin mo dito";
    }

    categoryRadios.forEach(r => r.addEventListener("change", updateCategoryUI));
    updateCategoryUI();

    imageInput.addEventListener("change", () => {
      const file = imageInput.files[0];
      if (!file) {
        currentImageBase64 = null;
        imagePreview.hidden = true;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        currentImageBase64 = reader.result;
        imagePreview.src = currentImageBase64;
        imagePreview.hidden = false;
      };
      reader.readAsDataURL(file);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("postTitle").value.trim();
      const author = document.getElementById("postAuthor").value.trim();
      const category = form.querySelector('input[name="postCategory"]:checked').value;
      const content = document.getElementById("postContent").value.trim();
      const anonymous = document.getElementById("postAnonymous").checked;

      if (!title || !author || !content) return;

      const posts = getPosts();
      posts.push({
        id: uid(),
        title,
        author,
        anonymous,
        category,
        content,
        image: category === "Sining" ? currentImageBase64 : null,
        timestamp: Date.now(),
        comments: []
      });
      savePosts(posts);

      form.reset();
      currentImageBase64 = null;
      imagePreview.hidden = true;
      updateCategoryUI();

      renderFeed();

      // Jump to Tahanan to show the new post
      document.querySelector('.tab-btn[data-tab="tahanan"]').click();
    });
  }

  /* ===================== Init ===================== */
  document.addEventListener("DOMContentLoaded", () => {
    seedPostsIfEmpty();
    initYakap();
    initPrideBanner();
    initTabs();
    initAchievements();
    initPostForm();
    renderFeed();
  });
})();
