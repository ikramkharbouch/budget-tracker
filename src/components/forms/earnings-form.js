import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const EarningsForm = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [customEarningName, setCustomEarningName] = useState('');
  const [customEarningAmount, setCustomEarningAmount] = useState('');
  
  const [primaryIncome, setPrimaryIncome] = useState('');
  
  const [additionalEarnings, setAdditionalEarnings] = useState([]);

  const handleAddCustomEarning = () => {
    if (customEarningName && customEarningAmount) {
      setAdditionalEarnings([
        ...additionalEarnings,
        { name: customEarningName, amount: customEarningAmount }
      ]);
      setCustomEarningName('');
      setCustomEarningAmount('');
      setOpenDialog(false);
    }
  };

  const handleDeleteEarning = (index) => {
    const updatedEarnings = [...additionalEarnings];
    updatedEarnings.splice(index, 1);
    setAdditionalEarnings(updatedEarnings);
  };

  const handleFinish = () => {
    const total = Number(primaryIncome) + 
                 additionalEarnings.reduce((sum, earning) => sum + Number(earning.amount), 0);
                 
    router.push({
      pathname: '/financial-summary',
      query: { 
        totalIncome: total,
        primaryIncome: primaryIncome,
        additionalEarnings: JSON.stringify(additionalEarnings)
      }
    });
  };

  // Calculate total income
  const totalIncome = Number(primaryIncome) + 
                     additionalEarnings.reduce((sum, earning) => sum + Number(earning.amount), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Enter Your Monthly Earnings</h1>
      <p className="text-gray-600 mb-8">
        Please enter your monthly income from all sources. This will help us create an accurate budget for you.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Primary Income</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your main source of income (e.g., salary, wages, pension).
        </p>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={primaryIncome}
            onChange={(e) => setPrimaryIncome(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="0.00"
          />
        </div>
      </div>

      {additionalEarnings.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Additional Earnings</h2>
          <ul className="divide-y divide-gray-100">
            {additionalEarnings.map((item, index) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${parseFloat(item.amount).toLocaleString()} per month</p>
                </div>
                <button 
                  onClick={() => handleDeleteEarning(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <DeleteIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Total Monthly Income</h2>
        <p className="text-3xl font-bold text-black">
          ${totalIncome.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={() => setOpenDialog(true)}
          className="flex items-center px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <AddIcon className="w-4 h-4 mr-2" />
          <span>Add Additional Earnings</span>
        </button>
        <button 
          onClick={handleFinish}
          className="px-8 py-3 bg-black text-white rounded-md hover:bg-black/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!primaryIncome}
        >
          Complete
        </button>
      </div>

      {/* Add Earning Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add Additional Earnings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source of Income
                </label>
                <input
                  type="text"
                  value={customEarningName}
                  onChange={(e) => setCustomEarningName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Freelance, Side Gig, Investments, etc."
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
                    value={customEarningAmount}
                    onChange={(e) => setCustomEarningAmount(e.target.value)}
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
                onClick={handleAddCustomEarning}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
              >
                Add Earnings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsForm;