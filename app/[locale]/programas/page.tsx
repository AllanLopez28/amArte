import { Locale } from '@/lib/i18n'
import { sanityClient } from '@/lib/sanity.client'
import { programsQuery } from '@/lib/sanity.queries'
import ProgramShowcase from '@/components/ProgramShowcase'
import Link from 'next/link'

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  let programs: any[] = []
  try {
    programs = await sanityClient.fetch(programsQuery, { lang: locale })
  } catch { programs = [] }

  return (
    <section className="section">
      <div className="container space-y-8">
        <header className="text-center space-y-3">
          <span className="inline-block badge-orange">Programas</span>
          <h1>Iniciativas en curso</h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600">
            Actividades y becas que impulsan la permanencia escolar.
          </p>
        </header>

        <div className="space-y-12">
          {programs.map((p, idx) => (
            <article key={idx} className="space-y-4">
              <h2 className="text-2xl font-extrabold">{p.title}</h2>
              <p className="text-slate-700">{p.description}</p>

              {/* Galería con efectos */}
              <ProgramShowcase
                images={(p.gallery || []).map((g: any) => ({ src: g.url, alt: p.title }))}
              />

              {/* Stats simples */}
              {p.stats && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card">
                    <h3 className="text-brand-blue">Participantes</h3>
                    <p className="text-3xl font-extrabold">{p.stats.participants ?? '-'}</p>
                  </div>
                  <div className="card">
                    <h3 className="text-brand-orange">Materiales</h3>
                    <p className="text-3xl font-extrabold">{p.stats.kits ?? '-'}</p>
                  </div>
                  <div className="card">
                    <h3 className="text-brand-purple">Tiempo</h3>
                    <p className="text-3xl font-extrabold">{p.stats.duration ?? '-'}</p>
                  </div>
                </div>
              )}
            </article>
          ))}

          {!programs.length && (
            <div className="text-center text-slate-500">
              Aún no hay programas publicados.
              <div className="mt-4">
                <Link href={`/${locale}/`} className="btn btn-outline">Volver al inicio</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
