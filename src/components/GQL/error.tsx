import { ApolloError } from 'apollo-client'

import { Error, LoginButton, Translate } from '~/components'

import { ADD_TOAST, ErrorCodeKeys, ERROR_CODES } from '~/common/enums'

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
 * Check mutation on error to throw a `<Toast>`
 */
export type MutationOnErrorOptions = {
  showToast?: boolean
}
export const mutationOnError = (
  error: ApolloError,
  options?: MutationOnErrorOptions
) => {
  const { showToast } = options || { showToast: true }

  // Add info to Sentry
  import('@sentry/browser').then((Sentry) => {
    Sentry.captureException(error)
  })

  if (!process.browser) {
    throw error
  }

  const errorCodes = getErrorCodes(error)
  const errorMap: { [key: string]: boolean } = {}
  errorCodes.forEach((code) => {
    errorMap[code] = true
  })

  /**
   * Catch auth errors
   */
  const isUnauthenticated = errorMap[ERROR_CODES.UNAUTHENTICATED]
  const isForbidden = errorMap[ERROR_CODES.FORBIDDEN]
  const isTokenInvalid = errorMap[ERROR_CODES.TOKEN_INVALID]

  if (isUnauthenticated || isForbidden || isTokenInvalid) {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: errorCodes[0],
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )

    throw error
  }

  if (showToast) {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id={errorCodes[0]} />,
        },
      })
    )
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
