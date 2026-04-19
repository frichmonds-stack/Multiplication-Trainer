# Foo's Multiplication Trainer

A self-contained multiplication practice webapp built with plain HTML, CSS, and JavaScript.

## What it does

- Uses a slimmer app-style shell with a separate header band and dedicated Setup, Practice, Results, and Progress screens
- Supports mixed-table practice or a focused single-table mode
- Supports timed runs, question-goal runs, and endless practice
- Keeps the practice screen minimal with a question timer, session timer, countdown start, and quick right/wrong feedback
- Uses adaptive question weighting to bring back new or missed facts more often
- Tracks daily slice and heart rewards with browser-local streak history
- Shows a current-month calendar for completed practice days and daily rewards
- Shows a table-by-table radar so weak and strong tables are easy to spot
- Remembers your preferred setup in the browser between visits
- Saves long-term progress in the browser with localStorage
- Uses a watermelon-inspired theme with rotating banner messages

## Run it

Because this is a static app, you can open `index.html` directly in a browser.

If you prefer a local server, run one from this folder with Python:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` contains the app structure
- `styles.css` contains the visual design and responsive layout
- `app.js` contains the training logic and saved-progress behavior
