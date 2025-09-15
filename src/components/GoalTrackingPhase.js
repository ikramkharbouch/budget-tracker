import React, { useState } from "react";
// import { useTranslation } from 'react-i18next';
import GoalSelectionModal from "./GoalSelectionModal";
import GoalCreationModal from "./GoalCreationModal";

const GoalTrackingPhase = () => {
  // const { t } = useTranslation();

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Saving Money",
      icon: "/assets/money-cash-business-cart-finance-svgrepo-com 1.svg",
      currentAmount: 400,
      targetAmount: 1500,
      leftAmount: 1100,
      progress: 26.7,
      progressColor: "#22c55e",
      iconBg: "bg-orange-100",
    },
    {
      id: 2,
      name: "Pay off Loans",
      icon: "/assets/goal-pay-off-loans.svg",
      currentAmount: 20,
      targetAmount: 400,
      leftAmount: 380,
      progress: 5,
      progressColor: "#22c55e",
      iconBg: "bg-blue-100",
    },
    {
      id: 3,
      name: "Pay off Credit Card",
      icon: "/assets/goals-credit-card.svg",
      currentAmount: 6000,
      targetAmount: 6200,
      leftAmount: 200,
      progress: 96.8,
      progressColor: "#f97316",
      iconBg: "bg-orange-100",
    },
    {
      id: 4,
      name: "Buying a Home",
      icon: "/assets/goal-buying-house.svg",
      currentAmount: 200,
      targetAmount: 500,
      leftAmount: 300,
      progress: 40,
      progressColor: "#22c55e",
      iconBg: "bg-green-100",
    },
  ]);

  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [selectedGoalData, setSelectedGoalData] = useState(null);

  const [showGoalDetail, setShowGoalDetail] = useState(false);

  const formatAmount = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  const handleAddGoal = () => {
    // setIsSelectionModalOpen(true);
  };

  const handleGoalClick = (goal) => {
    setSelectedGoalData(goal);
    setShowGoalDetail(true);
  };

  const handleBack = () => {
    setShowGoalDetail(false);
    setSelectedGoalData(null);
  };

  const handleGoalSelection = (goalData) => {
    setSelectedGoalData(goalData);
    setIsSelectionModalOpen(false);
    setIsCreationModalOpen(true);
  };

  const handleBackToSelection = () => {
    setIsCreationModalOpen(false);
    setIsSelectionModalOpen(true);
  };

  const handleCreateGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsCreationModalOpen(false);
    setSelectedGoalData(null);
  };

  const handleCloseModals = () => {
    setIsSelectionModalOpen(false);
    setIsCreationModalOpen(false);
    setSelectedGoalData(null);
  };

  const renderGoalDetail = () => {
    if (!selectedGoalData) return null;

    const dueDate = "09/05/2026";
    const note = "Note: Trying to save up this one for my niece's birthday!";
    const remainingAmount =
      selectedGoalData.targetAmount - selectedGoalData.currentAmount;

    return (
      <div className="w-full h-full mt-[-25px] flex flex-col items-center mr-10">
        <div className="flex items-center justify-between mb-6 px-4 w-full">
          <button
            onClick={handleBack}
            className="w-11 h-11 rounded-full bg-transparent flex items-center justify-center hover:bg-gray-50"
          >
            <img
              src="/assets/back-button.svg"
              alt="Back"
              className="w-full h-full object-contain"
            />
          </button>

          <h1 className="text-3xl font-medium text-black tracking-wide">
            {selectedGoalData.name}
          </h1>

          <button className="w-5.5 h-5.5 rounded-full bg-transparent flex items-center justify-center hover:bg-gray-50 border-2 border-gray-600 p-2">
            <img
              src="/assets/goals-menu.svg"
              alt="menu"
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-black shadow-sm p-4 w-full h-full">
          <div className="flex items-start gap-4">
            <div
              className={`w-20 h-20 rounded-md ${selectedGoalData.iconBg} flex items-center justify-center flex-shrink-0 border border-1 border-black`}
            >
              <img
                src={selectedGoalData.icon}
                alt={selectedGoalData.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 max-w-max text-left font-inter">
              <h3 className="font-regular text-lg text-black">Goal</h3>
              <p className="font-medium text-md">
                {formatAmount(selectedGoalData.targetAmount)}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 bg-black"
                  style={{
                    maskImage: "url(/assets/calendar.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                  }}
                ></div>
                <p className="text-sm">{dueDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 relative">
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="h-full rounded-full transition-all duration-300"
      style={{
        width: `${selectedGoalData.progress}%`,
        backgroundColor: selectedGoalData.progressColor,
      }}
    />
  </div>

  {/* Left pointer at the start of the filled bar */}
  <div
    className="absolute z-10"
    style={{
      left: `calc(0% + 1px)`,
      bottom: `-6px`,
      width: 0,
      height: 0,
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderTop: `7px solid ${selectedGoalData.progressColor}`,
    }}
  />

  {/* Gray pointer at the very end of the bar (max value) */}
  <div
    className="absolute z-10"
    style={{
      right: `1px`,
      bottom: `-6px`,
      width: 0,
      height: 0,
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderTop: `7px solid #e5e7eb`,
    }}
  />
</div>



<div className="flex justify-between mt-2 text-sm font-medium">
  <span className="text-green-600">
    {formatAmount(selectedGoalData.currentAmount)}
  </span>
  <span className="text-gray-600 font-regular">
    {formatAmount(remainingAmount)}
  </span>
</div>

          {/* Notes section */}
          <div className="mt-4">
            <textarea
              className="w-full h-32 p-3 text-sm text-gray-800 border border-black rounded-lg resize-none"
              placeholder="Add your notes here..."
              defaultValue={note}
            ></textarea>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full mt-[-25px]">
      {showGoalDetail ? (
        renderGoalDetail()
      ) : (
        <>
          <div className="flex items-center justify-between mb-6 px-4">
            <button className="w-11 h-11 rounded-full bg-transparent flex items-center justify-center hover:bg-gray-50">
              <img
                src="/assets/back-button.svg"
                alt="Back"
                className="w-full h-full object-contain"
              />
            </button>

            <h1 className="text-3xl font-medium text-black tracking-wide">
              GOAL
            </h1>

            <button
              onClick={handleAddGoal}
              className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center hover:bg-gray-50"
            >
              <img
                src="/assets/add-circle.svg"
                alt="Add Goal"
                className="w-full h-full object-contain"
              />
            </button>
          </div>

          {/* Goals List */}
          <div className="space-y-2 mt-[-10px]">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white rounded-xl border border-black shadow-sm max-h-min py-1 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex items-center gap-2 p-0 sm:px-5">
                  <div
                    className={`w-16 md:w-16 sm:w-16 h-16 md:h-16 sm:h-16 rounded-lg ${goal.iconBg} flex items-center justify-center flex-shrink-0 border border-1 border-black`}
                  >
                    <img
                      src={goal.icon}
                      alt={goal.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="w-10 h-10 rounded bg-gray-400 hidden items-center justify-center">
                      <span className="text-white text-xs font-regular">
                        {goal.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-inter font-normal text-[13.13px] leading-[100%] tracking-normal text-center">
                        {goal.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-lg md:text-sm sm:text-sm font-medium text-black">
                          {formatAmount(goal.targetAmount)}
                        </div>
                      </div>
                    </div>

                    <div
                      className="w-full bg-gray-200 rounded-full mb-2"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: `${goal.progress}%`,
                          height: "6px",
                          backgroundColor: goal.progressColor,
                        }}
                      />
                    </div>

                    <div className="flex justify-between">
                      <span className="text-lg md:text-sm sm:text-sm font-medium text-black">
                        {formatAmount(goal.currentAmount)}
                      </span>
                      <span className="text-lg md:text-sm sm:text-sm font-medium text-black">
                        {formatAmount(goal.targetAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <GoalSelectionModal
            isOpen={isSelectionModalOpen}
            onClose={handleCloseModals}
            onNext={handleGoalSelection}
          />

          <GoalCreationModal
            isOpen={isCreationModalOpen}
            onClose={handleCloseModals}
            onBack={handleBackToSelection}
            onCreateGoal={handleCreateGoal}
            goalData={selectedGoalData}
          />
        </>
      )}
    </div>
  );
};

export default GoalTrackingPhase;
