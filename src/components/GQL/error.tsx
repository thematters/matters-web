import { ApolloError } from 'apollo-client'

import { Error, LoginDialog, Translate } from '~/components'

import { ADD_TOAST, ERROR_CODES, TEXT } from '~/common/enums'

export const getErrorCodes = (error: ApolloError) => {
  const errorCodes: string[] = []

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
      errorMessage = (
        <Translate
          zh_hant={TEXT.zh_hant.error.UNAUTHENTICATED}
          zh_hans={TEXT.zh_hans.error.UNAUTHENTICATED}
        />
      )
    }

    if (isForbidden) {
      errorMessage = (
        <Translate
          zh_hant={TEXT.zh_hant.error.FORBIDDEN}
          zh_hans={TEXT.zh_hans.error.FORBIDDEN}
        />
      )
    }

    if (isTokenInvalid) {
      errorMessage = (
        <Translate
          zh_hant={TEXT.zh_hant.error.TOKEN_INVALID}
          zh_hans={TEXT.zh_hans.error.TOKEN_INVALID}
        />
      )
    }

    return window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: errorMessage,
          buttonPlacement: 'center',
          customButton: (
            <LoginDialog>
              {({ open }) => (
                <button type="button" onClick={open}>
                  <Translate
                    zh_hant={TEXT.zh_hant.login}
                    zh_hans={TEXT.zh_hans.login}
                  />
                </button>
              )}
            </LoginDialog>
          )
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
  ]
  CATCH_CODES.forEach(code => {
    if (errorMap[code]) {
      isCatched = true
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant={TEXT.zh_hant.error[code]}
                zh_hans={TEXT.zh_hans.error[code]}
              />
            )
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
