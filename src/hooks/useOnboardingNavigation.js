import { completeOnboarding } from "../store/slices/onboardingSlice";
import { logout } from "../store/slices/authSlice"; // NEW

export const useOnboardingNavigation = (
  dispatch,
  currentPhase,
  isAuthenticated, // <-- NEW PARAMETER
  selectedCategories,
  categoryExpenses,
  primaryJobIncome,
  targetSavings,
  timeFrame,
  reductionStrategy
) => {
  
  // CRITICAL: Function called upon successful login
  const handleStartOnboarding = () => {
    // User is logged in, begin the financial planning flow at the first phase
    dispatch(setCurrentPhase("form-details"));
  };
  
  const handleLogout = () => {
    dispatch(logout());
    // The currentPhase will be naturally overridden to "login" by useOnboardingState
  };

  // --- Utility Logic ---
  const handleIncomeInternalNext = () => {
    if (!primaryJobIncome || parseFloat(primaryJobIncome) <= 0) {
      alert("Please enter a valid amount for your primary job income.");
      return false;
    }
    return true;
  };
  
  // --- Navigation Handlers (Gated) ---
  
  const handleNextPhase = () => {
    // Prevent progression if not authenticated
    if (!isAuthenticated) return alert("Please log in to continue."); 

    // Phase 1: Form Details Validation
    if (currentPhase === "form-details" && selectedCategories.length === 0) {
      alert("Please select at least one category before proceeding.");
      return;
    }
    // ... rest of validation logic (Budget, Income, Goal) ...

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
    // Prevent going back if on the effective first phase (login or form-details)
    if (currentPhase === "login" || currentPhase === "form-details") return; 

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
      // Navigating back from these pages always returns to the main form flow
      dispatch(setCurrentPhase("form-details"));
    }
  };
  
  // Utility Navigations (Must be gated if they access personalized data)
  const handleGoalClick = () => {
    if (isAuthenticated) dispatch(setCurrentPhase("goal-tracking"));
    else alert("Please log in to access goals.");
  };
  const handleCreateGoalClick = () => {
    if (isAuthenticated) dispatch(setCurrentPhase("goal-tracking"));
    else alert("Please log in to create a goal.");
  };
  const handleSimulateOneYearClick = () => {
    if (isAuthenticated) dispatch(setCurrentPhase("simulate-one-year"));
    else alert("Please log in to run a simulation.");
  };
  const handleOverviewClick = () => {
    if (isAuthenticated) dispatch(setCurrentPhase("overview"));
    else alert("Please log in to see the overview.");
  };
  const handleBlogClick = () => dispatch(setCurrentPhase("blog")); // Blog is public


  return {
    handleNextPhase,
    handlePreviousPhase,
    handleGoalClick,
    handleCreateGoalClick,
    handleSimulateOneYearClick,
    handleOverviewClick,
    handleBlogClick,
    handleIncomeInternalNext,
    handleStartOnboarding, // <-- New transition handler
    handleLogout, // <-- New handler
  };
};