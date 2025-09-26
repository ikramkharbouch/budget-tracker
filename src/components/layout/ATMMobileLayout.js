import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Imported UI/Layout components
import ProgressBar from "../common/ProgressBar";
import NavigationArrows from "./NavigationArrows";
import BottomCarousel from "./BottomCarousel";
import OnboardingPhaseRenderer from "../onboarding/OnboardingPhaseRenderer";

const ATMMobileLayout = ({
  currentPhase,
  categories,
  selectedCategories,
  categoryExpenses,
  primaryJobIncome,
  targetSavings,
  timeFrame,
  reductionStrategy,
  // Handlers for buttons
  handleGoalClick,
  handleReset,
  handlePreviousPhase,
  handleNextPhase,
  handleCategorySelect,
  handleExpenseChange,
  handlePrimaryJobIncomeChange,
  handleTargetSavingsChange,
  handleTimeFrameChange,
  handleReductionStrategyChange,
  handleIncomeInternalNext,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Combine props for the OnboardingPhaseRenderer
  const phaseRendererProps = {
    currentPhase,
    selectedCategories,
    categoryExpenses,
    primaryJobIncome,
    targetSavings,
    timeFrame,
    reductionStrategy,
    categories,
    handleCategorySelect,
    handlePreviousPhase,
  };

  // Combine props for the BottomCarousel
  const carouselProps = {
    currentPhase,
    categories,
    selectedCategories,
    categoryExpenses,
    primaryJobIncome,
    targetSavings,
    timeFrame,
    reductionStrategy,
    onCategorySelect: handleCategorySelect,
    onExpenseChange: handleExpenseChange,
    onPrimaryJobIncomeChange: (e) =>
      handlePrimaryJobIncomeChange(e.target.value),
    onTargetSavingsChange: (e) => handleTargetSavingsChange(e.target.value),
    onTimeFrameChange: (e) => handleTimeFrameChange(e.target.value),
    onReductionStrategyChange: (e) =>
      handleReductionStrategyChange(e.target.value),
    onIncomeInternalNext: handleIncomeInternalNext,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-6">
        {/* Header/Disclaimer */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {t("mobile.header.title", "Financial Planner")}
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            {t("mobile.header.subtitle", "Plan your budget and savings goals")}
          </p>
          <div className="bg-gray-800 text-white py-3 px-4 rounded-lg text-sm">
            <span
              className="font-bold italic"
              style={{
                fontFamily:
                  '"Bookman Old Style", "Book Antiqua", Georgia, serif',
              }}
            >
              {t("disclaimer.notFinancial", "Not Financial")}{" "}
              {t("disclaimer.advice", "Advice")}
            </span>
          </div>
        </div>

        {/* Progress and Navigation */}
        {currentPhase !== "goal-tracking" &&
          currentPhase !== "simulate-one-year" &&
          currentPhase !== "blog" && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <ProgressBar currentPhase={currentPhase} />
              <NavigationArrows
                currentPhase={currentPhase}
                onPrevious={handlePreviousPhase}
                onNext={handleNextPhase}
                onReset={handleReset}
              />
            </div>
          )}

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <OnboardingPhaseRenderer
            {...phaseRendererProps}
            isMobileCategorySelection={currentPhase === "form-details"}
          />
        </div>

        {/* Bottom Carousel */}
        {currentPhase !== "form-details" &&
          currentPhase !== "goal-tracking" &&
          currentPhase !== "simulate-one-year" && (
            <div className="mb-8">
              <BottomCarousel {...carouselProps} />
            </div>
          )}

        {/* Mobile Buttons */}
        <div className="flex flex-wrap justify-around gap-2 mb-6">
          <button
            onClick={handleReset}
            className="flex-1 min-w-[45%] bg-red-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-red-700 active:bg-red-800 transition-colors touch-manipulation"
          >
            {t("common.reset", "Reset")}
          </button>
          <button
            onClick={handleGoalClick}
            className="flex-1 min-w-[45%] bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors touch-manipulation"
          >
            {t("navigation.goal", "GOAL")}
          </button>
          <button
            onClick={() => navigate("/terms")}
            className="flex-1 min-w-[45%] bg-gray-700 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-800 active:bg-gray-900 transition-colors touch-manipulation"
          >
            {t("navigation.terms", "Terms & Conditions")}
          </button>
          <button
            onClick={() => navigate("/privacy")}
            className="flex-1 min-w-[45%] bg-gray-700 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-800 active:bg-gray-900 transition-colors touch-manipulation"
          >
            {t("navigation.privacy", "Privacy Policy")}
          </button>
          <button
            onClick={() => navigate("/feedback")}
            className="flex-1 min-w-[45%] bg-gray-700 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-800 active:bg-gray-900 transition-colors touch-manipulation"
          >
            {t("navigation.feedback", "Comments & Suggestions")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ATMMobileLayout;
