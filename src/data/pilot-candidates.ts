/**
 * Pilot data — Andhra Pradesh + Telangana
 * Real 2023/2024 ECI affidavit figures (via ADR/MyNeta).
 * Photos: Wikimedia Commons / PIB-GODL where licensed; else initials.
 *
 * ORDERING RULES (sortOrder) — why someone appears first
 * -------------------------------------------------------
 * 1  = Current / recent Chief Minister or equivalent top leader of the state/party
 * 2  = Deputy CM / party working president / key cabinet or organisational head
 * 3  = Other senior elected figures (ministers, major MPs/MLAs)
 * 4–5 = Remaining won seats
 * 90+ = Lost candidates (shown last, clearly labelled)
 *
 * This is role + evidence order, never a popularity or “goodness” ranking.
 */

export type PromiseStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "REPORTED_COMPLETED"
  | "VERIFIED_COMPLETED"
  | "UNABLE_TO_VERIFY"
  | "EVIDENCE_CONFLICTING";

export type ElectionResult = "won" | "lost";

export interface PilotPromise {
  id: string;
  title: string;
  sourceNote?: string;
  announcedDate?: string;
  status: PromiseStatus;
  evidenceNote?: string;
  lastChecked?: string;
  likes: number;
  dislikes: number;
}

export interface PilotCandidate {
  id: string;
  name: string;
  party: string;
  partyAbbr: string;
  constituency: string;
  state: string;
  electionType: string;
  electionYear: number;
  electionResult?: ElectionResult;
  opponentId?: string;
  opponentName?: string;
  opponentParty?: string;
  marginVotes?: number;
  age?: number;
  education?: string;
  profession?: string;
  totalAssets?: string;
  totalLiabilities?: string;
  criminalCases: number;
  affidavitPdfUrl?: string;
  affidavitYear?: string;
  photoUrl?: string;
  photoSource?: string;
  lastUpdated?: string;
  sortOrder?: number;
  promises: PilotPromise[];
  likes: number;
  dislikes: number;
}

