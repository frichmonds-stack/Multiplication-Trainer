const STORAGE_KEY = "multiplication-trainer-progress-v2";
const HERO_MESSAGE_KEY = "multiplication-trainer-hero-message-v1";
const RESULTS_MESSAGE_KEY_PREFIX = "multiplication-trainer-results-message-v1";
const THEME_STORAGE_KEY = "multiplication-trainer-theme-v1";
const KEYPAD_PREFERENCE_STORAGE_KEY = "multiplication-trainer-keypad-preference-v1";
const APP_VERSION = "v0.7.2";
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
  "Strong habits are built on ordinary days.",
  "Hard work beats talent alone",
  "Productive struggle unleashes potential",
  "The weight gets lighter when the pattern gets familiar.",
  "Discipline turns effort into strength.",
  "When you build your mind, you don't have to use your muscles",
  "When the going gets tough, the tough get going.",
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
    "Fire.",
    "You were locked in.",
    "That effort showed.",
  ],
};

const OPERATION_CONFIG = {
  multiplication: {
    label: "Multiplication",
    symbol: "x",
    buildPool(settings) {
      return buildMultiplicationPool(settings);
    },
  },
  addition: {
    label: "Addition",
    symbol: "+",
    buildPool(settings) {
      return buildAdditionPool(settings);
    },
  },
};

const RESULTS_SLIDES = ["summary", "tracker", "focus"];
const PROGRESS_SLIDES = ["overview", "tracker", "facts", "focus", "records", "coach"];
const TECHNIQUE_TABLE = 10;
const TECHNIQUE_COMPLETION_GOAL = 5;
const TECHNIQUE_AUTO_ADVANCE_MS = 1000;
const TECHNIQUE_STEPS = [
  { id: "rule", label: "Idea #1" },
  { id: "switch", label: "Idea #2" },
  { id: "pattern", label: "Warm Up" },
  { id: "guided", label: "Assisted Reps" },
  { id: "quick-check", label: "Solo Reps" },
];
const THEME_OPTIONS = [
  { key: "original", label: "Original" },
  { key: "sunny-beach-day", label: "Sunny Beach Day" },
  { key: "jungle", label: "Jungle" },
  { key: "frozen", label: "Frozen" },
  { key: "aang", label: "Aang" },
];
const KEYPAD_PREFERENCE_OPTIONS = ["auto", "always-on", "always-off"];
const FACT_TRACKER_DETAIL_OPTIONS = {
  addition: [
    { key: "overall", label: "Overall" },
    { key: "with-regrouping", label: "With regrouping" },
    { key: "without-regrouping", label: "Without regrouping" },
  ],
  multiplication: [
    { key: "overall", label: "Overall" },
    { key: "positive", label: "Positive Integers" },
    { key: "all-integers", label: "All Integers" },
  ],
};
const MULTIPLICATION_SIGNED_TOTAL_FACTS = (TABLE_FACTORS.length - 1) * 4 + 3;

const OPERATION_OPTIONS = ["multiplication", "addition"];
const OPERATION_LABELS = {
  multiplication: "Multiplication",
  addition: "Addition",
};
const OPERATION_SYMBOLS = {
  multiplication: "x",
  addition: "+",
};
const BUCKET_STATUS_MIN_ATTEMPTS = 6;
const BUCKET_STATUS_STRONG_MIN_ATTEMPTS = 10;
const BUCKET_STATUS_BUILDING_MIN_ACCURACY = 0.7;
const BUCKET_STATUS_STRONG_MIN_ACCURACY = 0.9;
const BUCKET_TREND_WINDOW_DAYS = 7;
const BUCKET_TREND_MIN_TOTAL_ATTEMPTS = 6;
const BUCKET_TREND_MIN_RECENT_ATTEMPTS = 3;
const BUCKET_TREND_DELTA_THRESHOLD = 0.08;
const ROLLING_WINDOW_DAYS = 31;
const ADDITION_BUCKET_EXAMPLE_CAP = 5;
const ADDITION_BUCKET_EXAMPLE_DISPLAY_LIMIT = 5;
const PROGRESS_SAVE_DEBOUNCE_MS = 250;
const ADDITION_DIGIT_BUCKETS = {
  easy: [
    [1, 1],
  ],
  medium: [
    [1, 2],
    [2, 2],
  ],
  hard: [
    [1, 3],
    [2, 3],
    [3, 3],
  ],
};
const ADDITION_TRACKER_BUCKETS = [
  { key: "make-10", label: "Make 10 Facts" },
  { key: "1-1", label: "1-digit + 1-digit" },
  { key: "1-2", label: "1-digit + 2-digit" },
  { key: "2-2", label: "2-digit + 2-digit" },
  { key: "1-3", label: "3-digit + 1-digit" },
  { key: "2-3", label: "3-digit + 2-digit" },
  { key: "3-3", label: "3-digit + 3-digit" },
];
const ADDITION_TRACKER_BUCKET_KEYS = new Set(
  ADDITION_TRACKER_BUCKETS.map((bucket) => bucket.key),
);
const ADDITION_LESSONS = [
  {
    id: "make-10",
    title: "Make 10",
    description: "Spot number pairs that combine to 10 quickly.",
    status: "under-construction",
    selectable: true,
  },
  {
    id: "adding-by-1s",
    title: "Adding by 1s",
    description: "Multi-digit numbers plus 1s-only place value changes.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "adding-by-10s",
    title: "Adding by 10s",
    description: "Multi-digit numbers plus 10s-only place value changes.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "adding-by-100s",
    title: "Adding by 100s",
    description: "Multi-digit numbers plus 100s-only place value changes.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "adding-by-1000s",
    title: "Adding by 1000s",
    description: "Multi-digit numbers plus 1000s-only place value changes.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "counting-on-easy",
    title: "Counting On (Easy)",
    description: "Single + single facts with counting on strategies.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "counting-on-medium",
    title: "Counting On (Medium)",
    description: "Double + single combinations with counting on.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "bridging-10-easy",
    title: "Bridging to 10 (Easy)",
    description: "Single + single with a bridge-to-10 move first.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "bridging-10-medium",
    title: "Bridging to 10 (Medium)",
    description: "Double + single bridging to a clean group of 10.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "bridging-advanced",
    title: "Bridging Advanced",
    description: "Double + double facts, bridge to nearest 10 or 100.",
    status: "coming-soon",
    selectable: false,
  },
  {
    id: "bridging-expert",
    title: "Bridging Expert",
    description: "Triple mixes with multi-bridge choices and carry decisions.",
    status: "coming-soon",
    selectable: false,
  },
];

const WORKOUT_MODE_DEFINITIONS = {
  multiplication: [
    { key: "timed", label: "High Intensity Training" },
    { key: "question-goal", label: "Target Reps" },
    { key: "isolation", label: "Isolation Training" },
    { key: "zen", label: "Zen Mode" },
    { key: "spar", label: "Spar Mode" },
  ],
  addition: [
    { key: "timed", label: "High Intensity Training" },
    { key: "question-goal", label: "Target Reps" },
    { key: "zen", label: "Zen Mode" },
    { key: "spar", label: "Spar Mode" },
  ],
};

const elements = {
  screens: Array.from(document.querySelectorAll(".screen")),
  navButtons: Array.from(document.querySelectorAll(".nav-button")),
  viewButtons: Array.from(document.querySelectorAll("[data-view-target]")),
  optionsButton: document.getElementById("optionsButton"),
  optionsDialog: document.getElementById("optionsDialog"),
  optionsCloseButton: document.getElementById("optionsCloseButton"),
  appVersion: document.getElementById("appVersion"),
  heroMessage: document.getElementById("heroMessage"),
  setupOperationPanel: document.getElementById("setupOperationPanel"),
  operationChoiceGrid: document.getElementById("operationChoiceGrid"),
  setupStepShell: document.getElementById("setupStepShell"),
  operationInputs: Array.from(document.querySelectorAll('input[name="operation"]')),
  sessionTypeInputs: Array.from(document.querySelectorAll('input[name="sessionType"]')),
  additionDifficultyInputs: Array.from(document.querySelectorAll('input[name="additionDifficulty"]')),
  settingsForm: document.getElementById("settingsForm"),
  sessionTypeField: document.getElementById("sessionTypeField"),
  setupSettingsPanel: document.getElementById("setupSettingsPanel"),
  setupSettingsAwaiting: document.getElementById("setupSettingsAwaiting"),
  setupStartButton: document.getElementById("setupStartButton"),
  minFactor: document.getElementById("minFactor"),
  maxFactor: document.getElementById("maxFactor"),
  isolationField: document.getElementById("isolationField"),
  isolationSessionChoice: document.getElementById("isolationSessionChoice"),
  focusFactor: document.getElementById("focusFactor"),
  adaptiveMode: document.getElementById("adaptiveMode"),
  negativesMode: document.getElementById("negativesMode"),
  negativesToggleRow: document.getElementById("negativesToggleRow"),
  freeTrainingField: document.getElementById("freeTrainingField"),
  sparTimingField: document.getElementById("sparTimingField"),
  timeField: document.getElementById("timeField"),
  timeCustomField: document.getElementById("timeCustomField"),
  timeCustom: document.getElementById("timeCustom"),
  questionTargetField: document.getElementById("questionTargetField"),
  questionCustomField: document.getElementById("questionCustomField"),
  questionCustom: document.getElementById("questionCustom"),
  additionDifficultyField: document.getElementById("additionDifficultyField"),
  resetProgressButton: document.getElementById("resetProgressButton"),
  countdownNumber: document.getElementById("countdownNumber"),
  countdownCopy: document.getElementById("countdownCopy"),
  sessionBadge: document.getElementById("sessionBadge"),
  finishSessionButton: document.getElementById("finishSessionButton"),
  practicePanel: document.querySelector("#practiceScreen .practice-panel"),
  problemWrap: document.querySelector("#practiceScreen .problem-wrap"),
  progressTrack: document.querySelector("#practiceScreen .progress-track"),
  sparStrikeHud: document.getElementById("sparStrikeHud"),
  sparStrikeBoxes: Array.from(document.querySelectorAll("[data-spar-strike-box]")),
  questionTimer: document.getElementById("questionTimer"),
  sessionTimer: document.getElementById("sessionTimer"),
  practiceAttemptedCount: document.getElementById("practiceAttemptedCount"),
  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  comboIndicator: document.getElementById("comboIndicator"),
  problemText: document.getElementById("problemText"),
  answerForm: document.getElementById("answerForm"),
  answerInput: document.getElementById("answerInput"),
  checkButton: document.getElementById("checkButton"),
  skipButton: document.getElementById("skipButton"),
  practiceKeypad: document.getElementById("practiceKeypad"),
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
  overviewOperationFilter: document.getElementById("overviewOperationFilter"),
  focusOperationFilter: document.getElementById("focusOperationFilter"),
  coachOperationFilter: document.getElementById("coachOperationFilter"),
  factOperationFilter: document.getElementById("factOperationFilter"),
  factDetailFilter: document.getElementById("factDetailFilter"),
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
  resultsWinsList: document.getElementById("resultsWinsList"),
  resultsPriorityList: document.getElementById("resultsPriorityList"),
  progressGrowthList: document.getElementById("progressGrowthList"),
  progressWinsList: document.getElementById("progressWinsList"),
  progressPriorityList: document.getElementById("progressPriorityList"),
  tableGrid: document.getElementById("tableGrid"),
  factsSlideTitle: document.getElementById("factsSlideTitle"),
  recordsOperationSelect: document.getElementById("recordsOperationSelect"),
  recordsModeSelect: document.getElementById("recordsModeSelect"),
  personalBestsList: document.getElementById("personalBestsList"),
  recentWorkoutsList: document.getElementById("recentWorkoutsList"),
  techniqueScreenShell: document.getElementById("techniqueScreenShell"),
  attemptBadge: document.getElementById("attemptBadge"),
  accuracyBadge: document.getElementById("accuracyBadge"),
  attemptProgressLabel: document.getElementById("attemptProgressLabel"),
  accuracyProgressLabel: document.getElementById("accuracyProgressLabel"),
  endWorkoutDialog: document.getElementById("endWorkoutDialog"),
  cancelEndWorkoutButton: document.getElementById("cancelEndWorkoutButton"),
  confirmEndWorkoutButton: document.getElementById("confirmEndWorkoutButton"),
  exitTechniqueDialog: document.getElementById("exitTechniqueDialog"),
  cancelExitTechniqueButton: document.getElementById("cancelExitTechniqueButton"),
  confirmExitTechniqueButton: document.getElementById("confirmExitTechniqueButton"),
  themeSelect: document.getElementById("themeSelect"),
  keypadPreferenceSelect: document.getElementById("keypadPreferenceSelect"),
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
  questionPool: [],
  advanceTimeoutId: null,
  techniqueAdvanceTimeoutId: null,
  countdownTimeoutId: null,
  hudIntervalId: null,
  progressSaveTimeoutId: null,
  resultsSlideIndex: 0,
  progressSlideIndex: 0,
  displayMonthKey: "",
  useTouchKeypad: false,
  theme: loadTheme(),
  keypadPreference: loadKeypadPreference(),
  session: createEmptySession(),
  technique: createTechniqueState(),
  pendingTechniqueView: null,
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

function createTechniquePatternRows(table = TECHNIQUE_TABLE) {
  // Warm-up progression: first row anchored with solved examples, then gradually harder blanks.
  const blankAssignments = new Map([
    [1, null],
    [2, null],
    [3, "answer-stem"],
    [4, "factor"],
    [5, "answer-stem"],
    [6, "table"],
    [7, "factor"],
    [8, "answer-full"],
    [9, "answer-full"],
    [10, "answer-full"],
    [11, "factor"],
    [12, "answer-full"],
  ]);

  return TABLE_FACTORS.map((factor) => {
    const blank = blankAssignments.get(factor) || null;
    return {
      factor,
      blank,
      value: "",
      status: "idle",
      expected:
        blank === "answer-full"
          ? `${factor * table}`
          : blank === "answer-stem"
          ? `${factor}`
          : blank === "factor"
            ? `${factor}`
            : blank === "table"
              ? `${table}`
              : "",
    };
  });
}

function createTechniqueState(table = TECHNIQUE_TABLE, mode = "menu") {
  return {
    selectedOperation: "",
    selectedTable: table,
    additionLessonId: "",
    mode,
    stage: TECHNIQUE_STEPS[0].id,
    patternRows: createTechniquePatternRows(table),
    patternFeedback: { message: "", tone: "" },
    guidedQuestions: createGuidedTechniqueQuestions(table),
    guidedIndex: 0,
    guidedAnswer: "",
    guidedHintVisible: false,
    guidedFeedback: { message: "", tone: "" },
    guidedSolved: false,
    quickCheckCorrect: 0,
    quickCheckQuestion: createTechniqueQuestion(table),
    quickCheckAnswer: "",
    quickCheckHintVisible: false,
    quickCheckFeedback: { message: "", tone: "" },
    quickCheckSolved: false,
    quickCheckHintOffered: false,
    practiceQuestion: createTechniqueQuestion(table),
    practiceAnswer: "",
    practiceHintVisible: false,
    practiceFeedback: { message: "", tone: "" },
    practiceSolved: false,
    focusFieldName: "",
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
    bucketDaily: {},
    additionBucketExamples: {},
    workoutHistory: [],
    techniques: {},
  };
}

function defaultSettingsSnapshot() {
  return {
    operation: "multiplication",
    minFactor: 2,
    maxFactor: 12,
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
    additionDifficulty: "easy",
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
  const operation = OPERATION_OPTIONS.includes(record?.operation)
    ? record.operation
    : "multiplication";
  const modeKey =
    record?.modeKey === "timed" ||
    record?.modeKey === "question-goal" ||
    record?.modeKey === "isolation" ||
    record?.modeKey === "zen" ||
    record?.modeKey === "spar"
      ? record.modeKey
      : "question-goal";

  return {
    id: String(record?.id || `${record?.recordedAt || Date.now()}`),
    operation,
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
    focusFactor: clampNumber(Number(record?.focusFactor), 1, FACTOR_LIMIT, 7),
    minFactor: Math.min(
      clampNumber(Number(record?.minFactor), 1, FACTOR_LIMIT, 2),
      clampNumber(Number(record?.maxFactor), 1, FACTOR_LIMIT, FACTOR_LIMIT),
    ),
    maxFactor: Math.max(
      clampNumber(Number(record?.minFactor), 1, FACTOR_LIMIT, 2),
      clampNumber(Number(record?.maxFactor), 1, FACTOR_LIMIT, FACTOR_LIMIT),
    ),
    additionDifficulty:
      record?.additionDifficulty === "easy" ||
      record?.additionDifficulty === "medium" ||
      record?.additionDifficulty === "hard"
        ? record.additionDifficulty
        : "easy",
  };
}

function normaliseBucketDailyEntry(entry) {
  const attempted = clampNumber(Number(entry?.attempted), 0, 9999, 0);
  const correct = clampNumber(Number(entry?.correct), 0, attempted, 0);
  return {
    attempted,
    correct,
  };
}

function normaliseAdditionBucketExampleEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const parsed = parseFactKey(String(entry.factKey || ""));
  const leftValue = Number(entry.left);
  const rightValue = Number(entry.right);
  const left = Number.isFinite(leftValue)
    ? Math.trunc(leftValue)
    : parsed.operation === "addition"
      ? parsed.left
      : NaN;
  const right = Number.isFinite(rightValue)
    ? Math.trunc(rightValue)
    : parsed.operation === "addition"
      ? parsed.right
      : NaN;

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return null;
  }

  const low = Math.min(left, right);
  const high = Math.max(left, right);
  const factKey = `addition:${low}+${high}`;
  const attempts = clampNumber(Number(entry.attempts), 0, 9999, 0);
  const correct = clampNumber(Number(entry.correct), 0, attempts, 0);
  const regrouping =
    typeof entry.regrouping === "boolean"
      ? entry.regrouping
      : hasAdditionRegrouping(low, high);

  return {
    factKey,
    left: low,
    right: high,
    regrouping,
    attempts,
    correct,
    lastSeenAt: clampNumber(Number(entry.lastSeenAt), 0, Number.MAX_SAFE_INTEGER, 0),
  };
}

