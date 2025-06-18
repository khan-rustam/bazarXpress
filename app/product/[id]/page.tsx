"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Layout from "../../../components/Layout"
import ImageGallery from "../../../components/ImageGallery"
import ProductReviews from "../../../components/ProductReviews"
import RelatedProducts from "../../../components/RelatedProducts"
import { getProductById, getRelatedProducts, getProductReviews, type Product } from "../../../lib/products"
import { addToCart } from "../../../lib/cart"
import { addToWishlist, removeFromWishlist, isInWishlist } from "../../../lib/wishlist"
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Plus,
  Minus,
  Check,
  AlertCircle,
} from "lucide-react"
import { toast } from "react-toastify"

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState<"description" | "specifications" | "reviews">("description")
  const [inWishlist, setInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId)
      if (foundProduct) {
        setProduct(foundProduct)
        setRelatedProducts(getRelatedProducts(productId, foundProduct.category))
        setReviews(getProductReviews(productId))
        setInWishlist(isInWishlist(productId))
      }
      setIsLoading(false)
    }
  }, [productId])

  const wishlistToast = (message: string) =>
    toast(message, {
      className: "!bg-brand-primary !text-white",
      progressClassName: "!bg-white/70",
      icon: <Heart className="text-white" />,
    })

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      toast.success(`${product.name} was added to your cart!`)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'))
      }
    }
  }

  const handleWishlistToggle = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id)
        wishlistToast(`${product.name} was removed from your wishlist.`)
      } else {
        addToWishlist(product)
        wishlistToast(`${product.name} was added to your wishlist!`)
      }
      setInWishlist(!inWishlist)
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-codGray mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link
              href="/shop"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-codGray">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-codGray">
              Shop
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/shop/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-codGray">
              <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="text-gray-500 hover:text-codGray">
                {product.category}
              </Link>
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-codGray font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex space-x-2">
              {product.isNew && <span className="bg-brand-primary text-white text-sm px-3 py-1 rounded-full">New</span>}
              {product.isSale && discountPercentage > 0 && (
                <span className="bg-brand-primary text-white text-sm px-3 py-1 rounded-full">
                  -{discountPercentage}% OFF
                </span>
              )}
              {product.inStock && product.stockCount <= 5 && (
                <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                  Only {product.stockCount} left
                </span>
              )}
            </div>

            {/* Title and Brand */}
            <div>
              <p className="text-brand-primary font-medium mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-codGray mb-4">{product.name}</h1>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-brand-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-codGray mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-gray-500">({product.stockCount} available)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-codGray">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={!product.inStock}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={!product.inStock || quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 border-2 rounded-lg transition-colors ${
                    inWishlist
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-300 text-gray-600 hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3 border-2 border-gray-300 text-gray-600 hover:border-brand-primary hover:text-brand-primary rounded-lg transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-brand-primary" />
                <span className="text-sm text-gray-700">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-brand-primary" />
                <span className="text-sm text-gray-700">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <span className="text-sm text-gray-700">2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: "description", label: "Description" },
                { key: "specifications", label: "Specifications" },
                { key: "reviews", label: `Reviews (${reviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.key
                      ? "border-brand-primary text-brand-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-codGray mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-codGray mb-3">Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === "specifications" && (
              <div>
                <h3 className="text-xl font-semibold text-codGray mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-codGray">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "reviews" && (
              <ProductReviews reviews={reviews} averageRating={product.rating} totalReviews={product.reviewCount} />
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </Layout>
  )
}
