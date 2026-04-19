# Multiplication Trainer

A self-contained multiplication practice webapp built with plain HTML, CSS, and JavaScript.

## What it does

- Runs short or endless multiplication drills
- Supports mixed-table practice or a focused single-table mode
- Uses adaptive question weighting to bring back new or missed facts more often
- Tracks streaks, accuracy, pace, and recent answers
- Saves long-term progress in the browser with localStorage

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
