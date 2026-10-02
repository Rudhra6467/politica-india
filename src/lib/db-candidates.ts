import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CandidateView = {
  id: string;
  name: string;
  party: string;
  partyAbbr: string;
  state: string;
  constituency: string;
  electionType: string;
  electionYear: number;
  electionResult: string | null;
  marginVotes: number | null;
  opponentId: string | null;
  opponentName: string | null;
  age: number | null;
  education: string | null;
  profession: string | null;
  totalAssets: string | null;
  totalLiabilities: string | null;
  criminalCases: number;
  photoUrl: string | null;
  promises: Array<{
    id: string; title: string; status: string; announcedDate: string | null;
    sourceNote: string | null; evidenceNote: string | null; lastCheckedAt: string | null;
  }>;
  events: Array<{
    id: string; type: string; title: string; description: string | null;
    occurredAt: string; source: { publisher: string; title: string | null; url: string | null } | null;
  }>;
  affidavit: {
    year: number; pdfUrl: string | null; source: { publisher: string; title: string | null; url: string | null } | null;
  } | null;
};

const include = {
  party: true,
  state: true,
  constituency: true,
  opponent: { select: { id: true, canonicalName: true } },
  promises: { orderBy: { updatedAt: "desc" as const } },
  events: { include: { source: true }, orderBy: { occurredAt: "desc" as const } },
  affidavits: { include: { source: true }, orderBy: { electionYear: "desc" as const } },
} satisfies Prisma.CandidateInclude;

function mapCandidate(c: Prisma.CandidateGetPayload<{ include: typeof include }>): CandidateView {
  const affidavit = c.affidavits[0] ?? null;
  return {
    id: c.id, name: c.canonicalName, party: c.party.name, partyAbbr: c.party.abbr,
    state: c.state.name, constituency: c.constituency.name, electionType: c.electionType,
    electionYear: c.electionYear, electionResult: c.electionResult, marginVotes: c.marginVotes,
    opponentId: c.opponentId, opponentName: c.opponent?.canonicalName ?? null,
    age: c.age, education: c.education, profession: c.profession,
    totalAssets: c.totalAssets, totalLiabilities: c.totalLiabilities,
    criminalCases: c.criminalCases, photoUrl: c.photoUrl,
    promises: c.promises.map(p => ({
      id: p.id, title: p.title, status: p.status, announcedDate: p.announcedDate,
      sourceNote: p.sourceNote, evidenceNote: p.evidenceNote,
      lastCheckedAt: p.lastCheckedAt?.toISOString() ?? null,
    })),
    events: c.events.map(e => ({
      id: e.id, type: e.type, title: e.title, description: e.description,
      occurredAt: e.occurredAt.toISOString(),
      source: e.source ? { publisher: e.source.publisher, title: e.source.title, url: e.source.url } : null,
    })),
    affidavit: affidavit ? {
      year: affidavit.electionYear, pdfUrl: affidavit.pdfUrl,
      source: affidavit.source ? { publisher: affidavit.source.publisher, title: affidavit.source.title, url: affidavit.source.url } : null,
    } : null,
  };
}

export async function dbCandidateById(id: string): Promise<CandidateView | null> {
  const c = await prisma.candidate.findUnique({ where: { id }, include });
  return c ? mapCandidate(c) : null;
}

export async function dbCandidates(query?: string, state?: string): Promise<CandidateView[]> {
  const q = query?.trim();
  const where: Prisma.CandidateWhereInput = {
    ...(state ? { state: { name: state } } : {}),
    ...(q ? {
      OR: [
        { canonicalName: { contains: q, mode: "insensitive" } },
        { aliases: { has: q } },
        { party: { name: { contains: q, mode: "insensitive" } } },
        { party: { abbr: { contains: q, mode: "insensitive" } } },
        { constituency: { name: { contains: q, mode: "insensitive" } } },
        { state: { name: { contains: q, mode: "insensitive" } } },
      ],
    } : {}),
  };
  const rows = await prisma.candidate.findMany({ where, include, orderBy: [{ state: { name: "asc" } }, { canonicalName: "asc" }] });
  return rows.map(mapCandidate);
}
