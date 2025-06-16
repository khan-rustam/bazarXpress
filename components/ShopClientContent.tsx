"use client"

import React, { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import QuickViewModal from "./QuickViewModal"
import { products as initialProducts } from "../lib/products"
import { Grid3X3, List, ShoppingCart, Eye, Heart, Search } from "lucide-react"

const categories = ["All", ...Array.from(new Set(initialProducts.map(p => p.category)))]
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function ShopClientContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const initialCategory = (searchParams.category as string) || "All"
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const categoryFromQuery = searchParams.category as string | undefined
  const searchQuery = (searchParams.search as string)?.toLowerCase() || ""

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null)
  const [sortBy, setSortBy] = useState("name")
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const matchedCategory = categories.find(cat => cat.toLowerCase() === lowerCaseSearchQuery)
      if (matchedCategory) {
        setSelectedCategory(matchedCategory)
      } else {
        setSelectedCategory("All") // If no exact category match, reset to all to perform text search
      }
    } else if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery)
    } else {
      setSelectedCategory("All")
    }
  }, [categoryFromQuery, searchQuery])

  const openQuickView = (product: any) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }

  const filteredProducts = initialProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice = selectedPriceRange
      ? product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      : true
    const matchesSearch = selectedCategory === "All" && (product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery))

    return matchesCategory && matchesPrice && (selectedCategory !== "All" || matchesSearch)
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    return 0
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-codGray mb-4 md:mb-0">Shop</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-codGray text-sm focus:outline-none focus:border-spectra transition-colors cursor-pointer"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-spectra text-white shadow-md" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-colors`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-spectra text-white shadow-md" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-colors`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-28">
          <h3 className="text-xl font-bold text-codGray mb-4">Categories</h3>
          <ul className="space-y-2 mb-6">
            {categories.map(category => (
              <li key={category}>
                <button
                  className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${selectedCategory === category ? "bg-spectra text-white font-semibold shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-codGray mb-4">Price Range</h3>
          <ul className="space-y-2">
            {priceRanges.map((range, index) => (
              <li key={index}>
                <button
                  className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${selectedPriceRange === range ? "bg-spectra text-white font-semibold shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setSelectedPriceRange(range)}
                >
                  {range.label}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${selectedPriceRange === null ? "bg-spectra text-white font-semibold shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setSelectedPriceRange(null)}
              >
                All Prices
              </button>
            </li>
          </ul>
        </aside>

        {/* Product Grid/List */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No products found for the selected filters.</div>
          ) : (
            <div className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} openQuickView={openQuickView} viewMode={viewMode} />
              ))}
            </div>
          )}
        </main>
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
    </div>
  )
} 