import Cookie, { CookieAttributes } from 'js-cookie'

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_ACCESS_TOKEN_EXPIRES_AT,
  COOKIE_LANGUAGE,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_GROUP,
  USER_COOKIE_EXPIRES_IN_MS,
} from '~/common/enums'

import { getTokenExpiration } from './token'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

export const getCookieOptions = (): CookieAttributes => {
  return {
    expires: new Date(Date.now() + USER_COOKIE_EXPIRES_IN_MS),
    secure: window.location.href.includes('https://'),
    sameSite: 'Lax',
  }
}

export const getIsomorphicCookie = (cookie: string, name: string) => {
  if (!cookie) {
    return ''
  }

  const regexp = new RegExp(`(^| )${name}=([^;]+)`)
  const match = cookie.match(regexp)

  return match ? match[2] : ''
}

export const getCookie = (name: string) => {
  if (isLocal) {
    console.log('[cookie:GET]', name)
  }
  return Cookie.get(name)
}

export const setCookies = (cookies: { [name: string]: string }) => {
  const options = getCookieOptions()

  const names = Object.keys(cookies)
  names.forEach((name) => {
    if (isLocal) {
      console.log('[cookie:SET]', name, cookies[name])
    }
    Cookie.set(name, cookies[name], options)
  })
}

export const removeCookies = (names: string[]) => {
  const options = getCookieOptions()
  names.forEach((name) => {
    if (isLocal) {
      console.log('[cookie:REMOVE]', names)
    }
    Cookie.remove(name, options)
  })
}

/**
 * Set authentication tokens (access and refresh) and user metadata
 * This function handles both cookie storage (for server-side) and localStorage (for client-side expiration tracking)
 */
export const setAuthCookies = ({
  accessToken,
  refreshToken,
  language,
  group,
}: {
  accessToken: string
  refreshToken: string
  language: string
  group: string
}) => {
  // Store expiration metadata for client-side checking
  const accessTokenExpiration = getTokenExpiration(accessToken)
  if (accessTokenExpiration) {
    setCookies({
      [COOKIE_ACCESS_TOKEN_EXPIRES_AT]: accessTokenExpiration.toString(),
    })
  }

  // Set local cookies (httpOnly=false) for SSR server
  // since cookies from API server is not same-site
  if (isLocal || process.env.NEXT_PUBLIC_VERCEL) {
    setCookies({
      [COOKIE_ACCESS_TOKEN]: accessToken,
      [COOKIE_REFRESH_TOKEN]: refreshToken,
      [COOKIE_LANGUAGE]: language,
      [COOKIE_USER_GROUP]: group,
    })
  }
}

/**
 * Clear all authentication tokens and metadata
 */
export const clearAuthCookies = () => {
  removeCookies([
    COOKIE_ACCESS_TOKEN,
    COOKIE_REFRESH_TOKEN,
    COOKIE_USER_GROUP,
    COOKIE_ACCESS_TOKEN_EXPIRES_AT,
  ])
}
