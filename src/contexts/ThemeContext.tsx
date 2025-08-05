"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  getThemeIcon: () => React.ReactNode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  // Initialize theme from localStorage
  useEffect(() => {
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
    const root = document.documentElement
    const actualTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    
    root.classList.remove('light', 'dark')
    root.classList.add(actualTheme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('flyverr-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const getThemeIcon = () => {
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
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, getThemeIcon }}>
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