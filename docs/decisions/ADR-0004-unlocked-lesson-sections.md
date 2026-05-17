# ADR-0004: Unlocked Lesson Sections

Date: 2026-05-08
Updated: 2026-05-17

## Status

Accepted, pending review

## Context

Learn / Techniques lessons originally used staged progress pills that locked later sections until earlier work was completed. The learner should be able to inspect lesson content without having to perform every practice step first.

On 2026-05-17, the user clarified that unlocked stage pills were primarily for teacher/developer review convenience during content and classroom experimentation.

## Decision

Lesson section pills are currently unlocked by default for multiplication and addition lessons. Learners can jump directly to any idea, practice, final practice, or completion section from the pill row.

Multiplication table lessons use the existing five-part flow:

1. `Idea #1`
2. `Idea #2`
3. `Warm Up`
4. `Assisted Reps`
5. `Solo Reps`

Each table from `x1` through `x12` has table-specific strategy copy, examples, hints, and completion copy while sharing the same renderer.

## Consequences

- Lessons are easier to review and inspect during design/content iteration.
- Practice completion still records progress, but content visibility no longer depends on completion.
- Future work should decide the normal learner progression model. If staged locks are restored for learners, debug mode should keep teacher/developer bypass controls.
