"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/utils'
import type { UserProfile } from '@/features/auth/auth.types'

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  mounted: boolean
  logout: () => void
  checkAuth: () => Promise<void>
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is authenticated on mount
  useEffect(() => {
    if (mounted) {
      checkAuth()
    }
  }, [mounted])

  const checkAuth = async () => {
    try {
      const token = storage.getToken()
      const userData = storage.getUser()

      if (token && userData) {
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear local storage
    storage.clearAuth()

    // Clear user state
    setUser(null)
    setIsAuthenticated(false)

    // Redirect to login page
    router.push('/login')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    mounted,
    logout,
    checkAuth,
    setIsAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 