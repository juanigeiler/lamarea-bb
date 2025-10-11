import { NextResponse } from 'next/server'

// Google Place ID para "La Marea B&B" en Tigre
const PLACE_ID = 'ChIJha3u5silvJURbgeAOi4C5sA' // La Marea B&B, Av. Liniers 573, Tigre

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] Google Rating API called`)

  if (!apiKey) {
    console.error(`[${timestamp}] GOOGLE_PLACES_API_KEY not found in environment`)
    return NextResponse.json(
      {
        error: 'Google Places API key not configured',
        rating: 4.9,
        reviewCount: 0,
        debug: {
          hasApiKey: false,
          timestamp
        }
      },
      { status: 500 }
    )
  }

  console.log(`[${timestamp}] API Key found (length: ${apiKey.length})`)

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`

    console.log(`[${timestamp}] Fetching Google Places API...`)
    const response = await fetch(url, {
      // Cache por 1 hora (3600 segundos)
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      console.error(`[${timestamp}] Google API HTTP error: ${response.status}`)
      return NextResponse.json({
        rating: 4.9,
        reviewCount: 0,
        debug: {
          httpStatus: response.status,
          httpError: true,
          timestamp
        }
      })
    }

    const data = await response.json()

    // Log detallado para debug
    console.log(`[${timestamp}] Google API Response:`, JSON.stringify({
      status: data.status,
      hasResult: !!data.result,
      rating: data.result?.rating,
      reviewCount: data.result?.user_ratings_total,
      errorMessage: data.error_message
    }))

    if (data.status === 'OK' && data.result) {
      const result = {
        rating: data.result.rating || 4.9,
        reviewCount: data.result.user_ratings_total || 0,
        success: true,
        timestamp
      }
      console.log(`[${timestamp}] Success:`, JSON.stringify(result))
      return NextResponse.json(result)
    }

    // Fallback con info del error
    console.warn(`[${timestamp}] Google API error:`, data.status, data.error_message)
    return NextResponse.json({
      rating: 4.9,
      reviewCount: 0,
      success: false,
      debug: {
        status: data.status,
        error: data.error_message,
        timestamp
      }
    })
  } catch (error) {
    console.error(`[${timestamp}] Exception:`, error)
    return NextResponse.json({
      rating: 4.9,
      reviewCount: 0,
      success: false,
      debug: {
        error: String(error),
        type: 'exception',
        timestamp
      }
    })
  }
}
