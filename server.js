/**
 * BENA — Backend Server
 * =====================
 * Lightweight Express.js server for persisting:
 *  - Community posts (Tahanan feed)
 *  - Comments on posts
 *  - Puso/like counts
 *  - Panata (vows) for the Dambana
 *  - Dambana altar counters (candles & sampaguita)
 *
 * Data is stored in `data/bena_db.json` — a simple JSON file.
 * This means zero external databases needed; just run `node server.js`.
 *
 * To deploy: push to Railway, Render, or any Node.js host.
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "data", "bena_db.json");

/* ── Middleware ──────────────────────────────────────────────────────────── */
app.use(cors());
app.use(express.json({ limit: "5mb" })); // allow image payloads (compressed)
app.use(express.static(__dirname));       // serve index.html + assets

/* ── Database helpers ───────────────────────────────────────────────────── */
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) return getDefaultDB();
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return getDefaultDB();
  }
}

function writeDB(data) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

function getDefaultDB() {
  return {
    posts: [
      {
        id: "seed1",
        category: "Artikulo",
        title: "Ang Babaylan: Ang Unang Feminist ng Pilipinas",
        author: "Ate Marilag",
        pronouns: "siya/kanya",
        content: "Sa panahon bago dumating ang mga Espanyol, ang kababaihang Pilipino ay hindi lamang tahimik na kasama sa lipunan—sila ang mga pinuno, manggagamot, at espirituwal na tagapayo ng buong komunidad. Ang Babaylan ay isang tanda ng lipunang naniniwala sa pantay na dignidad ng lahat.",
        image: null,
        contentWarning: false,
        cwNote: "",
        likes: 47,
        timestamp: Date.now() - 86400000 * 3,
        comments: [
          {
            id: "c1",
            author: "Tanaw mula sa Cordillera",
            pronouns: "she/her",
            text: "Salamat sa pagbabahagi ng kasaysayan ng ating mga Babaylan! Kailangan nating ituro ito sa mga paaralan.",
            timestamp: Date.now() - 86400000 * 2
          }
        ]
      },
      {
        id: "seed2",
        category: "Karanasan",
        title: "Ang Pagiging Non-Binary sa isang Pamilyang Pilipino",
        author: "Isang Anak ng Asog",
        pronouns: "they/them",
        content: "Hindi madali ang maging sarili mo sa isang kulturang pinahubad na ng kolonyalismo. Ngunit natuklasan ko na ang kasaysayan ng ating mga Asog at Bayoguin — mga miyembro ng komunidad na kinikilala bilang espirituwal na tagapayo dahil sa kanilang kaibahan, hindi inilalagay sa kahon. Pag-aralan ang kasaysayan upang mahanap ang iyong lugar sa loob nito.",
        image: null,
        contentWarning: false,
        cwNote: "",
        likes: 93,
        timestamp: Date.now() - 86400000 * 1,
        comments: []
      }
    ],
    panata: [
      {
        id: "p_seed1",
        author: "Isang Babaylan ng Bagong Henerasyon",
        tag: "🌸 Alay sa Kababaihan",
        text: "Ipinangako ko sa aking mga ninuno na ipagpatuloy ang kanilang tapang at magtatayo ng mas makatarungang lipunan para sa lahat ng kasarian.",
        timestamp: Date.now() - 86400000 * 2,
        blessings: 28
      },
      {
        id: "p_seed2",
        author: "Asog ng Visayas",
        tag: "🌈 Asog at LGBTQIA+ Diwa",
        text: "Patunayan ko na ang pagiging queer at pagiging Pilipino ay hindi magkasalungat — ito ay isang pagdiriwang ng ating tunay na ugat.",
        timestamp: Date.now() - 86400000 * 1,
        blessings: 41
      }
    ],
    dambana: {
      candles: 1248,
      sampaguita: 612
    }
  };
}

/* ── Ensure DB exists on startup ────────────────────────────────────────── */
if (!fs.existsSync(DB_PATH)) {
  writeDB(getDefaultDB());
  console.log("✅ Created fresh bena_db.json with seed data.");
}

/* ══════════════════════════════════════════════════════════════════════════
   POSTS API
   ══════════════════════════════════════════════════════════════════════════ */

/** GET /api/posts — Get all posts (newest first) */
app.get("/api/posts", (req, res) => {
  const db = readDB();
  res.json(db.posts.sort((a, b) => b.timestamp - a.timestamp));
});

