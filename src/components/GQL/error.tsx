import { ApolloError } from 'apollo-client'

import { Error, LoginButton, Translate } from '~/components'

import { ADD_TOAST, ERROR_CODES, ErrorCodeKeys } from '~/common/enums'

export const getErrorCodes = (error: ApolloError): ErrorCodeKeys[] => {
  const errorCodes: ErrorCodeKeys[] = []

  if (!error || !error.graphQLErrors) {
    return errorCodes
  }

  error.graphQLErrors.forEach(e => {
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
export const mutationOnError = (error: ApolloError) => {
  // Add info to Sentry
  import('@sentry/browser').then(Sentry => {
    Sentry.captureException(error)
  })

  if (!process.browser) {
    throw error
  }

  const errorCodes = getErrorCodes(error)
  const errorMap: { [key: string]: boolean } = {}
  errorCodes.forEach(code => {
    errorMap[code] = true
  })

  /**
   * Catch auth errors
   */
  const isUnauthenticated = errorMap[ERROR_CODES.UNAUTHENTICATED]
  const isForbidden = errorMap[ERROR_CODES.FORBIDDEN]
  const isTokenInvalid = errorMap[ERROR_CODES.TOKEN_INVALID]

  if (isUnauthenticated || isForbidden || isTokenInvalid) {
    let errorMessage: React.ReactNode

    if (isUnauthenticated) {
      errorMessage = <Translate id="UNAUTHENTICATED" />
    }

    if (isForbidden) {
      errorMessage = <Translate id="FORBIDDEN" />
    }

    if (isTokenInvalid) {
      errorMessage = <Translate id="TOKEN_INVALID" />
    }

    return window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: errorMessage,
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center'
        }
      })
    )
  }

  /**
   * Catch common errors
   */
  let isCatched = false
  const CATCH_CODES = [
    ERROR_CODES.UNKNOWN_ERROR,
    ERROR_CODES.NETWORK_ERROR,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    ERROR_CODES.BAD_USER_INPUT,
    ERROR_CODES.ENTITY_NOT_FOUND,
    ERROR_CODES.USER_NOT_FOUND,
    ERROR_CODES.COMMENT_NOT_FOUND,
    ERROR_CODES.ARTICLE_NOT_FOUND,
    ERROR_CODES.ASSET_NOT_FOUND,
    ERROR_CODES.DRAFT_NOT_FOUND,
    ERROR_CODES.TAG_NOT_FOUND,
    ERROR_CODES.NOTICE_NOT_FOUND,
    ERROR_CODES.NOT_ENOUGH_MAT,
    ERROR_CODES.ACTION_FAILED,
    ERROR_CODES.UNABLE_TO_UPLOAD_FROM_URL,
    ERROR_CODES.LIKER_NOT_FOUND,
    ERROR_CODES.LIKER_USER_ID_EXISTS,
    ERROR_CODES.LIKER_EMAIL_EXISTS
  ] as ErrorCodeKeys[]
  CATCH_CODES.forEach(code => {
    if (errorMap[code]) {
      isCatched = true
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id={code} />
          }
        })
      )
    }
  })
  if (isCatched) {
    return
  }

  /**
   * Throw error
   */
  throw error
}

/**
 * Pass an `useQuery` or `useLazyQuery` error and return `<Error>`
 */

export const QueryError = ({ error }: { error: ApolloError }) => {
  // Add info to Sentry
  import('@sentry/browser').then(Sentry => {
    Sentry.captureException(error)
  })

  const errorCodes = getErrorCodes(error)

  return <Error statusCode={errorCodes[0]} type="network" error={error} />
}
