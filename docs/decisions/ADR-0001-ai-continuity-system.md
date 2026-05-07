# ADR-0001: Repo-Local AI Continuity System

Date: 2026-05-07

## Status

Accepted

## Context

This project is developed through repeated AI-assisted sessions. Chat history is not a reliable source of project memory, and the app has accumulated product decisions, release workflow details, and implementation conventions that future sessions need quickly.

The repo already has `README.md`, `CHANGELOG.md`, and `PROJECT_NOTES.md`, but those files are not optimized as a concise AI handoff protocol.

## Decision

Use repo-local AI continuity files:

- `AGENTS.md` for Codex-readable project guidance.
- `ai/context.md` for stable project context.
- `ai/current-state.md` for current implementation state.
- `ai/open-threads.md` for unresolved questions.
- `ai/tasks/next-actions.md` for safe next tasks.
- `ai/session-log.md` for dated session summaries.
- `ai/prompts/session-start.md` and `ai/prompts/session-close.md` for repeatable session protocols.

Future sessions should create additional ADRs in `docs/decisions/` for lasting architectural, product, storage, release, or workflow decisions.

## Consequences

- Future Codex/GPT sessions have a predictable starting point.
- Session close work includes updating compact repo-local memory.
- Codex owns routine maintenance of `AGENTS.md`, `ai/`, and `docs/decisions/`; the user should not need to edit those files manually.
- The continuity files must stay concise to remain useful.
- `PROJECT_NOTES.md` remains useful for broader project memory and exploratory notes; `ai/` is the operational handoff layer.
