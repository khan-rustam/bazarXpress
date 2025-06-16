"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import QuickViewModal from "../components/QuickViewModal"
import { ChevronRight, ArrowRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useRouter } from "next/navigation"

// Mock data
const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1505739718967-6df30ff369c7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 4,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://plus.unsplash.com/premium_photo-1712761998611-c59db7dff27e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 5,
    isNew: true,
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1652146909306-3dc16342ed4f?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Kitchen",
    rating: 4,
    isSale: true,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1713881587420-113c1c43e28a?q=80&w=2335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fashion",
    rating: 4,
  },
]

const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1723961617032-ef69c454cb31?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/shop/electronics",
  },
  {
    name: "Fashion",
    image: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/shop/fashion",
  },
  {
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1577176434922-803273eba97a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/shop/home",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1650762342620-97406c54016c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/shop/sports",
  },
]

const blogPosts = [
  {
    id: "1",
    title: "10 Must-Have Gadgets for 2024",
    excerpt: "Discover the latest technology trends and gadgets that will revolutionize your daily life.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    date: "March 15, 2024",
  },
  {
    id: "2",
    title: "Sustainable Fashion: A Complete Guide",
    excerpt: "Learn how to build a sustainable wardrobe without compromising on style.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    date: "March 12, 2024",
  },
  {
    id: "3",
    title: "Home Organization Tips That Actually Work",
    excerpt: "Transform your living space with these practical organization strategies.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
    date: "March 10, 2024",
  },
]

// Hero carousel slides with images and content
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    headline: "Don't miss our amazing grocery deals",
    subheadline: "Get up to 30% off on your first $150 purchase",
    description: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    button: { text: "Shop Now", href: "/shop" },
    buttonColor: "bg-lime-500 hover:bg-lime-600 text-white",
    highlight: "Get up to 30% off on your first $150 purchase",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    headline: "Fresh Fruits & Veggies Delivered",
    subheadline: "Farm to Table Freshness",
    description: "Order now and enjoy the best quality produce delivered to your door.",
    button: { text: "Browse Produce", href: "/shop" },
    buttonColor: "bg-elm hover:bg-spectra text-white",
    highlight: "Farm to Table Freshness",
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    headline: "Weekly Essentials at Great Prices",
    subheadline: "Save More Every Week",
    description: "Stock up on your weekly essentials and save big with our exclusive offers.",
    button: { text: "See Offers", href: "/shop" },
    buttonColor: "bg-spectra hover:bg-elm text-white",
    highlight: "Save More Every Week",
  },
]

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const router = useRouter()
  const [notice, setNotice] = useState<any>(null)
  const [showNotice, setShowNotice] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem("siteNotices")
      if (raw) {
        try {
          const notices = JSON.parse(raw)
          const today = new Date()
          const active = notices.find((n: any) => {
            if (!n.startDate || !n.endDate) return false
            const start = new Date(n.startDate)
            const end = new Date(n.endDate)
            return start <= today && today <= end
          })
          setNotice(active)
        } catch {
          setNotice(null)
        }
      }
    }
  }, [])

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }

  const NoticeBar = notice && showNotice && notice.message ? (
    <div
      className="w-full text-center py-3 px-4 flex items-center justify-center relative z-50"
      style={{ background: notice.bgColor || '#A16A8A', color: notice.textColor || '#fff' }}
    >
      <div className="flex flex-col md:flex-row md:items-center w-full justify-center gap-2 md:gap-4">
        <div className="text-left w-full">
          <div className="text-base whitespace-pre-line">{notice.message}</div>
        </div>
      </div>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-lg"
        onClick={() => setShowNotice(false)}
        aria-label="Dismiss notice"
      >
        &times;
      </button>
    </div>
  ) : null

  return (
    <>
      {NoticeBar}
      <Layout>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
          <Carousel opts={{ loop: true }} autoplay interval={4000}>
            <CarouselContent>
              {heroSlides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-start">
                    <Image
                      src={slide.image}
                      alt={slide.headline}
                      fill
                      className="object-cover w-full h-full"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 max-w-2xl ml-8 md:ml-20 text-left text-white animate-fade-in">
                      {slide.highlight && (
                        <div className="mb-4 text-lime-300 font-semibold text-lg md:text-xl">{slide.highlight}</div>
                      )}
                      <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.headline}</h1>
                      <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-lg">{slide.description}</p>
                      <Link
                        href={slide.button.href}
                        className={`${slide.buttonColor} font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg inline-flex items-center space-x-2 text-lg`}
                      >
                        <span>{slide.button.text}</span>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-codGray mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of categories and find exactly what you're looking for.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/shop?category=${encodeURIComponent(category.name)}`)}
                  onKeyDown={e => { if (e.key === 'Enter') router.push(`/shop?category=${encodeURIComponent(category.name)}`) }}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer focus:ring-2 focus:ring-spectra outline-none"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-codGray group-hover:text-spectra transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-codGray mb-4">Featured Products</h2>
                <p className="text-gray-600">Discover our handpicked selection of top-quality products.</p>
              </div>
              <Link href="/shop" className="flex items-center text-spectra hover:text-elm font-semibold space-x-1">
                <span>View All</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-16 bg-gradient-to-r from-mountbattenPink via-gulfStream to-neptune">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Summer Sale - Up to 50% Off!</h2>
            <p className="text-xl text-white mb-8 opacity-90">
              Don't miss out on our biggest sale of the year. Limited time offer!
            </p>
            <Link
              href="/shop"
              className="bg-white text-spectra font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors space-x-2 inline-flex items-center"
            >
              <span>Shop Sale Items</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Blog Highlights */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-codGray mb-4">Latest from Our Blog</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest trends, tips, and insights from our experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h3 className="font-semibold text-codGray group-hover:text-spectra transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-martinique via-codGray to-mobster">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Connected with BazarXpress</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get exclusive deals, new arrivals, and special offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg focus:outline-none focus:ring-2 focus:ring-spectra"
              />
              <button className="bg-spectra hover:bg-elm text-white font-semibold py-3 px-6 rounded-r-lg sm:rounded-l-none rounded-l-lg mt-2 sm:mt-0 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
      </Layout>
    </>
  )
}
