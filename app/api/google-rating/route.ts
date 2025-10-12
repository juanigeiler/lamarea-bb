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
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`

    const response = await fetch(url, {
      // Cache por 1 hora (3600 segundos)
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      return NextResponse.json({
        rating: 4.9,
        reviewCount: 0
      })
    }

    const data = await response.json()

    if (data.status === 'OK' && data.result) {
      return NextResponse.json({
        rating: data.result.rating || 4.9,
        reviewCount: data.result.user_ratings_total || 0
      })
    }

    // Fallback si hay error
    return NextResponse.json({
      rating: 4.9,
      reviewCount: 0
    })
  } catch (error) {
    return NextResponse.json({
      rating: 4.9,
      reviewCount: 0
    })
  }
}
