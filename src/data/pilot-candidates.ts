/**
 * Pilot seed data — South India focus (Andhra Pradesh, Tamil Nadu, Karnataka)
 * Illustrative placeholders for UI/feel testing.
 * Real data will come from ECI Form 26 + attribution.
 *
 * Ordering principle: party leadership / prominent faces first within each state-party group.
 */

export type PromiseStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "REPORTED_COMPLETED"
  | "VERIFIED_COMPLETED"
  | "UNABLE_TO_VERIFY"
  | "EVIDENCE_CONFLICTING";

export interface PilotPromise {
  id: string;
  title: string;
  description?: string;
  sourceUrl?: string;
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
  age?: number;
  education?: string;
  profession?: string;
  totalAssets?: string;
  totalLiabilities?: string;
  criminalCases: number;
  affidavitPdfUrl?: string;
  affidavitYear?: string;
  photoUrl?: string;
  lastUpdated?: string;
  sortOrder?: number; // lower = higher priority (leaders first)
  promises: PilotPromise[];
  likes: number;
  dislikes: number;
}

export const pilotCandidates: PilotCandidate[] = [
  // ==================== ANDHRA PRADESH ====================
  // TDP
  {
    id: "ap-tdp-01",
    name: "N. Chandrababu Naidu",
    party: "Telugu Desam Party",
    partyAbbr: "TDP",
    constituency: "Kuppam",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 74,
    education: "BA",
    profession: "Politician",
    totalAssets: "₹45+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2024",
    lastUpdated: "2026-08-10",
    sortOrder: 1,
    likes: 4200,
    dislikes: 980,
    promises: [
      {
        id: "ap-p-01",
        title: "Rebuild Amaravati as the capital with renewed focus",
        sourceNote: "Campaign & public statements",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        evidenceNote: "Multiple public statements and early administrative steps reported.",
        lastChecked: "2026-08-01",
        likes: 2100,
        dislikes: 640,
      },
      {
        id: "ap-p-02",
        title: "Strengthen irrigation and farmer support systems",
        sourceNote: "Manifesto themes",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-28",
        likes: 1850,
        dislikes: 310,
      },
    ],
  },
  {
    id: "ap-tdp-02",
    name: "Nara Lokesh",
    party: "Telugu Desam Party",
    partyAbbr: "TDP",
    constituency: "Mangalagiri",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 41,
    education: "MBA",
    profession: "Politician",
    totalAssets: "₹30+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2024",
    lastUpdated: "2026-08-09",
    sortOrder: 2,
    likes: 3100,
    dislikes: 720,
    promises: [
      {
        id: "ap-p-03",
        title: "Skill development and employment push for youth",
        sourceNote: "Campaign focus",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-30",
        likes: 1420,
        dislikes: 210,
      },
    ],
  },
  // YSRCP
  {
    id: "ap-ysrcp-01",
    name: "Y.S. Jagan Mohan Reddy",
    party: "Yuvajana Sramika Rythu Congress Party",
    partyAbbr: "YSRCP",
    constituency: "Pulivendula",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 51,
    education: "B.Com",
    profession: "Politician",
    totalAssets: "₹500+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2024",
    lastUpdated: "2026-08-11",
    sortOrder: 1,
    likes: 3800,
    dislikes: 2100,
    promises: [
      {
        id: "ap-p-04",
        title: "Continue major welfare schemes with strengthened delivery",
        sourceNote: "Campaign announcements",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-08-02",
        likes: 1950,
        dislikes: 880,
      },
    ],
  },
  {
    id: "ap-ysrcp-02",
    name: "Y.S. Vijaya Lakshmi",
    party: "Yuvajana Sramika Rythu Congress Party",
    partyAbbr: "YSRCP",
    constituency: "Vizianagaram",
    state: "Andhra Pradesh",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 48,
    education: "Graduate",
    profession: "Politician",
    totalAssets: "₹20+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2024",
    lastUpdated: "2026-08-08",
    sortOrder: 3,
    likes: 980,
    dislikes: 340,
    promises: [
      {
        id: "ap-p-05",
        title: "Strengthen local health and education infrastructure",
        sourceNote: "Campaign themes",
        announcedDate: "2024",
        status: "NOT_STARTED",
        lastChecked: "2026-07-20",
        likes: 420,
        dislikes: 95,
      },
    ],
  },
  // Jana Sena
  {
    id: "ap-jsp-01",
    name: "Pawan Kalyan",
    party: "Jana Sena Party",
    partyAbbr: "JSP",
    constituency: "Pithapuram",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 52,
    education: "Intermediate",
    profession: "Actor / Politician",
    totalAssets: "₹50+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2024",
    lastUpdated: "2026-08-12",
    sortOrder: 1,
    likes: 5100,
    dislikes: 890,
    promises: [
      {
        id: "ap-p-06",
        title: "Focus on social justice and transparent governance",
        sourceNote: "Public statements & campaign",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-08-03",
        likes: 2400,
        dislikes: 320,
      },
      {
        id: "ap-p-07",
        title: "Support for farmers and youth employment",
        sourceNote: "Campaign themes",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-29",
        likes: 1980,
        dislikes: 270,
      },
    ],
  },
  // BJP (AP)
  {
    id: "ap-bjp-01",
    name: "Daggubati Purandeswari",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Rajahmundry",
    state: "Andhra Pradesh",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 64,
    education: "Graduate",
    profession: "Politician",
    totalAssets: "₹15+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2024",
    lastUpdated: "2026-08-07",
    sortOrder: 2,
    likes: 1450,
    dislikes: 410,
    promises: [
      {
        id: "ap-p-08",
        title: "Push central schemes implementation in the constituency",
        sourceNote: "Campaign focus",
        announcedDate: "2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-25",
        likes: 680,
        dislikes: 140,
      },
    ],
  },

  // ==================== TAMIL NADU ====================
  // DMK
  {
    id: "tn-dmk-01",
    name: "M.K. Stalin",
    party: "Dravida Munnetra Kazhagam",
    partyAbbr: "DMK",
    constituency: "Kolathur",
    state: "Tamil Nadu",
    electionType: "Assembly",
    electionYear: 2021,
    age: 71,
    education: "Graduate",
    profession: "Politician",
    totalAssets: "₹10+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2021",
    lastUpdated: "2026-08-10",
    sortOrder: 1,
    likes: 3900,
    dislikes: 1200,
    promises: [
      {
        id: "tn-p-01",
        title: "Strengthen social welfare and education schemes",
        sourceNote: "Government & party agenda",
        announcedDate: "2021–2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-08-01",
        likes: 1800,
        dislikes: 420,
      },
    ],
  },
  {
    id: "tn-dmk-02",
    name: "Udhayanidhi Stalin",
    party: "Dravida Munnetra Kazhagam",
    partyAbbr: "DMK",
    constituency: "Chepauk-Thiruvallikeni",
    state: "Tamil Nadu",
    electionType: "Assembly",
    electionYear: 2021,
    age: 46,
    education: "Graduate",
    profession: "Politician / Actor",
    totalAssets: "₹20+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2021",
    lastUpdated: "2026-08-09",
    sortOrder: 2,
    likes: 2700,
    dislikes: 890,
    promises: [
      {
        id: "tn-p-02",
        title: "Youth and sports development initiatives",
        sourceNote: "Public statements",
        announcedDate: "2023–2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-28",
        likes: 1100,
        dislikes: 260,
      },
    ],
  },
  // AIADMK
  {
    id: "tn-aiadmk-01",
    name: "Edappadi K. Palaniswami",
    party: "All India Anna Dravida Munnetra Kazhagam",
    partyAbbr: "AIADMK",
    constituency: "Edappadi",
    state: "Tamil Nadu",
    electionType: "Assembly",
    electionYear: 2021,
    age: 69,
    education: "Graduate",
    profession: "Politician",
    totalAssets: "₹15+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2021",
    lastUpdated: "2026-08-08",
    sortOrder: 1,
    likes: 2500,
    dislikes: 980,
    promises: [
      {
        id: "tn-p-03",
        title: "Focus on agriculture and rural development",
        sourceNote: "Party platform",
        announcedDate: "2021–2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-26",
        likes: 980,
        dislikes: 310,
      },
    ],
  },
  // BJP TN
  {
    id: "tn-bjp-01",
    name: "K. Annamalai",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Coimbatore South (illustrative)",
    state: "Tamil Nadu",
    electionType: "Assembly",
    electionYear: 2021,
    age: 40,
    education: "MBA",
    profession: "Politician / Former IPS",
    totalAssets: "₹5+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2021",
    lastUpdated: "2026-08-06",
    sortOrder: 2,
    likes: 3200,
    dislikes: 1100,
    promises: [
      {
        id: "tn-p-04",
        title: "Anti-corruption and governance reform focus",
        sourceNote: "Public campaign themes",
        announcedDate: "2021–2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-30",
        likes: 1600,
        dislikes: 480,
      },
    ],
  },

  // ==================== KARNATAKA ====================
  // BJP
  {
    id: "ka-bjp-01",
    name: "B.S. Yediyurappa",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Shikaripura",
    state: "Karnataka",
    electionType: "Assembly",
    electionYear: 2023,
    age: 81,
    education: "Graduate",
    profession: "Politician",
    totalAssets: "₹30+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2023",
    lastUpdated: "2026-08-05",
    sortOrder: 2,
    likes: 2100,
    dislikes: 760,
    promises: [
      {
        id: "ka-p-01",
        title: "Support for farmers and rural infrastructure",
        sourceNote: "Long-standing political positions",
        announcedDate: "2023",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-22",
        likes: 890,
        dislikes: 210,
      },
    ],
  },
  // INC
  {
    id: "ka-inc-01",
    name: "Siddaramaiah",
    party: "Indian National Congress",
    partyAbbr: "INC",
    constituency: "Varuna",
    state: "Karnataka",
    electionType: "Assembly",
    electionYear: 2023,
    age: 76,
    education: "BA, LLB",
    profession: "Politician",
    totalAssets: "₹20+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2023",
    lastUpdated: "2026-08-11",
    sortOrder: 1,
    likes: 3400,
    dislikes: 980,
    promises: [
      {
        id: "ka-p-02",
        title: "Guarantee schemes implementation and welfare delivery",
        sourceNote: "Government agenda",
        announcedDate: "2023–2024",
        status: "IN_PROGRESS",
        lastChecked: "2026-08-02",
        likes: 1700,
        dislikes: 390,
      },
    ],
  },
  // JD(S)
  {
    id: "ka-jds-01",
    name: "H.D. Kumaraswamy",
    party: "Janata Dal (Secular)",
    partyAbbr: "JD(S)",
    constituency: "Channapatna",
    state: "Karnataka",
    electionType: "Assembly",
    electionYear: 2023,
    age: 65,
    education: "Graduate",
    profession: "Politician",
    totalAssets: "₹40+ Crore (illustrative)",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    affidavitYear: "2023",
    lastUpdated: "2026-08-04",
    sortOrder: 1,
    likes: 1800,
    dislikes: 620,
    promises: [
      {
        id: "ka-p-03",
        title: "Focus on agriculture and regional development",
        sourceNote: "Party platform",
        announcedDate: "2023",
        status: "IN_PROGRESS",
        lastChecked: "2026-07-19",
        likes: 760,
        dislikes: 180,
      },
    ],
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
  pilotCandidates
    .filter((c) => c.state === state)
    .forEach((c) => {
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

export function getOtherCandidatesInState(partyAbbr: string, state: string) {
  const others = pilotCandidates.filter((c) => c.state === state && c.partyAbbr !== partyAbbr);
  const grouped = new Map<string, PilotCandidate[]>();
  others.forEach((c) => {
    const list = grouped.get(c.partyAbbr) || [];
    list.push(c);
    grouped.set(c.partyAbbr, list);
  });
  return Array.from(grouped.entries()).map(([abbr, candidates]) => ({
    partyAbbr: abbr,
    partyName: candidates[0].party,
    candidates: candidates.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99)),
  }));
}
