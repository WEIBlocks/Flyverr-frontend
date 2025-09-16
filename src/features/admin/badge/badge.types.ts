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
  userId: string;
  badges: UserBadge[];
  highestBadges: {
    creator: Badge | null;
    reseller: Badge | null;
  };
  canCreateProducts: boolean;
  badgeCount: number;
}

export interface AllBadgesResponse {
  success: boolean;
  data: {
    badges: {
      creator: Badge[];
      reseller: Badge[];
    };
    total: number;
  };
}

export interface UserBadgeStatusResponse {
  success: boolean;
  data: BadgeProgress;
}
