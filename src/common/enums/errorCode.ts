import { defineMessage, MessageDescriptor } from 'react-intl'

export enum ERROR_CODES {
  // Common
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_USER_INPUT = 'BAD_USER_INPUT',

  ACTION_LIMIT_EXCEEDED = 'ACTION_LIMIT_EXCEEDED',
  ACTION_FAILED = 'ACTION_FAILED',

  UNABLE_TO_UPLOAD_FROM_URL = 'UNABLE_TO_UPLOAD_FROM_URL',

  NAME_INVALID = 'NAME_INVALID',
  NAME_EXISTS = 'NAME_EXISTS',
  DISPLAYNAME_INVALID = 'DISPLAYNAME_INVALID',

  // Auth
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  FORBIDDEN_BY_STATE = 'FORBIDDEN_BY_STATE',
  FORBIDDEN_BY_TARGET_STATE = 'FORBIDDEN_BY_TARGET_STATE',
  TOKEN_INVALID = 'TOKEN_INVALID',

  // Entity
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  COMMENT_NOT_FOUND = 'COMMENT_NOT_FOUND',
  ARTICLE_NOT_FOUND = 'ARTICLE_NOT_FOUND',
  ASSET_NOT_FOUND = 'ASSET_NOT_FOUND',
  DRAFT_NOT_FOUND = 'DRAFT_NOT_FOUND',
  DRAFT_VERSION_CONFLICT = 'DRAFT_VERSION_CONFLICT',
  TAG_NOT_FOUND = 'TAG_NOT_FOUND',
  NOTICE_NOT_FOUND = 'NOTICE_NOT_FOUND',
  CIRCLE_NOT_FOUND = 'CIRCLE_NOT_FOUND',

  // Article
  ARTICLE_REVISION_CONTENT_INVALID = 'ARTICLE_REVISION_CONTENT_INVALID',
  ARTICLE_REVISION_REACH_LIMIT = 'ARTICLE_REVISION_REACH_LIMIT',

  // User
  USER_EMAIL_INVALID = 'USER_EMAIL_INVALID',
  USER_EMAIL_EXISTS = 'USER_EMAIL_EXISTS',
  USER_EMAIL_NOT_FOUND = 'USER_EMAIL_NOT_FOUND',
  USER_PASSWORD_INVALID = 'USER_PASSWORD_INVALID',
  CRYPTO_WALLET_EXISTS = 'CRYPTO_WALLET_EXISTS',
  USER_SOCIAL_ACCOUNT_EXISTS = 'USER_SOCIAL_ACCOUNT_EXISTS',

  // Tag
  DUPLICATE_TAG = 'DUPLICATE_TAG',
  TOO_MANY_TAGS_FOR_ARTICLE = 'TOO_MANY_TAGS_FOR_ARTICLE',
  TAG_EDITORS_REACH_LIMIT = 'TAG_EDITORS_REACH_LIMIT',

  // Circle
  CIRCLE_CREATION_REACH_LIMIT = 'CIRCLE_CREATION_REACH_LIMIT',
  DUPLICATE_CIRCLE = 'DUPLICATE_CIRCLE',
  DUPLICATE_CIRCLE_SUBSCRIPTION = 'DUPLICATE_CIRCLE_SUBSCRIPTION',

  // Verification Code
  CODE_INVALID = 'CODE_INVALID',
  CODE_INACTIVE = 'CODE_INACTIVE',
  CODE_EXPIRED = 'CODE_EXPIRED',

  // LikeCoin
  LIKER_EMAIL_EXISTS = 'LIKER_EMAIL_EXISTS',
  LIKER_USER_ID_EXISTS = 'LIKER_USER_ID_EXISTS',

  // OAuth
  OAUTH_TOKEN_INVALID = 'OAUTH_TOKEN_INVALID',

  // Migration
  MIGRATION_REACH_LIMIT = 'MIGRATION_REACH_LIMIT',

  // Payment
  PAYMENT_AMOUNT_TOO_SMALL = 'PAYMENT_AMOUNT_TOO_SMALL',
  PAYMENT_AMOUNT_INVALID = 'PAYMENT_AMOUNT_INVALID',
  PAYMENT_BALANCE_INSUFFICIENT = 'PAYMENT_BALANCE_INSUFFICIENT',
  PAYMENT_PASSWORD_NOT_SET = 'PAYMENT_PASSWORD_NOT_SET',
  PAYMENT_REACH_MAXIMUM_LIMIT = 'PAYMENT_REACH_MAXIMUM_LIMIT',

