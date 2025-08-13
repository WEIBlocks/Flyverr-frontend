export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface FAQsByCategory {
  [category: string]: FAQItem[];
}

export interface FAQsResponse {
  success: boolean;
  message: string;
  data: {
    faqs: FAQsByCategory | FAQItem[];
    total: number;
    categories: string[];
  };
}

export interface FAQFilters {
  category?: string;
}
