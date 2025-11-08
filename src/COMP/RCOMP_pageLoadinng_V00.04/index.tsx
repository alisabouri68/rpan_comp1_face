import React from "react";

const PageLoading: React.FC = () => {
  return (
    <div className="w-full min-h-screen fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin dark:border-gray-700 dark:border-t-gray-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full opacity-20 dark:bg-gray-300"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          LOADING
        </h3>
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-gray-800 rounded-full animate-bounce dark:bg-gray-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
