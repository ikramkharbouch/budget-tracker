import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Imported UI/Layout components
import ATMButton from '../common/AtmButton';
import ProgressBar from '../common/ProgressBar';
import NavigationArrows from './NavigationArrows';
import BottomCarousel from './BottomCarousel';
import ImageTextButton from '../common/ImageTextButton';
import OnboardingPhaseRenderer from '../onboarding/OnboardingPhaseRenderer';

const ATMDesktopLayout = ({
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
  handleOverviewClick,
  handlePrintClick,
  handleSimulateOneYearClick,
  handleCreateGoalClick,
  handleReset,
  handleBlogClick,
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
    onPrimaryJobIncomeChange: (e) => handlePrimaryJobIncomeChange(e.target.value),
    onTargetSavingsChange: (e) => handleTargetSavingsChange(e.target.value),
    onTimeFrameChange: (e) => handleTimeFrameChange(e.target.value),
    onReductionStrategyChange: (e) => handleReductionStrategyChange(e.target.value),
    onIncomeInternalNext: handleIncomeInternalNext,
  };


  return (
    <div className="relative mt-4 mx-auto w-[90vw] max-w-[1004px] aspect-[1004/1200]">
      <img
        src="/assets/atm-machine-asset.svg"
        alt="ATM Machine"
        className="absolute w-full left-0 right-0 object-contain"
      />

      {/* Translatable Text Overlay for "Not Financial Advice" */}
      <div
        className="absolute"
        style={{ top: "6.5%", left: "9.5%", width: "81%", height: "11%" }}
      >
        <div className="flex h-full">
          <div className="flex-1 flex flex-col items-start justify-center bg-transparent pr-1 pl-2">
            <span
              className="text-white font-light italic leading-none select-none"
              style={{
                fontFamily:
                  '"Bookman Old Style", "Book Antiqua", Georgia, serif',
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                textShadow:
                  "1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3)",
                letterSpacing: "1px",
              }}
            >
              {t("disclaimer.not", "Not")}
            </span>
            <span
              className="text-white font-light italic leading-none select-none -mt-2"
              style={{
                fontFamily:
                  '"Bookman Old Style", "Book Antiqua", Georgia, serif',
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                textShadow:
                  "1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3)",
                letterSpacing: "1px",
              }}
            >
              {t("disclaimer.financial", "Financial")}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-transparent pl-1">
            <span
              className="text-white font-light italic leading-none text-center select-none"
              style={{
                fontFamily:
                  '"Bookman Old Style", "Book Antiqua", Georgia, serif',
                fontSize: "clamp(2.6rem, 6.5vw, 6rem)",
                textShadow:
                  "1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3)",
                letterSpacing: "1px",
              }}
            >
              {t("disclaimer.advice", "Advice")}
            </span>
          </div>
        </div>
      </div>

      {/* Side Buttons */}
      <div className="absolute" style={{ top: "23.5%", left: "8.5%" }}>
        <ATMButton label={t("navigation.goal")} onClick={handleGoalClick} />
      </div>
      <div className="absolute" style={{ top: "28.5%", left: "8.5%" }}>
        <ATMButton
          label={t("navigation.overview")}
          onClick={handleOverviewClick}
        />
      </div>
      <div className="absolute" style={{ top: "33.5%", left: "8.5%" }}>
        <ATMButton label={t("navigation.print")} onClick={handlePrintClick} />
      </div>
      <div className="absolute" style={{ top: "38.5%", left: "8.5%" }}>
        <ATMButton />
      </div>

      <div className="absolute" style={{ top: "23.5%", right: "9.5%" }}>
        <ATMButton
          label={t("navigation.simulateOneYear")}
          small
          onClick={handleSimulateOneYearClick}
        />
      </div>
      <div className="absolute" style={{ top: "28.5%", right: "9.5%" }}>
        <ATMButton
          label={t("navigation.createGoal")}
          small
          onClick={handleCreateGoalClick}
        />
      </div>
      <div className="absolute" style={{ top: "33.5%", right: "9.5%" }}>
        <ATMButton label={t("navigation.reset")} onClick={handleReset} />
      </div>
      <div className="absolute" style={{ top: "38.5%", right: "9.5%" }}>
        <ATMButton
          label={t("navigation.blog", "BLOG")}
          onClick={handleBlogClick}
        />
      </div>

      {/* Footer Links */}
      <div
        className="absolute flex items-center"
        style={{
          top: "67%",
          left: "5%",
          width: "90%",
          height: "5%",
        }}
      >
        <ImageTextButton
          label={t("navigation.terms", "Terms & Conditions")}
          onClick={() => navigate("/terms")}
          className="mr-2"
        />

        <ImageTextButton
          label={t("navigation.privacy", "Privacy Policy")}
          onClick={() => navigate("/privacy")}
          className="mr-2"
        />

        <ImageTextButton
          label={t("navigation.feedback", "Comments & Suggestions")}
          onClick={() => navigate("/feedback")}
        />
      </div>

      {/* Central Screen Content */}
      <div
        className="absolute"
        style={{ top: "25%", left: "25%", width: "50%" }}
      >
        <div className="text-center h-full">
          {currentPhase !== "goal-tracking" &&
            currentPhase !== "simulate-one-year" &&
            currentPhase !== "overview" &&
            currentPhase !== "blog" && (
              <>
                <ProgressBar currentPhase={currentPhase} />
                <NavigationArrows
                  currentPhase={currentPhase}
                  onPrevious={handlePreviousPhase}
                  onNext={handleNextPhase}
                  onReset={handleReset}
                />
              </>
            )}
          {/* Phase Renderer */}
          <div
            className={`
              atm-screen-content 
              ${currentPhase === "blog" ? "overflow-y-scroll" : ""}
              ${currentPhase !== "blog" ? "pt-4" : ""} 
              w-full 
              flex-grow
              text-left
            `}
            style={currentPhase === 'blog' ? { maxHeight: '50vh', padding: '0' } : {}}
          >
            <OnboardingPhaseRenderer {...phaseRendererProps} />
          </div>
        </div>
      </div>

      {/* Bottom Carousel */}
      {currentPhase !== "goal-tracking" &&
        currentPhase !== "simulate-one-year" &&
        currentPhase !== "blog" && (
          <div
            className="absolute"
            style={{ top: "78%", left: "15%", width: "70%" }}
          >
            <BottomCarousel {...carouselProps} />
          </div>
        )}
    </div>
  );
};

export default ATMDesktopLayout;