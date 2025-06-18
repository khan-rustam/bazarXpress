"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ShoppingCart, Heart, Plus, Minus } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  description?: string
  isNew?: boolean
  isSale?: boolean
}

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-surface-primary rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-text-tertiary hover:text-text-primary bg-surface-primary rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-text-tertiary mb-2">{product.category}</p>
                <h2 className="text-2xl font-bold text-text-primary mb-4">{product.name}</h2>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < product.rating ? "text-brand-warning" : "text-text-tertiary"}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-text-tertiary ml-2">({product.rating} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-brand-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-text-tertiary line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-text-secondary mb-6">
                  {product.description ||
                    "High-quality product with excellent features and durability. Perfect for everyday use with modern design and functionality."}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border-primary rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-surface-secondary">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-border-primary">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-surface-secondary">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-text-inverse py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="bg-surface-secondary hover:bg-surface-tertiary text-text-primary p-3 rounded-lg transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
