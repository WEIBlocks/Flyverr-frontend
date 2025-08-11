"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/utils'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  // When the route is guest-only (requireAuth=false) and user is authenticated,
  // redirect them here. Defaults to user dashboard.
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = false, 
  redirectTo = '/user/dashboard',
}) => {
  const router = useRouter()

  // Auth is determined by presence of access token.
  const token = storage.getToken()
  const isAuthenticated = Boolean(token)

  useEffect(() => {
    // Protected route: must be authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace('/login')
      return
    }

    // Guest-only route (e.g., login/signup): redirect authenticated users
    if (!requireAuth && isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [requireAuth, isAuthenticated, redirectTo, router])

  // Prevent flashing content while redirecting
  if (requireAuth && !isAuthenticated) return null
  if (!requireAuth && isAuthenticated) return null

  return <>{children}</>
} 