import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="loading loading-ring loading-lg text-primary"></div>
        <div className="loading loading-bars loading-lg text-secondary"></div>
        <p className="text-lg font-medium">Loading amazing opportunities...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 