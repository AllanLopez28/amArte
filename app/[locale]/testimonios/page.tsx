import Image from 'next/image'
import { Locale } from '@/lib/i18n'

export default async function Page({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

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

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center hover:shadow-xl transition-shadow duration-300">
          {/* Imagen */}
          <div className="overflow-hidden rounded-xl relative h-[260px] md:h-[340px]">
            <Image
              src="/escuela1.png"
              alt="Javier Martínez - Becario"
              fill
              className="object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              priority={false}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          {/* Texto */}
          <div>
            <p className="text-lg text-slate-700 italic leading-relaxed">
              &ldquo;Nunca imaginé que tendría la oportunidad de estudiar fuera de El Salvador.
              Gracias al apoyo de <span className="font-semibold">Fundación EducaSV</span>, obtuve
              una beca para cursar un programa de ciencias en una universidad en Canadá. La
              fundación me ayudó con el proceso de aplicación, los costos iniciales y hasta con
              talleres para adaptarme culturalmente. Hoy estoy ampliando mis conocimientos y,
              cuando regrese, quiero ponerlos al servicio de mi comunidad. Este sueño se hizo
              realidad gracias a quienes creyeron en mí.&rdquo;
            </p>
            <p className="mt-4 font-bold text-brand-blue">
              — Javier Martínez, becario en el extranjero
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
