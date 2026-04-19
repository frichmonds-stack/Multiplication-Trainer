# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog and uses a simple project-friendly version history.

## [Unreleased]

### Added
- Version 3 app shell with dedicated Setup, Practice, Results, and Progress screens.
- Timed, question-goal, and endless session types with preset and custom limits.
- Countdown start flow before every session begins.
- Month-view daily reward calendar for the Results screen.
- Phase 1 browser-local streak tracking and current-month practice calendar.

### Changed
- Refocused practice into a minimalist timed-answer interface with brief right/wrong feedback only.
- Reworked daily rewards into a watermelon slice plus heart system that fills from daily attempted and correct totals.
- Moved deeper insights like trouble spots, history, and table radar into Results and Progress instead of showing everything during practice.
- Shifted the header into a slimmer intro band with compact daily progress and `Progress` / `Start!` navigation.
- Swapped the palette to a watermelon-inspired color system.

### Planned
- Learn mode with more detailed corrective feedback.
- Bronze / silver / gold daily effort tiers.
- Richer celebration artwork and milestone visuals.
- Leaderboard support.

## [0.2.0] - 2026-04-19

### Added
- Live question timer in the practice area.
- Session goal messaging and a post-session recap card.
- Table radar view for seeing progress by multiplication table.
- Saved practice settings so the trainer remembers the last-used setup.
- Documentation entry for the new learning and persistence features.

### Changed
- Expanded focus mode so the `1s` table can be selected.
- Refined trouble-spot weighting so weaker facts stand out more clearly.
- Polished the practice layout with additional responsive UI sections.

## [0.1.0] - 2026-04-19

### Added
- Initial multiplication trainer built with plain HTML, CSS, and JavaScript.
- Mixed-table and focus-table practice modes.
- Adaptive question weighting based on progress.
- Session stats, saved progress, trouble spots, and recent answers.
