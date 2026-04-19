const STORAGE_KEY = "multiplication-trainer-progress-v1";
const SETTINGS_KEY = "multiplication-trainer-settings-v1";
const HERO_MESSAGE_KEY = "multiplication-trainer-hero-message-v1";
const FACTOR_LIMIT = 12;
const TABLE_FACTORS = Array.from({ length: FACTOR_LIMIT }, (_, index) => index + 1);
const QUESTION_PRESETS = [10, 20, 30];
const TIME_PRESETS = [1, 3, 5];
const DAILY_TARGET = 10;
const COUNTDOWN_STEPS = ["3", "2", "1", "START!"];
const ENDLESS_COLORS = [
  "#c6452d",
  "#e2752d",
  "#d0a14a",
  "#7c8794",
  "#4e5d6b",
  "#2f7a49",
  "#885d4b",
  "#6f4f45",
  "#9d5a2f",
  "#39424b",
];
const HERO_MESSAGES = [
  "Strength is built one steady rep at a time.",
  "Small sessions build strong recall.",
  "Every rep makes the next one lighter.",
  "Progress comes from showing up again.",
  "Strong habits are built in ordinary days.",
  "The weight gets lighter when the pattern gets familiar.",
  "Discipline turns effort into strength.",
  "When you build your mind, you don't have to use your muscles",
];

const RESULTS_SLIDES = [
  {
    key: "trouble",
    kicker: "Trouble Spots",
    title: "What to revisit next",
  },
  {
    key: "recent",
    kicker: "Recent Answers",
    title: "How the last run felt",
  },
];

const elements = {
  screens: Array.from(document.querySelectorAll(".screen")),
  navButtons: Array.from(document.querySelectorAll(".nav-button")),
  viewButtons: Array.from(document.querySelectorAll("[data-view-target]")),
  heroMessage: document.getElementById("heroMessage"),
  settingsForm: document.getElementById("settingsForm"),
  minFactor: document.getElementById("minFactor"),
  maxFactor: document.getElementById("maxFactor"),
  focusField: document.getElementById("focusField"),
  focusFactor: document.getElementById("focusFactor"),
  adaptiveMode: document.getElementById("adaptiveMode"),
  negativesMode: document.getElementById("negativesMode"),
  timeField: document.getElementById("timeField"),
  timeCustomField: document.getElementById("timeCustomField"),
  timeCustom: document.getElementById("timeCustom"),
  questionTargetField: document.getElementById("questionTargetField"),
  questionCustomField: document.getElementById("questionCustomField"),
  questionCustom: document.getElementById("questionCustom"),
  resetProgressButton: document.getElementById("resetProgressButton"),
  setupPreviewStyle: document.getElementById("setupPreviewStyle"),
  setupPreviewType: document.getElementById("setupPreviewType"),
  setupPreviewRange: document.getElementById("setupPreviewRange"),
  setupPreviewAdaptive: document.getElementById("setupPreviewAdaptive"),
  setupPreviewNegatives: document.getElementById("setupPreviewNegatives"),
  setupPreviewNote: document.getElementById("setupPreviewNote"),
  countdownNumber: document.getElementById("countdownNumber"),
  sessionBadge: document.getElementById("sessionBadge"),
  finishSessionButton: document.getElementById("finishSessionButton"),
  questionTimer: document.getElementById("questionTimer"),
  sessionTimer: document.getElementById("sessionTimer"),
  practiceAttemptedCount: document.getElementById("practiceAttemptedCount"),
  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  problemText: document.getElementById("problemText"),
  answerForm: document.getElementById("answerForm"),
  answerInput: document.getElementById("answerInput"),
  checkButton: document.getElementById("checkButton"),
  skipButton: document.getElementById("skipButton"),
  feedback: document.getElementById("feedback"),
  resultsTitle: document.getElementById("resultsTitle"),
  resultsSummary: document.getElementById("resultsSummary"),
  resultQuestions: document.getElementById("resultQuestions"),
  resultCorrect: document.getElementById("resultCorrect"),
  resultAccuracy: document.getElementById("resultAccuracy"),
  resultPace: document.getElementById("resultPace"),
  resultBestStreak: document.getElementById("resultBestStreak"),
  resultSkipped: document.getElementById("resultSkipped"),
  repeatSessionButton: document.getElementById("repeatSessionButton"),
  resultsMonthLabel: document.getElementById("resultsMonthLabel"),
  resultsRewardStatus: document.getElementById("resultsRewardStatus"),
  resultsCalendarGrid: document.getElementById("resultsCalendarGrid"),
  resultsMonthPrevButton: document.getElementById("resultsMonthPrevButton"),
  resultsMonthNextButton: document.getElementById("resultsMonthNextButton"),
  resultsCarouselKicker: document.getElementById("resultsCarouselKicker"),
  resultsCarouselTitle: document.getElementById("resultsCarouselTitle"),
  resultsPrevButton: document.getElementById("resultsPrevButton"),
  resultsNextButton: document.getElementById("resultsNextButton"),
  resultsSlides: Array.from(document.querySelectorAll(".results-slide")),
  overallAnswered: document.getElementById("overallAnswered"),
  overallAccuracy: document.getElementById("overallAccuracy"),
  overallBestStreak: document.getElementById("overallBestStreak"),
  overallBestPace: document.getElementById("overallBestPace"),
  currentPracticeStreak: document.getElementById("currentPracticeStreak"),
  bestPracticeDayStreak: document.getElementById("bestPracticeDayStreak"),
  currentMonthLabel: document.getElementById("currentMonthLabel"),
  calendarGrid: document.getElementById("calendarGrid"),
  progressMonthPrevButton: document.getElementById("progressMonthPrevButton"),
  progressMonthNextButton: document.getElementById("progressMonthNextButton"),
  coachTip: document.getElementById("coachTip"),
  resultsTroubleList: document.getElementById("resultsTroubleList"),
  progressTroubleList: document.getElementById("progressTroubleList"),
  tableGrid: document.getElementById("tableGrid"),
  recentResults: document.getElementById("recentResults"),
  attemptBadge: document.getElementById("attemptBadge"),
  accuracyBadge: document.getElementById("accuracyBadge"),
  attemptProgressLabel: document.getElementById("attemptProgressLabel"),
  accuracyProgressLabel: document.getElementById("accuracyProgressLabel"),
  dailyProgressStatus: document.getElementById("dailyProgressStatus"),
};

const state = {
  progress: loadProgress(),
  active: false,
  countingDown: false,
  view: "setup",
  settings: null,
  currentQuestion: null,
  questionStartedAt: 0,
  sessionStartedAt: 0,
  sessionEndedAt: 0,
  lastQuestionKey: null,
  advanceTimeoutId: null,
  countdownTimeoutId: null,
  hudIntervalId: null,
  resultsSlideIndex: 0,
  displayMonthKey: "",
  session: createEmptySession(),
};

