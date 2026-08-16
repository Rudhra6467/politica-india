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
      {
        id: "p-001",
        title: "Complete the 4-lane ring road around Gandhinagar within 24 months",
        sourceNote: "Campaign speech, March 2024",
        status: "IN_PROGRESS",
        likes: 892,
        dislikes: 145,
      },
      {
        id: "p-002",
        title: "Set up a skill development centre for 5,000 youth",
        sourceNote: "Manifesto point",
        status: "NOT_STARTED",
        likes: 634,
        dislikes: 89,
      },
      {
        id: "p-003",
        title: "Ensure 24×7 electricity in all villages of the constituency",
        status: "COMPLETED",
        likes: 1205,
        dislikes: 62,
      },
    ],
  },
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
      {
        id: "p-004",
        title: "Build 200 new anganwadi centres in the constituency",
        sourceNote: "Press conference, April 2024",
        status: "IN_PROGRESS",
        likes: 1102,
        dislikes: 203,
      },
      {
        id: "p-005",
        title: "Free bus travel for women across the district",
        status: "DISPUTED",
        likes: 1567,
        dislikes: 812,
      },
      {
        id: "p-006",
        title: "Plant 10 lakh trees under Green Jaipur drive",
        status: "NOT_STARTED",
        likes: 734,
        dislikes: 91,
      },
    ],
  },
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
      {
        id: "p-007",
        title: "Construct irrigation canals covering 15,000 acres",
        sourceNote: "Election manifesto 2024",
        status: "IN_PROGRESS",
        likes: 723,
        dislikes: 118,
      },
      {
        id: "p-008",
        title: "Establish a government medical college in Guntur rural",
        status: "NOT_STARTED",
        likes: 891,
        dislikes: 67,
      },
    ],
  },
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
      {
        id: "p-009",
        title: "Upgrade all government schools with digital classrooms",
        status: "IN_PROGRESS",
        likes: 978,
        dislikes: 142,
      },
      {
        id: "p-010",
        title: "Women safety helpline with 24×7 response in the constituency",
        status: "COMPLETED",
        likes: 1345,
        dislikes: 88,
      },
    ],
  },
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
      {
        id: "p-011",
        title: "Ensure MSP procurement centres in every tehsil",
        sourceNote: "Rally speech",
        status: "NOT_STARTED",
        likes: 1123,
        dislikes: 287,
      },
      {
        id: "p-012",
        title: "Build a new degree college for girls in Mainpuri",
        status: "IN_PROGRESS",
        likes: 845,
        dislikes: 156,
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
  // Group remaining candidates by party
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
