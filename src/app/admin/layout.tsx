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
    {
      name: "Pending Products",
      href: "/admin/pending-products",
      iconName: "pending",
    },
    { 
      name: "All Products", 
      href: "/admin/products", 
      iconName: "all-products" 
    },
    { 
      name: "Platform Products", 
      href: "/admin/platform-products", 
      iconName: "platform" 
    },
    { 
      name: "Users", 
      href: "/admin/users", 
      iconName: "users" 
    },
    {
      name: "Stale Resales (30d)",
      href: "/admin/stale-resales",
      iconName: "stale",
    },
    { 
      name: "Reviews", 
      href: "/admin/reviews", 
      iconName: "reviews" 
    },
    {
      name: "Sponsored Products",
      href: "/admin/sponsored-products",
      iconName: "sponsored",
    },
    {
      name: "Platform Revenue",
      href: "/admin/platform-revenue",
      iconName: "revenue",
    },
    {
      name: "Payout Requests",
      href: "/admin/payout-requests",
      iconName: "payout",
    },
  ];

  return (
    <ProtectedRoute requireAuth allowedRoles={["admin"]}>
      <DashboardLayout
        navItems={navItems}
        headerTitle="Admin"
        profileHref="/user/profile"
      >
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
