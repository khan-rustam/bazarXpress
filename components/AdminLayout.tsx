"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  UserCheck,
  BarChart3,
  Bell,
  Package,
  Building2,
  Tag,
  Grid3X3,
  ShoppingBag,
  Percent,
  ShoppingCart,
  Truck,
  CheckCircle,
  X,
  RefreshCw,
  ImageIcon,
  Sparkles,
  BookOpen,
  HelpCircle,
  Mail,
  Phone,
  UserPlus,
  Star,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { setCurrentUser } from "../lib/auth"
import Image from "next/image"

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: "Admin Dashboard",
    items: [
      { name: "Home", href: "/admin", icon: Home },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
      { name: "Notice", href: "/admin/notices", icon: Bell },
    ],
  },
  {
    title: "PRODUCTS",
    items: [
      { name: "Warehouses", href: "/admin/warehouse", icon: Building2 },
      { name: "Categories", href: "/admin/categories", icon: Grid3X3 },
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Promocodes", href: "/admin/promocodes", icon: Percent },
    ],
  },
  {
    title: "ORDERS",
    items: [
      { name: "All Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "New Orders", href: "/admin/orders/new", icon: ShoppingBag },
      { name: "Shipped Orders", href: "/admin/orders/shipped", icon: Truck },
      { name: "Delivered Orders", href: "/admin/orders/delivered", icon: CheckCircle },
      { name: "Cancelled Orders", href: "/admin/orders/cancelled", icon: X },
      { name: "Refunded Orders", href: "/admin/orders/refunded", icon: RefreshCw },
    ],
  },
  {
    title: "OTHER",
    items: [
      { name: "Banners", href: "/admin/banners", icon: ImageIcon },
      { name: "Smart Banners", href: "/admin/smart-banners", icon: Sparkles },
      { name: "Blogs", href: "/admin/blog", icon: BookOpen },
     
      { name: "Enquiry", href: "/admin/enquiry", icon: Mail },
      { name: "Subscriptions", href: "/admin/subscriptions", icon: UserPlus },
      { name: "Rating & Reviews", href: "/admin/reviews", icon: Star },
    ],
  },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-codGray to-martinique text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"
          } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <Image src="/logo.png" alt="logo" width={40} height={40} />

                <span className="font-bold text-lg">Admin Panel</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {sidebarOpen && (
                <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <nav className="space-y-1 px-2">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "bg-spectra text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      title={!sidebarOpen ? item.name : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {sidebarOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-codGray">
              {menuItems.flatMap((section) => section.items).find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-spectra hover:text-elm font-medium transition-colors">
                Home
              </Link>
              <Image src="/logo.png" alt="logo" width={50} height={50} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
