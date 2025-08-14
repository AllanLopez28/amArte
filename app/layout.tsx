import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fundación EducaSV',
  description: 'Donaciones para mantener a niños y niñas en la escuela en El Salvador.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
