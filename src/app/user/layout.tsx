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
  title: "Dashboard - Flyverr",
  description: "Flyverr Dashboard - Manage your digital products and licenses",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Dashboard", href: "/user/dashboard", iconName: "overview" },
    { name: "My Products", href: "/user/products", iconName: "products" },
    { name: "My Licenses", href: "/user/licenses", iconName: "licenses" },
    { name: "My Listings", href: "/user/user-listings", iconName: "resale" },
    { name: "My Earnings", href: "/user/user-earnings", iconName: "revenue" },
    {
      name: "Payout Requests",
      href: "/user/payout-requests",
      iconName: "payout",
    },
    { name: "Royalty", href: "/user/royalty", iconName: "revenue" },
    { name: "My Badges", href: "/user/badges", iconName: "badge" },
  ];
  return (
    <ProtectedRoute requireAuth allowedRoles={["user"]}>
      <DashboardLayout
        navItems={navItems}
        headerTitle="Dashboard"
        profileHref="/user/profile"
      >
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
