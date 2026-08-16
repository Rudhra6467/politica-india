/**
 * Tier 2A — Migrate pilot TypeScript data into canonical Postgres entities.
 *
 * Requires DATABASE_URL.
 * Run: npx prisma db push && npx prisma db seed
 *
 * Stable IDs are preserved from pilot (e.g. ap-tdp-01) so profile URLs stay valid.
 */

import { PrismaClient, PromiseStatus, SourceType, ReliabilityClass, EventType } from "@prisma/client";

const prisma = new PrismaClient();

function slugState(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function constituencyId(name: string, state: string, electionType: string) {
  const type = electionType === "Lok Sabha" ? "pc" : "ac";
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${type}-${slugState(state).slice(0, 2)}`;
}

function parseStatus(s: string): PromiseStatus {
  const map: Record<string, PromiseStatus> = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    REPORTED_COMPLETED: "REPORTED_COMPLETED",
    VERIFIED_COMPLETED: "VERIFIED_COMPLETED",
    UNABLE_TO_VERIFY: "UNABLE_TO_VERIFY",
    EVIDENCE_CONFLICTING: "EVIDENCE_CONFLICTING",
  };
  return map[s] ?? "NOT_STARTED";
}

function parseDate(s?: string): Date | null {
  if (!s) return null;
  // Accept "2024", "2024-04", "2026-08-16"
  if (/^\d{4}$/.test(s)) return new Date(`${s}-01-01`);
  if (/^\d{4}-\d{2}$/.test(s)) return new Date(`${s}-01`);
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function main() {
  // Dynamic import so seed can run after build paths resolve
  const { pilotCandidates } = await import("../src/data/pilot-candidates");

  console.log(`Seeding ${pilotCandidates.length} pilot candidates…`);

  // Default ECI affidavit source (shared)
  const eciSource = await prisma.source.upsert({
    where: { id: "src-eci-form26" },
    create: {
      id: "src-eci-form26",
      publisher: "Election Commission of India",
      title: "Form 26 Affidavit",
      url: "https://affidavit.eci.gov.in/",
      sourceType: SourceType.AFFIDAVIT,
      reliabilityClass: ReliabilityClass.OFFICIAL,
      retrievedAt: new Date("2026-08-16"),
    },
    update: {},
  });

  const eciResultSource = await prisma.source.upsert({
    where: { id: "src-eci-results" },
    create: {
      id: "src-eci-results",
      publisher: "Election Commission of India",
      title: "Election results",
      url: "https://results.eci.gov.in/",
      sourceType: SourceType.ELECTION_RECORD,
      reliabilityClass: ReliabilityClass.OFFICIAL,
      retrievedAt: new Date("2026-08-16"),
    },
    update: {},
  });

  // States
  const stateNames = Array.from(new Set(pilotCandidates.map((c) => c.state)));
  for (const name of stateNames) {
    await prisma.state.upsert({
      where: { id: slugState(name) },
      create: { id: slugState(name), name, aliases: [] },
      update: { name },
    });
  }

  // Parties
  const parties = new Map<string, { name: string; abbr: string }>();
  for (const c of pilotCandidates) {
    parties.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr });
  }
  for (const p of parties.values()) {
    await prisma.party.upsert({
      where: { id: p.abbr },
      create: {
        id: p.abbr,
        name: p.name,
        abbr: p.abbr,
        aliases: [p.abbr, p.name],
        symbolNote: "Simplified ECI-style election symbol",
      },
      update: { name: p.name },
    });
  }

  // Constituencies
  for (const c of pilotCandidates) {
    const cid = constituencyId(c.constituency, c.state, c.electionType);
    const type = c.electionType === "Lok Sabha" ? "PC" : "AC";
    await prisma.constituency.upsert({
      where: { id: cid },
      create: {
        id: cid,
        name: c.constituency,
        stateId: slugState(c.state),
        type,
        aliases: [c.constituency],
      },
      update: { name: c.constituency },
    });
  }

  // Candidates — first pass without opponent links
  for (const c of pilotCandidates) {
    const cid = constituencyId(c.constituency, c.state, c.electionType);
    await prisma.candidate.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        canonicalName: c.name,
        aliases: [c.name],
        partyId: c.partyAbbr,
        constituencyId: cid,
        stateId: slugState(c.state),
        electionType: c.electionType,
        electionYear: c.electionYear,
        electionResult: c.electionResult ?? null,
        marginVotes: c.marginVotes ?? null,
        age: c.age ?? null,
        education: c.education ?? null,
        profession: c.profession ?? null,
        totalAssets: c.totalAssets ?? null,
        totalLiabilities: c.totalLiabilities ?? null,
        criminalCases: c.criminalCases,
        photoUrl: c.photoUrl ?? null,
        sortOrder: c.sortOrder ?? 99,
      },
      update: {
        canonicalName: c.name,
        partyId: c.partyAbbr,
        constituencyId: cid,
        stateId: slugState(c.state),
        electionResult: c.electionResult ?? null,
        marginVotes: c.marginVotes ?? null,
        totalAssets: c.totalAssets ?? null,
        totalLiabilities: c.totalLiabilities ?? null,
        criminalCases: c.criminalCases,
        sortOrder: c.sortOrder ?? 99,
      },
    });
  }

  // Opponent links (second pass — both candidates exist)
  for (const c of pilotCandidates) {
    if (!c.opponentId) continue;
    const exists = pilotCandidates.some((x) => x.id === c.opponentId);
    if (!exists) continue;
    await prisma.candidate.update({
      where: { id: c.id },
      data: { opponentId: c.opponentId },
    });
  }

  // Affidavits + election events + promises
  for (const c of pilotCandidates) {
    const year = c.affidavitYear ? parseInt(c.affidavitYear, 10) : c.electionYear;

    await prisma.affidavit.deleteMany({ where: { candidateId: c.id } });
    await prisma.affidavit.create({
      data: {
        candidateId: c.id,
        electionYear: year,
        sourceId: eciSource.id,
        totalAssets: c.totalAssets ?? null,
        totalLiabilities: c.totalLiabilities ?? null,
        criminalCases: c.criminalCases,
        education: c.education ?? null,
        profession: c.profession ?? null,
        pdfUrl: c.affidavitPdfUrl ?? null,
        lastCheckedAt: c.lastUpdated ? parseDate(c.lastUpdated) : new Date("2026-08-16"),
      },
    });

    // Election event
    await prisma.event.deleteMany({
      where: { candidateId: c.id, type: EventType.ELECTION },
    });
    await prisma.event.create({
      data: {
        candidateId: c.id,
        electionYear: c.electionYear,
        type: EventType.ELECTION,
        title: `${c.electionType} ${c.electionYear} — ${c.electionResult ?? "contested"}`,
        description: c.marginVotes
          ? `Margin ${c.marginVotes.toLocaleString()} votes`
          : undefined,
        occurredAt: new Date(`${c.electionYear}-06-01`),
        sourceId: eciResultSource.id,
      },
    });

    // Affidavit event
    await prisma.event.create({
      data: {
        candidateId: c.id,
        electionYear: year,
        type: EventType.AFFIDAVIT,
        title: `Form 26 affidavit (${year})`,
        occurredAt: new Date(`${year}-04-01`),
        sourceId: eciSource.id,
      },
    });

    // Promises
    for (const p of c.promises) {
      const lastChecked = parseDate(p.lastChecked);
      await prisma.promise.upsert({
        where: { id: p.id },
        create: {
          id: p.id,
          candidateId: c.id,
          title: p.title,
          sourceNote: p.sourceNote ?? null,
          announcedDate: p.announcedDate ?? null,
          status: parseStatus(p.status),
          statusAsOf: lastChecked,
          lastCheckedAt: lastChecked,
          evidenceNote: p.evidenceNote ?? null,
        },
        update: {
          title: p.title,
          sourceNote: p.sourceNote ?? null,
          status: parseStatus(p.status),
          statusAsOf: lastChecked,
          lastCheckedAt: lastChecked,
          evidenceNote: p.evidenceNote ?? null,
        },
      });
    }
  }

  const counts = {
    states: await prisma.state.count(),
    parties: await prisma.party.count(),
    constituencies: await prisma.constituency.count(),
    candidates: await prisma.candidate.count(),
    affidavits: await prisma.affidavit.count(),
    promises: await prisma.promise.count(),
    events: await prisma.event.count(),
    sources: await prisma.source.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