function normaliseAdditionBucketExamples(examplesByBucket) {
  const source = examplesByBucket && typeof examplesByBucket === "object" ? examplesByBucket : {};
  const normalised = {};

  ADDITION_TRACKER_BUCKETS.forEach((bucket) => {
    const entries = Array.isArray(source[bucket.key]) ? source[bucket.key] : [];
    const mergedByFact = new Map();

    entries.forEach((entry) => {
      const clean = normaliseAdditionBucketExampleEntry(entry);
      if (!clean) {
        return;
      }

      const existing = mergedByFact.get(clean.factKey);
      if (existing) {
        const mergedAttempts = clampNumber(existing.attempts + clean.attempts, 0, 9999, 0);
        const mergedCorrect = clampNumber(existing.correct + clean.correct, 0, mergedAttempts, 0);
        mergedByFact.set(clean.factKey, {
          ...existing,
          attempts: mergedAttempts,
          correct: mergedCorrect,
          lastSeenAt: Math.max(existing.lastSeenAt, clean.lastSeenAt),
          regrouping: clean.regrouping,
        });
        return;
      }

      mergedByFact.set(clean.factKey, clean);
    });

    normalised[bucket.key] = Array.from(mergedByFact.values())
      .sort((left, right) => right.lastSeenAt - left.lastSeenAt)
      .slice(0, ADDITION_BUCKET_EXAMPLE_CAP);
  });

  return normalised;
}

function sanitiseSettingsSnapshot(settings) {
  const defaults = defaultSettingsSnapshot();
  const operation = OPERATION_CONFIG[settings?.operation] ? settings.operation : defaults.operation;
  const additionDifficulty =
    settings?.additionDifficulty === "easy" ||
    settings?.additionDifficulty === "medium" ||
    settings?.additionDifficulty === "hard"
      ? settings.additionDifficulty
      : defaults.additionDifficulty;
  const legacyIsolationMode = settings?.questionStyle === "focus" || settings?.mode === "focus";
  const hasLegacyQuestionStyle = typeof settings?.questionStyle === "string";
  const legacySessionLength = Number(settings?.sessionLength);
  let sessionType = defaults.sessionType;
  if (
    settings?.sessionType === "timed" ||
    settings?.sessionType === "question-goal" ||
    settings?.sessionType === "endless" ||
    settings?.sessionType === "isolation"
  ) {
    sessionType = settings.sessionType;
  } else if (legacySessionLength === 0) {
    sessionType = "endless";
  }
  if (hasLegacyQuestionStyle && legacyIsolationMode) {
    sessionType = "isolation";
  }
  if (operation === "addition" && sessionType === "isolation") {
    sessionType = "question-goal";
  }
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
  const minFactorNormalised = Math.min(rawMinFactor, rawMaxFactor);
  const maxFactorNormalised = Math.max(rawMinFactor, rawMaxFactor);
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
  const useIsolationControls = operation === "multiplication" && sessionType === "isolation";
  const minFactor = useIsolationControls ? minFactorNormalised : defaults.minFactor;
  const maxFactor = useIsolationControls ? maxFactorNormalised : defaults.maxFactor;

  return {
    operation,
    minFactor,
    maxFactor,
    focusFactor,
    adaptiveMode:
      typeof settings?.adaptiveMode === "boolean"
        ? settings.adaptiveMode
        : defaults.adaptiveMode,
    negativesMode:
      operation === "addition"
        ? false
        : typeof settings?.negativesMode === "boolean"
        ? settings.negativesMode
        : defaults.negativesMode,
    sessionType,
    freeTrainingMode,
    sparTiming,
    questionPreset,
    questionTarget,
    timePreset,
    timeLimitMinutes,
    additionDifficulty,
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
    const bucketDaily = Object.fromEntries(
      Object.entries(parsed.bucketDaily || {}).map(([key, record]) => [
        key,
        normaliseBucketDailyEntry(record),
      ]),
    );
    const additionBucketExamples = normaliseAdditionBucketExamples(
      parsed.additionBucketExamples,
    );
    const workoutHistory = Array.isArray(parsed.workoutHistory)
      ? parsed.workoutHistory.map(normaliseWorkoutRecord).slice(0, 50)
      : [];
    const progress = {
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
      bucketDaily,
      additionBucketExamples,
      workoutHistory,
      techniques: parsed.techniques || {},
    };

    return pruneProgressForRollingWindow(progress);
  } catch (error) {
    return defaultProgress();
  }
}

function saveProgress() {
  try {
    window.clearTimeout(state.progressSaveTimeoutId);
    state.progressSaveTimeoutId = null;
    pruneProgressForRollingWindow(state.progress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (error) {
    // Ignore storage failures so the app still works in restricted contexts.
  }
}

function queueProgressSave() {
  window.clearTimeout(state.progressSaveTimeoutId);
  state.progressSaveTimeoutId = window.setTimeout(() => {
    state.progressSaveTimeoutId = null;
    saveProgress();
  }, PROGRESS_SAVE_DEBOUNCE_MS);
}

function sanitiseTheme(themeValue) {
  const value = String(themeValue || "");
  return THEME_OPTIONS.some((theme) => theme.key === value) ? value : "original";
}

function loadTheme() {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return sanitiseTheme(raw);
  } catch (error) {
    return "original";
  }
}

function saveTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, sanitiseTheme(theme));
  } catch (error) {
    // Ignore storage failures so the app still works in restricted contexts.
  }
}

function applyTheme(theme) {
  const nextTheme = sanitiseTheme(theme);
  state.theme = nextTheme;
  document.body.dataset.theme = nextTheme;
  if (elements.themeSelect) {
    elements.themeSelect.value = nextTheme;
  }
}

function sanitiseKeypadPreference(value) {
  const key = String(value || "");
  return KEYPAD_PREFERENCE_OPTIONS.includes(key) ? key : "auto";
}

function loadKeypadPreference() {
  try {
    const raw = window.localStorage.getItem(KEYPAD_PREFERENCE_STORAGE_KEY);
    return sanitiseKeypadPreference(raw);
  } catch (error) {
    return "auto";
  }
}

