import React from 'react';

const Loader = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
