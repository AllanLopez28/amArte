import { Locale, getDictionary } from '@/lib/i18n'

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getDictionary(locale)
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="container py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>{t.footer.tagline}</p>
        <p>© {new Date().getFullYear()} · {t.footer.rights}</p>
      </div>
    </footer>
  )
}
