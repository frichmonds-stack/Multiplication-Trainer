# ADR-0002: Rename Project To Math Muscle Trainer

Date: 2026-05-07

## Status

Accepted

## Context

The app now supports addition, subtraction, multiplication, and division practice. Its earlier product naming suggested a narrower multiplication-only tool, which no longer matches the current product direction.

## Decision

Use `Math Muscle Trainer` as the product/site/project name in app metadata, docs, release helpers, and AI continuity files.

Frame descriptions as a general arithmetic trainer for addition, subtraction, multiplication, and division.

Keep legitimate references to multiplication as an operation, facts, tables, lessons, or training content.

## Consequences

- User-facing and project-facing product names should use `Math Muscle Trainer`.
- Existing browser storage can move to the `math-muscle-trainer-*` namespace while preserving fallback reads for older saved progress and preferences.
- External GitHub repository settings, Pages labels, or local folder names may still need manual updates outside tracked files.
