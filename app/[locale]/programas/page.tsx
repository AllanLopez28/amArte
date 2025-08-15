import { Locale } from '@/lib/i18n'
import Link from 'next/link'
import ProgramShowcase from '@/components/ProgramShowcase'

export default async function Page({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  // Contenido del programa (puedes mover esto a Sanity después)
  const title = 'Programa recreativo y apoyo escolar – Cabañas'
  const body = `En una escuela del departamento de Cabañas realizamos actividades recreativas
  con niños y niñas de primaria. Además, entregamos materiales de estudio para que puedan
  desarrollar sus actividades académicas con mejores herramientas y motivación.`


  const images = [
    { src: '/escuela1.png',  alt: 'Actividades recreativas con niñas y niños en Cabañas' },
    { src: '/escuela11.png', alt: 'Entrega de materiales de estudio en Cabañas' },
  ]

  return (
    <div className="section">
      <div className="container space-y-10">
        <header className="text-center space-y-3">
          <span className="inline-block badge-orange">Programas</span>
          <h1>{title}</h1>
          <p className="max-w-3xl mx-auto text-lg">{body}</p>
        </header>

        {/* Galería con efectos (client component) */}
        <ProgramShowcase images={images} />

        {/* Bloque de impacto/CTA */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-brand-blue mb-1">Participantes</h3>
            <p className="text-3xl font-extrabold">+80</p>
            <p className="text-sm text-slate-600">niñas y niños de primaria</p>
          </div>
          <div className="card">
            <h3 className="text-brand-orange mb-1">Materiales</h3>
            <p className="text-3xl font-extrabold">+100</p>
            <p className="text-sm text-slate-600">kits de estudio entregados</p>
          </div>
          <div className="card">
            <h3 className="text-brand-purple mb-1">Tiempo</h3>
            <p className="text-3xl font-extrabold">1 jornada</p>
            <p className="text-sm text-slate-600">actividades lúdicas y refuerzo</p>
          </div>
        </section>

        <div className="text-center">
          <Link href={`/${locale}/donar`} className="btn btn-primary">
            Apoyar este programa
          </Link>
        </div>
      </div>
    </div>
  )
}