/** POST /api/posts — Create a new post */
app.post("/api/posts", (req, res) => {
  const { category, title, author, pronouns, content, image, contentWarning, cwNote } = req.body;

  if (!title || !author || !content || !category) {
    return res.status(400).json({ error: "Missing required fields: title, author, content, category" });
  }

  const db = readDB();
  const newPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    category: category || "Artikulo",
    title: title.slice(0, 120),
    author: author.slice(0, 50),
    pronouns: pronouns || "siya/kanya",
    content: content.slice(0, 5000),
    image: image || null,   // base64 compressed string or null
    contentWarning: !!contentWarning,
    cwNote: cwNote || "",
    likes: 0,
    timestamp: Date.now(),
    comments: []
  };

  db.posts.unshift(newPost);
  writeDB(db);
  res.status(201).json(newPost);
});

/** POST /api/posts/:id/like — Toggle like (returns new count) */
app.post("/api/posts/:id/like", (req, res) => {
  const db = readDB();
  const post = db.posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  // Simple increment (client tracks whether user already liked via localStorage)
  const { action } = req.body; // "like" or "unlike"
  post.likes = Math.max(0, post.likes + (action === "unlike" ? -1 : 1));
  writeDB(db);
  res.json({ likes: post.likes });
});

/** POST /api/posts/:id/comments — Add a comment */
app.post("/api/posts/:id/comments", (req, res) => {
  const { author, pronouns, text } = req.body;
  if (!text) return res.status(400).json({ error: "Comment text is required" });

  const db = readDB();
  const post = db.posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const comment = {
    id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    author: (author || "Anonimo").slice(0, 50),
    pronouns: pronouns || "siya/kanya",
    text: text.slice(0, 500),
    timestamp: Date.now()
  };

  if (!post.comments) post.comments = [];
  post.comments.push(comment);
  writeDB(db);
  res.status(201).json(comment);
});

/** DELETE /api/posts/:id — Delete a post (by ID, no auth for MVP) */
app.delete("/api/posts/:id", (req, res) => {
  const db = readDB();
  const index = db.posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  db.posts.splice(index, 1);
  writeDB(db);
  res.json({ success: true });
});

/* ══════════════════════════════════════════════════════════════════════════
   PANATA (VOWS) API
   ══════════════════════════════════════════════════════════════════════════ */

/** GET /api/panata — Get all panata (newest first) */
app.get("/api/panata", (req, res) => {
  const db = readDB();
  res.json((db.panata || []).sort((a, b) => b.timestamp - a.timestamp));
});

/** POST /api/panata — Submit a new panata */
app.post("/api/panata", (req, res) => {
  const { author, tag, text } = req.body;
  if (!text) return res.status(400).json({ error: "Panata text is required" });

  const db = readDB();
  if (!db.panata) db.panata = [];

  const panata = {
    id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    author: (author || "Anonimong Pilipino").slice(0, 40),
    tag: tag || "🕊️ Kapayapaan at Pagkakapantay",
    text: text.slice(0, 250),
    timestamp: Date.now(),
    blessings: 0
  };

  db.panata.unshift(panata);
  writeDB(db);
  res.status(201).json(panata);
});

/** POST /api/panata/:id/bless — Add a blessing to a panata */
app.post("/api/panata/:id/bless", (req, res) => {
  const db = readDB();
  const panata = (db.panata || []).find(p => p.id === req.params.id);
  if (!panata) return res.status(404).json({ error: "Panata not found" });

  panata.blessings = (panata.blessings || 0) + 1;
  writeDB(db);
  res.json({ blessings: panata.blessings });
});

/* ══════════════════════════════════════════════════════════════════════════
   DAMBANA ALTAR COUNTERS API
   ══════════════════════════════════════════════════════════════════════════ */

/** GET /api/dambana — Get altar counters */
app.get("/api/dambana", (req, res) => {
  const db = readDB();
  res.json(db.dambana || { candles: 0, sampaguita: 0 });
});

/** POST /api/dambana/candle — Light a candle */
app.post("/api/dambana/candle", (req, res) => {
  const db = readDB();
  if (!db.dambana) db.dambana = { candles: 0, sampaguita: 0 };
  db.dambana.candles += 1;
  writeDB(db);
  res.json(db.dambana);
});

/** POST /api/dambana/sampaguita — Offer a sampaguita */
app.post("/api/dambana/sampaguita", (req, res) => {
  const db = readDB();
  if (!db.dambana) db.dambana = { candles: 0, sampaguita: 0 };
  db.dambana.sampaguita += 1;
  writeDB(db);
  res.json(db.dambana);
});

/* ── Health check ───────────────────────────────────────────────────────── */
app.get("/api/health", (req, res) => {
  const db = readDB();
  res.json({
    status: "OK",
    posts: db.posts?.length || 0,
    panata: db.panata?.length || 0,
    dambana: db.dambana
  });
});

/* ── Start server ───────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║  🌻 BENA Server — Yakap para sa Kaluluwang       ║
║     Pilipino                                     ║
╠══════════════════════════════════════════════════╣
║  Running at: http://localhost:${PORT}               ║
║  Data file:  data/bena_db.json                   ║
╚══════════════════════════════════════════════════╝
  `);
});
