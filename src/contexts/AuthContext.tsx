"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as loginApi, signup as signupApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/utils'

interface User {
  id: string
  email: string
  emailVerified: boolean
  profile: {
    id: string
    email: string
    first_name: string
    last_name: string
    username: string
    avatar_url?: string
    bio?: string
    role: string
    status: string
    email_verified: boolean
    created_at: string
    updated_at: string
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: { firstName: string; lastName: string; username: string; email: string; password: string }) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
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
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = storage.getToken()
      const userData = storage.getUser()
      
      if (token && userData) {
        setUser(userData)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await loginApi({ email, password })
      
      // Handle the specific API response structure
      const responseData: any = response.data
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Login failed')
      }
      
      const userData = responseData.data.user
      const session = responseData.data.session
      
      if (!userData || !session) {
        throw new Error('Invalid response from server')
      }
      
      // Store token and user data
      storage.setToken(session.accessToken)
      storage.setRefreshToken(session.refreshToken)
      storage.setUser(userData)
      
      setUser(userData)
      router.push('/')
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: { firstName: string; lastName: string; username: string; email: string; password: string }) => {
    try {
      setIsLoading(true)
      const response = await signupApi(data)
      
      // Handle the specific API response structure
      const responseData: any = response.data
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Signup failed')
      }
      
      const userData = responseData.data.user
      const session = responseData.data.session
      
      if (!userData || !session) {
        throw new Error('Invalid response from server')
      }
      
      // Store token and user data
      storage.setToken(session.accessToken)
      storage.setRefreshToken(session.refreshToken)
      storage.setUser(userData)
      
      setUser(userData)
      router.push('/')
    } catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(error.response?.data?.message || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear local storage
    storage.clearAuth()
    
    // Clear user state
    setUser(null)
    
    // Redirect to login page
    router.push('/login')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 