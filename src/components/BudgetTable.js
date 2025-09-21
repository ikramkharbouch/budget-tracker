import React, { useState } from 'react';

const BudgetTable = () => {
  const tableHeaders = ['Months', 'Utilities', 'Foods', 'Loans'];
  const tableRows = 3;

  const [tableData, setTableData] = useState(
    Array.from({ length: tableRows }, () => Array(tableHeaders.length).fill(''))
  );

  const handleCellChange = (rowIndex, colIndex, value) => {
    setTableData(prevData => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = value;
      return newData;
    });
  };

  return (
    <div className="mx-auto w-full min-w-full min-h-full">
      <div className="grid grid-cols-4 border-t-2 border-l-2 border-black">
        {tableHeaders.map((header, index) => (
          <div key={index} className="flex justify-center items-center py-4 px-4 border-b-2 border-r-2 border-black font-medium text-2xl">
            {header}
          </div>
        ))}
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cellValue, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="h-24 border-b-2 border-r-2 border-black">
                <input
                  type="text"
                  value={cellValue}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  className="w-full h-full text-center bg-transparent focus:outline-none px-2"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BudgetTable;