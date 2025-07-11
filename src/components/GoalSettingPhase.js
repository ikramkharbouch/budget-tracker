import { useState } from 'react';

const GoalSettingPhase = ({ targetSavings, timeFrame, reductionStrategy }) => {
  const [tableData, setTableData] = useState([
    { months: '', utilities: '', foods: '', loans: '' },
    { months: '', utilities: '', foods: '', loans: '' },
    { months: '', utilities: '', foods: '', loans: '' },
  ]);

  const handleInputChange = (rowIndex, column, value) => {
    const newData = [...tableData];
    newData[rowIndex][column] = value;
    setTableData(newData);
  };

  return (
    <div className="p-4">
        <table className="w-full border-collapse h-6">
          <thead>
            <tr>
              <th className="border-2 border-black bg-white p-4 text-left font-bold text-lg">
                Months
              </th>
              <th className="border-2 border-black bg-white p-4 text-left font-bold text-lg">
                Utilities
              </th>
              <th className="border-2 border-black bg-white p-4 text-left font-bold text-lg">
                Foods
              </th>
              <th className="border-2 border-black bg-white p-4 text-left font-bold text-lg">
                Loans
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border-2 border-black bg-white p-4 h-20">
                  <input
                    type="text"
                    value={row.months}
                    onChange={(e) => handleInputChange(rowIndex, 'months', e.target.value)}
                    className="w-full h-full border-none outline-none bg-transparent text-lg"
                    placeholder=""
                  />
                </td>
                <td className="border-2 border-black bg-white p-4 h-20">
                  <input
                    type="text"
                    value={row.utilities}
                    onChange={(e) => handleInputChange(rowIndex, 'utilities', e.target.value)}
                    className="w-full h-full border-none outline-none bg-transparent text-lg"
                    placeholder=""
                  />
                </td>
                <td className="border-2 border-black bg-white p-4 h-20">
                  <input
                    type="text"
                    value={row.foods}
                    onChange={(e) => handleInputChange(rowIndex, 'foods', e.target.value)}
                    className="w-full h-full border-none outline-none bg-transparent text-lg"
                    placeholder=""
                  />
                </td>
                <td className="border-2 border-black bg-white p-4 h-20">
                  <input
                    type="text"
                    value={row.loans}
                    onChange={(e) => handleInputChange(rowIndex, 'loans', e.target.value)}
                    className="w-full h-full border-none outline-none bg-transparent text-lg"
                    placeholder=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="relative">
          <img 
            src="/assets/size-controller.svg"
            alt="Size Controller" 
            className="absolute bottom-0 right-0 w-20 h-20"
          />
        </div>
    </div>
  );
};

export default GoalSettingPhase;