function formatCount(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function createEmptySession() {
  return {
    attempted: 0,
    correct: 0,
    skipped: 0,
    streak: 0,
    bestStreak: 0,
    responseTimes: [],
    recent: [],
  };
}

function defaultDailyRecord() {
  return {
    attempted: 0,
    correct: 0,
    attemptGoalEarned: false,
    accuracyGoalEarned: false,
    sessionsCompleted: 0,
  };
}

function defaultProgress() {
  return {
    totalAttempted: 0,
    totalCorrect: 0,
    bestStreak: 0,
    sessionsCompleted: 0,
    bestAccuracy: 0,
    fastestAverageMs: null,
    facts: {},
    dailyRecords: {},
  };
}

function defaultSettingsSnapshot() {
  return {
    minFactor: 2,
    maxFactor: 12,
    questionStyle: "mixed",
    focusFactor: 7,
    adaptiveMode: true,
    negativesMode: false,
    sessionType: "question-goal",
    questionPreset: "20",
    questionTarget: 20,
    timePreset: "3",
    timeLimitMinutes: 3,
  };
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, min), max);
}

function normaliseDailyRecord(record) {
  const attempted = clampNumber(
    Number(record?.attempted ?? record?.answered),
    0,
    9999,
    0,
  );
  const correct = clampNumber(Number(record?.correct), 0, 9999, 0);
  const accuracyGoalEarned = Boolean(record?.accuracyGoalEarned ?? record?.heartEarned) ||
    correct >= DAILY_TARGET;
  const attemptGoalEarned =
    Boolean(record?.attemptGoalEarned ?? record?.sliceEarned ?? record?.starEarned) ||
    attempted >= DAILY_TARGET ||
    accuracyGoalEarned;

  return {
    attempted,
    correct,
    attemptGoalEarned,
    accuracyGoalEarned,
    sessionsCompleted: clampNumber(Number(record?.sessionsCompleted), 0, 9999, 0),
  };
}

function sanitiseSettingsSnapshot(settings) {
  const defaults = defaultSettingsSnapshot();
  const questionStyle =
    settings?.questionStyle === "focus" || settings?.mode === "focus"
      ? "focus"
      : "mixed";
  const legacySessionLength = Number(settings?.sessionLength);
  const sessionType =
    settings?.sessionType === "timed" ||
    settings?.sessionType === "question-goal" ||
    settings?.sessionType === "endless"
      ? settings.sessionType
      : legacySessionLength === 0
        ? "endless"
        : defaults.sessionType;
  const rawMinFactor = clampNumber(
    Number(settings?.minFactor),
    1,
    FACTOR_LIMIT,
    defaults.minFactor,
  );
  const rawMaxFactor = clampNumber(
    Number(settings?.maxFactor),
    1,
    FACTOR_LIMIT,
    defaults.maxFactor,
  );
  const minFactor = Math.min(rawMinFactor, rawMaxFactor);
  const maxFactor = Math.max(rawMinFactor, rawMaxFactor);
  const focusFactor = clampNumber(
    Number(settings?.focusFactor),
    1,
    FACTOR_LIMIT,
    defaults.focusFactor,
  );
  const questionTargetFallback =
    legacySessionLength > 0 ? legacySessionLength : defaults.questionTarget;
  const questionTarget = clampNumber(
    Number(settings?.questionTarget),
    5,
    200,
    questionTargetFallback,
  );
  const timeLimitMinutes = clampNumber(
    Number(settings?.timeLimitMinutes),
    1,
    60,
    defaults.timeLimitMinutes,
  );
  const questionPreset = QUESTION_PRESETS.includes(questionTarget)
    ? `${questionTarget}`
    : settings?.questionPreset === "custom"
      ? "custom"
      : QUESTION_PRESETS.includes(Number(settings?.questionPreset))
        ? `${Number(settings.questionPreset)}`
        : "custom";
  const timePreset = TIME_PRESETS.includes(timeLimitMinutes)
    ? `${timeLimitMinutes}`
    : settings?.timePreset === "custom"
      ? "custom"
      : TIME_PRESETS.includes(Number(settings?.timePreset))
        ? `${Number(settings.timePreset)}`
        : "custom";

  return {
    minFactor,
    maxFactor,
    questionStyle,
    focusFactor,
    adaptiveMode:
      typeof settings?.adaptiveMode === "boolean"
        ? settings.adaptiveMode
        : defaults.adaptiveMode,
    negativesMode:
      typeof settings?.negativesMode === "boolean"
        ? settings.negativesMode
        : defaults.negativesMode,
    sessionType,
    questionPreset,
    questionTarget,
    timePreset,
    timeLimitMinutes,
  };
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultProgress();
    }

    const parsed = JSON.parse(raw);
    const dailyRecords = Object.fromEntries(
      Object.entries(parsed.dailyRecords || {}).map(([key, record]) => [
        key,
        normaliseDailyRecord(record),
      ]),
    );

    return {
      ...defaultProgress(),
      ...parsed,
      totalAttempted: clampNumber(
        Number(parsed.totalAttempted ?? parsed.totalAnswered),
        0,
        999999,
        0,
      ),
      totalCorrect: clampNumber(Number(parsed.totalCorrect), 0, 999999, 0),
      facts: parsed.facts || {},
      dailyRecords,
    };
  } catch (error) {
    return defaultProgress();
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (error) {
    // Ignore storage failures so the app still works in restricted contexts.
  }
}

function loadSettingsSnapshot() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return defaultSettingsSnapshot();
    }

    return sanitiseSettingsSnapshot(JSON.parse(raw));
  } catch (error) {
    return defaultSettingsSnapshot();
  }
}

function saveSettingsSnapshot(settings) {
  try {
    window.localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(sanitiseSettingsSnapshot(settings)),
    );
  } catch (error) {
    // Ignore storage failures so the app still works when persistence is restricted.
  }
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function shiftDateKey(key, days) {
  const shifted = parseDateKey(key);
  shifted.setDate(shifted.getDate() + days);
  return formatDateKey(shifted);
}

function getTodayDateKey() {
  return formatDateKey(new Date());
}

function getCurrentMonthDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1, 12);
}

function getMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function createMonthDateFromKey(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1, 12);
}

function formatMonthLabel(date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function getCheckedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function setCheckedValue(name, value) {
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.checked = input.value === value;
  });
}

function applySettingsSnapshot(settings) {
  const snapshot = sanitiseSettingsSnapshot(settings);
  elements.minFactor.value = `${snapshot.minFactor}`;
  elements.maxFactor.value = `${snapshot.maxFactor}`;
  elements.focusFactor.value = `${snapshot.focusFactor}`;
  elements.adaptiveMode.checked = snapshot.adaptiveMode;
  elements.negativesMode.checked = snapshot.negativesMode;
  elements.questionCustom.value = `${snapshot.questionTarget}`;
  elements.timeCustom.value = `${snapshot.timeLimitMinutes}`;
  setCheckedValue("questionStyle", snapshot.questionStyle);
  setCheckedValue("sessionType", snapshot.sessionType);
  setCheckedValue("questionPreset", snapshot.questionPreset);
  setCheckedValue("timePreset", snapshot.timePreset);
}

