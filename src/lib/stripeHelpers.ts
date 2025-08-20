/**
 * Stripe onboarding helper functions
 * Used to check user's Stripe onboarding status and handle related logic
 */

import type { UserProfile } from '@/features/auth/auth.types';
import { storage } from './utils';

/**
 * Get the current user's Stripe onboarding status from the user profile
 * @param user - The current user profile from the API
 * @returns boolean - true if user is onboarded, false otherwise
 */
export function getStripeOnboardingStatus(user?: UserProfile | null): boolean {
  if (!user) return false;
  return user.stripe_onboarded || false;
}

/**
 * Check if user can create products (requires Stripe onboarding)
 * @param user - The current user profile from the API
 * @returns boolean - true if user can create products, false otherwise
 */
export function canCreateProducts(user?: UserProfile | null): boolean {
  return getStripeOnboardingStatus(user);
}

/**
 * Check if user can purchase products (requires Stripe onboarding)
 * @param user - The current user profile from the API
 * @returns boolean - true if user can purchase products, false otherwise
 */
export function canPurchaseProducts(user?: UserProfile | null): boolean {
  return getStripeOnboardingStatus(user);
}

/**
 * Check if Stripe onboarding alert should be shown
 * @param user - The current user profile from the API
 * @returns boolean - true if alert should be shown, false otherwise
 */
export function shouldShowStripeAlert(user?: UserProfile | null): boolean {
  const isOnboarded = getStripeOnboardingStatus(user);
  const isDismissed = storage.get('stripe-alert-dismissed');
  
  return !isOnboarded && !isDismissed ;
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
 * @param user - The current user profile from the API
 * @param action - The action the user is trying to perform
 * @returns object - Contains canProceed boolean and message string
 */
export function checkStripeOnboarding(user?: UserProfile | null, action: 'create' | 'purchase' | 'general' = 'general'): {
  canProceed: boolean;
  message: string;
} {
  const isOnboarded = getStripeOnboardingStatus(user);
  
  return {
    canProceed: isOnboarded,
    message: isOnboarded ? '' : getStripeOnboardingMessage(action)
  };
}
