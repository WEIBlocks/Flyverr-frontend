"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Package, 
  Key, 
  Menu, 
  X, 
  LogOut,
  User,
  Settings,
  Home,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Clock,
  Users,
  ShoppingCart,
  AlertTriangle,
  Star,
  BarChart3,
  Shield,
  Cog
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

interface NavigationItem {
  name: string
  href: string
  iconName?: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: NavigationItem[]
  headerTitle?: string
  profileHref?: string
}

export default function DashboardLayout({ children, navItems, headerTitle, profileHref }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    logout()
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      default:
        return 'System'
    }
  }

  const getIconByName = (iconName?: string) => {
    switch ((iconName || '').toLowerCase()) {
      case 'dashboard':
      case 'overview':
        return LayoutDashboard
      case 'pending':
        return Clock
      case 'resales':
        return ShoppingCart
      case 'stale':
        return AlertTriangle
      case 'reviews':
        return Star
      case 'products':
        return Package
      case 'licenses':
      case 'licences':
        return Key
      case 'settings':
        return Cog
      case 'users':
        return Users
      case 'profile':
        return User
      case 'home':
        return Home
      default:
        return LayoutDashboard
    }
  }
 
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card text-card-foreground shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col border-r border-border
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Section - Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-flyverr-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="ml-3 text-xl font-bold">
              Flyverr
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle Section - Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const IconComp = getIconByName(item.iconName)
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 relative
                    ${isActive 
                      ? 'bg-flyverr-primary text-white shadow-md' 
                      : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
                    }
                  `}>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                    )}
                    
                    <IconComp className={`w-5 h-5 mr-3 transition-colors duration-200`} />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section - Profile & Actions */}
        <div className="p-4 border-t border-border flex-shrink-0">
          {/* User Profile */}
          <Link href={profileHref ?? '/user/profile'}>
            <div className="flex items-center mb-4 p-3 rounded-lg bg-muted cursor-pointer hover:bg-accent transition-colors duration-200">
              <div className="w-10 h-10 bg-flyverr-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.profile?.first_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">
                  {user?.profile?.first_name} {user?.profile?.last_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                <Home className="w-4 h-4 mr-3" />
                Back to Website
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area - Properly positioned */}
      <div className="lg:pl-64">
        {/* Desktop Header - Fixed */}
        <div className="hidden lg:block fixed top-0 right-0 left-64 z-30 bg-card text-card-foreground shadow-sm border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">
                {headerTitle ?? 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center">
              {/* Theme Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
                >
                  {getThemeIcon()}
                  <span className="text-sm">{getThemeLabel()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Theme Dropdown Menu */}
                {themeDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-card text-card-foreground border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setTheme('light')
                          setThemeDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          theme === 'light' ? 'text-flyverr-primary bg-flyverr-primary/10' : ''
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => {
                          setTheme('dark')
                          setThemeDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          theme === 'dark' ? 'text-flyverr-primary bg-flyverr-primary/10' : ''
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => {
                          setTheme('system')
                          setThemeDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          theme === 'system' ? 'text-flyverr-primary bg-flyverr-primary/10' : ''
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        <span>System</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-card text-card-foreground shadow-sm border-b border-border">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-flyverr-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="ml-2 text-lg font-bold">
                Flyverr
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Theme Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="flex items-center space-x-1 p-2 text-muted-foreground hover:text-foreground"
                >
                  {getThemeIcon()}
                  <span className="text-xs">{getThemeLabel()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Theme Dropdown Menu */}
                {themeDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-card text-card-foreground border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setTheme('light')
                          setThemeDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          theme === 'light' ? 'text-flyverr-primary bg-flyverr-primary/10' : ''
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => {
                          setTheme('dark')
                          setThemeDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          theme === 'dark' ? 'text-flyverr-primary bg-flyverr-primary/10' : ''
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => {
                          setTheme('system')
                          setThemeDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                          theme === 'system' ? 'text-flyverr-primary bg-flyverr-primary/10' : ''
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        <span>System</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-8 h-8 bg-flyverr-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.profile?.first_name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content - Scrollable with header offset */}
        <main className="min-h-screen p-4 sm:p-6 lg:p-8 lg:pt-24 pt-20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 