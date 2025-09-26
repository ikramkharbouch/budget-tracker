import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GoalSelectionModal = ({ isOpen, onClose, onNext }) => {
  const { t } = useTranslation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [customGoalName, setCustomGoalName] = useState('');

  const predefinedGoals = [
    {
      id: 'credit-card',
      name: 'Pay off Credit Card',
      icon: '/assets/credit-card.svg',
      iconColor: '#FF6B35'
    },
    {
      id: 'loans',
      name: 'Pay off Loans',
      icon: '/assets/pay-loans.svg',
      iconColor: '#4A90E2'
    },
    {
      id: 'home',
      name: 'Buying a Home',
      icon: '/assets/house-ecology.svg',
      iconColor: '#7ED321'
    },
    {
      id: 'saving',
      name: 'Saving Money',
      icon: '/assets/savingMoney.svg',
      iconColor: '#F5A623'
    },
    {
      id: 'purchase',
      name: 'Making Big Purchase',
      icon: '/assets/goal-making-big-purchases.svg',
      iconColor: '#50E3C2'
    },
    {
      id: 'emergency',
      name: 'Dealing with an Emergency',
      icon: '/assets/goal-emergency.svg',
      iconColor: '#F8E71C'
    }
  ];

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);
    if (goalId !== 'others') {
      setCustomGoalName('');
    }
  };

  const handleNext = () => {
    if (!selectedGoal) return;
    
    const goalData = {
      type: selectedGoal,
      name: selectedGoal === 'others' ? customGoalName : predefinedGoals.find(g => g.id === selectedGoal)?.name,
      icon: selectedGoal === 'others' ? '/assets/goal-others.svg' : predefinedGoals.find(g => g.id === selectedGoal)?.icon
    };
    
    onNext(goalData);
  };

  const isNextDisabled = !selectedGoal || (selectedGoal === 'others' && !customGoalName.trim());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[600px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 rounded-t-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-800 tracking-wider">PICK A GOAL</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-8">
          {/* Goal Options Grid - 3x2 layout */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {predefinedGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                  selectedGoal === goal.id
                    ? 'bg-blue-100 shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
                  style={{ 
                    backgroundColor: `${goal.iconColor}20`,
                    border: `2px solid ${goal.iconColor}40`
                  }}
                >
                  <img 
                    src={goal.icon} 
                    alt={goal.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-sm text-center font-medium text-gray-700 leading-tight px-1">
                  {goal.name}
                </span>
              </button>
            ))}
          </div>

          {/* Others Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {/* Others Button */}
              <button
                onClick={() => handleGoalSelect('others')}
                className={`flex flex-col items-center justify-center w-24 transition-all ${
                  selectedGoal === 'others'
                    ? 'scale-105'
                    : ''
                }`}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: '#E91E6320', border: '2px solid #E91E6340' }}
                >
                  <img src="/assets/goal-others.svg" alt="Others" className="w-12 h-12 object-contain" />
                </div>
                <span className="text-sm text-center font-medium text-gray-700">
                  Others
                </span>
              </button>

              {/* Input Field */}
              <div className="w-80">
                <input
                  type="text"
                  value={customGoalName}
                  onChange={(e) => setCustomGoalName(e.target.value)}
                  placeholder="Others Name"
                  className="w-full px-3 py-3 text-base border-2 border-black rounded-xl focus:outline-none focus:border-blue-500 transition-colors placeholder-black"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  maxLength={50}
                />
                <div className="text-center text-black mt-2" style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '7.82px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}>
                  10 words limit
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              isNextDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 active:scale-98'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSelectionModal;