import { NextResponse } from 'next/server'

import {
  CSP_POLICY,
  SENTRY_CSP_REPORT_GROUP,
  SENTRY_REPORT_URI,
} from '../configs/csp'

export function middleware() {
  const response = NextResponse.next()

  // Set CSP headers
  response.headers.set('Content-Security-Policy', CSP_POLICY)

  // Set reporting headers
  response.headers.set(
    'Report-To',
    `{"group":"${SENTRY_CSP_REPORT_GROUP}","max_age":10886400,"endpoints":[{"url":"${SENTRY_REPORT_URI}"}],"include_subdomains":true}`
  )

  response.headers.set(
    'Reporting-Endpoints',
    `${SENTRY_CSP_REPORT_GROUP}="${SENTRY_REPORT_URI}"`
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - ads.txt (ads file)
     * - .well-known (well-known files)
     * - manifest.json (manifest file)
     * - opensearch.xml (opensearch file)
     * - server-worker.js (server worker file)
     * - workbox-*.js (workbox files)
     */
    {
      source:
        '/((?!api|static|_next/static|_next/image|favicon.ico|robots.txt|ads.txt|\.well-known|manifest.json|opensearch.xml|server-worker.js|workbox-*.js).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
