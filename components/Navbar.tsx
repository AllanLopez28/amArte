'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/lib/i18n'

type Item = { href: string; label: string }

export default function Navbar({ locale }: { locale: Locale }) {
  const base = `/${locale}`
  const items: Item[] = [
    { href: `${base}`, label: 'Inicio' },
    { href: `${base}/donar`, label: 'Donar' },
    { href: `${base}/programas`, label: 'Programas' },
    { href: `${base}/testimonios`, label: 'Testimonios' },
    { href: `${base}/transparencia`, label: 'Transparencia' },
    { href: `${base}/sobre`, label: 'Sobre' },
    { href: `${base}/contacto`, label: 'Contacto' },
    //{ href: `${base}/blog`, label: 'Blog' },
  ]

  const [open, setOpen] = useState(false)

  // Evita scroll de fondo cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        <Link href={base} className="flex items-center gap-3">
          <Image src="/logo-amarte.png" alt="Fundación logo" width={130} height={40} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="link-accent">
              {it.label}
            </Link>
          ))}
          <Link href={`${base}/donar`} className="btn btn-primary ml-2">Donar</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border border-slate-300"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        {/* Drawer solo con fondo blanco */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl
                      transition-transform duration-300 ease-out
                      ${open ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Menú de navegación"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <Link href={base} onClick={() => setOpen(false)} className="flex items-center gap-2">
              <Image src="/logo-amarte.png" alt="Fundación logo" width={110} height={34} />
            </Link>
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 border border-slate-300"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <nav className="p-3">
            <ul className="space-y-1">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 hover:bg-slate-100 text-slate-700"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-3">
              <Link
                href={`${base}/donar`}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full mt-2"
              >
                Donar
              </Link>
            </div>
          </nav>

          <div className="mt-auto h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange" />
        </div>
      </div>
    </header>
  )
}
