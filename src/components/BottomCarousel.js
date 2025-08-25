import React from 'react';
import Slider from "react-slick";
import GenericInputBar from './GenericInputBar';

const BottomCarousel = ({
  currentPhase,
  categories,
  selectedCategories,
  categoryExpenses,
  primaryJobIncome,
  targetSavings,
  timeFrame,
  reductionStrategy,
  onCategorySelect,
  onExpenseChange,
  onPrimaryJobIncomeChange,
  onTargetSavingsChange,
  onTimeFrameChange,
  onReductionStrategyChange,
  onIncomeInternalNext
}) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const renderFormDetailsCarousel = () => (
    <Slider {...{ ...sliderSettings, variableWidth: true }}>
      {categories.map((item) => (
        <div key={item} className="px-2 shrink-0">
          <button
            onClick={() => onCategorySelect(item)}
            className={`
              px-10 py-4 whitespace-nowrap
              font-acme text-sm font-light
              rounded-full border border-black shadow-md
              transition-all duration-200 hover:opacity-90
              touch-manipulation
              max-sm:px-6 max-sm:py-3 max-sm:text-xs max-sm:min-h-[44px]
              ${
                selectedCategories.includes(item)
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-gray-100"
              }
            `}
          >
            {item}
          </button>
        </div>
      ))}
    </Slider>
  );

  const renderBudgetPlanningCarousel = () => (
    <div className="bg-white rounded-2xl py-4 px-6 flex justify-around items-center gap-4 h-[70px]
      max-sm:flex-col max-sm:h-auto max-sm:py-6 max-sm:gap-6
    ">
      {selectedCategories.length > 0 ? (
        selectedCategories.map((item) => (
          <div key={item} className="flex items-center max-sm:flex-col max-sm:w-full max-sm:gap-3">
            <span className="text-lg font-medium text-gray-600 max-sm:text-base hidden max-sm:block">
              {item}
            </span>
            <div className="flex items-center max-sm:bg-gray-50 max-sm:rounded-lg max-sm:px-4 max-sm:py-3 max-sm:w-full">
              <span className="text-xl font-bold text-black mr-1 max-sm:text-2xl">$</span>
              <input
                type="number"
                placeholder="---"
                value={categoryExpenses[item]}
                onChange={(e) => onExpenseChange(item, e.target.value)}
                className="w-20 text-xl font-semibold text-black border-none outline-none bg-transparent text-center
                  max-sm:w-full max-sm:text-2xl max-sm:min-h-[48px]
                "
                style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full max-sm:py-4">
          Please select categories in the first step.
        </p>
      )}
    </div>
  );

  const renderIncomeDetailsCarousel = () => (
    <GenericInputBar
      placeholder="1. Write your Answer here..."
      value={primaryJobIncome}
      onChange={onPrimaryJobIncomeChange}
      onInternalNextClick={onIncomeInternalNext}
      type="text"
      showDollarSign={true}
    />
  );

  const renderGoalSettingCarousel = () => null;

  switch (currentPhase) {
    case "form-details":
      return renderFormDetailsCarousel();
    case "budget-planning":
      return renderBudgetPlanningCarousel();
    case "income-details":
      return renderIncomeDetailsCarousel();
    case "goal-setting":
      return renderGoalSettingCarousel();
    default:
      return null;
  }
};

export default BottomCarousel;