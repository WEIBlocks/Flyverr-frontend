import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin - Flyverr",
  description: "Flyverr Admin - Manage platform settings and users",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: 'Overview', href: '/admin', iconName: 'overview' },
    { name: 'Pending Products', href: '/admin/pending-products', iconName: 'pending' },
    { name: 'All Products', href: '/admin/products', iconName: 'products' },
    { name: 'Users', href: '/admin/users', iconName: 'users' },
    { name: 'Resale Listings', href: '/admin/resales', iconName: 'resales' },
    { name: 'Stale Resales (30d)', href: '/admin/stale-resales', iconName: 'stale' },
    { name: 'Reviews', href: '/admin/reviews', iconName: 'reviews' },
    { name: 'Settings', href: '/admin/settings', iconName: 'settings' },
  ]

  return (
    <ProtectedRoute requireAuth allowedRoles={['admin']}>
      <DashboardLayout navItems={navItems} headerTitle="Admin" profileHref="/admin/profile">
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

