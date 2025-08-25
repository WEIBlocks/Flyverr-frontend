import React from "react";

export default function PublicLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        {/* Build/Compilation Spinner */}
        <div className="relative mb-8">
          {/* Outer ring with build progress animation */}
          <div className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-pulse"></div>
          
          {/* Spinning ring with build colors */}
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-flyverr-primary rounded-full animate-spin"></div>
          
          {/* Inner build indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-flyverr-primary rounded-full animate-ping"></div>
          
          {/* Build progress dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-2 h-2 bg-flyverr-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-flyverr-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-flyverr-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Build Status Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Building Flyverr Marketplace
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Compiling marketplace components and loading resources...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This may take a few moments during the first build
            </p>
          </div>
          
          {/* Build Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-flyverr-primary via-flyverr-secondary to-flyverr-accent h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
