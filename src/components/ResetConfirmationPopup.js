import React from 'react';

const ResetConfirmationPopup = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="absolute bg-black bg-opacity-75 z-50 flex items-center justify-center w-full"
      style={{
        top: "45.6%",
        left: "29.5%", 
        width: "40%",
        height: "62%",
      }}
    >
      <div className="relative left-12 w-10/12">
            <div
              className="absolute bg-white border-t border-l border-r border-black"
              style={{
                width: "4rem",
                height: "2rem",
                borderRadius: "2rem 2rem 0 0",
                left: "1.2rem",
                top: "-1.9rem",
                zIndex: 999,
              }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-full ml-2 mt-2">
                <img src="/assets/reset.svg" className="mx-auto pt-2.5" />
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-2xl shadow-xl relative border border-black"
              style={{
                width: "80%",
                height: "40%",
                maxWidth: "none",
                margin: "0",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-2 right-4 text-black border border-black w-6 h-6 rounded-full hover:text-gray-800 text-xl flex items-center justify-center"
              >
                &times;
              </button>
              <div className="h-full flex flex-col justify-center mt-5">
                <div className="mb-3">
                  <h2 className="font-inter font-semibold text-sm">
                    ALL OF YOUR DATA WILL BE ERASED!!<br /> ARE YOU SURE YOU WISH TO<br /> PROCEED?
                  </h2>
                </div>

                

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-600 text-white py-2 px-12 rounded hover:bg-gray-800 transition-colors text-sm font-semibold"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default ResetConfirmationPopup;