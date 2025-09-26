import React, { useState } from 'react';

const GoalCreationModal = ({ isOpen, onClose, onBack, onCreateGoal, goalData }) => {
  const [goalName, setGoalName] = useState(goalData?.name || '');
  const [targetAmount, setTargetAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleCreate = () => {
    if (!goalName || !targetAmount) return;
    
    const newGoal = {
      id: Date.now(),
      name: goalName,
      icon: '/assets/money-cash-business-cart-finance-svgrepo-com 1.svg',
      currentAmount: 0,
      targetAmount: parseInt(targetAmount),
      leftAmount: parseInt(targetAmount),
      progress: 0,
      progressColor: '#22c55e',
      iconBg: 'bg-orange-100',
      notes: notes
    };
    
    onCreateGoal(newGoal);
  };

  const isCreateDisabled = !goalName.trim() || !targetAmount.trim();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] mx-4">

        <div className="flex items-center justify-between px-8 py-4 rounded-t-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
          <button onClick={onBack} className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-gray-800 tracking-wider" style={{ 
            fontFamily: 'Inter, sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>CREATE A GOAL</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-8 mt-5">
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 py-2 border border-black rounded-lg bg-white">
              <span style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: '#000000'
              }}>
                FUNDS AVAILABLE FOR NEW GOALS
              </span>
              <span style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                color: '#000000'
              }}>
                $700
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="w-28 h-28 rounded-lg border border-black bg-orange-100 flex items-center justify-center flex-shrink-0">
                {goalData?.icon ? (
                  <img 
                    src={goalData.icon} 
                    alt={goalData.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-pink-500 text-3xl">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Right side content */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Goal Name Input */}
                <div>
                  <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Goal Name"
                    className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400
                    }}
                  />
                </div>

                {/* Amount and Date Section */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="$600"
                      className="w-full px-2 py-2 border border-black rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    />
                  </div>
                  <button className="w-12 h-12 border border-black rounded-lg flex items-center justify-center hover:bg-gray-50">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </button>
                </div>

                {/* Estimated Date */}
                <div className="text-right">
                  <span style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#666666'
                  }}>
                    Estimated date: a year
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mb-8">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Note: Trying to save up this one for my niece's birthday!"
              rows="8"
              className="w-full px-4 py-4 border border-black rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder-black"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.5'
              }}
            />
          </div>

          {/* Done Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={isCreateDisabled}
              className={`px-24 py-3 rounded-lg transition-all ${
                isCreateDisabled
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 active:scale-98'
              }`}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCreationModal;