import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpenseForm = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [customExpenseName, setCustomExpenseName] = useState('');
  const [customExpenseAmount, setCustomExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState({
    groceries: '',
    restaurants: '',
    utilities: '',
    subscriptions: '',
    insurance: '',
    vehicleCosts: '',
    housingPayment: '',
    luxuries: '',
    loan: '',
    carPayment: '',
    creditCardDebt: '',
  });
  const [customExpenses, setCustomExpenses] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleExpenseChange = (expense, value) => {
    setExpenses({
      ...expenses,
      [expense]: value
    });
  };

  const handleAddCustomExpense = () => {
    if (customExpenseName && customExpenseAmount) {
      setCustomExpenses([
        ...customExpenses,
        { name: customExpenseName, amount: customExpenseAmount }
      ]);
      setCustomExpenseName('');
      setCustomExpenseAmount('');
      setOpenDialog(false);
    }
  };

  const handleFinish = () => {
    // Here you would typically save the expense data
    // For now, just navigate to the earnings page
    router.push('/earnings');
  };

  const toggleAccordion = (expense) => {
    setOpenAccordion(openAccordion === expense ? null : expense);
  };

  const expenseDescriptions = {
    groceries: "Highest cost of grocery in a week multiplied by four equivalent to a month.",
    restaurants: "Highest cost of dine-out in a week multiplied by four equivalent to a month.",
    utilities: "Water, electricity, and gas.",
    subscriptions: "Internet, phone, memberships, and entertainment.",
    insurance: "Vehicle, home, and asset-related coverage.",
    vehicleCosts: "Gas, repairs, maintenance, and cleaning.",
    housingPayment: "Housing-related payments.",
    luxuries: "Non-essential expenses (e.g., entertainment subscriptions).",
    loan: "Any borrowed funds, including student loans.",
    carPayment: "Monthly car payments.",
    creditCardDebt: "Tracks outstanding balances."
  };

  const expenseLabels = {
    groceries: "Groceries",
    restaurants: "Restaurants",
    utilities: "Utilities",
    subscriptions: "Subscriptions",
    insurance: "Insurance",
    vehicleCosts: "Vehicle Costs",
    housingPayment: "Mortgage/Rent",
    luxuries: "Luxuries",
    loan: "Loan",
    carPayment: "Car Lease/Loan",
    creditCardDebt: "Credit Card Debt"
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Enter Your Monthly Expenses</h1>
      <p className="text-gray-600 mb-8">
        Please enter your best estimate for each category. Don't worry if you're not sure—you can always adjust these later.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          {Object.keys(expenses).map((expense) => (
            <div key={expense} className="border-b border-gray-100 pb-2">
              <div 
                className="flex items-center justify-between py-3 cursor-pointer"
                onClick={() => toggleAccordion(expense)}
              >
                <h3 className="font-medium">{expenseLabels[expense]}</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={expenses[expense]}
                      onChange={(e) => handleExpenseChange(expense, e.target.value)}
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg w-48 focus:ring-2 focus:ring-black focus:outline-none"
                      placeholder="0.00"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <ExpandMoreIcon 
                    className={`w-5 h-5 text-gray-500 transition-transform ${openAccordion === expense ? 'transform rotate-180' : ''}`}
                  />
                </div>
              </div>
              {openAccordion === expense && (
                <div className="py-3 px-4 bg-gray-50 rounded-md mb-3">
                  <p className="text-sm text-gray-600">{expenseDescriptions[expense]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {customExpenses.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Custom Expenses</h2>
          <ul className="divide-y divide-gray-100">
            {customExpenses.map((item, index) => (
              <li key={index} className="py-3">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">${item.amount} per month</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={() => setOpenDialog(true)}
          className="flex items-center px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <AddIcon className="w-4 h-4 mr-2" />
          <span>Did we miss something?</span>
        </button>
        <button 
          onClick={handleFinish}
          className="px-8 py-3 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
        >
          Finish
        </button>
      </div>

      {/* Custom Expense Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Create Custom Expense</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expense Name
                </label>
                <input
                  type="text"
                  value={customExpenseName}
                  onChange={(e) => setCustomExpenseName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="e.g., Pet Care"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={customExpenseAmount}
                    onChange={(e) => setCustomExpenseAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCustomExpense}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;