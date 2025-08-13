import React from "react";
import { AlertCircle } from "lucide-react";
import { formatErrorMessage, getValidationErrors, isValidationError } from "@/lib/errorUtils";

interface ErrorAlertProps {
  error?: any; // API error object
  errors?: Record<string, any>; // Form validation errors
  title?: string;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  errors,
  title = "Please fix the following errors:",
  className = ""
}) => {
  // If we have an API error, format it
  if (error) {
    const errorMessage = formatErrorMessage(error);
    const validationErrors = getValidationErrors(error);
    
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
              {isValidationError(error) ? title : "Error occurred"}
            </h4>
            
            {isValidationError(error) && validationErrors.length > 0 ? (
              <ul className="space-y-1">
                {validationErrors.map((errorMsg, index) => (
                  <li key={index} className="text-sm text-red-700 dark:text-red-300 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    {errorMsg}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If we have form validation errors
  if (errors && Object.keys(errors).length > 0) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
              {title}
            </h4>
            <ul className="space-y-1">
              {errors.title && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Title:</strong> {errors.title.message}
                </li>
              )}
              {errors.description && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Description:</strong> {errors.description.message}
                </li>
              )}
              {errors.categoryId && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Category:</strong> {errors.categoryId.message}
                </li>
              )}
              {errors.originalPrice && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Price:</strong> {errors.originalPrice.message}
                </li>
              )}
              {errors.totalLicenses && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Total Licenses:</strong> {errors.totalLicenses.message}
                </li>
              )}
              {errors.thumbnailUrl && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Thumbnail:</strong> {errors.thumbnailUrl.message}
                </li>
              )}
              {errors.imagesUrls && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Additional Images:</strong> {errors.imagesUrls.message}
                </li>
              )}
              {errors.fileUrl && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Digital Product File:</strong> {errors.fileUrl.message}
                </li>
              )}
              {errors.fileType && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>File Type:</strong> {errors.fileType.message}
                </li>
              )}
              {errors.fileSize && (
                <li className="text-sm text-red-700 dark:text-red-300 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>File Size:</strong> {errors.fileSize.message}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
