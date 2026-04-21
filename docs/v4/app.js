const STORAGE_KEY = "multiplication-trainer-progress-v1";
const SETTINGS_KEY = "multiplication-trainer-settings-v1";
const HERO_MESSAGE_KEY = "multiplication-trainer-hero-message-v1";
const RESULTS_MESSAGE_KEY_PREFIX = "multiplication-trainer-results-message-v1";
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
  "Short workouts build strong recall.",
  "Every rep makes the next one lighter.",
  "Progress comes from showing up again.",
  "Strong habits are built in ordinary days.",
  "The weight gets lighter when the pattern gets familiar.",
  "Discipline turns effort into strength.",
  "When you build your mind, you don't have to use your muscles",
];
const RESULTS_TITLE_POOLS = {
  completed: [
    "Great job on showing up today.",
    "Another workout in the books.",
    "You put the work in today.",
    "Showing up counts.",
  ],
  progress: [
    "One step closer to better.",
    "You're building real momentum.",
    "You beat a previous mark.",
    "Progress looks good on you.",
  ],
  strong: [
    "Beast Mode.",
    "Fire 🔥",
    "You were locked in.",
    "That effort showed.",
  ],
};

const OPERATION_CONFIG = {
  multiplication: {
    label: "Multiplication",
    buildPool(settings) {
      return buildMultiplicationPool(settings);
    },
  },
};

const RESULTS_SLIDES = ["summary", "tracker", "focus"];
const PROGRESS_SLIDES = ["overview", "tracker", "facts", "focus", "records", "coach"];

const elements = {
  screens: Array.from(document.querySelectorAll(".screen")),
  navButtons: Array.from(document.querySelectorAll(".nav-button")),
  viewButtons: Array.from(document.querySelectorAll("[data-view-target]")),
  optionsButton: document.getElementById("optionsButton"),
  optionsDialog: document.getElementById("optionsDialog"),
  optionsCloseButton: document.getElementById("optionsCloseButton"),
  heroMessage: document.getElementById("heroMessage"),
  settingsForm: document.getElementById("settingsForm"),
  minFactor: document.getElementById("minFactor"),
  maxFactor: document.getElementById("maxFactor"),
  focusField: document.getElementById("focusField"),
  focusFactor: document.getElementById("focusFactor"),
  adaptiveMode: document.getElementById("adaptiveMode"),
  negativesMode: document.getElementById("negativesMode"),
  freeTrainingField: document.getElementById("freeTrainingField"),
  sparTimingField: document.getElementById("sparTimingField"),
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
  resultQuestions: document.getElementById("resultQuestions"),
  resultCorrect: document.getElementById("resultCorrect"),
  resultAccuracy: document.getElementById("resultAccuracy"),
  resultPace: document.getElementById("resultPace"),
  resultBestStreak: document.getElementById("resultBestStreak"),
  resultSkipped: document.getElementById("resultSkipped"),
  repeatSessionButton: document.getElementById("repeatSessionButton"),
  resultsMonthLabel: document.getElementById("resultsMonthLabel"),
  resultsCurrentPracticeStreak: document.getElementById("resultsCurrentPracticeStreak"),
  resultsBestPracticeDayStreak: document.getElementById("resultsBestPracticeDayStreak"),
  resultsMonthSessions: document.getElementById("resultsMonthSessions"),
  resultsMonthHearts: document.getElementById("resultsMonthHearts"),
  resultsMonthStars: document.getElementById("resultsMonthStars"),
  resultsCalendarGrid: document.getElementById("resultsCalendarGrid"),
  resultsMonthPrevButton: document.getElementById("resultsMonthPrevButton"),
  resultsMonthNextButton: document.getElementById("resultsMonthNextButton"),
  resultsPrevButton: document.getElementById("resultsPrevButton"),
  resultsNextButton: document.getElementById("resultsNextButton"),
  resultsSlides: Array.from(document.querySelectorAll(".results-slide")),
  progressPrevButton: document.getElementById("progressPrevButton"),
  progressNextButton: document.getElementById("progressNextButton"),
  progressSlides: Array.from(document.querySelectorAll(".progress-slide")),
  overallAnswered: document.getElementById("overallAnswered"),
  overallAccuracy: document.getElementById("overallAccuracy"),
  overallBestStreak: document.getElementById("overallBestStreak"),
  overallBestPace: document.getElementById("overallBestPace"),
  overallWorkoutCount: document.getElementById("overallWorkoutCount"),
  overallBestDayAttempts: document.getElementById("overallBestDayAttempts"),
  currentPracticeStreak: document.getElementById("currentPracticeStreak"),
  bestPracticeDayStreak: document.getElementById("bestPracticeDayStreak"),
  progressMonthSessions: document.getElementById("progressMonthSessions"),
  progressMonthHearts: document.getElementById("progressMonthHearts"),
  progressMonthStars: document.getElementById("progressMonthStars"),
  currentMonthLabel: document.getElementById("currentMonthLabel"),
  calendarGrid: document.getElementById("calendarGrid"),
  progressMonthPrevButton: document.getElementById("progressMonthPrevButton"),
  progressMonthNextButton: document.getElementById("progressMonthNextButton"),
  coachTip: document.getElementById("coachTip"),
  resultsGrowthList: document.getElementById("resultsGrowthList"),
  resultsPriorityList: document.getElementById("resultsPriorityList"),
  progressGrowthList: document.getElementById("progressGrowthList"),
  progressPriorityList: document.getElementById("progressPriorityList"),
  tableGrid: document.getElementById("tableGrid"),
  recordsModeSelect: document.getElementById("recordsModeSelect"),
  personalBestsList: document.getElementById("personalBestsList"),
  recentWorkoutsList: document.getElementById("recentWorkoutsList"),
  attemptBadge: document.getElementById("attemptBadge"),
  accuracyBadge: document.getElementById("accuracyBadge"),
  attemptProgressLabel: document.getElementById("attemptProgressLabel"),
  accuracyProgressLabel: document.getElementById("accuracyProgressLabel"),
  endWorkoutDialog: document.getElementById("endWorkoutDialog"),
  endWorkoutCloseButton: document.getElementById("endWorkoutCloseButton"),
  cancelEndWorkoutButton: document.getElementById("cancelEndWorkoutButton"),
  confirmEndWorkoutButton: document.getElementById("confirmEndWorkoutButton"),
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
  progressSlideIndex: 0,
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
    sparStrikes: 0,
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
    totalMagnitudeCorrect: 0,
    totalSignCorrect: 0,
    totalSignErrors: 0,
    bestStreak: 0,
    sessionsCompleted: 0,
    bestAccuracy: 0,
    fastestAverageMs: null,
    facts: {},
    dailyRecords: {},
    workoutHistory: [],
  };
}

