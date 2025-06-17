import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BazarXpress - Your Trusted Online Marketplace",
  description:
    "Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods, and more with fast delivery and exceptional service.",
  keywords: "online shopping, e-commerce, electronics, fashion, home goods, marketplace",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
