"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  getThemeIcon: () => React.ReactNode
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage only after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('flyverr-theme') as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeState(systemPrefersDark ? 'dark' : 'light')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return // Don't apply theme until mounted
    
    const root = document.documentElement
    const actualTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    
    root.classList.remove('light', 'dark')
    root.classList.add(actualTheme)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (mounted) {
      localStorage.setItem('flyverr-theme', newTheme)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const getThemeIcon = () => {
    if (!mounted) return '💻' // Default icon until mounted
    
    const actualTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    
    switch (actualTheme) {
      case 'light':
        return '🌞'
      case 'dark':
        return '🌙'
      default:
        return '💻'
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, getThemeIcon, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 