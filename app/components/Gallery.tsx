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
  // Destacadas - Exterior (pileta, jardín) - Las más atractivas primero
  {
    publicId: 'jardin-pileta',
    alt: 'Jardín con pileta exterior de La Marea B&B en Tigre',
    category: 'exterior'
  },
  {
    publicId: 'pileta_pasto_casa',
    alt: 'Vista de la pileta y la casa de La Marea B&B',
    category: 'exterior'
  },
  {
    publicId: 'pileta_espacio_jardin',
    alt: 'Pileta y espacio de jardín en La Marea B&B en Tigre',
    category: 'exterior'
  },
  {
    publicId: 'pileta_espacio_verde',
    alt: 'Pileta rodeada de espacios verdes en La Marea B&B',
    category: 'exterior'
  },
  {
    publicId: 'sillas_pasto_arboles',
    alt: 'Sillas en el jardín con árboles de La Marea B&B en Tigre',
    category: 'exterior'
  },
  {
    publicId: 'farol-jardin-pileta',
    alt: 'Jardín con farol de La Marea B&B',
    category: 'exterior'
  },
  {
    publicId: 'espacio-verde-exterior',
    alt: 'Espacio verde y jardín de La Marea B&B en Tigre',
    category: 'exterior'
  },
  {
    publicId: 'macetas-exterior_fhum5c',
    alt: 'Plantas y macetas en el jardín de La Marea B&B',
    category: 'exterior'
  },
  {
    publicId: 'planta_pasto_verde',
    alt: 'Plantas y espacios verdes en el jardín de La Marea B&B',
    category: 'exterior'
  },

  // Áreas comunes interiores - Después del exterior para variar
  {
    publicId: 'living_sillon',
    alt: 'Sala de estar con sillón de La Marea B&B',
    category: 'areas-comunes'
  },
  {
    publicId: 'velador-cuadros-living',
    alt: 'Living decorado con cuadros de La Marea B&B en Tigre',
    category: 'areas-comunes'
  },
  {
    publicId: 'cuadro_living',
    alt: 'Decoración interior del área común de La Marea B&B',
    category: 'areas-comunes'
  },

  // Desayuno - Al final para cerrar con una buena nota
  {
    publicId: 'cafe-desayuno',
    alt: 'Café y desayuno en La Marea B&B en Tigre',
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
