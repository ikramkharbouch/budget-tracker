import { useEffect, useState, useMemo } from "react";
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
  selectCurrentPhase,
  selectSelectedCategories,
  selectCategoryExpenses,
  selectPrimaryJobIncome,
  selectTargetSavings,
  selectTimeFrame,
  selectReductionStrategy,
  selectOnboardingData,
} from "../store/slices/onboardingSlice";

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
  const currentPhase = useSelector(selectCurrentPhase);
  const selectedCategories = useSelector(selectSelectedCategories);
  const categoryExpenses = useSelector(selectCategoryExpenses);
  const primaryJobIncome = useSelector(selectPrimaryJobIncome);
  const targetSavings = useSelector(selectTargetSavings);
  const timeFrame = useSelector(selectTimeFrame);
  const reductionStrategy = useSelector(selectReductionStrategy);
  const onboardingData = useSelector(selectOnboardingData);

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

  // --- Local Storage Sync (Extracted useEffect logic) ---

  // Save progress on data change
  useEffect(() => {
    localStorage.setItem("onboardingProgress", JSON.stringify(onboardingData));
    dispatch(saveProgress());
  }, [onboardingData, dispatch]);

  // Load progress on initial mount (existing useEffect logic kept here for now)
  useEffect(() => {
    const savedProgress = localStorage.getItem("onboardingProgress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Note: You would typically dispatch an action here to load 'parsed' data into Redux state
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, []);

  return {
    // State
    currentPhase,
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
    dispatch, // Keeping dispatch exposed for navigation logic below
  };
};