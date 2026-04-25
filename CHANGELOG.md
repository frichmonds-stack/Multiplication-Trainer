# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog and uses a simple project-friendly version history.

## [Unreleased]

## [0.7.1] - 2026-04-25

### Changed
- Reworked Setup into a progressive flow: choose operation first, then (for addition) difficulty, then workout type before advanced options appear.
- Added setup backtracking controls so operation and workout type can be changed without leaving the screen.
- Stopped persisting setup choices between workouts so each new workout begins from a fresh setup state.
- Moved addition difficulty ahead of workout type selection to better match the decision flow.
- Replaced Spar/Knockout strike progress bars with a 3-box strike HUD that marks each miss with an `X`.
- Boosted streak feedback with stronger tier visuals and a visible in-workout combo counter.
- Updated Techniques menu layout with the operation selector in the header, streamlined intro copy, and removed redundant prompt/callout text.
- Updated Fact Tracker title copy to operation-aware wording: `Track the development of your {operation} skills.`

## [0.7.0] - 2026-04-25

### Added
- Per-slide operation filters for Workout Log, Next Focus, and Coach Notes so filtering is contextual instead of globally persistent.
- Bucket-level trend cards for Positive Progress and Growth Opportunities (multiplication tables + addition buckets) using rolling 7-day comparisons.
- Addition tracker tap-to-reveal cards with a front summary and back regrouping split.
- New staged addition lesson cards:
  - Adding by 1s
  - Adding by 10s
  - Adding by 100s
  - Adding by 1000s

### Changed
- Updated Workout Records controls so operation + workout-type filters sit together in the top-right heading.
- Refined addition bucket labels to explicit digit language (for example `1-digit + 2-digit`).
- Changed lesson availability messaging so `Make 10` is `Under Construction` (selectable) and remaining addition lessons are `Coming Soon`.
- Improved calendar readability and touch ergonomics with stronger weekday/day contrast and larger month-nav targets.
- Rebalanced tracker column spacing and compact stat sizing for iPad presentation.

## [0.6.0] - 2026-04-24

### Added
- Operation-first setup flow with a dedicated arithmetic selector (Addition + Multiplication active, Subtraction/Division marked coming soon).
- Addition workout support for High Intensity Training, Target Reps, Zen Mode, and Spar Mode (Isolation intentionally excluded for this release).
- Addition difficulty presets (`easy`, `medium`, `hard`) with equal-weighted category sampling.
- iPad-friendly on-screen number pad with Enter support to reduce virtual keyboard intrusion during practice.
- Operation-aware filters in My Progress (`All`, `Multiplication`, `Addition`) that drive overview, focus, and coach views.
- Fact Tracker operation switching with a new addition tracker view:
  - Make 10
  - Single + Single
  - Single + Double
  - Double + Double
  - Triple + Single
  - Triple + Double
  - Triple + Triple
- Addition bucket analytics split into overall, with regrouping, and without regrouping.
- Workout Records dual-filtering by operation and workout type, with operation-conditional mode options.
- Technique menu operation selector that loads multiplication or addition lesson sets.

### Changed
- Replaced the Setup workout preview panel with a two-column operation + settings layout.
- Added streak intensity visuals (`smoke`, `spark`, `flame`) around the progress bar and practice area.
- Updated browser storage keys for this release (`v2`) to simplify migration while operations are expanding.
- Updated options modal update notes to reflect the operation-layer release.

### Notes
- Rewards mechanic was intentionally left unchanged in this pass.
- User testing note captured: rewards icon meaning (heart/star) needs a dedicated clarity pass.
- User testing note captured: multiplication negatives randomization needs rebalancing across sign combinations in a future update.

## [0.5.1] - 2026-04-23

### Added
- Keyboard shortcuts for Results and Progress carousels (`Left`/`Right` arrows) plus `Escape` handling to close open dialogs and quickly exit an in-progress lesson.
- A close button on the lesson-exit confirmation dialog for consistency with the other app dialogs.

### Changed
- Added stronger accessibility semantics for hidden/active screens and carousel slides, plus active nav `aria-current` state updates.
- Added subtle transition polish for carousel slides and techniques screens with a `prefers-reduced-motion` fallback.
- Removed duplicate stage metadata and duplicate results-title overrides in `app.js` to simplify maintenance.

## [0.5.0] - 2026-04-22

### Added
- A full-screen two-step Learn / Techniques flow so table selection and lesson content no longer compete side by side.
- A completion state for finished technique lessons so completed tables show differently on the Techniques menu.
- A post-lesson celebration screen with routes back to Techniques, into optional extra practice, or back to Work Out.
- A new Positive Progress section ahead of corrective focus cards in Results and My Progress.

### Changed
- Reworked the `10x` lesson into `Idea #1`, `Idea #2`, `Warm Up`, `Assisted Reps`, and `Solo Reps`.
- Made pattern blanks semi-random with auto-checking feedback, including occasional blank `10` factors.
- Changed assisted reps to auto-advance after correct answers instead of requiring a separate next button.
- Preserved typed lesson answers when opening hints, while still clearing wrong solo-rep answers as intended.
- Made extra post-lesson practice voluntary instead of an automatic final stage.
- Disabled carousel arrows at the ends, strengthened their floating treatment, and anchored them more consistently so they stop shifting with panel height.
- Rebalanced the header with a larger hero/title presence, a wider workout tracker card, a more elongated cog button, and a unified Learn Techniques nav treatment.
- Updated the hero tagline to `Grow your brain & begin your reign.`

## [0.4.0] - 2026-04-22

### Added
- Version 3 app shell with dedicated Setup, Practice, Results, and Progress screens.
- Learn / Techniques mode with a first-pass `10x` lesson flow.
- A mini lesson sequence for the `10x` table covering the rule, flipped order, pattern building, guided practice, quick check, and open-ended follow-up practice.
- A compact cog-style options control in the main nav.
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
- Expanded the main nav so learning sits alongside workouts and progress as a first-class destination.
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
- Additional table techniques beyond `10x`.
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
