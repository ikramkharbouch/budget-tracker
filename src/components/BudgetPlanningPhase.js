import React from 'react';

const BudgetPlanningPhase = ({ selectedCategories }) => {
  return (
    <div className="p-4">
      <h2 className="font-acme text-2xl mb-4">
        How much is your monthly expenses?
      </h2>
      <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-4 w-4/6">
        Based on your chosen categories, what's your estimated monthly
        spending?
      </p>
      <div className="flex justify-center items-start gap-4 whitespace-nowrap">
        {selectedCategories.length > 0 ? (
          selectedCategories.map((category) => (
            <div key={category} className="flex flex-col items-center">
              <span className="font-acme text-xs text-gray-700 border border-black px-3 py-2 rounded-full">
                {category}
              </span>
              <div className="border-l-2 border-dashed border-black h-24 mx-auto mt-2"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No categories selected. Please go back and select some.
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetPlanningPhase;