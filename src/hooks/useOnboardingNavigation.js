import { setCurrentPhase, completeOnboarding } from "../store/slices/onboardingSlice";

export const useOnboardingNavigation = (
  dispatch,
  currentPhase,
  selectedCategories,
  categoryExpenses,
  primaryJobIncome,
  targetSavings,
  timeFrame,
  reductionStrategy
) => {
  
  const handleIncomeInternalNext = () => {
    if (!primaryJobIncome || parseFloat(primaryJobIncome) <= 0) {
      alert("Please enter a valid amount for your primary job income.");
      return false; // Indicate failure
    }
    return true; // Indicate success
  };

  const handleNextPhase = () => {
    // Phase 1: Form Details Validation
    if (currentPhase === "form-details" && selectedCategories.length === 0) {
      alert("Please select at least one category before proceeding.");
      return;
    }

    // Phase 2: Budget Planning Validation
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

    // Phase 3: Income Details Validation
    if (currentPhase === "income-details") {
      if (!handleIncomeInternalNext()) {
        return;
      }
    }

    // Phase 4: Goal Setting Validation
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
    
    // Transition Logic
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
    } else if (
      currentPhase === "goal-tracking" || 
      currentPhase === "simulate-one-year" || 
      currentPhase === "blog"
    ) {
      dispatch(setCurrentPhase("form-details"));
    }
  };
  
  const handleGoalClick = () => dispatch(setCurrentPhase("goal-tracking"));
  const handleCreateGoalClick = () => dispatch(setCurrentPhase("goal-tracking"));
  const handleSimulateOneYearClick = () => dispatch(setCurrentPhase("simulate-one-year"));
  const handleOverviewClick = () => dispatch(setCurrentPhase("overview"));
  const handleBlogClick = () => dispatch(setCurrentPhase("blog"));


  return {
    handleNextPhase,
    handlePreviousPhase,
    handleGoalClick,
    handleCreateGoalClick,
    handleSimulateOneYearClick,
    handleOverviewClick,
    handleBlogClick,
    handleIncomeInternalNext,
  };
};