'use client'

import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'

interface ImageLightboxProps {
  publicId: string  // Cloudinary public ID instead of full URL
  alt: string
  onClose: () => void
}

export default function ImageLightbox({ publicId, alt, onClose }: ImageLightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden'

    // Only show spinner if image takes more than 150ms to load (avoid flash on cached images)
    const spinnerTimer = setTimeout(() => {
      if (!imageLoaded) {
        setShowSpinner(true)
      }
    }, 150)

    // ESC key to close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      clearTimeout(spinnerTimer)
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose, imageLoaded])

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
          src={publicId}
          alt={alt}
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
      <p className="absolute bottom-4 text-white/70 text-sm">
        Click fuera de la imagen o presiona ESC para cerrar
      </p>
    </div>
  )
}
