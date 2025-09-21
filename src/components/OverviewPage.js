import React from 'react';
import BudgetTable from './BudgetTable'; // Assuming BudgetTable is in the same directory
import StyledParagraphs from './StyledParagraphs'; // Assuming StyledParagraphs is in the same directory

const OverviewPage = () => {
  return (
    <div className="w-full h-full">
      {/* Title section with the paragraph component */}
      <div className="text-center mb-6">
        <StyledParagraphs text="Monthly Expenses and Savings Overview" />
      </div>

      {/* The main table component */}
      <BudgetTable />

      {/* Size Controller SVG positioned at bottom right */}
      <div className="absolute bottom-0 right-2">
        <div className="relative group cursor-pointer">
          <img
            src="/assets/size-controller.svg"
            alt="Size Controller"
            className="w-32 h-32 transition-all duration-200"
            style={{
              filter: "none",
            }}
          />
          {/* Hover areas for different parts of the controller */}
          {/* Center button hover area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Top arrow hover area */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Bottom arrow hover area */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Left arrow hover area */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Right arrow hover area */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;