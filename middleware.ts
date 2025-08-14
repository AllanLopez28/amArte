import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['es', 'en']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ⛔️ NO tocar: Studio, API, Next internals, ni archivos con extensión (.png, .css, .js, etc.)
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname === '/favicon.ico' ||
    /\.[a-zA-Z0-9]{2,5}$/.test(pathname) // <-- excluye /logo-amarte.png, .svg, .css, etc.
  ) {
    return NextResponse.next()
  }

  // Si no hay prefijo de locale, redirige a /es
  const first = pathname.split('/')[1]
  if (!locales.includes(first)) {
    const url = request.nextUrl.clone()
    url.pathname = `/es${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Matcher que evita procesar estáticos
export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