function defaultSettingsSnapshot() {
  return {
    operation: "multiplication",
    minFactor: 2,
    maxFactor: 12,
    questionStyle: "mixed",
    focusFactor: 7,
    adaptiveMode: true,
    negativesMode: false,
    sessionType: "question-goal",
    freeTrainingMode: "zen",
    sparTiming: "untimed",
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

function normaliseWorkoutRecord(record) {
  const modeKey =
    record?.modeKey === "timed" ||
    record?.modeKey === "question-goal" ||
    record?.modeKey === "zen" ||
    record?.modeKey === "spar"
      ? record.modeKey
      : "question-goal";

  return {
    id: String(record?.id || `${record?.recordedAt || Date.now()}`),
    modeKey,
    modeLabel: String(record?.modeLabel || ""),
    dateKey: String(record?.dateKey || getTodayDateKey()),
    recordedAt: clampNumber(Number(record?.recordedAt), 0, Number.MAX_SAFE_INTEGER, Date.now()),
    attempted: clampNumber(Number(record?.attempted), 0, 99999, 0),
    correct: clampNumber(Number(record?.correct), 0, 99999, 0),
    accuracy: clampNumber(Number(record?.accuracy), 0, 1, 0),
    skipped: clampNumber(Number(record?.skipped), 0, 99999, 0),
    bestStreak: clampNumber(Number(record?.bestStreak), 0, 99999, 0),
    averageMs:
      record?.averageMs === null || record?.averageMs === undefined
        ? null
        : clampNumber(Number(record.averageMs), 0, Number.MAX_SAFE_INTEGER, null),
    reason: String(record?.reason || "goal"),
    freeTrainingMode:
      record?.freeTrainingMode === "spar" || record?.freeTrainingMode === "zen"
        ? record.freeTrainingMode
        : "zen",
    sparTiming:
      record?.sparTiming === "timed" || record?.sparTiming === "untimed"
        ? record.sparTiming
        : "untimed",
    timeLimitMinutes: clampNumber(Number(record?.timeLimitMinutes), 0, 60, 0),
  };
}

function sanitiseSettingsSnapshot(settings) {
  const defaults = defaultSettingsSnapshot();
  const operation = OPERATION_CONFIG[settings?.operation] ? settings.operation : defaults.operation;
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
  const freeTrainingMode =
    settings?.freeTrainingMode === "spar" || settings?.freeTrainingMode === "zen"
      ? settings.freeTrainingMode
      : defaults.freeTrainingMode;
  const sparTiming =
    settings?.sparTiming === "timed" || settings?.sparTiming === "untimed"
      ? settings.sparTiming
      : defaults.sparTiming;
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
    operation,
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
    freeTrainingMode,
    sparTiming,
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
    const workoutHistory = Array.isArray(parsed.workoutHistory)
      ? parsed.workoutHistory.map(normaliseWorkoutRecord).slice(0, 50)
      : [];

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
      totalMagnitudeCorrect: clampNumber(
        Number(parsed.totalMagnitudeCorrect),
        0,
        999999,
        0,
      ),
      totalSignCorrect: clampNumber(Number(parsed.totalSignCorrect), 0, 999999, 0),
      totalSignErrors: clampNumber(Number(parsed.totalSignErrors), 0, 999999, 0),
      facts: parsed.facts || {},
      dailyRecords,
      workoutHistory,
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
  setCheckedValue("freeTrainingMode", snapshot.freeTrainingMode);
  setCheckedValue("sparTiming", snapshot.sparTiming);
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
    freeTrainingMode: getCheckedValue("freeTrainingMode"),
    sparTiming: getCheckedValue("sparTiming"),
    questionPreset: getCheckedValue("questionPreset"),
    questionTarget: Number(elements.questionCustom.value),
    timePreset: getCheckedValue("timePreset"),
    timeLimitMinutes: Number(elements.timeCustom.value),
  });
}

