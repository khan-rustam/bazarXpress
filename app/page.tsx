"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import QuickViewModal from "../components/QuickViewModal"
import { ChevronRight, ArrowRight, ChevronDown } from "lucide-react"
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

// Mock data for Trending Products (can be different from featured products)
const trendingProducts = [
  { id: "5", name: "Portable Bluetooth Speaker", price: 49.99, image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Electronics", rating: 4, isNew: true },
  { id: "6", name: "Noise-Cancelling Headphones", price: 129.99, image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Electronics", rating: 5 },
  { id: "7", name: "Ergonomic Office Chair", price: 249.99, image: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Home & Office", rating: 4, isSale: true },
  { id: "8", name: "Smart Home Security Camera", price: 89.99, image: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Smart Home", rating: 3 },
];

// Mock data for New Arrivals (can be different from featured products)
const newArrivals = [
  { id: "9", name: "Portable Mini Projector", price: 189.99, image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Electronics", rating: 5, isNew: true },
  { id: "10", name: "Aromatherapy Diffuser", price: 34.99, image: "https://images.unsplash.com/photo-1660853142045-a74bc7d4e07b?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Home & Wellness", rating: 4, isNew: true },
  { id: "11", name: "Wireless Charging Pad", price: 29.99, image: "https://images.unsplash.com/photo-1586855471379-27e05b3006ae?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Electronics", rating: 4, isSale: true, isNew: true },
  { id: "12", name: "Travel Backpack with USB Port", price: 69.99, image: "https://images.unsplash.com/photo-1592289924034-c423dd2f1c5d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Travel", rating: 5, isNew: true },
];

// Mock data for Customer Reviews
const customerReviews = [
  {
    id: 1, name: "Alice B.", rating: 5, comment: "Absolutely love my new headphones! The sound quality is amazing and they're so comfortable.", product: "Wireless Bluetooth Headphones", verified: true
  },
  {
    id: 2, name: "Bob T.", rating: 4, comment: "The Smart Fitness Watch is great. Battery life is impressive, just wish it had more color options.", product: "Smart Fitness Watch", verified: true
  },
  {
    id: 3, name: "Charlie K.", rating: 5, comment: "The coffee maker makes perfect coffee every time. Fast shipping too!", product: "Premium Coffee Maker", verified: false
  },
  {
    id: 4, name: "Diana L.", rating: 5, comment: "Fantastic t-shirt, so soft and eco-friendly. Will definitely buy more!", product: "Organic Cotton T-Shirt", verified: true
  },
  {
    id: 5, name: "Eve R.", rating: 4, comment: "Speaker sounds great for its size. Good value for money.", product: "Portable Bluetooth Speaker", verified: true
  },
];

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
    buttonColor: "bg-brand-success hover:bg-brand-success-dark text-text-inverse",
    highlight: "Get up to 30% off on your first $150 purchase",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    headline: "Fresh Fruits & Veggies Delivered",
    subheadline: "Farm to Table Freshness",
    description: "Order now and enjoy the best quality produce delivered to your door.",
    button: { text: "Browse Produce", href: "/shop" },
    buttonColor: "bg-brand-primary hover:bg-brand-primary-dark text-text-inverse",
    highlight: "Farm to Table Freshness",
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    headline: "Weekly Essentials at Great Prices",
    subheadline: "Save More Every Week",
    description: "Stock up on your weekly essentials and save big with our exclusive offers.",
    button: { text: "See Offers", href: "/shop" },
    buttonColor: "bg-brand-secondary hover:bg-brand-secondary-dark text-text-inverse",
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
      style={{ background: notice.bgColor || 'bg-brand-notice-bg', color: notice.textColor || 'text-brand-notice-text' }}
    >
      <div className="flex flex-col md:flex-row md:items-center w-full justify-center gap-2 md:gap-4">
        <div className="text-left w-full">
          <div className="text-base whitespace-pre-line">{notice.message}</div>
        </div>
      </div>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-inverse/80 hover:text-text-inverse text-lg"
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
        <section className="relative min-h-screen w-full overflow-hidden -mt-28">
          <Carousel opts={{ loop: true }} autoplay interval={4000}>
            <CarouselContent>
              {heroSlides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative min-h-screen w-full flex items-center justify-start">
                    <Image
                      src={slide.image}
                      alt={slide.headline}
                      fill
                      className="object-cover w-full h-full"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 max-w-2xl ml-8 md:ml-20 text-left text-text-inverse animate-fade-in">
                      {slide.highlight && (
                        <div className="mb-4 text-brand-success font-semibold text-lg md:text-xl">{slide.highlight}</div>
                      )}
                      <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.headline}</h1>
                      <p className="text-lg md:text-xl mb-6 text-text-inverse/80 max-w-lg">{slide.description}</p>
                      <Link
                        href={slide.button.href}
                        className={`inline-flex items-center ${slide.buttonColor} font-semibold py-3 px-6 rounded-lg transition-all duration-200 space-x-2`}
                      >
                        <span>{slide.button.text}</span>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Scroll Down Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-3 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full transition-colors duration-300 animate-bounce shadow-lg"
              aria-label="Scroll down"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>
        </section>

        {/* Category Section */}
        <section id="categories-section" className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-4">Shop by Category</h2>
            <p className="text-text-secondary text-center max-w-xl mx-auto">
              Explore our diverse range of products across various categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {categories.map((category, index) => (
              <Link
                href={category.href}
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold z-10 drop-shadow-md">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">Featured Products</h2>
                <p className="text-text-secondary">Discover our handpicked selection of top-quality products.</p>
              </div>
              <Link href="/shop" className="flex items-center text-brand-primary hover:text-brand-primary-dark font-semibold space-x-1">
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

        {/* Trending Products */}
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">Trending Products</h2>
                <p className="text-text-secondary">Check out what's popular right now.</p>
              </div>
              <Link href="/shop?sort=trending" className="flex items-center text-brand-primary hover:text-brand-primary-dark font-semibold space-x-1">
                <span>View All</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">New Arrivals</h2>
                <p className="text-text-secondary">Be the first to discover our latest additions.</p>
              </div>
              <Link href="/shop?sort=new-arrivals" className="flex items-center text-brand-primary hover:text-brand-primary-dark font-semibold space-x-1">
                <span>View All</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews Carousel */}
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-12">What Our Customers Say</h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {customerReviews.filter(review => review.verified).map((review) => (
                  <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-6 bg-surface-primary rounded-lg shadow-md flex flex-col items-center text-center h-full">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-brand-warning' : 'text-text-tertiary'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-text-primary italic mb-4 flex-grow">"{review.comment}"</p>
                      <p className="font-semibold text-text-primary">- {review.name}</p>
                      {review.product && <p className="text-sm text-text-secondary">Product: {review.product}</p>}
                      {review.verified && (
                        <span className="mt-2 text-xs font-medium text-brand-success bg-brand-success/10 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-16 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-inverse mb-4">Summer Sale - Up to 50% Off!</h2>
            <p className="text-xl text-text-inverse/90 mb-8">
              Don't miss out on our biggest sale of the year. Limited time offer!
            </p>
            <Link
              href="/shop"
              className="bg-surface-primary text-brand-primary font-semibold py-4 px-8 rounded-lg hover:bg-surface-secondary transition-colors space-x-2 inline-flex items-center"
            >
              <span>Shop Sale Items</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Blog Highlights */}
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Latest from Our Blog</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Stay updated with the latest trends, tips, and insights from our experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-surface-primary rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                    <p className="text-sm text-text-tertiary mb-2">{post.date}</p>
                    <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
      </Layout>
    </>
  )
}
