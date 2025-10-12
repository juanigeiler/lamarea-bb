'use client'

import { useEffect, useState } from 'react'

export default function RatingBadge() {
  const [rating, setRating] = useState<number | null>(null)
  const [reviewCount, setReviewCount] = useState<number>(0)

  useEffect(() => {
    fetch('/api/google-rating')
      .then(res => res.json())
      .then(data => {
        setRating(data.rating)
        setReviewCount(data.reviewCount)
      })
      .catch(() => {
        // Silently fail
      })
  }, [])

  if (!rating) return null

  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-500 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xl font-bold text-amber-900">{rating.toFixed(1)}</span>
      {reviewCount > 0 && (
        <span className="text-base text-amber-700/70">({reviewCount} opiniones)</span>
      )}
    </div>
  )
}
