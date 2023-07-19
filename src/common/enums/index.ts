export * from './analytics'
export * from './chart'
export * from './cookie'
export * from './csp'
export * from './errorCode'
export * from './events'
export * from './externalLinks'
export * from './file'
export * from './hardcode'
export * from './keyValue'
export * from './lang'
export * from './oauth'
export * from './payment'
export * from './responsive'
export * from './route'
export * from './search'
export * from './storage'
export * from './test'
export * from './text'
export * from './time'
export * from './url'
export * from './wallet'

export const Z_INDEX = {
  GLOBAL_HEADER: 100,
  OVER_GLOBAL_HEADER: 101,
  UNDER_GLOBAL_HEADER: 99,
  STICKY_TABS: 110,
  OVER_STICKY_TABS: 111,
  BOTTOM_BAR: 150,
  OVER_BOTTOM_BAR: 151,
  DIALOG: 200,
  OVER_DIALOG: 201,
}

export const AGENT_HASH_PREFIX = 'v1__'

export const IMAGE_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

export const GQL_CONTEXT_PUBLIC_QUERY_KEY = 'publicQuery'

export const VERIFICATION_CODE_TYPES = {
  register: 'register',
  email_reset: 'email_reset',
  email_reset_confirm: 'email_reset_confirm',
  password_reset: 'password_reset',
  payment_password_reset: 'payment_password_reset',
}

export const MAX_ARTICE_TITLE_LENGTH = 100
export const MAX_ARTICE_SUMMARY_LENGTH = 200
export const MAX_ARTICLE_CONTENT_LENGTH = 50e3

export const MAX_ARTICLE_REVISION_COUNT = 4
export const MAX_ARTICLE_REVISION_DIFF = 50
export const MAX_ARTICLE_TAG_LENGTH = 3
export const MAX_ARTICLE_COLLECT_LENGTH = 7

export const MAX_TAG_CONTENT_LENGTH = 50
export const MAX_TAG_DESCRIPTION_LENGTH = 200
export const TAG_CONTENT_CLAMP_LENGTH = 7
export const TAG_CONTENT_CLAMP_LATIN_LETTERS_LENGTH = 20
