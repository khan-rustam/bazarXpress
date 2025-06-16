"use client"

import { ArrowUp } from "lucide-react"

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 bg-spectra text-white p-4 rounded-full shadow-xl hover:bg-elm transition-colors animate-fade-in"
      aria-label="Back to Top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  )
} 