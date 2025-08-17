'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Locale = 'es' | 'en'
type Dict = any

type Props = {
  locale: Locale
  t: Dict
}

// --- CONFIG: solo paypal.me desde ENV ---
const PAYPAL_ME = process.env.NEXT_PUBLIC_PAYPAL_ME // ej: https://paypal.me/Usuario
const CURRENCY = 'USD'

const paypalUrl = (amount: number) =>
  `${String(PAYPAL_ME).replace(/\/$/, '')}/${amount}?currency_code=${CURRENCY}`

// --- Tiers estáticos ---
const TIERS_ONCE = [
  { amount: 25, label: 'Útiles' },
  { amount: 100, label: 'Mensualidad completa' },
  { amount: 250, label: 'Apoyo a actividades' },
]
const TIERS_MONTHLY = [
  { amount: 10, label: 'Apoyo mensual' },
  { amount: 25, label: 'Beca parcial mensual' },
  { amount: 50, label: 'Beca mensual' },
]

export default function DonateClient({ locale, t }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<{
    amount: number
    period: 'once' | 'monthly'
    label?: string
  } | null>(null)

  const handleSelect = (
    amount: number,
    period: 'once' | 'monthly',
    label?: string
  ) => setSelected({ amount, period, label })

  const handleSimulate = () => {
    if (!selected || !PAYPAL_ME) return
    window.open(paypalUrl(selected.amount), '_blank', 'noopener,noreferrer')
    router.push(`/${locale}/gracias`)
  }

  const paypalMissing = !PAYPAL_ME

  return (
    <div className="section">
      <div className="container">
        <h1 className="mb-2">{t.donate.title}</h1>
        <p className="mb-6">{t.donate.subtitle}</p>

        {paypalMissing && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-800">
            <strong>Configuración requerida:</strong> define
            {' '}<code>NEXT_PUBLIC_PAYPAL_ME</code>{' '}
            (por ejemplo <code>https://paypal.me/Usuario</code>) en tu
            <span className="font-semibold"> .env.local</span> y en Vercel.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Única */}
          <div className="card space-y-4">
            <h3>Montos únicos</h3>
            <div className="flex flex-wrap gap-3">
              {TIERS_ONCE.map((x, i) => {
                const active = selected?.amount === x.amount && selected?.period === 'once'
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(x.amount, 'once', x.label)}
                    aria-pressed={active}
                    className={`btn ${active ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {`$${x.amount}`} {x.label && `· ${x.label}`}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-slate-500">
              Selecciona un monto y luego presiona <strong>Simular donación</strong>.
            </p>
          </div>

          {/* Mensual */}
          <div className="card space-y-4">
            <h3>Montos mensuales</h3>
            <div className="flex flex-wrap gap-3">
              {TIERS_MONTHLY.map((x, i) => {
                const active = selected?.amount === x.amount && selected?.period === 'monthly'
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(x.amount, 'monthly', x.label)}
                    aria-pressed={active}
                    className={`btn ${active ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {`$${x.amount}`} {x.label && `· ${x.label}`}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-slate-500">
              (Para recurrencia real con PayPal, luego añadiremos suscripciones).
            </p>
          </div>
        </div>

        {/* CTA principal */}
        <div className="mt-8 flex flex-wrap gap-3 items-center">
          <button
            type="button"
            onClick={handleSimulate}
            disabled={!selected || paypalMissing}
            className={`btn btn-primary ${
              !selected || paypalMissing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={
              !selected
                ? 'Selecciona un monto'
                : paypalMissing
                ? 'Configura NEXT_PUBLIC_PAYPAL_ME'
                : `Simular donación · $${selected.amount}`
            }
          >
            {selected
              ? `Simular donación · $${selected.amount}`
              : 'Selecciona un monto'}
          </button>

          <Link href={`/${locale}`} className="btn btn-outline">
            Cancelar
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          * Simulación: se abrirá <strong>PayPal.Me</strong> en una pestaña nueva con el monto elegido
          y te enviaremos a la página de <strong>Gracias</strong>.
        </p>
      </div>
    </div>
  )
}
