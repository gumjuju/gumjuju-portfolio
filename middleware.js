import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  response.headers.set('X-Request-Id', crypto.randomUUID())

  // Enforce HTTPS in production when behind a reverse proxy/load balancer.
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto')
    const host = request.headers.get('host')

    if (proto === 'http' && host && !host.startsWith('localhost')) {
      const secureUrl = request.nextUrl.clone()
      secureUrl.protocol = 'https:'
      return NextResponse.redirect(secureUrl, 308)
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
