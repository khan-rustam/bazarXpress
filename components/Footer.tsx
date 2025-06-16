import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-martinique to-codGray text-white">
      <div className="max-w-7xl mx-auto px-2 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <Image src="/logo.png" alt="BazarXpress" width={50} height={50} className="border-2 border-white rounded-full p-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <Image src="/logo-text.png" alt="BazarXpress" width={120} height={100} className="transition-opacity duration-300 group-hover:opacity-80" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted online marketplace for quality products at unbeatable prices. Shop with confidence and enjoy
              fast, reliable delivery.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-neptune cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-neptune cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-neptune cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-neptune cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neptune">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>


          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neptune">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-300 hover:text-white transition-colors">
                  Refund & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neptune">Shop Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/electronics" className="text-gray-300 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/shop/fashion" className="text-gray-300 hover:text-white transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/shop/home" className="text-gray-300 hover:text-white transition-colors">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/shop/sports" className="text-gray-300 hover:text-white transition-colors">
                  Sports
                </Link>
              </li> 
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neptune">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for exclusive deals and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-neptune border border-white/20"
              />
              <button className="px-4 py-2 bg-neptune hover:bg-gulfStream text-white rounded-r-lg transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 BazarXpress. All rights reserved. |
            <Link href="/privacy-policy" className="hover:text-neptune transition-colors ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms-conditions" className="hover:text-neptune transition-colors ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
