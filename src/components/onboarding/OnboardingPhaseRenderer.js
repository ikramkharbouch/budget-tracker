import React from 'react';
import { useTranslation } from 'react-i18next';

// Import all Phase and Form components
import FormDetailsPhase from '../forms/FormDetailsPhase';
import BudgetPlanningPhase from './BudgetPlanningPhase';
import IncomeDetailsPhase from './IncomeDetailsPhase';
import GoalSettingPhase from '../goals/GoalSettingPhase';
import GoalTrackingPhase from '../goals/GoalTrackingPhase';
import SimulateOneYearPhase from './SimulateOneYearPhase';
import SummaryPhase from './SummaryPhase';
import OverviewPage from '../pages/OverviewPage';
import BlogPage from '../pages/BlogPage';

const OnboardingPhaseRenderer = ({
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
  isMobileCategorySelection = false
}) => {
  const { t } = useTranslation();

  // Logic for the mobile category selection (extracted from ATMMain)
  const renderMobileCategorySelection = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t("mobile.categorySelection.title", "Select Your Expense Categories")}
      </h2>
      <p className="text-gray-600 text-center mb-8">
        {t(
          "mobile.categorySelection.subtitle",
          "Choose the categories you want to track in your budget"
        )}
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
            {t(`categories.${item.toLowerCase().replace(/\s+/g, "")}`, item)}
          </button>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 text-center">
            ✓ {selectedCategories.length}{" "}
            {t(
              "mobile.categorySelection.selected",
              selectedCategories.length === 1 ? "category" : "categories"
            )}{" "}
            {t("common.selected", "selected")}
          </p>
        </div>
      )}
    </div>
  );
  
  // Phase rendering logic (extracted from ATMMain's switch)
  switch (currentPhase) {
    case "form-details":
      // Note: We use FormDetailsPhase here, but the mobile view overrides it with category selection logic
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
    case "simulate-one-year":
      return <SimulateOneYearPhase />;
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
    case "overview":
      return <OverviewPage />;
    case "blog":
      // Use handlePreviousPhase as the navigate-back function
      return <BlogPage onNavigateBack={handlePreviousPhase} t={t} />; 
    default:
      return null;
  }
};

// NEW EXPORT (Use standard default export):
export default OnboardingPhaseRenderer;

// Keep the mobile function separate if you still need it outside the component, 
// or redefine it within ATMMobileLayout for simplicity:

// Re-integrate renderMobileCategorySelection logic directly into ATMMobileLayout
// OR export it namedly:
// export const renderMobileCategorySelection = ({...props}) => { /* ... logic ... */ }