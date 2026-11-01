/**
 * Data integrity check for the pilot dataset.
 * Run: npm run check:data
 * Guards against the accidental truncations seen in repo history.
 */
import { pilotCandidates, type PilotCandidate } from "../src/data/pilot-candidates";
import { partyInfoMap } from "../src/data/party-info";

const errors: string[] = [];
const warn: string[] = [];
const MIN_CANDIDATES = 29;

if (pilotCandidates.length < MIN_CANDIDATES) {
  errors.push(`Expected at least ${MIN_CANDIDATES} candidates, found ${pilotCandidates.length}`);
}

const ids = new Set<string>();
const promiseIds = new Set<string>();
const idPattern = /^(ap|tg)-[a-z]+-(lost-)?\d{2}$/;

for (const c of pilotCandidates) {
  const tag = `${c.id} (${c.name})`;
  if (ids.has(c.id)) errors.push(`Duplicate candidate id ${c.id}`);
  ids.add(c.id);
  if (!idPattern.test(c.id)) errors.push(`${tag}: id does not match pattern`);
  if (!c.name.trim()) errors.push(`${tag}: empty name`);
  if (!partyInfoMap[c.partyAbbr]) warn.push(`${tag}: party ${c.partyAbbr} has no PartyInfo entry`);
  if (c.sortOrder == null) warn.push(`${tag}: missing sortOrder`);
  if (!["Assembly", "Lok Sabha"].includes(c.electionType)) errors.push(`${tag}: unknown electionType ${c.electionType}`);
  if (c.photoUrl && !c.photoUrl.startsWith("https://")) errors.push(`${tag}: photoUrl must be https`);
  if (c.photoUrl && !c.photoSource) warn.push(`${tag}: photo without photoSource attribution`);
  if (c.criminalCases < 0) errors.push(`${tag}: negative criminalCases`);
  if (typeof c.likes !== "number" || typeof c.dislikes !== "number") errors.push(`${tag}: likes/dislikes must be numbers`);
  for (const p of c.promises) {
    if (promiseIds.has(p.id)) errors.push(`Duplicate promise id ${p.id} on ${tag}`);
    promiseIds.add(p.id);
    if (!p.title.trim()) errors.push(`${tag}: promise ${p.id} has empty title`);
    if (p.status === "IN_PROGRESS" && !p.evidenceNote) {
      errors.push(`${tag}: promise ${p.id} is IN_PROGRESS without evidenceNote (use UNABLE_TO_VERIFY)`);
    }
    if (["REPORTED_COMPLETED", "VERIFIED_COMPLETED"].includes(p.status) && !p.evidenceNote) {
      errors.push(`${tag}: promise ${p.id} is ${p.status} without evidenceNote`);
    }
  }
}

for (const c of pilotCandidates) {
  if (c.opponentId && !ids.has(c.opponentId)) {
    errors.push(`${c.id}: opponentId ${c.opponentId} does not exist`);
  }
}

const byState = pilotCandidates.reduce<Record<string, number>>((m, c) => ((m[c.state] = (m[c.state] ?? 0) + 1), m), {});
const photos = pilotCandidates.filter((c: PilotCandidate) => c.photoUrl).length;
const promises = pilotCandidates.reduce((n, c) => n + c.promises.length, 0);

console.log(`Candidates: ${pilotCandidates.length}  ${JSON.stringify(byState)}`);
console.log(`Photos: ${photos}  Promises: ${promises}`);
for (const w of warn) console.log(`warn: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);
if (errors.length) {
  console.error(`\n${errors.length} data error(s)`);
  process.exit(1);
}
console.log("Data OK");
