"use client"

import React, { useState } from "react"
import Layout from "../../components/Layout"
import ProductCard from "../../components/ProductCard"
import QuickViewModal from "../../components/QuickViewModal"
import { Grid, List, Filter, ChevronDown, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

// Mock products data
const allProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    rating: 4,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    rating: 5,
    isNew: true,
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home & Kitchen",
    rating: 4,
    isSale: true,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fashion",
    rating: 4,
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    rating: 5,
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sports",
    rating: 4,
    isSale: true,
  },
]

const categories = ["All", "Electronics", "Fashion", "Home & Kitchen", "Sports"]
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function Shop() {
  const searchParams = useSearchParams()
  const categoryFromQuery = searchParams.get("category")
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState(
    searchQuery ? "All" : (categoryFromQuery && categories.includes(categoryFromQuery) ? categoryFromQuery : "All")
  )
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null)
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Update selectedCategory if the query param changes
  React.useEffect(() => {
    if (searchQuery) {
      setSelectedCategory("All")
    } else if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery)
    }
  }, [categoryFromQuery, searchQuery])

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
    const priceMatch =
      !selectedPriceRange || (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max)
    const searchMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery)
    return categoryMatch && priceMatch && searchMatch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-spectra transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-codGray mb-2">All Products</h1>
            {searchQuery && (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-spectra text-lg font-medium">Search results for: <span className="font-bold">{searchQuery}</span></p>
                <button
                  className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-red-200 text-spectra hover:text-red-600 transition-colors"
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search)
                    params.delete('search')
                    window.location.search = params.toString()
                  }}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <p className="text-gray-600">Showing {sortedProducts.length} products</p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-spectra"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-spectra text-white" : "bg-white text-gray-600"}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-spectra text-white" : "bg-white text-gray-600"}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 bg-spectra text-white px-4 py-2 rounded-lg"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`md:block ${showFilters ? "block" : "hidden"} space-y-6`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-codGray mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-spectra focus:ring-spectra"
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-codGray mb-4">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    checked={!selectedPriceRange}
                    onChange={() => setSelectedPriceRange(null)}
                    className="text-spectra focus:ring-spectra"
                  />
                  <span className="ml-2 text-gray-700">All Prices</span>
                </label>
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === range}
                      onChange={() => setSelectedPriceRange(range)}
                      className="text-spectra focus:ring-spectra"
                    />
                    <span className="ml-2 text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="md:col-span-3">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                            <h3 className="text-xl font-semibold text-codGray mb-2">{product.name}</h3>
                            <div className="flex items-center mb-3">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-2xl font-bold text-spectra">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <button
                              onClick={() => handleQuickView(product)}
                              className="bg-gray-100 hover:bg-gray-200 text-codGray px-4 py-2 rounded-lg transition-colors"
                            >
                              Quick View
                            </button>
                            <button className="bg-spectra hover:bg-elm text-white px-4 py-2 rounded-lg transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
    </Layout>
  )
}
