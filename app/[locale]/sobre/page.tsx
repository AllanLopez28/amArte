import { Locale } from '@/lib/i18n'

export default async function Page({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return (
    <div className="section">
      <div className="container space-y-4">
        <h1>Sobre la Fundación</h1>
        <p>Página en construcción (maqueta). Idioma: {locale}</p>
      </div>
    </div>
  )
}
