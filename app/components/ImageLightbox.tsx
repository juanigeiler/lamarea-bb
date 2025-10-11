'use client'

import { useEffect } from 'react'
import { CldImage } from 'next-cloudinary'

interface ImageLightboxProps {
  publicId: string  // Cloudinary public ID instead of full URL
  alt: string
  onClose: () => void
}

export default function ImageLightbox({ publicId, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden'

    // ESC key to close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

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
        className="relative max-w-6xl max-h-[90vh] w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CldImage
          src={publicId}
          alt={alt}
          width={1920}
          height={1080}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
          quality="auto"
          format="auto"
        />
      </div>

      {/* Instruction text */}
      <p className="absolute bottom-4 text-white/70 text-sm">
        Click fuera de la imagen o presiona ESC para cerrar
      </p>
    </div>
  )
}
