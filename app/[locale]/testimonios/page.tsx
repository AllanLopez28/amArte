// app/[locale]/testimonios/page.tsx
import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { sanityClient } from '@/lib/sanity.client'
import { testimonialsQuery } from '@/lib/sanity.queries'

export default async function Page({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  // 1) Traer testimonios desde Sanity (ES/EN según locale)
  let testimonials: Array<{
    name: string
    role?: string
    quote: string
    photoUrl?: string
  }> = []

  try {
    testimonials = await sanityClient.fetch(testimonialsQuery, { lang: locale })
    if (!Array.isArray(testimonials)) testimonials = []
  } catch {
    testimonials = []
  }

  return (
    <section className="section">
      <div className="container space-y-8">
        <header className="text-center space-y-3">
          <span className="inline-block badge-orange">Testimonios</span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Historias que inspiran
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            Conoce cómo la educación transforma vidas y abre oportunidades.
          </p>
        </header>

        {/* 2) Listado dinámico */}
        {testimonials.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-xl transition-shadow duration-300"
              >
                {/* Imagen fija a la izquierda */}
                <div className="relative w-full md:w-72 h-60 md:h-56 shrink-0 overflow-hidden rounded-xl">

                  <Image
                    src={t.photoUrl || '/escuela1.png'}
                    alt={t.name || 'Fotografía de beneficiario'}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 224px"
                    priority={i < 2}
                  />
                </div>

                {/* Texto a la derecha */}
                <div className="flex-1">
                  <p className="text-lg text-slate-700 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 font-bold text-brand-blue">
                    — {t.name}{t.role ? `, ${t.role}` : ''}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            Aún no hay testimonios publicados.
          </div>
        )}

      </div>
    </section>
  )
}
