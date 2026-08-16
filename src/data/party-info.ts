/**
 * Short + expandable party information
 * Later this can come from a proper data source.
 */

export interface PartyInfo {
  abbr: string;
  name: string;
  short: string[]; // exactly ~2 short lines shown by default
  founded?: string;
  founder?: string;
  currentLeader?: string;
  more?: string[]; // extra lines shown when expanded
}

export const partyInfoMap: Record<string, PartyInfo> = {
  BJP: {
    abbr: "BJP",
    name: "Bharatiya Janata Party",
    short: [
      "Founded in 1980.",
      "Currently one of the two major national parties in India.",
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
      "One of the oldest political parties in India and a major national party.",
    ],
    founded: "1885",
    founder: "Allan Octavian Hume along with Indian leaders; first session in Bombay.",
    currentLeader: "Mallikarjun Kharge (National President)",
    more: [
      "Played a central role in the independence movement.",
      "Has been the dominant party for long periods after independence.",
    ],
  },
  AITC: {
    abbr: "AITC",
    name: "All India Trinamool Congress",
    short: [
      "Founded in 1998.",
      "Major regional party primarily active in West Bengal.",
    ],
    founded: "1998",
    founder: "Mamata Banerjee",
    currentLeader: "Mamata Banerjee (Chairperson)",
    more: [
      "Broke away from the Indian National Congress.",
      "Currently the ruling party in West Bengal.",
    ],
  },
  TDP: {
    abbr: "TDP",
    name: "Telugu Desam Party",
    short: [
      "Founded in 1982.",
      "Major regional party in Andhra Pradesh and Telangana.",
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
  SP: {
    abbr: "SP",
    name: "Samajwadi Party",
    short: [
      "Founded in 1992.",
      "Major party in Uttar Pradesh with socialist roots.",
    ],
    founded: "1992",
    founder: "Mulayam Singh Yadav",
    currentLeader: "Akhilesh Yadav",
    more: [
      "Emerged from the Janata Dal tradition.",
      "Has formed governments in Uttar Pradesh multiple times.",
    ],
  },
};

export function getPartyInfo(abbr: string): PartyInfo | null {
  return partyInfoMap[abbr] || null;
}
