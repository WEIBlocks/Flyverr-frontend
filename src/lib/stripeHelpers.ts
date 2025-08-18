/**
 * Stripe onboarding helper functions
 * Used to check user's Stripe onboarding status and handle related logic
 */

interface UserProfile {
  stripe_onboarded: boolean;
}

interface AuthData {
  profile: UserProfile;
}

/**
 * Get the current user's Stripe onboarding status from localStorage
 * @returns boolean - true if user is onboarded, false otherwise
 */
export function getStripeOnboardingStatus(): boolean {
  try {
    const authData = localStorage.getItem('user');
    if (!authData) return false;
    
    const parsedData: AuthData = JSON.parse(authData);
    return parsedData?.profile?.stripe_onboarded || false;
  } catch (error) {
    console.error('Error parsing auth data for Stripe status:', error);
    return false;
  }
}

/**
 * Check if user can create products (requires Stripe onboarding)
 * @returns boolean - true if user can create products, false otherwise
 */
export function canCreateProducts(): boolean {
  return getStripeOnboardingStatus();
}

/**
 * Check if user can purchase products (requires Stripe onboarding)
 * @returns boolean - true if user can purchase products, false otherwise
 */
export function canPurchaseProducts(): boolean {
  return getStripeOnboardingStatus();
}

/**
 * Check if Stripe onboarding alert should be shown
 * @returns boolean - true if alert should be shown, false otherwise
 */
export function shouldShowStripeAlert(): boolean {
  const isOnboarded = getStripeOnboardingStatus();
  const isDismissed = localStorage.getItem('stripe-alert-dismissed') === 'true';
  
  return !isOnboarded && !isDismissed;
}

/**
 * Dismiss the Stripe onboarding alert permanently
 */
export function dismissStripeAlert(): void {
  localStorage.setItem('stripe-alert-dismissed', 'true');
}

/**
 * Reset the Stripe alert dismissal (useful for testing or when user logs out)
 */
export function resetStripeAlertDismissal(): void {
  localStorage.removeItem('stripe-alert-dismissed');
}

/**
 * Get user-friendly error message for Stripe onboarding requirement
 * @param action - The action the user is trying to perform
 * @returns string - User-friendly error message
 */
export function getStripeOnboardingMessage(action: 'create' | 'purchase' | 'general' = 'general'): string {
  const messages = {
    create: 'You need to complete your Stripe onboarding to create and sell products.',
    purchase: 'You need to complete your Stripe onboarding to purchase products.',
    general: 'You need to complete your Stripe onboarding to continue.'
  };
  
  return messages[action];
}

/**
 * Check if user has completed Stripe onboarding and return appropriate response
 * @param action - The action the user is trying to perform
 * @returns object - Contains canProceed boolean and message string
 */
export function checkStripeOnboarding(action: 'create' | 'purchase' | 'general' = 'general'): {
  canProceed: boolean;
  message: string;
} {
  const isOnboarded = getStripeOnboardingStatus();
  
  return {
    canProceed: isOnboarded,
    message: isOnboarded ? '' : getStripeOnboardingMessage(action)
  };
}
