(function () {
  const DEBUG_PASSWORD = "N0v4r3";
  const DEBUG_UNLOCK_KEY = "math-muscle-trainer-debug-unlocked-v1";
  const DEBUG_ENABLED =
    new URLSearchParams(window.location.search).get("debug") === "1" ||
    window.location.hash.toLowerCase() === "#debug";
  let debugRequested = DEBUG_ENABLED;

  function isUnlocked() {
    try {
      return window.sessionStorage.getItem(DEBUG_UNLOCK_KEY) === "true";
    } catch (error) {
      return false;
    }
  }

  function setUnlocked() {
    try {
      window.sessionStorage.setItem(DEBUG_UNLOCK_KEY, "true");
    } catch (error) {
      // Session storage can be unavailable in some browser modes.
    }
  }

  function clearUnlocked() {
    try {
      window.sessionStorage.removeItem(DEBUG_UNLOCK_KEY);
    } catch (error) {
      // Session storage can be unavailable in some browser modes.
    }
  }

  function refreshAppAfterDebugChange() {
    state.displayMonthKey = getMonthKey(getCurrentMonthDate());
    renderDailyProgress();
    renderOverall();
    renderMasterySystem();
    renderFocusAreas();
    renderWorkoutHistory();
    renderCoachTip();
    renderTableRadar();
    renderCalendars();
    renderStreakPanel();
    renderHomeWeeklyStrip();
    renderHomeRepsGraph();
    const weekly = getLastSevenDailyRecords().reduce(
      (summary, day) => ({
        attempted: summary.attempted + Number(day.record?.attempted || 0),
        correct: summary.correct + Number(day.record?.correct || 0),
      }),
      { attempted: 0, correct: 0 },
    );
    renderHomeAccuracyVisual(getAccuracy(weekly.correct, weekly.attempted));
    renderResultsCarousel();
    renderProgressCarousel();
  }

  function getDateKeyDaysAgo(daysAgo) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - daysAgo);
    return formatDateKey(date);
  }

  function getTimestampForDateKey(dateKey, offsetMinutes = 0) {
    return new Date(`${dateKey}T12:00:00`).getTime() + offsetMinutes * 60000;
  }

  function getDebugFactParts(operation, index) {
    if (operation === "addition") {
      return { left: index + 3, right: 10 - ((index + 3) % 10 || 10) };
    }
    if (operation === "subtraction") {
      return { left: index + 12, right: (index % 8) + 3 };
    }
    if (operation === "division") {
      const divisor = (index % 12) + 1;
      const quotient = (index % 10) + 2;
      return { left: divisor * quotient, right: divisor };
    }
    return { left: (index % 12) + 1, right: ((index + 6) % 12) + 1 };
  }

  function getDebugFactKey(operation, left, right) {
    return `${operation}:${left}${getOperationStorageSymbol(operation)}${right}`;
  }

  function createDebugFactProgress(operation, index, attempts, accuracy, averageMs, timestamp) {
    const { left, right } = getDebugFactParts(operation, index);
    const correct = Math.max(0, Math.min(attempts, Math.round(attempts * accuracy)));
    const factKey = getDebugFactKey(operation, left, right);
    return [
      factKey,
      normaliseFactProgressEntry(factKey, {
        operation,
        attempts,
        correct,
        magnitudeCorrect: correct,
        signCorrect: correct,
        misses: attempts - correct,
        currentStreak: Math.min(correct, 6),
        bestStreak: Math.min(correct, 10),
        averageMs,
        firstSeenAt: timestamp - 86400000 * 6,
        lastSeenAt: timestamp,
      }),
    ];
  }

  function createDebugTelemetry(operation, dateKey, count, accuracy, averageMs, options = {}) {
    const entries = [];
    const offset = options.offset || 0;
    const difficultyBand = options.difficultyBand || "standard";
    for (let index = 0; index < count; index += 1) {
      const { left, right } = getDebugFactParts(operation, index + offset);
      const factKey = getDebugFactKey(operation, left, right);
      const correct = index < Math.round(count * accuracy);
      entries.push({
        id: `debug-${operation}-${dateKey}-${index}-${offset}`,
        sessionId: `debug-${operation}-${dateKey}`,
        sessionSource: "debug-persona",
        sessionPosition: index + 1,
        operation,
        factKey,
        skillKey: getLearningSkillKey({ operation, a: left, b: right }),
        difficultyBand,
        correct,
        skipped: false,
        responseTimeMs: correct ? averageMs + (index % 5) * 120 : averageMs + 900,
        timestamp: getTimestampForDateKey(dateKey, index + offset),
        dateKey,
      });
    }
    return entries;
  }

  function createDebugWorkout(operation, dateKey, attempted, accuracy, averageMs, index, modeKey = "question-goal") {
    const correct = Math.round(attempted * accuracy);
    return normaliseWorkoutRecord({
      id: `debug-workout-${operation}-${dateKey}-${index}`,
      operation,
      modeKey,
      modeLabel: modeKey === "timed" ? "H.I.T" : "Target Reps",
      dateKey,
      recordedAt: getTimestampForDateKey(dateKey, 40 + index),
      attempted,
      correct,
      accuracy,
      skipped: Math.max(0, attempted - correct - 1),
      bestStreak: Math.max(1, Math.min(correct, Math.round(correct / 2))),
      averageMs,
      medianMs: averageMs,
      fastCorrect: Math.round(correct * 0.45),
      sessionSource: "debug-persona",
      reason: "debug",
      freeTrainingMode: "zen",
      timeLimitMinutes: modeKey === "timed" ? 1 : 0,
    });
  }

  function createDebugProgressPersona(persona) {
    const progress = defaultProgress();
    const facts = {};
    const telemetry = [];
    const workouts = [];
    const dayPlans = [];

    if (persona === "new-user") {
      return progress;
    }

    if (persona === "division-struggler") {
      dayPlans.push(
        { operation: "addition", attempted: 32, accuracy: 0.9, averageMs: 2700 },
        { operation: "multiplication", attempted: 34, accuracy: 0.88, averageMs: 3100 },
        { operation: "division", attempted: 28, accuracy: 0.54, averageMs: 6800 },
        { operation: "division", attempted: 26, accuracy: 0.58, averageMs: 6400 },
        { operation: "subtraction", attempted: 24, accuracy: 0.8, averageMs: 4200 },
      );
    } else if (persona === "multiplication-specialist") {
      dayPlans.push(
        { operation: "multiplication", attempted: 45, accuracy: 0.94, averageMs: 2300, difficultyBand: "hard" },
        { operation: "multiplication", attempted: 42, accuracy: 0.92, averageMs: 2500, difficultyBand: "hard" },
        { operation: "addition", attempted: 20, accuracy: 0.84, averageMs: 3300 },
        { operation: "division", attempted: 18, accuracy: 0.7, averageMs: 5200 },
      );
    } else if (persona === "power-user") {
      OPERATION_OPTIONS.forEach((operation, operationIndex) => {
        for (let day = 0; day < 7; day += 1) {
          dayPlans.push({
            operation,
            attempted: 24 + operationIndex * 4,
            accuracy: 0.86 + operationIndex * 0.02,
            averageMs: 2600 + operationIndex * 280,
            difficultyBand: day % 2 === 0 ? "hard" : "medium",
          });
        }
      });
      progress.techniques = {
        2: { completed: true },
        5: { completed: true },
        10: { completed: true },
        "addition:make-10": { completed: true },
        "addition:add-by-10": { completed: true },
      };
    } else {
      dayPlans.push(
        { operation: "addition", attempted: 20, accuracy: 0.82, averageMs: 3900 },
        { operation: "subtraction", attempted: 18, accuracy: 0.72, averageMs: 4700 },
        { operation: "multiplication", attempted: 22, accuracy: 0.78, averageMs: 4300 },
        { operation: "division", attempted: 16, accuracy: 0.69, averageMs: 5600 },
        { operation: "addition", attempted: 20, accuracy: 0.86, averageMs: 3600 },
      );
      progress.techniques = {
        "addition:make-10": { completed: true },
      };
    }

    dayPlans.forEach((plan, index) => {
      const dateKey = getDateKeyDaysAgo(index % 7);
      const correct = Math.round(plan.attempted * plan.accuracy);
      const existing = progress.dailyRecords[dateKey] || defaultDailyRecord();
      progress.dailyRecords[dateKey] = normaliseDailyRecord({
        attempted: existing.attempted + plan.attempted,
        correct: existing.correct + correct,
        skipped: existing.skipped,
        sessionsCompleted: existing.sessionsCompleted + 1,
      });
      workouts.push(createDebugWorkout(
        plan.operation,
        dateKey,
        plan.attempted,
        plan.accuracy,
        plan.averageMs,
        index,
        index % 3 === 0 ? "timed" : "question-goal",
      ));
      telemetry.push(
        ...createDebugTelemetry(
          plan.operation,
          dateKey,
          plan.attempted,
          plan.accuracy,
          plan.averageMs,
          { offset: index * 3, difficultyBand: plan.difficultyBand },
        ),
      );

      for (let factIndex = 0; factIndex < Math.min(12, Math.ceil(plan.attempted / 3)); factIndex += 1) {
        const [factKey, factProgress] = createDebugFactProgress(
          plan.operation,
          factIndex + index,
          6 + (factIndex % 6),
          plan.accuracy,
          plan.averageMs,
          getTimestampForDateKey(dateKey, factIndex),
        );
        facts[factKey] = factProgress;
      }
    });

    progress.workoutHistory = workouts.sort((left, right) => right.recordedAt - left.recordedAt).slice(0, 50);
    progress.answerTelemetry = normaliseAnswerTelemetry(telemetry);
    progress.facts = compactFactProgressMap(facts);
    progress.totalAnswered = progress.answerTelemetry.length;
    progress.totalAttempted = progress.totalAnswered;
    progress.totalCorrect = progress.answerTelemetry.filter((entry) => entry.correct).length;
    progress.totalSkipped = 0;
    progress.sessionsCompleted = progress.workoutHistory.length;
    progress.bestStreak = Math.max(
      0,
      ...progress.workoutHistory.map((record) => record.bestStreak || 0),
    );
    progress.bestAccuracy = Math.max(
      0,
      ...progress.workoutHistory.map((record) => record.accuracy || 0),
    );
    const responseTimes = progress.answerTelemetry
      .filter((entry) => entry.correct && entry.responseTimeMs !== null)
      .map((entry) => entry.responseTimeMs);
    progress.fastestAverageMs = responseTimes.length ? Math.min(...responseTimes) : null;
    return pruneProgressForRollingWindow(syncProgressMetricAliases(progress));
  }

  function setDebugStatus(message) {
    const status = document.querySelector("[data-debug-status]");
    if (status) {
      status.textContent = message;
    }
  }

  function loadDebugPersona(persona) {
    state.progress = createDebugProgressPersona(persona);
    saveProgress();
    refreshAppAfterDebugChange();
    setDebugStatus(`Loaded ${persona.replace(/-/g, " ")}.`);
  }

  function clearDebugProgress() {
    const shouldClear = window.confirm("Clear saved progress on this browser?");
    if (!shouldClear) {
      return;
    }
    state.progress = defaultProgress();
    saveProgress();
    refreshAppAfterDebugChange();
    setDebugStatus("Progress cleared.");
  }

  function startDebugWorkout(operation, sessionType = "question-goal") {
    const settings = sanitiseSettingsSnapshot({
      ...defaultSettingsSnapshot(),
      operation,
      sessionType,
      questionPreset: sessionType === "question-goal" ? "custom" : "20",
      questionTarget: 20,
      timePreset: sessionType === "timed" ? "1" : "3",
      timeLimitMinutes: sessionType === "timed" ? 1 : 3,
      freeTrainingMode: "zen",
      minFactor: 1,
      maxFactor: operation === "multiplication" || operation === "division" ? 12 : 10,
      focusFactor: operation === "division" ? 7 : 10,
      additionDifficulty: "medium",
      additionDifficulties: ["easy", "medium"],
      subtractionDifficulty: "medium",
      subtractionDifficulties: ["easy", "medium"],
    });
    applySettingsSnapshot(settings);
    toggleSetupFields();
    startSession(settings);
    setDebugStatus(`Started ${operation} ${sessionType === "timed" ? "timed" : "target reps"} workout.`);
  }

  function openDebugPanel() {
    document.body.classList.add("debug-panel-open");
  }

  function closeDebugPanel() {
    document.body.classList.remove("debug-panel-open");
  }

  function exitDebugMode() {
    clearUnlocked();
    debugRequested = false;
    document.body.classList.remove("debug-mode", "debug-panel-open");
    document.querySelector("[data-debug-open]")?.remove();
    document.querySelector(".debug-panel")?.remove();
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("debug");
    if (cleanUrl.hash.toLowerCase() === "#debug") {
      cleanUrl.hash = "";
    }
    window.history.replaceState({}, "", cleanUrl.toString());
  }

  function applyDebugAppearance(theme, colorMode) {
    if (theme) {
      const nextTheme = sanitiseTheme(theme);
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    }
    if (colorMode) {
      const nextMode = sanitiseColorMode(colorMode);
      applyColorMode(nextMode);
      saveColorMode(nextMode);
    }
    const themeSelect = document.querySelector('[data-debug-select="theme"]');
    if (themeSelect instanceof HTMLSelectElement) {
      themeSelect.value = state.theme;
    }
    const colorModeSelect = document.querySelector('[data-debug-select="color-mode"]');
    if (colorModeSelect instanceof HTMLSelectElement) {
      colorModeSelect.value = state.colorMode;
    }
    setDebugStatus("Appearance updated.");
  }

  function handleDebugAction(event) {
    const button = event.target.closest("[data-debug-action]");
    if (!button) {
      return;
    }

    const action = button.dataset.debugAction;
    if (action === "close") {
      closeDebugPanel();
      return;
    }
    if (action === "exit-debug") {
      exitDebugMode();
      return;
    }
    if (action === "color-mode") {
      applyDebugAppearance(null, button.dataset.debugColorMode || "light");
      return;
    }
    if (action === "cycle-theme") {
      const currentIndex = THEME_OPTIONS.findIndex((theme) => theme.key === state.theme);
      const nextTheme = THEME_OPTIONS[(currentIndex + 1) % THEME_OPTIONS.length]?.key || "original";
      applyDebugAppearance(nextTheme, null);
      return;
    }
    if (action === "feedback") {
      window.alert("Put up your hand and tell Mr Foo");
      setDebugStatus("Classroom feedback message shown.");
      return;
    }
    if (action === "clear-progress") {
      clearDebugProgress();
      return;
    }
    if (action === "jump") {
      requestView(button.dataset.debugView || "home");
      setDebugStatus(`Jumped to ${button.dataset.debugView || "home"}.`);
      return;
    }
    if (action === "persona") {
      loadDebugPersona(button.dataset.debugPersona || "active-week");
      return;
    }
    if (action === "workout") {
      startDebugWorkout(button.dataset.debugOperation || "addition", button.dataset.debugSession || "question-goal");
    }
  }

  function handleDebugChange(event) {
    const select = event.target.closest("[data-debug-select]");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    if (select.dataset.debugSelect === "theme") {
      applyDebugAppearance(select.value, null);
      return;
    }
    if (select.dataset.debugSelect === "color-mode") {
      applyDebugAppearance(null, select.value);
    }
  }

  function renderDebugTools() {
    if (document.querySelector("[data-debug-open]")) {
      return;
    }
    document.body.classList.add("debug-mode");
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <button class="debug-toggle" type="button" data-debug-open>
          DEBUG
        </button>
        <aside class="debug-panel" aria-label="Teacher debug tools">
          <div class="debug-panel-head">
            <div>
              <p class="debug-kicker">Teacher tools</p>
              <h2>Debug Mode</h2>
            </div>
            <button class="debug-icon-button" type="button" data-debug-action="close" aria-label="Close debug tools">
              &#10005;
            </button>
          </div>
          <p class="debug-note">
            Client-side classroom gate only. These tools affect progress saved in this browser.
          </p>

          <section class="debug-section">
            <h3>Jump</h3>
            <div class="debug-button-grid">
              <button type="button" data-debug-action="jump" data-debug-view="home">Home</button>
              <button type="button" data-debug-action="jump" data-debug-view="setup">Workout</button>
              <button type="button" data-debug-action="jump" data-debug-view="techniques">Learn</button>
              <button type="button" data-debug-action="jump" data-debug-view="progress">Progress</button>
            </div>
          </section>

          <section class="debug-section">
            <h3>Personas</h3>
            <div class="debug-button-grid">
              <button type="button" data-debug-action="persona" data-debug-persona="new-user">New User</button>
              <button type="button" data-debug-action="persona" data-debug-persona="active-week">Active Week</button>
              <button type="button" data-debug-action="persona" data-debug-persona="division-struggler">Division Struggler</button>
              <button type="button" data-debug-action="persona" data-debug-persona="multiplication-specialist">Multiplication Specialist</button>
              <button type="button" data-debug-action="persona" data-debug-persona="power-user">Power User</button>
            </div>
          </section>

          <section class="debug-section">
            <h3>Quick Workouts</h3>
            <div class="debug-button-grid">
              <button type="button" data-debug-action="workout" data-debug-operation="addition">Addition Reps</button>
              <button type="button" data-debug-action="workout" data-debug-operation="division" data-debug-session="timed">Division Timed</button>
            </div>
          </section>

          <section class="debug-section">
            <h3>Appearance</h3>
            <div class="debug-select-grid">
              <label>
                <span>Mode</span>
                <select data-debug-select="color-mode">
                  ${COLOR_MODE_OPTIONS.map((mode) => `<option value="${mode}" ${state.colorMode === mode ? "selected" : ""}>${mode}</option>`).join("")}
                </select>
              </label>
              <label>
                <span>Palette</span>
                <select data-debug-select="theme">
                  ${THEME_OPTIONS.map((theme) => `<option value="${theme.key}" ${state.theme === theme.key ? "selected" : ""}>${theme.label}</option>`).join("")}
                </select>
              </label>
            </div>
            <div class="debug-button-grid debug-appearance-actions">
              <button type="button" data-debug-action="color-mode" data-debug-color-mode="light">Light</button>
              <button type="button" data-debug-action="color-mode" data-debug-color-mode="dark">Dark</button>
              <button type="button" data-debug-action="cycle-theme">Cycle Theme</button>
            </div>
          </section>

          <section class="debug-section">
            <h3>Classroom</h3>
            <div class="debug-button-grid">
              <button type="button" data-debug-action="feedback">Feedback Message</button>
              <button type="button" data-debug-action="clear-progress">Clear Progress</button>
              <button type="button" data-debug-action="exit-debug">Exit Debug</button>
            </div>
          </section>

          <p class="debug-status" data-debug-status>Debug tools ready.</p>
        </aside>
      `,
    );

    document.querySelector("[data-debug-open]")?.addEventListener("click", openDebugPanel);
    document.querySelector(".debug-panel")?.addEventListener("click", handleDebugAction);
    document.querySelector(".debug-panel")?.addEventListener("change", handleDebugChange);
  }

  function renderDebugLock() {
    if (document.querySelector("[data-debug-lock-dialog]")) {
      document.querySelector("[data-debug-lock-dialog]")?.showModal();
      return;
    }
    document.body.classList.add("debug-mode");
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <dialog class="debug-lock-dialog" data-debug-lock-dialog>
          <form method="dialog" class="debug-lock-card" data-debug-lock-form>
            <p class="debug-kicker">Teacher tools</p>
            <h2>Unlock Debug Mode</h2>
            <p class="debug-note">
              This is a classroom gate, not real security. Do not store secrets in debug tools.
            </p>
            <label class="debug-lock-field">
              <span>Password</span>
              <input type="password" autocomplete="off" data-debug-password />
            </label>
            <p class="debug-lock-error" data-debug-lock-error aria-live="polite"></p>
            <div class="debug-lock-actions">
              <button class="ghost-button" type="button" data-debug-cancel>Cancel</button>
              <button class="primary-button" type="submit">Unlock</button>
            </div>
          </form>
        </dialog>
      `,
    );

    const dialog = document.querySelector("[data-debug-lock-dialog]");
    const form = document.querySelector("[data-debug-lock-form]");
    const input = document.querySelector("[data-debug-password]");
    const error = document.querySelector("[data-debug-lock-error]");

    document.querySelector("[data-debug-cancel]")?.addEventListener("click", () => {
      dialog.close();
    });

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (input.value === DEBUG_PASSWORD) {
        setUnlocked();
        dialog.close();
        dialog.remove();
        renderDebugTools();
        return;
      }
      error.textContent = "Password incorrect.";
      input.select();
    });

    dialog?.showModal();
    input?.focus();
  }

  function requestDebugAccess() {
    debugRequested = true;
    if (isUnlocked()) {
      renderDebugTools();
    } else {
      renderDebugLock();
    }
  }

  function bindHiddenArmTrigger() {
    document.querySelector(".home-brand-mark")?.addEventListener("dblclick", (event) => {
      event.preventDefault();
      requestDebugAccess();
    });
  }

  window.addEventListener("load", () => {
    bindHiddenArmTrigger();
    if (debugRequested) {
      requestDebugAccess();
    }
  });
})();
