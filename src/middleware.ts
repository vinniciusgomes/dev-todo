import { NextRequest, NextResponse } from 'next/server'

import { getUrl } from '@/lib/get-url'

const PRIVATE_PATHS = ['/app', '/settings']

export function middleware(request: NextRequest) {
  const token =
    process.env.VERCEL_ENV === 'production'
      ? request.cookies.get('__Secure-authjs.session-token')
      : request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  if (PRIVATE_PATHS.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }

  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
