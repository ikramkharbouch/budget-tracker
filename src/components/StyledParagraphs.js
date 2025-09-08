import React, { useState } from 'react';

const StyledParagraphs = () => {
  const [activeTab, setActiveTab] = useState('Savings');
  const [activePeriod, setActivePeriod] = useState('Yearly');

  const getTabClass = (tabName) => {
    return `px-4 py-2 rounded-full cursor-pointer transition-colors duration-200  ${
      activeTab === tabName
        ? 'bg-black text-white'
        : 'text-black'
    }`;
  };

  const getPeriodClass = (periodName) => {
    return `px-6 py-2 rounded-full cursor-pointer transition-colors duration-200 ${
      activePeriod === periodName
        ? 'bg-black text-white'
        : 'text-black'
    }`;
  };

  return (
      <div className="flex justify-between mt-5 sm:max-w-max space-x-4">
        <div className="flex border-black border rounded-full overflow-hidden">
          <div
            className={getTabClass('Savings')}
            onClick={() => setActiveTab('Savings')}
          >
            Savings
          </div>
          <div
            className={getTabClass('Expenses')}
            onClick={() => setActiveTab('Expenses')}
          >
            Expenses
          </div>
        </div>

        <div className="flex border-black border rounded-full overflow-hidden">
          <div
            className={getPeriodClass('Monthly')}
            onClick={() => setActivePeriod('Monthly')}
          >
            Monthly
          </div>
          <div
            className={getPeriodClass('Yearly')}
            onClick={() => setActivePeriod('Yearly')}
          >
            Yearly
          </div>
        </div>
      </div>
  );
};

export default StyledParagraphs;
