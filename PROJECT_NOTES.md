# Project Notes

This file is the project's working memory.

Use it for:
- design decisions
- important context from chats
- open questions
- backlog ideas that are not committed roadmap items yet

## Working Preferences

- Explanations should be beginner-friendly, scaffolded, and chunked.
- Avoid large text dumps.
- Prefer small steps with one clear action at a time when learning or setting things up.

## Current Project Snapshot

- Project name in the README: `Math Muscle Trainer`
- Tech stack: plain `HTML`, `CSS`, and `JavaScript`
- Main files:
  - `index.html`
  - `styles.css`
  - `app.js`
  - `README.md`
  - `CHANGELOG.md`
- Hosting:
  - GitHub repository is set up
  - GitHub Pages is enabled from `main` and `/(root)`

## Current Design Direction

- Workout/strength-training framing for multiplication practice
- Dark, gym-inspired visual theme
- App-style shell with dedicated Setup, Practice, Results, and Progress screens
- Strong focus on motivation, repeat practice, and visible progress

## Design Decisions

### Confirmed

- Keep a `notes` file for project memory instead of using a `roadmap` file for everything.
- Treat `README.md` as the current project overview.
- Treat `CHANGELOG.md` as version history.
- Treat this file as the flexible place for context, reasoning, and backlog items.
- Prefer `workout` as the main user-facing term across the app instead of mixing `session` and `workout`.
- Treat expressive results copy and small moments of visual "pop" as experiments that should be reviewed after seeing them live.

## Open Questions

- Which parts of the current design should be kept versus redesigned?
- How much of the workout theme should remain in the next design pass?
- What should the next teaching/explainer pass cover after the HTML basics?

## Backlog Ideas

- Continue the beginner-friendly walkthrough of the codebase in small chunks.
- Review the current UX and identify what feels strong versus confusing.
- Decide on the next round of redesign goals before editing UI structure again.
- Add more important decisions here as they come up.
- Add a competitive mode called `Flex`.
- Possible `Flex` directions:
  - points-based scoring for highest score
  - a short pressure timer that resets after each correct answer
  - timer expiry ends the run immediately
  - focus on speed, streaks, and competitive chaining

## Session Notes

### 2026-04-21

- Confirmed that chat history in VS Code should be treated as transient.
- Added this file so key project context survives across sessions.
- Started a larger polish pass focused on refinement rather than full redesign.
- Temporary hero tagline to try: `Grow your brain, begin your reign.`
- Results heading should feel more alive and can rotate based on workout outcome.
- Future settings direction, not yet built: full manual controls with preset buttons that snap the controls into recommended combinations.
- Snapshot polish pass focused on heading hierarchy, tracker alignment, split-panel dividers, carousel controls, and terminology consistency.

### 2026-04-22

- New major feature direction: add a teaching mode for single-table tricks.
- Current naming direction: `Learn / Techniques`.
- First lesson to build and refine: `10x`.
- Core teaching rule for `10x`: place the `0`.
- Lesson flow decision:
  - rule screen
  - flip-order screen showing the answer stays the same
  - pattern screen
  - guided practice
  - quick check
  - continue practicing
- Pattern screen notes:
  - show `1 x 10` through `12 x 10`
  - some rows complete
  - some answer stems blank
  - some factors blank
  - keep the `0` color-linked throughout
- Guided practice notes:
  - no timers or pressure
  - use wording like `place the 0`
  - include both `n x 10` and `10 x n`
- Quick check notes:
  - wrong answers should stay on the same fact
  - clear the typed answer
  - offer hint/help
  - finish after 5 correct total
- Continue practice notes:
  - keep practicing the same table lesson
  - generate questions in either direction
- Other tables should appear in the UI but stay greyed out with `Coming Soon` until their lessons exist.
