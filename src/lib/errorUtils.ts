/**
 * Utility functions for handling API error responses
 */

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  [key: string]: any;
}

/**
 * Formats API error messages from various error response formats
 * @param error - The error object from API calls
 * @returns Formatted error message string
 */
export const formatErrorMessage = (error: any): string => {
  if (!error) return "An unknown error occurred";
  
  // Handle axios error response
  if (error.response?.data) {
    const errorData = error.response.data;
    
    // Handle validation errors array
    if (errorData.errors && Array.isArray(errorData.errors)) {
      return errorData.errors.join(", ");
    }
    
    // Handle single error message
    if (errorData.message) {
      return errorData.message;
    }
    
    // Handle error object with nested error properties
    if (typeof errorData === 'object') {
      const messages = Object.values(errorData).filter(val => typeof val === 'string');
      if (messages.length > 0) {
        return messages.join(", ");
      }
    }
  }
  
  // Handle regular error message
  if (error.message) {
    return error.message;
  }
  
  return "An unknown error occurred";
};

/**
 * Checks if an error is a validation error
 * @param error - The error object
 * @returns True if it's a validation error
 */
export const isValidationError = (error: any): boolean => {
  if (!error?.response?.data) return false;
  
  const errorData = error.response.data;
  return errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0;
};

/**
 * Gets validation errors as an array
 * @param error - The error object
 * @returns Array of validation error messages
 */
export const getValidationErrors = (error: any): string[] => {
  if (!error?.response?.data?.errors) return [];
  
  const errors = error.response.data.errors;
  return Array.isArray(errors) ? errors : [];
};

/**
 * Creates a user-friendly error message for specific error types
 * @param error - The error object
 * @param context - Context for the error (e.g., "loading products", "saving data")
 * @returns User-friendly error message
 */
export const createUserFriendlyError = (error: any, context: string = "operation"): string => {
  const baseMessage = `Failed to ${context}`;
  
  if (isValidationError(error)) {
    const validationErrors = getValidationErrors(error);
    if (validationErrors.length === 1) {
      return `${baseMessage}: ${validationErrors[0]}`;
    } else if (validationErrors.length > 1) {
      return `${baseMessage}: ${validationErrors.slice(0, 2).join(", ")}${validationErrors.length > 2 ? ` and ${validationErrors.length - 2} more` : ''}`;
    }
  }
  
  const message = formatErrorMessage(error);
  return message === "An unknown error occurred" ? baseMessage : message;
};
