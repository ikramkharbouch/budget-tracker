import React from 'react';

const IncomeDetailsPhase = () => {
  return (
    <div className="p-4">
      <h2 className="font-acme text-2xl mb-4">
        How much is your monthly earnings?
      </h2>
      <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-6 w-4/6">
        Let's get a clear picture of your income. Include all sources that contribute to your monthly budget.
      </p>
      <div className="border-b border-gray-300 w-full my-6"></div>

      <div className="text-left">
        <p className="text-sm text-gray-800 mb-1">Question 1.</p>
        <p className="font-bold text-lg text-gray-900 mb-1">1. Primary Job Income*</p>
        <p className="text-sm text-gray-700">
          What's your average monthly take-home pay from your main job?
        </p>
      </div>
    </div>
  );
};

export default IncomeDetailsPhase;