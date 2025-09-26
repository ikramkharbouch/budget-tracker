import React from 'react';
import CategoryStepForm from './CategoryStepForm';

const FormDetailsPhase = ({ selectedCategories }) => {
  return (
    <div className="p-4">
      <CategoryStepForm selectedCategories={selectedCategories} />
    </div>
  );
};

export default FormDetailsPhase;