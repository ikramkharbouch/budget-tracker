import React from 'react';

const GoalSettingPhase = ({ targetSavings, timeFrame, reductionStrategy }) => {
  return (
    <div className="p-4">
      <h2 className="font-acme text-2xl mb-4">Set Your Savings Goal</h2>
      <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-8 w-4/6">
        Define your financial aspirations to help us tailor your budget.
      </p>
      <div className="text-left space-y-4">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <label className="block text-sm font-medium mb-1">
            Target Savings Amount:
          </label>
          <p className="font-acme text-gray-700 text-xl">${targetSavings || "_____"}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <label className="block text-sm font-medium mb-1">
            Time Frame:
          </label>
          <p className="font-acme text-gray-700 text-xl">{timeFrame || "_____"}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <label className="block text-sm font-medium mb-1">
            Reduction Strategy:
          </label>
          <p className="font-acme text-gray-700 text-xl">{reductionStrategy || "_____"}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalSettingPhase;