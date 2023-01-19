import Cookie, { CookieAttributes } from 'js-cookie'

import { COOKIE_EXPIRES_IN_DAYS } from '~/common/enums'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const getCookieOptions = () => {
  return {
    expires: COOKIE_EXPIRES_IN_DAYS,
    secure: isProd ? window.location.href.includes('https://') : undefined,
    sameSite: isProd ? 'Strict' : undefined,
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
  if (process.env.DEBUG) {
    console.log('[cookie:GET]', name)
  }
  return Cookie.get(name)
}

export const setCookies = (cookies: { [name: string]: string }) => {
  const options = getCookieOptions()

  const names = Object.keys(cookies)
  names.forEach((name) => {
    if (process.env.DEBUG) {
      console.log('[cookie:SET]', name, cookies[name])
    }
    Cookie.set(name, cookies[name], options)
  })
}

export const removeCookies = (names: string[]) => {
  const options = getCookieOptions()
  names.forEach((name) => {
    if (process.env.DEBUG) {
      console.log('[cookie:REMOVE]', names)
    }
    Cookie.remove(name, options)
  })
}
