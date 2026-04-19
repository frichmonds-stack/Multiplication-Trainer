const STORAGE_KEY = "multiplication-trainer-progress-v1";

const elements = {
  settingsForm: document.getElementById("settingsForm"),
  minFactor: document.getElementById("minFactor"),
  maxFactor: document.getElementById("maxFactor"),
  sessionLength: document.getElementById("sessionLength"),
  focusFactor: document.getElementById("focusFactor"),
  focusField: document.getElementById("focusField"),
  adaptiveMode: document.getElementById("adaptiveMode"),
  resetProgressButton: document.getElementById("resetProgressButton"),
  answerForm: document.getElementById("answerForm"),
  answerInput: document.getElementById("answerInput"),
  checkButton: document.getElementById("checkButton"),
  skipButton: document.getElementById("skipButton"),
  problemText: document.getElementById("problemText"),
  promptCopy: document.getElementById("promptCopy"),
  feedback: document.getElementById("feedback"),
  sessionBadge: document.getElementById("sessionBadge"),
  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  sessionCorrect: document.getElementById("sessionCorrect"),
  sessionAccuracy: document.getElementById("sessionAccuracy"),
  sessionStreak: document.getElementById("sessionStreak"),
  sessionBestStreak: document.getElementById("sessionBestStreak"),
  sessionAvgTime: document.getElementById("sessionAvgTime"),
  sessionSkipped: document.getElementById("sessionSkipped"),
  overallAnswered: document.getElementById("overallAnswered"),
  overallAccuracy: document.getElementById("overallAccuracy"),
  overallBestStreak: document.getElementById("overallBestStreak"),
  overallBestPace: document.getElementById("overallBestPace"),
  troubleList: document.getElementById("troubleList"),
  coachTip: document.getElementById("coachTip"),
  recentResults: document.getElementById("recentResults"),
};

const state = {
  progress: loadProgress(),
  active: false,
  settings: null,
  currentQuestion: null,
  questionStartedAt: 0,
  lastQuestionKey: null,
  advanceTimeoutId: null,
  session: createEmptySession(),
};

function createEmptySession() {
  return {
    answered: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    skipped: 0,
    responseTimes: [],
    recent: [],
  };
}

function defaultProgress() {
  return {
    totalAnswered: 0,
    totalCorrect: 0,
    bestStreak: 0,
    sessionsCompleted: 0,
    bestAccuracy: 0,
    fastestAverageMs: null,
    facts: {},
  };
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultProgress();
    }

    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress(),
      ...parsed,
      facts: parsed.facts || {},
    };
  } catch (error) {
    return defaultProgress();
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (error) {
    // Ignore storage failures so practice still works in restricted contexts.
  }
}

function getPracticeMode() {
  return document.querySelector('input[name="practiceMode"]:checked')?.value || "mixed";
}

function toggleFocusField() {
  const isFocusMode = getPracticeMode() === "focus";
  elements.focusField.classList.toggle("is-hidden", !isFocusMode);
}

function readSettings() {
  const minFactor = Number(elements.minFactor.value);
  const maxFactor = Number(elements.maxFactor.value);
  const sessionLength = Number(elements.sessionLength.value);
  const focusFactor = Number(elements.focusFactor.value);
  const adaptiveMode = elements.adaptiveMode.checked;
  const mode = getPracticeMode();

  if (
    Number.isNaN(minFactor) ||
    Number.isNaN(maxFactor) ||
    minFactor < 1 ||
    maxFactor > 12 ||
    minFactor > maxFactor
  ) {
    return { error: "Choose a valid factor range between 1 and 12." };
  }

  return {
    minFactor,
    maxFactor,
    sessionLength,
    focusFactor,
    adaptiveMode,
    mode,
  };
}

function buildPool(settings) {
  const pool = [];

  if (settings.mode === "focus") {
    for (let factor = settings.minFactor; factor <= settings.maxFactor; factor += 1) {
      pool.push(createFact(settings.focusFactor, factor));
    }
    return pool;
  }

  for (let left = settings.minFactor; left <= settings.maxFactor; left += 1) {
    for (let right = left; right <= settings.maxFactor; right += 1) {
      pool.push(createFact(left, right));
    }
  }

  return pool;
}

function createFact(left, right) {
  const a = Math.min(left, right);
  const b = Math.max(left, right);
  return {
    a,
    b,
    key: `${a}x${b}`,
    answer: a * b,
  };
}

function getFactProgress(key) {
  return (
    state.progress.facts[key] || {
      attempts: 0,
      correct: 0,
      misses: 0,
      bestStreak: 0,
      currentStreak: 0,
      averageMs: null,
    }
  );
}

