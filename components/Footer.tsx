import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand-primary-dark via-brand-primary to-brand-secondary text-text-inverse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter CTA Section */}
        {/* <div className="max-w-4xl mx-auto text-center py-10">
          <h2 className="text-3xl font-bold text-text-inverse mb-4">Stay Connected with BazarXpress</h2>
          <p className="text-xl text-text-inverse/70 mb-8">
            Get exclusive deals, new arrivals, and special offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none bg-surface-primary text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-brand-accent border border-border-primary"
            />
            <button className="bg-brand-primary hover:bg-brand-primary-dark text-text-inverse font-semibold py-3 px-6 rounded-lg sm:rounded-l-none sm:rounded-r-lg mt-2 sm:mt-0 transition-colors shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div> */}

        {/* Separator between newsletter and footer links */}
        {/* <div className="mt-12 mb-8 pt-8 border-t border-text-inverse/20" /> */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-text-inverse/80">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-inverse/80 hover:text-brand-secondary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-text-inverse/20">
          <p className="text-center text-text-inverse/60">
            © {new Date().getFullYear()} BazarExpress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
