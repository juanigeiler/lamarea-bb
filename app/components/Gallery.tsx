'use client'

import { useState, useEffect, useRef } from 'react'
import { CldImage } from 'next-cloudinary'
import ImageLightbox from './ImageLightbox'

type GalleryCategory = 'todas' | 'habitaciones' | 'exterior' | 'areas-comunes' | 'desayuno'

interface GalleryImage {
  publicId: string  // Cloudinary public ID (ej: "lamarea/exterior/jardin-pileta")
  alt: string
  category: GalleryCategory
}

// Imágenes reales del hotel - Cloudinary
// Orden predeterminado: Las mejores fotos primero para causar buena impresión
const PLACEHOLDER_IMAGES: GalleryImage[] = [
  // Las primeras 8 fotos (para vista inicial "Todas"): 2 habitaciones + 3 exterior + 1 áreas comunes + 2 desayuno
  {
    publicId: 'camas-velador-tranquilidad',
    alt: 'Habitación tranquila con camas individuales y velador en La Marea hotel Tigre - Hotel con habitaciones para dos personas',
    category: 'habitaciones'
  },
  {
    publicId: 'cama-matrimonial-comoda',
    alt: 'Cama matrimonial cómoda en habitación del hotel La Marea Tigre - Habitación espaciosa con ropa de cama incluida',
    category: 'habitaciones'
  },
  {
    publicId: 'jardin-pileta',
    alt: 'Pileta exterior climatizada con jardín amplio en La Marea B&B, hotel en Tigre Buenos Aires con piscina',
    category: 'exterior'
  },
  {
    publicId: 'jardin-hamacas-paraguayas',
    alt: 'Hamacas paraguayas para relajarse en el jardín de La Marea hotel Tigre Buenos Aires - Hotel con espacios de relax',
    category: 'exterior'
  },
  {
    publicId: 'pileta-plantas-verde',
    alt: 'Pileta rodeada de plantas y vegetación verde en La Marea hotel Tigre - Hotel con pileta en entorno natural',
    category: 'exterior'
  },
  {
    publicId: 'living-sillon-tranquilidad',
    alt: 'Living tranquilo con sillón cómodo en La Marea hotel Tigre - Hotel con áreas de descanso confortables',
    category: 'areas-comunes'
  },
  {
    publicId: 'sillon-lectura-relax',
    alt: 'Sillón de lectura y relax en áreas comunes de La Marea hotel Tigre Buenos Aires - Hotel acogedor con espacios tranquilos',
    category: 'areas-comunes'
  },
  {
    publicId: 'desayuno-bandeja',
    alt: 'Bandeja de desayuno completo con medialunas y café en La Marea hotel Tigre - Desayuno servido en habitación',
    category: 'desayuno'
  },

  // Resto de habitaciones
  {
    publicId: 'habitacion-cama-baño-privado',
    alt: 'Habitación con cama matrimonial y baño privado en La Marea hotel Tigre - Hotel con habitaciones confortables en Buenos Aires',
    category: 'habitaciones'
  },
  {
    publicId: 'baño-perfume-limpieza',
    alt: 'Baño privado limpio con amenities en La Marea hotel Tigre Buenos Aires - Habitaciones con baño completo',
    category: 'habitaciones'
  },
  {
    publicId: 'cama-individual',
    alt: 'Cama individual cómoda en habitación de La Marea hotel Tigre - Hotel con habitaciones individuales en Buenos Aires',
    category: 'habitaciones'
  },
  {
    publicId: 'cama-individual-2',
    alt: 'Habitación individual con cama confortable en La Marea hotel Tigre - Hotel económico cerca de la estación',
    category: 'habitaciones'
  },
  {
    publicId: 'cama-matrimonial-comodidad',
    alt: 'Cama matrimonial de lujo y comodidad en La Marea hotel Tigre Buenos Aires - Habitación matrimonial espaciosa',
    category: 'habitaciones'
  },
  {
    publicId: 'cama-matrimonial-habitacion-espaciosa',
    alt: 'Habitación espaciosa con cama matrimonial king size en La Marea hotel Tigre - Hotel boutique con habitaciones amplias',
    category: 'habitaciones'
  },
  {
    publicId: 'habitacion-cama-baño',
    alt: 'Habitación completa con cama doble y baño en suite en La Marea hotel Tigre Buenos Aires',
    category: 'habitaciones'
  },
  {
    publicId: 'baño-limpieza',
    alt: 'Baño privado impecable con toallas incluidas en La Marea hotel Tigre - Hotel con baños limpios y modernos',
    category: 'habitaciones'
  },
  {
    publicId: 'baño-espacioso',
    alt: 'Baño espacioso y moderno en habitación de La Marea hotel Tigre Buenos Aires - Baño completo con ducha',
    category: 'habitaciones'
  },

  // Resto de imágenes de exterior
  {
    publicId: 'parrilla_cocina_almuerzo',
    alt: 'Parrilla BBQ y quincho para asados en La Marea hotel Tigre - Hotel con parrilla en Buenos Aires',
    category: 'exterior'
  },
  {
    publicId: 'evento_fiesta_jardin',
    alt: 'Jardín amplio para eventos, reuniones y celebraciones en La Marea hotel Tigre Buenos Aires',
    category: 'exterior'
  },
  {
    publicId: 'vinos_eventos_espacio',
    alt: 'Espacio exterior para eventos sociales y cenas al aire libre en La Marea hotel Tigre - Hotel con jardín',
    category: 'exterior'
  },
  {
    publicId: 'plantas_exterior_verde',
    alt: 'Plantas ornamentales y vegetación natural en el jardín de La Marea hotel Tigre - Hotel rodeado de verde',
    category: 'exterior'
  },
  {
    publicId: 'jardin-pierdras-sillas',
    alt: 'Jardín decorado con piedras y sillas de descanso en La Marea hotel Tigre - Espacios exteriores con diseño paisajístico',
    category: 'exterior'
  },
  {
    publicId: 'sillas-pasto-verde',
    alt: 'Sillas en el pasto verde del jardín de La Marea hotel Tigre - Hotel con áreas verdes para descansar',
    category: 'exterior'
  },
  {
    publicId: 'pileta-vino-copas',
    alt: 'Pileta con copas de vino para disfrutar en La Marea hotel Tigre - Hotel con pileta para eventos y celebraciones',
    category: 'exterior'
  },
  {
    publicId: 'verde-pileta-sol',
    alt: 'Pileta rodeada de verde bajo el sol en La Marea hotel Tigre Buenos Aires - Hotel con pileta climatizada al aire libre',
    category: 'exterior'
  },
  {
    publicId: 'copas-vino-pileta',
    alt: 'Copas de vino junto a la pileta en La Marea hotel Tigre - Hotel boutique con ambientes para celebrar',
    category: 'exterior'
  },
  {
    publicId: 'verde-relax',
    alt: 'Espacios verdes para relajarse en La Marea hotel Tigre Buenos Aires - Hotel con jardín tranquilo y natural',
    category: 'exterior'
  },
  {
    publicId: 'casa-noche-tranquilidad',
    alt: 'Casa iluminada de noche en La Marea hotel Tigre - Hotel tranquilo y acogedor en Buenos Aires',
    category: 'exterior'
  },
  {
    publicId: 'casa-relax-comodidad',
    alt: 'Vista de la casa y espacios de relax en La Marea hotel Tigre Buenos Aires - Hotel cómodo y familiar',
    category: 'exterior'
  },
  {
    publicId: 'pileta-mate-relax',
    alt: 'Pileta con mate argentino para relajarse en La Marea hotel Tigre - Hotel con tradición y comodidad argentina',
    category: 'exterior'
  },
  {
    publicId: 'verde-jardin-pileta',
    alt: 'Jardín verde con pileta en La Marea hotel Tigre Buenos Aires - Hotel con amplios espacios verdes y piscina',
    category: 'exterior'
  },
  {
    publicId: 'verde-pileta-reposeras',
    alt: 'Reposeras junto a la pileta rodeada de verde en La Marea hotel Tigre - Hotel con pileta y jardín para descansar',
    category: 'exterior'
  },
  {
    publicId: 'garage_estacionamiento_entrada',
    alt: 'Estacionamiento privado gratuito en La Marea hotel Tigre Buenos Aires - Hotel con cochera gratis',
    category: 'exterior'
  },
  {
    publicId: 'arboles_pileta_plantas',
    alt: 'Árboles nativos y plantas alrededor de la pileta en La Marea hotel Tigre - Hotel boutique con jardín natural',
    category: 'exterior'
  },
  {
    publicId: 'farol-jardin-pileta',
    alt: 'Jardín iluminado con faroles y vista a la pileta de La Marea hotel Tigre Buenos Aires - Ambiente romántico nocturno',
    category: 'exterior'
  },
  {
    publicId: 'espacio-verde-exterior',
    alt: 'Amplios espacios verdes y jardín parquizado en La Marea hotel Tigre - Hotel con parque natural',
    category: 'exterior'
  },
  {
    publicId: 'macetas-exterior_fhum5c',
    alt: 'Macetas decorativas con plantas en el jardín de La Marea hotel Tigre - Decoración natural del hotel',
    category: 'exterior'
  },
  {
    publicId: 'planta_pasto_verde',
    alt: 'Césped natural y plantas verdes en el jardín de La Marea hotel Tigre Buenos Aires - Espacios verdes amplios',
    category: 'exterior'
  },

  // Resto de áreas comunes interiores
  {
    publicId: 'living_sillon',
    alt: 'Sala de estar cómoda con sillones en La Marea hotel Tigre - Áreas comunes compartidas del hotel',
    category: 'areas-comunes'
  },
  {
    publicId: 'cuadro_living',
    alt: 'Decoración interior cálida y acogedora del living de La Marea hotel Tigre Buenos Aires',
    category: 'areas-comunes'
  },
  {
    publicId: 'velador-cuadros-living',
    alt: 'Living comedor decorado y acogedor de La Marea hotel en Tigre Buenos Aires - Áreas comunes confortables',
    category: 'areas-comunes'
  },
  {
    publicId: 'pasillo-maleta-jarron',
    alt: 'Pasillo decorado con jarrón en La Marea hotel Tigre - Hotel con decoración cálida y familiar',
    category: 'areas-comunes'
  },
  {
    publicId: 'escaleras-areas-comunes',
    alt: 'Escaleras y acceso a áreas comunes en La Marea hotel Tigre Buenos Aires - Hotel con espacios amplios',
    category: 'areas-comunes'
  },
  {
    publicId: 'lampara-living',
    alt: 'Lámpara decorativa en el living de La Marea hotel Tigre - Hotel con iluminación cálida y ambiente acogedor',
    category: 'areas-comunes'
  },
  {
    publicId: 'sillon-living-alfombra',
    alt: 'Sillón y alfombra en el living de La Marea hotel Tigre Buenos Aires - Hotel con decoración hogareña',
    category: 'areas-comunes'
  },
  {
    publicId: 'living-sillon-descanso',
    alt: 'Sillón de descanso en el living de La Marea hotel Tigre - Hotel con áreas comunes confortables',
    category: 'areas-comunes'
  },
  {
    publicId: 'mesa-adornos-decoracion',
    alt: 'Mesa con adornos decorativos en La Marea hotel Tigre Buenos Aires - Hotel boutique con atención a los detalles',
    category: 'areas-comunes'
  },
  {
    publicId: 'sillon-decoracion-calma',
    alt: 'Sillón y decoración para momentos de calma en La Marea hotel Tigre - Hotel tranquilo cerca de la estación',
    category: 'areas-comunes'
  },
  {
    publicId: 'cocina-areas-comunes',
    alt: 'Cocina compartida equipada en áreas comunes de La Marea hotel Tigre Buenos Aires - Hotel con cocina para huéspedes',
    category: 'areas-comunes'
  },

  // Resto de desayuno
  {
    publicId: 'desayuno-mermelada-cafe',
    alt: 'Desayuno con mermeladas caseras y café recién hecho en La Marea hotel Tigre Buenos Aires - Desayuno artesanal incluido',
    category: 'desayuno'
  },
  {
    publicId: 'tetera-tazas-objetos',
    alt: 'Tetera, tazas y servicio de té completo en el desayuno de La Marea hotel Tigre - Hotel con desayuno incluido',
    category: 'desayuno'
  },
  {
    publicId: 'platos-jugos-desayuno',
    alt: 'Platos y jugos naturales del desayuno incluido en La Marea hotel Tigre Buenos Aires - Desayuno saludable gratis',
    category: 'desayuno'
  },
  {
    publicId: 'desayuno-incluido-variedad',
    alt: 'Variedad de opciones en el desayuno incluido de La Marea hotel Tigre - Hotel con desayuno completo en Buenos Aires',
    category: 'desayuno'
  },
  {
    publicId: 'desayuno-variedad',
    alt: 'Amplia variedad de productos del desayuno casero en La Marea hotel Tigre - Desayuno abundante incluido gratis',
    category: 'desayuno'
  },
  {
    publicId: 'desayuno_incluido_casero',
    alt: 'Desayuno casero artesanal incluido sin cargo en La Marea hotel Tigre - Medialunas, pan, dulces y café',
    category: 'desayuno'
  },
  {
    publicId: 'desayuno_afuera',
    alt: 'Desayuno casero al aire libre incluido en La Marea hotel Tigre - Desayuno gratis en jardín del hotel Buenos Aires',
    category: 'desayuno'
  },
  {
    publicId: 'cafe-desayuno',
    alt: 'Café recién hecho y desayuno casero incluido en La Marea hotel Tigre - Desayuno completo gratis',
    category: 'desayuno'
  },
]

