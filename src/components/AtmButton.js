import React from 'react';

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

export default ATMButton;