function pickQuestion() {
  const pool = buildPool(state.settings);
  const weightedPool = pool.map((fact) => {
    const factProgress = getFactProgress(fact.key);
    let weight = 1;

    if (state.settings.adaptiveMode) {
      const accuracy =
        factProgress.attempts > 0 ? factProgress.correct / factProgress.attempts : 0;
      weight += factProgress.misses * 3;
      weight += factProgress.attempts === 0 ? 3 : 0;
      weight += Math.round((1 - accuracy) * 5);
      if (factProgress.currentStreak === 0 && factProgress.attempts > 0) {
        weight += 2;
      }
    }

    if (fact.key === state.lastQuestionKey && pool.length > 1) {
      weight *= 0.18;
    }

    return {
      fact,
      weight,
    };
  });

  const totalWeight = weightedPool.reduce((sum, item) => sum + item.weight, 0);
  let target = Math.random() * totalWeight;

  for (const item of weightedPool) {
    target -= item.weight;
    if (target <= 0) {
      return randomiseDisplay(item.fact);
    }
  }

  return randomiseDisplay(weightedPool[weightedPool.length - 1].fact);
}

function randomiseDisplay(fact) {
  const swap = Math.random() > 0.5;
  return {
    ...fact,
    left: swap ? fact.b : fact.a,
    right: swap ? fact.a : fact.b,
  };
}

function queueNextQuestion(delay = 950) {
  window.clearTimeout(state.advanceTimeoutId);
  state.advanceTimeoutId = window.setTimeout(() => {
    if (!state.active) {
      return;
    }

    if (isSessionComplete()) {
      completeSession();
      return;
    }

    askNextQuestion();
  }, delay);
}

function askNextQuestion() {
  state.currentQuestion = pickQuestion();
  state.questionStartedAt = window.performance.now();
  state.lastQuestionKey = state.currentQuestion.key;

  elements.problemText.textContent = `${state.currentQuestion.left} x ${state.currentQuestion.right}`;
  elements.promptCopy.textContent = "Answer from memory first, then use the feedback to tighten the gap.";
  elements.answerInput.value = "";
  elements.answerInput.disabled = false;
  elements.checkButton.disabled = false;
  elements.skipButton.disabled = false;
  elements.answerInput.focus();
  setFeedback("Stay smooth. Your streak grows one fact at a time.", "");
  renderSession();
}

function setFeedback(message, tone) {
  elements.feedback.textContent = message;
  elements.feedback.classList.remove("success", "error");
  if (tone) {
    elements.feedback.classList.add(tone);
  }
}

function startSession(settings) {
  state.active = true;
  state.settings = settings;
  state.session = createEmptySession();
  window.clearTimeout(state.advanceTimeoutId);

  elements.sessionBadge.textContent =
    settings.mode === "focus"
      ? `Focused on the ${settings.focusFactor}s`
      : settings.adaptiveMode
        ? "Adaptive mixed drill"
        : "Mixed drill";

  askNextQuestion();
  renderSession();
}

function isSessionComplete() {
  return state.settings.sessionLength > 0 && state.session.answered >= state.settings.sessionLength;
}

function finishSessionProgress() {
  const accuracy = getAccuracy(state.session.correct, state.session.answered);
  const averageMs = average(state.session.responseTimes);

  state.progress.bestStreak = Math.max(state.progress.bestStreak, state.session.bestStreak);
  state.progress.bestAccuracy = Math.max(state.progress.bestAccuracy, accuracy);

  if (averageMs !== null) {
    if (state.progress.fastestAverageMs === null || averageMs < state.progress.fastestAverageMs) {
      state.progress.fastestAverageMs = averageMs;
    }
  }

  state.progress.sessionsCompleted += 1;
  saveProgress();
}

function completeSession() {
  state.active = false;
  elements.answerInput.disabled = true;
  elements.checkButton.disabled = true;
  elements.skipButton.disabled = true;

  finishSessionProgress();

  const accuracyLabel = formatPercent(getAccuracy(state.session.correct, state.session.answered));
  const averageLabel = formatDuration(average(state.session.responseTimes));
  elements.sessionBadge.textContent = "Session complete";
  elements.problemText.textContent = "Nice run.";
  elements.promptCopy.textContent = `You wrapped up ${state.session.answered} facts at ${accuracyLabel} accuracy with an average pace of ${averageLabel}.`;
  setFeedback("Start another round and try to beat your best streak.", "success");

  renderSession();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
}

