import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  selectCategoryExpenses,
  selectPrimaryJobIncome,
  selectTargetSavings,
  selectTimeFrame,
} from "../store/slices/onboardingSlice";
import StyledParagraphs from "./StyledParagraphs";
import BudgetTable from "./BudgetTable";

const SimulateOneYearPhase = () => {
  const { t } = useTranslation();

  // Get data from Redux store
  const categoryExpenses = useSelector(selectCategoryExpenses);
  const primaryJobIncome = useSelector(selectPrimaryJobIncome);
  const targetSavings = useSelector(selectTargetSavings);
  const timeFrame = useSelector(selectTimeFrame);

  // Calculator state
  const [currentInput, setCurrentInput] = useState("");
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [display, setDisplay] = useState("0");
  const [simulationResult, setSimulationResult] = useState(null);
  const [showingResult, setShowingResult] = useState(false);

  // Calculate totals from user data
  const calculateUserTotals = () => {
    const monthlyIncome = parseFloat(primaryJobIncome) || 0;
    const monthlyExpenses = Object.values(categoryExpenses).reduce(
      (total, expense) => {
        return total + (parseFloat(expense) || 0);
      },
      0
    );
    const monthlySavingsGoal = parseFloat(targetSavings) || 0;

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlySavingsGoal,
      yearlyIncome: monthlyIncome * 12,
      yearlyExpenses: monthlyExpenses * 12,
      yearlySavingsGoal: monthlySavingsGoal * 12,
      monthlyNet: monthlyIncome - monthlyExpenses,
      yearlyNet: (monthlyIncome - monthlyExpenses) * 12,
    };
  };

  // Simulation categories
  const simulationCategories = [
    { key: "months", label: "Months", field: "monthlyNet" },
    { key: "utilities", label: "Utilities", field: "utilities" },
    { key: "foods", label: "Foods", field: "foods" },
    { key: "loans", label: "Loans", field: "loans" },
  ];

  // Calculator button handlers
  const handleNumberClick = (num) => {
    if (showingResult) {
      setDisplay(num.toString());
      setCurrentInput(num.toString());
      setShowingResult(false);
    } else {
      const newValue = currentInput + num;
      setCurrentInput(newValue);
      setDisplay(newValue);
    }
  };

  const handleOperationClick = (op) => {
    if (currentInput === "" && previousValue === null) return;

    if (previousValue !== null && currentInput !== "" && !showingResult) {
      handleEquals();
    }

    setPreviousValue(parseFloat(currentInput || display));
    setOperation(op);
    setCurrentInput("");
    setShowingResult(false);
  };

  const handleEquals = () => {
    if (previousValue === null || currentInput === "" || operation === null)
      return;

    const current = parseFloat(currentInput);
    let result;

    switch (operation) {
      case "+":
        result = previousValue + current;
        break;
      case "-":
        result = previousValue - current;
        break;
      case "*":
        result = previousValue * current;
        break;
      case "/":
        result = current !== 0 ? previousValue / current : 0;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setCurrentInput("");
    setShowingResult(true);
  };

  const handleClear = () => {
    setCurrentInput("");
    setOperation(null);
    setPreviousValue(null);
    setDisplay("0");
    setShowingResult(false);
    setSimulationResult(null);
  };

  const handleDecimal = () => {
    if (showingResult) {
      setDisplay("0.");
      setCurrentInput("0.");
      setShowingResult(false);
    } else if (currentInput.indexOf(".") === -1) {
      const newValue = currentInput === "" ? "0." : currentInput + ".";
      setCurrentInput(newValue);
      setDisplay(newValue);
    }
  };

  const runSimulation = () => {
    const totals = calculateUserTotals();

    let resultMessage;
    let suggestions = [];

    if (totals.yearlyNet > 0) {
      if (totals.yearlyNet >= 30000) {
        resultMessage = "Wow, you're off to an early retirement!";
        suggestions = [
          "Consider increasing your investment contributions",
          "Look into tax-advantaged retirement accounts",
          "Explore high-yield savings options",
        ];
      } else {
        resultMessage = "You're building wealth steadily!";
        suggestions = [
          "Keep up the good savings habits",
          "Consider setting up automatic transfers to savings",
          "Review your budget monthly to stay on track",
        ];
      }
    } else {
      resultMessage = "Time to reassess your spending plan";
      suggestions = [
        "Review non-essential expenses",
        "Consider increasing your income sources",
        "Look for ways to reduce monthly bills",
        "Create a stricter budget plan",
      ];
    }

    setSimulationResult({
      ...totals,
      message: resultMessage,
      suggestions,
    });
  };

  // Calculator buttons layout
  const calculatorButtons = [
    ["C", "±", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const renderCalculatorButton = (btn, index, rowIndex) => {
    const isNumber = /^\d$/.test(btn);
    const isOperation = ["+", "-", "*", "/"].includes(btn);
    const isEquals = btn === "=";
    const isClear = btn === "C";
    const isSpecial = ["±", "%"].includes(btn);

    let buttonClass =
      "w-12 h-10 text-sm font-medium rounded border border-gray-400 hover:bg-gray-100 transition-colors ";

    if (isNumber) {
      buttonClass += "bg-white text-black";
    } else if (isOperation) {
      buttonClass +=
        operation === btn
          ? "bg-orange-500 text-white"
          : "bg-orange-400 text-white hover:bg-orange-500";
    } else if (isEquals) {
      buttonClass += "bg-orange-400 text-white hover:bg-orange-500";
    } else if (isClear) {
      buttonClass += "bg-gray-300 text-black hover:bg-gray-400";
    } else {
      buttonClass += "bg-gray-200 text-black hover:bg-gray-300";
    }

    // Handle special layouts
    if (btn === "0") {
      buttonClass += " col-span-2";
    }

    const handleClick = () => {
      if (isNumber) {
        handleNumberClick(btn);
      } else if (isOperation) {
        handleOperationClick(btn);
      } else if (btn === "=") {
        handleEquals();
      } else if (btn === "C") {
        handleClear();
      } else if (btn === ".") {
        handleDecimal();
      } else if (btn === "±") {
        if (currentInput) {
          const newValue = currentInput.startsWith("-")
            ? currentInput.slice(1)
            : "-" + currentInput;
          setCurrentInput(newValue);
          setDisplay(newValue);
        }
      } else if (btn === "%") {
        if (currentInput) {
          const newValue = (parseFloat(currentInput) / 100).toString();
          setCurrentInput(newValue);
          setDisplay(newValue);
        }
      }
    };

    return (
      <button
        key={`${rowIndex}-${index}`}
        className={buttonClass}
        onClick={handleClick}
      >
        {btn}
      </button>
    );
  };

  return (
    <div className="relative w-full h-max flex flex-col -mt-8">
      <div className="text-center top-0">
        <div className="bg-black text-white px-6 py-0 rounded text-sm font-mono ">
          <div className="p-0 flex justify-center items-center">
            <p
              style={{
                WebkitTextStroke: "1px white",
                color: "black",
                letterSpacing: "0",
              }}
              className="p-4 rounded-md font-medium text-3xl leading-none"
            >
              JUL 5, 2025
            </p>
            <img
              src="/assets/calendar.svg"
              alt="Calendar Icon"
              className="ml-2 w-[24px] h-[24px]"
            />
          </div>
        </div>
      </div>

      <StyledParagraphs />

      <BudgetTable />

      {/* Size Controller SVG positioned at bottom right */}
      <div className="absolute bottom-4 right-4">
        <div className="relative group cursor-pointer">
          <img
            src="/assets/size-controller.svg"
            alt="Size Controller"
            className="w-20 h-20 transition-all duration-200"
            style={{
              filter: "none",
            }}
          />
          {/* Hover areas for different parts of the controller */}
          {/* Center button hover area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Top arrow hover area */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Bottom arrow hover area */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Left arrow hover area */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
          {/* Right arrow hover area */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 transition-all duration-200 hover:shadow-[inset_0_0_0_2px_#22c55e]" />
        </div>
      </div>
    </div>
  );
};

export default SimulateOneYearPhase;
