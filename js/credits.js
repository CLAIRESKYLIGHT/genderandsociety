/**
 * BENA — Credits (credits.js)
 * ============================
 * Rendered in the site footer and at the bottom of the Manifesto section.
 * Add new contributors to CREDITS — never remove existing entries.
 */

const CREDITS = {
  project: {
    name: "BENA — Yakap para sa Kaluluwang Pilipino",
    tagline: "Gender at Lipunan • Pre-colonial Filipino Heritage • SOGIESC Education",
    version: "1.0.0",
    year: 2026,
  },
  concept: [
    {
      role: "Konsepto at Disenyo ng Nilalaman",
      names: ["Angela Claire (Tagapagtatag ng BENA)"],
    },
  ],
  academic: [
    {
      role: "Gabay sa Akademya (Gender Studies)",
      names: [
        "Mga guro at iskolar ng Gender at Lipunan sa mga unibersidad ng Pilipinas",
        "Philippine Commission on Women (PCW)",
        "Commission on Human Rights of the Philippines (CHR)",
      ],
    },
  ],
  inspirations: [
    "Mga Babaylan at Catalonan ng sinaunang Pilipinas",
    "Gabriela Cariño Silang — Mandirigmang Ilokana",
    "Tandang Sora (Melchora Aquino) — Ina ng Himagsikan",
    "Lorena Barros — Makatang Aktibista",
    "Walang pangalang kababaihang nagpanatili ng kultura sa kabila ng kolonyalismo",
  ],
  technical: [
    {
      role: "Teknolohiya",
      tools: [
        "HTML5 / CSS3 / Vanilla JavaScript (walang mabigat na framework)",
        "Node.js + Express.js para sa backend",
        "Google Fonts: Fraunces · Plus Jakarta Sans · IBM Plex Mono",
        "Web APIs: IntersectionObserver, Canvas, sessionStorage, localStorage",
      ],
    },
  ],
  licenses: {
    content:
      "Ang mga nilalaman ng BENA ay para sa edukasyonal at hindi-komersyal na gamit. Ang mga sanggunian ay pag-aari ng kani-kanilang may-akda.",
    code: "Ang source code ng BENA ay bukas para sa pag-aaral at pagpapabuti ng komunidad.",
  },
  disclaimer:
    "Ang BENA ay hindi opisyal na ahensya ng gobyerno. Para sa emergency, makipag-ugnayan sa PNP Women and Children Protection Center sa 1343 o sa National Center for Mental Health Crisis Hotline sa 1553.",
};

if (typeof module !== "undefined") module.exports = { CREDITS };
