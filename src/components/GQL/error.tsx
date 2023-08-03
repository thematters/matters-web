import { ApolloError } from 'apollo-client'
import { FormattedMessage } from 'react-intl'

import {
  CLOSE_ACTIVE_DIALOG,
  ERROR_CODES,
  ErrorCodeKeys,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEXT,
} from '~/common/enums'
import { Error, toast, Translate } from '~/components'

export const getErrorCodes = (error?: ApolloError): ErrorCodeKeys[] => {
  const errorCodes: ErrorCodeKeys[] = []

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

/**
 * Check error code has corresponding text
 */
export const isErrorCodeValid = (code: string) =>
  code in TEXT.zh_hant && code in TEXT.zh_hans && code in TEXT.en

/**
 * Return translated error content, provide zh_hant message, error code, or error message as fallback
 */
export const getErrorContent = (code: ErrorCodeKeys, error: ApolloError) => {
  if (isErrorCodeValid(code)) return <Translate id={code} />
  else if (code in TEXT.zh_hant) return TEXT.zh_hant[code]
  else if (code) return code
  else return error.message
}

/**
 * Check mutation on error to throw a `<Toast>`
 */
export type MutationOnErrorOptions = {
  showToast?: boolean
  toastType?: 'error' | 'success'
  customErrors?: { [key: string]: string | React.ReactNode }
}
export const mutationOnError = (
  error: ApolloError,
  options?: MutationOnErrorOptions
) => {
  let { showToast, toastType = 'error', customErrors } = options || {}
  showToast = typeof showToast === 'undefined' ? true : showToast

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
  const errorContent =
    (customErrors ? customErrors[errorCode] : '') ||
    getErrorContent(errorCode, error)

  /**
   * Catch auth errors
   */
  const isUnauthenticated = errorMap[ERROR_CODES.UNAUTHENTICATED]
  const isForbidden = errorMap[ERROR_CODES.FORBIDDEN]
  const isTokenInvalid = errorMap[ERROR_CODES.TOKEN_INVALID]

  if (isUnauthenticated || isForbidden || isTokenInvalid) {
    toast[toastType]({
      message: errorContent,
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
      message: errorContent,
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
