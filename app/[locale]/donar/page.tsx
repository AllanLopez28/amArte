// app/[locale]/donar/page.tsx
import { getDictionary, Locale } from '@/lib/i18n'
import DonateClient from '@/components/DonateClient'

export default async function DonatePage({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getDictionary(locale)

  return <DonateClient locale={locale} t={t} />
}
