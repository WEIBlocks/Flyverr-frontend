"use client";

import { useCallback } from "react";

const COUNTS_KEY = "flyverr.categoryCounts";
const RECENT_KEY = "flyverr.recentCategories";

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

export function useCategoryPreferences() {
  const recordView = useCallback((categoryId?: string | null) => {
    if (!categoryId) return;
    try {
      const countsRaw = safeGetItem(COUNTS_KEY) || "{}";
      const counts = JSON.parse(countsRaw) as Record<string, number>;
      counts[categoryId] = (counts[categoryId] || 0) + 1;
      safeSetItem(COUNTS_KEY, JSON.stringify(counts));

      const recentRaw = safeGetItem(RECENT_KEY) || "[]";
      const recent = JSON.parse(recentRaw) as string[];
      const next = [
        categoryId,
        ...recent.filter((c) => c !== categoryId),
      ].slice(0, 10);
      safeSetItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const getTopCategories = useCallback((k = 3): string[] => {
    try {
      const countsRaw = safeGetItem(COUNTS_KEY) || "{}";
      const counts = JSON.parse(countsRaw) as Record<string, number>;
      return Object.entries(counts)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, k)
        .map(([id]) => id);
    } catch {
      return [];
    }
  }, []);

  const getMostRecentCategory = useCallback((): string | null => {
    try {
      const recentRaw = safeGetItem(RECENT_KEY) || "[]";
      const recent = JSON.parse(recentRaw) as string[];
      return recent.length ? recent[0] : null;
    } catch {
      return null;
    }
  }, []);

  return { recordView, getTopCategories, getMostRecentCategory };
}
