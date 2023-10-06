import { ApolloError } from 'apollo-client'
import { FormattedMessage, MessageDescriptor } from 'react-intl'
import { defineMessage } from 'react-intl'

import {
  CLOSE_ACTIVE_DIALOG,
  ERROR_CODES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
} from '~/common/enums'
import { Error, toast } from '~/components'

export const getErrorCodes = (error?: ApolloError): ERROR_CODES[] => {
  const errorCodes: ERROR_CODES[] = []

  if (!error || !error.graphQLErrors) {
    return errorCodes
  }

  error.graphQLErrors.forEach((e) => {
    const code = e.extensions?.code
    if (code) {
      errorCodes.push(code)
    }
  })

  return errorCodes
}

export const ERROR_MESSAGES: { [key in ERROR_CODES]: MessageDescriptor } = {
  [ERROR_CODES.UNKNOWN_ERROR]: defineMessage({
    defaultMessage: 'Unknown error. Please try again later.',
    description: 'UNKNOWN_ERROR',
  }),
  [ERROR_CODES.NETWORK_ERROR]: defineMessage({
    defaultMessage: 'Please refresh the page and try again.',
    description: 'NETWORK_ERROR',
  }),
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: defineMessage({
    defaultMessage: 'Oops. Something went wrong. Please try again later.',
    description: 'INTERNAL_SERVER_ERROR',
  }),
  [ERROR_CODES.BAD_USER_INPUT]: defineMessage({
    defaultMessage: 'Oops. Something went wrong. Please try again later.',
    description: 'BAD_USER_INPUT',
  }),
  [ERROR_CODES.ACTION_LIMIT_EXCEEDED]: defineMessage({
    defaultMessage: 'Operation too frequent, please try again later.',
    description: 'ACTION_LIMIT_EXCEEDED',
  }),
  [ERROR_CODES.ACTION_FAILED]: defineMessage({
    defaultMessage: 'Operation failed, please try again later.',
    description: 'ACTION_FAILED',
  }),
  [ERROR_CODES.UNABLE_TO_UPLOAD_FROM_URL]: defineMessage({
    defaultMessage:
      'File upload failed, please verify the file link is valid, or manually download and upload again.',
    description: 'UNABLE_TO_UPLOAD_FROM_URL',
  }),
  [ERROR_CODES.NAME_INVALID]: defineMessage({
    defaultMessage: 'Invalid name',
    description: 'NAME_INVALID',
  }),
  [ERROR_CODES.NAME_EXISTS]: defineMessage({
    defaultMessage: 'This name is already taken.',
    description: 'NAME_EXISTS',
  }),
  [ERROR_CODES.DISPLAYNAME_INVALID]: defineMessage({
    defaultMessage: 'Invalid display name',
    description: 'DISPLAYNAME_INVALID',
  }),
  [ERROR_CODES.UNAUTHENTICATED]: defineMessage({
    defaultMessage: 'Please log in.',
    description: 'UNAUTHENTICATED',
  }),
  [ERROR_CODES.FORBIDDEN]: defineMessage({
    defaultMessage: 'You do not have permission to perform this operation',
    description: 'FORBIDDEN',
  }),
  [ERROR_CODES.INSUFFICIENT_AUTHORITY]: defineMessage({
    defaultMessage: 'You do not have permission to perform this operation',
    description: 'INSUFFICIENT_AUTHORITY',
  }),
  [ERROR_CODES.FORBIDDEN_BY_STATE]: defineMessage({
    defaultMessage: 'Unavailable',
    description: 'FORBIDDEN_BY_STATE',
  }),
  [ERROR_CODES.FORBIDDEN_BY_TARGET_STATE]: defineMessage({
    defaultMessage: 'You do not have permissionn to perform this operation',
    description: 'FORBIDDEN_BY_TARGET_STATE',
  }),
  [ERROR_CODES.TOKEN_INVALID]: defineMessage({
    defaultMessage: 'Please log in again.',
    description: 'TOKEN_INVALID',
  }),
  [ERROR_CODES.ENTITY_NOT_FOUND]: defineMessage({
    defaultMessage: 'Entity not found',
    description: 'ENTITY_NOT_FOUND',
  }),
  [ERROR_CODES.USER_NOT_FOUND]: defineMessage({
    defaultMessage: 'User not found',
    description: 'USER_NOT_FOUND',
  }),
  [ERROR_CODES.COMMENT_NOT_FOUND]: defineMessage({
    defaultMessage: 'Comment not found',
    description: 'COMMENT_NOT_FOUND',
  }),
  [ERROR_CODES.ARTICLE_NOT_FOUND]: defineMessage({
    defaultMessage: 'Article not found',
    description: 'ARTICLE_NOT_FOUND',
  }),
  [ERROR_CODES.ASSET_NOT_FOUND]: defineMessage({
    defaultMessage: 'Asset not found',
    description: 'ASSET_NOT_FOUND',
  }),
  [ERROR_CODES.DRAFT_NOT_FOUND]: defineMessage({
    defaultMessage: 'Draft not found',
    description: 'DRAFT_NOT_FOUND',
  }),
  [ERROR_CODES.TAG_NOT_FOUND]: defineMessage({
    defaultMessage: 'Tag not found',
    description: 'TAG_NOT_FOUND',
  }),
  [ERROR_CODES.NOTICE_NOT_FOUND]: defineMessage({
    defaultMessage: 'Notification not found',
    description: 'NOTICE_NOT_FOUND',
  }),
  [ERROR_CODES.CIRCLE_NOT_FOUND]: defineMessage({
    defaultMessage: 'Circle not found',
    description: 'CIRCLE_NOT_FOUND',
  }),
  [ERROR_CODES.ARTICLE_REVISION_CONTENT_INVALID]: defineMessage({
    defaultMessage: 'Article revision content is invalid',
    description: 'ARTICLE_REVISION_CONTENT_INVALID',
  }),
  [ERROR_CODES.ARTICLE_REVISION_REACH_LIMIT]: defineMessage({
    defaultMessage: 'Article revision count reach limit',
    description: 'ARTICLE_REVISION_REACH_LIMIT',
  }),
  [ERROR_CODES.USER_EMAIL_INVALID]: defineMessage({
    defaultMessage: 'Invalid Email',
    description: 'USER_EMAIL_INVALID',
  }),
  [ERROR_CODES.USER_EMAIL_EXISTS]: defineMessage({
    defaultMessage:
      'This email has been used, please go to login or try another one',
    description: 'USER_EMAIL_EXISTS',
  }),
  [ERROR_CODES.USER_EMAIL_NOT_FOUND]: defineMessage({
    defaultMessage: 'Incorrect email or password',
    description: 'USER_EMAIL_NOT_FOUND',
  }),
  [ERROR_CODES.USER_PASSWORD_INVALID]: defineMessage({
    defaultMessage: 'Incorrect email or password',
    description: 'USER_PASSWORD_INVALID',
  }),
  [ERROR_CODES.CRYPTO_WALLET_EXISTS]: defineMessage({
    defaultMessage: 'Wallet is linked to a different account',
    description: 'CRYPTO_WALLET_EXISTS',
  }),
  [ERROR_CODES.USER_SOCIAL_ACCOUNT_EXISTS]: defineMessage({
    defaultMessage:
      'This Google account is connected to a Matters account. Sign in to that account to disconnect it then try again',
    description: 'USER_SOCIAL_ACCOUNT_EXISTS',
  }),
  [ERROR_CODES.DUPLICATE_TAG]: defineMessage({
    defaultMessage: 'This tag is already taken',
    description: 'DUPLICATE_TAG',
  }),
  [ERROR_CODES.TOO_MANY_TAGS_FOR_ARTICLE]: defineMessage({
    defaultMessage: 'Add up to 5 tags',
    description: 'TOO_MANY_TAGS_FOR_ARTICLE',
  }),
  [ERROR_CODES.TAG_EDITORS_REACH_LIMIT]: defineMessage({
    defaultMessage: 'Maximum 4 editors allowed for each tag',
    description: 'TAG_EDITORS_REACH_LIMIT',
  }),
  [ERROR_CODES.CIRCLE_CREATION_REACH_LIMIT]: defineMessage({
    defaultMessage: 'Each user can only create one circle.',
    description: 'CIRCLE_CREATION_REACH_LIMIT',
  }),
  [ERROR_CODES.DUPLICATE_CIRCLE]: defineMessage({
    defaultMessage: 'This circle is already taken.',
    description: 'DUPLICATE_CIRCLE',
  }),
  [ERROR_CODES.DUPLICATE_CIRCLE_SUBSCRIPTION]: defineMessage({
    defaultMessage: 'Already subscribed to this circle.',
    description: 'DUPLICATE_CIRCLE_SUBSCRIPTION',
  }),
  [ERROR_CODES.CODE_INVALID]: defineMessage({
    defaultMessage:
      'Incorrect verification code. Please check your input, or try resend',
    description: 'CODE_INVALID',
  }),
  [ERROR_CODES.CODE_INACTIVE]: defineMessage({
    defaultMessage:
      'Verification code is no longer valid. Please use the latest code we sent, or try resend',
    description: 'CODE_INACTIVE',
  }),
  [ERROR_CODES.CODE_EXPIRED]: defineMessage({
    defaultMessage: 'Verification code expired, try resend',
    description: 'CODE_EXPIRED',
  }),
  [ERROR_CODES.LIKER_EMAIL_EXISTS]: defineMessage({
    defaultMessage: 'Liker ID email is already taken.',
    description: 'LIKER_EMAIL_EXISTS',
  }),
  [ERROR_CODES.LIKER_USER_ID_EXISTS]: defineMessage({
    defaultMessage: 'Liker ID is already taken.',
    description: 'LIKER_USER_ID_EXISTS',
  }),
  [ERROR_CODES.OAUTH_TOKEN_INVALID]: defineMessage({
    defaultMessage: 'Please log in again.',
    description: 'OAUTH_TOKEN_INVALID',
  }),
  [ERROR_CODES.MIGRATION_REACH_LIMIT]: defineMessage({
    defaultMessage: '1 MB maximum',
    description: 'MIGRATION_REACH_LIMIT',
  }),
  [ERROR_CODES.PAYMENT_AMOUNT_TOO_SMALL]: defineMessage({
    defaultMessage: 'The payment amount is too small, please re-enter.',
    description: 'PAYMENT_AMOUNT_TOO_SMALL',
  }),
  [ERROR_CODES.PAYMENT_AMOUNT_INVALID]: defineMessage({
    defaultMessage: 'The payment amount is invalid, please re-enter.',
    description: 'PAYMENT_AMOUNT_INVALID',
  }),
  [ERROR_CODES.PAYMENT_BALANCE_INSUFFICIENT]: defineMessage({
    defaultMessage: 'Insufficient wallet balance.',
    description: 'PAYMENT_BALANCE_INSUFFICIENT',
  }),
  [ERROR_CODES.PAYMENT_PASSWORD_NOT_SET]: defineMessage({
    defaultMessage: 'Please set your transcation password.',
    description: 'PAYMENT_PASSWORD_NOT_SET',
  }),
  [ERROR_CODES.PAYMENT_REACH_MAXIMUM_LIMIT]: defineMessage({
    defaultMessage: 'The daily limit is 5000 HKD',
    description: 'PAYMENT_REACH_MAXIMUM_LIMIT',
  }),
}

