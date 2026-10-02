/**
 * BENA — Aralin Data (aralin-data.js)
 * =====================================
 * 10 lessons on Gender & Society with Filipino pre-colonial heritage context.
 * Each lesson: 200–400 words of body text, key concept callout, reflection
 * question, and 3-item multiple-choice quiz with instant feedback.
 * Superscript citations link to /js/references.js.
 */

const ARALIN_DATA = [
  /* ====================================================================== */
  /* L1: Ang Babaylan at ang Katutubong Pagkakapantay                       */
  /* ====================================================================== */
  {
    id: "L1",
    num: 1,
    title: "Ang Babaylan at ang Katutubong Pagkakapantay",
    icon: "👑",
    summary: "Ang espirituwal at panlipunang gampanin ng kababaihan at Asog bago ang ika-16 na siglo.",
    refs: [1, 2, 3, 4],
    body: `<p>Sa sinaunang Pilipinas, bago dumating ang mga Espanyol noong 1565, ang lipunan ay nayari sa mga <em>barangay</em> — maliliit na komunidad na pinamumunuan ng mga <em>Datu</em> at <em>Rajah</em>. Ngunit sa espirituwal na mundo ng bawat barangay, ang pinakamataas na awtoridad ay kadalasang isang babae — ang <strong>Babaylan</strong>.<sup><a href="#ref1" class="ref-anchor" title="Brewer, 1999">[1]</a></sup></p>

<p>Ang <em>Babaylan</em> (tinatawag ding <em>Katalonan</em> sa Tagalog na rehiyon) ay naglilingkod bilang manggagamot, tagapamagitan sa mga espiritu (<em>anito</em>), at tagapayong panlipunan. Ang kanilang awtoridad ay hindi galing sa pisikal na lakas, kundi sa karunungan at espirituwal na koneksyon.<sup><a href="#ref2" class="ref-anchor" title="Scott, 1994">[2]</a></sup></p>

<p>Natatangi sa sistemang ito ang papel ng mga <strong>Asog</strong> o <strong>Bayoguin</strong> — ang mga lalaking nagdamit at kumilos bilang babae at tumupad sa banal na papel ng Babaylan. Hindi sila itinuring na kakaiba o kahiya-hiya; sa katunayan, pinaniniwalaan ng komunidad na ang kanilang kakayahang hawakan ang dalawang daigdig (ng lalaki at babae) ay nagbibigay sa kanila ng espesyal na espirituwal na lakas.<sup><a href="#ref4" class="ref-anchor" title="Alcina, 1668">[4]</a></sup></p>

<p>Ang mga kababaihang Pilipino noon ay may karapatang magmay-ari ng lupa, magnegosyo, at magdiborsiyo. Sa mga tala ng mga unang manlalayag at misyonerong Espanyol, makikita na nagulat sila sa pagkakapantay-pantay ng mga kasarian sa mga barangay.<sup><a href="#ref2" class="ref-anchor" title="Scott, 1994">[2]</a></sup> Ito ang katotohanang kadalasang tinatago ng kasaysayang kolonyal: <strong>ang ating mga ninuno ay namuhay sa isang lipunang may pantay na dignidad.</strong></p>

<p>Ang pagdating ng kolonyalismo ay paunti-unting binago ang larawang ito. Itinuro ng mga misyonero ang isang patriarkal na pananaw ng simbahan, at sistematikong sinupil ang mga Babaylan, na tinatawag na "mga bruha" at "mga alagad ng diyablo." Sa loob ng ilang henerasyon, nalimutan ng marami sa atin ang ating sariling kasaysayan ng pagkakapantay.</p>`,
    callout: {
      label: "Pangunahing Konsepto",
      text: "Ang <strong>Babaylan</strong> ay ang sinaunang espirituwal na lider ng barangay — madalas na babae o Asog — na nagtataglay ng awtoridad sa medisina, ritwal, at panlipunang pagpapasya. Hindi ito mito; ito ay nakatala sa mga kolonyayal na dokumento ng ika-16 hanggang ika-17 siglo.",
    },
    reflection: "Bakit sa palagay mo ay kinailangan ng mga kolonisador na sirain ang imahe ng Babaylan? Ano ang mawawala sa kanila kung kinikilala ng mga tao ang dating kapangyarihan ng kababaihan?",
    quiz: [
      {
        q: "Ano ang tawag sa espirituwal na lider ng barangay na madalas na babae o gender-fluid na tao?",
        choices: ["Datu", "Babaylan", "Rajah", "Panginoon"],
        correct: 1,
        explanation: "Ang Babaylan (o Katalonan sa Tagalog) ang espirituwal na lider ng sinaunang barangay. Sila ang manggagamot, tagapamagitan sa mga espiritu, at tagapayong panlipunan ng komunidad.",
      },
      {
        q: "Ang mga Asog o Bayoguin ay itinuturing na anong espesyal sa sinaunang lipunang Pilipino?",
        choices: [
          "Mga pinagbawalan at pinagsamantalahan",
          "Mga karaniwang miyembro ng pamayanan",
          "Mga may espesyal na espirituwal na lakas dahil sa kakayahang hawakan ang dalawang daigdig",
          "Mga kriminal ayon sa batas ng barangay",
        ],
        correct: 2,
        explanation: "Ang mga Asog/Bayoguin ay itinuturing na may espesyal na espirituwal na kapangyarihan dahil sa kanilang kakayahang hawakan ang dalawang daigdig — ng lalaki at babae. Sila ay iginagalang, hindi hinahamak.",
      },
      {
        q: "Sino ang unang nagpakilala ng patriarkal na pananaw na nagpaliit sa papel ng kababaihan sa Pilipinas?",
        choices: [
          "Ang mga sinaunang Datu",
          "Ang mga Espanyol na kolonisador at misyonero",
          "Ang mga Intsik na mangangalakal",
          "Ang mga katutubong grupo sa kabundukan",
        ],
        correct: 1,
        explanation: "Ang mga Espanyol na kolonisador at misyonerong Kristiyano ang nagpasok ng patriarkal na pananaw ng Simbahan at sistematikong sinupil ang mga Babaylan, na tinatawag silang 'mga bruha.'",
      },
    ],
  },

  /* ====================================================================== */
  /* L2: SOGIESC — Wika, Pagkakakilanlan, at Katotohanan                   */
  /* ====================================================================== */
  {
    id: "L2",
    num: 2,
    title: "SOGIESC: Wika, Pagkakakilanlan, at Katotohanan",
    icon: "🌈",
    summary: "Bakit likas na gender-neutral ang wikang Filipino at paano ito nagtatanggol sa bawat tao.",
    refs: [9, 13, 21, 23],
    body: `<p>Ang termino <strong>SOGIESC</strong> — Sexual Orientation, Gender Identity and Expression, and Sex Characteristics — ay maaaring mukhang bagong konsepto para sa ilan, ngunit ang realidad na kinakatawan nito ay matagal nang bahagi ng karanasang Pilipino.<sup><a href="#ref13" class="ref-anchor" title="Garcia, 1996">[13]</a></sup></p>

<p><strong>Sexual Orientation</strong> ay tumutukoy sa kung kanino ka naakit — emosyonal, romantiko, o sekswal. Maaari itong maging sa kabalbal na kasarian (<em>heterosexual</em>), sa kapareho (<em>homosexual</em>), sa dalawa o higit (<em>bisexual</em>), o walang atraksyon (<em>asexual</em>), bukod sa iba pa.</p>

<p><strong>Gender Identity</strong> ay ang iyong panloob na karanasan ng iyong kasarian — kung paano mo nararamdaman sa iyong sarili ang pagiging babae, lalaki, non-binary, o iba pa. Ito ay naiiba sa iyong biological sex.</p>

<p><strong>Gender Expression</strong> ay kung paano mo ipinakikita ang iyong kasarian sa labas — sa damit, sa kilos, sa paraan ng pagsasalita. Walang tamang o maling paraan ng pagpapahayag ng kasarian.</p>

<p><strong>Sex Characteristics</strong> ay tumutukoy sa iyong pisikal na katangian — kromosom, hormona, reproductive organs. Ang mga taong ipinanganak na may hindi tipikal na sex characteristics ay tinatawag na <em>intersex</em>.<sup><a href="#ref21" class="ref-anchor" title="Yogyakarta Principles, 2007">[21]</a></sup></p>

<p>Ang napakagandang katotohanan ay ito: ang <strong>wikang Filipino ay likas na gender-neutral</strong>. Ang "Siya" at "Kanya" ay hindi nagtatangi ng kasarian — ito ay kabaligtaran ng Ingles na "he/she." Ipinapakita ng linggwistang ito na ang ating mga ninunong nagsalita ng Tagalog, Bisaya, Ilokano, at iba pang wika ay lumago sa isang mundo kung saan ang kasarian ay hindi ang pangunahing identifier ng isang tao — ang pagkatao at ang relasyon sa kapwa ang mas mahalaga.<sup><a href="#ref9" class="ref-anchor" title="Butler, 1990">[9]</a></sup></p>`,
    callout: {
      label: "Pangunahing Konsepto: SOGIESC",
      text: "<strong>S</strong>exual Orientation · <strong>G</strong>ender Identity · <strong>E</strong>xpression · <strong>S</strong>ex <strong>C</strong>haracteristics. Ang bawat bahagi ay hiwalay at independiyenteng aspeto ng pagkakakilanlan. Ang isang tao ay maaaring heterosexual ngunit transgender — ang sexual orientation at gender identity ay magkaibang mga konsepto.",
    },
    reflection: "Sa iyong araw-araw na buhay, may naranasan ka na bang situasyon kung saan inaasahan ng lipunan na kumilos ka ayon sa isang nakatakdang papel batay sa iyong kasarian? Paano ito nakaapekto sa iyo?",
    quiz: [
      {
        q: "Ano ang ibig sabihin ng 'G' sa SOGIESC?",
        choices: [
          "General (pangkalahatan)",
          "Gender Identity and Expression",
          "Genetic characteristics",
          "Group orientation",
        ],
        correct: 1,
        explanation: "Ang 'G' sa SOGIESC ay tumutukoy sa Gender Identity and Expression — ang iyong panloob na karanasan ng kasarian at kung paano mo ito ipinakikita sa labas.",
      },
      {
        q: "Bakit sinasabing ang wikang Filipino ay likas na gender-neutral?",
        choices: [
          "Dahil ang mga Pilipino ay gender-blind at hindi kumikikilala sa kasarian",
          "Dahil ang 'Siya' at 'Kanya' ay hindi nagtatangi ng kasarian, hindi tulad ng Ingles na 'he/she'",
          "Dahil walang salita para sa babae o lalaki sa Tagalog",
          "Dahil ito ay isinulat ng mga LGBTQIA+ na aktibista",
        ],
        correct: 1,
        explanation: "Ang mga third-person pronouns ng Filipino tulad ng 'Siya' at 'Kanya' ay gender-neutral — hindi nila tinutukoy kung lalaki o babae ang tinutukoy, kabaligtaran ng Ingles na 'he' o 'she.' Ito ay nagpapakita ng likas na inklusibidad ng ating wika.",
      },
      {
        q: "Ang isang taong ipinanganak na may hindi tipikal na sex characteristics ay tinatawag na?",
        choices: ["Transgender", "Non-binary", "Intersex", "Asexual"],
        correct: 2,
        explanation: "Ang 'intersex' ay tumutukoy sa mga taong ipinanganak na may sex characteristics (kromosom, hormona, o anatomy) na hindi eksaktong akma sa tipikal na kahulugan ng lalaki o babae. Ito ay isang natural na biological na pagkakaiba.",
      },
    ],
  },

  /* ====================================================================== */
  /* L3: Mga Batas at Proteksyon — Safe Spaces Act, Anti-VAWC, Magna Carta */
  /* ====================================================================== */
  {
    id: "L3",
    num: 3,
    title: "Mga Batas at Proteksyon: Safe Spaces Act, Anti-VAWC, at Magna Carta of Women",
    icon: "⚖️",
    summary: "Ang RA 11313, RA 9262, RA 9710, at ang laban para sa SOGIE Equality Bill.",
    refs: [16, 17, 18, 19, 22],
    body: `<p>Ang Pilipinas ay may isa sa mga pinaka-komprehensibong batas para sa proteksyon ng kababaihan at LGBTQIA+ sa Asya. Ang pag-unawa sa mga batas na ito ay isang mahalagang bahagi ng pagiging isang gender-sensitive na mamamayan.<sup><a href="#ref17" class="ref-anchor" title="RA 9710">[17]</a></sup></p>

<p>Ang <strong>Republic Act 9262 — Anti-Violence Against Women and Their Children Act of 2004 (Anti-VAWC)</strong> ay nagtatakda ng kriminal na parusa para sa pisikal, sekswal, sikolohikal, at ekonomikong karahasan laban sa mga kababaihan at kanilang mga anak. Kasama rito ang karahasan sa loob ng pamilya o intimate relationship.<sup><a href="#ref16" class="ref-anchor" title="RA 9262">[16]</a></sup></p>

<p>Ang <strong>Republic Act 9710 — Magna Carta of Women (2009)</strong> ay nagtatakda ng komprehensibong karapatan ng kababaihan sa edukasyon, trabaho, kalusugan, at pampulitikang partisipasyon. Inuutos nito sa lahat ng government offices na magpatupad ng gender mainstreaming.<sup><a href="#ref17" class="ref-anchor" title="RA 9710">[17]</a></sup></p>

<p>Ang <strong>Republic Act 11313 — Safe Spaces Act o "Bawal Bastos" Law (2019)</strong> ay nagbabawal sa gender-based sexual harassment sa mga pampublikong lugar, online, at sa mga institusyon tulad ng paaralan at trabaho. Binibigyan nito ng depinisyon ang mga bastos na komento, cat-calling, at online harassment batay sa kasarian.<sup><a href="#ref18" class="ref-anchor" title="RA 11313">[18]</a></sup></p>

<p>Sa antas ng internasyonal, ang <strong>Yogyakarta Principles (2007)</strong> ay nagbibigay ng komprehensibong gabay kung paano ang international human rights law ay naaangkop sa sexual orientation at gender identity. Ito ay kinikilala ng Commission on Human Rights ng Pilipinas.<sup><a href="#ref21" class="ref-anchor" title="Yogyakarta Principles">[21]</a></sup></p>

<p>Ang <strong>SOGIE Equality Bill</strong> ay isang panukala na nagbabawal ng diskriminasyon batay sa sexual orientation, gender identity, at expression. Sa kabila ng matagal na pag-aaral sa Kongreso, hindi pa ito naitatanggap. Ang kilusan para dito ay nagpapatuloy, pinamumunuan ng mga aktibistang LGBTQIA+ at kanilang mga kaalyado sa buong bansa.</p>`,
    callout: {
      label: "Mahalagang Batas na Dapat Malaman",
      text: "• <strong>RA 9262</strong> — Anti-VAWC (2004)<br>• <strong>RA 9710</strong> — Magna Carta of Women (2009)<br>• <strong>RA 11313</strong> — Safe Spaces Act / Bawal Bastos (2019)<br>• <strong>RA 7877</strong> — Anti-Sexual Harassment Act (1995)<br>Lahat ng batas na ito ay nagbibigay ng proteksyon na karapatan ng bawat Pilipino.",
    },
    reflection: "Mayroon ka bang kakilala o karanasan na nakaranas ng gender-based harassment? Sa iyong palagay, ano ang hadlang sa pag-uulat ng ganitong mga kaso sa Pilipinas?",
    quiz: [
      {
        q: "Anong batas ang nagbabawal sa cat-calling at gender-based online harassment sa Pilipinas?",
        choices: [
          "RA 9262 — Anti-VAWC",
          "RA 9710 — Magna Carta of Women",
          "RA 11313 — Safe Spaces Act",
          "RA 7877 — Anti-Sexual Harassment Act",
        ],
        correct: 2,
        explanation: "Ang RA 11313 o Safe Spaces Act (Bawal Bastos Law, 2019) ang nagbabawal sa gender-based sexual harassment sa mga pampublikong lugar at online. Saklaw nito ang cat-calling, wolf-whistling, at bastos na komento batay sa kasarian.",
      },
      {
        q: "Ang Magna Carta of Women (RA 9710) ay pangunahing tungkol sa?",
        choices: [
          "Kriminal na parusa para sa karahasan sa loob ng pamilya",
          "Komprehensibong karapatan ng kababaihan sa edukasyon, trabaho, at kalusugan",
          "Pagbabawal sa diskriminasyon batay sa sexual orientation",
          "Proteksyon ng mga bata mula sa human trafficking",
        ],
        correct: 1,
        explanation: "Ang RA 9710 o Magna Carta of Women (2009) ay nagtatakda ng komprehensibong karapatan ng kababaihan sa iba't ibang larangan — edukasyon, trabaho, kalusugan, at pampulitikang partisipasyon — at inuutos sa lahat ng government offices na mag-implement ng gender mainstreaming.",
      },
      {
        q: "Ang SOGIE Equality Bill sa Pilipinas ay?",
        choices: [
          "Matagal nang naisabatas at ganap na nagpapatupad",
          "Isang panukala na nagbabawal ng diskriminasyon batay sa sexual orientation at gender identity, na hindi pa naisasabatas",
          "Isang international treaty na awtomatikong naaangkop sa Pilipinas",
          "Isang pamantasan-antas na polisiya lamang",
        ],
        correct: 1,
        explanation: "Ang SOGIE Equality Bill ay isang panukalang-batas na nagbabawal ng diskriminasyon batay sa sexual orientation, gender identity, at expression. Matagal na itong pinag-aaralan sa Kongreso ng Pilipinas ngunit hindi pa naisasabatas sa kabila ng matinding pagtataguyod ng mga LGBTQIA+ grupo.",
      },
    ],
  },

  /* ====================================================================== */
  /* L4: Interseksyonalidad — Kasarian, Lahi, at Klase                     */
  /* ====================================================================== */
  {
    id: "L4",
    num: 4,
    title: "Interseksyonalidad: Kasarian, Lahi, at Klase",
    icon: "🔗",
    summary: "Paano nagtatagpo ang kasarian, lahi, klase, at iba pang aspeto ng pagkakakilanlan upang lumikha ng kumplikadong karanasan ng pribilehiyo at oppression.",
    refs: [10, 11, 15, 33],
    body: `<p>Noong 1989, ipinakilala ng abogadong si <strong>Kimberlé Crenshaw</strong> ang konsepto ng <em>intersectionality</em> — ang ideya na ang mga sistema ng pang-aapi (oppression) at pribilehiyo ay hindi gumagana nang hiwalay, kundi nagtatagpo at nagpapalakas sa isa't isa.<sup><a href="#ref10" class="ref-anchor" title="Crenshaw, 1989">[10]</a></sup></p>

<p>Para sa mga Pilipino, ang interseksyonalidad ay napakahalaga. Halimbawa, ang karanasan ng isang <em>Pilipinang manggagawa sa bahay sa ibang bansa</em> ay hindi lamang naaapektuhan ng kanyang kasarian — naaapektuhan din siya ng kanyang nasyonalidad, klase, at katayuan bilang migrant worker.<sup><a href="#ref15" class="ref-anchor" title="Parreñas, 2001">[15]</a></sup> Ang presyon na magreklamo ng sekswal na harassment ay mas mababa dahil natatakot siyang mawalan ng trabaho at maideporta.</p>

<p>Ang isang Pilipinang mula sa isang mahirap na pamilya na nagtry na mag-file ng VAWC case ay nangangarap ding mahatulan ang abuser, ngunit walang pera para sa abogado, takot sa sosyal na stigma ng pakikipagdiborsiyo, at walang ligtas na lugar na mapupuntahan. Ang kasarian lamang ang hindi buong-buo na nagpapaliwanag ng kanyang sitwasyon — ang klase, ang lokasyon, ang kultura ng kanyang lugar, at ang suporta ng kanyang pamilya ay magkasamang gumagawa ng kumplikadong sitwasyon.</p>

<p>Para sa mga LGBTQIA+ Pilipino, ang interseksyonalidad ay nagpapakita ng iba't ibang antas ng marginalidad. Ang isang bakla mula sa mayamang pamilya ay maaaring mas ligtas sa kanyang pagkakakilanlan kaysa sa isang bakla mula sa konserbatibong lalawigan na mahirap ang pamilya — kahit parehong may parehong SOGIESC.<sup><a href="#ref33" class="ref-anchor" title="Mendoza, 2002">[33]</a></sup></p>

<p>Ang pag-unawa sa interseksyonalidad ay tumutulong sa atin na <strong>iwasan ang iisang paraan ng pagtingin sa kasarian</strong> — ang tinatawag na "single-axis framework." Ang tunay na pagtataguyod ng karapatan ay kailangang makilala ang bawat tao sa kanyang buong karanasan, hindi lamang sa isang aspeto ng kanyang pagkakakilanlan.</p>`,
    callout: {
      label: "Pangunahing Konsepto: Interseksyonalidad",
      text: "Ang <strong>interseksyonalidad</strong> ay ang paraan ng pag-unawa kung paano ang maraming aspeto ng pagkakakilanlan ng isang tao — kasarian, lahi, klase, kapansanan, sekswalidad, edad — ay nagtatagpo upang lumikha ng natatanging karanasan ng pribilehiyo o diskriminasyon. Walang single-axis na pagpapaliwanag ang sapat para sa kumplikadong karanasan ng tao.",
    },
    reflection: "Isipin ang isang sitwasyon sa iyong komunidad kung saan ang isang tao ay nakakaranas ng maraming anyo ng diskriminasyon nang sabay-sabay. Paano nakakatulong ang konsepto ng interseksyonalidad sa pag-unawa sa kanyang karanasan?",
    quiz: [
      {
        q: "Sino ang nagpasimuno ng konsepto ng intersectionality?",
        choices: ["Judith Butler", "Kimberlé Crenshaw", "bell hooks", "Gloria Anzaldúa"],
        correct: 1,
        explanation: "Si Kimberlé Crenshaw, isang African-American na legal scholar at aktibista, ang nagpakilala ng konsepto ng intersectionality noong 1989 upang ipaliwanag kung paano ang lahi at kasarian ay magkasamang nakakaapekto sa karanasan ng Black na kababaihan sa sistematikong diskriminasyon.",
      },
      {
        q: "Ang interseksyonalidad ay nagtuturo na?",
        choices: [
          "Ang kasarian lamang ang pinakamahalagang salik sa diskriminasyon",
          "Ang mga sistema ng pang-aapi ay nagtatagpo at nagpapalakas sa isa't isa",
          "Ang lahat ng babae ay may parehong karanasan ng oppression",
          "Ang klase at lahi ay mas mahalaga kaysa kasarian",
        ],
        correct: 1,
        explanation: "Ang interseksyonalidad ay nagtuturo na ang mga sistema ng pang-aapi (batay sa kasarian, lahi, klase, atbp.) ay hindi gumagana nang hiwalay — nagtatagpo at nagpapalakas ang mga ito sa isa't isa, na lumilikha ng natatanging at kumplikadong karanasan para sa bawat tao.",
      },
      {
        q: "Bakit mahalaga ang pag-unawa sa interseksyonalidad para sa isang gender at society na kurso?",
        choices: [
          "Dahil lahat ng tao ay may parehong karanasan ng kasarian",
          "Dahil tumutulong ito sa atin na makita ang buong karanasan ng isang tao, hindi lamang isang aspeto",
          "Dahil pinasimple nito ang mga kumplikadong sitwasyon ng diskriminasyon",
          "Dahil ito ay isang batas na dapat sundin ng lahat",
        ],
        correct: 1,
        explanation: "Ang interseksyonalidad ay tumutulong sa atin na makilala ang bawat tao sa kanyang buong karanasan — kasama ang kanyang kasarian, lahi, klase, kapansanan, at iba pa — upang mas epektibong makatulong at magtanggol sa kanilang karapatan.",
      },
    ],
  },

  /* ====================================================================== */
  /* L5: Patriarkiya at ang Pagtatatag nito sa Lipunang Pilipino            */
  /* ====================================================================== */
  {
    id: "L5",
    num: 5,
    title: "Patriarkiya at ang Pagtatatag nito sa Pilipinas",
    icon: "🏛️",
    summary: "Paano naitatag ang patriarkiya sa pamamagitan ng kolonyalismo at relihiyon, at ang mga paraan ng paglaban nito.",
    refs: [1, 7, 14, 11],
    body: `<p>Ang <em>patriarkiya</em> ay isang sistemang panlipunan kung saan ang mga lalaki ang may hawak ng pangunahing kapangyarihan sa pampublikong at pribadong buhay — sa politika, sa ekonomiya, at sa pamilya. Sa Pilipinas, hindi ito likas o natural — ito ay isinangkap sa pamamagitan ng mahabang proseso ng kolonisasyon.<sup><a href="#ref7" class="ref-anchor" title="Rafael, 1988">[7]</a></sup></p>

<p>Ayon sa historiador na si William Henry Scott, ang pre-kolonyal na lipunang Pilipino ay hindi ganap na patriarkal.<sup><a href="#ref2" class="ref-anchor" title="Scott, 1994">[2]</a></sup> Ang kababaihan ay may karapatan sa ari-arian, maaaring manguna sa ritwal at negosyo, at ang divorce ay posible para sa dalawang kasarian. Ngunit nang dumating ang mga Espanyol, dinala nila ang isang sistema ng pamilya batay sa Kristiyanong patriarkal na pananaw — ang babae ay dapat na "ina at asawa" lamang, ang lalaki ang pinuno ng sambahayan.</p>

<p>Ang kasabihang <em>"Ang babae ay para sa loob ng bahay"</em> at ang konseptong <em>marianismo</em> — ang mithiin ng kababaihang maging katulad ni Birhen Maria, mapagsakripisyo at maamo — ay mga produkto ng kolonyal na pagpapahalaga, hindi ng katutubong kultura.<sup><a href="#ref1" class="ref-anchor" title="Brewer, 1999">[1]</a></sup></p>

<p>Ngunit ang patriarkiya ay hindi lamang nakakaapekto sa kababaihan. Nakakasakit din ito sa mga kalalakihan sa pamamagitan ng <em>toxic masculinity</em> — ang maling pananaw na ang "tunay na lalaki" ay hindi umiiyak, hindi humingi ng tulong, at dapat palaging matapang. Ito ay isang napakabigat na pasanin na humahantong sa mas mataas na antas ng suicide at mental health issues sa mga lalaki.<sup><a href="#ref14" class="ref-anchor" title="Tolentino, 1996">[14]</a></sup></p>

<p>Ang paglaban sa patriarkiya ay hindi paglaban sa mga lalaki — ito ay paglaban sa isang <em>sistema</em> na nagpapahirap sa lahat ng kasarian. Ang <em>feminismo</em>, sa wastong kahulugan nito, ay ang paniniwala sa panlipunan, pampulitika, at ekonomikong pagkakapantay ng lahat ng kasarian.<sup><a href="#ref11" class="ref-anchor" title="hooks, 2000">[11]</a></sup></p>`,
    callout: {
      label: "Pangunahing Konsepto: Patriarkiya at Toxic Masculinity",
      text: "<strong>Patriarkiya</strong> — sistema ng lipunan kung saan ang mga lalaki ang may hawak ng pangunahing kapangyarihan. <strong>Toxic masculinity</strong> — ang makasama, mapanira, o mapanakit na mga pamantayan ng pagiging lalaki na itinuturing ng kulturang mas malawak na 'normal.' Parehong nakakasamala sa lahat ng kasarian.",
    },
    reflection: "Sa iyong pamilya o komunidad, may nakita ka bang halimbawa ng inaasahang ugali batay sa kasarian (halimbawa, ang inaasahang gawaing bahay para sa babae, o ang inaasahang pagiging 'malakas' para sa lalaki)? Paano nakakaapekto ito sa lahat?",
    quiz: [
      {
        q: "Ang patriarkiya sa Pilipinas ay?",
        choices: [
          "Bahagi ng orihinal at likas na kultura ng mga sinaunang Pilipino",
          "Pangunahing isinangkap sa pamamagitan ng kolonisasyon at relihiyon",
          "Isang konsepto na nagmula sa mga LGBTQIA+ grupo",
          "Isang sistemang tanging nakakaapekto sa ekonomiya lamang",
        ],
        correct: 1,
        explanation: "Ang patriarkiya ay hindi likas sa pre-kolonyal na kultura ng Pilipinas. Ito ay pangunahing isinangkap sa pamamagitan ng Espanyol na kolonisasyon at ng Kristiyanong patriarkal na pananaw ng Simbahan, na sistematikong binago ang orihinal na mas egalitaryan na lipunan.",
      },
      {
        q: "Ang 'toxic masculinity' ay nakakaapekto sa?",
        choices: [
          "Mga kababaihan lamang",
          "Mga LGBTQIA+ na tao lamang",
          "Lahat ng kasarian, kasama na ang mga lalaking nagdurusa sa maling pamantayan ng 'pagiging lalaki'",
          "Mga batang lalaki lamang",
        ],
        correct: 2,
        explanation: "Ang toxic masculinity ay nakakaapekto sa lahat — sa kababaihan na napipigilan at naaapi, at sa mga lalaking nagdurusa sa presyon na maging 'malakas,' hindi umiiyak, at hindi humingi ng tulong, na humahantong sa mas mataas na antas ng mental health issues at suicide sa mga lalaki.",
      },
      {
        q: "Ang feminismo, sa wastong kahulugan nito, ay?",
        choices: [
          "Isang kilusan na naglalayong mapangibabawan ang mga lalaki",
          "Isang relihiyosong paniniwala",
          "Ang paniniwala sa panlipunan, pampulitika, at ekonomikong pagkakapantay ng lahat ng kasarian",
          "Isang sistema ng pamahalaan",
        ],
        correct: 2,
        explanation: "Ang feminismo ay ang paniniwala sa panlipunan, pampulitika, at ekonomikong pagkakapantay ng lahat ng kasarian. Ito ay hindi paglaban sa mga lalaki, kundi paglaban sa sistemang patriarkal na nagpapahirap sa lahat ng kasarian.",
      },
    ],
  },

  /* ====================================================================== */
  /* L6: Babae sa Panitikan at Sining ng Pilipinas                          */
  /* ====================================================================== */
  {
    id: "L6",
    num: 6,
    title: "Babae sa Panitikan at Sining ng Pilipinas",
    icon: "✍️",
    summary: "Paano ginagamit ng mga manunulat at artista ang kanilang sining bilang kasangkapan ng pagpapalaya at pagbibigay-tinig.",
    refs: [3, 14, 33],
    body: `<p>Ang panitikan at sining ay hindi lamang estetika — ito ay isang makapangyarihang kasangkapan ng pagtatakwil, pagbibigay-tinig, at pagbabago. Sa kasaysayan ng Pilipinas, ang mga kababaihan at LGBTQIA+ na artista ay gumamit ng kanilang mga likha upang labanan ang pang-aapi at ipahayag ang katotohanang pinigilan ng dominanteng lipunan.<sup><a href="#ref3" class="ref-anchor" title="Salazar, 1998">[3]</a></sup></p>

<p>Si <strong>Lorena Barros</strong> (1948–1976) ay isang makata at aktibistang kababaihan na gumanap ng napakahalagang papel sa kilusang panlipunang pagbabago noong Marcos era. Ang kanyang mga tula ay nagbibigay-tinig sa karanasan ng kababaihang nagtatanggol ng kanilang karapatan at dignidad. Siya ay pumanaw bilang mandirigma ng New People's Army — isang testamento sa kanyang paniniwala na ang panitikan at aksyon ay magkasamang kasangkapan ng pagbabago.</p>

<p>Sa tradisyonal na sining, ang <em>paghahabi</em> — ang paggawa ng banig, tapis, at abel — ay hindi lamang kabuhayan ng mga kababaihan. Ito ay isang paraan ng pag-iingat ng kasaysayan, ng pagpapahayag ng pagkakakilanlan, at ng pag-uugnay ng komunidad. Ang bawat pattern ng weaving ay naglalaman ng kuwento ng lahi at lugar.<sup><a href="#ref14" class="ref-anchor" title="Tolentino, 1996">[14]</a></sup></p>

<p>Sa kontemporaryong sining, ang mga LGBTQIA+ na Filipino artists tulad ng mga drag performer, visual artists, at manunulat ay ginagamit ang kanilang trabaho upang lumikhang puwang kung saan maaaring makita at makilala ang kanilang mga sarili — hindi bilang karibal ng tradisyon, kundi bilang bahagi ng mas malawak at mas totoo na kuwento ng pagiging Pilipino.<sup><a href="#ref33" class="ref-anchor" title="Mendoza, 2002">[33]</a></sup></p>

<p>Ang sining na lumalaban sa pang-aapi ay tinatawag na <em>activist art</em> o <em>engaged art</em>. Hindi ito nangangailangan ng museo o gallery — ang isang tula sa social media, isang mural sa dingding ng paaralan, o isang awit na kinaawitan ng isang komunidad ay lahat ng kapwa makapangyarihang anyo ng pagpapahayag.</p>`,
    callout: {
      label: "Pangunahing Konsepto: Sining bilang Pagtatakwil",
      text: "Ang sining — tula, musika, paghahabi, sayaw, visual art — ay maaaring maging kasangkapan ng <strong>paglaban sa pang-aapi</strong> (resistance art), ng <strong>pagbibigay-tinig</strong> sa mga marginalized (voice-giving), at ng <strong>pagpapanatili ng kultura</strong> na sinisikap na burahin ng dominanteng lipunan.",
    },
    reflection: "Mayroon ka bang paboritong awit, tula, o obra ng sining na nagsasalita tungkol sa katarungan o pagkakapantay? Paano ito nakakaapekto sa iyong pananaw o damdamin?",
    quiz: [
      {
        q: "Si Lorena Barros ay kilala bilang?",
        choices: [
          "Unang Pilipinang senadora",
          "Makata at aktibistang kababaihan ng Marcos era",
          "Babaylan ng sinaunang Bisaya",
          "Founding member ng Philippine Commission on Women",
        ],
        correct: 1,
        explanation: "Si Lorena Barros (1948–1976) ay isang kilalang makata at aktibistang kababaihan noong Marcos era. Ang kanyang mga tula ay nagbibigay-tinig sa karanasan ng kababaihan sa panahon ng diktadura, at siya ay pumanaw bilang kasapi ng kilusang paglaban.",
      },
      {
        q: "Ang tradisyonal na paghahabi ng kababaihang Pilipino ay?",
        choices: [
          "Isang simpleng industriya para sa kabuhayan lamang",
          "Isang paraan ng pag-iingat ng kasaysayan, pagpapahayag ng pagkakakilanlan, at pag-uugnay ng komunidad",
          "Isang aktibidad na pangunahing ginagawa ng mga lalaki",
          "Isang gawi na ipinakilala ng mga Espanyol",
        ],
        correct: 1,
        explanation: "Ang tradisyonal na paghahabi ay hindi lamang kabuhayan — ito ay isang paraan ng pag-iingat ng kasaysayan at pagkakakilanlan ng isang lugar at lahi. Ang bawat pattern ng banig, tapis, at abel ay naglalaman ng kuwento ng komunidad.",
      },
      {
        q: "Ang 'activist art' o 'engaged art' ay?",
        choices: [
          "Sining na eksklusibong ginagawa para sa mga museo at gallery",
          "Sining na ginagamit bilang kasangkapan ng paglaban sa pang-aapi at pagbabago ng lipunan",
          "Sining na walang pampulitikang nilalaman",
          "Sining na ginawa lamang ng mga propesyonal na artista",
        ],
        correct: 1,
        explanation: "Ang activist art o engaged art ay sining na ginagamit bilang kasangkapan ng pagtatakwil, pagbabago ng lipunan, at pagbibigay-tinig sa mga marginalized. Kasama rito ang tula, musika, mural, at anumang paraan ng malikhaing pagpapahayag na may panlipunang layunin.",
      },
    ],
  },

  /* ====================================================================== */
  /* L7: Gender-Based Violence — Pag-unawa, Pagtugon, at Pag-iwas           */
  /* ====================================================================== */
  {
    id: "L7",
    num: 7,
    title: "Gender-Based Violence: Pag-unawa, Pagtugon, at Pag-iwas",
    icon: "🛡️",
    summary: "Mga anyo ng gender-based violence, ang cycle of abuse, at mga mapagkakatiwalaang resource sa Pilipinas.",
    refs: [16, 18, 23, 26],
    body: `<p>Ang <strong>Gender-Based Violence (GBV)</strong> ay anumang anyo ng pinsala na nakadirekta sa isang tao batay sa kanyang kasarian o sekswalidad. Ito ay isa sa mga pinakakaraniwan ngunit pinakamababang nairereklamong uri ng paglabag sa karapatang pantao sa Pilipinas.<sup><a href="#ref23" class="ref-anchor" title="PSA, 2022">[23]</a></sup></p>

<p>Ang mga anyo ng GBV ay kasama ang: <em>pisikal na karahasan</em> (pagsasaktan, pagpukpok), <em>sekswal na karahasan</em> (rape, sexual assault, molestation), <em>sikolohikal na karahasan</em> (pagbabanta, pang-iinsulto, gaslighting, isolation), at <em>ekonomikong karahasan</em> (pagkontrol sa pera at trabaho ng kapareha).<sup><a href="#ref16" class="ref-anchor" title="RA 9262">[16]</a></sup></p>

<p>Ang <em>cycle of abuse</em> ay isang kilalang pattern sa mga relasyon na may karahasan: una ang <em>tension building</em> (pagtaas ng tensyon), pagkatapos ang <em>explosion</em> (aktwal na insidente ng karahasan), pagkatapos ang <em>honeymoon phase</em> (pagiging malambing ng abuser, paghingi ng patawad, pangako na magbabago), at muling pagtaas ng tensyon. Ang cycle na ito ang dahilan kung bakit mahirap para sa biktima na umalis sa isang abusive na relasyon — ang honeymoon phase ay nagbibigay ng pag-asa na magbabago ang abuser.</p>

<p>Sa Pilipinas, ang mga sumusunod na resource ay available:<br>
• <strong>PNP Women and Children Protection Center:</strong> (02) 8723-0401<br>
• <strong>National Center for Mental Health Crisis Hotline:</strong> 1553<br>
• <strong>Gabriela National Alliance Hotline:</strong> (02) 8732-7701 <em>(i-verify ang numero)</em><br>
• <strong>Department of Social Welfare and Development:</strong> 8888</p>

<p>Kung ikaw o ang iyong kilala ay nasa abot-kamay ng karahasan, <strong>huwag mag-atubiling humingi ng tulong</strong>. Ang paghingi ng tulong ay isang kilos ng tapang, hindi ng kahina-hinaang loob.<sup><a href="#ref26" class="ref-anchor" title="GABRIELA, 2021">[26]</a></sup></p>`,
    callout: {
      label: "Mga Agarang Helpline",
      text: "🚨 Kung ikaw ay nasa panganib na ngayon, tawagan ang <strong>911</strong>.<br>📞 PNP WCPC: (02) 8723-0401<br>🧠 NCMH Crisis Line: <strong>1553</strong><br>💛 DSWD: <strong>8888</strong><br><small>Palaging i-verify ang mga numero sa opisyal na website ng ahensya.</small>",
    },
    reflection: "Bakit sa palagay mo ay madalas na hindi nirereklamong kaso ang gender-based violence sa Pilipinas? Ano ang mga hadlang na kinakaharap ng mga biktima sa paghahanap ng tulong?",
    quiz: [
      {
        q: "Ang 'cycle of abuse' ay nagsasangkot ng aling mga yugto?",
        choices: [
          "Tension building → Explosion → Honeymoon phase → ulit",
          "Explosion → Recovery → Relapse → ulit",
          "Warning → Attack → Escape → Return",
          "Conflict → Separation → Reunion → ulit",
        ],
        correct: 0,
        explanation: "Ang cycle of abuse ay binubuo ng: tension building (pagtaas ng tensyon) → explosion (insidente ng karahasan) → honeymoon phase (paghingi ng patawad, pangako ng pagbabago) → at paulit-ulit na pagtaas ng tensyon. Ang honeymoon phase ang isa sa mga pangunahing dahilan kung bakit mahirap para sa biktima na umalis.",
      },
      {
        q: "Ang economic abuse bilang isang anyo ng GBV ay nangangahulugang?",
        choices: [
          "Pagnanakaw ng ari-arian ng kapareha",
          "Pagkontrol sa pera at trabaho ng kapareha bilang paraan ng kontrol at kapangyarihan",
          "Pagbebenta ng biktima sa human trafficking",
          "Pagkuha ng utang sa ngalan ng kapareha",
        ],
        correct: 1,
        explanation: "Ang economic abuse ay isang anyo ng karahasan kung saan ang abuser ay nagkokontrol sa pera, trabaho, at ekonomikong mapagkukunan ng biktima bilang paraan ng pagpapanatili ng kapangyarihan at pag-iwas ng biktima mula sa kalayaan.",
      },
      {
        q: "Ang paghingi ng tulong kapag nakakaranas ng GBV ay?",
        choices: [
          "Isang kilos na nagpapakita ng kahina-hinaang loob",
          "Isang kilos ng tapang at pagmamahal sa sarili",
          "Isang bagay na dapat gawin lamang kung mayroon kang katibayan",
          "Isang bagay na dapat gawin lamang sa pamamagitan ng pamilya",
        ],
        correct: 1,
        explanation: "Ang paghingi ng tulong ay isang kilos ng tapang at pagmamahal sa sarili — hindi ito kahinaan. Ang mga biktima ng GBV ay karapatan sa suporta mula sa komunidad, mga ahensya ng gobyerno, at mga organisasyong nagtatanggol ng kanilang karapatan.",
      },
    ],
  },

  /* ====================================================================== */
  /* L8: Kalusugang Pangkasarian at Reproduktibong Karapatan                */
  /* ====================================================================== */
  {
    id: "L8",
    num: 8,
    title: "Kalusugang Pangkasarian at Reproduktibong Karapatan",
    icon: "🌺",
    summary: "Ang RA 10354 (Responsible Parenthood and Reproductive Health Act), access sa reproductive health services, at kalusugang mental na may kaugnayan sa kasarian.",
    refs: [17, 22, 23, 25],
    body: `<p>Ang <strong>kalusugang pangkasarian</strong> at ang karapatang pangkaalamang pang-reproduksiyon ay bahagi ng pandaigdigang pagsisikap para sa pantay na karapatan. Sa Pilipinas, ito ay naging paksa ng maraming debate, partikular dahil sa malakas na impluwensiya ng Simbahang Katoliko sa pampublikong patakaran.<sup><a href="#ref25" class="ref-anchor" title="POPCOM, 2020">[25]</a></sup></p>

<p>Ang <strong>Republic Act 10354 — Responsible Parenthood and Reproductive Health Act of 2012 (RH Law)</strong> ay nagbibigay ng karapatang pangkaalamang pang-reproduksiyon sa lahat ng Pilipino. Kasama rito ang access sa family planning services, maternal health care, at comprehensive sexuality education. Ito ay isang makasaysayang pananalunan pagkatapos ng maraming taon ng pakikibaka ng mga aktibistang kalusugan ng kababaihan.<sup><a href="#ref17" class="ref-anchor" title="RA 9710">[17]</a></sup></p>

<p>Ang <em>reproductive rights</em> ay kinabibilangan ng: karapatang magpasya tungkol sa sariling katawan at reproduksiyon nang walang pamimilit, karapatang ma-access ang kumpletong impormasyon at serbisyo tungkol sa contraception at family planning, at karapatang makatanggap ng ligtas na pangangalaga sa panahon ng pagbubuntis at panganganak.<sup><a href="#ref22" class="ref-anchor" title="CEDAW">[22]</a></sup></p>

<p>Ang <em>kalusugang mental</em> at kasarian ay malapit na magkaugnay. Ang mga LGBTQIA+ na tao ay nakakaranas ng mas mataas na antas ng anxiety, depression, at suicidal ideation — hindi dahil sa kanilang sekswalidad, kundi dahil sa <em>minority stress</em> na dulot ng diskriminasyon, pag-aayaw ng pamilya, at kakulangan ng social support.<sup><a href="#ref23" class="ref-anchor" title="PSA, 2022">[23]</a></sup></p>

<p>Ang <em>gender-affirming care</em> — ang medikal at sikolohikal na suporta para sa transgender at gender-diverse na tao — ay kinikilala ng mga nangungunang medikal na organisasyon sa buong mundo bilang medically necessary care. Sa Pilipinas, limitado pa rin ang access dito, ngunit lumalaki ang mga support group at mental health professional na nag-espesyalisa sa pangangalagang ito.</p>`,
    callout: {
      label: "Pangunahing Konsepto: RH Law at Reproductive Rights",
      text: "Ang <strong>RA 10354 (RH Law, 2012)</strong> ay nagtatakda ng karapatang ma-access ng lahat ng Pilipino ang family planning services, maternal health care, at sexuality education. Ang reproductive rights ay bahagi ng karapatang pantao, kasama ang CEDAW (Convention on the Elimination of All Forms of Discrimination Against Women).",
    },
    reflection: "Sa iyong paaralan o komunidad, may mapagkukunan ba ng tumpak at kumpleto na impormasyon tungkol sa reproductive health? Paano mo naiisip na mapabuti ang access sa ganitong impormasyon para sa kabataang Pilipino?",
    quiz: [
      {
        q: "Ang RA 10354 o RH Law ay nagtatakda ng?",
        choices: [
          "Pagbabawal sa lahat ng anyo ng contraception",
          "Karapatang ma-access ang family planning services at maternal health care",
          "Obligasyong magkaroon ng tatlong anak",
          "Karapatang mag-abort nang libre sa lahat ng ospital",
        ],
        correct: 1,
        explanation: "Ang RA 10354 o Responsible Parenthood and Reproductive Health Act ay nagbibigay ng karapatang ma-access ang family planning services, maternal health care, at comprehensive sexuality education para sa lahat ng Pilipino. Hindi ito nagbabawal ng anoumang contraception at hindi rin ito nagpapahintulot ng abortion.",
      },
      {
        q: "Ang mas mataas na antas ng mental health issues sa LGBTQIA+ na tao ay pangunahing dulot ng?",
        choices: [
          "Ang kanilang SOGIESC mismo",
          "Minority stress — ang stress na dulot ng diskriminasyon at kakulangan ng social support",
          "Genetic factors",
          "Labis na social media exposure",
        ],
        correct: 1,
        explanation: "Ang mas mataas na antas ng depression, anxiety, at suicidal ideation sa LGBTQIA+ na tao ay pangunahing dulot ng 'minority stress' — ang stress na dulot ng diskriminasyon, pag-aayaw ng pamilya, at kakulangan ng social support — hindi ng kanilang SOGIESC mismo.",
      },
      {
        q: "Ang CEDAW ay isang?",
        choices: [
          "Lokal na batas ng Pilipinas tungkol sa kababaihan",
          "International treaty na nagtatakda ng mga karapatan ng kababaihan",
          "Programa ng Philippine Commission on Women",
          "Acronym para sa isang NGO",
        ],
        correct: 1,
        explanation: "Ang CEDAW (Convention on the Elimination of All Forms of Discrimination Against Women) ay isang international treaty na pinagtibay ng United Nations noong 1979. Ito ay kinikilala bilang 'International Bill of Rights for Women' at ginagamit bilang pundasyon ng maraming batas ng Pilipinas para sa proteksyon ng kababaihan.",
      },
    ],
  },

  /* ====================================================================== */
  /* L9: Ang Kababaihan sa Politika at Pamumuno                             */
  /* ====================================================================== */
  {
    id: "L9",
    num: 9,
    title: "Ang Kababaihan sa Politika at Pamumuno",
    icon: "🌟",
    summary: "Kasaysayan ng kababaihang Pilipino sa politika, mula sa mga babaylan hanggang sa mga kontemporaryong lider, at ang mga patuloy na hamon.",
    refs: [17, 23, 24, 27],
    body: `<p>Ang Pilipinas ay may mataas na ranking sa <strong>Global Gender Gap Report</strong> ng World Economic Forum pagdating sa pampulitikang representasyon — sa kasaysayan, nagkaroon na tayo ng dalawang babaeng pangulo (Corazon Aquino at Gloria Macapagal-Arroyo) at maraming senadora at kongresiyana.<sup><a href="#ref24" class="ref-anchor" title="WEF GGG Report, 2023">[24]</a></sup></p>

<p>Ngunit ang mga numerong ito ay nagtatago ng mas kumplikadong larawan. Ang marami sa mga nangungunang kababaihan sa politika ay nagmula sa makapangyarihang mga pamilya — ang tinatawag na <em>political dynasties</em>. Ito ay nagdudulot ng tanong: ang politikal na representasyon ng kababaihan ba ay nagpapakita ng tunay na pagbabago, o ito ay nagpapanatili lamang ng dating istruktura ng kapangyarihan sa pamamagitan ng iba't ibang mukha?<sup><a href="#ref27" class="ref-anchor" title="PCW">[27]</a></sup></p>

<p>Ang <em>Magna Carta of Women (RA 9710)</em> ay nag-uutos na ang lahat ng government bodies at decision-making bodies ay magkaroon ng hindi bababa sa 40% na representasyon ng kababaihan — isang probisyon na hindi pa ganap na naisasakatuparan sa lahat ng antas ng gobyerno.<sup><a href="#ref17" class="ref-anchor" title="RA 9710">[17]</a></sup></p>

<p>Sa barangay level — ang pinakamalapit na antas ng pamahalaang panlipunan sa mga mamamayan — ang representasyon ng kababaihan ay nananatiling mababa sa maraming lugar. Ang mga babaylan ng sinaunang panahon ay naglilingkod sa pinakamalapit na antas ng kanilang komunidad; ang hamon ngayon ay maibalik ang ganoong uri ng partisipasyon ng kababaihan sa lokal na pamamahala.<sup><a href="#ref23" class="ref-anchor" title="PSA, 2022">[23]</a></sup></p>

<p>Ang mga organisasyong tulad ng <strong>GABRIELA</strong>, <strong>Liwanag</strong>, at iba pang women's rights groups ay nagtatrabaho hindi lamang para sa representasyon ng kababaihan sa politika, kundi para sa isang mas malalim na pagbabago ng istruktura ng kapangyarihan — isang Pilipinas kung saan ang bawat boses, anuman ang kasarian, ay maririnig at igagalang.</p>`,
    callout: {
      label: "Pangunahing Konsepto: Substantive Representation",
      text: "Ang <strong>substantive representation</strong> ay ang pagtataguyod ng mabuting kapakanan ng isang grupo sa loob ng gobyerno, hindi lamang ang presensya ng miyembro ng grupong iyon. Ang tunay na representasyon ng kababaihan sa politika ay nangangahulugang hindi lamang maraming babaeng opisyal, kundi mga opisyal na aktibong nagtatanggol ng karapatan ng kababaihan at marginalized groups.",
    },
    reflection: "Naniniwala ka ba na ang bilang ng babaeng politiko sa Pilipinas ay nagpapakita ng tunay na katayuan ng kababaihan sa lipunan? Bakit o bakit hindi?",
    quiz: [
      {
        q: "Ang Magna Carta of Women ay nag-uutos ng anong minimum na representasyon ng kababaihan sa government bodies?",
        choices: ["20%", "30%", "40%", "50%"],
        correct: 2,
        explanation: "Ang RA 9710 o Magna Carta of Women ay nag-uutos na ang lahat ng government bodies at decision-making bodies ay magkaroon ng hindi bababa sa 40% na representasyon ng kababaihan — isang probisyon na hindi pa ganap na naisasakatuparan sa lahat ng antas ng gobyerno.",
      },
      {
        q: "Ang 'substantive representation' ng kababaihan ay nangangahulugang?",
        choices: [
          "Maraming babaeng opisyal sa gobyerno kahit hindi nila aktibong itinataguyod ang karapatan ng kababaihan",
          "Mga opisyal na aktibong nagtatanggol ng karapatan ng kababaihan at marginalized groups",
          "Pagkakaroon ng babaeng pangulo",
          "50% na representasyon ng kababaihan sa lahat ng posisyon",
        ],
        correct: 1,
        explanation: "Ang substantive representation ay ang aktwal na pagtatanggol ng karapatan at interes ng isang grupo — hindi lamang ang presensya ng miyembro ng grupong iyon sa opisyal na posisyon. Ang isang babaeng opisyal ay maaaring hindi nagtatanggol ng karapatan ng kababaihan.",
      },
      {
        q: "Alin sa mga sumusunod ang nagpapakita ng mas kumplikadong larawan ng babaeng representasyon sa politika ng Pilipinas?",
        choices: [
          "Ang Pilipinas ay may mataas na ranking sa Global Gender Gap pagdating sa political representation",
          "Maraming nangungunang babaeng politiko ang nagmula sa makapangyarihang political dynasties, na nagtatanong sa depth ng pagbabago",
          "Walang babae ang nagsilbing pangulo ng Pilipinas",
          "Ang SOGIE Equality Bill ay matagal nang naisabatas",
        ],
        correct: 1,
        explanation: "Kahit mataas ang ranking ng Pilipinas sa gender gap sa politika, ang marami sa mga nangungunang babaeng politiko ay nagmula sa makapangyarihang political dynasties — nagtatanong kung ang representasyong ito ay nagpapakita ng tunay na pagbabago o nagpapanatili lamang ng istruktura ng kapangyarihan.",
      },
    ],
  },

  /* ====================================================================== */
  /* L10: Ang Hinaharap na Pilipinas — Pagbabago at Pag-asa                */
  /* ====================================================================== */
  {
    id: "L10",
    num: 10,
    title: "Ang Hinaharap na Pilipinas: Pagbabago, Pag-asa, at ang Iyong Papel",
    icon: "🌻",
    summary: "Paano ka magiging bahagi ng pagbabago — bilang isang gender-sensitive na mamamayan, aktibista, magtuturo, o simpleng kaibigan.",
    refs: [11, 27, 28, 31],
    body: `<p>Pagkatapos ng siyam na aralin, maaari mong maramdaman ang bigat ng lahat ng impormasyong ito — ang kasaysayan ng pang-aapi, ang mga istruktura ng patriarkiya, ang mga batas na hindi pa naisasakatuparan. Ngunit ito ay hindi dapat maging isang dahilan ng kawalan ng pag-asa; ito ay dapat maging <strong>isang motibasyon para kumilos</strong>.<sup><a href="#ref11" class="ref-anchor" title="hooks, 2000">[11]</a></sup></p>

<p>Ang pagbabago ay hindi kailanman nangyayari sa isang malakas na kilos lamang. Ito ay nagsisimula sa maliliit na bagay: ang pagtawag sa isang kaibigan sa kanyang tamang pronoun, ang pagsasalita laban sa isang bastos na biro, ang pagtulong sa isang kaibigan na humingi ng tulong.</p>

<p>Ang <em>allyship</em> — ang pagiging kaalyado ng mga marginalized groups kahit hindi ka miyembro ng grupong iyon — ay isang mahalagang papel para sa lahat. Ang isang lalaki na nagsasalita laban sa misogyny, ang isang heterosexual na nagtatanggol ng kanyang LGBTQIA+ na kaibigan, ang isang guro na gumagamit ng gender-sensitive na wika — lahat sila ay nagbabago ng kultura ng kanilang komunidad.<sup><a href="#ref27" class="ref-anchor" title="PCW">[27]</a></sup></p>

<p>Ang Babaylan Network, ang mga organisasyon ng kababaihan, at ang mga LGBTQIA+ advocacy groups ay nagtatrabaho araw-araw para sa pagbabago.<sup><a href="#ref31" class="ref-anchor" title="Babaylan Network">[31]</a></sup> Ang iyong boses, iyong arte, iyong pagtuturo, iyong pagboto — lahat ay bahagi ng mas malaking kilusan.</p>

<p>Ang <strong>BENA</strong> ay nilikha bilang isang ligtas na puwang kung saan maaari kang matuto, magpahayag, at makahanap ng komunidad na magtatanggol sa iyong dignidad. Ngunit ang BENA ay hindi lamang isang website — ito ay isang paanyaya: <strong>dalhin ang diwa ng pagkakapantay sa labas ng screen at sa iyong araw-araw na buhay.</strong></p>

<p>Huwag malimutan: ang bawat Babaylan ay nagsimula bilang isang simpleng miyembro ng komunidad. Ikaw ay puno ng potensyal na maging isang tagapamagitan ng pagbabago sa iyong sariling lugar at panahon.</p>`,
    callout: {
      label: "Ang Iyong Papel bilang Ally at Ahente ng Pagbabago",
      text: "Hindi kailangan maging aktibista upang makipag-ugnayan sa kilusang ito. Ang pagiging <strong>ally</strong> ay nangangahulugang: ✓ Pakinggan ang karanasan ng iba nang walang paghatol · ✓ Paniwalaan ang mga biktima ng diskriminasyon · ✓ Gamitin ang tamang pronoun at panghalip · ✓ Tumayo para sa kapwa kahit hindi ito maginhawa · ✓ Patuloy na matuto at magbago.",
    },
    reflection: "Sa lahat ng iyong natutunan sa mga aralin na ito, aling konsepto ang pinaka-nakaapekto sa iyong pananaw? Anong isang konkretong hakbang ang maaari mong gawin ngayong linggo bilang bahagi ng pagbabago?",
    quiz: [
      {
        q: "Ang 'allyship' sa konteksto ng gender equality ay nangangahulugang?",
        choices: [
          "Ang pagiging miyembro ng isang LGBTQIA+ na organisasyon",
          "Ang pagiging kaalyado ng mga marginalized groups kahit hindi ka miyembro ng grupong iyon",
          "Ang pagboto para sa isang partikular na kandidato",
          "Ang pagbabago ng iyong SOGIESC",
        ],
        correct: 1,
        explanation: "Ang allyship ay ang aktibong suporta ng mga miyembro ng isang pribilehiyong grupo para sa mga marginalized na grupo. Halimbawa: ang isang heterosexual na nagtatanggol ng kanyang LGBTQIA+ na kaibigan, o ang isang lalaki na nagsasalita laban sa misogyny.",
      },
      {
        q: "Alin sa mga sumusunod ay isang halimbawa ng maliliit ngunit makabuluhang kilos ng allyship?",
        choices: [
          "Pagsali sa isang malaking demonstrasyon",
          "Pagtawag sa isang kaibigan sa kanyang tamang pronoun at pagsasalita laban sa isang bastos na biro",
          "Pagbabago ng iyong trabaho upang maging full-time na aktibista",
          "Pagbibigay ng malaking donasyon sa isang NGO",
        ],
        correct: 1,
        explanation: "Ang maliliit ngunit makabuluhang kilos ay kadalasang mas epektibo at mas napapanatili kaysa sa malalaking hakbang. Ang pagtawag ng tamang pronoun, ang pagsasalita laban sa bastos na biro, at ang pakikinig nang may empatiya ay lahat ng makapangyarihang anyo ng allyship.",
      },
      {
        q: "Alin sa mga sumusunod ang pinaka-tumpak na buod ng mensahe ng Aralin 10?",
        choices: [
          "Kailangang maging propesyonal na aktibista upang makagawa ng pagbabago",
          "Ang pagbabago ay nagsisimula sa maliliit na kilos sa araw-araw na buhay",
          "Ang sitwasyon ng Pilipinas ay walang pag-asa at hindi na mababago",
          "Ang pinaka-mahalagang bagay ay ang pagboto sa tamang kandidato",
        ],
        correct: 1,
        explanation: "Ang pangunahing mensahe ay ang pagbabago ay nagsisimula sa maliliit na kilos — ang paggamit ng tamang pronoun, ang pakikinig sa karanasan ng kapwa, ang pagtayo para sa isang kaibigan — at ang bawat isa sa atin ay may kakayahang maging bahagi ng pagbabagong ito sa ating sariling lugar.",
      },
    ],
  },
];

