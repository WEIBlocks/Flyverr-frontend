"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

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
      // Always default to light theme, don't check system preference
      setThemeState('light')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return // Don't apply theme until mounted
    
    const root = document.documentElement
    // When system is selected, actually follow OS preference
    const actualTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    
    root.classList.remove('light', 'dark')
    root.classList.add(actualTheme)
  }, [theme, mounted])

  // Listen for system theme changes when 'system' is selected
  useEffect(() => {
    if (!mounted || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = document.documentElement
      const actualTheme = mediaQuery.matches ? 'dark' : 'light'
      root.classList.remove('light', 'dark')
      root.classList.add(actualTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
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
    if (!mounted) return <Monitor className="h-5 w-5" /> // Default icon until mounted
    
    // For system theme, show the actual current theme icon
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemPrefersDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
    }
    
    // For explicit light/dark themes, show the selected theme icon
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />
      case 'dark':
        return <Moon className="h-5 w-5" />
      default:
        return <Sun className="h-5 w-5" /> // Default to light icon
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