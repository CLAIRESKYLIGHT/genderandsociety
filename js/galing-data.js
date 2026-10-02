/**
 * BENA — Galing Gallery Data (galing-data.js)
 * =============================================
 * Filterable gallery of notable Filipino women, LGBTQIA+, and indigenous
 * figures. Each entry must include a "bakit mahalaga" note.
 * Categories: Musika | Sayaw | Panitikan | Sining | Agham | Aktibismo | Katutubo
 */

const GALING_DATA = [
  /* ── MUSIKA ────────────────────────────────────────────────────────────── */
  {
    id: "g1",
    name: "Jovita Fuentes",
    category: "Musika",
    years: "1895–1978",
    description: "Operatic soprano na itinuring na 'Queen of Philippine Opera.' Nag-aral sa La Scala sa Milan at naging international na artista sa kabila ng kolonyalidong lipunan. Ipinagpaliban ang kanyang karera sa Europa upang bumalik at ibahagi ang kanyang talento sa mga Pilipino.",
    bakit: "Nagpatunay siya na ang kulturang Pilipino at ang talento ng kababaihang Pilipino ay karapat-dapat sa pinakamarangal na entablado ng mundo — nang walang pag-aayaw at nang may buong pagmamalaki.",
    icon: "🎶",
  },
  {
    id: "g2",
    name: "Kuh Ledesma",
    category: "Musika",
    years: "1958–kasalukuyan",
    description: "Natatanging Original Pilipino Music (OPM) artist, songwriter, at philanthropist. Bukas nang nagtatanggol ng LGBTQIA+ rights at nagpapahayag ng kanyang sarili nang walang takot sa isang lipunang madalas na nagtatago ng ganitong katotohanan.",
    bakit: "Ipinakita niya na ang isang Pilipinang artista ay maaaring maging tagapagtaguyod ng LGBTQIA+ rights sa pamamagitan ng kanyang musika at personal na halimbawa — isang mahalagang huwaran para sa kabataang naghahanap ng kanilang lugar.",
    icon: "🎵",
  },
  {
    id: "g3",
    name: "Mga Babae ng Kulintang (Maranao at Maguindanaon)",
    category: "Musika",
    years: "Bago pa ang kasaysayan",
    description: "Ang mga kababaihang Maranao at Maguindanaon na magpapalabas ng kulintang — ang sagradong hanay ng mga gong na kumakatawan sa pinaka-sopistikadong instrumento ng Timog-Silangang Asya. Ang musika ng kulintang ay ginagamit sa ritwal, selebrasyon, at komunikasyon.",
    bakit: "Pinangangalagaan ng mga kababaihang musikero ang isang tradisyon na mas matanda pa sa lahat ng batas ng Pilipinas — at sa bawat nota ng kulintang, inaalala nila ang mundo bago ang kolonyalismo kung saan ang kababaihan ay may sentral na papel sa espirituwal at kultural na buhay ng komunidad.",
    icon: "🎼",
  },

  /* ── SAYAW ────────────────────────────────────────────────────────────── */
  {
    id: "g4",
    name: "Francisca Reyes Aquino",
    category: "Sayaw",
    years: "1899–1983",
    description: "Itinuring na 'Ina ng Philippine Folk Dance.' Nagsagawa ng comprehensive na pananaliksik ng mga katutubong sayaw ng Pilipinas at iniingatan ang mga ito para sa mga susunod na henerasyon. Ang kanyang trabaho ay naging pundasyon ng kulturang Pilipino sa edukasyon.",
    bakit: "Kung hindi sa kanyang dedikasyon, marami sa ating mga katutubong sayaw — ang mga tanda ng ating pre-kolonyal na kultura at pagkakakilanlan — ay nawawala na. Siya ay nagligtas ng isang mahalagang bahagi ng ating katotohanan bilang Pilipino.",
    icon: "💃",
  },
  {
    id: "g5",
    name: "Alice Reyes",
    category: "Sayaw",
    years: "1942–kasalukuyan",
    description: "Tagapagtatag ng Ballet Philippines noong 1969. Pinagsama niya ang modernong pandaigdigang pananaw ng sayaw sa mga katutubong temang Pilipino, na naglikha ng isang natatangi at makapangyarihang wika ng sining na tanging sa Pilipinas lamang matatagpuan.",
    bakit: "Ipinakita ni Reyes na ang sining ng Pilipinas ay hindi kailangang humanggang-hanga sa Kanluran — maaari itong maging pantay o higit pa, at natatangi sa sariling kakayahan at karanasan.",
    icon: "🩰",
  },

  /* ── PANITIKAN ────────────────────────────────────────────────────────── */
  {
    id: "g6",
    name: "Lorena Barros",
    category: "Panitikan",
    years: "1948–1976",
    description: "Makata, aktibista, at mandirigma na sumali sa National Democratic Front laban sa diktadurang Marcos. Ang kanyang mga tula ay nagbibigay-tinig sa karanasan ng kababaihang nagtatanggol ng karapatang pantao. Pumanaw sa edad na 28 bilang isang simbolo ng tapang at prinsipyo.",
    bakit: "Ipinakita ni Barros na ang panitikan ay hindi lamang para sa estetika — ito ay isang sandata ng kalayaan. Ang kanyang buhay at mga tula ay nagpapatunay na ang isang kababaihan ay maaaring manguna sa pinakamatinding pakikibaka, nang may init ng puso at lakas ng diwa.",
    icon: "✍️",
  },
  {
    id: "g7",
    name: "Lualhati Bautista",
    category: "Panitikan",
    years: "1945–kasalukuyan",
    description: "Kilalang manunulat ng mga nobelang nagsasalita sa karanasan ng kababaihang Pilipino at ng mga marginalized. Ang kanyang mga obra tulad ng 'Gapo' at 'Bata, Bata, Pa'no Ka Ginawa?' ay nagtatakwil ng patriarkal na istruktura ng pamilya at nagbibigay-tinig sa mga babaeng kadalasang pinatahimik.",
    bakit: "Sa pamamagitan ng kanyang mga nobela, ibinibigay ni Bautista ang pagkakataon na makita at makilala ng mga mambabasa ang kanilang sariling karanasan ng pang-aapi — at ipinakita niya na ang panitikan ay isang makapangyarihang kasangkapan ng pagbabago ng lipunan.",
    icon: "📚",
  },
  {
    id: "g8",
    name: "José García Villa",
    category: "Panitikan",
    years: "1908–1997",
    description: "Makatang Pilipino-Amerikano na kilala sa buong mundo bilang isa sa pinakamahalaga at makabagong makata ng ika-20 siglo. Bilang isang bakla na nanirahan nang bukas sa New York, ang kanyang sining ay nagbibigay-tinig sa karanasan ng isang Pilipino na naghahanap ng kalayaan sa sariling pagpapahalaga.",
    bakit: "Ipinakita ni Villa na ang pagiging LGBTQIA+ at pagiging Pilipino ay hindi hadlang sa pandaigdigang tagumpay — at na ang isang tao ay maaaring maging ganap at iginagalang sa pamamagitan ng katapatan sa kanyang sarili.",
    icon: "🌸",
  },

  /* ── SINING ────────────────────────────────────────────────────────────── */
  {
    id: "g9",
    name: "Pacita Abad",
    category: "Sining",
    years: "1946–2004",
    description: "Internationally acclaimed na visual artist na kilala sa kanyang makulay at makapangyarihang mga trapunto paintings. Ginamit niya ang kanyang sining upang talakayin ang panlipunang mga isyu tulad ng karapatan ng kababaihan, karapatan ng mga migrante, at pandaigdigang kalayaan.",
    bakit: "Sa pamamagitan ng kanyang mga obra, ipinakita ni Abad na ang isang kababaihang Pilipino ay maaaring lumikha ng sining na kinikilala at pinupuri sa mga pinaka-prestihiyosong museo ng mundo — at sa bawat trabaho, ipinaalala niya ang ating responsibilidad sa panlipunang katotohanan.",
    icon: "🎨",
  },
  {
    id: "g10",
    name: "Mga Manghahabi ng Mindanao (Kultura ng Inaul at Malong)",
    category: "Sining",
    years: "Bago pa ang kasaysayan",
    description: "Ang mga kababaihang Maranao at iba pang tribong Muslim na nagpapanatili ng sining ng Inaul weaving — isang intricate na paghahabi na ginagamit sa seremonya, kasal, at banal na ritwal. Ang bawat pattern ay naglalaman ng kuwento at kahulugang kultura.",
    bakit: "Ang paghahabi ay hindi lamang kabuhayan — ito ay isang anyo ng kaalaman na ipinasa mula sa ina sa anak sa loob ng libu-libong taon. Ang mga manghahabi ay mga tagapag-alaga ng kasaysayan ng kanilang lahi.",
    icon: "🧵",
  },

  /* ── AGHAM ─────────────────────────────────────────────────────────────── */
  {
    id: "g11",
    name: "Fe Del Mundo",
    category: "Agham",
    years: "1911–2011",
    description: "Unang babaeng nakatanggap ng Order of National Scientists ng Pilipinas at unang babaeng tinanggap sa Harvard Medical School noong 1936. Itinatag ang unang pediatric hospital sa Pilipinas na pananatili ng libreng serbisyo para sa mga mahihirap na pamilya.",
    bakit: "Patunay na ang isang kababaihang Pilipino ay maaaring maging pinakamahusay sa buong mundo sa isang larangang kinalaban sa kababaihan — at na ang tagumpay ay mas mahalaga kapag ginagamit ito para sa kapakanan ng pinakamahinang miyembro ng lipunan.",
    icon: "🔬",
  },
  {
    id: "g12",
    name: "Edna Ocampo-Friedman",
    category: "Agham",
    years: "1956–kasalukuyan",
    description: "Natatanging marine biologist na nag-aambag sa pag-aaral ng coral reef ecosystems ng Pilipinas. Bahagi ng pandaigdigang pangkat ng mga siyentipiko na nagtatrabaho para sa pangangalaga ng biodiversity ng Coral Triangle — ang pinakamahalaga at pinakamayamang marine ecosystem sa mundo.",
    bakit: "Ang kababaihang siyentipiko tulad ni Ocampo-Friedman ay nagpapatunay na ang pag-aalaga sa kapaligiran at agham ay hindi eksklusibong larangan ng mga lalaki, at na ang kaalaman ng kababaihan ay mahalaga sa pag-unawa sa ating mundo.",
    icon: "🌊",
  },

  /* ── AKTIBISMO ──────────────────────────────────────────────────────────── */
  {
    id: "g13",
    name: "Gabriela Cariño Silang",
    category: "Aktibismo",
    years: "1731–1763",
    description: "Ilokana na namuno sa himagsikan laban sa Espanyol pagkatapos ng kamatayan ng kanyang asawang si Diego Silang. Ang kanyang tapang sa harap ng malakas na kaaway ay naging simbolo ng kababaihan bilang tagapamuno ng pagtatanggol ng bayan.",
    bakit: "Si Gabriela Silang ay patunay na bago pa naging senador ang mga babae, bago pa naging pangulo ang isang babae — ang mga kababaihang Pilipino ay nanguna na sa pinakamatinding pakikipaglaban para sa kalayaan ng kanilang bansa.",
    icon: "⚔️",
  },
  {
    id: "g14",
    name: "Melchora Aquino (Tandang Sora)",
    category: "Aktibismo",
    years: "1812–1919",
    description: "Kilala bilang 'Ina ng Himagsikan,' naglilingkod siya sa mga katipunero bilang tagapagbigay ng pagkain, shelter, at pag-aalaga ng sugatan. Noong siya ay huliin ng mga Espanyol sa edad na 84, tumanggi siyang isalin ang mga rebolusyonaryong lider. Siya ay inidestiyero sa Guam ngunit nakabalik sa Pilipinas pagkatapos ng Rebolusyon.",
    bakit: "Ang kanyang tapang sa harap ng kaaway — nang walang sandata kundi ang kanyang dignidad at katahimikan — ay nagpakita na ang lakas ng kababaihan ay hindi nangangailangan ng sandata upang maging makapangyarihan.",
    icon: "🕯️",
  },
  {
    id: "g15",
    name: "Leila de Lima",
    category: "Aktibismo",
    years: "1959–kasalukuyan",
    description: "Dating Senador at tagapagtaguyod ng karapatang pantao na nakakulong nang maraming taon dahsa sa kanyang bukas na pakikipaglaban laban sa extrajudicial killings. Ipinagpatuloy niya ang kanyang trabaho bilang senador mula sa loob ng kulungan.",
    bakit: "Ang kanyang sitwasyon ay halimbawa ng interseksyonalidad — bilang isang babaeng may matapang na boses, natuklasan niya ang mas matinding pagtutol at pag-atake kaysa sa maraming kalalakihang katrabaho niya. Ang kanyang pagtitiis ay simbolo ng lakas ng kababaihan sa harap ng pampulitikang pang-aapi.",
    icon: "⚖️",
  },
  {
    id: "g16",
    name: "Mga miyembro ng GABRIELA at Liwanag",
    category: "Aktibismo",
    years: "1984–kasalukuyan",
    description: "Ang GABRIELA National Alliance ay isang kilusan ng mahigit isang daang organisasyon ng kababaihan sa Pilipinas na nagtataguyod ng karapatan ng kababaihang manggagawa, magsasaka, at LGBTQIA+. Ang Liwanag ay isa sa mga youth wing nito.",
    bakit: "Ang organisadong aktibismo ng kababaihan — hindi lamang ng isang heroine, kundi ng libu-libo — ang nagbabago ng kultura at patakaran. Ang kolektibong tinig ng kababaihan ay mas makapangyarihan kaysa sa anumang indibidwal.",
    icon: "✊",
  },

  /* ── KATUTUBO ───────────────────────────────────────────────────────────── */
  {
    id: "g17",
    name: "Mga Babaylan ng Visayas at Mindanao (Kolektibo)",
    category: "Katutubo",
    years: "Ika-16 na siglo pababa",
    description: "Ang pangkat ng espirituwal na mga lider ng katutubong komunidad ng Visayas at Mindanao — mga babae at Asog/Bayoguin — na naglilingkod bilang manggagamot, tagapamagitan sa mundo ng espiritu, at tagapayong panlipunan ng buong barangay.",
    bakit: "Ang mga Babaylan ay ang pinakamatandang patunay na ang Pilipinas ay mayroon nang sistema ng pagrespeto sa kababaihan at gender-diverse na mga tao — bago pa man dumating ang anumang kolonyalismo o relihiyong banyaga.",
    icon: "👑",
  },
  {
    id: "g18",
    name: "Apo Whang-Od (Maria Oggay)",
    category: "Katutubo",
    years: "c. 1920–kasalukuyan",
    description: "Ang pinakamatandang buhay na mambabatok (tattoo artist) ng Pilipinas mula sa tribo ng Butbut sa Kalinga. Ang kanyang sining ng tattoo ay isang banal na tradisyon na nagmamarka ng kasaysayan, katayuan, at pagkakakilanlan ng isang miyembro ng komunidad.",
    bakit: "Sa pamamagitan ni Apo Whang-Od, makikita natin ang isang kababaihang katutubong nagtataglay ng sining na libu-libong taon ang edad — at na ang tradisyonal na kaalaman ng kababaihan ay hindi dapat tuluyang mawala sa alon ng modernisasyon.",
    icon: "🪶",
  },
  {
    id: "g19",
    name: "Mga Kababaihang Aeta ng Pampanga",
    category: "Katutubo",
    years: "Pre-historya–kasalukuyan",
    description: "Ang mga kababaihang Aeta ay kilala sa kanilang kaalaman sa herbal medicine, sa pangangalikha ng kalikasan, at sa kakayahang mamuno sa kanilang komunidad — kasama ang mga papel bilang mangingisda, mangangaso, at spiritual healer.",
    bakit: "Ang mga kababaihang Aeta ay nagpapatunay na ang pantay na participasyon ng kasarian sa lahat ng aspeto ng buhay — trabaho, lidershipan, espirituwal na buhay — ay hindi isang modernong ideya, kundi isang katutubong katotohanan ng maraming grupo bago pa ang kolonyalismo.",
    icon: "🌿",
  },
];

