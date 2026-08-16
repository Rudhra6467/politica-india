/**
 * Pilot seed data for Politica India MVP
 * All affidavit-style numbers are illustrative placeholders.
 * Real data will come from ECI Form 26 PDFs + attribution.
 */

export type PromiseStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "DISPUTED";

export interface PilotPromise {
  id: string;
  title: string;
  description?: string;
  sourceUrl?: string;
  sourceNote?: string;
  status: PromiseStatus;
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
  photoUrl?: string;
  promises: PilotPromise[];
  likes: number;
  dislikes: number;
}

export const pilotCandidates: PilotCandidate[] = [
  // ========== GUJARAT ==========
  {
    id: "cand-001",
    name: "Arjun Mehta",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Gandhinagar",
    state: "Gujarat",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 48,
    education: "MBA, IIM Ahmedabad",
    profession: "Businessman",
    totalAssets: "₹12.4 Crore",
    totalLiabilities: "₹1.8 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1842,
    dislikes: 317,
    promises: [
      { id: "p-001", title: "Complete the 4-lane ring road around Gandhinagar within 24 months", sourceNote: "Campaign speech, March 2024", status: "IN_PROGRESS", likes: 892, dislikes: 145 },
      { id: "p-002", title: "Set up a skill development centre for 5,000 youth", sourceNote: "Manifesto point", status: "NOT_STARTED", likes: 634, dislikes: 89 },
      { id: "p-003", title: "Ensure 24×7 electricity in all villages of the constituency", status: "COMPLETED", likes: 1205, dislikes: 62 },
    ],
  },
  {
    id: "cand-006",
    name: "Kiran Patel",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Ahmedabad East",
    state: "Gujarat",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 52,
    education: "B.Com",
    profession: "Businessman",
    totalAssets: "₹9.8 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1120,
    dislikes: 210,
    promises: [
      { id: "p-013", title: "Build a new multi-specialty hospital in Ahmedabad East", status: "IN_PROGRESS", likes: 670, dislikes: 95 },
      { id: "p-014", title: "Upgrade all municipal schools with smart classrooms", status: "NOT_STARTED", likes: 540, dislikes: 80 },
    ],
  },
  {
    id: "cand-007",
    name: "Sunita Desai",
    party: "Indian National Congress",
    partyAbbr: "INC",
    constituency: "Gandhinagar",
    state: "Gujarat",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 45,
    education: "MA Sociology",
    profession: "Social Worker",
    totalAssets: "₹2.7 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 890,
    dislikes: 340,
    promises: [
      { id: "p-015", title: "Increase pension for widows and elderly in the constituency", status: "NOT_STARTED", likes: 720, dislikes: 110 },
      { id: "p-016", title: "Ensure 100% household water connections within 18 months", status: "IN_PROGRESS", likes: 610, dislikes: 85 },
    ],
  },

  // ========== RAJASTHAN ==========
  {
    id: "cand-002",
    name: "Priya Sharma",
    party: "Indian National Congress",
    partyAbbr: "INC",
    constituency: "Jaipur Rural",
    state: "Rajasthan",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 42,
    education: "MA Political Science",
    profession: "Social Worker",
    totalAssets: "₹3.1 Crore",
    totalLiabilities: "₹42 Lakh",
    criminalCases: 1,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 2103,
    dislikes: 478,
    promises: [
      { id: "p-004", title: "Build 200 new anganwadi centres in the constituency", sourceNote: "Press conference, April 2024", status: "IN_PROGRESS", likes: 1102, dislikes: 203 },
      { id: "p-005", title: "Free bus travel for women across the district", status: "DISPUTED", likes: 1567, dislikes: 812 },
      { id: "p-006", title: "Plant 10 lakh trees under Green Jaipur drive", status: "NOT_STARTED", likes: 734, dislikes: 91 },
    ],
  },
  {
    id: "cand-008",
    name: "Vikram Singh",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Jaipur Rural",
    state: "Rajasthan",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 50,
    education: "BA",
    profession: "Farmer",
    totalAssets: "₹6.2 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1650,
    dislikes: 390,
    promises: [
      { id: "p-017", title: "Complete the missing links of rural roads under PMGSY", status: "IN_PROGRESS", likes: 880, dislikes: 120 },
      { id: "p-018", title: "Set up a new ITI in every block of the constituency", status: "NOT_STARTED", likes: 540, dislikes: 70 },
    ],
  },
  {
    id: "cand-009",
    name: "Asha Choudhary",
    party: "Indian National Congress",
    partyAbbr: "INC",
    constituency: "Alwar",
    state: "Rajasthan",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 47,
    education: "LLB",
    profession: "Advocate",
    totalAssets: "₹4.5 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 980,
    dislikes: 210,
    promises: [
      { id: "p-019", title: "Establish a government college for girls in Alwar", status: "IN_PROGRESS", likes: 710, dislikes: 65 },
    ],
  },

  // ========== ANDHRA PRADESH ==========
  {
    id: "cand-003",
    name: "Suresh Reddy",
    party: "Telugu Desam Party",
    partyAbbr: "TDP",
    constituency: "Guntur",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 55,
    education: "B.Tech",
    profession: "Agriculturist",
    totalAssets: "₹8.7 Crore",
    totalLiabilities: "₹2.3 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 965,
    dislikes: 214,
    promises: [
      { id: "p-007", title: "Construct irrigation canals covering 15,000 acres", sourceNote: "Election manifesto 2024", status: "IN_PROGRESS", likes: 723, dislikes: 118 },
      { id: "p-008", title: "Establish a government medical college in Guntur rural", status: "NOT_STARTED", likes: 891, dislikes: 67 },
    ],
  },
  {
    id: "cand-010",
    name: "Lakshmi Naidu",
    party: "Telugu Desam Party",
    partyAbbr: "TDP",
    constituency: "Vijayawada",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 49,
    education: "MBA",
    profession: "Businesswoman",
    totalAssets: "₹11.2 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1340,
    dislikes: 180,
    promises: [
      { id: "p-020", title: "Develop Vijayawada as a major logistics hub", status: "IN_PROGRESS", likes: 920, dislikes: 110 },
      { id: "p-021", title: "Provide free laptops to all intermediate students", status: "NOT_STARTED", likes: 780, dislikes: 95 },
    ],
  },
  {
    id: "cand-011",
    name: "Ravi Krishna",
    party: "Yuvajana Sramika Rythu Congress Party",
    partyAbbr: "YSRCP",
    constituency: "Guntur",
    state: "Andhra Pradesh",
    electionType: "Assembly",
    electionYear: 2024,
    age: 44,
    education: "B.Sc",
    profession: "Politician",
    totalAssets: "₹5.4 Crore",
    criminalCases: 1,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1120,
    dislikes: 450,
    promises: [
      { id: "p-022", title: "Continue Amma Vodi scheme with higher support amount", status: "IN_PROGRESS", likes: 980, dislikes: 210 },
      { id: "p-023", title: "Build 50 new Rythu Bharosa Kendras", status: "NOT_STARTED", likes: 670, dislikes: 130 },
    ],
  },

  // ========== WEST BENGAL ==========
  {
    id: "cand-004",
    name: "Fatima Begum",
    party: "All India Trinamool Congress",
    partyAbbr: "AITC",
    constituency: "Kolkata South",
    state: "West Bengal",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 39,
    education: "LLB",
    profession: "Advocate",
    totalAssets: "₹1.9 Crore",
    totalLiabilities: "₹18 Lakh",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1421,
    dislikes: 356,
    promises: [
      { id: "p-009", title: "Upgrade all government schools with digital classrooms", status: "IN_PROGRESS", likes: 978, dislikes: 142 },
      { id: "p-010", title: "Women safety helpline with 24×7 response in the constituency", status: "COMPLETED", likes: 1345, dislikes: 88 },
    ],
  },
  {
    id: "cand-012",
    name: "Subhash Banerjee",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Kolkata South",
    state: "West Bengal",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 56,
    education: "MA",
    profession: "Teacher",
    totalAssets: "₹3.8 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 980,
    dislikes: 520,
    promises: [
      { id: "p-024", title: "Clean the canals and improve drainage in southern Kolkata", status: "NOT_STARTED", likes: 810, dislikes: 140 },
    ],
  },
  {
    id: "cand-013",
    name: "Ananya Ghosh",
    party: "All India Trinamool Congress",
    partyAbbr: "AITC",
    constituency: "Dum Dum",
    state: "West Bengal",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 41,
    education: "MBA",
    profession: "Social Worker",
    totalAssets: "₹2.4 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1180,
    dislikes: 290,
    promises: [
      { id: "p-025", title: "Build 100 new community toilets under Swachh Bharat", status: "IN_PROGRESS", likes: 650, dislikes: 70 },
      { id: "p-026", title: "Start night shelters for the homeless in the constituency", status: "NOT_STARTED", likes: 720, dislikes: 55 },
    ],
  },

  // ========== UTTAR PRADESH ==========
  {
    id: "cand-005",
    name: "Rajesh Kumar Yadav",
    party: "Samajwadi Party",
    partyAbbr: "SP",
    constituency: "Mainpuri",
    state: "Uttar Pradesh",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 51,
    education: "BA",
    profession: "Farmer",
    totalAssets: "₹5.6 Crore",
    totalLiabilities: "₹95 Lakh",
    criminalCases: 2,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1789,
    dislikes: 623,
    promises: [
      { id: "p-011", title: "Ensure MSP procurement centres in every tehsil", sourceNote: "Rally speech", status: "NOT_STARTED", likes: 1123, dislikes: 287 },
      { id: "p-012", title: "Build a new degree college for girls in Mainpuri", status: "IN_PROGRESS", likes: 845, dislikes: 156 },
    ],
  },
  {
    id: "cand-014",
    name: "Amitabh Verma",
    party: "Bharatiya Janata Party",
    partyAbbr: "BJP",
    constituency: "Mainpuri",
    state: "Uttar Pradesh",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 48,
    education: "B.Tech",
    profession: "Engineer",
    totalAssets: "₹7.1 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1450,
    dislikes: 510,
    promises: [
      { id: "p-027", title: "Connect all villages with concrete roads under CM GRam Sadak Yojana", status: "IN_PROGRESS", likes: 890, dislikes: 160 },
      { id: "p-028", title: "Open a new government polytechnic in Mainpuri", status: "NOT_STARTED", likes: 610, dislikes: 90 },
    ],
  },
  {
    id: "cand-015",
    name: "Suman Devi",
    party: "Samajwadi Party",
    partyAbbr: "SP",
    constituency: "Etawah",
    state: "Uttar Pradesh",
    electionType: "Lok Sabha",
    electionYear: 2024,
    age: 46,
    education: "MA",
    profession: "Teacher",
    totalAssets: "₹2.9 Crore",
    criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/",
    likes: 1020,
    dislikes: 280,
    promises: [
      { id: "p-029", title: "Provide free coaching for competitive exams to poor students", status: "IN_PROGRESS", likes: 780, dislikes: 95 },
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
      if (existing) {
        existing.count += 1;
      } else {
        map.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr, count: 1 });
      }
    });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getNationalParties() {
  const map = new Map<string, { name: string; abbr: string; count: number }>();
  pilotCandidates.forEach((c) => {
    const existing = map.get(c.partyAbbr);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr, count: 1 });
    }
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getCandidatesByPartyAndState(partyAbbr: string, state: string) {
  return pilotCandidates.filter((c) => c.partyAbbr === partyAbbr && c.state === state);
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
    candidates,
  }));
}
