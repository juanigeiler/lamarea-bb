export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: 'La Marea B&B - Hotel en Tigre',
    alternateName: ['La Marea Hotel', 'La Marea Bed and Breakfast'],
    url: 'https://lamareatigre.com.ar',
    logo: 'https://lamareatigre.com.ar/logo.png',
    image: 'https://lamareatigre.com.ar/la-marea.jpg',
    description: 'Hotel en Tigre, Buenos Aires con pileta, jardín amplio, estacionamiento y desayuno casero incluido. Atención familiar personalizada. Ubicado a 5 minutos caminando de la estación de Tigre y cerca del Río Luján. Hotel ideal para turismo en Tigre.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Santiago de Liniers 573',
      addressLocality: 'Tigre',
      addressRegion: 'Buenos Aires',
      postalCode: '1648',
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
    paymentAccepted: 'Cash, Bank Transfer',
    checkinTime: '14:00',
    checkoutTime: '10:00',
    petsAllowed: false,
    smokingAllowed: false,
    // Rating removed - no longer on Booking.com
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Pileta exterior climatizada' },
      { '@type': 'LocationFeatureSpecification', name: 'Jardín amplio' },
      { '@type': 'LocationFeatureSpecification', name: 'Estacionamiento privado gratuito' },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi gratuito de alta velocidad' },
      { '@type': 'LocationFeatureSpecification', name: 'Desayuno casero incluido' },
      { '@type': 'LocationFeatureSpecification', name: 'Parrilla/BBQ para uso de huéspedes' },
      { '@type': 'LocationFeatureSpecification', name: 'Aire acondicionado' },
      { '@type': 'LocationFeatureSpecification', name: 'Ropa de cama y toallas incluidas' },
      { '@type': 'LocationFeatureSpecification', name: 'Cocina compartida equipada' },
      { '@type': 'LocationFeatureSpecification', name: 'Áreas comunes confortables' },
      { '@type': 'LocationFeatureSpecification', name: 'Atención personalizada por los dueños' },
    ],
    additionalType: ['https://schema.org/Hotel', 'https://schema.org/LodgingBusiness'],
    knowsAbout: ['Hotel Tigre', 'Turismo en Tigre', 'Delta del Paraná', 'Río Luján', 'Estación Tigre', 'Hospedaje Tigre'],
    areaServed: {
      '@type': 'City',
      name: 'Tigre',
      containedIn: {
        '@type': 'State',
        name: 'Buenos Aires',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