export const pilotCandidates: PilotCandidate[] = [
  {
    id: "ap-tdp-01", name: "N. Chandrababu Naidu", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Kuppam", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won", opponentId: "ap-ysrcp-lost-01", opponentName: "K.R.J. Bharath", opponentParty: "YSRCP", marginVotes: 48006,
    age: 74, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹931 Cr (family, 2024 affidavit)", totalLiabilities: "₹10+ Cr", criminalCases: 19,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/The_portrait_of_CM_Shri_Nara_Chandrababu_Naidu.jpg/330px-The_portrait_of_CM_Shri_Nara_Chandrababu_Naidu.jpg",
    photoSource: "Wikimedia Commons",
    likes: 4200, dislikes: 980,
    promises: [
      { id: "ap-p01", title: "Rebuild Amaravati as the capital with renewed focus", sourceNote: "Campaign statements & public agenda", announcedDate: "2024", status: "IN_PROGRESS", evidenceNote: "Multiple public statements and early administrative steps reported after 2024 election.", lastChecked: "2026-08-01", likes: 2100, dislikes: 640 },
      { id: "ap-p02", title: "Strengthen irrigation and farmer support systems", sourceNote: "Manifesto / campaign themes", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-28", likes: 1850, dislikes: 310 },
      { id: "ap-p16", title: "Complete Polavaram and major irrigation projects", sourceNote: "TDP campaign & public agenda 2024", announcedDate: "2024", status: "IN_PROGRESS", evidenceNote: "Long-running project; post-2024 government has restated priority.", lastChecked: "2026-08-20", likes: 1680, dislikes: 420 },
    ],
  },
  {
    id: "ap-tdp-02", name: "Nara Lokesh", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Mangalagiri", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won", opponentId: "ap-ysrcp-lost-02", opponentName: "Murugudu Lavanya", opponentParty: "YSRCP", marginVotes: 91413,
    age: 41, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹542 Cr (2024 affidavit)", totalLiabilities: "₹18+ Cr", criminalCases: 17,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 2,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nara_Lokesh_at_CII_Partnership_Summit_2025%2C_Visakhapatnam.jpg/330px-Nara_Lokesh_at_CII_Partnership_Summit_2025%2C_Visakhapatnam.jpg",
    photoSource: "Wikimedia Commons",
    likes: 3100, dislikes: 720,
    promises: [
      { id: "ap-p03", title: "Skill development and employment push for youth", sourceNote: "Campaign focus", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-30", likes: 1420, dislikes: 210 },
      { id: "ap-p21", title: "Digital governance and ease of doing business", sourceNote: "Public agenda", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-08-18", likes: 980, dislikes: 160 },
    ],
  },
  {
    id: "ap-ysrcp-01", name: "Y.S. Jagan Mohan Reddy", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Pulivendula", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won", opponentName: "B.Tech Ravi", opponentParty: "TDP", marginVotes: 61687,
    age: 51, education: "Graduate", profession: "Politician",
    totalAssets: "₹530 Cr (self) / ₹757 Cr (family, 2024 affidavit)", totalLiabilities: "₹26+ Cr (family)", criminalCases: 29,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/The_Chief_Minister_of_Andhra_Pradesh%2C_Shri_Y.S._Jagan_Mohan_Reddy.jpg/330px-The_Chief_Minister_of_Andhra_Pradesh%2C_Shri_Y.S._Jagan_Mohan_Reddy.jpg",
    photoSource: "Wikimedia Commons",
    likes: 3800, dislikes: 2100,
    promises: [
      { id: "ap-p06", title: "Continue major welfare schemes with stronger delivery", sourceNote: "Campaign announcements", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-08-02", likes: 1950, dislikes: 880 },
    ],
  },
  {
    id: "ap-jsp-01", name: "Pawan Kalyan", party: "Jana Sena Party", partyAbbr: "JSP",
    constituency: "Pithapuram", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won", opponentName: "Vanga Geetha", opponentParty: "YSRCP", marginVotes: 70279,
    age: 55, education: "10th Pass", profession: "Film Actor / Politician",
    totalAssets: "₹164.5 Cr (2024 affidavit)", totalLiabilities: "₹65+ Cr", criminalCases: 8,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Shri_Konidela_Pawan_Kalyan.jpg/330px-Shri_Konidela_Pawan_Kalyan.jpg",
    photoSource: "Wikimedia Commons",
    likes: 5100, dislikes: 890,
    promises: [
      { id: "ap-p10", title: "Focus on social justice and transparent governance", sourceNote: "Public statements & campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-08-03", likes: 2400, dislikes: 320 },
      { id: "ap-p11", title: "Support for farmers and youth employment", sourceNote: "Campaign themes", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-29", likes: 1980, dislikes: 270 },
      { id: "ap-p17", title: "Curb illegal sand mining and protect environment", sourceNote: "Jana Sena public positions", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-08-18", likes: 2100, dislikes: 310 },
    ],
  },
  {
    id: "ap-bjp-01", name: "Daggubati Purandeswari", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Rajahmundry", state: "Andhra Pradesh", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won", opponentName: "Dr. Guduri Srinivas", opponentParty: "YSRCP", marginVotes: 239139,
    age: 67, education: "Graduate", profession: "Politician",
    totalAssets: "₹62.5 Cr (2024 affidavit)", totalLiabilities: "₹7 Cr", criminalCases: 1,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/D._Purandeswari%2C_in_New_Delhi_on_February_07%2C_2013.jpg/330px-D._Purandeswari%2C_in_New_Delhi_on_February_07%2C_2013.jpg",
    photoSource: "Wikimedia Commons",
    likes: 1450, dislikes: 410,
    promises: [{ id: "ap-p14", title: "Push central schemes implementation in the constituency", sourceNote: "Campaign focus", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-25", likes: 680, dislikes: 140 }],
  },
  {
    id: "tg-brs-01", name: "K. Chandrashekar Rao", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Gajwel", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won", opponentName: "Eatala Rajender", opponentParty: "BJP", marginVotes: 45031,
    age: 70, education: "Graduate", profession: "Politician",
    totalAssets: "₹59 Cr (family + HUF, 2023 affidavit)", totalLiabilities: "₹25 Cr", criminalCases: 9,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Kalvakuntla_Chandrashekar_Rao.png/330px-Kalvakuntla_Chandrashekar_Rao.png",
    photoSource: "Wikimedia Commons",
    likes: 3600, dislikes: 1400,
    promises: [{ id: "tg-p01", title: "Continue focus on irrigation and farm support legacy schemes", sourceNote: "Party platform", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-28", likes: 1600, dislikes: 480 }],
  },
  {
    id: "tg-brs-02", name: "K.T. Rama Rao", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Sircilla", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won", opponentName: "K.K. Mahender Reddy", opponentParty: "INC", marginVotes: 29687,
    age: 47, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹53.3 Cr (2023 affidavit)", totalLiabilities: "₹12 Cr", criminalCases: 7,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-24", sortOrder: 2,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Kalvakuntla_Taraka_Rama_Rao.jpg/330px-Kalvakuntla_Taraka_Rama_Rao.jpg",
    photoSource: "Wikimedia Commons",
    likes: 2900, dislikes: 780,
    promises: [{ id: "tg-p02", title: "Urban development and IT/industry growth focus", sourceNote: "Public positions", announcedDate: "2023–2024", status: "IN_PROGRESS", lastChecked: "2026-07-30", likes: 1250, dislikes: 290 }],
  },
  {
    id: "tg-inc-01", name: "A. Revanth Reddy", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Kodangal", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won", opponentName: "Patnam Narender Reddy", opponentParty: "BRS", marginVotes: 32532,
    age: 56, education: "Graduate", profession: "Politician",
    totalAssets: "₹30 Cr (2023 affidavit)", totalLiabilities: "₹1.3 Cr", criminalCases: 89,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Portrait_of_Telangana_CM_Revanth_Reddy.png/330px-Portrait_of_Telangana_CM_Revanth_Reddy.png",
    photoSource: "Wikimedia Commons",
    likes: 3100, dislikes: 920,
    promises: [
      { id: "tg-p06", title: "Implement six guarantees and welfare delivery", sourceNote: "Government agenda / Congress manifesto TG 2023", announcedDate: "2023–2024", status: "IN_PROGRESS", evidenceNote: "Delivery status varies by scheme and district.", lastChecked: "2026-08-20", likes: 1550, dislikes: 410 },
      { id: "tg-p18", title: "₹500 gas cylinder and women support measures", sourceNote: "Congress six guarantees (public)", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-08-15", likes: 980, dislikes: 220 },
    ],
  },
  {
    id: "tg-inc-02", name: "Bhatti Vikramarka", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Madhira", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won", opponentName: "Lingala Kamal Raju", opponentParty: "BRS", marginVotes: 35452,
    age: 63, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹8.13 Cr (2023 affidavit)", totalLiabilities: "Nil", criminalCases: 3,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-24", sortOrder: 2,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Portrait_of_Telangana_Deputy_CM_Bhatti_Vikramarka_Mallu_%284_July_2024%29.png/330px-Portrait_of_Telangana_Deputy_CM_Bhatti_Vikramarka_Mallu_%284_July_2024%29.png",
    photoSource: "Wikimedia Commons",
    likes: 1450, dislikes: 380,
    promises: [{ id: "tg-p07", title: "Farm support and rural development", sourceNote: "Government focus", announcedDate: "2023–2024", status: "IN_PROGRESS", lastChecked: "2026-07-29", likes: 620, dislikes: 140 }],
  },
  {
    id: "tg-bjp-01", name: "Bandi Sanjay Kumar", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Karimnagar", state: "Telangana", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won", opponentName: "Vinod Kumar Boianapalli", opponentParty: "BRS",
    age: 54, education: "Graduate", profession: "Politician",
    totalAssets: "₹1.13 Cr (2024 affidavit)", totalLiabilities: "₹0.3 Cr", criminalCases: 42,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 1,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Sanjay_Bandi_Bjp.png/330px-Sanjay_Bandi_Bjp.png",
    photoSource: "Wikimedia Commons",
    likes: 1750, dislikes: 620,
    promises: [{ id: "tg-p10", title: "Strong opposition focus and constituency development", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-20", likes: 720, dislikes: 180 }],
  },
  {
    id: "tg-bjp-02", name: "Konda Vishweshwar Reddy", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Chevella", state: "Telangana", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won", opponentName: "G. Ranjith Reddy", opponentParty: "INC",
    age: 62, education: "Graduate", profession: "Business / Politician",
    totalAssets: "₹4,568 Cr (family, 2024 affidavit)", totalLiabilities: "₹1,200+ Cr", criminalCases: 4,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-24", sortOrder: 2,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Konda_Vishweshwar_Reddi.jpg/330px-Konda_Vishweshwar_Reddi.jpg",
    photoSource: "Wikimedia Commons",
    likes: 1320, dislikes: 410,
    promises: [{ id: "tg-p11", title: "Infrastructure and industrial development focus", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-18", likes: 580, dislikes: 95 }],
  },
  {
    id: "ap-ysrcp-lost-01", name: "K.R.J. Bharath", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Kuppam", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "lost", opponentId: "ap-tdp-01", opponentName: "N. Chandrababu Naidu", opponentParty: "TDP", marginVotes: 48006,
    age: 58, education: "Graduate", profession: "Politician", totalAssets: "Unable to verify for pilot", criminalCases: 0,
    affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 90,
    likes: 210, dislikes: 40, promises: [],
  },
  {
    id: "ap-ysrcp-lost-02", name: "Murugudu Lavanya", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Mangalagiri", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "lost", opponentId: "ap-tdp-02", opponentName: "Nara Lokesh", opponentParty: "TDP", marginVotes: 91413,
    age: 45, education: "Graduate", profession: "Politician", totalAssets: "Unable to verify for pilot", criminalCases: 0,
    affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 91,
    likes: 180, dislikes: 35, promises: [],
  },
];

export function getCandidateById(id: string): PilotCandidate | undefined {
  return pilotCandidates.find((c) => c.id === id);
}

export function getAllStates(): string[] {
  return Array.from(new Set(pilotCandidates.map((c) => c.state))).sort();
}

export function getPartiesInState(state: string) {
  const map = new Map<string, { name: string; abbr: string; count: number }>();
  pilotCandidates.filter((c) => c.state === state).forEach((c) => {
    const existing = map.get(c.partyAbbr);
    if (existing) existing.count += 1;
    else map.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr, count: 1 });
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getNationalParties() {
  const map = new Map<string, { name: string; abbr: string; count: number }>();
  pilotCandidates.forEach((c) => {
    const existing = map.get(c.partyAbbr);
    if (existing) existing.count += 1;
    else map.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr, count: 1 });
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getCandidatesByPartyAndState(partyAbbr: string, state: string) {
  return pilotCandidates
    .filter((c) => c.partyAbbr === partyAbbr && c.state === state)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
}

export function resultOf(c: PilotCandidate): ElectionResult {
  return c.electionResult ?? "won";
}

/**
 * Homepage “Open a profile” strip.
 * Prefers: photo + low sortOrder (CMs / DyCMs / party heads).
 * Interleaves AP and TG so both states appear early.
 * This is an entry-point order, never a ranking or score.
 */
export function getFeaturedLeaders(limit = 8): PilotCandidate[] {
  const withPhoto = pilotCandidates
    .filter((c) => c.photoUrl)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  const ap = withPhoto.filter((c) => c.state === "Andhra Pradesh");
  const tg = withPhoto.filter((c) => c.state === "Telangana");

  const interleaved: PilotCandidate[] = [];
  const max = Math.max(ap.length, tg.length);
  for (let i = 0; i < max; i++) {
    if (ap[i]) interleaved.push(ap[i]);
    if (tg[i]) interleaved.push(tg[i]);
  }
  return interleaved.slice(0, limit);
}
