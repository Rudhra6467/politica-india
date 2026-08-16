/**
 * Short + expandable party information
 * Later this can come from a proper data source.
 */

export interface PartyInfo {
  abbr: string;
  name: string;
  short: string[];
  founded?: string;
  founder?: string;
  currentLeader?: string;
  more?: string[];
}

export const partyInfoMap: Record<string, PartyInfo> = {
  BJP: {
    abbr: "BJP",
    name: "Bharatiya Janata Party",
    short: [
      "Founded in 1980.",
      "One of the two major national parties in India.",
    ],
    founded: "1980",
    founder: "Formed after the split of the Janata Party; key early leaders included Atal Bihari Vajpayee and L.K. Advani.",
    currentLeader: "J.P. Nadda (National President)",
    more: [
      "Ideology draws from Hindutva and integral humanism.",
      "Has formed governments at the Centre multiple times since 1998.",
    ],
  },
  INC: {
    abbr: "INC",
    name: "Indian National Congress",
    short: [
      "Founded in 1885.",
      "One of the oldest political parties in India.",
    ],
    founded: "1885",
    founder: "Allan Octavian Hume along with Indian leaders; first session in Bombay.",
    currentLeader: "Mallikarjun Kharge (National President)",
    more: [
      "Played a central role in the independence movement.",
      "Has been the dominant party for long periods after independence.",
    ],
  },
  TDP: {
    abbr: "TDP",
    name: "Telugu Desam Party",
    short: [
      "Founded in 1982.",
      "Major regional party in Andhra Pradesh.",
    ],
    founded: "1982",
    founder: "N.T. Rama Rao",
    currentLeader: "N. Chandrababu Naidu",
    more: [
      "Formed as a regional alternative focused on Telugu identity and development.",
      "Has been in power multiple times in Andhra Pradesh.",
    ],
  },
  YSRCP: {
    abbr: "YSRCP",
    name: "Yuvajana Sramika Rythu Congress Party",
    short: [
      "Founded in 2011.",
      "Regional party based in Andhra Pradesh.",
    ],
    founded: "2011",
    founder: "Y.S. Jagan Mohan Reddy",
    currentLeader: "Y.S. Jagan Mohan Reddy",
    more: [
      "Named after Y.S. Rajasekhara Reddy.",
      "Focuses on welfare schemes and regional issues.",
    ],
  },
  JSP: {
    abbr: "JSP",
    name: "Jana Sena Party",
    short: [
      "Founded in 2014.",
      "Regional party in Andhra Pradesh led by Pawan Kalyan.",
    ],
    founded: "2014",
    founder: "Pawan Kalyan",
    currentLeader: "Pawan Kalyan",
    more: [
      "Positioned as an alternative focused on social justice and governance.",
      "Contests mainly in Andhra Pradesh.",
    ],
  },
  DMK: {
    abbr: "DMK",
    name: "Dravida Munnetra Kazhagam",
    short: [
      "Founded in 1949.",
      "Major Dravidian party in Tamil Nadu.",
    ],
    founded: "1949",
    founder: "C.N. Annadurai",
    currentLeader: "M.K. Stalin",
    more: [
      "Emerged from the Dravidian movement.",
      "Currently the ruling party in Tamil Nadu.",
    ],
  },
  AIADMK: {
    abbr: "AIADMK",
    name: "All India Anna Dravida Munnetra Kazhagam",
    short: [
      "Founded in 1972.",
      "Major Dravidian party in Tamil Nadu.",
    ],
    founded: "1972",
    founder: "M.G. Ramachandran",
    currentLeader: "Edappadi K. Palaniswami",
    more: [
      "Broke away from DMK.",
      "Has alternated power with DMK in Tamil Nadu for decades.",
    ],
  },
  BRS: {
    abbr: "BRS",
    name: "Bharat Rashtra Samithi",
    short: [
      "Founded in 2001 (as TRS).",
      "Regional party focused on Telangana.",
    ],
    founded: "2001",
    founder: "K. Chandrashekar Rao",
    currentLeader: "K. Chandrashekar Rao",
    more: [
      "Originally Telangana Rashtra Samithi; renamed later.",
      "Played a central role in the Telangana statehood movement.",
    ],
  },
  JD_S: {
    abbr: "JD(S)",
    name: "Janata Dal (Secular)",
    short: [
      "Founded in 1999.",
      "Regional party with strong base in Karnataka.",
    ],
    founded: "1999",
    founder: "H.D. Deve Gowda",
    currentLeader: "H.D. Kumaraswamy",
    more: [
      "Part of the broader Janata Dal tradition.",
      "Has been part of coalition governments in Karnataka.",
    ],
  },
};

export function getPartyInfo(abbr: string): PartyInfo | null {
  return partyInfoMap[abbr] || null;
}