/* Babaylan Spotlight Section */
const BABAYLAN_SPOTLIGHT = {
  title: "Ang Babaylan: Espirituwal na Lider ng Sinaunang Pilipinas",
  intro: "Sa bawat barangay bago ang ika-16 na siglo, ang Babaylan (o Catalonan) ang pinakamahalaga at pinakarespetadong tao — hindi dahil sa kanilang lahi o pamilya, kundi dahil sa kanilang espirituwal na kaalaman at pag-aalaga ng komunidad.",
  facts: [
    "Ang karamihan sa mga Babaylan ay mga kababaihan, ngunit ang mga lalaking nagbihis at kumilos bilang babae (Asog/Bayoguin) ay maaari ring maging Babaylan — at itinuturing silang may dalawang-mundo na kapangyarihan.",
    "Ang mga Babaylan ay gumanap bilang: manggagamot (gamit ang herbal at ritwal na pamamaraan), tagapamagitan sa mga espiritu at anito, tagapayong panlipunan, at tagaplano ng mga selebrasyon at ritwal ng komunidad.",
    "Ang kanilang awtoridad ay higit pa sa anumang pangkat ng lalaki — kahit mga mandirigmang Datu ay kumukonsulta sa Babaylan bago pumasok sa digmaan o gumawa ng mahahalagang desisyon.",
    "Ang unang sistematikong pagsupil sa mga Babaylan ay nagsimula nang dumating ang mga Espanyol at ang Simbahang Katoliko, na nagtawag sa kanila na 'mga alagad ng diyablo' at 'mga bruha.' Sa loob ng ilang daang taon, mula sa iginagalang na lider ay naging takot na nilalang ang imahe ng Babaylan sa isipan ng maraming Pilipino.",
    "Ngayon, ang Babaylan ay muling nabibigyan ng dangal sa pamamagitan ng academic scholarship, indigenous peoples' rights advocacy, at mga organisasyon tulad ng Babaylan Network na nagtataguyod ng katutubong espiritwalidad at gender justice.",
  ],
};

if (typeof module !== "undefined") module.exports = { GALING_DATA, BABAYLAN_SPOTLIGHT };
