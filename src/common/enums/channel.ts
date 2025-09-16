export const CHANNEL_PATH_TYPES = {
  WRITING_CHALLENGE: 'e',
  REGULAR_CHANNEL: 'c',
} as const

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
export const FEATUED_CHANNEL_SHORT_HASH = isProd
  ? 'zlkqtdykun21'
  : 'zctb1wb9s2vn'
export const CREATIONS_CHANNEL_SHORT_HASH = isProd
  ? '1ptnue2cleq4'
  : 'r09vjix6reha'
