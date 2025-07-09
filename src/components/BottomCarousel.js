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
    <div className="bg-white rounded-2xl py-4 px-6 flex justify-around items-center gap-4 h-[70px]">
      {selectedCategories.length > 0 ? (
        selectedCategories.map((item) => (
          <div key={item} className="flex items-center">
            <span className="text-xl font-bold text-black mr-1">$</span>
            <input
              type="number"
              placeholder="---"
              value={categoryExpenses[item]}
              onChange={(e) => onExpenseChange(item, e.target.value)}
              className="w-20 text-xl font-semibold text-black border-none outline-none bg-transparent text-center"
              style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full">Please select categories in the first step.</p>
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

  const renderGoalSettingCarousel = () => (
    <div className="bg-white rounded-2xl py-4 px-6 flex justify-around items-center gap-4 h-[70px]">
      <div className="flex items-center">
        <span className="text-sm font-bold text-gray-800 mr-1">Target $:</span>
        <input
          type="number"
          placeholder="500"
          value={targetSavings}
          onChange={onTargetSavingsChange}
          className="w-20 text-xl font-semibold text-gray-800 border-none outline-none bg-transparent text-center"
          style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }}
        />
      </div>
      <div className="flex items-center">
        <span className="text-sm font-bold text-gray-800 mr-1">Time:</span>
        <select
          value={timeFrame}
          onChange={onTimeFrameChange}
          className="w-24 text-xl font-semibold text-gray-800 border-none outline-none bg-transparent text-center"
        >
          <option value="3 months">3 mos</option>
          <option value="6 months">6 mos</option>
          <option value="1 year">1 year</option>
          <option value="2 years">2 years</option>
        </select>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-bold text-gray-800 mr-1">Strategy:</span>
        <input
          type="text"
          placeholder="Reduce X by Y"
          value={reductionStrategy}
          onChange={onReductionStrategyChange}
          className="w-24 text-xl font-semibold text-gray-800 border-none outline-none bg-transparent text-center"
        />
      </div>
    </div>
  );

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