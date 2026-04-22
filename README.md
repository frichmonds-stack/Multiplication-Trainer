# Math Muscle Trainer

A strength-themed multiplication practice webapp built with plain HTML, CSS, and JavaScript.

## What it does

- Uses a slimmer app-style shell with a separate header band and dedicated Setup, Practice, Results, and Progress screens
- Adds a Learn / Techniques mode with a first `10x` lesson for learning a table trick before drilling it
- Supports mixed-table practice or a focused single-table mode
- Supports High Intensity Training, Target Reps, Zen Mode, and Spar Mode workout types
- Supports positive and negative integer multiplication while keeping the practice range magnitude-based
- Keeps the practice screen minimal with a question timer, workout timer, countdown start, and quick right/wrong feedback
- Uses adaptive question weighting to bring back new or missed facts more often
- Tracks daily star and heart goals with browser-local workout history
- Shows a shared month-view workout tracker calendar across Results and Progress
- Uses carousel-style Results and Progress screens to reduce scrolling
- Shows a fact tracker so weaker and stronger multiplication facts are easy to spot
- Includes personal bests, recent workouts, and daily record stats like most attempts in a day
- Uses a custom in-app end-workout modal instead of the browser confirm popup
- Uses a matching in-app lesson exit modal for leaving a technique mid-way
- Remembers your preferred setup in the browser between visits
- Saves long-term progress in the browser with localStorage
- Uses a dark workout-inspired theme with rotating strength-building banner messages

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