const CATEGORIES = [
  { id: 'todas' as GalleryCategory, label: 'Todas' },
  { id: 'habitaciones' as GalleryCategory, label: 'Habitaciones' },
  { id: 'exterior' as GalleryCategory, label: 'Exterior' },
  { id: 'areas-comunes' as GalleryCategory, label: 'Áreas Comunes' },
  { id: 'desayuno' as GalleryCategory, label: 'Desayuno' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('todas')
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const filteredImages =
    activeCategory === 'todas'
      ? PLACEHOLDER_IMAGES
      : PLACEHOLDER_IMAGES.filter((img) => img.category === activeCategory)

  // Mostrar solo las primeras 8 fotos por defecto (2 filas en desktop)
  const INITIAL_DISPLAY_COUNT = 8
  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMore = filteredImages.length > INITIAL_DISPLAY_COUNT

  // Resetear showAll cuando cambia la categoría
  useEffect(() => {
    setShowAll(false)
  }, [activeCategory])

  // Función para colapsar y hacer scroll al botón
  const handleCollapse = () => {
    setShowAll(false)
    // Scroll directo (sin animación) al botón en el próximo frame
    requestAnimationFrame(() => {
      buttonRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' })
    })
  }

  return (
    <>
      <section className="py-12 px-4 md:py-20 md:px-8 max-w-7xl mx-auto bg-white">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-8 md:mb-12 text-center">
          Galería de Fotos
        </h2>

        {/* Tabs - Mobile optimized */}
        <div className="mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex gap-2 md:justify-center min-w-max md:min-w-0">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-amber-700 text-white shadow-lg'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-700/40'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - Mobile optimized with expand functionality */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {displayedImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setLightboxImageIndex(filteredImages.findIndex(img => img.publicId === image.publicId))}
                className="relative aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <CldImage
                  src={image.publicId}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                  crop="fill"
                  gravity="auto"
                  quality="auto"
                  format="auto"
                  priority={index < 6}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Gradient overlay when there's more content */}
          {!showAll && hasMore && (
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Ver más button */}
        {hasMore && !showAll && (
          <div ref={buttonRef} className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ver todas las fotos</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Ver menos button */}
        {showAll && hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleCollapse}
              className="px-8 py-4 bg-amber-100 text-amber-800 rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 border-2 border-amber-700/30"
            >
              <span>Ver menos</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <p className="text-center text-amber-700/60 py-12">
            Próximamente agregaremos más fotos de esta sección
          </p>
        )}

        <p className="text-center text-amber-700/60 mt-8 text-sm">
          Click en cualquier imagen para ver en tamaño completo
        </p>
      </section>

      {/* Lightbox */}
      {lightboxImageIndex !== null && (
        <ImageLightbox
          images={filteredImages}
          currentIndex={lightboxImageIndex}
          onClose={() => setLightboxImageIndex(null)}
          onNavigate={(newIndex) => setLightboxImageIndex(newIndex)}
        />
      )}
    </>
  )
}
