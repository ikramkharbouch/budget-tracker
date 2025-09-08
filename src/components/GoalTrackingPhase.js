import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GoalSelectionModal from './GoalSelectionModal';
import GoalCreationModal from './GoalCreationModal';

const GoalTrackingPhase = () => {
  const { t } = useTranslation();
  
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Saving Money',
      icon: '/assets/savingMoney.svg',
      currentAmount: 400,
      targetAmount: 1500,
      leftAmount: 1100,
      progress: 26.7,
      progressColor: '#22c55e', // green
      iconBg: 'bg-orange-100'
    },
    {
      id: 2,
      name: 'Pay off Loans',
      icon: '/assets/pay-loans.svg',
      currentAmount: 20,
      targetAmount: 400,
      leftAmount: 380,
      progress: 5,
      progressColor: '#22c55e', // green
      iconBg: 'bg-blue-100'
    },
    {
      id: 3,
      name: 'Pay off Credit Card',
      icon: '/assets/credit-card.svg',
      currentAmount: 6000,
      targetAmount: 6200,
      leftAmount: 200,
      progress: 96.8,
      progressColor: '#f97316', // orange
      iconBg: 'bg-orange-100'
    },
    {
      id: 4,
      name: 'Buying a Home',
      icon: '/assets/house-ecology.svg',
      currentAmount: 200,
      targetAmount: 500,
      leftAmount: 300,
      progress: 40,
      progressColor: '#22c55e', // green
      iconBg: 'bg-green-100'
    }
  ]);

  // Modal states
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [selectedGoalData, setSelectedGoalData] = useState(null);

  const formatAmount = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  const handleAddGoal = () => {
    setIsSelectionModalOpen(true);
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
    setGoals(prevGoals => [...prevGoals, newGoal]);
    setIsCreationModalOpen(false);
    setSelectedGoalData(null);
  };

  const handleCloseModals = () => {
    setIsSelectionModalOpen(false);
    setIsCreationModalOpen(false);
    setSelectedGoalData(null);
  };

  return (
    <div className="w-full h-full mt-[-25px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        {/* Back Button */}
        <button className="w-11 h-11 rounded-full bg-transparent flex items-center justify-center hover:bg-gray-50">
          <img 
            src="/assets/back-button.svg" 
            alt="Back"
            className="w-full h-full object-contain"
          />
        </button>
        
        {/* Title */}
        <h1 className="text-3xl font-medium text-black tracking-wide">GOAL</h1>
        
        {/* Add Button */}
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
            className="bg-white rounded-xl border border-black shadow-sm max-h-min py-1"
          >
            <div className="flex items-center gap-2 p-0 sm:px-5">
              {/* Goal Icon */}
              <div className={`w-16 md:w-16 sm:w-16 h-16 md:h-16 sm:h-16 rounded-lg ${goal.iconBg} flex items-center justify-center flex-shrink-0 border border-1 border-black`}>
                <img 
                  src={goal.icon} 
                  alt={goal.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-10 h-10 rounded bg-gray-400 hidden items-center justify-center">
                  <span className="text-white text-xs font-regular">
                    {goal.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Goal Content */}
              <div className="flex-1">
                {/* Title and Target Amount */}
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
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full mb-2" style={{ height: '6px' }}>
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{ 
                      width: `${goal.progress}%`, 
                      height: '6px',
                      backgroundColor: goal.progressColor
                    }}
                  />
                </div>
                
                {/* Current and Target Amounts */}
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

      {/* Goal Selection Modal */}
      <GoalSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={handleCloseModals}
        onNext={handleGoalSelection}
      />

      {/* Goal Creation Modal */}
      <GoalCreationModal
        isOpen={isCreationModalOpen}
        onClose={handleCloseModals}
        onBack={handleBackToSelection}
        onCreateGoal={handleCreateGoal}
        goalData={selectedGoalData}
      />
    </div>
  );
};

export default GoalTrackingPhase;