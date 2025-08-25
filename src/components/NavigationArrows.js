import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationArrows = ({ 
  currentPhase, 
  onPrevious, 
  onNext, 
  onReset 
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentPhase === "form-details"}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-10 
          touch-manipulation max-sm:w-12 max-sm:h-12
          ${currentPhase === "form-details"
            ? "border-gray-400 text-gray-400 cursor-not-allowed"
            : "border-gray-600 text-gray-600 hover:bg-gray-200 bg-white"
          }`}
      >
        <ArrowLeft className="w-4 h-4 max-sm:w-6 max-sm:h-6" />
      </button>

      <button
        onClick={currentPhase === "summary" ? onReset : onNext}
        disabled={currentPhase === "summary"}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-10 
          touch-manipulation max-sm:w-12 max-sm:h-12
          ${currentPhase === "summary"
            ? "border-gray-400 text-gray-400 cursor-not-allowed"
            : "border-gray-600 text-gray-600 hover:bg-gray-200 bg-white"
          }`}
      >
        <ArrowRight className="w-4 h-4 max-sm:w-6 max-sm:h-6" />
      </button>
    </div>
  );
};

export default NavigationArrows;