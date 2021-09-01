import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="items-center flex justify-center min-h-full">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
    </div>
  );
};
export default Spinner;