function getFormSettingsSnapshot() {
  return sanitiseSettingsSnapshot({
    minFactor: Number(elements.minFactor.value),
    maxFactor: Number(elements.maxFactor.value),
    questionStyle: getCheckedValue("questionStyle"),
    focusFactor: Number(elements.focusFactor.value),
    adaptiveMode: elements.adaptiveMode.checked,
    negativesMode: elements.negativesMode.checked,
    sessionType: getCheckedValue("sessionType"),
    questionPreset: getCheckedValue("questionPreset"),
    questionTarget: Number(elements.questionCustom.value),
    timePreset: getCheckedValue("timePreset"),
    timeLimitMinutes: Number(elements.timeCustom.value),
  });
}

function toggleSetupFields() {
  const questionStyle = getCheckedValue("questionStyle");
  const sessionType = getCheckedValue("sessionType");
  const questionPreset = getCheckedValue("questionPreset");
  const timePreset = getCheckedValue("timePreset");

  elements.focusField.classList.toggle("is-hidden", questionStyle !== "focus");
  elements.timeField.classList.toggle("is-hidden", sessionType !== "timed");
  elements.questionTargetField.classList.toggle(
    "is-hidden",
    sessionType !== "question-goal",
  );
  elements.timeCustomField.classList.toggle(
    "is-hidden",
    sessionType !== "timed" || timePreset !== "custom",
  );
  elements.questionCustomField.classList.toggle(
    "is-hidden",
    sessionType !== "question-goal" || questionPreset !== "custom",
  );
}

function readSettings() {
  const minFactor = Number(elements.minFactor.value);
  const maxFactor = Number(elements.maxFactor.value);
  const focusFactor = Number(elements.focusFactor.value);
  const questionStyle = getCheckedValue("questionStyle");
  const sessionType = getCheckedValue("sessionType");
  const questionPreset = getCheckedValue("questionPreset");
  const timePreset = getCheckedValue("timePreset");
  const adaptiveMode = elements.adaptiveMode.checked;
  const negativesMode = elements.negativesMode.checked;

  if (
    Number.isNaN(minFactor) ||
    Number.isNaN(maxFactor) ||
    Number.isNaN(focusFactor) ||
    minFactor < 1 ||
    maxFactor > FACTOR_LIMIT ||
    focusFactor < 1 ||
    focusFactor > FACTOR_LIMIT ||
    minFactor > maxFactor
  ) {
    return { error: "Choose a valid practice range between 1 and 12." };
  }

  const questionTarget =
    questionPreset === "custom"
      ? Number(elements.questionCustom.value)
      : Number(questionPreset);
  const timeLimitMinutes =
    timePreset === "custom" ? Number(elements.timeCustom.value) : Number(timePreset);

  if (sessionType === "question-goal") {
    if (Number.isNaN(questionTarget) || questionTarget < 5 || questionTarget > 200) {
      return { error: "Choose an attempt goal between 5 and 200." };
    }
  }

  if (sessionType === "timed") {
    if (Number.isNaN(timeLimitMinutes) || timeLimitMinutes < 1 || timeLimitMinutes > 60) {
      return { error: "Choose a workout duration between 1 and 60 minutes." };
    }
  }

  return sanitiseSettingsSnapshot({
    minFactor,
    maxFactor,
    questionStyle,
    focusFactor,
    adaptiveMode,
    negativesMode,
    sessionType,
    questionPreset,
    questionTarget,
    timePreset,
    timeLimitMinutes,
  });
}

function getCurrentSettingsPreview() {
  const settings = readSettings();
  return settings.error ? getFormSettingsSnapshot() : settings;
}

function average(values) {
  if (!values.length) {
    return null;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getAccuracy(correct, total) {
  if (!total) {
    return 0;
  }

  return correct / total;
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function formatQuestionDuration(milliseconds) {
  if (milliseconds === null || !Number.isFinite(milliseconds)) {
    return "-";
  }

  return `${(milliseconds / 1000).toFixed(1)}s`;
}

function formatStopwatch(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatMinutesLabel(minutes) {
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

function getQuestionStyleLabel(settings) {
  return settings.questionStyle === "focus"
    ? `Focus one table: x ${settings.focusFactor}`
    : "Mixed tables";
}

function getSessionTypeLabel(settings) {
  if (settings.sessionType === "timed") {
    return `High Intensity Training - ${formatMinutesLabel(settings.timeLimitMinutes)}`;
  }

  if (settings.sessionType === "question-goal") {
    return `Target Reps - ${settings.questionTarget} attempts`;
  }

  return "Free Training - Endless";
}

function getSessionBadgeLabel(settings) {
  const styleLabel =
    settings.questionStyle === "focus"
      ? `x ${settings.focusFactor} focus`
      : "Mixed tables";

  if (settings.sessionType === "timed") {
    return `${styleLabel} - HIT ${settings.timeLimitMinutes}m`;
  }

  if (settings.sessionType === "question-goal") {
    return `${styleLabel} - ${settings.questionTarget} reps`;
  }

  return `${styleLabel} - Free Training`;
}

function getSetupPreviewNote(settings) {
  if (settings.sessionType === "timed") {
    return `Push through a ${settings.timeLimitMinutes}-minute workout and see how many clean answers you can land.`;
  }

  if (settings.sessionType === "question-goal") {
    return `Answer ${settings.questionTarget} questions to finish the workout session. Skipping doesn't count!`;
  }

  return "Train until you choose End Workout. Every 10 attempts starts a fresh colour bar.";
}

function getHeroMessage() {
  try {
    const previousMessage = window.sessionStorage.getItem(HERO_MESSAGE_KEY);
    const choices = HERO_MESSAGES.filter((message) => message !== previousMessage);
    const pool = choices.length ? choices : HERO_MESSAGES;
    const message = pool[Math.floor(Math.random() * pool.length)];
    window.sessionStorage.setItem(HERO_MESSAGE_KEY, message);
    return message;
  } catch (error) {
    return HERO_MESSAGES[Math.floor(Math.random() * HERO_MESSAGES.length)];
  }
}

function viewMatchesButton(view, buttonTarget) {
  if (buttonTarget === "setup") {
    return ["setup", "countdown", "practice", "results"].includes(view);
  }

  return buttonTarget === view;
}

function showView(view) {
  state.view = view;

  elements.screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.view === view);
  });

  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", viewMatchesButton(view, button.dataset.viewTarget));
    button.disabled = state.active;
  });
}

function renderSetupPreview() {
  const settings = getCurrentSettingsPreview();
  elements.setupPreviewStyle.textContent = getQuestionStyleLabel(settings);
  elements.setupPreviewType.textContent = getSessionTypeLabel(settings);
  elements.setupPreviewRange.textContent = `${settings.minFactor} through ${settings.maxFactor}`;
  elements.setupPreviewAdaptive.textContent = settings.adaptiveMode ? "On" : "Off";
  elements.setupPreviewNegatives.textContent = settings.negativesMode ? "On" : "Off";
  elements.setupPreviewNote.textContent = getSetupPreviewNote(settings);
}

function createFact(left, right) {
  const ordered = [left, right].sort((first, second) => first - second);
  return {
    a: ordered[0],
    b: ordered[1],
    key: `${ordered[0]}x${ordered[1]}`,
    answer: left * right,
  };
}

