import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryStepForm from "./CategoryStepForm";

const ATMMain = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("form-details"); // Start directly with CategoryStepForm
  const [categoryExpenses, setCategoryExpenses] = useState({
    Groceries: "",
    Restaurants: "",
    "Credit Card Debt": "",
    Utilities: "",
    Insurance: "",
  });

  const categories = [
    "Groceries",
    "Restaurants",
    "Credit Card Debt",
    "Utilities",
    "Insurance",
  ];

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPhase("form-details");
    console.log("Selected category:", category);
  };

  const handleExpenseChange = (category, value) => {
    setCategoryExpenses((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setCurrentPhase("form-details"); // Reset to the initial CategoryStepForm
    setCategoryExpenses({
      Groceries: "",
      Restaurants: "",
      "Credit Card Debt": "",
      Utilities: "",
      Insurance: "",
    });
  };

  const handleNextPhase = () => {
    if (currentPhase === "form-details") {
      setCurrentPhase("budget-planning");
    } else if (currentPhase === "budget-planning") {
      setCurrentPhase("goal-setting");
    } else if (currentPhase === "goal-setting") {
      setCurrentPhase("summary");
    }
  };

  const handlePreviousPhase = () => {
    if (currentPhase === "summary") {
      setCurrentPhase("goal-setting");
    } else if (currentPhase === "goal-setting") {
      setCurrentPhase("budget-planning");
    } else if (currentPhase === "budget-planning") {
      setCurrentPhase("form-details");
    }
  };

  const getProgressBarWidth = () => {
    switch (currentPhase) {
      case "form-details":
        return "25%"; // First step is 25% complete
      case "budget-planning":
        return "50%";
      case "goal-setting":
        return "75%";
      case "summary":
        return "100%";
      default:
        return "0%"; // Fallback
    }
  };

  return (
    <div className="relative mt-4 w-[60vw] max-w-none mx-auto aspect-[1004/1200]">
      {/* ATM Image */}
      <img
        src="/assets/atm-machine-asset.svg"
        alt="ATM Machine"
        className="absolute w-full left-0 right-0 object-contain"
      />

      {/* Buttons with % positioning */}
      {/* LEFT SIDE */}
      <div className="absolute" style={{ top: "23.5%", left: "7.2%" }}>
        <ATMButton label="GOAL" />
      </div>
      <div className="absolute" style={{ top: "28.5%", left: "7.2%" }}>
        <ATMButton label="EXPENSES" />
      </div>
      <div className="absolute" style={{ top: "33.5%", left: "7.2%" }}>
        <ATMButton label="PRINT" />
      </div>
      <div className="absolute" style={{ top: "38.5%", left: "7.2%" }}>
        <ATMButton />
      </div>

      {/* RIGHT SIDE */}
      <div className="absolute" style={{ top: "23.5%", right: "9.2%" }}>
        <ATMButton label="SIMULATE ONE YEAR" small />
      </div>
      <div className="absolute" style={{ top: "28.5%", right: "9.2%" }}>
        <ATMButton label="CREATE GOAL" small />
      </div>
      <div className="absolute" style={{ top: "33.5%", right: "9.2%" }}>
        <ATMButton label="RESET" onClick={handleReset} />
      </div>
      <div className="absolute" style={{ top: "38.5%", right: "9.2%" }}>
        <ATMButton />
      </div>

      {/* BOTTOM PILLS */}
      <img
        src="/assets/Button/Off.svg"
        alt="Terms and Conditions"
        className="absolute cursor-pointer"
        style={{ top: "66%", left: "5%" }}
        onClick={() => {
          console.log("Terms and Conditions clicked");
        }}
      />

      <img
        src="/assets/cmts-suggestions.svg"
        alt="COMMENTS & SUGGESTIONS"
        className="absolute cursor-pointer"
        style={{ top: "63.5%", left: "26%" }}
        onClick={() => {
          console.log("Comments and Suggestions clicked");
        }}
      />

      {/* FORM IN CENTER WHITE SPACE */}
      <div
        className="absolute"
        style={{ top: "25%", left: "25%", width: "50%" }}
      >
        <div className="text-center p-4">
          {/* Navigation Arrows & Progress Bar */}
          <div className="flex justify-between items-center mb-4 relative">
            <button
              onClick={handlePreviousPhase}
              disabled={currentPhase === "form-details"}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-10 ${
                currentPhase === "form-details"
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-gray-600 text-gray-600 hover:bg-gray-200 bg-white"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Progress Bar - Centered, Longer, with Rounded Edges on the sides only */}
            <div className="bg-transparent w-full flex items-center justify-center absolute left-0 right-0 bottom-10 mx-auto">
              {/* This is the key change: the filling part is controlled by getProgressBarWidth */}
              <div className="flex w-2/3 max-w-xs rounded-full overflow-hidden h-1 bg-gray-400">
                {" "}
                {/* Added bg-gray-400 to the container for the track */}
                <div
                  className="h-full bg-black transition-all duration-500 ease-in-out"
                  style={{ width: getProgressBarWidth() }}
                ></div>
                {/* The gray part is now implied by the background of the container, no separate div needed */}
              </div>
            </div>

            <button
              onClick={handleNextPhase}
              disabled={currentPhase === "summary"}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-10 ${
                currentPhase === "summary"
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-gray-600 text-gray-600 hover:bg-gray-200 bg-white"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Render content based on currentPhase */}
          {currentPhase === "form-details" && (
            <CategoryStepForm selectedCategory={selectedCategory} />
          )}

          {currentPhase === "budget-planning" && (
            <div className="mb-8">
              <h2 className="font-acme text-2xl mb-4">
                How much is your monthly expenses?
              </h2>
              <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-8 w-4/6">
                Based on your chosen categories, what's your estimated monthly
                spending?
              </p>
              <div className="flex justify-start items-start gap-4 whitespace-nowrap">
                {categories.map((category, index) => (
                  <div
                    key={category}
                    className="flex items-start justify-start"
                  >
                    <div className="flex">
                      <div className="text-center">
                        <span className="font-acme text-sm">{category}</span>
                        <div className="border-l-2 border-dashed border-gray-300 h-20 mx-auto mt-2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPhase === "goal-setting" && (
            <div>
              <h2 className="font-acme text-lg mb-4">Goal Setting</h2>
              <div className="text-left space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Savings Amount
                  </label>
                  <input
                    type="number"
                    placeholder="How much do you want to save?"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time Frame
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>1 year</option>
                    <option>2 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Reduction Strategy
                  </label>
                  <textarea
                    placeholder="How will you reduce spending in this category?"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentPhase === "summary" && (
            <div>
              <h2 className="font-acme text-lg mb-4">Summary & Results</h2>
              <div className="text-left text-sm space-y-2 bg-gray-50 p-3 rounded">
                <p>
                  <strong>Category:</strong> {selectedCategory}
                </p>
                <p>
                  <strong>Budget Allocation:</strong> 15% of monthly income
                </p>
                <p>
                  <strong>Priority Level:</strong> High Priority
                </p>
                <p>
                  <strong>Savings Goal:</strong> $500
                </p>
                <p>
                  <strong>Timeline:</strong> 6 months
                </p>
                <p>
                  <strong>Monthly Target:</strong> $83.33
                </p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
                <p className="font-medium text-blue-800">Recommendation:</p>
                <p className="text-blue-700">
                  Based on your inputs, you can achieve your goal by reducing{" "}
                  {selectedCategory
                    ? selectedCategory.toLowerCase()
                    : "your spending"}{" "}
                  spending by $83 per month.
                </p>
              </div>
            </div>
          )}

          {(currentPhase === "goal-setting" || currentPhase === "summary") && (
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPhase}
                className="px-4 py-2 rounded bg-gray-500 text-white text-xs hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={
                  currentPhase === "goal-setting"
                    ? handleNextPhase
                    : handleReset
                }
                className="px-4 py-2 rounded bg-green-600 text-white text-xs hover:bg-green-700"
              >
                {currentPhase === "goal-setting"
                  ? "Review Summary"
                  : "Start New Category"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM CAROUSEL */}
      <div
        className="absolute"
        style={{ top: "78%", left: "15%", width: "70%" }}
      >
        {currentPhase === "budget-planning" ? (
          <div className="flex justify-center items-center space-x-4">
            {categories.map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div className="px-6 py-2 whitespace-nowrap font-acme text-xs bg-white border border-gray-300 rounded-full mb-2">
                  {item}
                </div>
                <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2">
                  <span className="text-sm mr-1">$</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={categoryExpenses[item]}
                    onChange={(e) => handleExpenseChange(item, e.target.value)}
                    className="w-16 text-sm border-none outline-none bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Slider
            {...{
              ...sliderSettings,
              variableWidth: true,
            }}
          >
            {categories.map((item) => (
              <div key={item} className="px-2 shrink-0">
                <button
                  onClick={() => handleCategorySelect(item)}
                  className={`
                    px-10 py-4 whitespace-nowrap
                    font-acme text-sm font-light
                    rounded-full border border-black shadow-md
                    transition-all duration-200 hover:opacity-90
                    ${
                      selectedCategory === item
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
        )}
      </div>
    </div>
  );
};

const ATMButton = ({ label, small = false, wide = false, onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundImage: `url('/assets/button.svg')`,
      width: wide ? "200px" : "100px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
      height: "40px",
    }}
    className={`font-acme ${
      small ? "text-[10px]" : "text-sm"
    } bg-transparent text-white font-bold
      rounded-[10px] shadow-md hover:opacity-90`}
  >
    {label}
  </button>
);

export default ATMMain;
