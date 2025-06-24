const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const prefix = isProd ? '' : '__dev'

export const COOKIE_ACCESS_TOKEN = prefix + '__access_token'
export const COOKIE_REFRESH_TOKEN = prefix + '__refresh_token'
export const COOKIE_USER_GROUP = prefix + '__user_group'
export const COOKIE_LANGUAGE = prefix + '__language'

export const COOKIE_ACCESS_TOKEN_EXPIRES_AT =
  prefix + '__access_token_expires_at'