function saveKeypadPreference(value) {
  try {
    window.localStorage.setItem(
      KEYPAD_PREFERENCE_STORAGE_KEY,
      sanitiseKeypadPreference(value),
    );
  } catch (error) {
    // Ignore storage failures so the app still works in restricted contexts.
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

function isDateKey(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function getRollingWindowCutoffDateKey(days = ROLLING_WINDOW_DAYS) {
  return shiftDateKey(getTodayDateKey(), -days);
}

function pruneProgressForRollingWindow(progress) {
  if (!progress || typeof progress !== "object") {
    return progress;
  }

  const cutoffDateKey = getRollingWindowCutoffDateKey();
  progress.dailyRecords = Object.fromEntries(
    Object.entries(progress.dailyRecords || {}).filter(([dateKey]) =>
      isDateKey(dateKey) ? dateKey >= cutoffDateKey : false,
    ),
  );
  progress.bucketDaily = Object.fromEntries(
    Object.entries(progress.bucketDaily || {}).filter(([storageKey]) => {
      const { dateKey } = parseBucketDailyKey(storageKey);
      return isDateKey(dateKey) ? dateKey >= cutoffDateKey : false;
    }),
  );
  progress.workoutHistory = (Array.isArray(progress.workoutHistory) ? progress.workoutHistory : [])
    .filter((record) => {
      if (isDateKey(record?.dateKey)) {
        return record.dateKey >= cutoffDateKey;
      }
      if (Number.isFinite(Number(record?.recordedAt))) {
        return formatDateKey(new Date(Number(record.recordedAt))) >= cutoffDateKey;
      }
      return true;
    })
    .slice(0, 50);

  return progress;
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

function formatRecordDateLabel(record) {
  const hasDateKey =
    typeof record?.dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(record.dateKey);
  const sourceDate = hasDateKey
    ? parseDateKey(record.dateKey)
    : Number.isFinite(Number(record?.recordedAt))
      ? new Date(Number(record.recordedAt))
      : null;

  if (!sourceDate || Number.isNaN(sourceDate.getTime())) {
    return String(record?.dateKey || "");
  }

  return sourceDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
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

function getSelectedOperationValue() {
  const value = getCheckedValue("operation");
  return OPERATION_CONFIG[value] ? value : "";
}

function getSelectedOperation() {
  return getSelectedOperationValue() || "multiplication";
}

function hasSelectedSessionType() {
  const sessionType = getCheckedValue("sessionType");
  return (
    sessionType === "timed" ||
    sessionType === "question-goal" ||
    sessionType === "endless" ||
    sessionType === "isolation"
  );
}

function hasSelectedAdditionDifficulty() {
  const difficulty = getCheckedValue("additionDifficulty");
  return difficulty === "easy" || difficulty === "medium" || difficulty === "hard";
}

function clearSetupFlowSelections() {
  const defaults = defaultSettingsSnapshot();
  applySettingsSnapshot(defaults);
  setCheckedValue("operation", "");
  setCheckedValue("sessionType", "");
  setCheckedValue("additionDifficulty", "");
}

function resetSetupForNextWorkout() {
  clearSetupFlowSelections();
  toggleSetupFields();
}

function getOperationLabel(operation) {
  return OPERATION_LABELS[operation] || OPERATION_LABELS.multiplication;
}

function getOperationSymbol(operation) {
  return OPERATION_SYMBOLS[operation] || OPERATION_SYMBOLS.multiplication;
}

function applySettingsSnapshot(settings) {
  const snapshot = sanitiseSettingsSnapshot(settings);
  setCheckedValue("operation", snapshot.operation);
  elements.minFactor.value = `${snapshot.minFactor}`;
  elements.maxFactor.value = `${snapshot.maxFactor}`;
  elements.focusFactor.value = `${snapshot.focusFactor}`;
  elements.adaptiveMode.checked = snapshot.adaptiveMode;
  elements.negativesMode.checked = snapshot.negativesMode;
  elements.questionCustom.value = `${snapshot.questionTarget}`;
  elements.timeCustom.value = `${snapshot.timeLimitMinutes}`;
  setCheckedValue("additionDifficulty", snapshot.additionDifficulty);
  setCheckedValue("sessionType", snapshot.sessionType);
  setCheckedValue("freeTrainingMode", snapshot.freeTrainingMode);
  setCheckedValue("sparTiming", snapshot.sparTiming);
  setCheckedValue("questionPreset", snapshot.questionPreset);
  setCheckedValue("timePreset", snapshot.timePreset);
  syncIsolationRangeControls();
}

function getFormSettingsSnapshot() {
  return sanitiseSettingsSnapshot({
    operation: getCheckedValue("operation"),
    minFactor: Number(elements.minFactor.value),
    maxFactor: Number(elements.maxFactor.value),
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
    additionDifficulty: getCheckedValue("additionDifficulty"),
  });
}

function isSparMode(settings) {
  return settings.sessionType === "endless" && settings.freeTrainingMode === "spar";
}

function usesSessionCountdown(settings) {
  return settings.sessionType === "timed" || (isSparMode(settings) && settings.sparTiming === "timed");
}

function syncIsolationRangeControls(changedField = "") {
  const minFactor = clampNumber(
    Number(elements.minFactor.value),
    1,
    FACTOR_LIMIT,
    defaultSettingsSnapshot().minFactor,
  );
  const maxFactor = clampNumber(
    Number(elements.maxFactor.value),
    1,
    FACTOR_LIMIT,
    defaultSettingsSnapshot().maxFactor,
  );
  let nextMin = minFactor;
  let nextMax = maxFactor;

  if (nextMin > nextMax) {
    if (changedField === "min") {
      nextMax = nextMin;
    } else {
      nextMin = nextMax;
    }
  }

  elements.minFactor.value = `${nextMin}`;
  elements.maxFactor.value = `${nextMax}`;

  Array.from(elements.minFactor.options).forEach((option) => {
    option.disabled = Number(option.value) > nextMax;
  });
  Array.from(elements.maxFactor.options).forEach((option) => {
    option.disabled = Number(option.value) < nextMin;
  });
}

function toggleSetupFields() {
  const operation = getSelectedOperationValue();
  const hasOperation = Boolean(operation);
  let sessionType = getCheckedValue("sessionType");
  const freeTrainingMode = getCheckedValue("freeTrainingMode");
  const sparTiming = getCheckedValue("sparTiming");
  const questionPreset = getCheckedValue("questionPreset");
  const timePreset = getCheckedValue("timePreset");
  const defaults = defaultSettingsSnapshot();
  const additionMode = operation === "addition";
  const difficultySelected = hasSelectedAdditionDifficulty();
  const showDifficultyStep = additionMode && hasOperation;
  const showWorkoutTypeStep = hasOperation && (!additionMode || difficultySelected);
  const supportsIsolation = operation === "multiplication";

  if (!hasOperation) {
    setCheckedValue("sessionType", "");
    setCheckedValue("additionDifficulty", "");
    sessionType = "";
  }

  if (additionMode && !difficultySelected && sessionType) {
    setCheckedValue("sessionType", "");
    sessionType = "";
  }

  if (!supportsIsolation && sessionType === "isolation") {
    setCheckedValue("sessionType", "");
    sessionType = "";
  }

  const hasSessionType = hasSelectedSessionType() && showWorkoutTypeStep;
  const showAdvancedSettings = hasOperation && hasSessionType;
  const isolationMode = supportsIsolation && sessionType === "isolation";
  const questionGoalMode = sessionType === "question-goal" || isolationMode;
  const countdownMode =
    sessionType === "timed" ||
    (sessionType === "endless" && freeTrainingMode === "spar" && sparTiming === "timed");

  if (elements.setupOperationPanel) {
    elements.setupOperationPanel.classList.toggle("has-operation-selection", hasOperation);
  }
  if (elements.operationChoiceGrid) {
    elements.operationChoiceGrid.classList.toggle("is-pruned-view", hasOperation);
  }
  elements.operationInputs.forEach((input) => {
    const option = input.closest(".operation-choice");
    if (!option) {
      return;
    }
    option.classList.toggle("is-pruned", hasOperation && !input.checked);
  });

  if (elements.additionDifficultyField) {
    elements.additionDifficultyField.classList.toggle("is-hidden", !showDifficultyStep);
  }
  elements.additionDifficultyInputs.forEach((input) => {
    input.disabled = !showDifficultyStep;
  });

  if (elements.sessionTypeField) {
    elements.sessionTypeField.classList.toggle("is-hidden", !showWorkoutTypeStep);
  }

  if (!isolationMode) {
    elements.minFactor.value = `${defaults.minFactor}`;
    elements.maxFactor.value = `${defaults.maxFactor}`;
  }

  syncIsolationRangeControls();
  if (elements.isolationSessionChoice) {
    elements.isolationSessionChoice.classList.toggle("is-hidden", !supportsIsolation);
    const isolationInput = elements.isolationSessionChoice.querySelector('input[name="sessionType"]');
    if (isolationInput instanceof HTMLInputElement) {
      isolationInput.disabled = !supportsIsolation || !showWorkoutTypeStep;
    }
  }
  elements.sessionTypeInputs.forEach((input) => {
    if (input.value === "isolation") {
      return;
    }
    input.disabled = !showWorkoutTypeStep;
  });

  if (elements.setupSettingsPanel) {
    elements.setupSettingsPanel.classList.toggle("is-ready", showAdvancedSettings);
  }
  if (elements.setupSettingsAwaiting) {
    elements.setupSettingsAwaiting.classList.toggle("is-hidden", showAdvancedSettings);
  }
  if (elements.settingsForm) {
    elements.settingsForm.classList.toggle("is-hidden", !showAdvancedSettings);
  }
  if (elements.setupStartButton) {
    elements.setupStartButton.disabled = !showAdvancedSettings;
  }

  elements.isolationField.classList.toggle("is-hidden", !showAdvancedSettings || !isolationMode);
  elements.focusFactor.disabled = !showAdvancedSettings || !isolationMode;
  elements.minFactor.disabled = !showAdvancedSettings || !isolationMode;
  elements.maxFactor.disabled = !showAdvancedSettings || !isolationMode;

  if (elements.negativesToggleRow) {
    elements.negativesToggleRow.classList.toggle("is-hidden", additionMode || !showAdvancedSettings);
  }
  elements.negativesMode.disabled = additionMode || !showAdvancedSettings;
  if (additionMode || !showAdvancedSettings) {
    elements.negativesMode.checked = false;
  }
  if (elements.countdownCopy) {
    elements.countdownCopy.textContent = operation === "addition"
      ? "Type the answer to each addition fact."
      : "Type the answer to the times tables.";
  }

  elements.freeTrainingField.classList.toggle(
    "is-hidden",
    !showAdvancedSettings || sessionType !== "endless",
  );
  elements.sparTimingField.classList.toggle(
    "is-hidden",
    !showAdvancedSettings || sessionType !== "endless" || freeTrainingMode !== "spar",
  );
  elements.timeField.classList.toggle("is-hidden", !showAdvancedSettings || !countdownMode);
  elements.questionTargetField.classList.toggle(
    "is-hidden",
    !showAdvancedSettings || !questionGoalMode,
  );
  elements.timeCustomField.classList.toggle(
    "is-hidden",
    !showAdvancedSettings || !countdownMode || timePreset !== "custom",
  );
  elements.questionCustomField.classList.toggle(
    "is-hidden",
    !showAdvancedSettings || !questionGoalMode || questionPreset !== "custom",
  );
}

function readSettings() {
  const operation = getSelectedOperationValue();
  const sessionType = getCheckedValue("sessionType");
  const freeTrainingMode = getCheckedValue("freeTrainingMode");
  const sparTiming = getCheckedValue("sparTiming");
  const questionPreset = getCheckedValue("questionPreset");
  const timePreset = getCheckedValue("timePreset");
  const additionDifficulty = getCheckedValue("additionDifficulty");

  if (!operation) {
    return { error: "Choose an operation before starting." };
  }

  if (operation === "addition" && !hasSelectedAdditionDifficulty()) {
    return { error: "Choose an addition difficulty before selecting the workout type." };
  }

  if (
    sessionType !== "timed" &&
    sessionType !== "question-goal" &&
    sessionType !== "endless" &&
    sessionType !== "isolation"
  ) {
    return { error: "Choose a workout type before starting." };
  }

  const adaptiveMode = elements.adaptiveMode.checked;
  const negativesMode = operation === "addition" ? false : elements.negativesMode.checked;
  const isolationMode = operation === "multiplication" && sessionType === "isolation";

  syncIsolationRangeControls();
  const minFactor = Number(elements.minFactor.value);
  const maxFactor = Number(elements.maxFactor.value);
  const focusFactor = Number(elements.focusFactor.value);

  if (isolationMode) {
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
      return { error: "Choose a valid isolation range between 1 and 12." };
    }
  }

  const questionTarget =
    questionPreset === "custom"
      ? Number(elements.questionCustom.value)
      : Number(questionPreset);
  const timeLimitMinutes =
    timePreset === "custom" ? Number(elements.timeCustom.value) : Number(timePreset);

  if (sessionType === "question-goal" || sessionType === "isolation") {
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
    operation,
    minFactor,
    maxFactor,
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
    additionDifficulty,
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
  if (settings.operation === "addition") {
    return `Addition (${settings.additionDifficulty})`;
  }

  return settings.sessionType === "isolation"
    ? `Isolation x ${settings.focusFactor} (${settings.minFactor}-${settings.maxFactor})`
    : "Full Circuit";
}

function getQuestionStylePreviewLabel(settings) {
  if (settings.operation === "addition") {
    return `Addition drill with ${settings.additionDifficulty} number ranges.`;
  }

  return settings.sessionType === "isolation"
    ? `Isolation drill for x ${settings.focusFactor}, paired with factors ${settings.minFactor} through ${settings.maxFactor}.`
    : "Full Circuit - Mixes facts across the standard workout range.";
}

function getSessionTypeLabel(settings) {
  const operationLabel = getOperationLabel(settings.operation);

  if (settings.sessionType === "timed") {
    return `${operationLabel} High Intensity Training - ${formatMinutesLabel(settings.timeLimitMinutes)}`;
  }

  if (settings.sessionType === "question-goal") {
    return `${operationLabel} Target Reps - ${settings.questionTarget} attempts`;
  }

  if (settings.sessionType === "isolation") {
    return `Isolation Training - x ${settings.focusFactor} for ${settings.questionTarget} reps`;
  }

  if (settings.freeTrainingMode === "spar") {
    return settings.sparTiming === "timed"
      ? `${operationLabel} Spar Mode - 3 strikes in ${formatMinutesLabel(settings.timeLimitMinutes)}`
      : `${operationLabel} Spar Mode - 3 mistake knockout`;
  }

  return `${operationLabel} Zen Mode - No rules`;
}

function getSessionBadgeLabel(settings) {
  const styleLabel = getQuestionStyleLabel(settings).replace(/\s\(\d+-\d+\)$/, "");

  if (settings.sessionType === "timed") {
    return `${styleLabel} - HIT ${settings.timeLimitMinutes}m`;
  }

  if (settings.sessionType === "question-goal") {
    return `${styleLabel} - ${settings.questionTarget} reps`;
  }

  if (settings.sessionType === "isolation") {
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
  if (settings.operation === "addition") {
    if (settings.sessionType === "timed") {
      return `Push through a ${settings.timeLimitMinutes}-minute addition workout and keep your streak alive.`;
    }

    if (settings.sessionType === "question-goal") {
      return `Answer ${settings.questionTarget} addition facts. Difficulty is set to ${settings.additionDifficulty}.`;
    }

    if (settings.freeTrainingMode === "spar") {
      return settings.sparTiming === "timed"
        ? "Stay in the spar round until three misses or the timer expires."
        : "Three misses ends the round.";
    }

    return "Free training for addition facts with no finish line.";
  }

  if (settings.sessionType === "timed") {
    return `Push through a ${settings.timeLimitMinutes}-minute workout and see how many clean answers you can land.`;
  }

  if (settings.sessionType === "question-goal") {
    return `Answer ${settings.questionTarget} questions to finish the workout. Skipping doesn't count!`;
  }

  if (settings.sessionType === "isolation") {
    return `Drill x ${settings.focusFactor} with factors ${settings.minFactor}-${settings.maxFactor} for ${settings.questionTarget} total reps.`;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTechniqueDigits(value, highlightFactor = false) {
  return String(value)
    .split("")
    .map((digit) => {
      if (digit === "0") {
        return '<span class="technique-zero">0</span>';
      }

      const safeDigit = escapeHtml(digit);
      return highlightFactor ? `<span class="technique-factor">${safeDigit}</span>` : safeDigit;
    })
    .join("");
}

function formatTechniqueNumber(value) {
  return formatTechniqueDigits(value, false);
}

function formatTechniqueFactorValue(value) {
  return formatTechniqueDigits(value, true);
}

function formatTechniqueCarryValue(value) {
  return value === TECHNIQUE_TABLE ? formatTechniqueNumber(value) : formatTechniqueFactorValue(value);
}

function getTechniqueCarryFactor(left, right) {
  if (left === TECHNIQUE_TABLE && right !== TECHNIQUE_TABLE) {
    return right;
  }

  if (right === TECHNIQUE_TABLE && left !== TECHNIQUE_TABLE) {
    return left;
  }

  return null;
}

function formatTechniqueAnswerValue(answer, carryFactor = null) {
  if (
    carryFactor !== null &&
    carryFactor !== TECHNIQUE_TABLE &&
    String(answer) === `${carryFactor}${TECHNIQUE_TABLE}`
  ) {
    return `${formatTechniqueFactorValue(carryFactor)}<span class="technique-zero">0</span>`;
  }

  return formatTechniqueNumber(answer);
}

function formatTechniqueEquation(left, right) {
  const highlightedLeft =
    left === TECHNIQUE_TABLE ? formatTechniqueNumber(left) : formatTechniqueFactorValue(left);
  const highlightedRight =
    right === TECHNIQUE_TABLE ? formatTechniqueNumber(right) : formatTechniqueFactorValue(right);

  return `${highlightedLeft} x ${highlightedRight}`;
}

function createTechniqueQuestion(table = TECHNIQUE_TABLE, forceReversed = null) {
  const reversed =
    typeof forceReversed === "boolean" ? forceReversed : Math.random() > 0.5;
  const otherFactor = TABLE_FACTORS[Math.floor(Math.random() * TABLE_FACTORS.length)];

  return {
    table,
    otherFactor,
    left: reversed ? table : otherFactor,
    right: reversed ? otherFactor : table,
    reversed,
    answer: otherFactor * table,
  };
}

function createGuidedTechniqueQuestions(table = TECHNIQUE_TABLE) {
  const shuffledFactors = [...TABLE_FACTORS].sort(() => Math.random() - 0.5);
  const selectedFactors = shuffledFactors.slice(0, 4);

  return [
    {
      table,
      otherFactor: selectedFactors[0],
      left: selectedFactors[0],
      right: table,
      reversed: false,
      answer: selectedFactors[0] * table,
    },
    {
      table,
      otherFactor: selectedFactors[1],
      left: selectedFactors[1],
      right: table,
      reversed: false,
      answer: selectedFactors[1] * table,
    },
    {
      table,
      otherFactor: selectedFactors[2],
      left: table,
      right: selectedFactors[2],
      reversed: true,
      answer: selectedFactors[2] * table,
    },
    {
      table,
      otherFactor: selectedFactors[3],
      left: table,
      right: selectedFactors[3],
      reversed: true,
      answer: selectedFactors[3] * table,
    },
  ];
}

function getTechniqueStageIndex(stage) {
  return TECHNIQUE_STEPS.findIndex((step) => step.id === stage);
}

function advanceTechniqueStage() {
  const currentIndex = getTechniqueStageIndex(state.technique.stage);
  const nextStep = TECHNIQUE_STEPS[currentIndex + 1];
  if (nextStep) {
    state.technique.stage = nextStep.id;
  }
}

function retreatTechniqueStage() {
  const currentIndex = getTechniqueStageIndex(state.technique.stage);
  const previousStep = TECHNIQUE_STEPS[currentIndex - 1];
  if (previousStep) {
    state.technique.stage = previousStep.id;
  }
}

function isTechniqueAvailable(table) {
  return table === TECHNIQUE_TABLE;
}

function clearTechniqueAdvanceTimer() {
  window.clearTimeout(state.techniqueAdvanceTimeoutId);
  state.techniqueAdvanceTimeoutId = null;
}

function getTechniqueProgressRecord(table) {
  return {
    completed: false,
    completedAt: null,
    ...(state.progress.techniques?.[table] || {}),
  };
}

function markTechniqueCompleted(table) {
  state.progress.techniques = state.progress.techniques || {};
  state.progress.techniques[table] = {
    completed: true,
    completedAt: Date.now(),
  };
  saveProgress();
}

function resetTechniqueState(table = TECHNIQUE_TABLE, mode = "menu", selectedOperation = "") {
  clearTechniqueAdvanceTimer();
  state.technique = createTechniqueState(table, mode);
  state.technique.selectedOperation = selectedOperation;
}

function getTechniqueHintMarkup(question) {
  const factorMarkup =
    question.otherFactor === TECHNIQUE_TABLE
      ? `<strong>${escapeHtml(question.otherFactor)}</strong>`
      : `<strong class="technique-factor">${escapeHtml(question.otherFactor)}</strong>`;
  return `Take ${factorMarkup} and place a zero next to it.`;
}

function getTechniqueCardStatus(table) {
  if (!isTechniqueAvailable(table)) {
    return {
      classes: "",
      pill: "Coming Soon",
      note: "Coming soon.",
    };
  }

  const progress = getTechniqueProgressRecord(table);
  if (progress.completed) {
    return {
      classes: " is-completed",
      pill: "Completed",
      note: "Lesson complete.",
    };
  }

  return {
    classes: " is-active",
    pill: "Ready",
    note: "Learn the 10x shortcut.",
  };
}

function getTechniqueTableGridMarkup() {
  return TABLE_FACTORS.map((factor) => {
    const available = isTechniqueAvailable(factor);
    const status = getTechniqueCardStatus(factor);

    return `
      <button
        class="technique-card${status.classes}"
        type="button"
        data-technique-select="${factor}"
        ${available ? "" : "disabled"}
      >
        <span class="technique-card-pill">${status.pill}</span>
        <strong>x ${factor}</strong>
        <span class="technique-card-note">${status.note}</span>
      </button>
    `;
  }).join("");
}

function getTechniqueStagePillsMarkup() {
  return TECHNIQUE_STEPS.map(
    (step) => `
      <span class="technique-stage-pill ${step.id === state.technique.stage ? "is-active" : ""}">
        ${step.label}
      </span>
    `,
  ).join("");
}

function getTechniquePatternRowByFactor(factor) {
  return state.technique.patternRows.find((row) => row.factor === factor);
}

function isTechniquePatternComplete() {
  return state.technique.patternRows
    .filter((row) => row.blank)
    .every((row) => row.status === "correct");
}

function getTechniquePatternSignalMarkup(row) {
  return getTechniqueStatusIconMarkup(row.status);
}

function getTechniqueStatusIconMarkup(status, extraClass = "") {
  const classes = ["technique-status-icon"];
  if (extraClass) {
    classes.push(extraClass);
  }

  if (status === "correct") {
    classes.push("is-correct");
    return `
      <span class="${classes.join(" ")}" aria-label="Correct">
        <svg viewBox="0 0 16 16" role="presentation">
          <path d="M3.2 8.4 6.6 11.8 12.8 5.6" />
        </svg>
      </span>
    `;
  }

  if (status === "error") {
    classes.push("is-error");
    return `
      <span class="${classes.join(" ")}" aria-label="Try again">
        <svg viewBox="0 0 16 16" role="presentation">
          <path d="M4.6 4.6 11.4 11.4 M11.4 4.6 4.6 11.4" />
        </svg>
      </span>
    `;
  }

  return `<span class="${classes.join(" ")}" aria-hidden="true"></span>`;
}

function getTechniquePatternRowClasses(row) {
  const classes = ["technique-pattern-row"];
  if (row.status === "correct") {
    classes.push("is-correct");
  } else if (row.status === "error") {
    classes.push("is-error");
  }
  return classes.join(" ");
}

function getTechniquePatternInputClasses(row, isWide = false) {
  const classes = ["technique-inline-input"];
  if (isWide) {
    classes.push("is-wide");
  }
  if (row.status === "correct") {
    classes.push("is-correct");
  } else if (row.status === "error") {
    classes.push("is-error");
  }
  return classes.join(" ");
}

function getTechniquePatternRowMarkup(row) {
  const autofocus =
    state.technique.focusFieldName === `pattern-${row.factor}` ? 'data-technique-autofocus="true"' : "";

  if (row.blank === "answer-stem") {
    return `
      <div class="${getTechniquePatternRowClasses(row)}" data-technique-pattern-row="${row.factor}">
        <span>${formatTechniqueCarryValue(row.factor)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} =</span>
        <input
          class="${getTechniquePatternInputClasses(row)}"
          type="text"
          name="pattern-${row.factor}"
          inputmode="numeric"
          pattern="[0-9]*"
          value="${escapeHtml(row.value)}"
          aria-label="Missing digits before the zero in ${row.factor} times 10"
          ${autofocus}
        />
        <span><span class="technique-zero">0</span></span>
        <span class="technique-pattern-signal">${getTechniquePatternSignalMarkup(row)}</span>
      </div>
    `;
  }

  if (row.blank === "answer-full") {
    return `
      <div class="${getTechniquePatternRowClasses(row)}" data-technique-pattern-row="${row.factor}">
        <span>${formatTechniqueCarryValue(row.factor)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} =</span>
        <input
          class="${getTechniquePatternInputClasses(row, true)}"
          type="text"
          name="pattern-${row.factor}"
          inputmode="numeric"
          pattern="[0-9]*"
          value="${escapeHtml(row.value)}"
          aria-label="Missing answer in ${row.factor} times 10"
          ${autofocus}
        />
        <span class="technique-pattern-signal">${getTechniquePatternSignalMarkup(row)}</span>
      </div>
    `;
  }

  if (row.blank === "factor") {
    return `
      <div class="${getTechniquePatternRowClasses(row)}" data-technique-pattern-row="${row.factor}">
        <input
          class="${getTechniquePatternInputClasses(row, true)}"
          type="text"
          name="pattern-${row.factor}"
          inputmode="numeric"
          pattern="[0-9]*"
          value="${escapeHtml(row.value)}"
          aria-label="Missing factor in the ${row.factor} times 10 fact"
          ${autofocus}
        />
        <span>x ${formatTechniqueNumber(TECHNIQUE_TABLE)} = ${formatTechniqueAnswerValue(
          row.factor * TECHNIQUE_TABLE,
          row.factor,
        )}</span>
        <span class="technique-pattern-signal">${getTechniquePatternSignalMarkup(row)}</span>
      </div>
    `;
  }

  if (row.blank === "table") {
    return `
      <div class="${getTechniquePatternRowClasses(row)}" data-technique-pattern-row="${row.factor}">
        <span>${formatTechniqueCarryValue(row.factor)} x</span>
        <input
          class="${getTechniquePatternInputClasses(row)}"
          type="text"
          name="pattern-${row.factor}"
          inputmode="numeric"
          pattern="[0-9]*"
          value="${escapeHtml(row.value)}"
          aria-label="Missing 10 factor in the ${row.factor} times 10 fact"
          ${autofocus}
        />
        <span>= ${formatTechniqueAnswerValue(row.factor * TECHNIQUE_TABLE, row.factor)}</span>
        <span class="technique-pattern-signal">${getTechniquePatternSignalMarkup(row)}</span>
      </div>
    `;
  }

  return `
    <div class="${getTechniquePatternRowClasses(row)}" data-technique-pattern-row="${row.factor}">
      <span>${formatTechniqueCarryValue(row.factor)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} = ${formatTechniqueAnswerValue(
        row.factor * TECHNIQUE_TABLE,
        row.factor,
      )}</span>
    </div>
  `;
}

function getTechniqueStageMeta(stage) {
  switch (stage) {
    case "rule":
      return {
        kicker: "10x Technique",
        title: "Place the Zero.",
      };
    case "switch":
      return {
        kicker: "10x Technique",
        title: "The order can flip.",
      };
    case "pattern":
      return {
        kicker: "10x Technique",
        title: "Warm Up.",
      };
    case "guided":
      return {
        kicker: "10x Technique",
        title: "Try it with support.",
      };
    case "quick-check":
      return {
        kicker: "10x Technique",
        title: "Show it on your own.",
      };
    default:
      return {
        kicker: "10x Technique",
        title: "Keep the 10x table feeling easy.",
      };
  }
}

function renderTechniqueMenuScreen() {
  const selectedOperation = state.technique.selectedOperation;
  let bodyMarkup = "";

  if (selectedOperation === "multiplication") {
    bodyMarkup = `
      <div class="technique-table-grid">${getTechniqueTableGridMarkup()}</div>
    `;
  } else if (selectedOperation === "addition") {
    bodyMarkup = `
      <div class="technique-table-grid">${getAdditionTechniqueGridMarkup()}</div>
    `;
  }

  return `
    <div class="technique-menu-shell">
      <div class="technique-menu-head technique-menu-head-compact">
        <div class="technique-menu-title-block">
          <p class="section-kicker">Learn</p>
          <h2>Techniques</h2>
          <p class="techniques-copy">Learn mental mathematics techniques to improve accuracy and speed.</p>
        </div>
        <label class="technique-operation-field">
          <span>Operation</span>
          <select data-technique-operation-select>
            <option value="" ${selectedOperation ? "" : "selected"} disabled hidden>
              Select an operation
            </option>
            <option value="multiplication" ${
              selectedOperation === "multiplication" ? "selected" : ""
            }>Multiplication</option>
            <option value="addition" ${selectedOperation === "addition" ? "selected" : ""}>Addition</option>
          </select>
        </label>
      </div>

      ${bodyMarkup}
    </div>
  `;
}

function renderTechniqueRuleStage() {
  return `
    <section class="technique-lesson-card">
      <p class="technique-helper">
        When multiplying a number by ${formatTechniqueNumber(
          TECHNIQUE_TABLE,
        )}, place a zero next to the number.
      </p>
      <div class="technique-rule-grid">
        <article class="technique-example-card">
          <p class="technique-equation">${formatTechniqueFactorValue(7)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} = ${formatTechniqueAnswerValue(70, 7)}</p>
          <p class="technique-caption">Keep the ${formatTechniqueFactorValue(7)}. Place the zero next to it.</p>
        </article>
        <article class="technique-example-card">
          <p class="technique-equation">${formatTechniqueFactorValue(12)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} = ${formatTechniqueAnswerValue(120, 12)}</p>
          <p class="technique-caption">The ${formatTechniqueFactorValue(12)} stays. The zero goes after it.</p>
        </article>
      </div>
      <div class="technique-action-row technique-action-row-end">
        <button class="primary-button" type="button" data-technique-action="next-stage">
          Continue
        </button>
      </div>
    </section>
  `;
}

function renderTechniqueSwitchStage() {
  return `
    <section class="technique-lesson-card">
      <p class="technique-helper">
        It doesn't matter which way the fact is written, we can still use the same technique.
      </p>
      <div class="technique-switch-grid">
        <article class="technique-switch-card">
          <p class="technique-equation">${formatTechniqueFactorValue(6)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} = ${formatTechniqueAnswerValue(60, 6)}</p>
          <p class="technique-caption">Start with the ${formatTechniqueFactorValue(6)}. Then place the zero.</p>
        </article>
        <article class="technique-switch-card">
          <p class="technique-equation">${formatTechniqueNumber(TECHNIQUE_TABLE)} x ${formatTechniqueFactorValue(6)} = ${formatTechniqueAnswerValue(60, 6)}</p>
          <p class="technique-caption">The 6 is still the number that matters.</p>
        </article>
        <article class="technique-switch-card">
          <p class="technique-equation">${formatTechniqueFactorValue(9)} x ${formatTechniqueNumber(TECHNIQUE_TABLE)} = ${formatTechniqueAnswerValue(90, 9)}</p>
          <p class="technique-caption">Same idea.</p>
        </article>
        <article class="technique-switch-card">
          <p class="technique-equation">${formatTechniqueNumber(TECHNIQUE_TABLE)} x ${formatTechniqueFactorValue(9)} = ${formatTechniqueAnswerValue(90, 9)}</p>
          <p class="technique-caption">Same answer.</p>
        </article>
      </div>
      <div class="technique-action-row">
        <button class="ghost-button" type="button" data-technique-action="prev-stage">
          Back
        </button>
        <button class="primary-button" type="button" data-technique-action="next-stage">
          Continue
        </button>
      </div>
    </section>
  `;
}

function renderTechniquePatternStage() {
  return `
    <section class="technique-lesson-card">
      <p class="technique-helper">
        Fill in the blanks to make each fact true.
      </p>
      <div class="technique-pattern-grid">
        ${state.technique.patternRows.map(getTechniquePatternRowMarkup).join("")}
      </div>
      <p class="sr-only" aria-live="polite" data-technique-pattern-feedback>
        ${state.technique.patternFeedback.message}
      </p>
      <div class="technique-action-row">
        <button class="ghost-button" type="button" data-technique-action="prev-stage">
          Back
        </button>
        <div class="technique-side-actions">
          <button
            class="primary-button"
            type="button"
            data-technique-action="next-stage"
            ${isTechniquePatternComplete() ? "" : "disabled"}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderTechniqueGuidedStage() {
  const question = state.technique.guidedQuestions[state.technique.guidedIndex];
  const feedback = state.technique.guidedFeedback;
  const answerState = state.technique.guidedSolved
    ? "correct"
    : feedback.tone === "error"
      ? "error"
      : "idle";

  return `
    <form class="technique-lesson-card technique-question-shell" data-technique-form="guided" autocomplete="off">
      <div class="technique-question-meta">
        <span class="technique-progress-copy">Assisted rep ${
          state.technique.guidedIndex + 1
        } of ${state.technique.guidedQuestions.length}</span>
      </div>
      <p class="technique-question">${formatTechniqueEquation(question.left, question.right)} = ?</p>
      <div class="technique-input-row">
        <div class="technique-answer-wrap ${
          answerState === "correct" ? "is-correct" : answerState === "error" ? "is-error" : ""
        }">
          <label class="answer-field">
            <span class="sr-only">Technique answer</span>
            <input
              type="text"
              name="techniqueAnswer"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="Type the full answer"
              value="${escapeHtml(state.technique.guidedAnswer)}"
              ${state.technique.guidedSolved ? "disabled" : ""}
              data-technique-autofocus="true"
            />
          </label>
          <span class="technique-answer-signal">
            ${getTechniqueStatusIconMarkup(answerState, "technique-status-icon-inline")}
          </span>
        </div>
        <button class="primary-button" type="submit" ${state.technique.guidedSolved ? "disabled" : ""}>
          Check Answer
        </button>
      </div>
      ${
        state.technique.guidedHintVisible
          ? `<div class="technique-hint">${getTechniqueHintMarkup(question)}</div>`
          : ""
      }
      <p class="sr-only" aria-live="polite">${feedback.message}</p>
      <div class="technique-action-row">
        <button class="ghost-button" type="button" data-technique-action="prev-stage">
          Back
        </button>
        <div class="technique-side-actions">
          ${
            !state.technique.guidedHintVisible && !state.technique.guidedSolved
              ? `
                <button class="ghost-button" type="button" data-technique-action="show-guided-hint">
                  Show Hint
                </button>
              `
              : ""
          }
        </div>
      </div>
    </form>
  `;
}

function renderTechniqueQuickCheckStage() {
  const question = state.technique.quickCheckQuestion;
  const feedback = state.technique.quickCheckFeedback;
  const answerState = state.technique.quickCheckSolved
    ? "correct"
    : feedback.tone === "error"
      ? "error"
      : "idle";
  const hintAvailable =
    state.technique.quickCheckHintVisible || state.technique.quickCheckHintOffered;

  return `
    <form class="technique-lesson-card technique-question-shell" data-technique-form="quick-check" autocomplete="off">
      <div class="technique-question-meta">
        <span class="technique-progress-copy">Correct answers: ${
          state.technique.quickCheckCorrect
        } / ${TECHNIQUE_COMPLETION_GOAL}</span>
      </div>
      <p class="technique-question">${formatTechniqueEquation(question.left, question.right)} = ?</p>
      <div class="technique-input-row">
        <div class="technique-answer-wrap ${
          answerState === "correct" ? "is-correct" : answerState === "error" ? "is-error" : ""
        }">
          <label class="answer-field">
            <span class="sr-only">Solo reps answer</span>
            <input
              type="text"
              name="techniqueAnswer"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="Type the full answer"
              value="${escapeHtml(state.technique.quickCheckAnswer)}"
              ${state.technique.quickCheckSolved ? "disabled" : ""}
              data-technique-autofocus="true"
            />
          </label>
          <span class="technique-answer-signal">
            ${getTechniqueStatusIconMarkup(answerState, "technique-status-icon-inline")}
          </span>
        </div>
        <button class="primary-button" type="submit" ${state.technique.quickCheckSolved ? "disabled" : ""}>
          Check Answer
        </button>
      </div>
      ${
        state.technique.quickCheckHintVisible
          ? `<div class="technique-hint">${getTechniqueHintMarkup(question)}</div>`
          : ""
      }
      <p class="sr-only" aria-live="polite">${feedback.message}</p>
      <div class="technique-action-row">
        <button class="ghost-button" type="button" data-technique-action="prev-stage">
          Back
        </button>
        <div class="technique-side-actions">
          ${
            hintAvailable && !state.technique.quickCheckSolved && !state.technique.quickCheckHintVisible
              ? `
                <button class="ghost-button" type="button" data-technique-action="show-quick-hint">
                  Hint
                </button>
              `
              : ""
          }
        </div>
      </div>
    </form>
  `;
}

function renderTechniquePracticeStage() {
  const question = state.technique.practiceQuestion;
  const feedback = state.technique.practiceFeedback;

  return `
    <div class="technique-lesson-wrap">
      <div class="technique-lesson-head">
        <div>
          <p class="section-kicker">Practice More</p>
          <h2>Keep the 10x table feeling easy.</h2>
        </div>
        <button class="ghost-button subtle-button" type="button" data-technique-action="back-to-techniques">
          Back to Techniques
        </button>
      </div>

      <form class="technique-lesson-card technique-question-shell" data-technique-form="practice" autocomplete="off">
        <div class="technique-question-meta">
          <span class="technique-progress-copy">Questions can flip either way now.</span>
        </div>
        <p class="technique-question">${formatTechniqueEquation(question.left, question.right)} = ?</p>
        <div class="technique-input-row">
          <label class="answer-field">
            <span class="sr-only">Practice answer</span>
            <input
              type="text"
              name="techniqueAnswer"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="Type the full answer"
              value="${escapeHtml(state.technique.practiceAnswer)}"
              data-technique-autofocus="true"
            />
          </label>
          <button class="primary-button" type="submit">
            Check Answer
          </button>
        </div>
        ${
          state.technique.practiceHintVisible
            ? `<div class="technique-hint">${getTechniqueHintMarkup(question)}</div>`
            : ""
        }
        <p class="technique-feedback ${feedback.tone}">${feedback.message}</p>
        <div class="technique-action-row">
          ${
            !state.technique.practiceHintVisible
              ? `
                <button class="ghost-button" type="button" data-technique-action="show-practice-hint">
                  Hint
                </button>
              `
              : '<span class="technique-progress-copy">Use the hint when you want a quick reminder.</span>'
          }
          <div class="technique-side-actions">
            ${
              state.technique.practiceSolved
                ? `
                  <button class="primary-button" type="button" data-technique-action="next-practice">
                    Next Practice Question
                  </button>
                `
                : ""
            }
          </div>
        </div>
      </form>
    </div>
  `;
}

function renderAdditionTechniqueLessonScreen() {
  const lesson = ADDITION_LESSONS.find((item) => item.id === state.technique.additionLessonId);

  if (!lesson) {
    return `
      <div class="technique-lesson-wrap">
        <div class="technique-lesson-head">
          <div>
            <p class="section-kicker">Addition Lessons</p>
            <h2>Choose a lesson</h2>
          </div>
        </div>
        <section class="technique-lesson-card">
          <p class="technique-helper">Select an addition lesson from the menu to continue.</p>
          <div class="technique-action-row">
            <button class="primary-button" type="button" data-technique-action="back-to-techniques">
              Back to Techniques
            </button>
          </div>
        </section>
      </div>
    `;
  }

  const statusLabel =
    lesson.status === "under-construction" ? "Under Construction" : "Coming Soon";
  const helperCopy =
    lesson.status === "under-construction"
      ? "This lesson is available as a preview concept card while full interactivity is being built."
      : "This lesson is staged for a future release.";

  return `
    <div class="technique-lesson-wrap">
      <div class="technique-lesson-head">
        <div>
          <p class="section-kicker">Addition Technique</p>
          <h2>${lesson.title}</h2>
        </div>
        <button class="ghost-button subtle-button" type="button" data-technique-action="back-to-techniques">
          Back to Lessons
        </button>
      </div>
      <section class="technique-lesson-card">
        <span class="technique-card-pill">${statusLabel}</span>
        <p class="technique-helper">${lesson.description}</p>
        <article class="technique-hint">
          ${helperCopy}
        </article>
        <div class="technique-action-row">
          <button class="ghost-button" type="button" data-technique-action="back-to-techniques">
            Choose Another Lesson
          </button>
          <button class="primary-button" type="button" data-technique-action="back-to-setup">
            Go to Work Out
          </button>
        </div>
      </section>
    </div>
  `;
}

function renderTechniqueCelebrationScreen() {
  return `
    <div class="technique-celebration-shell">
      <div class="technique-completion-card">
        <p class="section-kicker">Lesson Complete</p>
        <h2>10x technique complete.</h2>
        <p class="technique-completion-copy">
          You finished the lesson and locked in ${TECHNIQUE_COMPLETION_GOAL} solo reps. Keep building from here, or head back and choose your next move.
        </p>
        <div class="technique-completion-actions">
          <button class="ghost-button" type="button" data-technique-action="back-to-techniques">
            Back to Techniques
          </button>
          <button class="ghost-button" type="button" data-technique-action="open-practice">
            Practice More
          </button>
          <button class="primary-button" type="button" data-technique-action="back-to-setup">
            Go to Work Out
          </button>
        </div>
      </div>
    </div>
  `;
}

function getTechniqueStageMarkup() {
  if (state.technique.stage === "rule") {
    return renderTechniqueRuleStage();
  }

  if (state.technique.stage === "switch") {
    return renderTechniqueSwitchStage();
  }

  if (state.technique.stage === "pattern") {
    return renderTechniquePatternStage();
  }

  if (state.technique.stage === "guided") {
    return renderTechniqueGuidedStage();
  }

  return renderTechniqueQuickCheckStage();
}

function focusTechniqueField() {
  const root = elements.techniqueScreenShell;
  if (!root) {
    return;
  }

  let target = null;

  if (state.technique.focusFieldName) {
    target = root.querySelector(`[name="${state.technique.focusFieldName}"]`);
  }

  if (!target) {
    target = root.querySelector("[data-technique-autofocus]");
  }

  if (target) {
    window.requestAnimationFrame(() => {
      target.focus();
      if (target.name === "techniqueAnswer" && typeof target.select === "function") {
        target.select();
      }
    });
  }
}

function renderTechniqueLessonScreen() {
  const stageMeta = getTechniqueStageMeta(state.technique.stage);

  return `
    <div class="technique-lesson-wrap">
      <div class="technique-lesson-head">
        <div>
          <p class="section-kicker">${stageMeta.kicker}</p>
          <h2>${stageMeta.title}</h2>
        </div>
        <button class="ghost-button subtle-button" type="button" data-technique-action="exit">
          Exit Lesson
        </button>
      </div>
      <div class="technique-stage-pills">${getTechniqueStagePillsMarkup()}</div>
      ${getTechniqueStageMarkup()}
    </div>
  `;
}

function renderTechniqueScreen() {
  if (!elements.techniqueScreenShell) {
    return;
  }

  if (state.technique.mode === "menu") {
    elements.techniqueScreenShell.innerHTML = renderTechniqueMenuScreen();
  } else if (state.technique.mode === "addition-lesson") {
    elements.techniqueScreenShell.innerHTML = renderAdditionTechniqueLessonScreen();
  } else if (state.technique.mode === "celebration") {
    elements.techniqueScreenShell.innerHTML = renderTechniqueCelebrationScreen();
  } else if (state.technique.mode === "practice") {
    elements.techniqueScreenShell.innerHTML = renderTechniquePracticeStage();
  } else {
    elements.techniqueScreenShell.innerHTML = renderTechniqueLessonScreen();
  }

  focusTechniqueField();
}

function openTechniqueExitDialog(targetView) {
  state.pendingTechniqueView = targetView;
  if (!elements.exitTechniqueDialog.open) {
    elements.exitTechniqueDialog.showModal();
  }
}

function cancelTechniqueExit() {
  state.pendingTechniqueView = null;
  elements.exitTechniqueDialog.close();
}

function confirmTechniqueExit() {
  const targetView = state.pendingTechniqueView || "techniques";
  state.pendingTechniqueView = null;
  elements.exitTechniqueDialog.close();
  const selectedOperation = state.technique.selectedOperation;
  resetTechniqueState(state.technique.selectedTable, "menu", selectedOperation);
  renderTechniqueScreen();

  if (targetView !== "techniques") {
    showView(targetView);
  }
}

function requestView(targetView) {
  if (state.active || !targetView) {
    return;
  }

  if (
    state.view === "techniques" &&
    ["lesson", "practice", "addition-lesson"].includes(state.technique.mode) &&
    targetView !== "techniques"
  ) {
    openTechniqueExitDialog(targetView);
    return;
  }

  if (targetView === "techniques" && state.view !== "techniques") {
    resetTechniqueState(state.technique.selectedTable, "menu");
    renderTechniqueScreen();
  }

  showView(targetView);
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
    const isActiveScreen = screen.dataset.view === view;
    screen.classList.toggle("is-active", isActiveScreen);
    screen.setAttribute("aria-hidden", isActiveScreen ? "false" : "true");
  });

  elements.navButtons.forEach((button) => {
    const isActiveButton = viewMatchesButton(view, button.dataset.viewTarget);
    button.classList.toggle("is-active", isActiveButton);
    if (isActiveButton) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
    button.disabled = state.active;
  });

  elements.optionsButton.disabled = state.active;
}

function isTypingTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT" ||
    target.isContentEditable
  );
}

function closeOpenDialog() {
  if (elements.endWorkoutDialog.open) {
    elements.endWorkoutDialog.close();
    return true;
  }

  if (elements.optionsDialog.open) {
    elements.optionsDialog.close();
    return true;
  }

  if (elements.exitTechniqueDialog.open) {
    elements.exitTechniqueDialog.close();
    state.pendingTechniqueView = null;
    return true;
  }

  return false;
}

function handleGlobalKeydown(event) {
  if (event.defaultPrevented) {
    return;
  }

  if (event.key === "Escape") {
    if (closeOpenDialog()) {
      event.preventDefault();
      return;
    }

    if (
      !state.active &&
      state.view === "techniques" &&
      ["lesson", "practice", "addition-lesson"].includes(state.technique.mode)
    ) {
      event.preventDefault();
      openTechniqueExitDialog("techniques");
    }

    return;
  }

  if (
    state.active ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    isTypingTarget(event.target)
  ) {
    return;
  }

  if (state.view === "results") {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      shiftResultsCarousel(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      shiftResultsCarousel(1);
    }
    return;
  }

  if (state.view === "progress") {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      shiftProgressCarousel(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      shiftProgressCarousel(1);
    }
  }
}

function sanitiseTechniqueEntry(value) {
  return String(value || "").replace(/[^\d]/g, "");
}

function updateTechniquePatternRow(name, value) {
  const factor = Number(name.replace("pattern-", ""));
  const row = getTechniquePatternRowByFactor(factor);
  if (!row) {
    return;
  }

  row.value = value;
  if (!value) {
    row.status = "idle";
  } else if (value === row.expected) {
    row.status = "correct";
  } else {
    row.status = "error";
  }

  if (isTechniquePatternComplete()) {
    state.technique.patternFeedback = {
      message: "Strong. The whole 10x pattern is holding together.",
      tone: "success",
    };
  } else {
    state.technique.patternFeedback = {
      message: "",
      tone: "",
    };
  }
}

function renderTechniquePatternProgress() {
  const root = elements.techniqueScreenShell;
  if (!root || state.technique.stage !== "pattern") {
    return;
  }

  state.technique.patternRows.forEach((row) => {
    const rowElement = root.querySelector(`[data-technique-pattern-row="${row.factor}"]`);
    if (!rowElement) {
      return;
    }

    rowElement.className = getTechniquePatternRowClasses(row);
    const input = rowElement.querySelector(`input[name="pattern-${row.factor}"]`);
    if (input) {
      const isWide = row.blank === "answer-full" || row.blank === "factor";
      input.className = getTechniquePatternInputClasses(row, isWide);
    }

    const signal = rowElement.querySelector(".technique-pattern-signal");
    if (signal) {
      signal.innerHTML = getTechniquePatternSignalMarkup(row);
    }
  });

  const feedback = root.querySelector("[data-technique-pattern-feedback]");
  if (feedback) {
    feedback.textContent = state.technique.patternFeedback.message;
  }

  const continueButton = root.querySelector('[data-technique-action="next-stage"]');
  if (continueButton instanceof HTMLButtonElement) {
    continueButton.disabled = !isTechniquePatternComplete();
  }
}

function submitGuidedTechniqueAnswer() {
  const question = state.technique.guidedQuestions[state.technique.guidedIndex];
  const answer = state.technique.guidedAnswer.trim();

  clearTechniqueAdvanceTimer();

  if (answer === `${question.answer}`) {
    state.technique.guidedSolved = true;
    state.technique.guidedHintVisible = false;
    state.technique.guidedFeedback = {
      message: "Nice. That one is locked in.",
      tone: "success",
    };
    renderTechniqueScreen();
    state.techniqueAdvanceTimeoutId = window.setTimeout(() => {
      if (state.technique.guidedIndex >= state.technique.guidedQuestions.length - 1) {
        state.technique.stage = "quick-check";
      } else {
        state.technique.guidedIndex += 1;
      }

      state.technique.guidedAnswer = "";
      state.technique.guidedSolved = false;
      state.technique.guidedHintVisible = false;
      state.technique.guidedFeedback = { message: "", tone: "" };
      clearTechniqueAdvanceTimer();
      renderTechniqueScreen();
    }, TECHNIQUE_AUTO_ADVANCE_MS);
    return;
  }

  state.technique.guidedSolved = false;
  state.technique.guidedFeedback = {
    message: "Not yet. Keep the same fact and use the hint if you want support.",
    tone: "error",
  };
  renderTechniqueScreen();
}

function submitQuickCheckAnswer() {
  const question = state.technique.quickCheckQuestion;
  const answer = state.technique.quickCheckAnswer.trim();
  clearTechniqueAdvanceTimer();

  if (answer === `${question.answer}`) {
    state.technique.quickCheckCorrect += 1;
    state.technique.quickCheckSolved = true;
    state.technique.quickCheckHintVisible = false;
    state.technique.quickCheckHintOffered = false;
    state.technique.quickCheckFeedback = {
      message:
        state.technique.quickCheckCorrect >= TECHNIQUE_COMPLETION_GOAL
          ? "Strong work. You finished the solo reps."
          : "Correct. Keep the pattern steady.",
      tone: "success",
    };

    if (state.technique.quickCheckCorrect >= TECHNIQUE_COMPLETION_GOAL) {
      markTechniqueCompleted(state.technique.selectedTable);
    }

    renderTechniqueScreen();
    state.techniqueAdvanceTimeoutId = window.setTimeout(() => {
      if (state.technique.quickCheckCorrect >= TECHNIQUE_COMPLETION_GOAL) {
        state.technique.mode = "celebration";
      } else {
        state.technique.quickCheckQuestion = createTechniqueQuestion(state.technique.selectedTable);
      }

      state.technique.quickCheckAnswer = "";
      state.technique.quickCheckSolved = false;
      state.technique.quickCheckHintVisible = false;
      state.technique.quickCheckHintOffered = false;
      state.technique.quickCheckFeedback = { message: "", tone: "" };
      clearTechniqueAdvanceTimer();
      renderTechniqueScreen();
    }, TECHNIQUE_AUTO_ADVANCE_MS);
    return;
  } else {
    state.technique.quickCheckAnswer = "";
    state.technique.quickCheckSolved = false;
    state.technique.quickCheckHintVisible = false;
    state.technique.quickCheckHintOffered = true;
    state.technique.quickCheckFeedback = {
      message: "Wrong this time. The same fact stays here, and you can ask for a hint.",
      tone: "error",
    };
  }

  renderTechniqueScreen();
}

function submitTechniquePracticeAnswer() {
  const question = state.technique.practiceQuestion;
  const answer = state.technique.practiceAnswer.trim();

  if (answer === `${question.answer}`) {
    state.technique.practiceSolved = true;
    state.technique.practiceHintVisible = false;
    state.technique.practiceFeedback = {
      message: "Correct. Keep the table feeling easy.",
      tone: "success",
    };
  } else {
    state.technique.practiceSolved = false;
    state.technique.practiceFeedback = {
      message: "Not yet. Stay with the same fact and use the hint if you want support.",
      tone: "error",
    };
  }

  renderTechniqueScreen();
}

function handleTechniqueLessonSubmit(event) {
  const form = event.target;

  if (!(form instanceof HTMLFormElement) || !form.dataset.techniqueForm) {
    return;
  }

  event.preventDefault();

  if (form.dataset.techniqueForm === "pattern") {
    return;
  }

  if (form.dataset.techniqueForm === "guided") {
    submitGuidedTechniqueAnswer();
    return;
  }

  if (form.dataset.techniqueForm === "quick-check") {
    if (state.technique.quickCheckSolved) {
      return;
    }
    submitQuickCheckAnswer();
    return;
  }

  if (form.dataset.techniqueForm === "practice") {
    submitTechniquePracticeAnswer();
  }
}

function handleTechniqueInput(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  if (input.name.startsWith("pattern-")) {
    const nextValue = sanitiseTechniqueEntry(input.value);
    input.value = nextValue;
    state.technique.focusFieldName = input.name;
    updateTechniquePatternRow(input.name, nextValue);
    renderTechniquePatternProgress();
    return;
  }

  if (input.name !== "techniqueAnswer") {
    return;
  }

  const nextValue = sanitiseTechniqueEntry(input.value);
  input.value = nextValue;
  state.technique.focusFieldName = input.name;

  if (state.technique.mode === "practice") {
    state.technique.practiceAnswer = nextValue;
    return;
  }

  if (state.technique.stage === "guided") {
    state.technique.guidedAnswer = nextValue;
    return;
  }

  if (state.technique.stage === "quick-check") {
    if (state.technique.quickCheckSolved) {
      return;
    }
    clearTechniqueAdvanceTimer();
    state.technique.quickCheckAnswer = nextValue;
  }
}

function handleTechniqueAction(action) {
  clearTechniqueAdvanceTimer();

  if (action === "next-stage") {
    if (state.technique.stage === "pattern" && !isTechniquePatternComplete()) {
      return;
    }
    advanceTechniqueStage();
    renderTechniqueScreen();
    return;
  }

  if (action === "prev-stage") {
    retreatTechniqueStage();
    renderTechniqueScreen();
    return;
  }

  if (action === "show-guided-hint") {
    state.technique.guidedHintVisible = true;
    renderTechniqueScreen();
    return;
  }

  if (action === "show-quick-hint") {
    state.technique.quickCheckHintVisible = true;
    renderTechniqueScreen();
    return;
  }

  if (action === "next-quick") {
    if (state.technique.quickCheckCorrect >= TECHNIQUE_COMPLETION_GOAL) {
      state.technique.mode = "celebration";
    } else {
      state.technique.quickCheckQuestion = createTechniqueQuestion(state.technique.selectedTable);
      state.technique.quickCheckAnswer = "";
      state.technique.quickCheckSolved = false;
      state.technique.quickCheckHintVisible = false;
      state.technique.quickCheckHintOffered = false;
      state.technique.quickCheckFeedback = { message: "", tone: "" };
    }

    renderTechniqueScreen();
    return;
  }

  if (action === "show-practice-hint") {
    state.technique.practiceHintVisible = true;
    renderTechniqueScreen();
    return;
  }

  if (action === "next-practice") {
    state.technique.practiceQuestion = createTechniqueQuestion(state.technique.selectedTable);
    state.technique.practiceAnswer = "";
    state.technique.practiceSolved = false;
    state.technique.practiceHintVisible = false;
    state.technique.practiceFeedback = { message: "", tone: "" };
    renderTechniqueScreen();
    return;
  }

  if (action === "open-practice") {
    state.technique.mode = "practice";
    state.technique.practiceQuestion = createTechniqueQuestion(state.technique.selectedTable);
    state.technique.practiceAnswer = "";
    state.technique.practiceSolved = false;
    state.technique.practiceHintVisible = false;
    state.technique.practiceFeedback = { message: "", tone: "" };
    renderTechniqueScreen();
    return;
  }

  if (action === "back-to-techniques") {
    const selectedOperation = state.technique.selectedOperation;
    resetTechniqueState(state.technique.selectedTable, "menu", selectedOperation);
    renderTechniqueScreen();
    return;
  }

  if (action === "back-to-setup") {
    resetTechniqueState(state.technique.selectedTable, "menu");
    renderTechniqueScreen();
    showView("setup");
    return;
  }

  if (action === "exit") {
    openTechniqueExitDialog("techniques");
  }
}

function handleTechniqueLessonClick(event) {
  const actionButton = event.target.closest("[data-technique-action]");
  if (!actionButton) {
    return;
  }

  handleTechniqueAction(actionButton.dataset.techniqueAction);
}

function handleTechniqueTableClick(event) {
  const multiplicationButton = event.target.closest("[data-technique-select]");
  if (multiplicationButton) {
    const table = Number(multiplicationButton.dataset.techniqueSelect);
    if (!isTechniqueAvailable(table)) {
      return;
    }

    resetTechniqueState(table, "lesson", "multiplication");
    renderTechniqueScreen();
    return;
  }

  const additionButton = event.target.closest("[data-addition-technique]");
  if (!additionButton) {
    return;
  }

  const lessonId = String(additionButton.dataset.additionTechnique || "");
  const lesson = ADDITION_LESSONS.find((item) => item.id === lessonId);
  if (!lesson || !lesson.selectable) {
    return;
  }

  state.technique.selectedOperation = "addition";
  state.technique.additionLessonId = lesson.id;
  state.technique.mode = "addition-lesson";
  renderTechniqueScreen();
}

function handleTechniqueMenuChange(event) {
  const select = event.target.closest("[data-technique-operation-select]");
  if (!(select instanceof HTMLSelectElement)) {
    return;
  }

  const selectedOperation = select.value;
  state.technique.selectedOperation =
    selectedOperation === "addition" || selectedOperation === "multiplication"
      ? selectedOperation
      : "";
  state.technique.mode = "menu";
  state.technique.additionLessonId = "";
  renderTechniqueScreen();
}

function renderSetupPreview() {
  // Setup preview panel was removed in the operation-layer update.
}

function evaluateFactAnswer(operation, left, right) {
  return operation === "addition" ? left + right : left * right;
}

function createFact(operation, left, right) {
  const ordered = [left, right].sort((first, second) => first - second);
  const symbol = OPERATION_SYMBOLS[operation] || "x";
  return {
    operation,
    symbol,
    a: ordered[0],
    b: ordered[1],
    key: `${operation}:${ordered[0]}${symbol}${ordered[1]}`,
    answer: evaluateFactAnswer(operation, left, right),
  };
}

function addFactVariant(map, operation, left, right) {
  const fact = createFact(operation, left, right);
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
    addFactVariant(map, "multiplication", leftMagnitude, rightMagnitude);
    return;
  }

  [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ].forEach(([leftSign, rightSign]) => {
    addFactVariant(
      map,
      "multiplication",
      leftMagnitude * leftSign,
      rightMagnitude * rightSign,
    );
  });
}

function buildMultiplicationPool(settings) {
  const map = new Map();

  if (settings.sessionType === "isolation") {
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

function getRandomNumberByDigits(digits) {
  if (digits <= 1) {
    return Math.floor(Math.random() * 10);
  }

  if (digits === 2) {
    return 10 + Math.floor(Math.random() * 90);
  }

  return 100 + Math.floor(Math.random() * 900);
}

function buildAdditionPool(settings) {
  const difficulty =
    settings.additionDifficulty === "easy" ||
    settings.additionDifficulty === "medium" ||
    settings.additionDifficulty === "hard"
      ? settings.additionDifficulty
      : "easy";
  const buckets = ADDITION_DIGIT_BUCKETS[difficulty];
  const targetTotal = 120;
  const perBucketTarget = Math.max(24, Math.floor(targetTotal / buckets.length));
  const map = new Map();

  buckets.forEach(([leftDigits, rightDigits]) => {
    let created = 0;
    let attempts = 0;
    const maxAttempts = perBucketTarget * 40;

    while (created < perBucketTarget && attempts < maxAttempts) {
      attempts += 1;
      const beforeSize = map.size;
      const left = getRandomNumberByDigits(leftDigits);
      const right = getRandomNumberByDigits(rightDigits);
      addFactVariant(map, "addition", left, right);
      if (map.size > beforeSize) {
        created += 1;
      }
    }
  });

  if (!map.size) {
    addFactVariant(map, "addition", 1, 1);
    addFactVariant(map, "addition", 2, 3);
    addFactVariant(map, "addition", 10, 5);
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

function inferOperationFromFactKey(key) {
  if (typeof key !== "string") {
    return "multiplication";
  }

  if (key.startsWith("addition:")) {
    return "addition";
  }

  return "multiplication";
}

function inferSymbolFromFactKey(key) {
  return inferOperationFromFactKey(key) === "addition" ? "+" : "x";
}

function getFactProgress(key) {
  return {
    operation: inferOperationFromFactKey(key),
    symbol: inferSymbolFromFactKey(key),
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
  const pool = state.questionPool.length ? state.questionPool : buildPool(state.settings);
  if (!pool.length) {
    return null;
  }

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
  const sparMode = isSparMode(settings);
  let fillRatio = 0;
  let progressLabel = "Ready";
  let fillColor = ENDLESS_COLORS[0];

  if (settings.sessionType === "question-goal" || settings.sessionType === "isolation") {
    fillRatio =
      settings.questionTarget > 0
        ? Math.min(state.session.attempted / settings.questionTarget, 1)
        : 0;
    progressLabel = `${state.session.attempted} / ${settings.questionTarget} attempted`;
  } else if (sparMode) {
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
  elements.progressTrack?.classList.toggle("is-hidden", sparMode);
  elements.progressText?.classList.toggle("is-hidden", sparMode);
  renderSparStrikeHud(state.session.sparStrikes, sparMode);
  renderStreakEffects();
  renderComboIndicator();
}

function getStreakEffectTier(streak) {
  if (streak >= 8) {
    return "flame";
  }
  if (streak >= 4) {
    return "spark";
  }
  if (streak >= 2) {
    return "smoke";
  }
  return "";
}

function renderStreakEffects() {
  const tier = getStreakEffectTier(state.session.streak);
  const tiers = ["smoke", "spark", "flame"];

  tiers.forEach((candidate) => {
    const className = `streak-${candidate}`;
    elements.progressTrack?.classList.toggle(className, tier === candidate);
    elements.problemWrap?.classList.toggle(className, tier === candidate);
    elements.practicePanel?.classList.toggle(className, tier === candidate);
  });
}

function renderSparStrikeHud(strikes, active) {
  if (!elements.sparStrikeHud) {
    return;
  }

  elements.sparStrikeHud.classList.toggle("is-hidden", !active);
  elements.sparStrikeHud.setAttribute("aria-hidden", active ? "false" : "true");
  elements.sparStrikeBoxes.forEach((box, index) => {
    box.classList.toggle("is-hit", active && index < strikes);
  });
}

function renderComboIndicator() {
  if (!elements.comboIndicator) {
    return;
  }

  const streak = state.session.streak;
  const tier = getStreakEffectTier(streak);
  const visible = streak >= 2;
  elements.comboIndicator.classList.toggle("is-visible", visible);
  elements.comboIndicator.setAttribute("aria-hidden", visible ? "false" : "true");
  elements.comboIndicator.classList.toggle("tier-smoke", tier === "smoke");
  elements.comboIndicator.classList.toggle("tier-spark", tier === "spark");
  elements.comboIndicator.classList.toggle("tier-flame", tier === "flame");
  elements.comboIndicator.textContent = visible ? `COMBO x${streak}` : "COMBO x0";
}

function setFeedback(message, tone = "") {
  elements.feedback.textContent = message;
  elements.feedback.classList.remove("success", "error");
  if (tone) {
    elements.feedback.classList.add(tone);
  }
}

function askNextQuestion() {
  const nextQuestion = pickQuestion();
  if (!nextQuestion) {
    completeSession("manual");
    return;
  }

  state.currentQuestion = nextQuestion;
  state.questionStartedAt = window.performance.now();
  state.lastQuestionKey = state.currentQuestion.key;

  elements.problemText.textContent = `${state.currentQuestion.left} ${state.currentQuestion.symbol} ${state.currentQuestion.right}`;
  elements.answerInput.value = "";
  elements.answerInput.disabled = false;
  elements.answerInput.readOnly = state.useTouchKeypad;
  elements.checkButton.disabled = false;
  elements.skipButton.disabled = isSparMode(state.settings);
  if (!state.useTouchKeypad) {
    elements.answerInput.focus();
  }
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
  state.questionPool = buildPool(settings);
  if (!state.questionPool.length) {
    const fallbackFactor = settings.operation === "addition" ? 1 : 2;
    state.questionPool = [createFact(settings.operation, fallbackFactor, fallbackFactor)];
  }
  state.session = createEmptySession();
  state.currentQuestion = null;
  state.lastQuestionKey = null;
  state.questionStartedAt = 0;
  state.sessionStartedAt = 0;
  state.sessionEndedAt = 0;

  elements.sessionBadge.textContent = getSessionBadgeLabel(settings);
  if (elements.countdownCopy) {
    elements.countdownCopy.textContent =
      settings.operation === "addition"
        ? "Type the answer to each addition fact."
        : "Type the answer to the times tables.";
  }
  elements.answerInput.disabled = true;
  elements.answerInput.readOnly = state.useTouchKeypad;
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
  if (
    state.settings.sessionType === "question-goal" ||
    state.settings.sessionType === "isolation"
  ) {
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

  if (settings.sessionType === "isolation") {
    return "isolation";
  }

  return settings.freeTrainingMode === "spar" ? "spar" : "zen";
}

function getWorkoutModeLabelFromSettings(settings) {
  const modeKey = getWorkoutModeKey(settings);
  const operationLabel = getOperationLabel(settings.operation);
  if (modeKey === "timed") {
    return `${operationLabel} High Intensity Training`;
  }
  if (modeKey === "question-goal") {
    return `${operationLabel} Target Reps`;
  }
  if (modeKey === "isolation") {
    return `Isolation Training (x ${settings.focusFactor})`;
  }
  if (modeKey === "spar") {
    return settings.sparTiming === "timed"
      ? `${operationLabel} Spar Mode (Timed)`
      : `${operationLabel} Spar Mode`;
  }
  return `${operationLabel} Zen Mode`;
}

function getWorkoutModeLabel(record) {
  if (record.modeLabel) {
    return record.modeLabel;
  }

  const operationLabel = getOperationLabel(record.operation);
  if (record.modeKey === "timed") {
    return `${operationLabel} High Intensity Training`;
  }
  if (record.modeKey === "question-goal") {
    return `${operationLabel} Target Reps`;
  }
  if (record.modeKey === "isolation") {
    return `Isolation Training (x ${record.focusFactor || 7})`;
  }
  if (record.modeKey === "spar") {
    return record.sparTiming === "timed"
      ? `${operationLabel} Spar Mode (Timed)`
      : `${operationLabel} Spar Mode`;
  }
  return `${operationLabel} Zen Mode`;
}

function appendWorkoutHistory(reason) {
  if (!state.session.attempted && !state.session.skipped) {
    return;
  }

  const averageMs = average(state.session.responseTimes);
  const record = normaliseWorkoutRecord({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    operation: state.settings.operation,
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
    focusFactor: state.settings.focusFactor,
    minFactor: state.settings.minFactor,
    maxFactor: state.settings.maxFactor,
    additionDifficulty: state.settings.additionDifficulty,
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
    operation: question.operation || "multiplication",
    symbol: question.symbol || "x",
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
    operation: state.currentQuestion.operation,
    symbol: state.currentQuestion.symbol,
    equation: `${state.currentQuestion.left} ${state.currentQuestion.symbol} ${state.currentQuestion.right}`,
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
    state.session.attempted += 1;
    state.session.skipped += 1;
    state.session.streak = 0;
    state.progress.totalAttempted += 1;
    if (sparMode) {
      state.session.sparStrikes += 1;
    }
    updateDailyRecordForAttempt(false);
    updateFactProgress(state.currentQuestion, false, null);
    updateBucketDailyProgress(state.currentQuestion, false);
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
    updateBucketDailyProgress(state.currentQuestion, isCorrect);
    registerRecentAnswer(answerValue, evaluation, false, responseTimeMs);
  }

  queueProgressSave();
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

function canUseNegativeInput() {
  return Boolean(state.settings?.negativesMode);
}

function handlePracticeKeypadClick(event) {
  const button = event.target.closest("[data-keypad-key]");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const key = button.dataset.keypadKey;
  if (!key) {
    return;
  }

  if (key === "enter") {
    if (state.active && !state.countingDown && state.currentQuestion) {
      elements.answerForm.requestSubmit();
    }
    return;
  }

  if (!state.active || state.countingDown || !state.currentQuestion) {
    return;
  }

  let nextValue = elements.answerInput.value;

  if (key === "backspace") {
    nextValue = nextValue.slice(0, -1);
  } else if (key === "-") {
    if (!canUseNegativeInput()) {
      return;
    }
    nextValue = nextValue.startsWith("-") ? nextValue.slice(1) : `-${nextValue}`;
  } else if (/^\d$/.test(key)) {
    nextValue = `${nextValue}${key}`;
  } else {
    return;
  }

  elements.answerInput.value = nextValue;
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
        .filter(
          (record) =>
            record.modeKey === latestRecord.modeKey &&
            (record.operation || "multiplication") ===
              (latestRecord.operation || "multiplication"),
        )
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
    titleMessage = "A journey of a thousand miles begins with one step.";
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
  state.questionPool = [];
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
  syncRecordsModeOptions();
  renderWorkoutHistory();
  renderCoachTip();
  renderTableRadar();
  renderCalendars();
  renderStreakPanel();
  renderResults(reason);
  state.resultsSlideIndex = 0;
  renderResultsCarousel();
  resetSetupForNextWorkout();
  renderSetupPreview();
  showView("results");
}

function handleFinishSession() {
  if (!state.active || state.countingDown) {
    return;
  }

  elements.endWorkoutDialog.showModal();
}

function getOperationFilterValue(selectElement, fallback = "all") {
  if (!(selectElement instanceof HTMLSelectElement)) {
    return fallback;
  }

  const value = selectElement.value;
  return value === "addition" || value === "multiplication" || value === "all"
    ? value
    : fallback;
}

function getOverviewOperationFilterValue() {
  return getOperationFilterValue(elements.overviewOperationFilter, "all");
}

function getFocusOperationFilterValue() {
  return getOperationFilterValue(elements.focusOperationFilter, "all");
}

function getCoachOperationFilterValue() {
  return getOperationFilterValue(elements.coachOperationFilter, "all");
}

function getFactOperationFilterValue() {
  if (!elements.factOperationFilter) {
    return "multiplication";
  }
  return elements.factOperationFilter.value === "addition" ? "addition" : "multiplication";
}

function syncFactDetailFilterOptions() {
  if (!elements.factDetailFilter) {
    return;
  }

  const operation = getFactOperationFilterValue();
  const definitions =
    operation === "addition"
      ? FACT_TRACKER_DETAIL_OPTIONS.addition
      : FACT_TRACKER_DETAIL_OPTIONS.multiplication;
  const previousValue = elements.factDetailFilter.value;

  elements.factDetailFilter.innerHTML = definitions
    .map((definition) => `<option value="${definition.key}">${definition.label}</option>`)
    .join("");
  elements.factDetailFilter.value = definitions.some((definition) => definition.key === previousValue)
    ? previousValue
    : definitions[0].key;
}

function getFactDetailFilterValue() {
  const operation = getFactOperationFilterValue();
  const definitions =
    operation === "addition"
      ? FACT_TRACKER_DETAIL_OPTIONS.addition
      : FACT_TRACKER_DETAIL_OPTIONS.multiplication;
  const fallback = definitions[0]?.key || "overall";
  if (!elements.factDetailFilter) {
    return fallback;
  }

  const value = elements.factDetailFilter.value;
  return definitions.some((definition) => definition.key === value) ? value : fallback;
}

function getRecordsOperationFilterValue() {
  if (!elements.recordsOperationSelect) {
    return "all";
  }
  const value = elements.recordsOperationSelect.value;
  return value === "addition" || value === "multiplication" || value === "all"
    ? value
    : "all";
}

function matchesOperationFilter(operation, filterValue) {
  return filterValue === "all" ? true : operation === filterValue;
}

function getFactEntriesByOperation(filterValue = "all") {
  return Object.entries(state.progress.facts)
    .map(([key, value]) => {
      const parsed = parseFactKey(key);
      const progress = getFactProgress(key);
      return {
        key,
        ...parsed,
        ...progress,
        operation: progress.operation || parsed.operation || "multiplication",
        symbol: progress.symbol || parsed.symbol || "x",
      };
    })
    .filter((entry) => matchesOperationFilter(entry.operation, filterValue));
}

function getWorkoutHistoryByOperation(filterValue = "all") {
  return state.progress.workoutHistory.filter((record) =>
    matchesOperationFilter(record.operation || "multiplication", filterValue),
  );
}

function prefersTouchKeypad() {
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const maxSide = Math.max(window.innerWidth, window.innerHeight);
  return coarsePointer && maxSide >= 768;
}

function shouldUseTouchKeypad() {
  if (state.keypadPreference === "always-on") {
    return true;
  }
  if (state.keypadPreference === "always-off") {
    return false;
  }
  return prefersTouchKeypad();
}

function updatePracticeInputMode() {
  state.useTouchKeypad = shouldUseTouchKeypad();
  if (elements.practiceKeypad) {
    elements.practiceKeypad.classList.toggle("is-hidden", !state.useTouchKeypad);
  }
  if (elements.answerInput) {
    elements.answerInput.readOnly = state.useTouchKeypad;
  }
}

function getBestAttemptsInDay(records) {
  const totalsByDay = {};

  records.forEach((record) => {
    const key = record.dateKey || getTodayDateKey();
    totalsByDay[key] = (totalsByDay[key] || 0) + Number(record.attempted || 0);
  });

  return Object.values(totalsByDay).reduce((best, value) => Math.max(best, value), 0);
}

function getOverallStats(filterValue = "all") {
  const factEntries = getFactEntriesByOperation(filterValue);
  const workoutHistory = getWorkoutHistoryByOperation(filterValue);
  const totals = factEntries.reduce(
    (summary, entry) => {
      summary.attempted += entry.attempts;
      summary.correct += entry.correct;
      summary.bestStreak = Math.max(summary.bestStreak, entry.bestStreak || 0);
      return summary;
    },
    { attempted: 0, correct: 0, bestStreak: 0 },
  );

  let fastestAverageMs = null;
  workoutHistory.forEach((record) => {
    if (record.averageMs === null || record.averageMs === undefined) {
      return;
    }
    fastestAverageMs =
      fastestAverageMs === null ? record.averageMs : Math.min(fastestAverageMs, record.averageMs);
  });

  return {
    attempted: totals.attempted,
    correct: totals.correct,
    bestStreak: totals.bestStreak,
    fastestAverageMs,
    workoutsCompleted: workoutHistory.length,
    bestAttemptsInDay: getBestAttemptsInDay(workoutHistory),
  };
}

function renderOverall() {
  const filterValue = getOverviewOperationFilterValue();
  const stats = getOverallStats(filterValue);
  const accuracy = getAccuracy(stats.correct, stats.attempted);
  elements.overallAnswered.textContent = `${stats.attempted}`;
  elements.overallAccuracy.textContent = formatPercent(accuracy);
  elements.overallBestStreak.textContent = `${stats.bestStreak}`;
  elements.overallBestPace.textContent = formatQuestionDuration(stats.fastestAverageMs);
  elements.overallWorkoutCount.textContent = `${stats.workoutsCompleted}`;
  elements.overallBestDayAttempts.textContent = `${stats.bestAttemptsInDay}`;
}

function getRecordsModeSortValue(record, modeKey) {
  if (modeKey === "timed") {
    return [record.correct, record.accuracy, record.attempted, -(record.averageMs ?? Number.MAX_SAFE_INTEGER)];
  }

  if (modeKey === "question-goal") {
    return [record.accuracy, -(record.averageMs ?? Number.MAX_SAFE_INTEGER), record.correct, record.bestStreak];
  }

  if (modeKey === "isolation") {
    return [record.accuracy, record.correct, -(record.averageMs ?? Number.MAX_SAFE_INTEGER), record.bestStreak];
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

function getRecordModeDefinitions(filterOperation) {
  if (filterOperation === "addition" || filterOperation === "multiplication") {
    return WORKOUT_MODE_DEFINITIONS[filterOperation];
  }

  const merged = new Map();
  Object.values(WORKOUT_MODE_DEFINITIONS).forEach((definitions) => {
    definitions.forEach((item) => {
      if (!merged.has(item.key)) {
        merged.set(item.key, item);
      }
    });
  });
  return Array.from(merged.values());
}

function syncRecordsModeOptions() {
  if (!elements.recordsModeSelect) {
    return;
  }

  const operationFilter = getRecordsOperationFilterValue();
  const definitions = getRecordModeDefinitions(operationFilter);
  const previousValue = elements.recordsModeSelect.value;

  elements.recordsModeSelect.innerHTML = definitions
    .map((item) => `<option value="${item.key}">${item.label}</option>`)
    .join("");

  const nextValue = definitions.some((item) => item.key === previousValue)
    ? previousValue
    : definitions[0]?.key || "timed";
  elements.recordsModeSelect.value = nextValue;
}

function renderPersonalBests() {
  if (!elements.personalBestsList || !elements.recordsModeSelect) {
    return;
  }

  syncRecordsModeOptions();
  const operationFilter = getRecordsOperationFilterValue();
  const selectedMode = elements.recordsModeSelect.value || "timed";
  const bests = getWorkoutHistoryByOperation(operationFilter)
    .filter((record) => record.modeKey === selectedMode)
    .sort((left, right) => compareWorkoutRecords(left, right, selectedMode))
    .slice(0, 3);

  if (!bests.length) {
    const operationLabel =
      operationFilter === "all" ? "selected operation set" : getOperationLabel(operationFilter);
    elements.personalBestsList.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">No records yet for ${operationLabel} in this workout type.</div>
      </div>
    `;
    return;
  }

  elements.personalBestsList.innerHTML = bests
    .map((record, index) => `
      <article class="focus-card record-card">
        <div class="focus-card-top">
          <div class="fact-name">#${index + 1} ${getWorkoutModeLabel(record)}</div>
          <div class="focus-chip success-chip">${record.correct} correct</div>
        </div>
        <div class="fact-meta">${getOperationLabel(record.operation || "multiplication")}${
          record.operation === "addition" ? ` (${record.additionDifficulty})` : ""
        }</div>
        <div class="fact-meta">${formatRecordDateLabel(record)}</div>
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

  const operationFilter = getRecordsOperationFilterValue();
  const selectedMode = elements.recordsModeSelect?.value || "timed";
  const recent = getWorkoutHistoryByOperation(operationFilter)
    .filter((record) => record.modeKey === selectedMode)
    .slice(0, 5);

  if (!recent.length) {
    elements.recentWorkoutsList.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">No recent workouts match these filters yet.</div>
      </div>
    `;
    return;
  }

  elements.recentWorkoutsList.innerHTML = recent
    .map((record) => `
      <article class="focus-card record-card">
        <div class="focus-card-top">
          <div class="fact-name">${getWorkoutModeLabel(record)}</div>
          <div class="focus-chip subtle-chip">${formatRecordDateLabel(record)}</div>
        </div>
        <div class="fact-meta">${getOperationLabel(record.operation || "multiplication")}${
          record.operation === "addition" ? ` (${record.additionDifficulty})` : ""
        }</div>
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

function getTroubleFacts(limit = 5, filterValue = "all") {
  return getFactEntriesByOperation(filterValue)
    .map((value) => ({
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
      let chipLabel = "Low Accuracy";

      if (fact.attempts <= 1 && fact.correct === 0) {
        chipLabel = "Fresh Miss";
      } else if (fact.mastery < 0.45) {
        chipLabel = "Needs Reps";
      } else if (fact.misses >= 3) {
        chipLabel = "Sticking Point";
      }

      return `
        <article class="focus-card">
          <div class="focus-card-top">
            <div class="fact-name">${formatFactLabelFromKey(fact.key)}</div>
            <div class="focus-chip">${chipLabel}</div>
          </div>
          <div class="fact-meta">${fact.correct} / ${fact.attempts} correct</div>
          <div class="fact-meta">${Math.round(fact.mastery * 100)}% accuracy</div>
        </article>
      `;
    })
    .join("");
}

function getBucketLabel(operation, bucketKey) {
  if (operation === "addition") {
    return ADDITION_TRACKER_BUCKETS.find((bucket) => bucket.key === bucketKey)?.label || bucketKey;
  }

  if (operation === "multiplication") {
    return /^x\d+$/.test(bucketKey) ? bucketKey.replace("x", "x ") : bucketKey;
  }

  return bucketKey;
}

function getBucketStatus(attempts, accuracy) {
  if (!attempts) {
    return { tone: "unseen", label: "No reps yet" };
  }

  if (
    attempts >= BUCKET_STATUS_STRONG_MIN_ATTEMPTS &&
    accuracy >= BUCKET_STATUS_STRONG_MIN_ACCURACY
  ) {
    return { tone: "strong", label: "Strong" };
  }

  if (
    attempts >= BUCKET_STATUS_MIN_ATTEMPTS &&
    accuracy >= BUCKET_STATUS_BUILDING_MIN_ACCURACY
  ) {
    return { tone: "steady", label: "Building" };
  }

  return { tone: "needs", label: "Need Reps" };
}

function createBucketDailyKey(dateKey, operation, bucketKey) {
  return `${dateKey}|${operation}|${bucketKey}`;
}

function parseBucketDailyKey(key) {
  const [dateKey = "", operation = "multiplication", ...rest] = String(key).split("|");
  return {
    dateKey,
    operation: operation === "addition" ? "addition" : "multiplication",
    bucketKey: rest.join("|"),
  };
}

function getBucketsForQuestion(question) {
  if (!question) {
    return [];
  }

  if (question.operation === "addition") {
    return [getAdditionTrackerBucketKey(question.a, question.b)];
  }

  if (question.operation === "multiplication") {
    const factors = new Set([Math.abs(question.a), Math.abs(question.b)]);
    return Array.from(factors)
      .filter((factor) => factor >= 1 && factor <= FACTOR_LIMIT)
      .map((factor) => `x${factor}`);
  }

  return [];
}

function updateBucketDailyProgress(question, isCorrect) {
  const dateKey = getTodayDateKey();
  const buckets = getBucketsForQuestion(question);
  if (!buckets.length) {
    return;
  }

  state.progress.bucketDaily = state.progress.bucketDaily || {};
  if (question.operation === "addition") {
    updateAdditionBucketExamples(question, isCorrect);
  }
  buckets.forEach((bucketKey) => {
    const storageKey = createBucketDailyKey(dateKey, question.operation, bucketKey);
    const current = normaliseBucketDailyEntry(state.progress.bucketDaily[storageKey] || {});
    state.progress.bucketDaily[storageKey] = {
      attempted: current.attempted + 1,
      correct: current.correct + (isCorrect ? 1 : 0),
    };
  });
}

function updateAdditionBucketExamples(question, isCorrect) {
  if (!question || question.operation !== "addition") {
    return;
  }

  const bucketKey = getAdditionTrackerBucketKey(question.a, question.b);
  if (!ADDITION_TRACKER_BUCKET_KEYS.has(bucketKey)) {
    return;
  }

  state.progress.additionBucketExamples = state.progress.additionBucketExamples || {};
  const existingExamples = Array.isArray(state.progress.additionBucketExamples[bucketKey])
    ? state.progress.additionBucketExamples[bucketKey]
    : [];
  const byFact = new Map(existingExamples.map((entry) => [entry.factKey, entry]));
  const existing = byFact.get(question.key);
  const now = Date.now();
  const nextAttempts = clampNumber(Number(existing?.attempts ?? 0) + 1, 0, 9999, 1);
  const nextCorrect = clampNumber(
    Number(existing?.correct ?? 0) + (isCorrect ? 1 : 0),
    0,
    nextAttempts,
    0,
  );

  byFact.set(question.key, {
    factKey: question.key,
    left: question.a,
    right: question.b,
    regrouping: hasAdditionRegrouping(question.a, question.b),
    attempts: nextAttempts,
    correct: nextCorrect,
    lastSeenAt: now,
  });

  state.progress.additionBucketExamples[bucketKey] = Array.from(byFact.values())
    .sort((left, right) => right.lastSeenAt - left.lastSeenAt)
    .slice(0, ADDITION_BUCKET_EXAMPLE_CAP);
}

function buildBucketTrendItem(operation, bucketKey) {
  const todayKey = getTodayDateKey();
  const total = { attempted: 0, correct: 0 };

  Object.entries(state.progress.bucketDaily || {}).forEach(([storageKey, record]) => {
    const parsed = parseBucketDailyKey(storageKey);
    if (parsed.operation !== operation || parsed.bucketKey !== bucketKey) {
      return;
    }
    const normalised = normaliseBucketDailyEntry(record);
    total.attempted += normalised.attempted;
    total.correct += normalised.correct;
  });

  const lastWindow = { attempted: 0, correct: 0 };
  const previousWindow = { attempted: 0, correct: 0 };

  for (let index = 0; index < BUCKET_TREND_WINDOW_DAYS; index += 1) {
    const lastDateKey = shiftDateKey(todayKey, -index);
    const previousDateKey = shiftDateKey(todayKey, -(index + BUCKET_TREND_WINDOW_DAYS));

    const lastEntry = normaliseBucketDailyEntry(
      state.progress.bucketDaily?.[createBucketDailyKey(lastDateKey, operation, bucketKey)] || {},
    );
    const previousEntry = normaliseBucketDailyEntry(
      state.progress.bucketDaily?.[
        createBucketDailyKey(previousDateKey, operation, bucketKey)
      ] || {},
    );

    lastWindow.attempted += lastEntry.attempted;
    lastWindow.correct += lastEntry.correct;
    previousWindow.attempted += previousEntry.attempted;
    previousWindow.correct += previousEntry.correct;
  }

  const totalAccuracy = getAccuracy(total.correct, total.attempted);
  const lastAccuracy = getAccuracy(lastWindow.correct, lastWindow.attempted);
  const previousAccuracy = getAccuracy(previousWindow.correct, previousWindow.attempted);
  const status = getBucketStatus(total.attempted, totalAccuracy);

  return {
    operation,
    bucketKey,
    label: getBucketLabel(operation, bucketKey),
    totalAttempted: total.attempted,
    totalCorrect: total.correct,
    totalAccuracy,
    lastAttempted: lastWindow.attempted,
    lastCorrect: lastWindow.correct,
    lastAccuracy,
    previousAttempted: previousWindow.attempted,
    previousCorrect: previousWindow.correct,
    previousAccuracy,
    delta: lastAccuracy - previousAccuracy,
    status,
  };
}

function getBucketTrendItems(filterValue = "all") {
  const operations =
    filterValue === "all" ? ["multiplication", "addition"] : [filterValue];
  const items = [];

  operations.forEach((operation) => {
    if (operation === "multiplication") {
      TABLE_FACTORS.forEach((factor) => {
        items.push(buildBucketTrendItem("multiplication", `x${factor}`));
      });
      return;
    }

    ADDITION_TRACKER_BUCKETS.forEach((bucket) => {
      items.push(buildBucketTrendItem("addition", bucket.key));
    });
  });

  return items;
}

function getPositiveProgressItems(limit = 3, filterValue = "all") {
  return getBucketTrendItems(filterValue)
    .filter(
      (item) =>
        item.totalAttempted >= BUCKET_TREND_MIN_TOTAL_ATTEMPTS &&
        item.lastAttempted >= BUCKET_TREND_MIN_RECENT_ATTEMPTS &&
        item.delta >= BUCKET_TREND_DELTA_THRESHOLD,
    )
    .sort(
      (left, right) =>
        right.delta - left.delta ||
        right.lastAccuracy - left.lastAccuracy ||
        right.totalAttempted - left.totalAttempted,
    )
    .slice(0, limit);
}

function getGrowthOpportunityItems(limit = 4, filterValue = "all") {
  return getBucketTrendItems(filterValue)
    .filter(
      (item) =>
        item.totalAttempted >= BUCKET_TREND_MIN_TOTAL_ATTEMPTS &&
        item.lastAttempted >= BUCKET_TREND_MIN_RECENT_ATTEMPTS &&
        (item.delta <= -BUCKET_TREND_DELTA_THRESHOLD || item.lastAccuracy < 0.7),
    )
    .sort(
      (left, right) =>
        left.delta - right.delta ||
        left.lastAccuracy - right.lastAccuracy ||
        right.totalAttempted - left.totalAttempted,
    )
    .slice(0, limit);
}

function formatBucketTrendDelta(delta) {
  const percent = Math.round(delta * 100);
  if (percent > 0) {
    return `+${percent}% vs prior week`;
  }
  if (percent < 0) {
    return `${percent}% vs prior week`;
  }
  return "No change vs prior week";
}

function renderGrowthList(target, items) {
  if (!target) {
    return;
  }

  if (!items.length) {
    target.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">Growth opportunities will appear once bucket trends settle in.</div>
      </div>
    `;
    return;
  }

  target.innerHTML = items
    .map((item) => `
      <article class="focus-card">
        <div class="focus-card-top">
          <div class="fact-name">${item.label}</div>
          <div class="focus-chip warning-chip">${item.status.label}</div>
        </div>
        <div class="fact-meta">${item.operation === "addition" ? "Addition bucket" : "Multiplication table"}</div>
        <div class="fact-meta">Last 7 days: ${item.lastCorrect} / ${item.lastAttempted} (${formatPercent(item.lastAccuracy)})</div>
        <div class="fact-meta">${formatBucketTrendDelta(item.delta)}</div>
      </article>
    `)
    .join("");
}

function renderPositiveProgressList(target, items) {
  if (!target) {
    return;
  }

  if (!items.length) {
    target.innerHTML = `
      <div class="focus-card empty-state">
        <div class="fact-meta">Positive progress buckets will appear after a few days of reps.</div>
      </div>
    `;
    return;
  }

  target.innerHTML = items
    .map((item) => `
      <article class="focus-card">
        <div class="focus-card-top">
          <div class="fact-name">${item.label}</div>
          <div class="focus-chip success-chip">${item.status.label}</div>
        </div>
        <div class="fact-meta">${item.operation === "addition" ? "Addition bucket" : "Multiplication table"}</div>
        <div class="fact-meta">Overall: ${item.totalCorrect} / ${item.totalAttempted} (${formatPercent(item.totalAccuracy)})</div>
        <div class="fact-meta">${formatBucketTrendDelta(item.delta)}</div>
      </article>
    `)
    .join("");
}

function renderProgressFocusAreas() {
  const filterValue = getFocusOperationFilterValue();
  const troubleFacts = getTroubleFacts(5, filterValue);
  const growthItems = getGrowthOpportunityItems(4, filterValue);
  const positiveItems = getPositiveProgressItems(3, filterValue);

  renderPositiveProgressList(elements.progressWinsList, positiveItems);
  renderGrowthList(elements.progressGrowthList, growthItems);
  renderPriorityList(elements.progressPriorityList, troubleFacts);
}

function renderResultsFocusAreas() {
  const filterValue = "all";
  const troubleFacts = getTroubleFacts(5, filterValue);
  const growthItems = getGrowthOpportunityItems(4, filterValue);
  const positiveItems = getPositiveProgressItems(3, filterValue);

  renderPositiveProgressList(elements.resultsWinsList, positiveItems);
  renderGrowthList(elements.resultsGrowthList, growthItems);
  renderPriorityList(elements.resultsPriorityList, troubleFacts);
}

function renderFocusAreas() {
  renderResultsFocusAreas();
  renderProgressFocusAreas();
}

function renderCoachTip() {
  const filterValue = getCoachOperationFilterValue();
  const stats = getOverallStats(filterValue);
  const totalAttempted = stats.attempted;
  const troubleFacts = getTroubleFacts(1, filterValue);

  if (!totalAttempted) {
    elements.coachTip.innerHTML =
      "<strong>Start simple.</strong> A short workout is enough to give the trainer a baseline.";
    return;
  }

  if (troubleFacts.length) {
    const factLabel = formatFactLabelFromKey(troubleFacts[0].key);
    elements.coachTip.innerHTML = `<strong>Next best target:</strong> spend a few rounds on <strong>${factLabel}</strong> and nearby facts. That pair is costing you the most right now.`;
    return;
  }

  if (stats.bestStreak >= 15) {
    elements.coachTip.innerHTML =
      "<strong>You have momentum.</strong> Push the range wider, try a timed workout, or stretch things out with Free Training.";
    return;
  }

  elements.coachTip.innerHTML =
    "<strong>Consistency wins.</strong> Lock in the star first, then chase the heart with cleaner answers.";
}

function parseFactKey(key) {
  if (typeof key !== "string") {
    return {
      operation: "multiplication",
      symbol: "x",
      left: 0,
      right: 0,
      leftMagnitude: 0,
      rightMagnitude: 0,
    };
  }

  const modernMatch = key.match(/^(multiplication|addition):(-?\d+)([x+])(-?\d+)$/i);
  if (modernMatch) {
    const operation = modernMatch[1] === "addition" ? "addition" : "multiplication";
    const left = Number(modernMatch[2]);
    const symbol = modernMatch[3] === "+" ? "+" : "x";
    const right = Number(modernMatch[4]);
    return {
      operation,
      symbol,
      left,
      right,
      leftMagnitude: Math.abs(left),
      rightMagnitude: Math.abs(right),
    };
  }

  const legacyMatch = key.match(/^(-?\d+)x(-?\d+)$/i);
  const left = legacyMatch ? Number(legacyMatch[1]) : 0;
  const right = legacyMatch ? Number(legacyMatch[2]) : 0;
  return {
    operation: "multiplication",
    symbol: "x",
    left,
    right,
    leftMagnitude: Math.abs(left),
    rightMagnitude: Math.abs(right),
  };
}

function formatFactLabelFromKey(key) {
  const parsed = parseFactKey(key);
  return `${parsed.left} ${parsed.symbol} ${parsed.right}`;
}

function getTableStatus(table) {
  return getBucketStatus(table.attempts, table.accuracy);
}

function getMultiplicationFactEntries() {
  return Object.entries(state.progress.facts)
    .map(([key]) => ({
      key,
      progress: getFactProgress(key),
      ...parseFactKey(key),
    }))
    .filter((entry) => entry.operation === "multiplication");
}

function getSignedFactGroupKey(entry) {
  const left = `${entry.left >= 0 ? "+" : "-"}${entry.leftMagnitude}`;
  const right = `${entry.right >= 0 ? "+" : "-"}${entry.rightMagnitude}`;
  return [left, right].sort().join("x");
}

function getTableStats(detailMode = "overall") {
  const trackerMode =
    detailMode === "positive" || detailMode === "all-integers" ? detailMode : "overall";
  const allFactEntries = getMultiplicationFactEntries();
  const factEntries =
    trackerMode === "positive"
      ? allFactEntries.filter((entry) => entry.left >= 0 && entry.right >= 0)
      : allFactEntries;

  return TABLE_FACTORS.map((factor) => {
    const relatedEntries = factEntries.filter(
      (entry) => entry.leftMagnitude === factor || entry.rightMagnitude === factor,
    );
    const seenGroupKeys = new Set(
      relatedEntries.map((entry) => {
        if (trackerMode === "all-integers") {
          return getSignedFactGroupKey(entry);
        }
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
    const totalFacts =
      trackerMode === "all-integers" ? MULTIPLICATION_SIGNED_TOTAL_FACTS : TABLE_FACTORS.length;
    const detailLabel =
      trackerMode === "all-integers"
        ? `${seenGroupKeys.size}/${totalFacts} signed facts`
        : trackerMode === "positive"
          ? `${seenGroupKeys.size}/${totalFacts} positive facts`
          : `${seenGroupKeys.size}/${totalFacts} fact groups`;

    return {
      factor,
      totalFacts,
      detailLabel,
      accuracy,
      seenFacts: seenGroupKeys.size,
      ...totals,
      ...getTableStatus({
        attempts: totals.attempts,
        accuracy,
      }),
    };
  });
}

function getDigitBucket(value) {
  const magnitude = Math.abs(Number(value));
  if (magnitude <= 9) {
    return 1;
  }
  if (magnitude <= 99) {
    return 2;
  }
  return 3;
}

function hasAdditionRegrouping(left, right) {
  const sum = left + right;
  if (sum === 10) {
    return false;
  }

  let carry = 0;
  let a = Math.abs(left);
  let b = Math.abs(right);

  while (a > 0 || b > 0) {
    const column = (a % 10) + (b % 10) + carry;
    if (column >= 10) {
      return true;
    }
    carry = Math.floor(column / 10);
    a = Math.floor(a / 10);
    b = Math.floor(b / 10);
  }

  return false;
}

function getAdditionTrackerBucketKey(left, right) {
  const sum = left + right;
  if (sum === 10 && !(left === 0 && right === 0)) {
    return "make-10";
  }

  const first = getDigitBucket(left);
  const second = getDigitBucket(right);
  const low = Math.min(first, second);
  const high = Math.max(first, second);
  return `${low}-${high}`;
}

function buildAdditionTrackerStats() {
  const summary = Object.fromEntries(
    ADDITION_TRACKER_BUCKETS.map((bucket) => [
      bucket.key,
      {
        attempts: 0,
        correct: 0,
        regroupAttempts: 0,
        regroupCorrect: 0,
        noRegroupAttempts: 0,
        noRegroupCorrect: 0,
      },
    ]),
  );

  const additionFacts = getFactEntriesByOperation("addition");
  additionFacts.forEach((fact) => {
    if (!fact.attempts) {
      return;
    }

    const bucketKey = getAdditionTrackerBucketKey(fact.left, fact.right);
    if (!summary[bucketKey]) {
      return;
    }

    const bucket = summary[bucketKey];
    bucket.attempts += fact.attempts;
    bucket.correct += fact.correct;

    const regrouping = hasAdditionRegrouping(fact.left, fact.right);
    if (regrouping) {
      bucket.regroupAttempts += fact.attempts;
      bucket.regroupCorrect += fact.correct;
    } else {
      bucket.noRegroupAttempts += fact.attempts;
      bucket.noRegroupCorrect += fact.correct;
    }
  });

  return summary;
}

function getRatioLabel(correct, attempts) {
  if (!attempts) {
    return "No attempts yet";
  }
  return `${correct} / ${attempts} (${formatPercent(getAccuracy(correct, attempts))})`;
}

function getAdditionMetricSummary(bucket, detailMode) {
  if (detailMode === "with-regrouping") {
    return {
      key: "with-regrouping",
      label: "With regrouping",
      attempts: bucket.regroupAttempts,
      correct: bucket.regroupCorrect,
    };
  }

  if (detailMode === "without-regrouping") {
    return {
      key: "without-regrouping",
      label: "Without regrouping",
      attempts: bucket.noRegroupAttempts,
      correct: bucket.noRegroupCorrect,
    };
  }

  return {
    key: "overall",
    label: "Overall",
    attempts: bucket.attempts,
    correct: bucket.correct,
  };
}

function getAdditionBucketExamples(bucketKey, detailMode = "overall") {
  const source = Array.isArray(state.progress.additionBucketExamples?.[bucketKey])
    ? state.progress.additionBucketExamples[bucketKey]
    : [];

  const filtered =
    detailMode === "with-regrouping"
      ? source.filter((entry) => entry.regrouping)
      : detailMode === "without-regrouping"
        ? source.filter((entry) => !entry.regrouping)
        : source;

  return filtered.slice(0, ADDITION_BUCKET_EXAMPLE_DISPLAY_LIMIT);
}

function renderAdditionTracker(detailMode = "overall") {
  const activeMode =
    detailMode === "with-regrouping" || detailMode === "without-regrouping"
      ? detailMode
      : "overall";
  const statsByBucket = buildAdditionTrackerStats();
  elements.tableGrid.classList.add("addition-table-grid");

  elements.tableGrid.innerHTML = ADDITION_TRACKER_BUCKETS.map((bucketMeta) => {
    const bucket = statsByBucket[bucketMeta.key];
    const metric = getAdditionMetricSummary(bucket, activeMode);
    const ratio = metric.attempts ? metric.correct / metric.attempts : 0;
    const status = getBucketStatus(metric.attempts, ratio);
    const examples = getAdditionBucketExamples(bucketMeta.key, activeMode);
    const examplesSummary = examples.length
      ? examples.map((entry) => `${entry.left} + ${entry.right}`).join(" | ")
      : "No recent examples yet";

    return `
      <article class="table-card ${status.tone}">
        <div class="table-card-top">
          <div class="table-name">${bucketMeta.label}</div>
          <span class="table-pill ${status.tone}">${status.label}</span>
        </div>
        <div class="fact-meta table-card-middle">${metric.label}</div>
        <div class="bar-track" aria-hidden="true">
          <div class="bar-fill ${status.tone}" style="width: ${Math.round(ratio * 100)}%"></div>
        </div>
        <div class="table-card-stats">
          <span>${getRatioLabel(metric.correct, metric.attempts)}</span>
        </div>
        <div class="fact-meta">Recent examples: ${examplesSummary}</div>
      </article>
    `;
  }).join("");
}

function getAdditionTechniqueGridMarkup() {
  return ADDITION_LESSONS.map(
    (lesson) => `
      <button
        class="technique-card ${lesson.status === "under-construction" ? "is-building" : ""}"
        type="button"
        data-addition-technique="${lesson.id}"
        ${lesson.selectable ? "" : "disabled"}
      >
        <span class="technique-card-pill">${
          lesson.status === "under-construction" ? "Under Construction" : "Coming Soon"
        }</span>
        <strong>${lesson.title}</strong>
        <span class="technique-card-note">${lesson.description}</span>
      </button>
    `,
  ).join("");
}

function renderTableRadar() {
  const factOperation = getFactOperationFilterValue();
  const factDetail = getFactDetailFilterValue();
  elements.tableGrid.classList.remove("addition-table-grid");
  if (elements.factsSlideTitle) {
    const operationCopy =
      factOperation === "addition"
        ? "addition"
        : factOperation === "multiplication"
          ? "multiplication"
          : "";
    elements.factsSlideTitle.textContent = operationCopy
      ? `Track the development of your ${operationCopy} skills.`
      : "Track the development of your skills.";
  }

  if (factOperation === "addition") {
    renderAdditionTracker(factDetail);
    return;
  }

  const tableStats = getTableStats(factDetail);
  if (!tableStats.some((table) => table.attempts > 0)) {
    const emptyDetailCopy =
      factDetail === "positive"
        ? "No positive-integer attempts yet."
        : factDetail === "all-integers"
          ? "No signed-integer attempts yet."
          : "The fact tracker fills in after you answer a few facts.";
    elements.tableGrid.innerHTML = `
      <div class="table-card unseen">
        <div class="table-name">Start a workout</div>
        <div class="fact-meta">${emptyDetailCopy}</div>
      </div>
    `;
    return;
  }

  elements.tableGrid.innerHTML = tableStats
    .map((table) => {
      const accuracyLabel = table.attempts
        ? `${formatPercent(table.accuracy)} accuracy`
        : "No attempts yet";
      const detailLabel = table.attempts ? table.detailLabel : "Fresh range";

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
    if (record.attempted || record.correct || record.sessionsCompleted) {
      classes.push("has-activity");
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
    const isActiveSlide =
      slide.dataset.resultsSlide === RESULTS_SLIDES[state.resultsSlideIndex];
    slide.classList.toggle("is-active", isActiveSlide);
    slide.setAttribute("aria-hidden", isActiveSlide ? "false" : "true");
  });

  const atStart = state.resultsSlideIndex === 0;
  const atEnd = state.resultsSlideIndex === RESULTS_SLIDES.length - 1;
  elements.resultsPrevButton.hidden = false;
  elements.resultsNextButton.hidden = false;
  elements.resultsPrevButton.disabled = atStart;
  elements.resultsNextButton.disabled = atEnd;
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
    const isActiveSlide =
      slide.dataset.progressSlide === PROGRESS_SLIDES[state.progressSlideIndex];
    slide.classList.toggle("is-active", isActiveSlide);
    slide.setAttribute("aria-hidden", isActiveSlide ? "false" : "true");
  });

  const atStart = state.progressSlideIndex === 0;
  const atEnd = state.progressSlideIndex === PROGRESS_SLIDES.length - 1;
  elements.progressPrevButton.hidden = false;
  elements.progressNextButton.hidden = false;
  elements.progressPrevButton.disabled = atStart;
  elements.progressNextButton.disabled = atEnd;
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

function handleSettingsChange(event) {
  const changedField =
    event?.target?.id === "minFactor" ? "min" : event?.target?.id === "maxFactor" ? "max" : "";
  if (changedField) {
    syncIsolationRangeControls(changedField);
  }
  toggleSetupFields();
  renderSetupPreview();
}

function handleOverviewOperationFilterChange() {
  renderOverall();
}

function handleFocusOperationFilterChange() {
  renderProgressFocusAreas();
}

function handleCoachOperationFilterChange() {
  renderCoachTip();
}

function handleFactOperationFilterChange() {
  syncFactDetailFilterOptions();
  renderTableRadar();
}

function handleFactDetailFilterChange() {
  renderTableRadar();
}

function handleRecordsFilterChange() {
  syncRecordsModeOptions();
  renderWorkoutHistory();
}

function handleThemeChange(event) {
  const select = event.target;
  if (!(select instanceof HTMLSelectElement)) {
    return;
  }
  const theme = sanitiseTheme(select.value);
  applyTheme(theme);
  saveTheme(theme);
}

function handleKeypadPreferenceChange(event) {
  const select = event.target;
  if (!(select instanceof HTMLSelectElement)) {
    return;
  }
  const preference = sanitiseKeypadPreference(select.value);
  state.keypadPreference = preference;
  saveKeypadPreference(preference);
  updatePracticeInputMode();
}

function resetProgress() {
  const shouldReset = window.confirm("Reset all saved trainer progress on this browser?");
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
  if (elements.appVersion) {
    elements.appVersion.textContent = APP_VERSION;
  }
  applyTheme(state.theme);
  if (elements.keypadPreferenceSelect) {
    elements.keypadPreferenceSelect.value = state.keypadPreference;
  }
  elements.heroMessage.textContent = getHeroMessage();
  state.displayMonthKey = getMonthKey(getCurrentMonthDate());

  resetSetupForNextWorkout();
  updatePracticeInputMode();
  if (elements.overviewOperationFilter) {
    elements.overviewOperationFilter.value = "all";
  }
  if (elements.focusOperationFilter) {
    elements.focusOperationFilter.value = "all";
  }
  if (elements.coachOperationFilter) {
    elements.coachOperationFilter.value = "all";
  }
  if (elements.factOperationFilter) {
    elements.factOperationFilter.value = "multiplication";
  }
  syncFactDetailFilterOptions();
  if (elements.recordsOperationSelect) {
    elements.recordsOperationSelect.value = "all";
  }
  syncRecordsModeOptions();
  renderSetupPreview();
  renderDailyProgress();
  renderOverall();
  renderFocusAreas();
  renderWorkoutHistory();
  renderCoachTip();
  renderTableRadar();
  renderCalendars();
  renderStreakPanel();
  renderResultsCarousel();
  renderProgressCarousel();
  renderPracticeProgress();
  renderSessionTimer();
  renderQuestionTimer(0);
  renderTechniqueScreen();
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
  elements.operationInputs.forEach((input) => {
    input.addEventListener("change", handleSettingsChange);
  });
  elements.sessionTypeInputs.forEach((input) => {
    input.addEventListener("change", handleSettingsChange);
  });
  elements.additionDifficultyInputs.forEach((input) => {
    input.addEventListener("change", handleSettingsChange);
  });
  document.addEventListener("keydown", handleGlobalKeydown);
  elements.answerForm.addEventListener("submit", handleSubmit);
  elements.skipButton.addEventListener("click", handleSkip);
  elements.practiceKeypad?.addEventListener("click", handlePracticeKeypadClick);
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
  elements.cancelExitTechniqueButton.addEventListener("click", cancelTechniqueExit);
  elements.confirmExitTechniqueButton.addEventListener("click", confirmTechniqueExit);
  elements.cancelEndWorkoutButton.addEventListener("click", () => {
    elements.endWorkoutDialog.close();
  });
  elements.confirmEndWorkoutButton.addEventListener("click", () => {
    elements.endWorkoutDialog.close();
    completeSession("manual");
  });
  registerBackdropClose(elements.optionsDialog);
  registerBackdropClose(elements.endWorkoutDialog);
  registerBackdropClose(elements.exitTechniqueDialog);
  elements.exitTechniqueDialog.addEventListener("close", () => {
    state.pendingTechniqueView = null;
  });
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.overviewOperationFilter?.addEventListener("change", handleOverviewOperationFilterChange);
  elements.focusOperationFilter?.addEventListener("change", handleFocusOperationFilterChange);
  elements.coachOperationFilter?.addEventListener("change", handleCoachOperationFilterChange);
  elements.factOperationFilter?.addEventListener("change", handleFactOperationFilterChange);
  elements.factDetailFilter?.addEventListener("change", handleFactDetailFilterChange);
  elements.recordsOperationSelect?.addEventListener("change", handleRecordsFilterChange);
  elements.recordsModeSelect.addEventListener("change", renderWorkoutHistory);
  elements.themeSelect?.addEventListener("change", handleThemeChange);
  elements.keypadPreferenceSelect?.addEventListener("change", handleKeypadPreferenceChange);
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

  elements.techniqueScreenShell.addEventListener("click", handleTechniqueTableClick);
  elements.techniqueScreenShell.addEventListener("click", handleTechniqueLessonClick);
  elements.techniqueScreenShell.addEventListener("change", handleTechniqueMenuChange);
  elements.techniqueScreenShell.addEventListener("submit", handleTechniqueLessonSubmit);
  elements.techniqueScreenShell.addEventListener("input", handleTechniqueInput);
  window.addEventListener("resize", updatePracticeInputMode);

  elements.viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.viewTarget;
      if (targetView) {
        requestView(targetView);
      }
    });
  });
}

initialise();

