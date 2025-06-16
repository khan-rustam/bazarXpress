import Layout from "../../components/Layout"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "1",
    title: "10 Must-Have Gadgets for 2024",
    excerpt:
      "Discover the latest technology trends and gadgets that will revolutionize your daily life. From smart home devices to portable tech, we cover everything you need to know.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    date: "March 15, 2024",
    author: "Tech Team",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Sustainable Fashion: A Complete Guide",
    excerpt:
      "Learn how to build a sustainable wardrobe without compromising on style. Discover eco-friendly brands and tips for conscious shopping.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    date: "March 12, 2024",
    author: "Fashion Editor",
    category: "Fashion",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Home Organization Tips That Actually Work",
    excerpt:
      "Transform your living space with these practical organization strategies. From decluttering to storage solutions, make your home more functional.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    date: "March 10, 2024",
    author: "Home & Living",
    category: "Home & Kitchen",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "The Ultimate Fitness Equipment Buying Guide",
    excerpt:
      "Whether you're setting up a home gym or upgrading your current setup, this guide will help you choose the right equipment for your fitness goals.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    date: "March 8, 2024",
    author: "Fitness Expert",
    category: "Sports & Fitness",
    readTime: "8 min read",
  },
  {
    id: "5",
    title: "Kitchen Essentials for Every Home Cook",
    excerpt:
      "Discover the must-have kitchen tools and appliances that will elevate your cooking game. From basics to advanced equipment.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    date: "March 5, 2024",
    author: "Culinary Team",
    category: "Home & Kitchen",
    readTime: "4 min read",
  },
  {
    id: "6",
    title: "Smart Shopping: How to Find the Best Deals",
    excerpt:
      "Learn insider tips and tricks for finding the best deals online. From timing your purchases to using comparison tools effectively.",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
    date: "March 3, 2024",
    author: "Shopping Expert",
    category: "Shopping Tips",
    readTime: "5 min read",
  },
]

const categories = ["All", "Technology", "Fashion", "Home & Kitchen", "Sports & Fitness", "Shopping Tips"]

export default function Blog() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-spectra transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit"
          alt="Blog Hero Background"
          fill
          className="object-cover object-center z-0"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 max-w-3xl mx-auto px-4 text-center flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl">BazarXpress Blog</h1>
          <div className="mx-auto mb-8 w-24 h-1 bg-gradient-to-r from-spectra via-neptune to-elm rounded-full animate-pulse" />
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our experts across various categories.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-spectra text-spectra hover:bg-spectra hover:text-white transition-colors font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-spectra focus:ring-offset-2"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-square">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-spectra text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-neptune text-white px-2 py-1 rounded text-xs">{blogPosts[0].category}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-codGray mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-6 line-clamp-3">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{blogPosts[0].readTime}</span>
                  <Link
                    href={`/blog/${blogPosts[0].id}`}
                    className="inline-flex items-center text-spectra hover:text-elm font-semibold space-x-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.slice(1).map((post, i) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-fade-in delay-100"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-neptune text-white px-2 py-1 rounded text-xs font-medium shadow">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-codGray mb-3 group-hover:text-spectra transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-spectra hover:text-elm font-semibold space-x-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-spectra hover:bg-elm text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Load More Posts
          </button>
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="py-16 bg-martinique">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Post</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter and get the latest blog posts delivered to your inbox.
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
    </Layout>
  )
}
