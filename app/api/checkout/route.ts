// app/api/checkout/route.ts
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs' // Asegura Node.js runtime

type Body = {
  amount: number
  period: 'once' | 'monthly'
  locale?: 'es' | 'en'
}

export async function POST(req: NextRequest) {
  try {
    const { amount, period, locale = 'es' } = (await req.json()) as Body

    // Validaciones mínimas
    if (!amount || amount < 1) {
      return new Response('Invalid amount', { status: 400 })
    }

    const cents = Math.round(amount * 100)
    const origin =
      (await headers()).get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000'

    const mode = period === 'monthly' ? 'subscription' : 'payment'

    const session = await stripe.checkout.sessions.create({
      mode,
      // Si no pones payment_method_types, Stripe elige automáticamente (recomendado).
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: cents,
            product_data: {
              name:
                period === 'monthly'
                  ? 'Donación mensual a Fundación EducaSV'
                  : 'Donación única a Fundación EducaSV',
            },
            ...(mode === 'subscription' ? { recurring: { interval: 'month' } } : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/${locale}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/donar?cancelled=1`,
      locale: locale === 'es' ? 'es' : 'auto',
      allow_promotion_codes: false,
      metadata: { locale, period },
    })

    return Response.json({ id: session.id })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return new Response('Server error', { status: 500 })
  }
}
