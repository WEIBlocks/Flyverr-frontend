"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  HelpCircle,
  BookOpen,
  ShoppingBag,
  Home,
  Sun,
  Moon,
  Monitor,
  LogOut,
  Settings,
  LayoutDashboard,
  Package,
  Key,
  Mail,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useGetCurrentUser } from "@/features/auth/hooks";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { data: user } = useGetCurrentUser();
  const { theme, setTheme, getThemeIcon, mounted: themeMounted } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = isAuthenticated
    ? [
        { name: "Home", href: "/", icon: Home },
        { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
        { name: "FAQ", href: "/faq", icon: HelpCircle },
        {
          name: "Contact Us",
          href: "/contact",
          icon: Mail,
        },
      ]
    : [
        { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
        { name: "FAQ", href: "/faq", icon: HelpCircle },
        {
          name: "Contact Us",
          href: "/contact",
          icon: Mail,
        },
      ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mounted && isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else if (mounted) {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      if (mounted) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isMobileMenuOpen, mounted]);

  // Click outside to close dropdowns
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isThemeMenuOpen || isProfileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isThemeMenuOpen, isProfileMenuOpen, mounted]);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
    setIsProfileMenuOpen(false); // Close profile dropdown when opening theme dropdown
  };

  const handleProfileToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsThemeMenuOpen(false); // Close theme dropdown when opening profile dropdown
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="bg-flyverr-neutral dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-flyverr-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-3 text-lg sm:text-xl lg:text-2xl font-bold text-flyverr-primary">
                Flyverr
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-flyverr-neutral dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={isAuthenticated ? "/" : "/marketplace"}
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-flyverr-primary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-flyverr-primary">
                  Flyverr
                </span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 -mt-1">
                  Digital Marketplace
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-flyverr-primary"
                      : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>

                  {/* Active Border Effect */}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-flyverr-primary transition-all duration-300 ease-out"></div>
                  )}

                  {/* Hover Border Effect - Expands from center */}
                  {!isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-flyverr-primary transition-all duration-300 ease-out group-hover:w-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <div className="relative" ref={themeDropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleThemeToggle}
                className="text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
              >
                {getThemeIcon()}
              </Button>

              {/* Theme Dropdown */}
              {isThemeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === "light"
                        ? "text-flyverr-primary bg-flyverr-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-flyverr-primary bg-flyverr-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === "system"
                        ? "text-flyverr-primary bg-flyverr-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>System</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileDropdownRef}>
                <Button
                  variant="ghost"
                  onClick={handleProfileToggle}
                  className="text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user?.first_name || "Profile"}
                </Button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        // Add profile page navigation here
                        router.push("/user/profile");
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Profile</span>
                    </button>

                    <Link
                      href="/user/dashboard"
                      prefetch={false}
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>

                    {/* admin dashboard */}
                    {user?.role === "admin" && (
                      <Link
                        href="/admin/pending-products"
                        prefetch={false}
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <div className="relative" ref={themeDropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleThemeToggle}
                className="text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
              >
                {getThemeIcon()}
              </Button>

              {/* Mobile Theme Dropdown */}
              {isThemeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === "light"
                        ? "text-flyverr-primary bg-flyverr-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-flyverr-primary bg-flyverr-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                      theme === "system"
                        ? "text-flyverr-primary bg-flyverr-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>System</span>
                  </button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Mobile Menu Panel */}
            <div
              className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-flyverr-neutral dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-out  ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header - Fixed at top */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                  <Link
                    href={isAuthenticated ? "/" : "/marketplace"}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-flyverr-primary rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold text-flyverr-primary">
                      Flyverr
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-flyverr-primary"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Navigation Items - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive(item.href)
                              ? "text-flyverr-primary bg-flyverr-primary/10 border-l-4 border-flyverr-primary"
                              : "text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Auth Buttons - Fixed at bottom */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3 flex-shrink-0">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <User className="w-5 h-5 mr-3" />
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5 mr-3" />
                        Profile
                      </Button>

                      <Link
                        href="/user/dashboard"
                        prefetch={false}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <LayoutDashboard className="w-5 h-5 mr-3" />
                          Dashboard
                        </Button>
                      </Link>

                      {/* admin dashboard */}
                      {user?.role === "admin" && (
                        <Link
                          href="/admin/pending-products"
                          prefetch={false}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-flyverr-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
