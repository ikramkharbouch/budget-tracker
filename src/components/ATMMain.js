import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ATMButton from "./AtmButton";
import ProgressBar from "./ProgressBar";
import NavigationArrows from "./NavigationArrows";
import FormDetailsPhase from "./FormDetailsPhase";
import BudgetPlanningPhase from "./BudgetPlanningPhase";
import IncomeDetailsPhase from "./IncomeDetailsPhase";
import GoalSettingPhase from "./GoalSettingPhase";
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

  return (
    <div className="relative mt-4 w-[60vw] max-w-none mx-auto aspect-[1004/1200]">
      <img
        src="/assets/atm-machine-asset.svg"
        alt="ATM Machine"
        className="absolute w-full left-0 right-0 object-contain"
      />

      <div className="absolute" style={{ top: "23.5%", left: "7.2%" }}>
        <ATMButton label={t("navigation.goal")} />
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

      <img
        src="/assets/Button/Off.svg"
        alt="Terms and Conditions"
        className="absolute cursor-pointer"
        style={{ top: "66%", left: "5%" }}
        onClick={() => {
          console.log("Terms and Conditions clicked");
        }}
      />

      <img
        src="/assets/cmts-suggestions.svg"
        alt="COMMENTS & SUGGESTIONS"
        className="absolute cursor-pointer"
        style={{ top: "63.5%", left: "26%" }}
        onClick={() => {
          console.log("Comments and Suggestions clicked");
        }}
      />

      <div
        className="absolute"
        style={{ top: "25%", left: "25%", width: "50%" }}
      >
        <div className="text-center">
          <ProgressBar currentPhase={currentPhase} />

          <NavigationArrows
            currentPhase={currentPhase}
            onPrevious={handlePreviousPhase}
            onNext={handleNextPhase}
            onReset={handleReset}
          />

          {renderCurrentPhase()}
        </div>
      </div>

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
    </div>
  );
};

export default ATMMain;
