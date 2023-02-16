const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const prefix = isProd ? '' : '__dev'

export const COOKIE_TOKEN_NAME = prefix + '__access_token'
export const COOKIE_USER_GROUP = prefix + '__user_group'
export const COOKIE_LANGUAGE = prefix + '__language'

export const COOKIE_EXPIRES_IN_DAYS = 90
