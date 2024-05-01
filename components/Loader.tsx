import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-1 flex-grow">
      <div className="flex space-x-4">
        <div className="w-8 h-8 bg-gray-900 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-gray-900 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
