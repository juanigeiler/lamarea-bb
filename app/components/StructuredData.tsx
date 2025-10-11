export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: 'La Marea B&B',
    description: 'Bed & Breakfast en Tigre, Buenos Aires. Pileta exterior, jardín, desayuno incluido. Cerca de la estación de tren y Río Luján.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Liniers 573',
      addressLocality: 'Tigre',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.426,
      longitude: -58.579,
    },
    telephone: '+54-11-XXXX-XXXX', // TODO: Agregar teléfono real
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
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
