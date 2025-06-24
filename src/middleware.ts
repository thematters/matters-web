import { print } from 'graphql/language/printer'
import { NextRequest, NextResponse } from 'next/server'

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_ACCESS_TOKEN_EXPIRES_AT,
  COOKIE_LANGUAGE,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_GROUP,
} from '~/common/enums/cookie'
import { USER_COOKIE_EXPIRES_IN_MS } from '~/common/enums/time'
import { getTokenExpiration, isTokenExpired } from '~/common/utils/token'
import { REFRESH_TOKEN } from '~/components/GQL/mutations/refreshToken'

import { RefreshTokenMutation } from './gql/graphql'

type RefreshTokenResponse = RefreshTokenMutation['refreshToken']

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

// not yet supports for TLD like .co.jp
// use https://www.npmjs.com/package/psl if needed
const extractRootDomain = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const parts = url.match(/^(https?\:\/\/)?([^\/?#]+)(?:[\/?#]|$)/i)

  if (!parts) {
    return
  }

  return parts[2].split('.').slice(-2).join('.')
}

// Refresh tokens using the GraphQL API
async function refreshTokens(
  accessToken: string,
  refreshToken: string
): Promise<RefreshTokenResponse | null> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${COOKIE_ACCESS_TOKEN}=${accessToken}; ${COOKIE_REFRESH_TOKEN}=${refreshToken}`,
      },
      body: JSON.stringify({ query: print(REFRESH_TOKEN) }),
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.errors || !data.data?.refreshToken?.accessToken) {
      return null
    }

    return data.data.refreshToken
  } catch (error) {
    console.error('[Middleware] Token refresh failed:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  // Skip for local environment and Vercel Preview
  if (isLocal || process.env.NEXT_PUBLIC_VERCEL) {
    return NextResponse.next()
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(COOKIE_REFRESH_TOKEN)?.value

  if (!accessToken || !refreshToken) {
    return NextResponse.next()
  }

  // Check if access token is expired
  if (!isTokenExpired(accessToken)) {
    return NextResponse.next({ request })
  }

  // Prepare cookie options
  const tld = extractRootDomain(request.url)
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    domain: tld,
    expires: new Date(Date.now() + USER_COOKIE_EXPIRES_IN_MS),
  }

  // Attempt to refresh tokens
  const newTokens = await refreshTokens(accessToken, refreshToken)

  // Refresh failed, clear all auth cookies
  if (
    !newTokens ||
    !newTokens.accessToken ||
    !newTokens.refreshToken ||
    !newTokens.user
  ) {
    // Reset cookies for incoming request
    request.cookies.delete(COOKIE_ACCESS_TOKEN)
    request.cookies.delete(COOKIE_REFRESH_TOKEN)
    const response = NextResponse.next({ request })

    // Reset cookies for outgoing response
    response.cookies.delete({ name: COOKIE_ACCESS_TOKEN, ...cookieOptions })
    response.cookies.delete({ name: COOKIE_REFRESH_TOKEN, ...cookieOptions })
    response.cookies.delete({
      name: COOKIE_ACCESS_TOKEN_EXPIRES_AT,
      ...cookieOptions,
      httpOnly: false,
    })
    return response
  }

  // Refresh succeeded, update request cookies with new tokens
  request.cookies.set(COOKIE_ACCESS_TOKEN, newTokens.accessToken)
  request.cookies.set(COOKIE_REFRESH_TOKEN, newTokens.refreshToken)
  request.cookies.set(COOKIE_LANGUAGE, newTokens.user.settings.language)
  request.cookies.set(COOKIE_USER_GROUP, newTokens.user.info.group)

  const response = NextResponse.next({ request })

  // Set new tokens in response
  const accessTokenExpiration = getTokenExpiration(newTokens.accessToken)
  const refreshTokenExpiration = getTokenExpiration(newTokens.refreshToken)
  response.cookies.set(COOKIE_ACCESS_TOKEN, newTokens.accessToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + accessTokenExpiration!),
  })
  response.cookies.set(COOKIE_REFRESH_TOKEN, newTokens.refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + refreshTokenExpiration!),
  })
  response.cookies.set(
    COOKIE_ACCESS_TOKEN_EXPIRES_AT,
    accessTokenExpiration!.toString(),
    { ...cookieOptions, httpOnly: false }
  )
  response.cookies.set(
    COOKIE_LANGUAGE,
    newTokens.user.settings.language,
    cookieOptions
  )
  response.cookies.set(
    COOKIE_USER_GROUP,
    newTokens.user.info.group,
    cookieOptions
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static, static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, ads.txt, sitemap.xml, robots.txt, .well-known, manifest.json (metadata files)
     * - server-worker.js,workbox-*.js (server worker file)
     */
    '/((?!api|_next/static|static|manifest.json|_next/image|favicon.ico|ads.txt|sitemap.xml|robots.txt|.well-known(?:/|$)|server-worker.js|workbox-*.js).*)',
  ],
}
