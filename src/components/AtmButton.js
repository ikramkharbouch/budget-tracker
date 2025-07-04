import React from "react";

const AtmButton = ({ label, small = false }) => (
  <button
    style={{ backgroundImage: `url('/assets/button.svg')` }}
    className={`font-acme bg-transparent text-white font-bold
      rounded-[10px] shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:opacity-90
      ${small ? 'text-xs w-[100px]' : 'text-sm w-[100px]'} h-10`}
  >
    {label}
  </button>
);

export default AtmButton;
