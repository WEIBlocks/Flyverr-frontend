import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  description?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
  description,
  className = "",
}) => {
  const sizeClasses = {
    sm: {
      container: "w-16 h-16",
      spinner: "w-6 h-6",
      text: "text-lg",
      description: "text-sm",
    },
    md: {
      container: "w-20 h-20 sm:w-24 sm:h-24",
      spinner: "w-10 h-10 sm:w-12 sm:h-12",
      text: "text-2xl sm:text-3xl",
      description: "text-base sm:text-lg",
    },
    lg: {
      container: "w-24 h-24 sm:w-32 sm:h-32",
      spinner: "w-12 h-12 sm:w-16 sm:h-16",
      text: "text-3xl sm:text-4xl",
      description: "text-lg sm:text-xl",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`min-h-screen bg-flyverr-neutral dark:bg-gray-900 flex items-center justify-center p-4 ${className}`}>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden text-center">
          <div className="p-8 sm:p-10">
            {/* Loading Spinner */}
            <div className={`mx-auto mb-6 bg-flyverr-primary/20 dark:bg-flyverr-primary/10 rounded-full flex items-center justify-center ${currentSize.container}`}>
              <Loader2 className={`text-flyverr-primary animate-spin ${currentSize.spinner}`} />
            </div>

            {/* Loading Text */}
            <h1 className={`font-bold text-flyverr-text dark:text-white mb-4 ${currentSize.text}`}>
              {text}
            </h1>
            
            {description && (
              <p className={`text-gray-600 dark:text-gray-300 ${currentSize.description}`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
