"use client"

import Layout from "../../components/Layout"
import Link from "next/link"
import { Truck, ArrowUp } from "lucide-react"

export default function ShippingPolicy() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-spectra transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Shipping Policy</span>
          </nav>
        </div>
      </div>
      <section className="relative min-h-[220px] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Shipping Policy" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center py-10">
          <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-8 max-w-2xl mx-auto flex flex-col items-center text-center backdrop-blur-md">
            <Truck className="h-10 w-10 text-spectra mb-4" />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-spectra">Shipping Policy</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-spectra via-neptune to-elm rounded-full mb-6 animate-pulse" />
            <p className="text-gray-700">Learn about our shipping methods, delivery times, and more below.</p>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-codGray mb-6">Shipping Policy</h2>
          <p className="text-gray-700 mb-4">We strive to deliver your orders quickly and efficiently. Please review our shipping policy below:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Standard shipping: 3-7 business days</li>
            <li>Express shipping: 1-3 business days</li>
            <li>Free shipping on orders over $100</li>
            <li>Tracking information will be provided via email</li>
            <li>International shipping available to select countries</li>
            <li>Shipping times may vary during holidays or due to unforeseen circumstances</li>
          </ul>
          <p className="text-gray-700">For any questions, please <Link href="/contact" className="text-spectra hover:underline">contact our support team</Link>.</p>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 bg-spectra text-white p-4 rounded-full shadow-xl hover:bg-elm transition-colors animate-fade-in"
        aria-label="Back to Top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </Layout>
  )
} 