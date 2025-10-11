import { NextResponse } from 'next/server'

// Endpoint temporal para verificar variables de entorno
export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.GOOGLE_PLACES_API_KEY,
    keyLength: process.env.GOOGLE_PLACES_API_KEY?.length || 0,
    keyPreview: process.env.GOOGLE_PLACES_API_KEY?.substring(0, 10) + '...',
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('GOOGLE'))
  })
}
