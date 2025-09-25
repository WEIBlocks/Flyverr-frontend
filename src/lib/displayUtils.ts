/**
 * Utility functions for displaying user-friendly information instead of IDs
 */

/**
 * Formats a user object to display a friendly name
 * @param user - User object with first_name, last_name, username
 * @param fallback - Fallback text if user is not available
 * @returns Formatted user display name
 */
export function formatUserName(
  user:
    | { first_name?: string; last_name?: string; username?: string }
    | null
    | undefined,
  fallback: string = "Unknown User"
): string {
  if (!user) return fallback;

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }

  if (user.username) {
    return `@${user.username}`;
  }

  return fallback;
}

/**
 * Formats a user object to display a username with @ symbol
 * @param user - User object with username
 * @param fallback - Fallback text if user is not available
 * @returns Formatted username
 */
export function formatUserHandle(
  user: { username?: string } | null | undefined,
  fallback: string = "Unknown User"
): string {
  if (!user || !user.username) return fallback;
  return `@${user.username}`;
}

/**
 * Formats product information for display
 * @param product - Product object with title, current_round, current_stage
 * @returns Formatted product display string
 */
export function formatProductInfo(
  product:
    | { title?: string; current_round?: number; current_stage?: string }
    | null
    | undefined
): string {
  if (!product) return "Unknown Product";

  const parts = [];
  if (product.current_round) parts.push(`Round ${product.current_round}`);
  if (product.current_stage) parts.push(product.current_stage);

  return parts.join(" • ") || product.title || "Unknown Product";
}

/**
 * Formats listing information for display
 * @param listing - Listing object with product information
 * @returns Formatted listing display string
 */
export function formatListingInfo(
  listing:
    | { product?: { current_round?: number; current_stage?: string } }
    | null
    | undefined
): string {
  if (!listing?.product) return "Unknown Listing";
  return formatProductInfo(listing.product);
}

/**
 * Formats transaction type for display
 * @param transactionType - Transaction type string
 * @returns Formatted transaction type
 */
export function formatTransactionType(
  transactionType: string | null | undefined
): string {
  if (!transactionType) return "Unknown";
  return transactionType.charAt(0).toUpperCase() + transactionType.slice(1);
}

/**
 * Formats license information for display
 * @param license - License object with current_round
 * @returns Formatted license display string
 */
export function formatLicenseInfo(
  license: { current_round?: number } | null | undefined
): string {
  if (!license?.current_round) return "Unknown License";
  return `Round ${license.current_round}`;
}

/**
 * Formats payout information for display
 * @param payout - Payout object with user information
 * @returns Formatted payout display string
 */
export function formatPayoutInfo(
  payout:
    | { user?: { first_name?: string; last_name?: string; username?: string } }
    | null
    | undefined
): string {
  if (!payout?.user) return "Unknown User";
  return formatUserName(payout.user);
}

/**
 * Formats sponsorship information for display
 * @param sponsorship - Sponsorship object with creator information
 * @returns Formatted sponsorship display string
 */
export function formatSponsorshipInfo(
  sponsorship: { creator?: { username?: string } } | null | undefined
): string {
  if (!sponsorship?.creator) return "Unknown Creator";
  return formatUserHandle(sponsorship.creator);
}
