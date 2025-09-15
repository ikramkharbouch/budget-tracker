import React from 'react';
import BudgetTable from './BudgetTable'; // Assuming BudgetTable is in the same directory
import StyledParagraphs from './StyledParagraphs'; // Assuming StyledParagraphs is in the same directory

const OverviewPage = () => {
  return (
    <div className="p-4">
      {/* Title section with the paragraph component */}
      <div className="text-center mb-6">
        <StyledParagraphs text="Monthly Expenses and Savings Overview" />
      </div>

      {/* The main table component */}
      <BudgetTable />
    </div>
  );
};

export default OverviewPage;