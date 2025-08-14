import { getDictionary, Locale } from '@/lib/i18n'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { homeQuery } from '@/lib/sanity.queries'

export default async function Page({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getDictionary(locale)

  let data: any = null
  try { data = await sanityClient.fetch(homeQuery, { lang: locale }) } catch {}

  const title = data?.heroTitle || t.hero.title
  const subtitle = data?.heroSubtitle || t.hero.subtitle
  const cta = data?.heroCta || t.hero.cta
  const impact = data?.impact ?? [
    { label: 'Becas', value: 120 },
    { label: 'Kits escolares', value: 350 },
    { label: 'Comunidades', value: 24 },
  ]

  return (
    <div>
      <section className="section hero-bg">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="badge-orange">Programa de becas</span>
            <h1>{title}</h1>
            <p className="text-lg">{subtitle}</p>
            <div className="flex gap-3">
              <Link href={`/${locale}/donar`} className="btn btn-primary">{cta}</Link>
              <a href="#como" className="btn btn-outline">Cómo ayudamos</a>
            </div>
          </div>
          <div className="card">
            <h3 className="mb-2">Impacto</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {impact.slice(0,3).map((item:any, i:number) => (
                <div key={i} className="p-3 rounded-xl bg-white shadow-inner">
                  <div className="text-3xl font-extrabold">{item.value}</div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="como" className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-brand-blue">1) Identificamos</h3>
            <p>Niños y niñas con riesgo de abandonar la escuela.</p>
          </div>
          <div className="card">
            <h3 className="text-brand-orange">2) Acompañamos</h3>
            <p>Con becas, tutorías y actividades recreativas.</p>
          </div>
          <div className="card">
            <h3 className="text-brand-purple">3) Medimos</h3>
            <p>Resultados claros para rendir cuentas a donantes.</p>
          </div>
        </div>
      </section>

      <section className="section hero-bg">
        <div className="container text-center">
          <h2>¿Listo para ayudar?</h2>
          <p>Tu aporte crea oportunidades reales.</p>
          <Link href={`/${locale}/donar`} className="btn btn-primary mt-4">Donar</Link>
        </div>
      </section>
    </div>
  )
}
