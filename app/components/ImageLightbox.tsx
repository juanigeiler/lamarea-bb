'use client'

import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'

interface GalleryImage {
  publicId: string
  alt: string
  category: string
}

interface ImageLightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const currentImage = images[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  const goToPrev = () => {
    if (hasPrev) {
      setImageLoaded(false)
      setShowSpinner(false)
      onNavigate(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (hasNext) {
      setImageLoaded(false)
      setShowSpinner(false)
      onNavigate(currentIndex + 1)
    }
  }

  useEffect(() => {
    // Reset loading states when image changes
    setImageLoaded(false)
    setShowSpinner(false)
  }, [currentIndex])

  useEffect(() => {
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden'

    // Only show spinner if image takes more than 150ms to load (avoid flash on cached images)
    const spinnerTimer = setTimeout(() => {
      if (!imageLoaded) {
        setShowSpinner(true)
      }
    }, 150)

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(spinnerTimer)
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, imageLoaded, currentIndex])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
        aria-label="Cerrar"
      >
        ×
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrev()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all z-10 hover:scale-110"
          aria-label="Imagen anterior"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all z-10 hover:scale-110"
          aria-label="Imagen siguiente"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container - only takes space needed for image */}
      <div
        className="relative max-w-6xl max-h-[90vh] w-auto h-auto min-w-[300px] min-h-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner - only show if loading takes more than 150ms */}
        {!imageLoaded && showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Elegant spinner with dots - 2 brown + 1 white */}
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Single image - fade in when loaded */}
        <CldImage
          src={currentImage.publicId}
          alt={currentImage.alt}
          width={1920}
          height={1080}
          className={`max-w-full max-h-[90vh] w-auto h-auto object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          quality="auto"
          format="auto"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Instruction text */}
      <p className="absolute bottom-4 text-white/70 text-sm text-center">
        Usa las flechas o ← → para navegar • ESC o click fuera para cerrar
      </p>
    </div>
  )
}
