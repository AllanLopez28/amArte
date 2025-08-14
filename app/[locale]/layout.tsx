import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    // Si el locale no es válido, 404
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  )
}
