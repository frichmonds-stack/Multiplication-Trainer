# Current State

Last updated: 2026-05-07

## Implementation

- Project/product naming is standardized as `Math Muscle Trainer`.
- Root app is at `v0.12.0`.
- Latest docs snapshot is `docs/v9`, marked latest in `docs/index.html`.
- Publish-close pass pushed the rename, versioning, docs snapshot, and AI continuity work to GitHub and verified the live GitHub Pages site.
- `AGENTS.md`, `ai/`, and `docs/decisions/` are now explicitly Codex-managed continuity files.
- `ai/task-map.md` routes future AI sessions from work type to relevant files, pre-reads, docs, and risks.
- Session close protocol now requires affected docs, GitHub push status, and live internet verification status to be addressed explicitly.
- Browser storage now uses `math-muscle-trainer-*` keys with fallback reads for legacy saved progress and preferences.
- Make 10's `Start Focused Workout` action now routes through `applySettingsSnapshot`.
- Division tracker cards now start divisor isolation workouts across the full quotient range.
- Operation display symbols are centralized; division stores `/` in fact keys and displays `\u00f7`.
- Version checks now compare `APP_VERSION` with the latest released `CHANGELOG.md` heading.
- Repo-native release helpers exist in `scripts/`.

## Verification

- Latest known check:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-repo.ps1
```

- Result on 2026-05-07: `All repo checks passed.`
- GitHub Pages verified live on 2026-05-07:
  - `https://frichmonds-stack.github.io/Math-Muscle-Trainer/`
  - `https://frichmonds-stack.github.io/Math-Muscle-Trainer/v9/`

## Working Tree Note

- Always inspect `git status --short` before editing. Publish-close sessions should also confirm `git remote -v` and live GitHub Pages status when pushing.
