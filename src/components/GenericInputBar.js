import { ArrowRight } from 'lucide-react';

const GenericInputBar = ({ placeholder, value, onChange, onInternalNextClick, type = "text", showDollarSign = false }) => {
  return (
    <div className="bg-white rounded-2xl py-4 px-6 flex items-center justify-between h-[70px]">
      <div className="flex items-center flex-grow mr-4">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-grow text-xl text-black border-none outline-none bg-transparent placeholder-black"
          style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }} // Hide number input arrows
        />
      </div>
      <button
        onClick={onInternalNextClick}
        className="flex items-center px-6 py-2 rounded-full text-black text-sm hover:bg-gray-100 transition-colors duration-200 border border-black"
      >
        Next <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );
};

export default GenericInputBar;