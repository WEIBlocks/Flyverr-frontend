/**
 * Global Color Scheme for Flyverr
 * This file provides TypeScript definitions and utilities for the color scheme
 */

export const colors = {
  light: {
    primary: "#1B1C25",
    background: "#FFFFFF",
    text: "#1B1C25",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    hover: "#F9FAFB",
  },
  dark: {
    primary: "#4f46e5",
    background: "#1f2937",
    text: "#f9fafb",
    textMuted: "#9CA3AF",
    border: "#374151",
    hover: "#374151",
  },
} as const;

export type ColorTheme = "light" | "dark";

export type LightColors = typeof colors.light;
export type DarkColors = typeof colors.dark;

/**
 * CSS Custom Properties for colors
 * These match the variables defined in colors.css
 */
export const cssVariables = {
  light: {
    "--flyverr-primary": colors.light.primary,
    "--flyverr-secondary": colors.light.primary,
    "--flyverr-accent": colors.light.primary,
    "--flyverr-neutral": colors.light.background,
    "--flyverr-text": colors.light.text,
    "--flyverr-text-muted": colors.light.textMuted,
    "--flyverr-border": colors.light.border,
    "--flyverr-hover": colors.light.hover,
  },
  dark: {
    "--flyverr-primary": colors.dark.primary,
    "--flyverr-secondary": colors.dark.primary,
    "--flyverr-accent": "#fbbf24",
    "--flyverr-neutral": colors.dark.background,
    "--flyverr-text": colors.dark.text,
    "--flyverr-text-muted": colors.dark.textMuted,
    "--flyverr-border": colors.dark.border,
    "--flyverr-hover": colors.dark.hover,
  },
} as const;

/**
 * Utility function to get color by theme
 */
export function getColor(theme: ColorTheme, color: keyof LightColors): string {
  return colors[theme][color];
}

/**
 * Utility function to get CSS variable name
 */
export function getCssVariable(color: keyof LightColors): string {
  return `--flyverr-${color.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

/**
 * Tailwind CSS class names for colors
 */
export const tailwindClasses = {
  primary: "text-flyverr-primary bg-flyverr-primary border-flyverr-primary",
  secondary:
    "text-flyverr-secondary bg-flyverr-secondary border-flyverr-secondary",
  neutral: "text-flyverr-text bg-flyverr-neutral border-flyverr-border",
  muted: "text-flyverr-text-muted",
  hover: "hover:bg-flyverr-hover hover:text-flyverr-primary",
} as const;
