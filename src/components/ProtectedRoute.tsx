"use client"

import React, { useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auth is determined by presence of access token.
  const token = mounted ? storage.getToken() : null
  const isAuthenticated = Boolean(token)

  useEffect(() => {
    if (!mounted) return

    // Protected route: must be authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace('/login')
      return
    }

    // Guest-only route (e.g., login/signup): redirect authenticated users
    if (!requireAuth && isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [requireAuth, isAuthenticated, redirectTo, router, mounted])

  // Prevent flashing content while redirecting
  if (!mounted) return null
  if (requireAuth && !isAuthenticated) return null
  if (!requireAuth && isAuthenticated) return null

  return <>{children}</>
} 