/**
 * Check mutation on error to throw a `<Toast>`
 */
export type ToastMutationErrorsOptions = {
  showToast?: boolean
  showLoginToast?: boolean
  toastType?: 'error' | 'success'
  customErrors?: { [key: string]: string | React.ReactNode }
}
export const toastMutationErrors = (
  error: ApolloError,
  options?: ToastMutationErrorsOptions
) => {
  let {
    showToast,
    showLoginToast,
    toastType = 'error',
    customErrors,
  } = options || {}
  showToast = typeof showToast === 'undefined' ? true : showToast
  showLoginToast = typeof showLoginToast === 'undefined' ? true : showLoginToast

  // Add info to Sentry
  import('@sentry/browser').then((Sentry) => {
    Sentry.captureException(error)
  })

  if (typeof window === 'undefined') {
    throw error
  }

  const errorCodes = getErrorCodes(error)
  const errorMap: { [key: string]: boolean } = {}
  errorCodes.forEach((code) => {
    errorMap[code] = true
  })

  // Get error code and check corresponding content, if it's invalid
  // then expose error code
  const errorCode = errorCodes[0] || ''
  const customErrorMessage = customErrors ? customErrors[errorCode] : ''
  const errorMessage = ERROR_MESSAGES[errorCode]

  /**
   * Catch auth errors
   */
  const isUnauthenticated = errorMap[ERROR_CODES.UNAUTHENTICATED]
  const isForbidden = errorMap[ERROR_CODES.FORBIDDEN]
  const isTokenInvalid = errorMap[ERROR_CODES.TOKEN_INVALID]

  if (showLoginToast && (isUnauthenticated || isForbidden || isTokenInvalid)) {
    toast[toastType]({
      message: customErrorMessage || <FormattedMessage {...errorMessage} />,
      actions: [
        {
          content: (
            <FormattedMessage
              defaultMessage="Log in"
              description="src/components/Buttons/Login/index.tsx"
            />
          ),
          onClick: () => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
          },
        },
      ],
    })

    throw error
  }

  if (showToast) {
    toast[toastType]({
      message: customErrorMessage || <FormattedMessage {...errorMessage} />,
    })
  }

  throw error
}

/**
 * Pass an `useQuery` or `useLazyQuery` error and return `<Error>`
 */
export const QueryError = ({ error }: { error: ApolloError }) => {
  // Add info to Sentry
  import('@sentry/browser').then((Sentry) => {
    Sentry.captureException(error)
  })

  const errorCodes = getErrorCodes(error)

  return <Error statusCode={errorCodes[0]} type="network" error={error} />
}
