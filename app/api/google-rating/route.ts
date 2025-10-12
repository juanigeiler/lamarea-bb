import { NextResponse } from 'next/server'

// Google Place ID para "La Marea B&B" en Tigre
const PLACE_ID = 'ChIJha3u5silvJURbgeAOi4C5sA' // La Marea B&B, Av. Liniers 573, Tigre

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { rating: 4.9, reviewCount: 0 },
      { status: 500 }
    )
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&language=es&key=${apiKey}`

    const response = await fetch(url, {
      // Cache por 4 horas (14400 segundos)
      next: { revalidate: 14400 }
    })

    if (!response.ok) {
      return NextResponse.json({
        rating: 4.9,
        reviewCount: 0,
        reviews: []
      })
    }

    const data = await response.json()

    if (data.status === 'OK' && data.result) {
      // Tomar máximo 3 reviews
      const reviews = (data.result.reviews || []).slice(0, 3).map((review: {
        author_name: string
        rating: number
        text: string
        relative_time_description: string
        profile_photo_url?: string
      }) => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        relative_time_description: review.relative_time_description,
        profile_photo_url: review.profile_photo_url
      }))

      return NextResponse.json({
        rating: data.result.rating || 4.9,
        reviewCount: data.result.user_ratings_total || 0,
        reviews
      })
    }

    // Fallback si hay error
    return NextResponse.json({
      rating: 4.9,
      reviewCount: 0,
      reviews: []
    })
  } catch {
    return NextResponse.json({
      rating: 4.9,
      reviewCount: 0,
      reviews: []
    })
  }
}
