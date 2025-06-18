"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, ShoppingCart, Menu, X, ChevronDown, Heart, Package, Settings, LogOut, Shield, User2 } from "lucide-react"
import { getCartCount } from "../lib/cart"
import type { User as AuthUser } from "../lib/auth"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from '../lib/store';
import { logout } from '../lib/slices/authSlice';

// Mock product data - Replace this with your actual product data fetching
const mockProducts = [
  { id: 1, name: "iPhone 13 Pro", category: "Electronics" },
  { id: 2, name: "Samsung Galaxy S21", category: "Electronics" },
  { id: 3, name: "MacBook Pro", category: "Electronics" },
  { id: 4, name: "Nike Air Max", category: "Fashion" },
  { id: 5, name: "Adidas Ultraboost", category: "Fashion" },
  { id: 6, name: "Sony Headphones", category: "Electronics" },
  { id: 7, name: "Levi's Jeans", category: "Fashion" },
  { id: 8, name: "Apple Watch", category: "Electronics" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const router = useRouter()
  const pathname = usePathname()

  // State for header visibility on scroll
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showHeader, setShowHeader] = useState(true)

  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCartCount(getCartCount())

    // Listen for storage changes to update cart count
    const handleStorageChange = () => {
      setCartCount(getCartCount())
    }

    // Handle scroll to hide/show header
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down past a small initial offset
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setShowHeader(false);
      } 
      // Show header when scrolling up or at the very top
      else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [lastScrollY])

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
    dispatch(logout());
    setIsProfileOpen(false);
    router.push("/");
  }

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    if (value.trim()) {
      // Filter products based on search input
      const results = mockProducts.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // Handle search result click
  const handleResultClick = (productId: number) => {
    router.push(`/product/${productId}`)
    setIsSearchOpen(false)
    setSearchValue("")
    setSearchResults([])
  }

  return (
    <header className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl mx-auto bg-surface-primary/80 backdrop-blur-md border border-border-primary/20 rounded-2xl transition-all duration-500 ${showHeader ? 'translate-y-6 shadow-xl' : '-translate-y-[120px] shadow-none'}`}>
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="BazarXpress" 
              width={120} 
              height={60} 
              className="w-24 md:w-32 lg:w-36" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-text-primary hover:text-brand-primary transition-colors duration-200 font-medium px-2 py-1 text-sm lg:text-base after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-primary after:w-0 after:transition-all after:duration-300 hover:after:w-full focus:after:w-full focus:outline-none ${pathname === item.href ? 'after:w-full' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <>
                  {/* Desktop Search */}
                  <div className="hidden md:block relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-36 lg:w-44 px-2 lg:px-3 py-1 lg:py-1.5 pl-7 lg:pl-8 bg-surface-primary text-text-primary placeholder-text-secondary/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary border border-border-primary/20 text-sm"
                      value={searchValue}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter" && searchValue.trim()) {
                          router.push(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
                          setIsSearchOpen(false);
                          setSearchValue("");
                          setSearchResults([]);
                        }
                      }}
                      onBlur={() => {
                        // Delay closing to allow clicking on results
                        setTimeout(() => {
                          if (!searchValue) {
                            setIsSearchOpen(false);
                            setSearchResults([]);
                          }
                        }, 200);
                      }}
                      autoFocus
                    />
                    <Search className="absolute left-2 lg:left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 lg:h-4 lg:w-4 text-text-secondary" />
                    {searchValue && (
                      <button
                        className="absolute right-2 lg:right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-brand-primary focus:outline-none"
                        onClick={() => {
                          setSearchValue("");
                          setIsSearchOpen(false);
                        }}
                        tabIndex={-1}
                        aria-label="Clear search"
                      >
                        <X className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      </button>
                    )}
                  </div>

                  {/* Mobile Search */}
                  <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black/20 z-40" onClick={() => setIsSearchOpen(false)}>
                    <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[90%] max-w-md">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full px-4 py-3 pl-10 bg-surface-primary text-text-primary placeholder-text-secondary/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary border border-border-primary/20 text-base shadow-xl"
                          value={searchValue}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter" && searchValue.trim()) {
                              router.push(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
                              setIsSearchOpen(false);
                              setSearchValue("");
                              setSearchResults([]);
                            }
                          }}
                          autoFocus
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
                        {searchValue && (
                          <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-brand-primary focus:outline-none"
                            onClick={() => {
                              setSearchValue("");
                              setIsSearchOpen(false);
                            }}
                            tabIndex={-1}
                            aria-label="Clear search"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}

                        {isSearchOpen && searchResults.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-surface-primary rounded-lg shadow-xl border border-border-primary/20 max-h-[300px] overflow-y-auto z-50">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleResultClick(product.id)}
                                className="w-full px-4 py-3 text-left hover:bg-surface-secondary transition-colors flex items-center justify-between"
                              >
                                <div>
                                  <p className="text-text-primary font-medium">{product.name}</p>
                                  <p className="text-text-secondary text-sm">{product.category}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 md:p-2 text-text-primary hover:text-brand-primary transition-colors"
                >
                  <Search className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="p-1.5 md:p-2 text-text-primary hover:text-brand-primary transition-colors relative">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-text-inverse text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={handleUserClick}
                className="p-1.5 md:p-2 text-text-primary hover:text-brand-primary transition-colors flex items-center space-x-1"
              >
                <User2 className="h-5 w-5 sm:h-6 sm:w-6" />
                {currentUser && <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-primary/95 backdrop-blur-md rounded-lg shadow-xl py-2 z-50 border border-border-primary/20">
                  <div className="px-4 py-2 border-b border-border-primary/20">
                    <p className="text-sm font-medium text-text-primary">{currentUser.name}</p>
                    <p className="text-xs text-text-secondary">{currentUser.email}</p>
                    {currentUser.role === "admin" && (
                      <span className="inline-block bg-brand-primary text-text-inverse text-xs px-2 py-1 rounded-full mt-1">
                        Admin
                      </span>
                    )}
                  </div>

                  {/* Admin Dashboard Link */}
                  {currentUser.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:text-brand-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Shield className="h-4 w-4 mr-3" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-text-primary hover:text-brand-primary transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Profile Settings
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center px-4 py-2 text-sm text-text-primary hover:text-brand-primary transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    Wishlist
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center px-4 py-2 text-sm text-text-primary hover:text-brand-primary transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Cart
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-4 py-2 text-sm text-text-primary hover:text-brand-primary transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Package className="h-4 w-4 mr-3" />
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-brand-danger hover:text-brand-danger-dark transition-colors"
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
              className="md:hidden p-1.5 text-text-primary hover:text-brand-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-border-primary/20">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-text-primary hover:text-brand-primary transition-colors duration-200 font-medium px-2 py-1 text-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-primary after:w-0 after:transition-all after:duration-300 hover:after:w-full focus:after:w-full focus:outline-none ${pathname === item.href ? 'after:w-full' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
