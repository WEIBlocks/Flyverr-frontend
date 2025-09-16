export interface Badge {
  id: string;
  name: string;
  display_name: string;
  description: string;
  badge_type: "creator" | "reseller";
  tier: "verified" | "gold" | "ultimate";
  min_amount: number;
  max_amount: number | null;
  icon_url: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  current_amount: number;
  is_active: boolean;
  created_at: string;
  badge: Badge;
}

export interface BadgeProgress {
  currentBadge: Badge | null;
  nextBadge: Badge | null;
  totalAmount: number;
  progress: number; // percentage (0-100)
}

export interface BadgeRequirements {
  id: string;
  user_id: string;
  badge_type: "creator" | "reseller";
  total_amount: number;
  last_updated: string;
  created_at: string;
}

export interface UserBadgesResponse {
  success: boolean;
  data: {
    badges: UserBadge[];
    progress: {
      creator: BadgeProgress;
      reseller: BadgeProgress;
    };
    requirements: BadgeRequirements[];
    allBadges: Badge[];
  };
}
