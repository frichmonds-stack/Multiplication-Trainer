# Session Close Prompt

Use this before ending a future AI coding session:

1. Run the best available checks.
2. Update all documentation affected by the work, including `README.md`, `CHANGELOG.md`, `PROJECT_NOTES.md`, `docs/index.html`, or `docs/v*` snapshots when relevant.
3. Update `ai/current-state.md`.
4. Append a dated entry to `ai/session-log.md`.
5. Update `ai/tasks/next-actions.md`.
6. Update `ai/open-threads.md`.
7. Add or update an ADR in `docs/decisions/` for lasting decisions.
8. For release/publish work, run the snapshot flow, run repo checks, confirm `git status --short`, confirm `git remote -v`, push only when requested/approved, and verify the live GitHub Pages URL when possible.
9. Maintain `AGENTS.md`, `ai/`, and `docs/decisions/` on the user's behalf; the user should not need to edit them manually.
10. Summarize:
   - files changed,
   - docs updated,
   - checks run,
   - GitHub push status,
   - live internet verification status,
   - assumptions,
   - manual review needed.
11. Do not claim GitHub is updated or the site is live unless that was actually completed and verified.
