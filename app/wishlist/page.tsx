"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "../../components/Layout"
import { getWishlistItems, removeFromWishlist, type WishlistItem } from "../../lib/wishlist"
import { addToCart } from "../../lib/cart"
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { toast } from "react-toastify"

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setWishlistItems(getWishlistItems())
    setIsLoading(false)
  }, [])

  const wishlistToast = (message: string) =>
    toast(message, {
      className: "!bg-mountbattenPink !text-white",
      progressClassName: "!bg-white/70",
      icon: <Heart className="text-white" />,
    })

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
    setWishlistItems(getWishlistItems())
    wishlistToast(`Item was removed from your wishlist.`)
  }

  const handleAddToCart = (item: WishlistItem) => {
    addToCart(item)
    toast.success(`${item.name} was added to your cart!`)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'))
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface-secondary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-text-secondary hover:text-brand-primary transition-colors">Home</Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary font-medium">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-text-primary">My Wishlist</h1>
          <span className="text-text-secondary">{wishlistItems.length} items</span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-text-tertiary" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Your wishlist is empty</h2>
            <p className="text-text-secondary mb-8">Save items you love to your wishlist and shop them later.</p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-sm text-text-secondary mb-1">{item.category}</p>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-semibold text-text-primary hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-text-secondary ml-1">({item.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-brand-primary">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-text-secondary line-through">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
