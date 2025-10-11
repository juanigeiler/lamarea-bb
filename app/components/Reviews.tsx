export default function Reviews() {
  // Reviews destacadas de Google - reemplazar con reviews reales
  const featuredReviews = [
    {
      name: 'María González',
      rating: 5,
      comment: 'Excelente lugar, muy limpio y cómodo. La atención de los dueños es increíble, te hacen sentir como en casa. El desayuno delicioso.',
      date: 'Hace 2 meses',
    },
    {
      name: 'Carlos Rodríguez',
      rating: 5,
      comment: 'Hermoso lugar para descansar. La piscina y el jardín son un plus. Muy cerca de todo en Tigre. Súper recomendable.',
      date: 'Hace 1 mes',
    },
    {
      name: 'Laura Martínez',
      rating: 5,
      comment: 'Un lugar encantador, atención familiar excepcional. Volveremos seguro!',
      date: 'Hace 3 semanas',
    },
  ]

  const StarIcon = ({ filled = true }: { filled?: boolean }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-500' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  return (
    <section className="py-12 px-4 md:py-20 md:px-8 max-w-7xl mx-auto bg-amber-50/30">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">
          Opiniones de Nuestros Huéspedes
        </h2>
        <p className="text-amber-800/70 max-w-2xl mx-auto">
          Conocé lo que dicen quienes ya se hospedaron con nosotros
        </p>
      </div>

      {/* Featured Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-6xl mx-auto">
        {featuredReviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md border-2 border-amber-700/20 hover:shadow-lg transition-shadow"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < review.rating} />
              ))}
            </div>

            {/* Comment */}
            <p className="text-amber-800/80 mb-4 italic leading-relaxed text-sm md:text-base">
              &ldquo;{review.comment}&rdquo;
            </p>

            {/* Author & Date */}
            <div className="border-t border-amber-200/50 pt-3">
              <p className="font-semibold text-amber-900 text-sm">{review.name}</p>
              <p className="text-xs text-amber-700/60">{review.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Google Maps Reviews Embed */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl md:text-2xl font-serif font-semibold text-amber-900 mb-6 text-center">
          Todas las opiniones en Google Maps
        </h3>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-amber-700/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.4895127382047!2d-58.593665625345125!3d-34.41431904751855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca5c8e6eead85%3A0xc0e6022e3a80076e!2sLa%20Marea%20B%26B!5e0!3m2!1ses!2sar!4v1760136945534!5m2!1ses!2sar"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="La Marea B&B - Avenida Liniers 573, Tigre"
            className="w-full"
          ></iframe>
        </div>

        {/* Call to action */}
        <div className="text-center mt-8">
          <p className="text-amber-800/70 mb-4 text-sm md:text-base">
            ¿Ya te hospedaste con nosotros?
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Avenida+Liniers+573+Tigre+Buenos+Aires"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors shadow-md font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Dejanos tu opinión en Google</span>
          </a>
        </div>
      </div>
    </section>
  )
}
