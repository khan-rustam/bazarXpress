"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, X, ChevronDown, Heart, Package, Settings, LogOut, Shield, User2 } from "lucide-react"
import { getCurrentUser, setCurrentUser } from "../lib/auth"
import { getCartCount } from "../lib/cart"
import type { User as AuthUser } from "../lib/auth"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [currentUser, setCurrentUserState] = useState<AuthUser | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  useEffect(() => {
    setCurrentUserState(getCurrentUser())
    setCartCount(getCartCount())

    // Listen for storage changes to update cart count
    const handleStorageChange = () => {
      setCartCount(getCartCount())
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleUserClick = () => {
    if (currentUser) {
      setIsProfileOpen(!isProfileOpen)
    } else {
      router.push("/auth/login")
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentUserState(null)
    setIsProfileOpen(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-spectra/90 backdrop-blur-md shadow-xl border-b border-spectra/60 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src="/logo.png" alt="BazarXpress" width={50} height={50} className="border-2 border-white rounded-full p-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            <Image src="/logo-text.png" alt="BazarXpress" width={100} height={100} className="transition-opacity duration-300 group-hover:opacity-80" />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-neptune transition-colors duration-200 font-medium px-2 py-1 rounded-lg hover:bg-white/10 focus:bg-white/20 focus:text-elm focus:outline-none focus:ring-2 focus:ring-neptune"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm text-white placeholder-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neptune border border-white/20"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchValue.trim()) {
                    router.push(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
                  }
                }}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-200" />
              {searchValue && (
                <button
                  className="absolute right-3 top-2.5 text-gray-300 hover:text-red-400 focus:outline-none"
                  onClick={() => setSearchValue("")}
                  tabIndex={-1}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-100 hover:text-neptune transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-100 hover:text-neptune transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-mountbattenPink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={handleUserClick}
                className="p-2 text-gray-100 hover:text-neptune transition-colors flex items-center space-x-1"
              >
                <User2 className="h-6 w-6" />
                {currentUser && <ChevronDown className="h-4 w-4" />}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-codGray">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                    {currentUser.role === "admin" && (
                      <span className="inline-block bg-spectra text-white text-xs px-2 py-1 rounded-full mt-1">
                        Admin
                      </span>
                    )}
                  </div>

                  {/* Admin Dashboard Link */}
                  {currentUser.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center px-4 py-2 text-sm text-codGray hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Shield className="h-4 w-4 mr-3" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-codGray hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Profile Settings
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center px-4 py-2 text-sm text-codGray hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    Wishlist
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center px-4 py-2 text-sm text-codGray hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Cart
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-4 py-2 text-sm text-codGray hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Package className="h-4 w-4 mr-3" />
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-100 hover:text-neptune transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm text-white placeholder-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neptune border border-white/20"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchValue.trim()) {
                    router.push(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
                    setIsSearchOpen(false);
                  }
                }}
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-200" />
              {searchValue && (
                <button
                  className="absolute right-3 top-2.5 text-gray-300 hover:text-red-400 focus:outline-none"
                  onClick={() => setSearchValue("")}
                  tabIndex={-1}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-100 hover:text-neptune transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!currentUser && (
                <Link
                  href="/auth/login"
                  className="text-gray-100 hover:text-neptune transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
