import { Locale } from '@/lib/i18n'
import Link from 'next/link'

export default async function GraciasPage({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return (
    <div className="section">
      <div className="container text-center">
        <h1>¡Gracias por tu apoyo! ❤️</h1>
        <p className="mt-2">Pronto habilitaremos pagos reales con Stripe y PayPal.</p>
        <Link href={`/${locale}`} className="btn btn-primary mt-6">Volver al inicio</Link>
      </div>
    </div>
  )
}
