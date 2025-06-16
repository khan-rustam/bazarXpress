"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail } from "lucide-react"

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenModal = sessionStorage.getItem("newsletter-modal-seen")
      if (!hasSeenModal) {
        setIsOpen(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem("newsletter-modal-seen", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-neptune rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-codGray mb-2">Stay in the Loop!</h2>
            <p className="text-gray-600">
              Subscribe to our newsletter and get exclusive deals, new arrivals, and special offers delivered to your
              inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectra"
              required
            />
            <button
              type="submit"
              className="w-full bg-spectra hover:bg-elm text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Subscribe Now
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </div>
  )
}
