import { ArrowRight } from 'lucide-react';

const GenericInputBar = ({ placeholder, value, onChange, onInternalNextClick, type = "text", showDollarSign = false }) => {
  return (
    <div className="bg-white rounded-2xl py-4 px-6 flex items-center justify-between h-[70px]
      // Mobile adaptations
      max-sm:flex-col max-sm:h-auto max-sm:py-6 max-sm:gap-4 max-sm:px-6
    ">
      <div className="flex items-center flex-grow mr-4 max-sm:mr-0 max-sm:w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-grow text-xl text-black border-none outline-none bg-transparent placeholder-black
            max-sm:text-2xl max-sm:min-h-[52px] max-sm:py-2
          "
          style={{ MozAppearance: 'textfield', WebkitAppearance: 'none', appearance: 'none' }}
        />
      </div>
      <button
        onClick={onInternalNextClick}
        className="flex items-center px-6 py-2 rounded-full text-black text-sm hover:bg-gray-100 transition-colors duration-200 border border-black
          touch-manipulation max-sm:w-full max-sm:justify-center max-sm:py-4 max-sm:text-lg max-sm:font-medium
        "
      >
        Next <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );
};

export default GenericInputBar;