export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: 'La Marea B&B',
    url: 'https://lamareatigre.com.ar',
    logo: 'https://lamareatigre.com.ar/logo.png',
    image: 'https://lamareatigre.com.ar/og-image.jpg',
    description: 'Bed & Breakfast en Tigre, Buenos Aires. Pileta exterior, jardín, desayuno incluido. Cerca de la estación de tren y Río Luján.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Santiago de Liniers 573',
      addressLocality: 'Tigre',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.426,
      longitude: -58.579,
    },
    telephone: '+54-11-2640-4169',
    priceRange: '$$',
    currenciesAccepted: 'ARS',
    paymentAccepted: 'Cash',
    // Rating removed - no longer on Booking.com
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Pileta exterior' },
      { '@type': 'LocationFeatureSpecification', name: 'Jardín' },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi gratuito' },
      { '@type': 'LocationFeatureSpecification', name: 'Desayuno incluido' },
      { '@type': 'LocationFeatureSpecification', name: 'Parrilla/BBQ' },
      { '@type': 'LocationFeatureSpecification', name: 'Aire acondicionado' },
      { '@type': 'LocationFeatureSpecification', name: 'Ropa blanca' },
      { '@type': 'LocationFeatureSpecification', name: 'Cocina compartida' },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
