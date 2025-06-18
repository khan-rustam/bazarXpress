"use client"

import Layout from "../../components/Layout"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import React, { useState } from "react"

const blogPosts = [
  {
    id: "1",
    title: "10 Must-Have Gadgets for 2024",
    excerpt:
      "Discover the latest technology trends and gadgets that will revolutionize your daily life. From smart home devices to portable tech, we cover everything you need to know.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    date: "March 15, 2024",
    category: "Technology",
  },
  {
    id: "2",
    title: "Sustainable Fashion: A Complete Guide",
    excerpt:
      "Learn how to build a sustainable wardrobe without compromising on style. Discover eco-friendly brands and tips for conscious shopping.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    date: "March 12, 2024",
    category: "Fashion",
  },
  {
    id: "3",
    title: "Home Organization Tips That Actually Work",
    excerpt:
      "Transform your living space with these practical organization strategies. From decluttering to storage solutions, make your home more functional.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    date: "March 10, 2024",
    category: "Home & Kitchen",
  },
  {
    id: "4",
    title: "The Ultimate Fitness Equipment Buying Guide",
    excerpt:
      "Whether you're setting up a home gym or upgrading your current setup, this guide will help you choose the right equipment for your fitness goals.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    date: "March 8, 2024",
    category: "Sports & Fitness",
  },
  {
    id: "5",
    title: "Kitchen Essentials for Every Home Cook",
    excerpt:
      "Discover the must-have kitchen tools and appliances that will elevate your cooking game. From basics to advanced equipment.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    date: "March 5, 2024",
    category: "Home & Kitchen",
  },
  {
    id: "6",
    title: "Smart Shopping: How to Find the Best Deals",
    excerpt:
      "Learn insider tips and tricks for finding the best deals online. From timing your purchases to using comparison tools effectively.",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
    date: "March 3, 2024",
    category: "Shopping Tips",
  },
]

const categories = ["All", "Technology", "Fashion", "Home & Kitchen", "Sports & Fitness", "Shopping Tips"]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const filteredBlogPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface-secondary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-text-secondary hover:text-brand-primary transition-colors">Home</Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary font-medium">Blog</span>
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
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-inverse mb-6 drop-shadow-xl">BazarXpress Blog</h1>
          <div className="mx-auto mb-8 w-24 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full animate-pulse" />
          <p className="text-xl text-text-inverse/90 max-w-2xl mx-auto">
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
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full border ${selectedCategory === category ? 'bg-brand-primary text-text-inverse border-brand-primary' : 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-text-inverse'} transition-colors font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredBlogPosts.length > 0 && (
          <div className="mb-16">
            <div className="bg-surface-primary rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-square">
                  <Image
                    src={filteredBlogPosts[0].image || "/placeholder.svg"}
                    alt={filteredBlogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-primary text-text-inverse px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                    <span className="bg-brand-primary text-text-inverse px-2 py-1 rounded text-xs">{filteredBlogPosts[0].category}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{filteredBlogPosts[0].date}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{filteredBlogPosts[0].title}</h2>
                  <p className="text-text-secondary mb-6 line-clamp-3">{filteredBlogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/blog/${filteredBlogPosts[0].id}`}
                      className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold space-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogPosts.map((post, i) => (
            <article
              key={post.id}
              className="bg-surface-primary rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-fade-in delay-100"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-primary text-text-inverse px-2 py-1 rounded text-xs font-medium shadow">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-text-secondary mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-end">
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold space-x-1"
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
          <button className="bg-brand-primary hover:bg-brand-secondary text-text-inverse font-semibold py-3 px-8 rounded-lg transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </Layout>
  )
}
