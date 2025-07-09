import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPhase: "form-details",
  
  selectedCategories: [],
  
  categoryExpenses: {
    Groceries: "",
    Restaurants: "",
    "Credit Card Debt": "",
    Utilities: "",
    Insurance: "",
  },
  
  primaryJobIncome: "",
  
  targetSavings: "",
  timeFrame: "3 months",
  reductionStrategy: "",
  
  userId: null,
  completedAt: null,
  isOnboardingCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentPhase: (state, action) => {
      state.currentPhase = action.payload;
    },
    
    toggleCategory: (state, action) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);
      
      if (index > -1) {
        state.selectedCategories.splice(index, 1);
        state.categoryExpenses[category] = "";
      } else {
        state.selectedCategories.push(category);
      }
    },
    
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    
    updateCategoryExpense: (state, action) => {
      const { category, value } = action.payload;
      const numericValue = value === "" ? "" : Number(value);
      state.categoryExpenses[category] = numericValue;
    },
    
    setCategoryExpenses: (state, action) => {
      state.categoryExpenses = action.payload;
    },
    
    setPrimaryJobIncome: (state, action) => {
      state.primaryJobIncome = action.payload;
    },
    
    setTargetSavings: (state, action) => {
      state.targetSavings = action.payload;
    },
    
    setTimeFrame: (state, action) => {
      state.timeFrame = action.payload;
    },
    
    setReductionStrategy: (state, action) => {
      state.reductionStrategy = action.payload;
    },
    
    completeOnboarding: (state) => {
      state.isOnboardingCompleted = true;
      state.completedAt = new Date().toISOString();
    },
    
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    
    resetOnboarding: (state) => {
      return { ...initialState };
    },
    
    saveProgress: (state) => {
      console.log('Progress saved:', state);
    },
  },
});

export const {
  setCurrentPhase,
  toggleCategory,
  setSelectedCategories,
  updateCategoryExpense,
  setCategoryExpenses,
  setPrimaryJobIncome,
  setTargetSavings,
  setTimeFrame,
  setReductionStrategy,
  completeOnboarding,
  setUserId,
  resetOnboarding,
  saveProgress,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

export const selectCurrentPhase = (state) => state.onboarding.currentPhase;
export const selectSelectedCategories = (state) => state.onboarding.selectedCategories;
export const selectCategoryExpenses = (state) => state.onboarding.categoryExpenses;
export const selectPrimaryJobIncome = (state) => state.onboarding.primaryJobIncome;
export const selectTargetSavings = (state) => state.onboarding.targetSavings;
export const selectTimeFrame = (state) => state.onboarding.timeFrame;
export const selectReductionStrategy = (state) => state.onboarding.reductionStrategy;
export const selectOnboardingData = (state) => state.onboarding;
export const selectIsOnboardingCompleted = (state) => state.onboarding.isOnboardingCompleted;