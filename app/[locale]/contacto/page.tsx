
import { Locale } from '@/lib/i18n'

export default function Page({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <div className="section">
      <div className="container space-y-4">
        <h1>Contacto</h1>
        <p>Página en construcción (maqueta).</p>
      </div>
    </div>
  )
}