  // Translation
  TRANSLATION_INSUFFICIENT_CREDITS = 'TRANSLATION_INSUFFICIENT_CREDITS',
}

export const ERROR_MESSAGES: Partial<{
  [key in ERROR_CODES]: MessageDescriptor
}> = {
  [ERROR_CODES.UNKNOWN_ERROR]: defineMessage({
    defaultMessage: 'Unknown error. Please try again later.',
    id: '/TXBJR',
    description: 'UNKNOWN_ERROR',
  }),
  [ERROR_CODES.NETWORK_ERROR]: defineMessage({
    defaultMessage: 'Please refresh the page and try again.',
    id: 'yToCTn',
    description: 'NETWORK_ERROR',
  }),
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: defineMessage({
    defaultMessage: 'Oops. Something went wrong. Please try again later.',
    id: '0jvbdb',
    description: 'INTERNAL_SERVER_ERROR',
  }),
  [ERROR_CODES.BAD_USER_INPUT]: defineMessage({
    defaultMessage: 'Oops. Something went wrong. Please try again later.',
    id: '73iajM',
    description: 'BAD_USER_INPUT',
  }),
  [ERROR_CODES.ACTION_LIMIT_EXCEEDED]: defineMessage({
    defaultMessage: 'Operation too frequent, please try again later.',
    id: 'zvNfwL',
    description: 'ACTION_LIMIT_EXCEEDED',
  }),
  [ERROR_CODES.ACTION_FAILED]: defineMessage({
    defaultMessage: 'Operation failed, please try again later.',
    id: 'MPEeBy',
    description: 'ACTION_FAILED',
  }),
  [ERROR_CODES.UNABLE_TO_UPLOAD_FROM_URL]: defineMessage({
    defaultMessage:
      'File upload failed, please verify the file link is valid, or manually download and upload again.',
    id: '+o9W2T',
    description: 'UNABLE_TO_UPLOAD_FROM_URL',
  }),
  [ERROR_CODES.NAME_INVALID]: defineMessage({
    defaultMessage: 'Invalid name',
    id: 'n3shsQ',
    description: 'NAME_INVALID',
  }),
  [ERROR_CODES.NAME_EXISTS]: defineMessage({
    defaultMessage: 'This name is already taken.',
    id: 'y4Lyf1',
    description: 'NAME_EXISTS',
  }),
  [ERROR_CODES.DISPLAYNAME_INVALID]: defineMessage({
    defaultMessage: 'Invalid display name',
    id: 'xxDjET',
    description: 'DISPLAYNAME_INVALID',
  }),
  [ERROR_CODES.UNAUTHENTICATED]: defineMessage({
    defaultMessage: 'Please log in.',
    id: 'YPMn9n',
    description: 'UNAUTHENTICATED',
  }),
  [ERROR_CODES.FORBIDDEN]: defineMessage({
    defaultMessage: 'You do not have permission to perform this operation',
    id: 'Ro0CuW',
    description: 'FORBIDDEN',
  }),
  [ERROR_CODES.FORBIDDEN_BY_STATE]: defineMessage({
    defaultMessage: 'You do not have permission to perform this operation',
    id: 'EoeUjA',
    description: 'FORBIDDEN_BY_STATE',
  }),
  [ERROR_CODES.FORBIDDEN_BY_TARGET_STATE]: defineMessage({
    defaultMessage: 'You do not have permissionn to perform this operation',
    id: 'LmiUWG',
    description: 'FORBIDDEN_BY_TARGET_STATE',
  }),
  [ERROR_CODES.TOKEN_INVALID]: defineMessage({
    defaultMessage: 'Please log in again.',
    id: 'QXJQ5G',
    description: 'TOKEN_INVALID',
  }),
  [ERROR_CODES.ENTITY_NOT_FOUND]: defineMessage({
    defaultMessage: 'Entity not found',
    id: '8iciCA',
    description: 'ENTITY_NOT_FOUND',
  }),
  [ERROR_CODES.USER_NOT_FOUND]: defineMessage({
    defaultMessage: 'User not found',
    id: 'S/hoJx',
    description: 'USER_NOT_FOUND',
  }),
  [ERROR_CODES.COMMENT_NOT_FOUND]: defineMessage({
    defaultMessage: 'Comment not found',
    id: 'vJd1we',
    description: 'COMMENT_NOT_FOUND',
  }),
  [ERROR_CODES.ARTICLE_NOT_FOUND]: defineMessage({
    defaultMessage: 'Article not found',
    id: '+rB5Am',
    description: 'ARTICLE_NOT_FOUND',
  }),
  [ERROR_CODES.ASSET_NOT_FOUND]: defineMessage({
    defaultMessage: 'Asset not found',
    id: '4KuZ0o',
    description: 'ASSET_NOT_FOUND',
  }),
  [ERROR_CODES.DRAFT_NOT_FOUND]: defineMessage({
    defaultMessage: 'Draft not found',
    id: 'wDX7zn',
    description: 'DRAFT_NOT_FOUND',
  }),
  [ERROR_CODES.TAG_NOT_FOUND]: defineMessage({
    defaultMessage: 'Tag not found',
    id: 'NNF+3f',
    description: 'TAG_NOT_FOUND',
  }),
  [ERROR_CODES.NOTICE_NOT_FOUND]: defineMessage({
    defaultMessage: 'Notification not found',
    id: 'wMNZJa',
    description: 'NOTICE_NOT_FOUND',
  }),
  [ERROR_CODES.CIRCLE_NOT_FOUND]: defineMessage({
    defaultMessage: 'Circle not found',
    id: '/pnYHM',
    description: 'CIRCLE_NOT_FOUND',
  }),
  [ERROR_CODES.ARTICLE_REVISION_CONTENT_INVALID]: defineMessage({
    defaultMessage: 'Article revision content is invalid',
    id: 'SzrjpI',
    description: 'ARTICLE_REVISION_CONTENT_INVALID',
  }),
  [ERROR_CODES.ARTICLE_REVISION_REACH_LIMIT]: defineMessage({
    defaultMessage: 'Article revision count reach limit',
    id: 'xjHiYx',
    description: 'ARTICLE_REVISION_REACH_LIMIT',
  }),
  [ERROR_CODES.USER_EMAIL_INVALID]: defineMessage({
    defaultMessage: 'Invalid Email',
    id: 'nozN+j',
    description: 'USER_EMAIL_INVALID',
  }),
  [ERROR_CODES.USER_EMAIL_EXISTS]: defineMessage({
    defaultMessage:
      'This email has been used, please go to login or try another one',
    id: 'sg3nVO',
    description: 'USER_EMAIL_EXISTS',
  }),
  [ERROR_CODES.USER_EMAIL_NOT_FOUND]: defineMessage({
    defaultMessage: 'Incorrect email or password',
    id: 'PtV68+',
    description: 'USER_EMAIL_NOT_FOUND',
  }),
  [ERROR_CODES.USER_PASSWORD_INVALID]: defineMessage({
    defaultMessage: 'Incorrect email or password',
    id: '+63O1f',
    description: 'USER_PASSWORD_INVALID',
  }),
  [ERROR_CODES.CRYPTO_WALLET_EXISTS]: defineMessage({
    defaultMessage: 'Wallet is linked to a different account',
    id: 'v8dGSd',
    description: 'CRYPTO_WALLET_EXISTS',
  }),
  [ERROR_CODES.USER_SOCIAL_ACCOUNT_EXISTS]: defineMessage({
    defaultMessage:
      'This Google account is connected to a Matters account. Sign in to that account to disconnect it then try again',
    id: 'AEiogR',
    description: 'USER_SOCIAL_ACCOUNT_EXISTS',
  }),
  [ERROR_CODES.DUPLICATE_TAG]: defineMessage({
    defaultMessage: 'This tag is already taken',
    id: '5MDA6O',
    description: 'DUPLICATE_TAG',
  }),
  [ERROR_CODES.TOO_MANY_TAGS_FOR_ARTICLE]: defineMessage({
    defaultMessage: 'Add up to 5 tags',
    id: 'tQ3+Xo',
    description: 'TOO_MANY_TAGS_FOR_ARTICLE',
  }),
  [ERROR_CODES.TAG_EDITORS_REACH_LIMIT]: defineMessage({
    defaultMessage: 'Maximum 4 editors allowed for each tag',
    id: 'XmnzQT',
    description: 'TAG_EDITORS_REACH_LIMIT',
  }),
  [ERROR_CODES.CIRCLE_CREATION_REACH_LIMIT]: defineMessage({
    defaultMessage: 'Each user can only create one circle.',
    id: 'T2kMnM',
    description: 'CIRCLE_CREATION_REACH_LIMIT',
  }),
  [ERROR_CODES.DUPLICATE_CIRCLE]: defineMessage({
    defaultMessage: 'This circle is already taken.',
    id: 'n6ZdqD',
    description: 'DUPLICATE_CIRCLE',
  }),
  [ERROR_CODES.DUPLICATE_CIRCLE_SUBSCRIPTION]: defineMessage({
    defaultMessage: 'Already subscribed to this circle.',
    id: 'cYvIpp',
    description: 'DUPLICATE_CIRCLE_SUBSCRIPTION',
  }),
  [ERROR_CODES.CODE_INVALID]: defineMessage({
    defaultMessage:
      'Incorrect verification code. Please check your input, or try resend',
    id: 'lI2l2/',
    description: 'CODE_INVALID',
  }),
  [ERROR_CODES.CODE_INACTIVE]: defineMessage({
    defaultMessage:
      'Verification code is no longer valid. Please use the latest code we sent, or try resend',
    id: 'mu01Gw',
    description: 'CODE_INACTIVE',
  }),
  [ERROR_CODES.CODE_EXPIRED]: defineMessage({
    defaultMessage: 'Verification code expired, try resend',
    id: 'rZyVay',
    description: 'CODE_EXPIRED',
  }),
  [ERROR_CODES.LIKER_EMAIL_EXISTS]: defineMessage({
    defaultMessage: 'Liker ID email is already taken.',
    id: '5sWnog',
    description: 'LIKER_EMAIL_EXISTS',
  }),
  [ERROR_CODES.LIKER_USER_ID_EXISTS]: defineMessage({
    defaultMessage: 'Liker ID is already taken.',
    id: '1y1U9f',
    description: 'LIKER_USER_ID_EXISTS',
  }),
  [ERROR_CODES.OAUTH_TOKEN_INVALID]: defineMessage({
    defaultMessage: 'Please log in again.',
    id: '6N2LKY',
    description: 'OAUTH_TOKEN_INVALID',
  }),
  [ERROR_CODES.MIGRATION_REACH_LIMIT]: defineMessage({
    defaultMessage: '1 MB maximum',
    id: 'pjunBi',
    description: 'MIGRATION_REACH_LIMIT',
  }),
  [ERROR_CODES.PAYMENT_AMOUNT_TOO_SMALL]: defineMessage({
    defaultMessage: 'The payment amount is too small, please re-enter.',
    id: 'Avukw5',
    description: 'PAYMENT_AMOUNT_TOO_SMALL',
  }),
  [ERROR_CODES.PAYMENT_AMOUNT_INVALID]: defineMessage({
    defaultMessage: 'The payment amount is invalid, please re-enter.',
    id: 'ggS9L7',
    description: 'PAYMENT_AMOUNT_INVALID',
  }),
  [ERROR_CODES.PAYMENT_BALANCE_INSUFFICIENT]: defineMessage({
    defaultMessage: 'Insufficient wallet balance.',
    id: 'XdLnXf',
    description: 'PAYMENT_BALANCE_INSUFFICIENT',
  }),
  [ERROR_CODES.PAYMENT_PASSWORD_NOT_SET]: defineMessage({
    defaultMessage: 'Please set your transcation password.',
    id: 'AwQHHA',
    description: 'PAYMENT_PASSWORD_NOT_SET',
  }),
  [ERROR_CODES.PAYMENT_REACH_MAXIMUM_LIMIT]: defineMessage({
    defaultMessage: 'The daily limit is 5000 HKD',
    id: 'cufo9X',
    description: 'PAYMENT_REACH_MAXIMUM_LIMIT',
  }),
  [ERROR_CODES.TRANSLATION_INSUFFICIENT_CREDITS]: defineMessage({
    defaultMessage: 'Translation quota exhausted. Try later.',
    id: 'B1UqZN',
    description: 'TRANSLATION_INSUFFICIENT_CREDITS',
  }),
}