function isSparMode(settings) {
  return settings.sessionType === "endless" && settings.freeTrainingMode === "spar";
}

function usesSessionCountdown(settings) {
  return settings.sessionType === "timed" || (isSparMode(settings) && settings.sparTiming === "timed");
}

function toggleSetupFields() {
  const questionStyle = getCheckedValue("questionStyle");
  const sessionType = getCheckedValue("sessionType");
  const freeTrainingMode = getCheckedValue("freeTrainingMode");
  const sparTiming = getCheckedValue("sparTiming");
  const questionPreset = getCheckedValue("questionPreset");
  const timePreset = getCheckedValue("timePreset");

  elements.focusField.classList.toggle("is-hidden", questionStyle !== "focus");
  elements.freeTrainingField.classList.toggle("is-hidden", sessionType !== "endless");
  elements.sparTimingField.classList.toggle(
    "is-hidden",
    sessionType !== "endless" || freeTrainingMode !== "spar",
  );
  elements.timeField.classList.toggle(
    "is-hidden",
    !(sessionType === "timed" || (sessionType === "endless" && freeTrainingMode === "spar" && sparTiming === "timed")),
  );
  elements.questionTargetField.classList.toggle(
    "is-hidden",
    sessionType !== "question-goal",
  );
  elements.timeCustomField.classList.toggle(
    "is-hidden",
    !(sessionType === "timed" || (sessionType === "endless" && freeTrainingMode === "spar" && sparTiming === "timed")) ||
      timePreset !== "custom",
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
  const freeTrainingMode = getCheckedValue("freeTrainingMode");
  const sparTiming = getCheckedValue("sparTiming");
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

  if (sessionType === "timed" || (sessionType === "endless" && freeTrainingMode === "spar" && sparTiming === "timed")) {
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
    freeTrainingMode,
    sparTiming,
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
    ? `Isolation - x ${settings.focusFactor}`
    : "Full Circuit";
}

function getQuestionStylePreviewLabel(settings) {
  return settings.questionStyle === "focus"
    ? "Isolation - Keeps the workout focused on one table."
    : "Full Circuit - Mixes facts across your selected range.";
}

function getSessionTypeLabel(settings) {
  if (settings.sessionType === "timed") {
    return `High Intensity Training - ${formatMinutesLabel(settings.timeLimitMinutes)}`;
  }

  if (settings.sessionType === "question-goal") {
    return `Target Reps - ${settings.questionTarget} attempts`;
  }

  if (settings.freeTrainingMode === "spar") {
    return settings.sparTiming === "timed"
      ? `Spar Mode - 3 strikes in ${formatMinutesLabel(settings.timeLimitMinutes)}`
      : "Spar Mode - 3 mistake knockout";
  }

  return "Zen Mode - No rules";
}

function getSessionBadgeLabel(settings) {
  const styleLabel =
    settings.questionStyle === "focus"
      ? `Isolation x ${settings.focusFactor}`
      : "Full Circuit";

  if (settings.sessionType === "timed") {
    return `${styleLabel} - HIT ${settings.timeLimitMinutes}m`;
  }

  if (settings.sessionType === "question-goal") {
    return `${styleLabel} - ${settings.questionTarget} reps`;
  }

  if (settings.freeTrainingMode === "spar") {
    return settings.sparTiming === "timed"
      ? `${styleLabel} - Spar ${settings.timeLimitMinutes}m`
      : `${styleLabel} - Spar Mode`;
  }

  return `${styleLabel} - Zen Mode`;
}

function getSetupPreviewNote(settings) {
  if (settings.sessionType === "timed") {
    return `Push through a ${settings.timeLimitMinutes}-minute workout and see how many clean answers you can land.`;
  }

  if (settings.sessionType === "question-goal") {
    return `Answer ${settings.questionTarget} questions to finish the workout. Skipping doesn't count!`;
  }

  if (settings.freeTrainingMode === "spar") {
    return settings.sparTiming === "timed"
      ? `Stay in the round until three mistakes land or the timer runs out.`
      : "Three mistakes and the round is over.";
  }

  return "Train on your own terms. No pressure.";
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
  elements.setupPreviewStyle.textContent = getQuestionStylePreviewLabel(settings);
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

function getRotatingMessage(storageKey, messages) {
  try {
    const previousMessage = window.sessionStorage.getItem(storageKey);
    const choices = messages.filter((message) => message !== previousMessage);
    const pool = choices.length ? choices : messages;
    const message = pool[Math.floor(Math.random() * pool.length)];
    window.sessionStorage.setItem(storageKey, message);
    return message;
  } catch (error) {
    return messages[Math.floor(Math.random() * messages.length)];
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

function buildMultiplicationPool(settings) {
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

function buildPool(settings) {
  return OPERATION_CONFIG[settings.operation]?.buildPool(settings) || [];
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
    magnitudeCorrect: 0,
    signCorrect: 0,
    signErrors: 0,
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
  if (!state.session.attempted && !state.session.skipped) {
    return;
  }

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

  setRewardProgress(elements.attemptBadge, attemptedRatio);
  setRewardProgress(elements.accuracyBadge, correctRatio);

  elements.attemptProgressLabel.textContent = `${Math.min(todayRecord.attempted, DAILY_TARGET)} / 10`;
  elements.accuracyProgressLabel.textContent = `${Math.min(todayRecord.correct, DAILY_TARGET)} / 10`;

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

  if (usesSessionCountdown(state.settings)) {
    const remainingMs = Math.max(0, state.settings.timeLimitMinutes * 60000 - elapsedMs);
    elements.sessionTimer.textContent = formatStopwatch(remainingMs);
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
  } else if (isSparMode(settings)) {
    fillRatio = Math.min(state.session.sparStrikes / 3, 1);
    fillColor = "#c6452d";
    progressLabel = `${state.session.sparStrikes} / 3 strikes`;
  } else if (settings.sessionType === "timed") {
    const elapsedMs = getElapsedSessionMs();
    fillRatio = Math.min(elapsedMs / (settings.timeLimitMinutes * 60000), 1);
    fillColor = "#c6452d";
    progressLabel = `${formatStopwatch(
      Math.max(0, settings.timeLimitMinutes * 60000 - elapsedMs),
    )} left`;
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
  elements.skipButton.disabled = isSparMode(state.settings);
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

  if (usesSessionCountdown(state.settings) && sessionElapsedMs >= state.settings.timeLimitMinutes * 60000) {
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
  if (state.settings.sessionType === "question-goal") {
    return state.session.attempted >= state.settings.questionTarget;
  }

  if (isSparMode(state.settings)) {
    return state.session.sparStrikes >= 3;
  }

  return false;
}

function finishSessionProgress() {
  if (!state.session.attempted && !state.session.skipped) {
    return;
  }

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

function getWorkoutModeKey(settings) {
  if (settings.sessionType === "timed") {
    return "timed";
  }

  if (settings.sessionType === "question-goal") {
    return "question-goal";
  }

  return settings.freeTrainingMode === "spar" ? "spar" : "zen";
}

function getWorkoutModeLabelFromSettings(settings) {
  const modeKey = getWorkoutModeKey(settings);
  if (modeKey === "timed") {
    return "High Intensity Training";
  }
  if (modeKey === "question-goal") {
    return "Target Reps";
  }
  if (modeKey === "spar") {
    return settings.sparTiming === "timed" ? "Spar Mode (Timed)" : "Spar Mode";
  }
  return "Zen Mode";
}

function getWorkoutModeLabel(record) {
  if (record.modeLabel) {
    return record.modeLabel;
  }

  if (record.modeKey === "timed") {
    return "High Intensity Training";
  }
  if (record.modeKey === "question-goal") {
    return "Target Reps";
  }
  if (record.modeKey === "spar") {
    return record.sparTiming === "timed" ? "Spar Mode (Timed)" : "Spar Mode";
  }
  return "Zen Mode";
}

function appendWorkoutHistory(reason) {
  if (!state.session.attempted && !state.session.skipped) {
    return;
  }

  const averageMs = average(state.session.responseTimes);
  const record = normaliseWorkoutRecord({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    modeKey: getWorkoutModeKey(state.settings),
    modeLabel: getWorkoutModeLabelFromSettings(state.settings),
    dateKey: getTodayDateKey(),
    recordedAt: Date.now(),
    attempted: state.session.attempted,
    correct: state.session.correct,
    accuracy: getAccuracy(state.session.correct, state.session.attempted),
    skipped: state.session.skipped,
    bestStreak: state.session.bestStreak,
    averageMs,
    reason,
    freeTrainingMode: state.settings.freeTrainingMode,
    sparTiming: state.settings.sparTiming,
    timeLimitMinutes: usesSessionCountdown(state.settings) ? state.settings.timeLimitMinutes : 0,
  });

  state.progress.workoutHistory = [record, ...state.progress.workoutHistory].slice(0, 50);
}

function updateFactProgress(question, isCorrect, responseTimeMs) {
  const existing = getFactProgress(question.key);
  const magnitudeCorrect =
    typeof isCorrect === "object" ? Boolean(isCorrect.magnitudeCorrect) : Boolean(isCorrect);
  const signCorrect =
    typeof isCorrect === "object" ? Boolean(isCorrect.signCorrect) : Boolean(isCorrect);
  const signError =
    typeof isCorrect === "object" ? Boolean(isCorrect.signError) : false;
  const fullyCorrect =
    typeof isCorrect === "object" ? Boolean(isCorrect.isCorrect) : Boolean(isCorrect);
  const updated = {
    ...existing,
    attempts: existing.attempts + 1,
    correct: existing.correct + (fullyCorrect ? 1 : 0),
    magnitudeCorrect: existing.magnitudeCorrect + (magnitudeCorrect ? 1 : 0),
    signCorrect: existing.signCorrect + (signCorrect ? 1 : 0),
    signErrors: existing.signErrors + (signError ? 1 : 0),
    misses: existing.misses + (fullyCorrect ? 0 : 1),
    currentStreak: fullyCorrect ? existing.currentStreak + 1 : 0,
    bestStreak: fullyCorrect
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

function registerRecentAnswer(answerValue, evaluation, skipped, responseTimeMs) {
  state.session.recent.unshift({
    key: state.currentQuestion.key,
    equation: `${state.currentQuestion.left} x ${state.currentQuestion.right}`,
    answer: state.currentQuestion.answer,
    provided: answerValue,
    isCorrect: Boolean(evaluation?.isCorrect),
    signError: Boolean(evaluation?.signError),
    skipped,
    responseTimeMs,
  });
  state.session.recent = state.session.recent.slice(0, 8);
}

function registerAnswer(evaluation, answerValue, options = {}) {
  const skipped = Boolean(options.skipped);
  const responseTimeMs = skipped ? null : window.performance.now() - state.questionStartedAt;
  const sparMode = isSparMode(state.settings);

  if (skipped) {
    state.session.skipped += 1;
    state.session.streak = 0;
    if (sparMode) {
      state.session.sparStrikes += 1;
    }
    registerRecentAnswer("Skipped", null, true, null);
  } else {
    const isCorrect = Boolean(evaluation.isCorrect);
    state.session.attempted += 1;
    state.session.correct += isCorrect ? 1 : 0;
    state.session.streak = isCorrect ? state.session.streak + 1 : 0;
    state.session.bestStreak = Math.max(state.session.bestStreak, state.session.streak);
    state.session.responseTimes.push(responseTimeMs);
    state.progress.totalAttempted += 1;
    state.progress.totalCorrect += isCorrect ? 1 : 0;
    state.progress.totalMagnitudeCorrect += evaluation.magnitudeCorrect ? 1 : 0;
    state.progress.totalSignCorrect += evaluation.signCorrect ? 1 : 0;
    state.progress.totalSignErrors += evaluation.signError ? 1 : 0;
    if (sparMode && !isCorrect) {
      state.session.sparStrikes += 1;
    }
    updateDailyRecordForAttempt(isCorrect);
    updateFactProgress(state.currentQuestion, evaluation, responseTimeMs);
    registerRecentAnswer(answerValue, evaluation, false, responseTimeMs);
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
      completeSession(isSparMode(state.settings) ? "knockout" : "goal");
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
  const expectedValue = state.currentQuestion.answer;
  const magnitudeCorrect = Math.abs(numericValue) === Math.abs(expectedValue);
  const signCorrect =
    magnitudeCorrect && (numericValue === expectedValue || Math.sign(numericValue) === Math.sign(expectedValue));
  const evaluation = {
    isCorrect: numericValue === expectedValue,
    magnitudeCorrect,
    signCorrect,
    signError: magnitudeCorrect && numericValue !== expectedValue,
  };

  registerAnswer(evaluation, numericValue);
  setFeedback(evaluation.isCorrect ? "Right" : "Wrong", evaluation.isCorrect ? "success" : "error");
  queueNextQuestion(evaluation.isCorrect ? 320 : 520);
}

function handleSkip() {
  if (!state.active || state.countingDown || !state.currentQuestion) {
    return;
  }

  registerAnswer(null, "Skipped", { skipped: true });
  setFeedback("Skipped", "error");
  queueNextQuestion(420);
}

function getTodayRewardSummary() {
  const todayRecord = getDailyRecord();
  const attemptedRemaining = Math.max(0, DAILY_TARGET - todayRecord.attempted);
  const correctRemaining = Math.max(0, DAILY_TARGET - todayRecord.correct);

  if (todayRecord.attemptGoalEarned && todayRecord.accuracyGoalEarned) {
    return "Both goals locked in today.";
  }

  if (todayRecord.attemptGoalEarned) {
    return `${correctRemaining} more correct to lock in both goals.`;
  }

  if (todayRecord.attempted > 0 || todayRecord.correct > 0) {
    return `${attemptedRemaining} more attempts to lock in today's first goal.`;
  }

  return "Every rep counts. Ready for another set?";
}

function renderResults(reason) {
  const accuracy = getAccuracy(state.session.correct, state.session.attempted);
  const averageMs = average(state.session.responseTimes);
  const latestRecord = state.progress.workoutHistory[0] || null;
  const previousModeRecords = latestRecord
    ? state.progress.workoutHistory
        .slice(1)
        .filter((record) => record.modeKey === latestRecord.modeKey)
        .sort((left, right) => compareWorkoutRecords(left, right, latestRecord.modeKey))
    : [];
  const improved =
    Boolean(latestRecord) &&
    previousModeRecords.length > 0 &&
    compareWorkoutRecords(latestRecord, previousModeRecords[0], latestRecord.modeKey) < 0;
  const strongPerformance =
    accuracy >= 0.9 ||
    (state.session.correct === state.session.attempted && state.session.attempted >= 8) ||
    state.session.bestStreak >= 10;

  let titleMessage = getRotatingMessage(
    `${RESULTS_MESSAGE_KEY_PREFIX}-completed`,
    RESULTS_TITLE_POOLS.completed,
  );
  let highlightTitle = false;

  if (improved) {
    titleMessage = getRotatingMessage(
      `${RESULTS_MESSAGE_KEY_PREFIX}-progress`,
      RESULTS_TITLE_POOLS.progress,
    );
    highlightTitle = true;
  } else if (strongPerformance) {
    titleMessage = getRotatingMessage(
      `${RESULTS_MESSAGE_KEY_PREFIX}-strong`,
      RESULTS_TITLE_POOLS.strong,
    );
    highlightTitle = true;
  }

  if (reason === "manual" && !improved && !strongPerformance) {
    titleMessage = "You still showed up today.";
  }

  elements.resultsTitle.textContent = titleMessage;
  elements.resultsTitle.classList.toggle("results-title-highlight", highlightTitle);

  elements.resultQuestions.textContent = `${state.session.attempted}`;
  elements.resultCorrect.textContent = `${state.session.correct}`;
  elements.resultAccuracy.textContent = formatPercent(accuracy);
  elements.resultPace.textContent = formatQuestionDuration(averageMs);
  elements.resultBestStreak.textContent = `${state.session.bestStreak}`;
  elements.resultSkipped.textContent = `${state.session.skipped}`;
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

  updateDailyRecordForSessionCompletion();
  finishSessionProgress();
  appendWorkoutHistory(reason);
  saveProgress();

  renderQuestionTimer("Done");
  renderSessionTimer();
  renderDailyProgress();
  renderOverall();
  renderFocusAreas();
  renderWorkoutHistory();
  renderCoachTip();
  renderTableRadar();
  renderCalendars();
  renderStreakPanel();
  renderResults(reason);
  state.resultsSlideIndex = 0;
  renderResultsCarousel();
  showView("results");
}

function handleFinishSession() {
  if (!state.active || state.countingDown) {
    return;
  }

  elements.endWorkoutDialog.showModal();
}

function renderOverall() {
  const accuracy = getAccuracy(state.progress.totalCorrect, state.progress.totalAttempted);
  const bestAttemptsInDay = Object.values(state.progress.dailyRecords).reduce(
    (best, record) => Math.max(best, normaliseDailyRecord(record).attempted),
    0,
  );
  elements.overallAnswered.textContent = `${state.progress.totalAttempted}`;
  elements.overallAccuracy.textContent = formatPercent(accuracy);
  elements.overallBestStreak.textContent = `${state.progress.bestStreak}`;
  elements.overallBestPace.textContent = formatQuestionDuration(state.progress.fastestAverageMs);
  elements.overallWorkoutCount.textContent = `${state.progress.sessionsCompleted}`;
  elements.overallBestDayAttempts.textContent = `${bestAttemptsInDay}`;
}

function getRecordsModeSortValue(record, modeKey) {
  if (modeKey === "timed") {
    return [record.correct, record.accuracy, record.attempted, -(record.averageMs ?? Number.MAX_SAFE_INTEGER)];
  }

  if (modeKey === "question-goal") {
    return [record.accuracy, -(record.averageMs ?? Number.MAX_SAFE_INTEGER), record.correct, record.bestStreak];
  }

  if (modeKey === "spar") {
    return [record.correct, record.attempted, record.accuracy, record.bestStreak];
  }

  return [record.correct, record.attempted, record.accuracy, record.bestStreak];
}

function compareWorkoutRecords(left, right, modeKey) {
  const leftValues = getRecordsModeSortValue(left, modeKey);
  const rightValues = getRecordsModeSortValue(right, modeKey);

  for (let index = 0; index < leftValues.length; index += 1) {
    if (leftValues[index] !== rightValues[index]) {
      return rightValues[index] - leftValues[index];
    }
  }

  return right.recordedAt - left.recordedAt;
}

function renderPersonalBests() {
  if (!elements.personalBestsList || !elements.recordsModeSelect) {
    return;
  }

  const selectedMode = elements.recordsModeSelect.value || "timed";
  const bests = state.progress.workoutHistory
    .filter((record) => record.modeKey === selectedMode)
    .sort((left, right) => compareWorkoutRecords(left, right, selectedMode))
    .slice(0, 3);

  if (!bests.length) {
    elements.personalBestsList.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">No records yet for this mode. Knock out a few workouts to set the board.</div>
      </div>
    `;
    return;
  }

  elements.personalBestsList.innerHTML = bests
    .map((record, index) => `
      <article class="focus-card record-card">
        <div class="focus-card-top">
          <div class="fact-name">#${index + 1} ${getWorkoutModeLabel(record)}</div>
          <div class="focus-chip">${record.correct} correct</div>
        </div>
        <div class="fact-meta">${record.attempted} attempts | ${formatPercent(record.accuracy)} accuracy</div>
        <div class="fact-meta">${record.averageMs === null ? "No pace yet" : `${formatQuestionDuration(record.averageMs)} avg pace`}</div>
      </article>
    `)
    .join("");
}

function renderRecentWorkouts() {
  if (!elements.recentWorkoutsList) {
    return;
  }

  const recent = state.progress.workoutHistory.slice(0, 5);

  if (!recent.length) {
    elements.recentWorkoutsList.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">Your latest workouts will appear here once you finish a few rounds.</div>
      </div>
    `;
    return;
  }

  elements.recentWorkoutsList.innerHTML = recent
    .map((record) => `
      <article class="focus-card record-card">
        <div class="focus-card-top">
          <div class="fact-name">${getWorkoutModeLabel(record)}</div>
          <div class="focus-chip subtle-chip">${record.dateKey}</div>
        </div>
        <div class="fact-meta">${record.correct} correct out of ${record.attempted} attempts</div>
        <div class="fact-meta">${formatPercent(record.accuracy)} accuracy${record.averageMs === null ? "" : ` | ${formatQuestionDuration(record.averageMs)} avg pace`}</div>
      </article>
    `)
    .join("");
}

function renderWorkoutHistory() {
  renderPersonalBests();
  renderRecentWorkouts();
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

function renderPriorityList(target, troubleFacts) {
  if (!target) {
    return;
  }

  if (!troubleFacts.length) {
    target.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">No priority targets yet. Your recent facts are holding together well.</div>
      </div>
    `;
    return;
  }

  target.innerHTML = troubleFacts
    .map((fact) => {
      const [a, b] = fact.key.split("x");

      return `
        <article class="focus-card">
          <div class="focus-card-top">
            <div class="fact-name">${a} x ${b}</div>
            <div class="focus-chip">Priority</div>
          </div>
          <div class="fact-meta">${fact.correct} / ${fact.attempts} correct</div>
          <div class="fact-meta">${Math.round(fact.mastery * 100)}% accuracy</div>
        </article>
      `;
    })
    .join("");
}

function parseEquationKey(equation) {
  const match = equation.match(/(-?\d+)\s*x\s*(-?\d+)/i);
  if (!match) {
    return null;
  }

  return createFact(Number(match[1]), Number(match[2])).key;
}

function getGrowthOpportunityItems(limit = 4) {
  return state.session.recent
    .filter((item) => !item.isCorrect)
    .map((item) => {
      const key = item.key || parseEquationKey(item.equation);
      const progress = key ? getFactProgress(key) : null;
      return {
        ...item,
        progress,
      };
    })
    .slice(0, limit);
}

function renderGrowthList(target, items) {
  if (!target) {
    return;
  }

  if (!items.length) {
    target.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">No recent growth opportunities from the last run. Nice work.</div>
      </div>
    `;
    return;
  }

  target.innerHTML = items
    .map((item) => {
      const summary = item.skipped
        ? "Skipped this round"
        : `You said ${item.provided}, answer ${item.answer}`;
      const history =
        item.progress && item.progress.attempts
          ? `${item.progress.correct} / ${item.progress.attempts} correct so far`
          : "Fresh fact";

      return `
        <article class="focus-card">
          <div class="focus-card-top">
            <div class="fact-name">${item.equation}</div>
            <div class="focus-chip subtle-chip">Recent</div>
          </div>
          <div class="fact-meta">${summary}</div>
          <div class="fact-meta">${history}</div>
        </article>
      `;
    })
    .join("");
}

function renderFocusAreas() {
  const troubleFacts = getTroubleFacts();
  const growthItems = getGrowthOpportunityItems();

  renderGrowthList(elements.resultsGrowthList, growthItems);
  renderGrowthList(elements.progressGrowthList, growthItems);
  renderPriorityList(elements.resultsPriorityList, troubleFacts);
  renderPriorityList(elements.progressPriorityList, troubleFacts);
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
    "<strong>Consistency wins.</strong> Lock in the star first, then chase the heart with cleaner answers.";
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
        <div class="fact-meta">The fact tracker fills in after you answer a few facts.</div>
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
        ? `${table.seenFacts}/${table.totalFacts} facts`
        : "Fresh range";

      return `
        <article class="table-card ${table.tone}">
          <div class="table-card-top">
            <div class="table-name">x ${table.factor}</div>
            <span class="table-pill ${table.tone}">${table.label}</span>
          </div>
          <div class="fact-meta table-card-middle">${detailLabel}</div>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill ${table.tone}" style="width: ${Math.round(table.accuracy * 100)}%"></div>
          </div>
          <div class="table-card-stats">
            <span>${accuracyLabel}</span>
          </div>
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
            ${record.attemptGoalEarned ? '<span class="day-attempt" aria-label="Heart earned"><svg viewBox="0 0 72 72" role="presentation"><path d="M36 57.024 14.448 35.472c-5.304-5.304-5.304-13.896 0-19.2 5.304-5.304 13.896-5.304 19.2 0L36 18.624l2.352-2.352c5.304-5.304 13.896-5.304 19.2 0 5.304 5.304 5.304 13.896 0 19.2Z"/></svg></span>' : ""}
            ${record.accuracyGoalEarned ? '<span class="day-accuracy" aria-label="Star earned"><svg viewBox="0 0 72 72" role="presentation"><path d="M36 8 44.552 25.33 63.678 28.108 49.839 41.6 53.106 60.648 36 51.652 18.894 60.648 22.161 41.6 8.322 28.108 27.448 25.33Z"/></svg></span>' : ""}
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

function getDisplayedMonthSummary() {
  ensureDisplayMonthKey();
  const displayMonthDate = createMonthDateFromKey(state.displayMonthKey);
  const monthKey = getMonthKey(displayMonthDate);

  return Object.entries(state.progress.dailyRecords).reduce(
    (summary, [dateKey, record]) => {
      if (getMonthKey(parseDateKey(dateKey)) !== monthKey) {
        return summary;
      }

      const normalised = normaliseDailyRecord(record);
      if (normalised.sessionsCompleted > 0) {
        summary.sessions += normalised.sessionsCompleted;
      }
      if (normalised.attemptGoalEarned) {
        summary.hearts += 1;
      }
      if (normalised.accuracyGoalEarned) {
        summary.stars += 1;
      }
      return summary;
    },
    {
      sessions: 0,
      hearts: 0,
      stars: 0,
    },
  );
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
  const monthSummary = getDisplayedMonthSummary();

  elements.currentPracticeStreak.textContent = `${streakSummary.current}`;
  elements.bestPracticeDayStreak.textContent = `${streakSummary.best}`;
  elements.resultsCurrentPracticeStreak.textContent = `${streakSummary.current}`;
  elements.resultsBestPracticeDayStreak.textContent = `${streakSummary.best}`;
  elements.progressMonthSessions.textContent = `${monthSummary.sessions}`;
  elements.progressMonthHearts.textContent = `${monthSummary.hearts}`;
  elements.progressMonthStars.textContent = `${monthSummary.stars}`;
  elements.resultsMonthSessions.textContent = `${monthSummary.sessions}`;
  elements.resultsMonthHearts.textContent = `${monthSummary.hearts}`;
  elements.resultsMonthStars.textContent = `${monthSummary.stars}`;
}

function renderResultsCarousel() {
  elements.resultsSlides.forEach((slide) => {
    slide.classList.toggle(
      "is-active",
      slide.dataset.resultsSlide === RESULTS_SLIDES[state.resultsSlideIndex],
    );
  });

  elements.resultsPrevButton.disabled = state.resultsSlideIndex === 0;
  elements.resultsNextButton.disabled =
    state.resultsSlideIndex === RESULTS_SLIDES.length - 1;
}

function shiftResultsCarousel(direction) {
  state.resultsSlideIndex = clampNumber(
    state.resultsSlideIndex + direction,
    0,
    RESULTS_SLIDES.length - 1,
    state.resultsSlideIndex,
  );
  renderResultsCarousel();
}

function renderProgressCarousel() {
  elements.progressSlides.forEach((slide) => {
    slide.classList.toggle(
      "is-active",
      slide.dataset.progressSlide === PROGRESS_SLIDES[state.progressSlideIndex],
    );
  });

  elements.progressPrevButton.disabled = state.progressSlideIndex === 0;
  elements.progressNextButton.disabled =
    state.progressSlideIndex === PROGRESS_SLIDES.length - 1;
}

function shiftProgressCarousel(direction) {
  state.progressSlideIndex = clampNumber(
    state.progressSlideIndex + direction,
    0,
    PROGRESS_SLIDES.length - 1,
    state.progressSlideIndex,
  );
  renderProgressCarousel();
}

function registerBackdropClose(dialog) {
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const isInside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!isInside) {
      dialog.close();
    }
  });
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
  renderFocusAreas();
  renderWorkoutHistory();
  renderCoachTip();
  renderTableRadar();
  renderCalendars();
  renderStreakPanel();
  renderProgressCarousel();
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
  renderFocusAreas();
  renderCoachTip();
  renderTableRadar();
  renderCalendars();
  renderStreakPanel();
  renderResultsCarousel();
  renderProgressCarousel();
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
  elements.optionsButton.addEventListener("click", () => {
    elements.optionsDialog.showModal();
  });
  elements.optionsCloseButton.addEventListener("click", () => {
    elements.optionsDialog.close();
  });
  elements.endWorkoutCloseButton.addEventListener("click", () => {
    elements.endWorkoutDialog.close();
  });
  elements.cancelEndWorkoutButton.addEventListener("click", () => {
    elements.endWorkoutDialog.close();
  });
  elements.confirmEndWorkoutButton.addEventListener("click", () => {
    elements.endWorkoutDialog.close();
    completeSession("manual");
  });
  registerBackdropClose(elements.optionsDialog);
  registerBackdropClose(elements.endWorkoutDialog);
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.recordsModeSelect.addEventListener("change", renderPersonalBests);
  elements.progressMonthPrevButton.addEventListener("click", () => shiftDisplayedMonth(-1));
  elements.progressMonthNextButton.addEventListener("click", () => shiftDisplayedMonth(1));
  elements.resultsMonthPrevButton.addEventListener("click", () => shiftDisplayedMonth(-1));
  elements.resultsMonthNextButton.addEventListener("click", () => shiftDisplayedMonth(1));
  elements.resultsPrevButton.addEventListener("click", () => shiftResultsCarousel(-1));
  elements.resultsNextButton.addEventListener("click", () => shiftResultsCarousel(1));
  elements.progressPrevButton.addEventListener("click", () => shiftProgressCarousel(-1));
  elements.progressNextButton.addEventListener("click", () => shiftProgressCarousel(1));

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
