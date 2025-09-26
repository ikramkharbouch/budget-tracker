import React from 'react';

const ImageTextButton = ({ label, onClick, title, className }) => {
  return (
    <div
      className={`relative cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      onClick={onClick}
      title={title || label}
    >
      <img
        src="/assets/button-wrapper.svg"
        alt={label}
        className="w-auto h-auto"
      />
      <span
        className="absolute w-full text-white font-bold top-[0.9rem] flex items-center justify-center text-center font-inter text-xs"
      >
        {label}
      </span>
    </div>
  );
};

export default ImageTextButton;