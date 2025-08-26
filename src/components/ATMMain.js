import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ATMButton from "./ATMButton";
import ProgressBar from "./ProgressBar";
import NavigationArrows from "./NavigationArrows";
import FormDetailsPhase from "./FormDetailsPhase";
import BudgetPlanningPhase from "./BudgetPlanningPhase";
import IncomeDetailsPhase from "./IncomeDetailsPhase";
import GoalSettingPhase from "./GoalSettingPhase";
import GoalTrackingPhase from "./GoalTrackingPhase";  // New import
import SummaryPhase from "./SummaryPhase";
import BottomCarousel from "./BottomCarousel";
import { useTranslation } from "react-i18next";

import {
  setCurrentPhase,
  toggleCategory,
  updateCategoryExpense,
  setPrimaryJobIncome,
  setTargetSavings,
  setTimeFrame,
  setReductionStrategy,
  resetOnboarding,
  completeOnboarding,
  saveProgress,
  selectCurrentPhase,
  selectSelectedCategories,
  selectCategoryExpenses,
  selectPrimaryJobIncome,
  selectTargetSavings,
  selectTimeFrame,
  selectReductionStrategy,
  selectOnboardingData,
} from "../store/slices/onboardingSlice";

const ATMMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentPhase = useSelector(selectCurrentPhase);
  const selectedCategories = useSelector(selectSelectedCategories);
  const categoryExpenses = useSelector(selectCategoryExpenses);
  const primaryJobIncome = useSelector(selectPrimaryJobIncome);
  const targetSavings = useSelector(selectTargetSavings);
  const timeFrame = useSelector(selectTimeFrame);
  const reductionStrategy = useSelector(selectReductionStrategy);
  const onboardingData = useSelector(selectOnboardingData);

  const categories = [
    "Groceries",
    "Restaurants",
    "Credit Card Debt",
    "Utilities",
    "Insurance",
  ];

  useEffect(() => {
    localStorage.setItem("onboardingProgress", JSON.stringify(onboardingData));
    dispatch(saveProgress());
  }, [onboardingData, dispatch]);

  useEffect(() => {
    const savedProgress = localStorage.getItem("onboardingProgress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, []);

  const handleCategorySelect = (category) => {
    dispatch(toggleCategory(category));
    console.log("Selected categories toggled:", category);
  };

  const handleExpenseChange = (category, value) => {
    dispatch(updateCategoryExpense({ category, value }));
  };

  const handleReset = () => {
    dispatch(resetOnboarding());
    localStorage.removeItem("onboardingProgress");
  };

  // New function to handle GOAL button click
  const handleGoalClick = () => {
    dispatch(setCurrentPhase("goal-tracking"));
  };

  const handleIncomeInternalNext = () => {
    if (!primaryJobIncome || parseFloat(primaryJobIncome) <= 0) {
      alert("Please enter a valid amount for your primary job income.");
      return;
    }
  };

  const handleNextPhase = () => {
    if (currentPhase === "form-details" && selectedCategories.length === 0) {
      alert("Please select at least one category before proceeding.");
      return;
    }

    if (currentPhase === "budget-planning") {
      const allExpensesEntered = selectedCategories.every((category) => {
        const expense = parseFloat(categoryExpenses[category]);
        return (
          !isNaN(expense) && expense >= 0 && categoryExpenses[category] !== ""
        );
      });
      if (!allExpensesEntered) {
        alert(
          "Please enter a valid expense for all selected categories before proceeding."
        );
        return;
      }
    }

    if (currentPhase === "income-details") {
      if (!primaryJobIncome || parseFloat(primaryJobIncome) <= 0) {
        alert("Please enter a valid amount for your primary job income.");
        return;
      }
    }

    if (currentPhase === "goal-setting") {
      if (
        !targetSavings ||
        parseFloat(targetSavings) <= 0 ||
        !timeFrame ||
        reductionStrategy.trim() === ""
      ) {
        alert(
          "Please fill in all goal setting details (Target Savings > 0, Time Frame, and Reduction Strategy)."
        );
        return;
      }
    }

    if (currentPhase === "form-details") {
      dispatch(setCurrentPhase("budget-planning"));
    } else if (currentPhase === "budget-planning") {
      dispatch(setCurrentPhase("income-details"));
    } else if (currentPhase === "income-details") {
      dispatch(setCurrentPhase("goal-setting"));
    } else if (currentPhase === "goal-setting") {
      dispatch(setCurrentPhase("summary"));
      dispatch(completeOnboarding());
    } else if (currentPhase === "goal-tracking") {
      // From goal tracking, user can navigate to summary or back
      dispatch(setCurrentPhase("summary"));
    }
  };

  const handlePreviousPhase = () => {
    if (currentPhase === "summary") {
      dispatch(setCurrentPhase("goal-setting"));
    } else if (currentPhase === "goal-setting") {
      dispatch(setCurrentPhase("income-details"));
    } else if (currentPhase === "income-details") {
      dispatch(setCurrentPhase("budget-planning"));
    } else if (currentPhase === "budget-planning") {
      dispatch(setCurrentPhase("form-details"));
    } else if (currentPhase === "goal-tracking") {
      // From goal tracking, go back to form details or wherever makes sense
      dispatch(setCurrentPhase("form-details"));
    }
  };

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case "form-details":
        return <FormDetailsPhase selectedCategories={selectedCategories} />;
      case "budget-planning":
        return <BudgetPlanningPhase selectedCategories={selectedCategories} />;
      case "income-details":
        return <IncomeDetailsPhase />;
      case "goal-setting":
        return (
          <GoalSettingPhase
            targetSavings={targetSavings}
            timeFrame={timeFrame}
            reductionStrategy={reductionStrategy}
          />
        );
      case "goal-tracking":
        return <GoalTrackingPhase />;
      case "summary":
        return (
          <SummaryPhase
            primaryJobIncome={primaryJobIncome}
            selectedCategories={selectedCategories}
            categoryExpenses={categoryExpenses}
            targetSavings={targetSavings}
            timeFrame={timeFrame}
            reductionStrategy={reductionStrategy}
          />
        );
      default:
        return null;
    }
  };

  // Mobile category selection component
  const renderMobileCategorySelection = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t("mobile.categorySelection.title", "Select Your Expense Categories")}
      </h2>
      <p className="text-gray-600 text-center mb-8">
        {t("mobile.categorySelection.subtitle", "Choose the categories you want to track in your budget")}
      </p>
      <div className="grid grid-cols-1 gap-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleCategorySelect(item)}
            className={`
              w-full py-6 px-6 text-lg font-medium rounded-xl border-2 
              transition-all duration-200 touch-manipulation min-h-[64px]
              ${
                selectedCategories.includes(item)
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }
            `}
          >
            {t(`categories.${item.toLowerCase().replace(/\s+/g, '')}`, item)}
          </button>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 text-center">
            ✓ {selectedCategories.length} {t("mobile.categorySelection.selected", selectedCategories.length === 1 ? 'category' : 'categories')} {t("common.selected", "selected")}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* DESKTOP VERSION - UPDATED WITH TRANSLATABLE TEXT OVERLAY */}
      <div className="hidden md:block relative mt-4 w-[60vw] max-w-none mx-auto aspect-[1004/1200]">
        <img
          src="/assets/atm-machine-asset.svg"
          alt="ATM Machine"
          className="absolute w-full left-0 right-0 object-contain"
        />

        {/* Translatable Text Overlay for "Not Financial Advice" */}
        <div className="absolute" style={{ top: "6.5%", left: "8.5%", width: "83%", height: "11%" }}>
          <div className="flex h-full">
            {/* Left panel - "Not Financial" */}
            <div className="flex-1 flex flex-col items-start justify-center bg-transparent pr-1 pl-2">
              <span 
                className="text-white font-light italic leading-none select-none"
                style={{ 
                  fontFamily: '"Bookman Old Style", "Book Antiqua", Georgia, serif',
                  fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3)',
                  letterSpacing: '1px'
                }}
              >
                {t('disclaimer.not', 'Not')}
              </span>
              <span 
                className="text-white font-light italic leading-none select-none -mt-2"
                style={{ 
                  fontFamily: '"Bookman Old Style", "Book Antiqua", Georgia, serif',
                  fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3)',
                  letterSpacing: '1px'
                }}
              >
                {t('disclaimer.financial', 'Financial')}
              </span>
            </div>
            {/* Right panel - "Advice" */}
            <div className="flex-1 flex items-center justify-center bg-transparent pl-1">
              <span 
                className="text-white font-light italic leading-none text-center select-none"
                style={{ 
                  fontFamily: '"Bookman Old Style", "Book Antiqua", Georgia, serif',
                  fontSize: "clamp(2.6rem, 6.5vw, 6rem)",
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3)',
                  letterSpacing: '1px'
                }}
              >
                {t('disclaimer.advice', 'Advice')}
              </span>
            </div>
          </div>
        </div>

        {/* Updated GOAL button with click handler */}
        <div className="absolute" style={{ top: "23.5%", left: "7.2%" }}>
          <ATMButton label={t("navigation.goal")} onClick={handleGoalClick} />
        </div>
        <div className="absolute" style={{ top: "28.5%", left: "7.2%" }}>
          <ATMButton label={t("navigation.expenses")} />
        </div>
        <div className="absolute" style={{ top: "33.5%", left: "7.2%" }}>
          <ATMButton label={t("navigation.print")} />
        </div>
        <div className="absolute" style={{ top: "38.5%", left: "7.2%" }}>
          <ATMButton />
        </div>

        <div className="absolute" style={{ top: "23.5%", right: "9.2%" }}>
          <ATMButton label={t("navigation.simulateOneYear")} small />
        </div>
        <div className="absolute" style={{ top: "28.5%", right: "9.2%" }}>
          <ATMButton label={t("navigation.createGoal")} small />
        </div>
        <div className="absolute" style={{ top: "33.5%", right: "9.2%" }}>
          <ATMButton label={t("navigation.reset")} onClick={handleReset} />
        </div>
        <div className="absolute" style={{ top: "38.5%", right: "9.2%" }}>
          <ATMButton />
        </div>

        {/* Terms and Conditions Button - UPDATED */}
        <img
          src="/assets/Button/Off.svg"
          alt="Terms and Conditions"
          className="absolute cursor-pointer hover:opacity-80 transition-opacity"
          style={{ top: "66%", left: "5%" }}
          onClick={() => navigate('/terms')}
          title={t("navigation.terms", "Terms & Conditions")}
        />

        {/* Comments & Suggestions Button - UPDATED */}
        <img
          src="/assets/cmts-suggestions.svg"
          alt="COMMENTS & SUGGESTIONS"
          className="absolute cursor-pointer hover:opacity-80 transition-opacity"
          style={{ top: "63.5%", left: "26%" }}
          onClick={() => navigate('/feedback')}
          title={t("navigation.feedback", "Comments & Suggestions")}
        />

        <div
          className="absolute"
          style={{ top: "25%", left: "25%", width: "50%" }}
        >
          <div className="text-center">
            {/* Only show progress bar for main onboarding flow, not goal tracking */}
            {currentPhase !== "goal-tracking" && (
              <ProgressBar currentPhase={currentPhase} />
            )}

            {/* Only show navigation arrows for main onboarding flow */}
            {currentPhase !== "goal-tracking" && (
              <NavigationArrows
                currentPhase={currentPhase}
                onPrevious={handlePreviousPhase}
                onNext={handleNextPhase}
                onReset={handleReset}
              />
            )}

            {renderCurrentPhase()}
          </div>
        </div>

        {/* Only show bottom carousel for main onboarding flow */}
        {currentPhase !== "goal-tracking" && (
          <div
            className="absolute"
            style={{ top: "78%", left: "15%", width: "70%" }}
          >
            <BottomCarousel
              currentPhase={currentPhase}
              categories={categories}
              selectedCategories={selectedCategories}
              categoryExpenses={categoryExpenses}
              primaryJobIncome={primaryJobIncome}
              targetSavings={targetSavings}
              timeFrame={timeFrame}
              reductionStrategy={reductionStrategy}
              onCategorySelect={handleCategorySelect}
              onExpenseChange={handleExpenseChange}
              onPrimaryJobIncomeChange={(e) =>
                dispatch(setPrimaryJobIncome(e.target.value))
              }
              onTargetSavingsChange={(e) =>
                dispatch(setTargetSavings(e.target.value))
              }
              onTimeFrameChange={(e) => dispatch(setTimeFrame(e.target.value))}
              onReductionStrategyChange={(e) =>
                dispatch(setReductionStrategy(e.target.value))
              }
              onIncomeInternalNext={handleIncomeInternalNext}
            />
          </div>
        )}
      </div>

      {/* MOBILE VERSION - IMPROVED LAYOUT WITH DISCLAIMER */}
      <div className="md:hidden min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="container mx-auto px-4 py-6">
          {/* Mobile Header with Disclaimer */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {t("mobile.header.title", "Financial Planner")}
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              {t("mobile.header.subtitle", "Plan your budget and savings goals")}
            </p>
            {/* Mobile Disclaimer */}
            <div className="bg-gray-800 text-white py-3 px-4 rounded-lg text-sm">
              <span 
                className="font-bold italic"
                style={{ fontFamily: '"Bookman Old Style", "Book Antiqua", Georgia, serif' }}
              >
                {t('disclaimer.notFinancial', 'Not Financial')} {t('disclaimer.advice', 'Advice')}
              </span>
            </div>
          </div>

          {/* Progress - Hide for goal tracking */}
          {currentPhase !== "goal-tracking" && (
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

          {/* Main Content - ENHANCED FOR FORM-DETAILS */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {currentPhase === "form-details" ? (
              // Special mobile layout for category selection
              renderMobileCategorySelection()
            ) : (
              // Regular phase rendering for other steps
              renderCurrentPhase()
            )}
          </div>

          {/* Bottom Carousel - HIDE FOR FORM-DETAILS AND GOAL-TRACKING ON MOBILE */}
          {currentPhase !== "form-details" && currentPhase !== "goal-tracking" && (
            <div className="mb-8">
              <BottomCarousel
                currentPhase={currentPhase}
                categories={categories}
                selectedCategories={selectedCategories}
                categoryExpenses={categoryExpenses}
                primaryJobIncome={primaryJobIncome}
                targetSavings={targetSavings}
                timeFrame={timeFrame}
                reductionStrategy={reductionStrategy}
                onCategorySelect={handleCategorySelect}
                onExpenseChange={handleExpenseChange}
                onPrimaryJobIncomeChange={(e) =>
                  dispatch(setPrimaryJobIncome(e.target.value))
                }
                onTargetSavingsChange={(e) =>
                  dispatch(setTargetSavings(e.target.value))
                }
                onTimeFrameChange={(e) => dispatch(setTimeFrame(e.target.value))}
                onReductionStrategyChange={(e) =>
                  dispatch(setReductionStrategy(e.target.value))
                }
                onIncomeInternalNext={handleIncomeInternalNext}
              />
            </div>
          )}

          {/* Mobile Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={handleReset}
              className="flex-1 bg-red-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-red-700 active:bg-red-800 transition-colors touch-manipulation"
            >
              {t("common.reset", "Reset")}
            </button>
            <button 
              onClick={handleGoalClick}
              className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors touch-manipulation"
            >
              {t("navigation.goal", "GOAL")}
            </button>
          </div>

          {/* Mobile Footer - UPDATED WITH NAVIGATION */}
          <div className="text-center space-y-3 text-base text-gray-600">
            <button 
              className="block w-full py-3 hover:text-gray-800 transition-colors"
              onClick={() => navigate('/terms')}
            >
              {t("navigation.terms", "Terms & Conditions")}
            </button>
            <button 
              className="block w-full py-3 hover:text-gray-800 transition-colors"
              onClick={() => navigate('/feedback')}
            >
              {t("navigation.feedback", "Comments & Suggestions")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ATMMain;