"use client"

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function ConditionalNavigation() {
  const pathname = usePathname()
  const isDashboardRoute = pathname.startsWith('/dashboard')

  if (isDashboardRoute) {
    return null
  }

  return <Navigation />
} 