/**
 * Pilot data — Andhra Pradesh + Telangana
 * Real 2023/2024 ECI affidavit figures (via ADR/MyNeta) applied to the core set.
 * Election opponents from ECI result publications where verified.
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
  /** Margin in votes when known from ECI results */
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
  lastUpdated?: string;
  sortOrder?: number;
  promises: PilotPromise[];
  likes: number;
  dislikes: number;
}

export const pilotCandidates: PilotCandidate[] = [
  // ===================== ANDHRA PRADESH =====================
  {
    id: "ap-tdp-01", name: "N. Chandrababu Naidu", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Kuppam", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won", opponentId: "ap-ysrcp-lost-01", opponentName: "K.R.J. Bharath", opponentParty: "YSRCP", marginVotes: 48006,
    age: 74, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹931 Cr (family, 2024 affidavit)", totalLiabilities: "₹10+ Cr", criminalCases: 19,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 4200, dislikes: 980,
    promises: [
      { id: "ap-p01", title: "Rebuild Amaravati as the capital with renewed focus", sourceNote: "Campaign statements & public agenda", announcedDate: "2024", status: "IN_PROGRESS", evidenceNote: "Multiple public statements and early administrative steps reported after 2024 election.", lastChecked: "2026-08-01", likes: 2100, dislikes: 640 },
      { id: "ap-p02", title: "Strengthen irrigation and farmer support systems", sourceNote: "Manifesto / campaign themes", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-28", likes: 1850, dislikes: 310 },
    ],
  },
  {
    id: "ap-tdp-02", name: "Nara Lokesh", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Mangalagiri", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won", opponentId: "ap-ysrcp-lost-02", opponentName: "Murugudu Lavanya", opponentParty: "YSRCP", marginVotes: 91413,
    age: 41, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹542 Cr (2024 affidavit)", totalLiabilities: "₹18+ Cr", criminalCases: 17,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 2,
    likes: 3100, dislikes: 720,
    promises: [{ id: "ap-p03", title: "Skill development and employment push for youth", sourceNote: "Campaign focus", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-30", likes: 1420, dislikes: 210 }],
  },
  {
    id: "ap-tdp-03", name: "Kinjarapu Atchannaidu", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Tekkali", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won",
    age: 56, education: "12th Pass", profession: "Politician / Farmer",
    totalAssets: "₹17 Cr (2024 affidavit)", totalLiabilities: "₹3.8 Cr", criminalCases: 13,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 3,
    likes: 980, dislikes: 210,
    promises: [{ id: "ap-p04", title: "Local infrastructure and agriculture support", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-22", likes: 410, dislikes: 80 }],
  },
  {
    id: "ap-tdp-04", name: "Kollu Ravindra", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Machilipatnam", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won",
    age: 52, education: "Graduate", profession: "Politician", totalAssets: "Illustrative — pending verification", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-07", sortOrder: 4,
    likes: 760, dislikes: 150,
    promises: [{ id: "ap-p05", title: "Coastal development and fisheries support", sourceNote: "Campaign", announcedDate: "2024", status: "NOT_STARTED", lastChecked: "2026-07-18", likes: 320, dislikes: 60 }],
  },
  {
    id: "ap-tdp-05", name: "K. Ram Mohan Naidu", party: "Telugu Desam Party", partyAbbr: "TDP",
    constituency: "Srikakulam", state: "Andhra Pradesh", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won",
    age: 36, education: "Post Graduate (MBA)", profession: "Public Representative",
    totalAssets: "₹23.3 Cr (2024 affidavit)", totalLiabilities: "₹3 Cr", criminalCases: 4,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 5,
    likes: 1680, dislikes: 320,
    promises: [{ id: "ap-p15", title: "Youth and infrastructure focus in north coastal AP", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-24", likes: 720, dislikes: 110 }],
  },
  {
    id: "ap-ysrcp-01", name: "Y.S. Jagan Mohan Reddy", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Pulivendula", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won",
    age: 51, education: "Graduate", profession: "Politician",
    totalAssets: "₹530 Cr (self) / ₹757 Cr (family, 2024 affidavit)", totalLiabilities: "₹26+ Cr (family)", criminalCases: 29,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 3800, dislikes: 2100,
    promises: [{ id: "ap-p06", title: "Continue major welfare schemes with stronger delivery", sourceNote: "Campaign announcements", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-08-02", likes: 1950, dislikes: 880 }],
  },
  {
    id: "ap-ysrcp-02", name: "Y.S. Vijaya Lakshmi", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Vizianagaram", state: "Andhra Pradesh", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "lost", opponentName: "Appalanaidu Karam", opponentParty: "TDP",
    age: 48, education: "Graduate", profession: "Politician", totalAssets: "Illustrative — pending verification", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-08", sortOrder: 2,
    likes: 980, dislikes: 340,
    promises: [{ id: "ap-p07", title: "Strengthen local health and education infrastructure", sourceNote: "Campaign", announcedDate: "2024", status: "NOT_STARTED", lastChecked: "2026-07-20", likes: 420, dislikes: 95 }],
  },
  {
    id: "ap-ysrcp-03", name: "Botcha Satyanarayana", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Cheepurupalli", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "lost", opponentName: "Nagarjuna", opponentParty: "TDP",
    age: 66, education: "Graduate", profession: "Politician",
    totalAssets: "₹21.2 Cr (2024 affidavit)", totalLiabilities: "₹4.2 Cr", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 3,
    likes: 720, dislikes: 280,
    promises: [{ id: "ap-p08", title: "Constituency-level welfare delivery", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-15", likes: 310, dislikes: 70 }],
  },
  {
    id: "ap-ysrcp-04", name: "Ambati Rambabu", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Sattenapalle", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "lost",
    age: 66, education: "Graduate Professional", profession: "Politician",
    totalAssets: "₹42.6 Cr (2024 affidavit)", totalLiabilities: "₹11.2 Cr", criminalCases: 2,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 4,
    likes: 650, dislikes: 190,
    promises: [{ id: "ap-p09", title: "Rural roads and drinking water focus", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-12", likes: 280, dislikes: 55 }],
  },
  {
    id: "ap-ysrcp-lost-01", name: "K.R.J. Bharath", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Kuppam", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "lost", opponentId: "ap-tdp-01", opponentName: "N. Chandrababu Naidu", opponentParty: "TDP", marginVotes: 48006,
    age: 58, education: "Graduate", profession: "Politician", totalAssets: "Pending full affidavit pull", criminalCases: 0,
    affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 90,
    likes: 210, dislikes: 40, promises: [],
  },
  {
    id: "ap-ysrcp-lost-02", name: "Murugudu Lavanya", party: "Yuvajana Sramika Rythu Congress Party", partyAbbr: "YSRCP",
    constituency: "Mangalagiri", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "lost", opponentId: "ap-tdp-02", opponentName: "Nara Lokesh", opponentParty: "TDP", marginVotes: 91413,
    age: 45, education: "Graduate", profession: "Politician", totalAssets: "Pending full affidavit pull", criminalCases: 0,
    affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 91,
    likes: 180, dislikes: 35, promises: [],
  },
  {
    id: "ap-jsp-01", name: "Pawan Kalyan", party: "Jana Sena Party", partyAbbr: "JSP",
    constituency: "Pithapuram", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won",
    age: 55, education: "10th Pass", profession: "Film Actor / Politician",
    totalAssets: "₹164.5 Cr (2024 affidavit)", totalLiabilities: "₹65+ Cr", criminalCases: 8,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 5100, dislikes: 890,
    promises: [
      { id: "ap-p10", title: "Focus on social justice and transparent governance", sourceNote: "Public statements & campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-08-03", likes: 2400, dislikes: 320 },
      { id: "ap-p11", title: "Support for farmers and youth employment", sourceNote: "Campaign themes", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-29", likes: 1980, dislikes: 270 },
    ],
  },
  {
    id: "ap-jsp-02", name: "Nadendla Manohar", party: "Jana Sena Party", partyAbbr: "JSP",
    constituency: "Tenali", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won",
    age: 60, education: "Post Graduate", profession: "Consultation / Social Service",
    totalAssets: "₹22.9 Cr (2024 affidavit)", totalLiabilities: "₹4.4 Cr", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 2,
    likes: 890, dislikes: 160,
    promises: [{ id: "ap-p12", title: "Local development and party organisational strength", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-21", likes: 380, dislikes: 70 }],
  },
  {
    id: "ap-jsp-03", name: "R.R. Gopal Krishna", party: "Jana Sena Party", partyAbbr: "JSP",
    constituency: "Pendurthi", state: "Andhra Pradesh", electionType: "Assembly", electionYear: 2024,
    electionResult: "won",
    age: 48, education: "Graduate", profession: "Politician", totalAssets: "Illustrative — pending verification", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-06", sortOrder: 3,
    likes: 710, dislikes: 120,
    promises: [{ id: "ap-p13", title: "Urban civic issues and employment", sourceNote: "Campaign", announcedDate: "2024", status: "NOT_STARTED", lastChecked: "2026-07-16", likes: 290, dislikes: 45 }],
  },
  {
    id: "ap-bjp-01", name: "Daggubati Purandeswari", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Rajahmundry", state: "Andhra Pradesh", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won",
    age: 67, education: "Graduate", profession: "Politician",
    totalAssets: "₹62.5 Cr (2024 affidavit)", totalLiabilities: "₹7 Cr", criminalCases: 1,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 1450, dislikes: 410,
    promises: [{ id: "ap-p14", title: "Push central schemes implementation in the constituency", sourceNote: "Campaign focus", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-25", likes: 680, dislikes: 140 }],
  },

  // ===================== TELANGANA =====================
  {
    id: "tg-brs-01", name: "K. Chandrashekar Rao", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Gajwel", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 70, education: "Graduate", profession: "Politician",
    totalAssets: "₹59 Cr (family + HUF, 2023 affidavit)", totalLiabilities: "₹25 Cr", criminalCases: 9,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 3600, dislikes: 1400,
    promises: [{ id: "tg-p01", title: "Continue focus on irrigation and farm support legacy schemes", sourceNote: "Party platform", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-28", likes: 1600, dislikes: 480 }],
  },
  {
    id: "tg-brs-02", name: "K.T. Rama Rao", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Sircilla", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 47, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹53.3 Cr (2023 affidavit)", totalLiabilities: "₹12 Cr", criminalCases: 7,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 2,
    likes: 2900, dislikes: 780,
    promises: [{ id: "tg-p02", title: "Urban development and IT/industry growth focus", sourceNote: "Public positions", announcedDate: "2023–2024", status: "IN_PROGRESS", lastChecked: "2026-07-30", likes: 1250, dislikes: 290 }],
  },
  {
    id: "tg-brs-03", name: "T. Harish Rao", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Siddipet", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 52, education: "Graduate", profession: "Agriculturalist / Politician",
    totalAssets: "₹24.3 Cr (2023 affidavit)", totalLiabilities: "₹11.5 Cr", criminalCases: 5,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 3,
    likes: 2100, dislikes: 520,
    promises: [{ id: "tg-p03", title: "Irrigation and rural water security", sourceNote: "Party focus", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-26", likes: 980, dislikes: 180 }],
  },
  {
    id: "tg-brs-04", name: "Sabitha Indra Reddy", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Maheshwaram", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won", opponentName: "Andela Sriramulu Yadav", opponentParty: "BJP", marginVotes: 26187,
    age: 60, education: "12th Pass", profession: "Politician / Farming",
    totalAssets: "₹9.3 Cr (2023 affidavit)", totalLiabilities: "Nil", criminalCases: 5,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 4,
    likes: 980, dislikes: 240,
    promises: [{ id: "tg-p04", title: "Education and women’s welfare focus", sourceNote: "Campaign", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-20", likes: 410, dislikes: 75 }],
  },
  {
    id: "tg-brs-05", name: "Talasani Srinivas Yadav", party: "Bharat Rashtra Samithi", partyAbbr: "BRS",
    constituency: "Sanathnagar", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "lost",
    age: 58, education: "12th Pass", profession: "Politician",
    totalAssets: "₹74.9 Cr (2023 affidavit)", totalLiabilities: "₹13.9 Cr", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 5,
    likes: 860, dislikes: 190,
    promises: [{ id: "tg-p05", title: "Urban infrastructure and employment", sourceNote: "Campaign", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-18", likes: 360, dislikes: 60 }],
  },
  {
    id: "tg-inc-01", name: "A. Revanth Reddy", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Kodangal", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 56, education: "Graduate", profession: "Politician",
    totalAssets: "₹30 Cr (2023 affidavit)", totalLiabilities: "₹1.3 Cr", criminalCases: 89,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 3100, dislikes: 920,
    promises: [{ id: "tg-p06", title: "Implement six guarantees and welfare delivery", sourceNote: "Government agenda", announcedDate: "2023–2024", status: "IN_PROGRESS", lastChecked: "2026-08-02", likes: 1550, dislikes: 410 }],
  },
  {
    id: "tg-inc-02", name: "Bhatti Vikramarka", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Madhira", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 63, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹8.13 Cr (2023 affidavit)", totalLiabilities: "Nil", criminalCases: 3,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 2,
    likes: 1450, dislikes: 380,
    promises: [{ id: "tg-p07", title: "Farm support and rural development", sourceNote: "Government focus", announcedDate: "2023–2024", status: "IN_PROGRESS", lastChecked: "2026-07-29", likes: 620, dislikes: 140 }],
  },
  {
    id: "tg-inc-03", name: "Uttam Kumar Reddy", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Huzurnagar", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 59, education: "Graduate", profession: "Politician",
    totalAssets: "₹6 Cr (2023 affidavit)", totalLiabilities: "₹86 Lakh", criminalCases: 11,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 3,
    likes: 1100, dislikes: 290,
    promises: [{ id: "tg-p08", title: "Irrigation and constituency development", sourceNote: "Campaign", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-25", likes: 480, dislikes: 90 }],
  },
  {
    id: "tg-inc-04", name: "Danam Nagender", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Khairatabad", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 60, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹68.9 Cr (2023 affidavit)", totalLiabilities: "₹49.6 Cr", criminalCases: 1,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 4,
    likes: 920, dislikes: 210,
    promises: [{ id: "tg-p09", title: "Urban civic services and local employment", sourceNote: "Campaign", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-22", likes: 380, dislikes: 70 }],
  },
  {
    id: "tg-inc-05", name: "Seethakka", party: "Indian National Congress", partyAbbr: "INC",
    constituency: "Mulug", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 52, education: "Doctorate", profession: "Politician",
    totalAssets: "₹83 Lakh (2023 affidavit)", totalLiabilities: "₹25 Lakh", criminalCases: 6,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 5,
    likes: 780, dislikes: 150,
    promises: [{ id: "tg-p10", title: "Tribal welfare and forest-area development", sourceNote: "Campaign", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-19", likes: 340, dislikes: 55 }],
  },
  {
    id: "tg-bjp-01", name: "Bandi Sanjay Kumar", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Karimnagar", state: "Telangana", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won",
    age: 52, education: "Post Graduate", profession: "Politician",
    totalAssets: "₹1.13 Cr (2024 affidavit)", totalLiabilities: "₹13 Lakh", criminalCases: 42,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 1,
    likes: 1750, dislikes: 560,
    promises: [{ id: "tg-p11", title: "Strengthen central scheme reach and local development", sourceNote: "Campaign themes", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-25", likes: 720, dislikes: 180 }],
  },
  {
    id: "tg-bjp-02", name: "Konda Vishweshwar Reddy", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Chevella", state: "Telangana", electionType: "Lok Sabha", electionYear: 2024,
    electionResult: "won",
    age: 64, education: "Graduate Professional", profession: "Politician / Industrialist",
    totalAssets: "₹4,568 Cr (family, 2024 affidavit)", totalLiabilities: "₹13.8 Cr", criminalCases: 4,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2024", lastUpdated: "2026-08-16", sortOrder: 2,
    likes: 1320, dislikes: 340,
    promises: [{ id: "tg-p12", title: "Industry and urban infrastructure focus", sourceNote: "Campaign", announcedDate: "2024", status: "IN_PROGRESS", lastChecked: "2026-07-23", likes: 580, dislikes: 120 }],
  },
  {
    id: "tg-bjp-03", name: "Etela Rajender", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Huzurabad", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 59, education: "Graduate", profession: "Agriculture / Politician",
    totalAssets: "₹53.9 Cr (2023 affidavit)", totalLiabilities: "₹19 Cr", criminalCases: 39,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-16", sortOrder: 3,
    likes: 1180, dislikes: 410,
    promises: [{ id: "tg-p13", title: "Local development and farmer issues", sourceNote: "Campaign", announcedDate: "2023–2024", status: "IN_PROGRESS", lastChecked: "2026-07-21", likes: 490, dislikes: 110 }],
  },
  {
    id: "tg-bjp-04", name: "Raghunandan Rao", party: "Bharatiya Janata Party", partyAbbr: "BJP",
    constituency: "Dubbak", state: "Telangana", electionType: "Assembly", electionYear: 2023,
    electionResult: "won",
    age: 48, education: "Graduate", profession: "Politician", totalAssets: "Illustrative — pending verification", criminalCases: 0,
    affidavitPdfUrl: "https://affidavit.eci.gov.in/", affidavitYear: "2023", lastUpdated: "2026-08-04", sortOrder: 4,
    likes: 860, dislikes: 230,
    promises: [{ id: "tg-p14", title: "Constituency infrastructure and youth focus", sourceNote: "Campaign", announcedDate: "2023", status: "IN_PROGRESS", lastChecked: "2026-07-17", likes: 350, dislikes: 65 }],
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
