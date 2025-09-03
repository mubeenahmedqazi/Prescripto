import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>

        {/* Text */}
        <p className="mt-4 text-indigo-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