/* Glossary terms */
const GLOSSARY_TERMS = [
  { term: "Babaylan", def: "Ang espirituwal na lider ng sinaunang barangay sa Pilipinas — madalas na babae o gender-fluid na tao — na gumanap bilang manggagamot, tagapamagitan sa mga espiritu, at tagapayong panlipunan." },
  { term: "Asog / Bayoguin", def: "Ang mga lalaking nagdamit at kumilos bilang babae sa sinaunang lipunang Bisaya at Tagalog. Sila ay iginagalang at pinaniniwalaan na may espesyal na espirituwal na lakas." },
  { term: "Catalonan", def: "Ang katumbas na termino ng Babaylan sa sinaunang Tagalog na barangay — espirituwal na lider at tagapamagitan sa mga anito." },
  { term: "SOGIESC", def: "Sexual Orientation, Gender Identity and Expression, and Sex Characteristics — ang buong spectrum ng pagkakakilalang pansekswal at pangkasarian ng isang tao." },
  { term: "Sexual Orientation", def: "Ang oryentasyon ng emosyonal, romantiko, o sekswal na atraksyon ng isang tao — maaaring heterosexual, homosexual, bisexual, asexual, at iba pa." },
  { term: "Gender Identity", def: "Ang panloob na karanasan ng isang tao kung sino siya sa kanyang kasarian — babae, lalaki, non-binary, genderfluid, transgender, at iba pa." },
  { term: "Gender Expression", def: "Kung paano ipinakikita ng isang tao ang kanyang kasarian sa labas — sa damit, kilos, buhok, at paraan ng pagsasalita." },
  { term: "Intersex", def: "Ang mga taong ipinanganak na may sex characteristics (kromosom, hormona, o anatomy) na hindi eksaktong akma sa tipikal na kahulugan ng lalaki o babae." },
  { term: "Transgender", def: "Isang taong ang gender identity ay naiiba sa sex na itinalaga sa kanya sa kapanganakan." },
  { term: "Non-binary", def: "Isang tao na hindi eksklusibong nagpapakilala bilang lalaki o babae — maaaring genderfluid, agender, bigender, at iba pa." },
  { term: "Interseksyonalidad", def: "Ang konsepto na ang maraming aspeto ng pagkakakilanlan (kasarian, lahi, klase, kapansanan) ay nagtatagpo upang lumikha ng natatanging karanasan ng pribilehiyo o diskriminasyon. Pinasimulan ni Kimberlé Crenshaw noong 1989." },
  { term: "Patriarkiya", def: "Isang sistemang panlipunan kung saan ang mga lalaki ang may hawak ng pangunahing kapangyarihan sa pampubliko at pribadong buhay — sa politika, ekonomiya, at pamilya." },
  { term: "Toxic Masculinity", def: "Ang makapanganib, mapanira, o mapanakit na mga pamantayan ng pagiging lalaki na itinuturing ng kulturang mas malawak na 'normal' — halimbawa: hindi umiiyak, hindi humingi ng tulong, at magiging 'malakas' lagi." },
  { term: "Feminismo", def: "Ang paniniwala sa panlipunan, pampulitika, at ekonomikong pagkakapantay ng lahat ng kasarian. Hindi ito paglaban sa mga lalaki, kundi sa sistemang patriarkal." },
  { term: "Marianismo", def: "Ang mithiin ng kababaihang maging katulad ni Birhen Maria — mapagsakripisyo, maamo, at nagbibigay ng sarili para sa pamilya. Isang produkto ng kolonyal na pagpapahalaga." },
  { term: "Allyship", def: "Ang aktibong suporta ng mga miyembro ng isang pribilehiyong grupo para sa mga marginalized na grupo — kahit hindi sila miyembro ng grupong iyon." },
  { term: "Gender Mainstreaming", def: "Ang proseso ng pagsasama ng perspektibong pangkasarian sa lahat ng aspeto ng patakaran, programa, at proseso ng gobyerno." },
  { term: "Gender-Based Violence (GBV)", def: "Anumang anyo ng pinsala na nakadirekta sa isang tao batay sa kanyang kasarian o sekswalidad — kasama ang pisikal, sekswal, sikolohikal, at ekonomikong karahasan." },
  { term: "Cycle of Abuse", def: "Isang paulit-ulit na pattern sa mga relasyon na may karahasan: tension building → explosion (insidente) → honeymoon phase (paghingi ng patawad) → ulit na pagtaas ng tensyon." },
  { term: "RA 9262 (Anti-VAWC)", def: "Republic Act 9262 — Anti-Violence Against Women and Their Children Act of 2004. Nagtatakda ng kriminal na parusa para sa pisikal, sekswal, sikolohikal, at ekonomikong karahasan sa loob ng intimate relationship o pamilya." },
  { term: "RA 9710 (Magna Carta of Women)", def: "Republic Act 9710 — Magna Carta of Women (2009). Nagtatakda ng komprehensibong karapatan ng kababaihan sa edukasyon, trabaho, kalusugan, at pampulitikang partisipasyon." },
  { term: "RA 11313 (Safe Spaces Act)", def: "Republic Act 11313 — Safe Spaces Act o Bawal Bastos Law (2019). Nagbabawal sa gender-based sexual harassment sa mga pampublikong lugar, online, at sa mga institusyon." },
  { term: "Yogyakarta Principles", def: "Isang dokumento ng internasyonal na karapatan ng tao (2007) na nagtatakda kung paano ang international human rights law ay naaangkop sa sexual orientation at gender identity." },
  { term: "CEDAW", def: "Convention on the Elimination of All Forms of Discrimination Against Women — isang international treaty ng United Nations (1979), tinatawag na 'International Bill of Rights for Women.'" },
  { term: "Reproductive Rights", def: "Ang karapatang magpasya tungkol sa sariling katawan at reproduksiyon, kasama ang access sa family planning, maternal health care, at komprehensibong impormasyon tungkol sa reproductive health." },
  { term: "Minority Stress", def: "Ang stress na partikular na nakakaapekto sa mga miyembro ng marginalized na grupo — tulad ng LGBTQIA+ na tao — dulot ng diskriminasyon, stigma, at kakulangan ng social support." },
  { term: "Gender-Affirming Care", def: "Ang medikal at sikolohikal na suporta para sa transgender at gender-diverse na tao na nagpapatunay at nagtataguyod ng kanilang gender identity." },
  { term: "Substantive Representation", def: "Ang aktwal na pagtatanggol ng karapatan at interes ng isang grupo sa loob ng gobyerno — hindi lamang ang presensya ng miyembro ng grupong iyon sa opisyal na posisyon." },
  { term: "Activist Art", def: "Sining na ginagamit bilang kasangkapan ng paglaban sa pang-aapi at pagbabago ng lipunan — kasama ang tula, musika, visual art, mural, at iba pa." },
  { term: "Anito", def: "Ang mga espiritu o diyos ng kalikasan at ninuno na pinaglilingkuran ng mga Babaylan sa ritwal ng sinaunang Pilipinas." },
  { term: "Barangay", def: "Ang pinakamaliit na yunit ng panlipunang organisasyon ng sinaunang Pilipinas, pinamumunuan ng isang Datu o Rajah. Ngayon, ito ang pinakamababang antas ng gobyerno sa Pilipinas." },
  { term: "Datu / Rajah", def: "Ang pampulitikang lider ng sinaunang barangay. Ang mga Rajah ay karaniwang mas mataas na antas kaysa mga Datu at maaaring mamuno ng mas malaking teritoryo." },
  { term: "GABRIELA", def: "General Assembly Binding Women for Reforms, Integrity, Equality, Leadership, and Action — isang national alliance ng mga organisasyon ng kababaihan sa Pilipinas na nagtataguyod ng karapatan at kapakanan ng kababaihan." },
  { term: "PCW (Philippine Commission on Women)", def: "Ang pangunahing ahensya ng gobyerno ng Pilipinas na responsable sa proteksyon at pagtataguyod ng karapatan ng kababaihan at pagpapatupad ng gender mainstreaming." },
];

if (typeof module !== "undefined") module.exports = { ARALIN_DATA, GLOSSARY_TERMS };
