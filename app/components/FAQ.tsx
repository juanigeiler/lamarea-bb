'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: '¿Cuál es el horario de check-in y check-out?',
      answer: 'El check-in es a partir de las 13:00 hs y el check-out hasta las 11:00 hs.'
    },
    {
      question: '¿Tienen estacionamiento?',
      answer: 'Sí, contamos con estacionamiento privado dentro de la casa con portón automático, sin techar, con capacidad para hasta 4 vehículos.'
    },
    {
      question: '¿A qué hora se sirve el desayuno?',
      answer: 'El desayuno se sirve entre las 8:30 y las 11:00 hs. Podemos hacer excepciones según tus necesidades. Si tenés alguna restricción alimentaria (vegano, celíaco, intolerante), avisanos con anticipación para prepararte un desayuno especial.'
    },
    {
      question: '¿Puedo usar la cocina y la parrilla?',
      answer: 'Sí, la cocina está completamente equipada y disponible para que cocines. El uso de la parrilla es gratuito y también está disponible para los huéspedes.'
    },
    {
      question: '¿Aceptan mascotas?',
      answer: 'Lamentablemente no aceptamos mascotas en el alojamiento.'
    },
    {
      question: '¿Se puede fumar?',
      answer: 'No está permitido fumar dentro de la casa. Podés hacerlo en las áreas exteriores como el jardín.'
    },
    {
      question: '¿Cómo se hace la reserva?',
      answer: 'La reserva se confirma con una transferencia del 30% del total de la estadía. El resto se abona al momento del check-in en efectivo o transferencia.'
    },
    {
      question: '¿Puedo reservar todo el alojamiento para un grupo?',
      answer: 'Sí, consultanos por disponibilidad para alquilar el alojamiento completo para grupos.'
    },
    {
      question: '¿Qué actividades hay cerca del B&B?',
      answer: 'Estamos muy cerca de la costanera con gran oferta gastronómica. Además, contamos con información turística y ofrecemos descuentos en actividades náuticas de la zona.'
    }
  ]

  return (
    <section className="py-12 px-4 md:py-20 md:px-8 max-w-4xl mx-auto bg-white">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4 md:mb-6 text-center">
        Preguntas Frecuentes
      </h2>
      <p className="text-center text-amber-800/70 mb-8 md:mb-12 max-w-2xl mx-auto">
        Todo lo que necesitás saber antes de tu estadía
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-amber-50/50 to-white rounded-2xl border-2 border-amber-700/20 overflow-hidden transition-all hover:shadow-md"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-amber-50/50 transition-colors"
            >
              <span className="font-semibold text-amber-900 text-base md:text-lg pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-amber-700 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-4 pt-2 text-amber-800/80 leading-relaxed text-sm md:text-base">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
