import Link from 'next/link'
import { Locale } from '@/lib/i18n'

export default function Navbar({ locale }: { locale: Locale }) {
  const base = `/${locale}`
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href={base} className="flex items-center gap-3 font-extrabold text-xl">
          <img src="/logo-amarte.png" alt="Fundación logo" width={130} height={40} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href={`${base}`} className="link-accent">Inicio</Link>
          <Link href={`${base}/donar`} className="link-accent">Donar</Link>
          <Link href={`${base}/programas`} className="link-accent">Programas</Link>
          <Link href={`${base}/testimonios`} className="link-accent">Testimonios</Link>
          <Link href={`${base}/transparencia`} className="link-accent">Transparencia</Link>
          <Link href={`${base}/sobre`} className="link-accent">Sobre</Link>
          <Link href={`${base}/contacto`} className="link-accent">Contacto</Link>
          <Link href={`${base}/blog`} className="link-accent">Blog</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={`${base}/donar`} className="btn btn-primary">Donar</Link>
        </div>
      </div>
    </header>
  )
}
