"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import QuickViewModal from "./QuickViewModal"
import type { Product } from "../lib/products"

interface RelatedProductsProps {
  products: Product[]
  title?: string
}

export default function RelatedProducts({ products, title = "Related Products" }: RelatedProductsProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <>
      <div className="bg-surface-primary rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-bold text-text-primary mb-6">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
          ))}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
    </>
  )
}
