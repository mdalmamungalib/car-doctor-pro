import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* SVG Loader */}
        <div className="relative w-[100px] h-[100px] mb-8 mx-auto animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 83 83"
            fill="none"
          >
            <circle
              cx="41.5"
              cy="41.5"
              r="41.5"
              fill="#FF3811"
              fillOpacity="0.1"
            />
            <circle
              cx="41.5"
              cy="41.5"
              r="27.9795"
              fill="#FF3811"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-bold text-white">...</p>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-4xl font-bold text-[#151515]">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default loading;
