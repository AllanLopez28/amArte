import Link from 'next/link'
import { groq } from 'next-sanity'
import { getDictionary, Locale } from '@/lib/i18n'
import { sanityClient } from '@/lib/sanity.client'
import { tiersQuery } from '@/lib/sanity.queries'

export default async function DonatePage({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getDictionary(locale)

  let tiers: any[] = []
  try {
    tiers = await sanityClient.fetch(tiersQuery, { lang: locale })
  } catch {}

  if (!tiers.length) {
    tiers = [
      { amount: 25, period: 'once', label: 'Útiles' },
      { amount: 50, period: 'monthly', label: 'Mensualidad parcial' },
      { amount: 100, period: 'monthly', label: 'Mensualidad completa' },
      { amount: 250, period: 'once', label: 'Apoyo a actividades' },
    ]
  }

  const once = tiers.filter((t) => t.period === 'once')
  const monthly = tiers.filter((t) => t.period === 'monthly')

  return (
    <div className="section">
      <div className="container">
        <h1 className="mb-2">{t.donate.title}</h1>
        <p className="mb-8">{t.donate.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card space-y-4">
            <h3>Montos únicos</h3>
            <div className="flex flex-wrap gap-3">
              {once.map((x, i) => (
                <button key={i} className="btn btn-outline">
                  {`$${x.amount}`} {x.label && `· ${x.label}`}
                </button>
              ))}
            </div>
          </div>

          <div className="card space-y-4">
            <h3>Montos mensuales</h3>
            <div className="flex flex-wrap gap-3">
              {monthly.map((x, i) => (
                <button key={i} className="btn btn-outline">
                  {`$${x.amount}`} {x.label && `· ${x.label}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href={`/${locale}/gracias`} className="btn btn-primary">
            {t.donate.thanksPreview}
          </Link>
          <Link href={`/${locale}`} className="btn btn-outline">
            Cancelar
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          * Maqueta: pagos reales con Stripe/PayPal llegarán después.
        </p>
      </div>
    </div>
  )
}
