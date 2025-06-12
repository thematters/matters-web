import { ApolloError } from '@apollo/client'
import * as Sentry from '@sentry/nextjs'
import { GraphQLFormattedError } from 'graphql'
import { FormattedMessage } from 'react-intl'

import {
  CLOSE_ACTIVE_DIALOG,
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Error, toast } from '~/components'

export interface MattersGraphQLFormattedError extends GraphQLFormattedError {
  readonly extensions?: {
    code?: ERROR_CODES
    [key: string]: unknown
  }
}

export const getErrorCodes = (error?: ApolloError): ERROR_CODES[] => {
  const errorCodes: ERROR_CODES[] = []

  if (!error || !error.graphQLErrors) {
    return errorCodes
  }

  error.graphQLErrors.forEach((e: MattersGraphQLFormattedError) => {
    const code = e.extensions?.code
    if (code) {
      errorCodes.push(code)
    }
  })

  return errorCodes
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
  let { showToast, showLoginToast } = options || {}
  const { toastType = 'error', customErrors } = options || {}
  showToast = typeof showToast === 'undefined' ? true : showToast
  showLoginToast = typeof showLoginToast === 'undefined' ? true : showLoginToast

  // Add info to Sentry
  Sentry.captureException(error)

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

  if (!customErrorMessage && !errorMessage) {
    throw error
  }

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
              id="skbUBl"
              description="src/components/Buttons/Login/index.tsx"
            />
          ),
          onClick: () => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(
              new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                detail: { trigger: UNIVERSAL_AUTH_TRIGGER.error },
              })
            )
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
  Sentry.captureException(error)

  // const errorCodes = getErrorCodes(error)

  return <Error type="network" error={error} />
}
