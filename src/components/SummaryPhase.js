import React from 'react';

const SummaryPhase = ({
  primaryJobIncome,
  selectedCategories,
  categoryExpenses,
  targetSavings,
  timeFrame,
  reductionStrategy
}) => {
  const calculateMonthlyTarget = () => {
    if (targetSavings && timeFrame) {
      return (parseFloat(targetSavings) / parseInt(timeFrame.split(' ')[0])).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="p-4">
      <h2 className="font-acme text-lg mb-4">Summary & Results</h2>
      <div className="text-left text-sm space-y-2 bg-gray-50 p-3 rounded">
        <p>
          <strong>Monthly Income:</strong> ${primaryJobIncome || "0"}
        </p>
        <p>
          <strong>Categories:</strong>{" "}
          {selectedCategories.length > 0
            ? selectedCategories.join(", ")
            : "None selected"}
        </p>
        {selectedCategories.map((cat) => (
          <p key={cat}>
            <strong>{cat} Expense:</strong> $
            {categoryExpenses[cat] || "0"}
          </p>
        ))}
        <p>
          <strong>Savings Goal:</strong> ${targetSavings || "0"}
        </p>
        <p>
          <strong>Timeline:</strong> {timeFrame || "N/A"}
        </p>
        <p>
          <strong>Reduction Strategy:</strong> {reductionStrategy || "N/A"}
        </p>
        <p>
          <strong>Monthly Target:</strong> ${calculateMonthlyTarget()}
        </p>
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <p className="font-medium text-blue-800">Recommendation:</p>
        <p className="text-blue-700">
          Based on your inputs, with a monthly income of ${primaryJobIncome || "0"}, you can achieve your goal by targeting a monthly saving of $
          {calculateMonthlyTarget()} by focusing on your strategy: "{reductionStrategy}".
        </p>
      </div>
    </div>
  );
};

export default SummaryPhase;