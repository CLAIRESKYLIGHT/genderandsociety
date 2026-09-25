# BENA — Yakap para sa Kaluluwang Pilipino 🌻

A digital safe space celebrating pre-colonial Filipino egalitarianism, gender sensitivity, and cultural pride.

---

## Running Locally (With Backend — Fully Functional)

**Requirements:** Node.js 18+ installed

`ash
# 1. Go to the BENA folder
cd "c:\Users\Angela Claire\Downloads\BENA"

# 2. Install dependencies (only needed once)
npm install

# 3. Start the server
node server.js

# 4. Open in your browser
# Navigate to: http://localhost:3000
`

All posts, panata, candle counts — everything is saved to data/bena_db.json and **shared across all browsers/users**.

---

## Running as a Simple File (Offline / No Backend)

Just open index.html directly in your browser. Everything saves to **your browser's localStorage**. Posts won't be visible to others.

---

## Deploying Online (Free Hosting)

### Option A: Railway.app (Recommended, Free Tier)
1. Push this folder to a GitHub repository
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your repo → Railway auto-detects Node.js and runs 
ode server.js
4. Your site goes live at a free .railway.app URL!

### Option B: Render.com (Free Tier)
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service → Connect GitHub
3. Build Command: 
pm install  
4. Start Command: 
ode server.js
5. Free URL at .onrender.com

---

## File Structure

`
BENA/
├── index.html          ← The main webpage
├── style.css           ← All visual styles (responsive!)
├── script.js           ← Client-side JavaScript + API integration
├── server.js           ← Node.js/Express backend server
├── package.json        ← Node.js dependencies
├── manifest.json       ← PWA manifest (install as app)
├── assets/             ← Images and media
└── data/
    └── bena_db.json    ← Created automatically; stores all data
`

---

## Features
- 🌻 Tahanan feed — post articles, art, personal stories
- ✨ Dangal ng Lahi — Filipino cultural heritage gallery
- 🕯️ Dambana ng Diwa — interactive candle/vow altar
- 📜 Manifesto — pre-colonial gender egalitarianism essay
- 🌈 Gender-sensitive design (SOGIESC-inclusive)
- 📱 Fully responsive — works on mobile, tablet, desktop
- 🔌 Backend API + localStorage fallback
