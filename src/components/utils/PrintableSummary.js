import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectPrimaryJobIncome,
  selectSelectedCategories,
  selectCategoryExpenses,
  selectTargetSavings,
  selectTimeFrame,
  selectReductionStrategy,
} from "../../store/slices/onboardingSlice";

const PrintableSummary = React.forwardRef((props, ref) => {
  const primaryJobIncome = useSelector(selectPrimaryJobIncome);
  const selectedCategories = useSelector(selectSelectedCategories);
  const categoryExpenses = useSelector(selectCategoryExpenses);
  const targetSavings = useSelector(selectTargetSavings);
  const timeFrame = useSelector(selectTimeFrame);
  const reductionStrategy = useSelector(selectReductionStrategy);

  return (
    
    <div ref={ref} className="p-8 bg-white" style={{ minWidth: '210mm', minHeight: '297mm' }}>
      <h1 className="text-2xl font-bold mb-4">Financial Summary</h1>
      <p>This is a summary of your financial plan. You can print this page for your records.</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Income Details</h2>
        <p>Primary Job Income: ${primaryJobIncome}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Budget Details</h2>
        {selectedCategories.length > 0 ? (
          <ul>
            {selectedCategories.map((category) => (
              <li key={category}>
                {category}: ${categoryExpenses[category]}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expense categories selected.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Savings Goals</h2>
        <p>Target Savings: ${targetSavings}</p>
        <p>Time Frame: {timeFrame}</p>
        <p>Reduction Strategy: {reductionStrategy}</p>
      </div>
    </div>
  );
});

export default PrintableSummary;