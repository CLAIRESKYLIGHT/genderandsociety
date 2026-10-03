/**
 * BENA — Shield (Kalasag) Content & Handlers
 * Safety guidelines, hotlines, ally tips, and mailto incident report
 */

export const SHIELD_DATA = {
  guidelines: [
    {
      tl: "Igalang ang bawat kasarian, katawan, at kwento.",
      en: "Respect every gender, body, and personal story without judgment."
    },
    {
      tl: "Walang puwang ang misogyny, homophobia, transphobia, at panlilibak.",
      en: "Zero tolerance for misogyny, homophobia, transphobia, and hate speech."
    },
    {
      tl: "Igalang ang mga piniling pangalan at pronouns ng kapwa.",
      en: "Honor the chosen names and pronouns of every individual."
    },
    {
      tl: "Maglagay ng Content Warning (CW) sa mga sensitibong kwento ng trauma.",
      en: "Apply Content Warnings when discussing sensitive topics of harm or discrimination."
    },
    {
      tl: "Huwag kailanman ibahagi ang pribadong impormasyon nang walang pahintulot.",
      en: "Never share private or identifying details without explicit consent."
    },
    {
      tl: "Makinig nang may bukas na puso; ang pag-aaruga ay likas sa atin.",
      en: "Listen with an open heart; radical care and empathy guide our space."
    }
  ],

  hotlines: [
    {
      name: "PNP Women & Children Protection Center",
      number: "(02) 8532-6690",
      tel: "+63285326690",
      verifyNote: "I-verify ang mga numerong ito sa opisyal na pnp.gov.ph"
    },
    {
      name: "DSWD Crisis Intervention Unit",
      number: "(02) 8931-8101",
      tel: "+63289318101",
      verifyNote: "I-verify sa dswd.gov.ph bago gamitin"
    },
    {
      name: "PGH Women's Desk",
      number: "(02) 8554-8400 loc. 2536",
      tel: "+63285548400",
      verifyNote: "I-verify sa pgh.gov.ph"
    },
    {
      name: "HUGPONG Anti-Violence Network",
      number: "(02) 8920-5301",
      tel: "+63289205301",
      verifyNote: "I-verify sa hugpong advocacy portal"
    },
    {
      name: "Babaylanes Inc. (LGBTQIA+ Support)",
      number: "info@babaylanes.org",
      tel: null,
      verifyNote: "I-verify sa facebook.com/babaylanes"
    },
    {
      name: "Rainbow Rights Philippines",
      number: "rrights.ph@gmail.com",
      tel: null,
      verifyNote: "I-verify sa rainbowrights.org"
    },
    {
      name: "GALANG Philippines (LBT Community)",
      number: "(02) 8352-4796",
      tel: "+63283524796",
      verifyNote: "I-verify sa galangphilippines.org"
    }
  ],

  allyTips: [
    "Makinig bago magsalita. Bigyang-daan ang mga boses na madalas ipagsantabi.",
    "Igalang ang pangalan at pronouns ng iba — ito ang pinakapundamental na tanda ng paggalang.",
    "Hindi mo kailangang intindihin ang lahat para igalang ito.",
    "Tumindig kapag may nakitang pambabastos o homophobic/sexist na biruan.",
    "Huwag ipagpalagay ang kasarian o oryentasyon ng sinuman batay sa kanilang itsura.",
    "Magbasa at mag-aral nang kusa; huwag iatang sa mga biktima ang responsibilidad na turuan ka.",
    "Maging maingat sa mga salitang ginagamit; ang wika ay humuhubog ng katotohanan.",
    "Ipagtanggol ang Safe Spaces Act (RA 11313) sa iyong paaralan, trabaho, at komunidad.",
    "Kilalanin ang iyong sariling pribilehiyo at gamitin ito upang magbukas ng pinto para sa iba.",
    "Tandaan: Ang pagiging kakampi ay isang tuloy-tuloy na pagsasanay, hindi isang titulo."
  ]
};

export function setupReportForm() {
  const form = document.getElementById('shieldReportForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const type = document.getElementById('reportType')?.value || 'General Concern';
    const desc = document.getElementById('reportDesc')?.value || '';

    const subject = encodeURIComponent(`[BENA Report] ${type}`);
    const body = encodeURIComponent(
      `Magandang araw BENA Team,\n\nNais ko pong mag-ulat ng sumusunod na kaganapan/alalahanin:\n\nKategorya: ${type}\n\nDetalye:\n${desc}\n\n(Ligtas at kompidensyal na ulat mula sa BENA Shield Portal)`
    );

    window.location.href = `mailto:safespace.bena@gmail.com?subject=${subject}&body=${body}`;
  });
}
