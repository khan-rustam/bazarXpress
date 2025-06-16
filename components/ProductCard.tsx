"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { addToWishlist, removeFromWishlist, isInWishlist } from "../lib/wishlist"
import { addToCart } from "../lib/cart"
import { toast } from "react-toastify"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  isNew?: boolean
  isSale?: boolean
}

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
}

// Utility for wishlist toast
const wishlistToast = (message: string) =>
  toast(message, {
    className: "!bg-mountbattenPink !text-white",
    progressClassName: "!bg-white/70",
    icon: <Heart className="text-white" />,
  })

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    setInWishlist(isInWishlist(product.id))
  }, [product.id])

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      wishlistToast(`${product.name} was removed from your wishlist.`)
    } else {
      addToWishlist(product)
      wishlistToast(`${product.name} was added to your wishlist!`)
    }
    setInWishlist(!inWishlist)
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
        {product.isNew && <span className="bg-elm text-white text-xs px-2 py-1 rounded-full">New</span>}
        {product.isSale && discountPercentage > 0 && (
          <span className="bg-mountbattenPink text-white text-xs px-2 py-1 rounded-full">-{discountPercentage}%</span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images?.[0] || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 delay-100">
            <button
              onClick={() => onQuickView(product)}
              className="bg-white text-codGray p-2 rounded-full hover:bg-spectra hover:text-white transition-colors shadow-md"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={handleWishlistClick}
              className={`bg-white text-codGray p-2 rounded-full hover:bg-mountbattenPink hover:text-white transition-colors shadow-md ${inWishlist ? "text-red-500" : ""}`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-codGray hover:text-spectra transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>



        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-spectra">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => {
              addToCart(product)
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('storage'))
              }
              toast.success(`${product.name} was added to your cart!`)
            }}
            className="bg-spectra hover:bg-elm text-white p-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
