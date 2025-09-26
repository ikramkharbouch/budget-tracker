import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Custom Hooks
import { useOnboardingState } from "../hooks/onBoardingState";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { usePrinting } from "../hooks/usePrinting";

// Import Layout Components
import ATMDesktopLayout from "./layout/ATMDesktopLayout";
import ATMMobileLayout from "./layout/ATMMobileLayout";

// Import Modals (Kept at root for simple overlay logic)
import GoalPopup from "./goals/GoalPopup";
import ResetConfirmationPopup from "./modals/ResetConfirmationPopup";


const ATMMain = () => {
  const { t } = useTranslation();
  
  // 1. Hook Initialization and State Management
  const componentRef = useRef();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleClosePopup = () => setIsPopupVisible(false);

  const state = useOnboardingState();
  const navigation = useOnboardingNavigation(
    state.dispatch,
    state.currentPhase,
    state.selectedCategories,
    state.categoryExpenses,
    state.primaryJobIncome,
    state.targetSavings,
    state.timeFrame,
    state.reductionStrategy
  );
  const printing = usePrinting(componentRef);
  
  // 2. Combined Props for Layouts
  // This gathers all necessary state and handlers from the hooks into one object.
  const allProps = {
    ...state,
    ...navigation,
    ...printing,
  };

  return (
    <>
      {/* DESKTOP VERSION - Renders the complex layout component */}
      <div className="hidden lg:block">
        <ATMDesktopLayout {...allProps} />
      </div>

      {/* MOBILE VERSION - Renders the simpler, responsive layout component */}
      <div className="lg:hidden">
        <ATMMobileLayout {...allProps} />
      </div>

      {/* Modals and Popups (Rendered outside the layouts for stacking/overlay) */}
      
      {isPopupVisible && <GoalPopup onClose={handleClosePopup} />}
      
      {allProps.isResetPopupVisible && (
        <ResetConfirmationPopup
          isVisible={allProps.isResetPopupVisible}
          onClose={allProps.handleCloseResetPopup}
          onConfirm={allProps.handleConfirmReset}
        />
      )}
      
      {/* Print Popup Logic (Extracted from old ATMMain JSX, simplified) */}
      {allProps.isPrintPopupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center" // Use fixed/inset-0 for true overlay
        >
          {/* Print Popup content (simplified for brevity, you'll use your full JSX) */}
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-xl mb-4">{t("print.title", "Save/Print Report")}</h2>
            <button 
              onClick={allProps.handleClosePrintPopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            
            {/* The printable component reference is still here, although hidden */}
            {/* <div style={{ display: "none" }}>
              <PrintableSummary ref={componentRef} />
            </div> */}
            
            <button
              onClick={allProps.reactToPrintFn}
              className="mt-4 bg-black text-white py-2 px-4 rounded"
            >
              {t("print.savePdf", "Save as PDF")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ATMMain;