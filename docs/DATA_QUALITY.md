# Politica India — Data Quality Contract

Every canonical record must be classifiable.

## Verification states

### VERIFIED
Supported by an authoritative primary/official source.

### DOCUMENTED
Supported by a named source but not treated as an official verified record.

### CONFLICTING
Two credible sources disagree. Preserve both source references; do not silently choose one.

### UNVERIFIED
Known or user-submitted information without sufficient evidence.

### STALE
Previously supported information whose refresh date has exceeded the configured review window.

## Rules

- Never manufacture missing values.
- Never convert a community comment into a fact.
- Never use a political ranking or score as a substitute for evidence.
- Preserve source URL, publisher, retrieval date, and when available a content hash.
- Corrections should create an auditable change rather than erasing the previous state.
- A missing source is a data-quality failure, not permission to infer.

## Candidate profile minimum

A candidate record should have:

- stable candidate ID
- party
- constituency
- election context
- source-backed election result
- source-backed affidavit when an affidavit is claimed
- explicit unknown/pending state for unavailable fields

## Promise minimum

A tracked promise should have:

- stable ID
- candidate/party association
- claim text/title
- announcement/source reference
- current status
- status-as-of date
- evidence note or explicit inability to verify
