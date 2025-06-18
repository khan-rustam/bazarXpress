"use client"

import { useState } from "react"
import { Star, ThumbsUp, CheckCircle } from "lucide-react"
import type { Review } from "../lib/products"

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export default function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest")

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      default:
        return 0
    }
  })

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      reviews.length > 0 ? (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100 : 0,
  }))

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5"
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? "text-brand-primary fill-current" : "text-border-primary"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-surface-primary rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-bold text-text-primary mb-6">Customer Reviews</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-text-primary mb-2">{averageRating.toFixed(1)}</div>
            {renderStars(Math.round(averageRating), "md")}
            <p className="text-text-secondary mt-2">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{rating}★</span>
                <div className="flex-1 bg-border-primary rounded-full h-2">
                  <div
                    className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-surface-primary rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold text-text-primary">Reviews ({reviews.length})</h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        {sortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-tertiary">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border-b border-border-primary pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-text-inverse font-semibold text-sm">{review.userName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-text-primary">{review.userName}</span>
                        {review.verified && (
                          <div className="flex items-center space-x-1 text-brand-success">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs">Verified Purchase</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-text-tertiary">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-13">
                  <h5 className="font-semibold text-text-primary mb-2">{review.title}</h5>
                  <p className="text-text-secondary mb-3">{review.comment}</p>

                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-text-tertiary hover:text-brand-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <button className="bg-brand-primary hover:bg-brand-primary-dark text-text-inverse font-semibold py-3 px-6 rounded-lg transition-colors">
          Write a Review
        </button>
      </div>
    </div>
  )
}