function average(values) {
  if (!values.length) {
    return null;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getAccuracy(correct, answered) {
  if (!answered) {
    return 0;
  }

  return correct / answered;
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function formatDuration(milliseconds) {
  if (milliseconds === null || Number.isNaN(milliseconds)) {
    return "-";
  }

  return `${(milliseconds / 1000).toFixed(1)}s`;
}

function updateFactProgress(question, isCorrect, responseTimeMs) {
  const existing = getFactProgress(question.key);
  const updated = {
    ...existing,
    attempts: existing.attempts + 1,
    correct: existing.correct + (isCorrect ? 1 : 0),
    misses: existing.misses + (isCorrect ? 0 : 1),
    currentStreak: isCorrect ? existing.currentStreak + 1 : 0,
    bestStreak: isCorrect ? Math.max(existing.bestStreak, existing.currentStreak + 1) : existing.bestStreak,
    averageMs:
      responseTimeMs === null
        ? existing.averageMs
        : existing.averageMs === null
          ? responseTimeMs
          : (existing.averageMs * existing.attempts + responseTimeMs) / (existing.attempts + 1),
  };

  state.progress.facts[question.key] = updated;
}

function registerAnswer(isCorrect, answerValue, options = {}) {
  const responseTimeMs = options.skipped ? null : window.performance.now() - state.questionStartedAt;

  state.session.answered += 1;
  state.session.correct += isCorrect ? 1 : 0;
  state.session.skipped += options.skipped ? 1 : 0;
  state.session.streak = isCorrect ? state.session.streak + 1 : 0;
  state.session.bestStreak = Math.max(state.session.bestStreak, state.session.streak);

  if (responseTimeMs !== null) {
    state.session.responseTimes.push(responseTimeMs);
  }

  state.session.recent.unshift({
    equation: `${state.currentQuestion.left} x ${state.currentQuestion.right}`,
    answer: state.currentQuestion.answer,
    provided: answerValue,
    isCorrect,
    skipped: Boolean(options.skipped),
    responseTimeMs,
  });
  state.session.recent = state.session.recent.slice(0, 8);

  state.progress.totalAnswered += 1;
  state.progress.totalCorrect += isCorrect ? 1 : 0;

  updateFactProgress(state.currentQuestion, isCorrect, responseTimeMs);
  saveProgress();
  renderSession();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
  renderRecent();

  elements.answerInput.disabled = true;
  elements.checkButton.disabled = true;
  elements.skipButton.disabled = true;
}

function handleSubmit(event) {
  event.preventDefault();

  if (!state.active || !state.currentQuestion) {
    return;
  }

  const rawValue = elements.answerInput.value.trim();
  if (!rawValue) {
    setFeedback("Type an answer before checking.", "error");
    elements.answerInput.focus();
    return;
  }

  const numericValue = Number(rawValue);
  const isCorrect = numericValue === state.currentQuestion.answer;

  registerAnswer(isCorrect, numericValue);

  if (isCorrect) {
    setFeedback(`Correct. ${state.currentQuestion.left} x ${state.currentQuestion.right} = ${state.currentQuestion.answer}.`, "success");
  } else {
    setFeedback(
      `${state.currentQuestion.left} x ${state.currentQuestion.right} = ${state.currentQuestion.answer}. You entered ${numericValue}.`,
      "error",
    );
  }

  queueNextQuestion(isCorrect ? 900 : 1500);
}

function handleSkip() {
  if (!state.active || !state.currentQuestion) {
    return;
  }

  registerAnswer(false, "Skipped", { skipped: true });
  setFeedback(
    `Skipped. ${state.currentQuestion.left} x ${state.currentQuestion.right} = ${state.currentQuestion.answer}.`,
    "error",
  );
  queueNextQuestion(1300);
}

function renderSession() {
  const answered = state.session.answered;
  const target = state.settings?.sessionLength ?? Number(elements.sessionLength.value);
  const progressRatio = target > 0 ? Math.min(answered / target, 1) : 0;

  elements.progressFill.style.width = `${progressRatio * 100}%`;
  elements.progressText.textContent =
    target > 0 ? `${answered} / ${target}` : `${answered} answered`;
  elements.sessionCorrect.textContent = `${state.session.correct}`;
  elements.sessionAccuracy.textContent = formatPercent(
    getAccuracy(state.session.correct, state.session.answered),
  );
  elements.sessionStreak.textContent = `${state.session.streak}`;
  elements.sessionBestStreak.textContent = `${state.session.bestStreak}`;
  elements.sessionAvgTime.textContent = formatDuration(average(state.session.responseTimes));
  elements.sessionSkipped.textContent = `${state.session.skipped}`;
}

function renderOverall() {
  const totalAnswered = state.progress.totalAnswered;
  const accuracy = totalAnswered ? state.progress.totalCorrect / totalAnswered : 0;

  elements.overallAnswered.textContent = `${totalAnswered}`;
  elements.overallAccuracy.textContent = formatPercent(accuracy);
  elements.overallBestStreak.textContent = `${state.progress.bestStreak}`;
  elements.overallBestPace.textContent = formatDuration(state.progress.fastestAverageMs);
}

function getTroubleFacts(limit = 5) {
  const entries = Object.entries(state.progress.facts)
    .map(([key, value]) => ({
      key,
      ...value,
      mastery: value.attempts ? value.correct / value.attempts : 0,
      weight: value.misses * 3 + (value.attempts - value.correct) + (value.attempts < 3 ? 2 : 0),
    }))
    .filter((fact) => fact.attempts > 0)
    .sort((left, right) => right.weight - left.weight || left.mastery - right.mastery)
    .slice(0, limit);

  return entries;
}

function renderTroubleSpots() {
  const troubleFacts = getTroubleFacts();

  if (!troubleFacts.length) {
    elements.troubleList.innerHTML = `
      <div class="insight-item">
        <div class="fact-meta">No trouble spots yet. Start a session and the app will surface the facts that need more reps.</div>
      </div>
    `;
    return;
  }

  elements.troubleList.innerHTML = troubleFacts
    .map((fact) => {
      const [a, b] = fact.key.split("x");
      const masteryPercent = Math.round(fact.mastery * 100);

      return `
        <article class="insight-item">
          <div class="insight-top">
            <div>
              <div class="fact-name">${a} x ${b}</div>
              <div class="fact-meta">${fact.correct} correct out of ${fact.attempts} attempts</div>
            </div>
            <div class="fact-meta">${fact.misses} misses</div>
          </div>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="width: ${masteryPercent}%"></div>
          </div>
          <div class="fact-meta">${masteryPercent}% mastery</div>
        </article>
      `;
    })
    .join("");
}

function renderCoachTip() {
  const totalAnswered = state.progress.totalAnswered;
  const troubleFacts = getTroubleFacts(1);

  if (!totalAnswered) {
    elements.coachTip.innerHTML =
      "<strong>Start simple.</strong> Run a short 10 or 20 fact session to give the trainer a baseline. Adaptive mode will get smarter after a few misses and wins.";
    return;
  }

  if (troubleFacts.length) {
    const [a, b] = troubleFacts[0].key.split("x");
    elements.coachTip.innerHTML = `<strong>Next best target:</strong> spend a few rounds on <strong>${a} x ${b}</strong> and nearby facts. Your saved history shows this pair is costing you the most accuracy right now.`;
    return;
  }

  if (state.progress.bestStreak >= 15) {
    elements.coachTip.innerHTML =
      "<strong>You have momentum.</strong> Push the range wider or switch to endless mode to stress-test recall under a longer streak.";
    return;
  }

  elements.coachTip.innerHTML =
    "<strong>Consistency wins.</strong> Aim for a smooth pace before chasing perfect speed. Short, repeatable sessions build recall faster than one long grind.";
}

function renderRecent() {
  if (!state.session.recent.length) {
    elements.recentResults.innerHTML = `
      <div class="recent-item">
        <div class="recent-meta">Recent answers will appear here once you start practicing.</div>
      </div>
    `;
    return;
  }

  elements.recentResults.innerHTML = state.session.recent
    .map((item) => {
      const toneClass = item.isCorrect ? "correct" : "incorrect";
      const pillLabel = item.isCorrect ? "Correct" : item.skipped ? "Skipped" : "Try again";
      const detail = item.skipped
        ? `Answer: ${item.answer}`
        : `You said ${item.provided}, answer ${item.answer}`;
      const speed = item.responseTimeMs === null ? "No timer" : formatDuration(item.responseTimeMs);

      return `
        <article class="recent-item ${toneClass}">
          <div class="recent-top">
            <div class="recent-equation">${item.equation}</div>
            <span class="recent-pill ${toneClass}">${pillLabel}</span>
          </div>
          <div class="recent-meta">${detail}</div>
          <div class="recent-meta">${speed}</div>
        </article>
      `;
    })
    .join("");
}

function resetProgress() {
  const shouldReset = window.confirm("Reset all saved multiplication progress on this browser?");
  if (!shouldReset) {
    return;
  }

  state.progress = defaultProgress();
  saveProgress();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
  renderRecent();
  setFeedback("Saved progress cleared. Your next session starts fresh.", "success");
}

function initialise() {
  toggleFocusField();
  renderSession();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
  renderRecent();

  elements.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const settings = readSettings();

    if (settings.error) {
      setFeedback(settings.error, "error");
      return;
    }

    startSession(settings);
  });

  document.querySelectorAll('input[name="practiceMode"]').forEach((radio) => {
    radio.addEventListener("change", toggleFocusField);
  });

  elements.answerForm.addEventListener("submit", handleSubmit);
  elements.skipButton.addEventListener("click", handleSkip);
  elements.resetProgressButton.addEventListener("click", resetProgress);
}

initialise();
