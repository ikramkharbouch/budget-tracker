import React from 'react';
import { useTranslation } from "react-i18next";

const GoalPopup = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Semi-transparent overlay to dim the background of the entire ATM machine */}
      <div className="absolute inset-0 z-40 bg-black opacity-50" onClick={onClose}></div>
      
      {/* The modal is now centered and sized to fit the content */}
      <div 
        className="absolute z-50 rounded-2xl border-4 border-black bg-white shadow-lg p-4 md:p-6"
        style={{ 
          width: '45%', 
          height: 'max-content',
          // Moves the pop-up closer to the top
          top: '40%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center">
            <img src="/assets/back-button.svg" alt="Back" />
          </button>
          <h2 className="text-sm font-bold">PICK A GOAL</h2>
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center">
            <img src="/assets/add-circle.svg" alt="Close" className="rotate-45" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-y-4 text-center mb-2">
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goals-credit-card.svg" alt="Pay off Credit Card" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Pay off Credit Card</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goal-pay-off-loans.svg" alt="Pay off Loans" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Pay off Loans</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goal-buying-house.svg" alt="Buying a Home" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Buying a Home</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goal-saving-money.svg" alt="Saving Money" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Saving Money</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goal-making-big-purchases.svg" alt="Making Big Purchase" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Making Big Purchase</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goal-emergency.svg" alt="Dealing with an Emergency" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Dealing with an Emergency</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 flex items-center justify-center mb-1">
              <img src="/assets/goal-others.svg" alt="Others" className="w-full h-full object-contain" />
            </button>
            <span className="text-[9px] font-medium">Others</span>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-start mt-2">
            <div className="w-full flex flex-col items-center px-4">
              <input
                type="text"
                placeholder="Others Name"
                className="w-full px-2 py-1 border-2 border-gray-400 rounded-lg text-center font-medium placeholder-gray-500 text-[10px] focus:outline-none focus:border-black"
              />
              <span className="text-[7px] text-gray-500 mt-1">10 words limit</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-black text-white px-4 py-1.5 rounded-xl font-medium text-xs">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default GoalPopup;