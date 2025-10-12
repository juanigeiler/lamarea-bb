import StructuredData from './components/StructuredData'
import Gallery from './components/Gallery'
import Amenities from './components/Amenities'
import Reviews from './components/Reviews'
import RatingBadge from './components/RatingBadge'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <StructuredData />

      <div className="min-h-screen bg-gradient-to-b from-amber-50/20 via-white to-amber-50/20 font-sans">
        {/* Hero Section - Clean gradient background */}
        <section className="relative min-h-[60vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden px-4 py-10 md:py-12 bg-gradient-to-br from-amber-50 via-white to-amber-100/50">
          <div className="relative text-center max-w-3xl mx-auto w-full">
            {/* Logo */}
            <div className="mb-5 flex justify-center">
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <Image
                  src="/logo.png"
                  alt="La Marea B&B Logo"
                  width={144}
                  height={144}
                  className="rounded-full shadow-xl object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-2 md:mb-3">
              La Marea B&B
            </h1>

            {/* Rating Badge - Centered below title */}
            <RatingBadge />

            <p className="text-lg sm:text-xl md:text-2xl text-amber-800 mb-2 md:mb-3 font-light">
              Bed & Breakfast en Tigre
            </p>
            <p className="text-base sm:text-lg text-amber-700/80 max-w-2xl mx-auto leading-relaxed mb-1.5">
              Un lugar cálido y acogedor, atendido por sus dueños
            </p>
            <p className="text-sm sm:text-base text-amber-700/60 max-w-2xl mx-auto leading-relaxed">
              Pileta, jardín y desayuno incluido • Cerca de la estación y Río Luján
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-5 h-5 text-amber-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Sobre Nosotros - Warm colors */}
        <section className="py-12 px-4 md:py-20 md:px-8 max-w-4xl mx-auto bg-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-6 md:mb-8 text-center">
            Bienvenidos
          </h2>
          <p className="text-base md:text-lg text-amber-800/80 text-center leading-relaxed mb-6">
            <strong className="text-amber-900">La Marea B&B</strong> es tu refugio en el corazón de Tigre.
            Ubicados cerca de la estación de tren y a pasos de la costa del Río Luján,
            te ofrecemos una experiencia única con la calidez de la atención familiar.
          </p>
          <p className="text-base md:text-lg text-amber-800/80 text-center leading-relaxed">
            Disfrutá de nuestra pileta exterior, jardín, y un delicioso desayuno incluido.
            Sentite como en casa.
          </p>
        </section>

        {/* Amenities Section */}
        <Amenities />

        {/* Gallery Component */}
        <div id="galeria">
          <Gallery />
        </div>

        {/* Reviews Section */}
        <Reviews />

        {/* Location - Warm colors */}
        <section id="ubicacion" className="py-12 px-4 md:py-20 md:px-8 max-w-6xl mx-auto bg-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-8 md:mb-12 text-center">
            ¿Dónde Estamos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-amber-50/30 rounded-2xl shadow-sm border-2 border-amber-700/30">
              <div className="text-amber-700 mb-4 flex justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Dirección</h3>
              <p className="text-amber-800 text-sm md:text-base font-medium">
                Avenida Liniers 573<br />
                Tigre, Buenos Aires<br />
                Argentina
              </p>
              <p className="text-amber-700/60 text-xs md:text-sm mt-3">
                Cerca de la estación de tren<br />
                y la costa del Río Luján
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Avenida+Liniers+573+Tigre+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-amber-700 hover:text-amber-800 font-medium text-sm underline"
              >
                Ver en Google Maps →
              </a>
            </div>
            <div className="text-center p-6 bg-amber-50/30 rounded-2xl shadow-sm border-2 border-amber-700/30">
              <div className="text-amber-700 mb-4 flex justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Contacto</h3>
              <p className="text-amber-800 text-sm md:text-base mb-1 font-medium">
                +54 11 2640-4169
              </p>
              <p className="text-amber-700/60 text-xs md:text-sm mt-3">
                Atención personalizada<br />
                Lunes a Domingo
              </p>
              <p className="text-xs text-amber-600/50 mt-3">
                Efectivo o transferencia
              </p>
            </div>
          </div>
        </section>

        {/* Contacto y Redes - Warm style */}
        <section id="contacto" className="py-12 px-4 md:py-20 md:px-8 max-w-6xl mx-auto bg-gradient-to-br from-amber-50/30 via-white to-amber-100/40">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-8 md:mb-12 text-center">
            Contacto
          </h2>
          <div className="text-center">
            <p className="text-amber-800/70 mb-6 text-base md:text-lg">Escribinos o seguinos en Instagram</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a
                href="https://wa.me/5491126404169"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 hover:shadow-xl transition-all font-semibold text-lg"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-medium">WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/lamareatigre/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 text-white rounded-full hover:shadow-xl hover:scale-105 transition-all font-semibold text-lg"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="font-medium">@lamareatigre</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer - Warm colors */}
        <footer className="bg-amber-900 text-amber-50 py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm md:text-base font-semibold mb-2 font-serif">
              La Marea B&B
            </p>
            <p className="text-amber-100/70 text-xs md:text-sm">
              Avenida Liniers 573, Tigre, Buenos Aires
            </p>
            <p className="text-amber-100/70 text-xs md:text-sm mt-1">
              Atención familiar • Como en casa
            </p>
            <p className="text-amber-200/50 text-xs mt-4">
              &copy; {new Date().getFullYear()} La Marea B&B
            </p>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/5491126404169"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center group"
          aria-label="Contactar por WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="absolute right-full mr-3 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            ¡Escribinos!
          </span>
        </a>
      </div>
    </>
  )
}
