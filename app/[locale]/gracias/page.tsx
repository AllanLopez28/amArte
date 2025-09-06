// app/[locale]/gracias/page.tsx
import { stripe } from '@/lib/stripe'
import { Locale } from '@/lib/i18n'

export default async function GraciasPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ session_id?: string }>
}) {
  const { locale } = await params
  const { session_id } = await searchParams

  let amount = null as null | string
  let email = null as null | string
  let isSub = false

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['payment_intent', 'line_items', 'subscription', 'customer_details'],
      })
      const total =
        session.amount_total ??
        ((session.payment_intent as any)?.amount as number | undefined)
      if (typeof total === 'number') amount = `$${(total / 100).toFixed(2)} USD`
      email = session.customer_details?.email ?? null
      isSub = session.mode === 'subscription'
    } catch {}
  }

  return (
    <section className="section">
      <div className="container text-center space-y-4">
        <span className="inline-block badge-orange">¡Gracias!</span>
        <h1 className="text-3xl font-extrabold">Tu donación fue procesada</h1>

        {amount && (
          <p className="text-lg">
            {isSub ? 'Donación mensual' : 'Donación única'} por <strong>{amount}</strong>.
          </p>
        )}

        {email && (
          <p className="text-slate-600">
            Enviamos un recibo a <strong>{email}</strong>.
          </p>
        )}

        {!session_id && (
          <p className="text-slate-600">
            Si llegaste aquí sin pasar por el pago, vuelve a la página de donación.
          </p>
        )}

        <div className="mt-6">
          <a href={`/${locale}`} className="btn btn-primary">Volver al inicio</a>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          * Recibo enviado por Stripe. No almacenamos datos de tarjeta.
        </p>
      </div>
    </section>
  )
}
