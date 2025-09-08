import React, { useState } from 'react';

const BudgetTable = () => {
  const tableHeaders = ['Months', 'Utilities', 'Foods', 'Loans'];
  const tableRows = 3;

  // Initialize a 2D array to hold the table data.
  // Each element is a row, containing an array of cell values.
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
    <div className="mt-8 mx-auto w-full">
      <div className="grid grid-cols-4 border-t-2 border-l-2 border-black">
        {tableHeaders.map((header, index) => (
          <div key={index} className="flex justify-center items-center py-2 px-4 border-b-2 border-r-2 border-black font-medium">
            {header}
          </div>
        ))}
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cellValue, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="h-16 border-b-2 border-r-2 border-black">
                <input
                  type="text"
                  value={cellValue}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  className="w-full h-full text-center bg-transparent focus:outline-none"
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