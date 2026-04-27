function initialise() {
  if (elements.appVersion) {
    elements.appVersion.textContent = APP_VERSION;
  }
  applyTheme(state.theme);
  applyColorMode(state.colorMode);
  if (elements.keypadPreferenceSelect) {
    elements.keypadPreferenceSelect.value = state.keypadPreference;
  }
  if (elements.colorModeSelect) {
    elements.colorModeSelect.value = state.colorMode;
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
  initialiseCarouselGestures();

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
  elements.operationChoiceGrid?.addEventListener("click", handleOperationResetClick);
  elements.sessionTypeInputs.forEach((input) => {
    input.addEventListener("change", handleSettingsChange);
  });
  elements.additionDifficultyInputs.forEach((input) => {
    input.addEventListener("change", handleSettingsChange);
  });
  document.addEventListener("keydown", handleGlobalKeydown);
  elements.answerForm.addEventListener("submit", handleSubmit);
  elements.answerInput.addEventListener("input", syncKeypadSignToggleState);
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
  elements.colorModeSelect?.addEventListener("change", handleColorModeChange);
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
  elements.techniqueScreenShell.addEventListener("keydown", handleTechniqueLessonKeydown);
  window.addEventListener("resize", () => {
    updatePracticeInputMode();
    renderResultsCarousel();
    renderProgressCarousel();
  });

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

