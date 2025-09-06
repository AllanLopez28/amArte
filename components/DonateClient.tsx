'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'

type Locale = 'es' | 'en'
type Dict = any

type Props = {
  locale: Locale
  t: Dict
}

const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

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

  const stripeMissing = !STRIPE_PK

  const handleSelect = (
    amount: number,
    period: 'once' | 'monthly',
    label?: string
  ) => setSelected({ amount, period, label })

  const handleStripe = async () => {
    if (!selected || !STRIPE_PK) return

    // 1) Crear sesión en tu API
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: selected.amount,
        period: selected.period,
        locale,
      }),
    })

    if (!res.ok) {
      alert('Ocurrió un problema creando la sesión de pago.')
      return
    }

    const { id } = await res.json()

    // 2) Redirigir a Stripe Checkout
    const stripe = await loadStripe(STRIPE_PK)
    const { error } = await stripe!.redirectToCheckout({ sessionId: id })
    if (error) alert(error.message)
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="mb-2">{t.donate.title}</h1>
        <p className="mb-8">{t.donate.subtitle}</p>

        {stripeMissing && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-800">
            <strong>Configuración requerida:</strong> define
            {' '}<code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> y
            {' '}<code>STRIPE_SECRET_KEY</code> en tu entorno.
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
              Selecciona un monto y presiona <strong>Donar con tarjeta</strong>.
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
              La recurrencia se procesa automáticamente cada mes.
            </p>
          </div>
        </div>

        {/* CTA principal */}
        <div className="mt-8 flex flex-wrap gap-3 items-center">
          <button
            type="button"
            onClick={handleStripe}
            disabled={!selected || stripeMissing}
            className={`btn btn-primary ${
              !selected || stripeMissing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={
              !selected
                ? 'Selecciona un monto'
                : `Donar con tarjeta · $${selected.amount}`
            }
          >
            {selected
              ? `Donar con tarjeta · $${selected.amount}`
              : 'Selecciona un monto'}
          </button>

          <Link href={`/${locale}`} className="btn btn-outline">
            Cancelar
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          * Procesado de forma segura por <strong>Stripe Checkout</strong>. No almacenamos
          datos de tarjeta en nuestros servidores.
        </p>
      </div>
    </div>
  )
}
