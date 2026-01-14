"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";

const menteeNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/progress", label: "My Progress", icon: BookOpen },
  { href: "/dashboard/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const mentorNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mentor/mentees", label: "My Mentees", icon: Users },
  { href: "/mentor/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const role = session?.user?.role || "mentee";
  const navItems = role === "admin" ? adminNavItems : role === "mentor" ? mentorNavItems : menteeNavItems;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="TektonX Labs"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-deep/10 text-purple-deep"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-deep to-purple-electric flex items-center justify-center text-white font-semibold">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                {role === "admin" && <Shield className="w-3 h-3" />}
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="TektonX Labs"
            width={120}
            height={35}
            className="h-7 w-auto"
          />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-purple-deep/10 text-purple-deep"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
