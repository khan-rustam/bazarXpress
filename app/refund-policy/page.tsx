"use client"

import Layout from "../../components/Layout"
import Link from "next/link"
import { RefreshCw, ArrowUp } from "lucide-react"

export default function RefundPolicy() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-spectra transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Refund & Return Policy</span>
          </nav>
        </div>
      </div>
      <section className="relative min-h-[220px] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1595714004311-8a4ca448c20e?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Refund & Return Policy" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center py-10">
          <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-8 max-w-2xl mx-auto flex flex-col items-center text-center backdrop-blur-md">
            <RefreshCw className="h-10 w-10 text-spectra mb-4" />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-spectra">Refund & Return Policy</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-spectra via-neptune to-elm rounded-full mb-6 animate-pulse" />
            <p className="text-gray-700">Read about our hassle-free return and refund process below.</p>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-codGray mb-6">Refund & Return Policy</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>30-day return window for most items</li>
            <li>Items must be in original condition and packaging</li>
            <li>Return shipping costs may apply</li>
            <li>Refunds processed within 5-10 business days</li>
            <li>Some items may be non-returnable (see product page for details)</li>
            <li>Contact our support team to initiate a return or refund</li>
          </ul>
          <p className="text-gray-700">For more details, please <Link href="/contact" className="text-spectra hover:underline">contact our support team</Link>.</p>
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