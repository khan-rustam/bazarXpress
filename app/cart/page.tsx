"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "../../components/Layout"
import { getCartItems, updateCartQuantity, removeFromCart, getCartTotal, type CartItem } from "../../lib/cart"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function Cart() {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCartItemsState(getCartItems())
    setIsLoading(false)
  }, [])

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartQuantity(productId, newQuantity)
    setCartItemsState(getCartItems())
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    setCartItemsState(getCartItems())
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

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
            <span className="text-text-primary font-medium">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-text-tertiary" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Your cart is empty</h2>
            <p className="text-text-secondary mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary truncate">{item.name}</h3>
                      <p className="text-sm text-text-secondary">{item.category}</p>
                      <p className="text-lg font-bold text-brand-primary">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-border-primary rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-surface-secondary transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-border-primary min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-surface-secondary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-semibold text-text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="font-semibold text-text-primary">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tax</span>
                    <span className="font-semibold text-text-primary">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border-primary pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-text-primary">Total</span>
                      <span className="text-lg font-bold text-brand-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4 mb-6">
                    <p className="text-brand-primary">
                      Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                  </div>
                )}

                <button className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 mb-4">
                  Proceed to Checkout
                </button>

                <Link href="/shop" className="block text-center text-brand-primary hover:text-brand-primary-dark font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
