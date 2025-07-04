import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryStepForm from "./CategoryStepForm";
import GenericInputBar from "./GenericInputBar";
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ATMMain = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPhase, setCurrentPhase] = useState("form-details");
  const [categoryExpenses, setCategoryExpenses] = useState({
    Groceries: "",
    Restaurants: "",
    "Credit Card Debt": "",
    Utilities: "",
    Insurance: "",
  });
  const [targetSavings, setTargetSavings] = useState("");
  const [timeFrame, setTimeFrame] = useState("3 months");
  const [reductionStrategy, setReductionStrategy] = useState("");
  const [primaryJobIncome, setPrimaryJobIncome] = useState("");


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
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        setCategoryExpenses(prev => ({ ...prev, [category]: "" }));
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
    console.log("Selected categories toggled:", category);
  };

  const handleExpenseChange = (category, value) => {
    const numericValue = value === "" ? "" : Number(value);
    setCategoryExpenses((prev) => ({
      ...prev,
      [category]: numericValue,
    }));
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setCurrentPhase("form-details");
    setCategoryExpenses({
      Groceries: "",
      Restaurants: "",
      "Credit Card Debt": "",
      Utilities: "",
      Insurance: "",
    });
    setTargetSavings("");
    setTimeFrame("3 months");
    setReductionStrategy("");
    setPrimaryJobIncome("");
  };

  const handleIncomeInternalNext = () => {
    if (!primaryJobIncome || parseFloat(primaryJobIncome) <= 0) {
      alert("Please enter a valid amount for your primary job income.");
      return;
    }
  };

  const handleNextPhase = () => {
    if (currentPhase === "form-details" && selectedCategories.length === 0) {
      alert("Please select at least one category before proceeding.");
      return;
    }

    if (currentPhase === "budget-planning") {
      const allExpensesEntered = selectedCategories.every(category => {
        const expense = parseFloat(categoryExpenses[category]);
        return !isNaN(expense) && expense >= 0 && categoryExpenses[category] !== '';
      });
      if (!allExpensesEntered) {
        alert("Please enter a valid expense for all selected categories before proceeding.");
        return;
      }
    }
    if (currentPhase === "income-details") {
      if (!primaryJobIncome || parseFloat(primaryJobIncome) <= 0) {
        alert("Please enter a valid amount for your primary job income.");
        return;
      }
    }
    if (currentPhase === "goal-setting") {
      if (!targetSavings || parseFloat(targetSavings) <= 0 || !timeFrame || reductionStrategy.trim() === '') {
        alert("Please fill in all goal setting details (Target Savings > 0, Time Frame, and Reduction Strategy).");
        return;
      }
    }

    if (currentPhase === "form-details") {
      setCurrentPhase("budget-planning");
    } else if (currentPhase === "budget-planning") {
      setCurrentPhase("income-details");
    } else if (currentPhase === "income-details") {
      setCurrentPhase("goal-setting");
    } else if (currentPhase === "goal-setting") {
      setCurrentPhase("summary");
    }
  };

  const handlePreviousPhase = () => {
    if (currentPhase === "summary") {
      setCurrentPhase("goal-setting");
    } else if (currentPhase === "goal-setting") {
      setCurrentPhase("income-details");
    } else if (currentPhase === "income-details") {
      setCurrentPhase("budget-planning");
    } else if (currentPhase === "budget-planning") {
      setCurrentPhase("form-details");
    }
  };

  const getProgressBarWidth = () => {
    switch (currentPhase) {
      case "form-details":
        return "20%";
      case "budget-planning":
        return "40%";
      case "income-details":
        return "60%";
      case "goal-setting":
        return "80%";
      case "summary":
        return "100%";
      default:
        return "0%";
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
        <div className="text-center">
          {/* Progress Bar Line */}
          <div className="flex-grow flex items-center justify-center px-4">
            <div className="w-2/3 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-black h-1.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: getProgressBarWidth() }}
              ></div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousPhase}
              disabled={currentPhase === "form-details"}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-10 ${
                currentPhase === "form-details"
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-gray-600 text-gray-600 hover:bg-gray-200 bg-white"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={
                  currentPhase === "summary"
                      ? handleReset
                      : handleNextPhase
              }
              disabled={currentPhase === "summary"}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm z-10 ${
                currentPhase === "summary"
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-gray-600 text-gray-600 hover:bg-gray-200 bg-white"
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

           {/* Phase 1: Category Selection */}
           {currentPhase === "form-details" && (
            <div className="p-4">
              <CategoryStepForm selectedCategories={selectedCategories} />
            </div>
           )}

           {/* Phase 2: Budget Planning - Expense Questions */}
           {currentPhase === "budget-planning" && (
            <div className="p-4">
              <h2 className="font-acme text-2xl mb-4 ">
                How much is your monthly expenses?
              </h2>
              <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-4 w-4/6">
                Based on your chosen categories, what's your estimated monthly
                spending?
              </p>
              <div className="flex justify-center items-start gap-4 whitespace-nowrap">
                {selectedCategories.length > 0 ? (
                  selectedCategories.map((category) => (
                    <div key={category} className="flex flex-col items-center">
                      <span className="font-acme text-xs text-gray-700 border border-black px-3 py-2 rounded-full">{category}</span>
                      <div className="border-l-2 border-dashed border-black h-24 mx-auto mt-2"></div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No categories selected. Please go back and select some.
                  </p>
                )}
              </div>
            </div>
           )}

           {/* Phase 3: Income Details - Content */}
           {currentPhase === "income-details" && (
            <div className="p-4">
              <h2 className="font-acme text-2xl mb-4">
                How much is your monthly earnings?
              </h2>
              <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-6 w-4/6">
                Let's get a clear picture of your income. Include all sources that contribute to your monthly budget.
              </p>
              <div className="border-b border-gray-300 w-full my-6"></div>

              <div className="text-left">
                  <p className="text-sm text-gray-800 mb-1">Question 1.</p>
                  <p className="font-bold text-lg text-gray-900 mb-1">1. Primary Job Income*</p>
                  <p className="text-sm text-gray-700">
                    What's your average monthly take-home pay from your main job?
                  </p>
              </div>
            </div>
           )}

           {/* Phase 4: Goal Setting - Questions */}
           {currentPhase === "goal-setting" && (
            <div className="p-4">
              <h2 className="font-acme text-2xl mb-4">Set Your Savings Goal</h2>
              <p className="text-gray-900 mx-auto font-inter font-normal text-[11.28px] leading-[100%] tracking-[0em] text-center mb-8 w-4/6">
                Define your financial aspirations to help us tailor your budget.
              </p>
              <div className="text-left space-y-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                      <label className="block text-sm font-medium mb-1">
                          Target Savings Amount:
                      </label>
                      <p className="font-acme text-gray-700 text-xl">${targetSavings || "_____"}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                      <label className="block text-sm font-medium mb-1">
                          Time Frame:
                      </label>
                      <p className="font-acme text-gray-700 text-xl">{timeFrame || "_____"}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                      <label className="block text-sm font-medium mb-1">
                          Reduction Strategy:
                      </label>
                      <p className="font-acme text-gray-700 text-xl">{reductionStrategy || "_____"}</p>
                  </div>
              </div>
            </div>
           )}

           {/* Phase 5: Summary */}
           {currentPhase === "summary" && (
            <div className="p-4">
              <h2 className="font-acme text-lg mb-4">Summary & Results</h2>
              <div className="text-left text-sm space-y-2 bg-gray-50 p-3 rounded">
                <p>
                  <strong>Monthly Income:</strong> ${primaryJobIncome || "0"}
                </p>
                <p>
                  <strong>Categories:</strong>{" "}
                  {selectedCategories.length > 0
                    ? selectedCategories.join(", ")
                    : "None selected"}
                </p>
                {selectedCategories.map((cat) => (
                  <p key={cat}>
                    <strong>{cat} Expense:</strong> $
                    {categoryExpenses[cat] || "0"}
                  </p>
                ))}
                <p>
                  <strong>Savings Goal:</strong> ${targetSavings || "0"}
                </p>
                <p>
                  <strong>Timeline:</strong> {timeFrame || "N/A"}
                </p>
                <p>
                  <strong>Reduction Strategy:</strong> {reductionStrategy || "N/A"}
                </p>
                <p>
                  <strong>Monthly Target:</strong> ${
                    targetSavings && timeFrame ? (
                        parseFloat(targetSavings) / parseInt(timeFrame.split(' ')[0])
                    ).toFixed(2) : "0.00"
                }
                </p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
                <p className="font-medium text-blue-800">Recommendation:</p>
                <p className="text-blue-700">
                  Based on your inputs, with a monthly income of ${primaryJobIncome || "0"}, you can achieve your goal by targeting a monthly saving of $
                  {
                      targetSavings && timeFrame ? (
                          parseFloat(targetSavings) / parseInt(timeFrame.split(' ')[0])
                      ).toFixed(2) : "0.00"
                  } by focusing on your strategy: "{reductionStrategy}".
                </p>
              </div>
            </div>
           )}

         </div>
       </div>

       {/* BOTTOM CAROUSEL - Dynamic based on phase */}
       <div
         className="absolute"
         style={{ top: "78%", left: "15%", width: "70%" }}
       >
         {currentPhase === "form-details" && (
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
         )}

         {/* Budget Planning - UPDATED */}
         {currentPhase === "budget-planning" && (
           <div className="bg-white rounded-2xl py-4 px-6 flex justify-around items-center gap-4 h-[70px]">
             {selectedCategories.length > 0 ? (
               selectedCategories.map((item) => (
                 <div key={item} className="flex items-center">
                   <span className="text-xl font-bold text-black mr-1">$</span>
                   <input
                     type="number"
                     placeholder="---"
                     value={categoryExpenses[item]}
                     onChange={(e) => handleExpenseChange(item, e.target.value)}
                     className="w-20 text-xl font-semibold text-black border-none outline-none bg-transparent text-center"
                     style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }}
                   />
                 </div>
               ))
             ) : (
               <p className="text-gray-500 text-center w-full">Please select categories in the first step.</p>
             )}
           </div>
         )}

         {/* Income Details - Single input via GenericInputBar */}
         {currentPhase === "income-details" && (
           <GenericInputBar
             placeholder="1. Write your Answer here..."
             value={primaryJobIncome}
             onChange={(e) => setPrimaryJobIncome(e.target.value)}
             onInternalNextClick={handleIncomeInternalNext}
             type="text"
             showDollarSign={true}
           />
         )}

         {/* Goal Setting - Reverted to original multi-input */}
         {currentPhase === "goal-setting" && (
           <div className="bg-white rounded-2xl py-4 px-6 flex justify-around items-center gap-4 h-[70px]">
             {/* Goal Setting Inputs */}
             <div className="flex items-center">
                 <span className="text-sm font-bold text-gray-800 mr-1">Target $:</span>
                 <input
                     type="number"
                     placeholder="500"
                     value={targetSavings}
                     onChange={(e) => setTargetSavings(e.target.value)}
                     className="w-20 text-xl font-semibold text-gray-800 border-none outline-none bg-transparent text-center"
                     style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }}
                 />
             </div>
             <div className="flex items-center">
                 <span className="text-sm font-bold text-gray-800 mr-1">Time:</span>
                 <select
                     value={timeFrame}
                     onChange={(e) => setTimeFrame(e.target.value)}
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
                     onChange={(e) => setReductionStrategy(e.target.value)}
                     className="w-24 text-xl font-semibold text-gray-800 border-none outline-none bg-transparent text-center"
                 />
             </div>
           </div>
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