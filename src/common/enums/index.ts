export * from './analytics'
export * from './article'
export * from './channel'
export * from './chart'
export * from './contract'
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

export const USER_PROFILE_WRITINGS_DIGEST_FEED_PREFIX =
  'user-profile-writings-digest-feed-'

export const MAX_ARTICE_TITLE_LENGTH = 100
export const MAX_ARTICE_SUMMARY_LENGTH = 200
export const MAX_ARTICLE_CONTENT_LENGTH = 50e3
export const MAX_ARTICLE_SUPPORT_LENGTH = 140
export const MAX_ARTICLE_COMMENT_LENGTH = 1200

export const MAX_ARTICLE_REVISION_COUNT = 4
export const MAX_ARTICLE_TAG_LENGTH = 3
export const MAX_ARTICLE_COLLECT_LENGTH = 3

export const MAX_MOMENT_CONTENT_LENGTH = 240
export const MAX_MOMENT_COMMENT_LENGTH = 240
export const MAX_FIGURE_CAPTION_LENGTH = 100

export const MAX_TAG_CONTENT_LENGTH = 50
export const MAX_TAG_DESCRIPTION_LENGTH = 200
export const TAG_CONTENT_CLAMP_LENGTH = 7
export const TAG_CONTENT_CLAMP_LATIN_LETTERS_LENGTH = 20

export const MIN_COLLECTION_TITLE_LENGTH = 1
export const MAX_COLLECTION_TITLE_LENGTH = 40
export const MAX_COLLECTION_DESCRIPTION_LENGTH = 200
export const MAX_COLLECTION_ARTICLES_COUNT = 400

export const MIN_CIRCLE_NAME_LENGTH = 2
export const MAX_CIRCLE_NAME_LENGTH = 20

export const MIN_CIRCLE_DISPLAY_NAME_LENGTH = 2
export const MAX_CIRCLE_DISPLAY_NAME_LENGTH = 12

export const MAX_DESCRIPTION_LENGTH = 200
export const MAX_REVISION_DESCRIPTION_LENGTH = 140

export const MIN_USER_DISPLAY_NAME_LENGTH = 2
export const MAX_USER_DISPLAY_NAME_LENGTH = 20
export const MAX_USER_DESCRIPTION_LENGTH = 140
export const MIN_USER_NAME_LENGTH = 4
export const MAX_USER_NAME_LENGTH = 15

export const MIN_PASSWORD_LENGTH = 8

export const MAX_CHANGE_EMAIL_TIME_DAILY = 3

export const MAX_FEED_SUMMARY_LENGTH = 140
export const MAX_META_SUMMARY_LENGTH = 20
export const MAX_NOTICE_SUMMARY_LENGTH = 10
