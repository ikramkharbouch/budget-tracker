import React from 'react';

const ProgressBar = ({ currentPhase }) => {
  const getProgressBarWidth = () => {
    switch (currentPhase) {
      case "form-details":
        return "20%";
      case "budget-planning":
        return "40%";
      case "income-details":
        return "60%";
      case "goal-setting":
        return "80%";
      case "summary":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4">
      <div className="w-2/3 bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-black h-1.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: getProgressBarWidth() }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;