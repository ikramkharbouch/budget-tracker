import React, { useState } from "react";

const CategoryStepForm = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState("");


  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() && !selectedCategories.includes(customCategory.trim())) {
      setSelectedCategories(prev => [...prev, customCategory.trim()]);
      setCustomCategory("");
    }
  };

  return (
    <div className="w-full mx-auto bg-transparent rounded-lg " >
      {/* Header with back arrow and progress bar */}
     
      {/* Top Section - Pick Category */}
      <div className="bg-transparent px-6 py-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Pick your category
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          choose as many as may apply or<br />
          add your own
        </p>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-400 mx-0"></div>

      {/* Bottom Section - Add Custom Category */}
      <div className="bg-transparent px-6 py-4 text-center flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Can't find a category<br />
          that fits you?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          add one to the list!
        </p>

    

        {selectedCategories.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1 justify-center">
              {selectedCategories.slice(-3).map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700"
                >
                  {category}
                </span>
              ))}
              {selectedCategories.length > 3 && (
                <span className="text-xs text-gray-500">+{selectedCategories.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryStepForm;