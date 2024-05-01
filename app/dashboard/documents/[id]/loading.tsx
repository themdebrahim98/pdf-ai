import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="animate-spin h-8 w-8 text-gray-800 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* Add your loading icon or animation here */}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.565zM20 12a7.96 7.96 0 01-3 5.938l3 2.565A11.985 11.985 0 0024 12h-4zM16 6.627V4c-3.042 0-5.824 1.135-7.938 3h2.565A7.96 7.96 0 0116 6.627zM12 20.373A7.96 7.96 0 018.565 20H6c0-3.042 1.135-5.824 3-7.938l3 2.565zM12 16.627A7.96 7.96 0 0115.435 16H18c0 3.042-1.135 5.824-3 7.938l-3-2.565z"
            ></path>
          </svg>
          <span className="text-lg font-semibold text-gray-800">
            Loading...
          </span>
        </div>
        {/* You can add additional content or modify the styling here */}
      </div>
    </div>
  );
}

export default Loading;
