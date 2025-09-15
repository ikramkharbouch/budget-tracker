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
      icon: "https://placehold.co/100x100/FFF7E6/000000?text=S",
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
      icon: "https://placehold.co/100x100/E5F1FF/000000?text=P",
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
      icon: "https://placehold.co/100x100/FFF7E6/000000?text=C",
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
      icon: "https://placehold.co/100x100/E5F1FF/000000?text=B",
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
      <div className="w-full h-full mt-[-25px] flex flex-col items-center">
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

        <div className="bg-white rounded-xl border border-black shadow-sm p-4 w-full max-w-sm">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-lg ${selectedGoalData.iconBg} flex items-center justify-center flex-shrink-0 border border-1 border-black`}
            >
              <img
                src={selectedGoalData.icon}
                alt={selectedGoalData.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg text-black">Goal</h3>
              <p className="font-normal text-md text-gray-700">
                {formatAmount(selectedGoalData.targetAmount)}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src="https://www.svgrepo.com/show/511529/calendar-166.svg"
                  alt="Calendar Icon"
                  className="w-4 h-4"
                />
                <p className="text-sm text-gray-500">{dueDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {/* Progress bar with milestones and current marker */}
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${selectedGoalData.progress}%`,
                    backgroundColor: selectedGoalData.progressColor,
                  }}
                />
              </div>

              {/* Milestone ticks at 0%, 25%, 50%, 75%, 100% */}
              {[0, 25, 50, 75, 100].map((pct) => (
                <div
                  key={`tick-${pct}`}
                  className="absolute -top-1 h-4 w-[1px] bg-gray-400"
                  style={{ left: `${pct}%` }}
                />
              ))}

              {/* Current progress marker (dot) */}
              <div
                className="absolute -top-[6px] -translate-x-1/2 h-3 w-3 rounded-full border border-black"
                style={{
                  left: `${selectedGoalData.progress}%`,
                  backgroundColor: selectedGoalData.progressColor,
                }}
                title={`${Math.round(selectedGoalData.progress)}%`}
              />
            </div>

            <div className="flex justify-between mt-2 text-sm font-medium">
              <span className="text-black">
                {formatAmount(selectedGoalData.currentAmount)}
              </span>
              <span className="text-gray-500">
                {formatAmount(remainingAmount)}
              </span>
            </div>
          </div>

          {/* Notes section */}
          <div className="mt-4">
            <textarea
              className="w-full h-32 p-3 text-sm text-gray-800 border rounded-lg resize-none"
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

                    <div className="relative w-full mb-2" style={{ height: "6px" }}>
                      <div
                        className="w-full bg-gray-200 rounded-full h-full"
                      >
                        <div
                          className="rounded-full transition-all duration-300 h-full"
                          style={{
                            width: `${goal.progress}%`,
                            backgroundColor: goal.progressColor,
                          }}
                        />
                      </div>
                      {[0, 25, 50, 75, 100].map((pct) => (
                        <div
                          key={`tick-${goal.id}-${pct}`}
                          className="absolute -top-1 h-4 w-[1px] bg-gray-400"
                          style={{ left: `${pct}%` }}
                        />
                      ))}
                      <div
                        className="absolute -top-[7px] -translate-x-1/2 h-3 w-3 rounded-full border border-black"
                        style={{
                          left: `${goal.progress}%`,
                          backgroundColor: goal.progressColor,
                        }}
                        title={`${Math.round(goal.progress)}%`}
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