function addFactVariant(map, left, right) {
  const fact = createFact(left, right);
  if (!map.has(fact.key)) {
    map.set(fact.key, fact);
  }
}

function addSignedVariants(map, leftMagnitude, rightMagnitude, includeNegatives) {
  if (!includeNegatives) {
    addFactVariant(map, leftMagnitude, rightMagnitude);
    return;
  }

  [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ].forEach(([leftSign, rightSign]) => {
    addFactVariant(map, leftMagnitude * leftSign, rightMagnitude * rightSign);
  });
}

function buildPool(settings) {
  const map = new Map();

  if (settings.questionStyle === "focus") {
    for (let factor = settings.minFactor; factor <= settings.maxFactor; factor += 1) {
      addSignedVariants(map, settings.focusFactor, factor, settings.negativesMode);
    }

    return Array.from(map.values());
  }

  for (let left = settings.minFactor; left <= settings.maxFactor; left += 1) {
    for (let right = left; right <= settings.maxFactor; right += 1) {
      addSignedVariants(map, left, right, settings.negativesMode);
    }
  }

  return Array.from(map.values());
}

function randomiseDisplay(fact) {
  const swap = Math.random() > 0.5;

  return {
    ...fact,
    left: swap ? fact.b : fact.a,
    right: swap ? fact.a : fact.b,
  };
}

