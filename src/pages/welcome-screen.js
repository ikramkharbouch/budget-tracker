import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PieChartIcon from "@mui/icons-material/PieChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Image from "next/image";
import { Link } from "react-router-dom";

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex p-6 flex-col lg:flex-row">
      {/* Left section: Image */}
      <div className="w-full lg:w-1/2 border-2 border-black rounded-2xl h-60 lg:h-5/6">
        <Image
          src={"/assets/bwink_ppl_19_single_07.jpg"}
          alt="Budget Tracker"
          width={500}
          height={200}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Right section: Text and Buttons */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center lg:max-w-4xl mt-6 lg:mt-0">
        <div className="rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="w-full px-4 sm:px-6 lg:px-10 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Welcome to Budget Tracker
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-700 font-medium mb-6">
              Take control of your finances today
            </h2>

            <p className="text-gray-600 mb-8">
              This tool will help you track your expenses and income to create a
              personalized budget. We'll guide you through entering your monthly
              expenses, income, and then provide insights into your financial
              health.
            </p>

            <div className="space-y-4">
              <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300">
                <Link to="/sign-up">
                  <span>START BUDGETING</span>
                </Link>

                <ArrowForwardIcon style={{ fontSize: 18, marginLeft: 8 }} />
              </button>

              <div className="text-center">
                <a
                  href="#"
                  className="text-gray-700 hover:text-black font-medium underline underline-offset-2"
                >
                  I already have an account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
