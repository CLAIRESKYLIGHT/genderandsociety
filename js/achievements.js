const achievementProfiles = [
  {
    name: "Lea Salonga",
    category: "Musika",
    tags: ["Babae"],
    image: "assets/Lea Salonga.png",
    description:
      "Filipina singer and actor, internationally known for her role in Miss Saigon.",
    why: "Isang Pilipinang artista na nagdala ng tinig at talento ng Filipina sa mga entablado ng mundo.",
  },
  {
    name: "Regine Velasquez",
    category: "Musika",
    tags: ["Babae"],
    description:
      "Known as 'Asia's Songbird.' One of the Philippines' most awarded singers.",
    why: "Isang babaeng naging pamantayan ng kahusayan sa musika sa bansang kung saan ang musika ay buhay.",
  },
  {
    name: "Gloc-9",
    category: "Musika",
    tags: ["Lalaki"],
    description:
      "Rapper known for 'Sirena' and 'Upuan.' His song 'Sirena' tells the story of a father learning to accept his gay child.",
    why: "Isang lalaki sa hip-hop — isang larangang kilala sa hypermasculinity — na ginamit ang kanyang plataporma para sa pagtanggap sa LGBTQ+.",
  },
  {
    name: "Alice Reyes",
    category: "Sayaw",
    tags: ["Babae"],
    description:
      "National Artist for Dance. Founded Ballet Philippines. Brought Filipino stories to ballet.",
    why: "Isang babaeng nagtayo ng institusyon at ginawang Pilipino ang ballet.",
  },
  {
    name: "Francisca Reyes-Aquino",
    category: "Sayaw",
    tags: ["Babae"],
    description:
      "National Artist. Documented and preserved Philippine folk dances from across the country.",
    why: "Isang babaeng nagsiguro na ang mga katutubong sayaw — na kadalasang dinadala ng kababaihan — ay hindi mawawala.",
  },
  {
    name: "Nonoy Froilan",
    category: "Sayaw",
    tags: ["Lalaki"],
    description:
      "Ballet dancer and actor. One of the Philippines' most respected male ballet dancers.",
    why: "Isang lalaki sa ballet — isang larangang madalas ituring na pambabae — na nagpatunay na ang biyaya ay walang kasarian.",
  },
  {
    name: "Lualhati Bautista",
    category: "Panitikan",
    tags: ["Babae"],
    description:
      "Author of 'Dekada '70,' 'Gapo,' and 'Bata, Bata... Pa'no Ka Ginawa?' Her novels center on women's lives under martial law.",
    why: "Isang babaeng isinulat ang mga kuwento ng kababaihan sa pambansang memorya — na nagpapatunay na ang buhay ng kababaihan ay kasaysayan rin.",
  },
  {
    name: "Marjorie Evasco",
    category: "Panitikan",
    tags: ["Babae"],
    description:
      "Filipina poet and essayist known for feminist and ecofeminist poetry.",
    why: "Isang babaeng nagsusulat sa Cebuano at Ingles, na nagpapatunay na ang panloob na buhay ng kababaihan ay karapat-dapat sa tula.",
  },
  {
    name: "Danton Remoto",
    category: "Panitikan",
    tags: ["LGBTQIA+"],
    image: "assets/Danton Remoto.png",
    description:
      "Writer, professor, and LGBTQ+ advocate. Founder of Ang Ladlad, an LGBTQ+ party-list in the Philippines.",
    why: "Isang lantarang gay na manunulat na ginawang adbokasiya ang kanyang sining at gawaing pampubliko para sa mga LGBTQ+ na Pilipino.",
  },
  {
    name: "Pacita Abad",
    category: "Sining",
    tags: ["Babae"],
    description:
      "Filipina painter known for her vibrant trapunto paintings. One of Southeast Asia's most important modern artists.",
    why: "Isang babaeng tumanggi na makulong sa isang midyum o bansa, na gumawa ng sining na nagdiriwang ng kulay, migrasyon, at pagkakakilanlan.",
  },
  {
    name: "Lino Brocka",
    category: "Sining",
    tags: ["Lalaki"],
    description:
      "National Artist for Film. Directed 'Maynila: Sa Mga Kuko ng Liwanag' and 'Tinimbang Ka Ngunit Kulang.' Made films about marginalized people.",
    why: "Isang lalaking ginamit ang sinehan upang ikuwento ang buhay ng mahihirap, ng mga itinakwil, at ng LGBTQ+ — noong walang ibang gumagawa nito.",
  },
  {
    name: "Kidlat Tahimik",
    category: "Sining",
    tags: ["Katutubo"],
    description:
      "Filmmaker and artist. Known as the 'father of Philippine independent cinema.' Identifies with his Igorot heritage.",
    why: "Isang artistang tumanggi sa kolonyal na pamantayan sa pelikula at muling kinilala ang katutubong pagkakakilanlan bilang pinagmumulan ng pagmamalaki.",
  },
  {
    name: "Fe del Mundo",
    category: "Agham",
    tags: ["Babae"],
    description:
      "Pediatrician. First woman admitted to Harvard Medical School. Founded the first pediatric hospital in the Philippines.",
    why: "Isang babaeng sumira sa hadlang ng kasarian sa Harvard at inialay ang buhay sa kalusugan ng mga bata.",
  },
  {
    name: "Lourdes Cruz",
    category: "Agham",
    tags: ["Babae"],
    description:
      "National Scientist. Biochemist known for her work on cone snail toxins that led to painkillers.",
    why: "Isang babae sa larangang kung saan kakaunti pa rin ang kababaihan, na nagpapatunay na ang agham ay walang kasarian.",
  },
  {
    name: "Gregorio Zara",
    category: "Agham",
    tags: ["Lalaki"],
    description:
      "Inventor of the videophone and other technological innovations. National Scientist.",
    why: "Isang Pilipinong siyentipiko na nagpakitang ang inobasyon ay maaaring magmula sa kahit saan, hindi lamang sa Kanluran.",
  },
  {
    name: "Josefa Llanes Escoda",
    category: "Aktibismo",
    tags: ["Babae"],
    description:
      "Suffragist, social worker, and founder of the Girl Scouts of the Philippines. Killed during WWII.",
    why: "Isang babaeng nakipaglaban para sa karapatan ng kababaihan na bumoto at namatay para sa bayan.",
  },
  {
    name: "Lorena Barros",
    category: "Aktibismo",
    tags: ["Babae"],
    description:
      "Founder of MAKIBAKA, a women's liberation movement. Killed at 26 during martial law.",
    why: "Isang babaeng nagpumilit na ang pagpapalaya ng kababaihan at ng bansa ay magkasama.",
  },
  {
    name: "Maria Ressa",
    category: "Aktibismo",
    tags: ["Babae"],
    image: "assets/Maria Ressa.png",
    description:
      "Journalist, co-founder of Rappler, and 2021 Nobel Peace Prize laureate.",
    why: "Isang babaeng tumindig para sa malayang pamamahayag at nagbigay-lakas sa mga tinig na hinahamon ang kapangyarihan.",
  },
  {
    name: "Apo Whang-Od",
    category: "Katutubo",
    tags: ["Babae", "Katutubo"],
    image: "assets/Apo Whang-Od.png",
    description:
      "Kalinga mambabatok and cultural bearer who continues the tradition of batok.",
    why: "Isang katutubong babaeng tagapag-ingat ng kaalaman at tradisyong ipinapasa sa susunod na henerasyon.",
  },
  {
    name: "Macli-ing Dulag",
    category: "Katutubo",
    tags: ["Lalaki", "Katutubo"],
    description:
      "Kalinga leader who opposed the Chico Dam project. Killed for his resistance in 1980.",
    why: "Isang katutubong lalaki na namatay sa pagtatanggol sa lupa at paraan ng pamumuhay ng kanyang mga tao.",
  },
  {
    name: "Bai Bibyaon Ligkayan Bigkay",
    category: "Katutubo",
    tags: ["Babae", "Katutubo"],
    image: "assets/Bai Bibyaon Ligkayan Bigkay.png",
    description:
      "Manobo woman leader and environmental defender who has fought for Indigenous land rights in Mindanao.",
    why: "Isang katutubong babaeng pinuno na nagpapakita kung bakit mahalaga ang kababaihan sa pagtatanggol ng lupa at pamayanan.",
  },
  {
    name: "Geraldine Roman",
    category: "LGBTQIA+",
    tags: ["LGBTQIA+"],
    image: "assets/Geraldine Roman.jpg",
    description:
      "First openly transgender person elected to the Philippine House of Representatives (2016).",
    why: "Ipinapakita ng kanyang halal na paglilingkod na kabilang ang LGBTQIA+ Filipinos sa mga institusyong humuhubog sa bansa.",
  },
  {
    name: "Jake Zyrus",
    category: "LGBTQIA+",
    tags: ["LGBTQIA+"],
    image: "assets/Jake Zyrus.png",
    description:
      "Trans man and singer. He came out publicly and transitioned in 2018, continuing his music career despite backlash.",
    why: "Ipinapakita ng kanyang pagiging bukas tungkol sa sarili ang halaga ng pagkilala at pagtanggap sa mga trans na Pilipino.",
    sourceUrl: "https://glaad.org/three-notable-filipino-trans-men/",
    sourceTitle: "GLAAD: Three Notable Filipino Trans Men",
  },
  {
    name: "Boy Abunda",
    category: "LGBTQIA+",
    tags: ["LGBTQIA+"],
    description:
      "Television host and talent manager. One of the Philippines' most recognized openly gay public figures.",
    why: "Isang gay na lalaki na naging kilalang-kilala sa pamamagitan ng pagiging lubos na sarili — nagpapatunay na ang visibility ay nagbabago ng kultura.",
  },
  {
    name: "Vice Ganda",
    category: "Sining",
    tags: ["LGBTQIA+"],
    image: "assets/Vice Ganda.png",
    description:
      "Comedian, actor, and television host. Won Best Actor at the 2025 Metro Manila Film Festival for Call Me Mother.",
    why: "Ang kanyang tagumpay ay nagpapakita na kayang manguna ng queer performers sa mga papel na lampas sa stereotype ng komedya.",
  },
  {
    name: "Hergie Bacyadan",
    category: "Palakasan",
    tags: ["LGBTQIA+", "Katutubo"],
    image: "assets/Hergie Bacyadan.png",
    description:
      "Kalinga boxer who represented the Philippines at the 2024 Paris Olympics; publicly identifies as a transgender man.",
    why: "Dinala niya ang talento at pangalan ng Pilipinas sa pinakamalaking entablado ng palakasan habang namumuhay nang tapat sa kanyang pagkakakilanlan.",
    sourceUrl:
      "https://news.tv5.com.ph/breaking/read/pak-na-pak-5-lgbtq-wins-in-the-philippines-in-2024-that-gave-us-hope-for-equality",
    sourceTitle: "TV5: LGBTQ+ wins in the Philippines in 2024",
  },
  {
    name: "Ice Seguerra",
    category: "Musika",
    tags: ["LGBTQIA+"],
    image: "assets/Ice Seguerra.png",
    description:
      "Trans man, actor, singer-songwriter, and former chairperson of the National Youth Commission.",
    why: "Ipinapakita ng kanyang visibility kung gaano kahalaga ang mga kuwentong nagbibigay-lakas sa mga trans na Pilipino.",
    sourceUrl: "https://glaad.org/three-notable-filipino-trans-men/",
    sourceTitle: "GLAAD: Three Notable Filipino Trans Men",
  },
  {
    name: "Dido Villanueva",
    category: "Palakasan",
    tags: ["LGBTQIA+"],
    image: "assets/Dido Villanueva.png",
    description:
      "Gay basketball player who challenges expectations about gender expression in Philippine sports.",
    why: "Ipinapakita ng kanyang kuwento na maaaring magsabay ang pagiging queer, pagiging mahusay, at pagmamahal sa basketball.",
    sourceUrl:
      "https://www.rappler.com/sports/gay-hooper-dido-villanueva-lets-game-do-talking/",
    sourceTitle: "Rappler: Gay hooper Dido Villanueva",
  },
  {
    name: "Marina Summers",
    category: "Sining",
    tags: ["LGBTQIA+"],
    image: "assets/Marina Summers.png",
    description:
      "Filipina drag performer who competed on RuPaul's Drag Race UK vs. the World.",
    why: "Dinadala niya ang Filipina drag at sining sa pandaigdigang entablado.",
  },
];

export const ACHIEVEMENTS = achievementProfiles.filter(
  (person) => person.image,
);

if (typeof window !== "undefined") {
  window.ACHIEVEMENTS = ACHIEVEMENTS;
}