function getFactProgress(key) {
  return {
    attempts: 0,
    correct: 0,
    misses: 0,
    bestStreak: 0,
    currentStreak: 0,
    averageMs: null,
    ...(state.progress.facts[key] || {}),
  };
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

    return { fact, weight };
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

function getDailyRecord(dateKey = getTodayDateKey()) {
  return {
    ...defaultDailyRecord(),
    ...normaliseDailyRecord(state.progress.dailyRecords[dateKey]),
  };
}

function writeDailyRecord(dateKey, record) {
  state.progress.dailyRecords[dateKey] = normaliseDailyRecord(record);
}

function updateDailyRecordForAttempt(isCorrect) {
  const dateKey = getTodayDateKey();
  const record = getDailyRecord(dateKey);
  record.attempted += 1;
  if (isCorrect) {
    record.correct += 1;
  }
  if (record.attempted >= DAILY_TARGET) {
    record.attemptGoalEarned = true;
  }
  if (record.correct >= DAILY_TARGET) {
    record.accuracyGoalEarned = true;
    record.attemptGoalEarned = true;
  }
  writeDailyRecord(dateKey, record);
}

function updateDailyRecordForSessionCompletion() {
  const dateKey = getTodayDateKey();
  const record = getDailyRecord(dateKey);
  record.sessionsCompleted += 1;
  if (record.attempted >= DAILY_TARGET) {
    record.attemptGoalEarned = true;
  }
  if (record.correct >= DAILY_TARGET) {
    record.accuracyGoalEarned = true;
    record.attemptGoalEarned = true;
  }
  writeDailyRecord(dateKey, record);
}

function getWorkoutDayKeys() {
  return Object.entries(state.progress.dailyRecords)
    .filter(([, record]) => normaliseDailyRecord(record).attemptGoalEarned)
    .map(([key]) => key)
    .sort();
}

function calculateBestPracticeStreak(keys) {
  if (!keys.length) {
    return 0;
  }

  let best = 1;
  let current = 1;

  for (let index = 1; index < keys.length; index += 1) {
    if (keys[index] === shiftDateKey(keys[index - 1], 1)) {
      current += 1;
    } else {
      current = 1;
    }
    best = Math.max(best, current);
  }

  return best;
}

function calculateCurrentPracticeStreak(keys) {
  if (!keys.length) {
    return 0;
  }

  const keySet = new Set(keys);
  const todayKey = getTodayDateKey();
  const yesterdayKey = shiftDateKey(todayKey, -1);
  let anchor = null;

  if (keySet.has(todayKey)) {
    anchor = todayKey;
  } else if (keySet.has(yesterdayKey)) {
    anchor = yesterdayKey;
  } else {
    return 0;
  }

  let streak = 0;
  let cursor = anchor;
  while (keySet.has(cursor)) {
    streak += 1;
    cursor = shiftDateKey(cursor, -1);
  }

  return streak;
}

function getPracticeStreakSummary() {
  const workoutDays = getWorkoutDayKeys();
  return {
    current: calculateCurrentPracticeStreak(workoutDays),
    best: calculateBestPracticeStreak(workoutDays),
  };
}

function setRewardProgress(element, ratio) {
  element.style.setProperty("--reward-progress", `${Math.min(Math.max(ratio, 0), 1)}`);
}

function renderDailyProgress() {
  const todayRecord = getDailyRecord();
  const attemptedRatio = Math.min(todayRecord.attempted / DAILY_TARGET, 1);
  const correctRatio = Math.min(todayRecord.correct / DAILY_TARGET, 1);
  const attemptedRemaining = Math.max(0, DAILY_TARGET - todayRecord.attempted);
  const correctRemaining = Math.max(0, DAILY_TARGET - todayRecord.correct);

  setRewardProgress(elements.attemptBadge, attemptedRatio);
  setRewardProgress(elements.accuracyBadge, correctRatio);

  elements.attemptProgressLabel.textContent = `${Math.min(todayRecord.attempted, DAILY_TARGET)} / 10 attempted`;
  elements.accuracyProgressLabel.textContent = `${Math.min(todayRecord.correct, DAILY_TARGET)} / 10 correct`;

  if (todayRecord.attemptGoalEarned && todayRecord.accuracyGoalEarned) {
    elements.dailyProgressStatus.textContent = "Both goals locked in today.";
  } else if (todayRecord.attemptGoalEarned) {
    elements.dailyProgressStatus.textContent = `${correctRemaining} more correct to finish today strong.`;
  } else if (todayRecord.attempted > 0 || todayRecord.correct > 0) {
    elements.dailyProgressStatus.textContent = `${attemptedRemaining} more attempts to lock in the first goal.`;
  } else {
    elements.dailyProgressStatus.textContent = "Two quick wins waiting today.";
  }

  elements.attemptBadge.classList.toggle("is-earned", todayRecord.attemptGoalEarned);
  elements.accuracyBadge.classList.toggle("is-earned", todayRecord.accuracyGoalEarned);
}

function renderQuestionTimer(value) {
  elements.questionTimer.textContent =
    typeof value === "number" ? formatQuestionDuration(value) : value;
}

function getElapsedSessionMs() {
  if (!state.sessionStartedAt) {
    return 0;
  }

  if (state.sessionEndedAt) {
    return state.sessionEndedAt - state.sessionStartedAt;
  }

  return state.active && !state.countingDown
    ? window.performance.now() - state.sessionStartedAt
    : 0;
}

function renderSessionTimer() {
  if (!state.settings) {
    elements.sessionTimer.textContent = "0:00";
    return;
  }

  const elapsedMs = getElapsedSessionMs();

  if (state.settings.sessionType === "timed") {
    elements.sessionTimer.textContent = `${formatStopwatch(elapsedMs)} / ${formatStopwatch(
      state.settings.timeLimitMinutes * 60000,
    )}`;
    return;
  }

  elements.sessionTimer.textContent = formatStopwatch(elapsedMs);
}

function renderPracticeProgress() {
  const settings = state.settings || getCurrentSettingsPreview();
  let fillRatio = 0;
  let progressLabel = "Ready";
  let fillColor = ENDLESS_COLORS[0];

  if (settings.sessionType === "question-goal") {
    fillRatio =
      settings.questionTarget > 0
        ? Math.min(state.session.attempted / settings.questionTarget, 1)
        : 0;
    progressLabel = `${state.session.attempted} / ${settings.questionTarget} attempted`;
  } else if (settings.sessionType === "timed") {
    const elapsedMs = getElapsedSessionMs();
    fillRatio = Math.min(elapsedMs / (settings.timeLimitMinutes * 60000), 1);
    fillColor = "#c6452d";
    progressLabel = `${formatStopwatch(elapsedMs)} / ${formatStopwatch(
      settings.timeLimitMinutes * 60000,
    )}`;
  } else {
    const completedBands = Math.floor(state.session.attempted / DAILY_TARGET);
    const withinBand = state.session.attempted % DAILY_TARGET;
    fillRatio =
      state.session.attempted > 0 && withinBand === 0
        ? 1
        : withinBand / DAILY_TARGET;
    fillColor = ENDLESS_COLORS[completedBands % ENDLESS_COLORS.length];
    progressLabel = `${state.session.attempted} attempted`;
  }

  elements.progressFill.style.width = `${fillRatio * 100}%`;
  elements.progressFill.style.background = fillColor;
  elements.progressText.textContent = progressLabel;
  elements.practiceAttemptedCount.textContent = `${state.session.attempted}`;
}

function setFeedback(message, tone = "") {
  elements.feedback.textContent = message;
  elements.feedback.classList.remove("success", "error");
  if (tone) {
    elements.feedback.classList.add(tone);
  }
}

function askNextQuestion() {
  state.currentQuestion = pickQuestion();
  state.questionStartedAt = window.performance.now();
  state.lastQuestionKey = state.currentQuestion.key;

  elements.problemText.textContent = `${state.currentQuestion.left} x ${state.currentQuestion.right}`;
  elements.answerInput.value = "";
  elements.answerInput.disabled = false;
  elements.checkButton.disabled = false;
  elements.skipButton.disabled = false;
  elements.answerInput.focus();
  setFeedback("");
  renderQuestionTimer(0);
  renderPracticeProgress();
}

function updateLiveTimers() {
  if (!state.active || state.countingDown || !state.currentQuestion) {
    return;
  }

  const questionElapsedMs = window.performance.now() - state.questionStartedAt;
  const sessionElapsedMs = getElapsedSessionMs();

  renderQuestionTimer(questionElapsedMs);
  renderSessionTimer();
  renderPracticeProgress();

  if (
    state.settings.sessionType === "timed" &&
    sessionElapsedMs >= state.settings.timeLimitMinutes * 60000
  ) {
    completeSession("timer");
  }
}

function startHudTimer() {
  window.clearInterval(state.hudIntervalId);
  state.hudIntervalId = window.setInterval(updateLiveTimers, 100);
}

function stopHudTimer() {
  window.clearInterval(state.hudIntervalId);
  state.hudIntervalId = null;
}

function stopCountdown() {
  window.clearTimeout(state.countdownTimeoutId);
  state.countdownTimeoutId = null;
  state.countingDown = false;
}

function beginPracticeSession() {
  state.countingDown = false;
  state.sessionStartedAt = window.performance.now();
  state.sessionEndedAt = 0;

  showView("practice");
  elements.finishSessionButton.classList.toggle(
    "is-hidden",
    state.settings.sessionType !== "endless",
  );
  renderSessionTimer();
  renderPracticeProgress();
  renderDailyProgress();
  askNextQuestion();
  startHudTimer();
}

function runCountdownStep(stepIndex) {
  const step = COUNTDOWN_STEPS[stepIndex];
  elements.countdownNumber.textContent = step;
  elements.countdownNumber.classList.remove("countdown-pop");
  window.requestAnimationFrame(() => {
    elements.countdownNumber.classList.add("countdown-pop");
  });

  const isLastStep = stepIndex === COUNTDOWN_STEPS.length - 1;
  const delay = isLastStep ? 650 : 1000;

  state.countdownTimeoutId = window.setTimeout(() => {
    if (!state.active) {
      return;
    }

    if (isLastStep) {
      beginPracticeSession();
      return;
    }

    runCountdownStep(stepIndex + 1);
  }, delay);
}

function startSession(settings) {
  stopCountdown();
  stopHudTimer();
  window.clearTimeout(state.advanceTimeoutId);

  state.active = true;
  state.countingDown = true;
  state.settings = settings;
  state.session = createEmptySession();
  state.currentQuestion = null;
  state.lastQuestionKey = null;
  state.questionStartedAt = 0;
  state.sessionStartedAt = 0;
  state.sessionEndedAt = 0;

  saveSettingsSnapshot(settings);
  elements.sessionBadge.textContent = getSessionBadgeLabel(settings);
  elements.finishSessionButton.classList.add("is-hidden");
  elements.answerInput.disabled = true;
  elements.checkButton.disabled = true;
  elements.skipButton.disabled = true;
  elements.problemText.textContent = "Get ready";
  renderQuestionTimer(0);
  renderSessionTimer();
  renderPracticeProgress();
  renderDailyProgress();
  setFeedback("");
  showView("countdown");
  runCountdownStep(0);
}

function isSessionComplete() {
  return (
    state.settings.sessionType === "question-goal" &&
    state.session.attempted >= state.settings.questionTarget
  );
}

function finishSessionProgress() {
  const accuracy = getAccuracy(state.session.correct, state.session.attempted);
  const averageMs = average(state.session.responseTimes);

  state.progress.bestStreak = Math.max(state.progress.bestStreak, state.session.bestStreak);
  state.progress.bestAccuracy = Math.max(state.progress.bestAccuracy, accuracy);

  if (averageMs !== null) {
    if (state.progress.fastestAverageMs === null || averageMs < state.progress.fastestAverageMs) {
      state.progress.fastestAverageMs = averageMs;
    }
  }

  state.progress.sessionsCompleted += 1;
}

function updateFactProgress(question, isCorrect, responseTimeMs) {
  const existing = getFactProgress(question.key);
  const updated = {
    ...existing,
    attempts: existing.attempts + 1,
    correct: existing.correct + (isCorrect ? 1 : 0),
    misses: existing.misses + (isCorrect ? 0 : 1),
    currentStreak: isCorrect ? existing.currentStreak + 1 : 0,
    bestStreak: isCorrect
      ? Math.max(existing.bestStreak, existing.currentStreak + 1)
      : existing.bestStreak,
    averageMs:
      responseTimeMs === null
        ? existing.averageMs
        : existing.averageMs === null
          ? responseTimeMs
          : (existing.averageMs * existing.attempts + responseTimeMs) / (existing.attempts + 1),
  };

  state.progress.facts[question.key] = updated;
}

function registerRecentAnswer(answerValue, isCorrect, skipped, responseTimeMs) {
  state.session.recent.unshift({
    equation: `${state.currentQuestion.left} x ${state.currentQuestion.right}`,
    answer: state.currentQuestion.answer,
    provided: answerValue,
    isCorrect,
    skipped,
    responseTimeMs,
  });
  state.session.recent = state.session.recent.slice(0, 8);
}

function registerAnswer(isCorrect, answerValue, options = {}) {
  const skipped = Boolean(options.skipped);
  const responseTimeMs = skipped ? null : window.performance.now() - state.questionStartedAt;

  if (skipped) {
    state.session.skipped += 1;
    state.session.streak = 0;
    registerRecentAnswer("Skipped", false, true, null);
  } else {
    state.session.attempted += 1;
    state.session.correct += isCorrect ? 1 : 0;
    state.session.streak = isCorrect ? state.session.streak + 1 : 0;
    state.session.bestStreak = Math.max(state.session.bestStreak, state.session.streak);
    state.session.responseTimes.push(responseTimeMs);
    state.progress.totalAttempted += 1;
    state.progress.totalCorrect += isCorrect ? 1 : 0;
    updateDailyRecordForAttempt(isCorrect);
    updateFactProgress(state.currentQuestion, isCorrect, responseTimeMs);
    registerRecentAnswer(answerValue, isCorrect, false, responseTimeMs);
  }

  saveProgress();
  renderDailyProgress();
  renderPracticeProgress();

  elements.answerInput.disabled = true;
  elements.checkButton.disabled = true;
  elements.skipButton.disabled = true;
}

function queueNextQuestion(delay) {
  window.clearTimeout(state.advanceTimeoutId);
  state.advanceTimeoutId = window.setTimeout(() => {
    if (!state.active) {
      return;
    }

    if (isSessionComplete()) {
      completeSession("goal");
      return;
    }

    askNextQuestion();
  }, delay);
}

function handleSubmit(event) {
  event.preventDefault();

  if (!state.active || state.countingDown || !state.currentQuestion) {
    return;
  }

  const rawValue = elements.answerInput.value.trim();
  if (!rawValue) {
    setFeedback("Type an answer first.", "error");
    elements.answerInput.focus();
    return;
  }

  if (!/^-?\d+$/.test(rawValue)) {
    setFeedback("Use whole numbers only.", "error");
    elements.answerInput.focus();
    return;
  }

  const numericValue = Number(rawValue);
  const isCorrect = numericValue === state.currentQuestion.answer;

  registerAnswer(isCorrect, numericValue);
  setFeedback(isCorrect ? "Right" : "Wrong", isCorrect ? "success" : "error");
  queueNextQuestion(isCorrect ? 320 : 520);
}

function handleSkip() {
  if (!state.active || state.countingDown || !state.currentQuestion) {
    return;
  }

  registerAnswer(false, "Skipped", { skipped: true });
  setFeedback("Skipped", "error");
  queueNextQuestion(420);
}

function getTodayRewardSummary() {
  const todayRecord = getDailyRecord();
  const attemptedRemaining = Math.max(0, DAILY_TARGET - todayRecord.attempted);
  const correctRemaining = Math.max(0, DAILY_TARGET - todayRecord.correct);

  if (todayRecord.attemptGoalEarned && todayRecord.accuracyGoalEarned) {
    return "Both daily goals are secured. The tracker is lit up for today.";
  }

  if (todayRecord.attemptGoalEarned) {
    return `${correctRemaining} more correct to complete both daily goals.`;
  }

  if (todayRecord.attempted > 0 || todayRecord.correct > 0) {
    return `${attemptedRemaining} more attempts to secure today's first goal.`;
  }

  return "Every rep counts. Ready for another set?";
}

function getResultsRewardStatus() {
  const todayRecord = getDailyRecord();
  const streakSummary = getPracticeStreakSummary();

  if (todayRecord.attemptGoalEarned && todayRecord.accuracyGoalEarned) {
    return `Current streak: ${formatCount(streakSummary.current, "day")}.`;
  }

  if (todayRecord.attemptGoalEarned) {
    return `${Math.max(0, DAILY_TARGET - todayRecord.correct)} more correct to complete both goals today.`;
  }

  return `${Math.max(0, DAILY_TARGET - todayRecord.attempted)} more attempts to secure today.`;
}

function renderResults(reason) {
  const accuracy = getAccuracy(state.session.correct, state.session.attempted);
  const averageMs = average(state.session.responseTimes);

  if (reason === "timer") {
    elements.resultsTitle.textContent = "Time called.";
  } else if (state.settings.sessionType === "endless") {
    elements.resultsTitle.textContent = "Free Training complete.";
  } else {
    elements.resultsTitle.textContent = "Workout complete.";
  }

  elements.resultsSummary.textContent = getTodayRewardSummary();
  elements.resultQuestions.textContent = `${state.session.attempted}`;
  elements.resultCorrect.textContent = `${state.session.correct}`;
  elements.resultAccuracy.textContent = formatPercent(accuracy);
  elements.resultPace.textContent = formatQuestionDuration(averageMs);
  elements.resultBestStreak.textContent = `${state.session.bestStreak}`;
  elements.resultSkipped.textContent = `${state.session.skipped}`;
  elements.resultsRewardStatus.textContent = getResultsRewardStatus();
}

function completeSession(reason = "manual") {
  if (!state.active) {
    return;
  }

  state.active = false;
  state.countingDown = false;
  state.sessionEndedAt = state.sessionStartedAt ? window.performance.now() : 0;
  window.clearTimeout(state.advanceTimeoutId);
  stopHudTimer();
  stopCountdown();

  elements.answerInput.disabled = true;
  elements.checkButton.disabled = true;
  elements.skipButton.disabled = true;
  elements.finishSessionButton.classList.add("is-hidden");

  updateDailyRecordForSessionCompletion();
  finishSessionProgress();
  saveProgress();

  renderQuestionTimer("Done");
  renderSessionTimer();
  renderDailyProgress();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
  renderTableRadar();
  renderRecent();
  renderCalendars();
  renderStreakPanel();
  renderResults(reason);
  renderResultsCarousel();
  showView("results");
}

function handleFinishSession() {
  if (!state.active || state.settings.sessionType !== "endless" || state.countingDown) {
    return;
  }

  const shouldFinish = window.confirm("End this workout and view your results?");
  if (!shouldFinish) {
    return;
  }

  completeSession("manual");
}

function renderOverall() {
  const accuracy = getAccuracy(state.progress.totalCorrect, state.progress.totalAttempted);
  elements.overallAnswered.textContent = `${state.progress.totalAttempted}`;
  elements.overallAccuracy.textContent = formatPercent(accuracy);
  elements.overallBestStreak.textContent = `${state.progress.bestStreak}`;
  elements.overallBestPace.textContent = formatQuestionDuration(state.progress.fastestAverageMs);
}

function getTroubleFacts(limit = 5) {
  return Object.entries(state.progress.facts)
    .map(([key, value]) => ({
      key,
      ...value,
      mastery: value.attempts ? value.correct / value.attempts : 0,
      weight:
        value.misses * 4 +
        Math.round((1 - (value.attempts ? value.correct / value.attempts : 0)) * 6) +
        (value.attempts < 3 ? 1 : 0),
    }))
    .filter((fact) => fact.attempts > 0 && (fact.misses > 0 || fact.mastery < 0.8))
    .sort((left, right) => right.weight - left.weight || left.mastery - right.mastery)
    .slice(0, limit);
}

function renderTroubleList(target, troubleFacts) {
  if (!target) {
    return;
  }

  if (!troubleFacts.length) {
    target.innerHTML = `
      <div class="insight-item empty-state">
        <div class="fact-meta">No trouble spots yet. A few more answers will give the trainer something to rank.</div>
      </div>
    `;
    return;
  }

  target.innerHTML = troubleFacts
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

function renderTroubleSpots() {
  const troubleFacts = getTroubleFacts();
  renderTroubleList(elements.resultsTroubleList, troubleFacts);
  renderTroubleList(elements.progressTroubleList, troubleFacts);
}

function renderCoachTip() {
  const totalAttempted = state.progress.totalAttempted;
  const troubleFacts = getTroubleFacts(1);

  if (!totalAttempted) {
    elements.coachTip.innerHTML =
      "<strong>Start simple.</strong> A short workout is enough to give the trainer a baseline.";
    return;
  }

  if (troubleFacts.length) {
    const [a, b] = troubleFacts[0].key.split("x");
    elements.coachTip.innerHTML = `<strong>Next best target:</strong> spend a few rounds on <strong>${a} x ${b}</strong> and nearby facts. That pair is costing you the most right now.`;
    return;
  }

  if (state.progress.bestStreak >= 15) {
    elements.coachTip.innerHTML =
      "<strong>You have momentum.</strong> Push the range wider, try a timed workout, or stretch things out with Free Training.";
    return;
  }

  elements.coachTip.innerHTML =
    "<strong>Consistency wins.</strong> Secure the attempt goal first, then chase the accuracy goal with cleaner answers.";
}

function parseFactKey(key) {
  const [left, right] = key.split("x").map(Number);
  return {
    left,
    right,
    leftMagnitude: Math.abs(left),
    rightMagnitude: Math.abs(right),
  };
}

function getTableStatus(table) {
  if (!table.seenFacts) {
    return { label: "Unknown", tone: "unseen" };
  }

  if (table.accuracy >= 0.88 && table.seenFacts >= 6) {
    return { label: "Strong!", tone: "strong" };
  }

  if (table.accuracy >= 0.72 && table.seenFacts >= 3) {
    return { label: "Building", tone: "steady" };
  }

  return { label: "Need Reps", tone: "needs" };
}

function getTableStats() {
  const factEntries = Object.entries(state.progress.facts).map(([key, progress]) => ({
    key,
    progress: getFactProgress(key),
    ...parseFactKey(key),
  }));

  return TABLE_FACTORS.map((factor) => {
    const relatedEntries = factEntries.filter(
      (entry) => entry.leftMagnitude === factor || entry.rightMagnitude === factor,
    );
    const seenGroupKeys = new Set(
      relatedEntries.map((entry) => {
        const low = Math.min(entry.leftMagnitude, entry.rightMagnitude);
        const high = Math.max(entry.leftMagnitude, entry.rightMagnitude);
        return `${low}x${high}`;
      }),
    );
    const totals = relatedEntries.reduce(
      (summary, entry) => {
        summary.attempts += entry.progress.attempts;
        summary.correct += entry.progress.correct;
        summary.misses += entry.progress.misses;
        return summary;
      },
      {
        attempts: 0,
        correct: 0,
        misses: 0,
      },
    );

    const accuracy = getAccuracy(totals.correct, totals.attempts);

    return {
      factor,
      totalFacts: TABLE_FACTORS.length,
      accuracy,
      seenFacts: seenGroupKeys.size,
      ...totals,
      ...getTableStatus({
        seenFacts: seenGroupKeys.size,
        accuracy,
      }),
    };
  });
}

function renderTableRadar() {
  if (!state.progress.totalAttempted) {
    elements.tableGrid.innerHTML = `
      <div class="table-card unseen">
        <div class="table-name">Start a workout</div>
        <div class="fact-meta">The table radar fills in after you answer a few facts.</div>
      </div>
    `;
    return;
  }

  elements.tableGrid.innerHTML = getTableStats()
    .map((table) => {
      const accuracyLabel = table.attempts
        ? `${formatPercent(table.accuracy)} accuracy`
        : "No attempts yet";
      const detailLabel = table.attempts
        ? `${table.seenFacts}/${table.totalFacts} pairings seen`
        : "Fresh range";

      return `
        <article class="table-card ${table.tone}">
          <div class="table-card-top">
            <div>
              <div class="table-name">x ${table.factor}</div>
              <div class="fact-meta">${detailLabel}</div>
            </div>
            <span class="table-pill ${table.tone}">${table.label}</span>
          </div>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill ${table.tone}" style="width: ${Math.round(table.accuracy * 100)}%"></div>
          </div>
          <div class="table-card-stats">
            <span>${accuracyLabel}</span>
            <span>${table.misses} misses</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderRecent() {
  if (!state.session.recent.length) {
    elements.recentResults.innerHTML = `
      <div class="recent-item empty-state">
        <div class="recent-meta">Recent answers from the latest workout will appear here.</div>
      </div>
    `;
    return;
  }

  elements.recentResults.innerHTML = state.session.recent
    .map((item) => {
      const toneClass = item.isCorrect ? "correct" : "incorrect";
      const pillLabel = item.isCorrect ? "Right" : item.skipped ? "Skipped" : "Wrong";
      const detail = item.skipped
        ? `Correct answer: ${item.answer}`
        : `You said ${item.provided}, answer ${item.answer}`;
      const speed =
        item.responseTimeMs === null ? "No timer" : formatQuestionDuration(item.responseTimeMs);

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

function getAvailableMonthKeys() {
  const monthKeys = new Set([getMonthKey(getCurrentMonthDate())]);

  Object.entries(state.progress.dailyRecords).forEach(([dateKey, record]) => {
    const normalised = normaliseDailyRecord(record);
    if (normalised.attempted || normalised.correct || normalised.sessionsCompleted) {
      monthKeys.add(getMonthKey(parseDateKey(dateKey)));
    }
  });

  return Array.from(monthKeys).sort();
}

function ensureDisplayMonthKey() {
  const availableMonthKeys = getAvailableMonthKeys();
  if (!availableMonthKeys.includes(state.displayMonthKey)) {
    state.displayMonthKey = availableMonthKeys[availableMonthKeys.length - 1];
  }
}

function getMonthNavigationState() {
  const availableMonthKeys = getAvailableMonthKeys();
  const currentMonthKey = getMonthKey(getCurrentMonthDate());
  const activeIndex = availableMonthKeys.indexOf(state.displayMonthKey);

  return {
    availableMonthKeys,
    activeIndex,
    canMovePrev: activeIndex > 0,
    canMoveNext:
      activeIndex > -1 &&
      activeIndex < availableMonthKeys.length - 1 &&
      state.displayMonthKey !== currentMonthKey,
  };
}

function buildCalendarMarkup(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1, 12);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlankDays = firstDay.getDay();
  const cells = [];
  const todayKey = getTodayDateKey();

  for (let index = 0; index < leadingBlankDays; index += 1) {
    cells.push('<div class="calendar-day empty"></div>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day, 12);
    const dateKey = formatDateKey(date);
    const record = getDailyRecord(dateKey);
    const classes = ["calendar-day"];

    if (dateKey === todayKey) {
      classes.push("today");
    }
    if (record.attemptGoalEarned) {
      classes.push("has-attempt-goal");
    }
    if (record.accuracyGoalEarned) {
      classes.push("has-accuracy-goal");
    }

    cells.push(`
      <div class="${classes.join(" ")}">
        <div class="calendar-day-top">
          <span class="day-number">${day}</span>
        </div>
        <div class="calendar-day-body">
          <span class="day-icons">
            ${record.attemptGoalEarned ? '<span class="day-attempt" aria-label="Attempt goal earned"><svg viewBox="0 0 72 72" role="presentation"><path d="M12 27h8l7 18H18a6 6 0 0 1-6-6v-6c0-3.3 2.7-6 6-6Zm48 0a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6h-9l7-18h8ZM28 23h16l10 26H18l10-26Z"/></svg></span>' : ""}
            ${record.accuracyGoalEarned ? '<span class="day-accuracy" aria-label="Accuracy goal earned"><svg viewBox="0 0 72 72" role="presentation"><path d="M36 10 48 16l14 2-4 13 3 15-13-4-12 8-12-8-13 4 3-15-4-13 14-2 12-6Z"/></svg></span>' : ""}
          </span>
        </div>
      </div>
    `);
  }

  while (cells.length % 7 !== 0) {
    cells.push('<div class="calendar-day empty"></div>');
  }

  return cells.join("");
}

function renderMonthNavigation() {
  ensureDisplayMonthKey();
  const currentMonthDate = createMonthDateFromKey(state.displayMonthKey);
  const navState = getMonthNavigationState();
  const label = formatMonthLabel(currentMonthDate);

  elements.currentMonthLabel.textContent = label;
  elements.resultsMonthLabel.textContent = label;

  [
    elements.progressMonthPrevButton,
    elements.resultsMonthPrevButton,
  ].forEach((button) => {
    button.disabled = !navState.canMovePrev;
  });

  [
    elements.progressMonthNextButton,
    elements.resultsMonthNextButton,
  ].forEach((button) => {
    button.disabled = !navState.canMoveNext;
  });
}

function renderCalendars() {
  ensureDisplayMonthKey();
  const displayMonthDate = createMonthDateFromKey(state.displayMonthKey);
  const calendarMarkup = buildCalendarMarkup(displayMonthDate);

  renderMonthNavigation();
  elements.calendarGrid.innerHTML = calendarMarkup;
  elements.resultsCalendarGrid.innerHTML = calendarMarkup;
}

function shiftDisplayedMonth(direction) {
  const navState = getMonthNavigationState();
  if (
    (direction < 0 && !navState.canMovePrev) ||
    (direction > 0 && !navState.canMoveNext)
  ) {
    return;
  }

  state.displayMonthKey = navState.availableMonthKeys[navState.activeIndex + direction];
  renderCalendars();
}

function renderStreakPanel() {
  const streakSummary = getPracticeStreakSummary();
  elements.currentPracticeStreak.textContent = `${streakSummary.current}`;
  elements.bestPracticeDayStreak.textContent = `${streakSummary.best}`;
}

function renderResultsCarousel() {
  const activeSlide = RESULTS_SLIDES[state.resultsSlideIndex];
  elements.resultsCarouselKicker.textContent = activeSlide.kicker;
  elements.resultsCarouselTitle.textContent = activeSlide.title;

  elements.resultsSlides.forEach((slide) => {
    slide.classList.toggle("is-active", slide.dataset.resultsSlide === activeSlide.key);
  });
}

function shiftResultsCarousel(direction) {
  state.resultsSlideIndex =
    (state.resultsSlideIndex + direction + RESULTS_SLIDES.length) % RESULTS_SLIDES.length;
  renderResultsCarousel();
}

function handleSettingsChange() {
  toggleSetupFields();
  renderSetupPreview();
  saveSettingsSnapshot(getCurrentSettingsPreview());
}

function resetProgress() {
  const shouldReset = window.confirm("Reset all saved multiplication progress on this browser?");
  if (!shouldReset) {
    return;
  }

  state.progress = defaultProgress();
  state.displayMonthKey = getMonthKey(getCurrentMonthDate());
  saveProgress();
  renderDailyProgress();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
  renderTableRadar();
  renderRecent();
  renderCalendars();
  renderStreakPanel();
  window.alert("Saved progress cleared.");
}

function initialise() {
  elements.heroMessage.textContent = getHeroMessage();
  state.displayMonthKey = getMonthKey(getCurrentMonthDate());

  const savedSettings = loadSettingsSnapshot();
  applySettingsSnapshot(savedSettings);
  toggleSetupFields();
  renderSetupPreview();
  renderDailyProgress();
  renderOverall();
  renderTroubleSpots();
  renderCoachTip();
  renderTableRadar();
  renderRecent();
  renderCalendars();
  renderStreakPanel();
  renderResultsCarousel();
  renderPracticeProgress();
  renderSessionTimer();
  renderQuestionTimer(0);
  setFeedback("");
  showView("setup");

  elements.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const settings = readSettings();

    if (settings.error) {
      window.alert(settings.error);
      return;
    }

    startSession(settings);
  });

  elements.settingsForm.addEventListener("input", handleSettingsChange);
  elements.settingsForm.addEventListener("change", handleSettingsChange);
  elements.answerForm.addEventListener("submit", handleSubmit);
  elements.skipButton.addEventListener("click", handleSkip);
  elements.finishSessionButton.addEventListener("click", handleFinishSession);
  elements.repeatSessionButton.addEventListener("click", () => {
    if (state.settings) {
      startSession(state.settings);
    }
  });
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.progressMonthPrevButton.addEventListener("click", () => shiftDisplayedMonth(-1));
  elements.progressMonthNextButton.addEventListener("click", () => shiftDisplayedMonth(1));
  elements.resultsMonthPrevButton.addEventListener("click", () => shiftDisplayedMonth(-1));
  elements.resultsMonthNextButton.addEventListener("click", () => shiftDisplayedMonth(1));
  elements.resultsPrevButton.addEventListener("click", () => shiftResultsCarousel(-1));
  elements.resultsNextButton.addEventListener("click", () => shiftResultsCarousel(1));

  [elements.checkButton, elements.skipButton].forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });
  });

  elements.viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (state.active) {
        return;
      }

      const targetView = button.dataset.viewTarget;
      if (targetView) {
        showView(targetView);
      }
    });
  });
}

initialise();
