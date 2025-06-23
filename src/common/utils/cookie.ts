import Cookie, { CookieAttributes } from 'js-cookie'

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  STORAGE_ACCESS_TOKEN_EXPIRES_AT,
  USER_COOKIE_EXPIRES_IN_MS,
} from '~/common/enums'

import { decodeJWT } from './token'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

export const getCookieOptions = () => {
  return {
    expires: USER_COOKIE_EXPIRES_IN_MS,
    secure: window.location.href.includes('https://'),
    sameSite: 'Lax',
  } as CookieAttributes
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
 * Set authentication tokens (access and refresh) with proper expiration
 * This function handles both cookie storage (for server-side) and localStorage (for client-side expiration tracking)
 */
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  const options = getCookieOptions()

  // Set access token and refresh token cookie
  Cookie.set(COOKIE_ACCESS_TOKEN, accessToken, options)
  Cookie.set(COOKIE_REFRESH_TOKEN, refreshToken, options)

  // Store expiration metadata in localStorage for client-side checking
  const accessTokenPayload = decodeJWT(accessToken)

  if (accessTokenPayload?.exp) {
    localStorage.setItem(
      STORAGE_ACCESS_TOKEN_EXPIRES_AT,
      (accessTokenPayload.exp * 1000).toString()
    )
  }
}

/**
 * Clear all authentication tokens and metadata
 */
export const clearAuthTokens = () => {
  if (isLocal) {
    console.log('[auth:CLEAR_TOKENS]')
  }

  // Remove cookies
  removeCookies([COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN])

  // Clear localStorage metadata
  localStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRES_AT)
}
