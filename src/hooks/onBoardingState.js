import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleCategory,
  updateCategoryExpense,
  setPrimaryJobIncome,
  setTargetSavings,
  setTimeFrame,
  setReductionStrategy,
  resetOnboarding,
  saveProgress,
  selectCurrentPhase as selectCurrentPhaseFromOnboarding, // Renamed to avoid collision
  selectSelectedCategories,
  selectCategoryExpenses,
  selectPrimaryJobIncome,
  selectTargetSavings,
  selectTimeFrame,
  selectReductionStrategy,
  selectOnboardingData,
} from "../store/slices/onboardingSlice";
import { selectIsAuthenticated } from "../store/slices/authSlice"; 


// List of available expense categories
const CATEGORIES = [
  "Groceries",
  "Restaurants",
  "Credit Card Debt",
  "Utilities",
  "Insurance",
];

export const useOnboardingState = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const currentPhaseFromRedux = useSelector(selectCurrentPhaseFromOnboarding);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const selectedCategories = useSelector(selectSelectedCategories);
  const categoryExpenses = useSelector(selectCategoryExpenses);
  const primaryJobIncome = useSelector(selectPrimaryJobIncome);
  const targetSavings = useSelector(selectTargetSavings);
  const timeFrame = useSelector(selectTimeFrame);
  const reductionStrategy = useSelector(selectReductionStrategy);
  const onboardingData = useSelector(selectOnboardingData);

  // --- THE GATEKEEPER LOGIC ---
  const currentPhase = isAuthenticated 
    ? currentPhaseFromRedux 
    : "login"; // Forces login screen if not authenticated

  // Local State for Modals/Popups
  const [isResetPopupVisible, setIsResetPopupVisible] = useState(false);

  // --- Handlers for Redux Actions ---

  const handleCategorySelect = (category) => {
    dispatch(toggleCategory(category));
  };

  const handleExpenseChange = (category, value) => {
    dispatch(updateCategoryExpense({ category, value }));
  };

  const handlePrimaryJobIncomeChange = (value) => {
    dispatch(setPrimaryJobIncome(value));
  };

  const handleTargetSavingsChange = (value) => {
    dispatch(setTargetSavings(value));
  };

  const handleTimeFrameChange = (value) => {
    dispatch(setTimeFrame(value));
  };

  const handleReductionStrategyChange = (value) => {
    dispatch(setReductionStrategy(value));
  };

  const handleReset = () => {
    setIsResetPopupVisible(true);
  };

  const handleConfirmReset = () => {
    dispatch(resetOnboarding());
    localStorage.removeItem("onboardingProgress");
    setIsResetPopupVisible(false);
  };

  const handleCloseResetPopup = () => {
    setIsResetPopupVisible(false);
  };

  // --- Local Storage Sync (Only syncs data if authenticated) ---

  // Save progress on data change
  useEffect(() => {
    if (isAuthenticated) {
        localStorage.setItem("onboardingProgress", JSON.stringify(onboardingData));
        dispatch(saveProgress());
    }
  }, [onboardingData, dispatch, isAuthenticated]);

  // Load progress on initial mount (existing useEffect logic kept here for now)
  useEffect(() => {
    const savedProgress = localStorage.getItem("onboardingProgress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Note: In a real app, this load would be tied to user authentication success
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, []);

  return {
    // State
    currentPhase, // <-- The effective phase
    isAuthenticated, // <-- Authentication status
    selectedCategories,
    categoryExpenses,
    primaryJobIncome,
    targetSavings,
    timeFrame,
    reductionStrategy,
    onboardingData,
    categories: CATEGORIES,
    isResetPopupVisible,
    
    // Handlers
    handleCategorySelect,
    handleExpenseChange,
    handlePrimaryJobIncomeChange,
    handleTargetSavingsChange,
    handleTimeFrameChange,
    handleReductionStrategyChange,
    handleReset,
    handleConfirmReset,
    handleCloseResetPopup,
    dispatch, 
  };
};