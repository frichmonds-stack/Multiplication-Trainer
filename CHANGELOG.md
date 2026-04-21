# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog and uses a simple project-friendly version history.

## [Unreleased]

### Added
- Version 3 app shell with dedicated Setup, Practice, Results, and Progress screens.
- Timed, question-goal, and endless workout types with preset and custom limits.
- Countdown start flow before every workout begins.
- Shared month-view workout tracker calendar with disabled month navigation when no earlier data exists.
- Phase 1 browser-local streak tracking and current-month practice calendar.
- Negatives mode for signed integer multiplication while keeping the setup range magnitude-based.
- Workout-themed header branding with rotating strength-building quotes.
- Zen Mode and Spar Mode variants under Free Training.
- Personal best and recent workout tracking for completed workouts.
- Options dialog with version info and recent updates.
- Daily stat tracking for most attempts in a day.

### Changed
- Refocused practice into a minimalist timed-answer interface with brief right/wrong feedback only.
- Reworked daily rewards into star and heart cards that shade as progress builds and complete with stronger states.
- Moved deeper insights like trouble spots, history, and fact tracking into Results and Progress instead of showing everything during practice.
- Shifted the header into a slimmer intro band with compact daily progress and `Progress` / `Work Out` navigation.
- Swapped the palette to a darker strength-focused workout theme.
- Renamed the setup, preview, tracker, and log copy to match the workout framing.
- Converted both Results and Progress into carousel-style panels to cut down on scrolling.
- Reworked Results and Progress to use synced tracker layouts, split focus panels, and a dedicated records slide.
- Replaced the browser end-workout confirmation with a custom in-app modal.
- Changed timed workout HUDs to count down remaining workout time instead of counting up.
- Polished the setup alignment, hero sizing, carousel controls, tracker/calendar spacing, and split-panel balance for the next snapshot.

### Planned
- Learn mode with more detailed corrective feedback.
- Additional arithmetic operations beyond multiplication.
- Richer celebration artwork and milestone visuals.
- Leaderboard support.
- Deeper per-table fact drilldowns.

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
