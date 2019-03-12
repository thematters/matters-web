import { ApolloError } from 'apollo-client'
import React from 'react'
import {
  MutationFn,
  MutationProps,
  MutationResult,
  QueryProps,
  QueryResult
} from 'react-apollo'

import { Translate } from '~/components/Language'
import { ModalSwitch } from '~/components/ModalManager'

import { ERROR_CODES } from '~/common/enums'

export const checkFor = (code: string, errors: ApolloError['graphQLErrors']) =>
  errors && errors.find(e => e.extensions.code === code)

const checkError = (error: ApolloError) => {
  if (!process.browser) {
    throw error
  }

  const isUnauthenticated = checkFor(
    ERROR_CODES.UNAUTHENTICATED,
    error.graphQLErrors
  )
  const isForbidden = checkFor(ERROR_CODES.FORBIDDEN, error.graphQLErrors)
  const isTokenInvalid = checkFor(
    ERROR_CODES.TOKEN_INVALID,
    error.graphQLErrors
  )

  if (isUnauthenticated || isForbidden || isTokenInvalid) {
    let content

    if (isUnauthenticated) {
      content = (
        <Translate zh_hant="請先登入再進行操作" zh_hans="请先登入再进行操作" />
      )
    }

    if (isForbidden) {
      content = (
        <Translate
          zh_hant="你尚無權限進行該操作"
          zh_hans="你尚无权限进行该操作"
        />
      )
    }

    if (isTokenInvalid) {
      content = (
        <Translate
          zh_hant="登入信息已失效，請重新登入"
          zh_hans="登入信息已失效，请重新登入"
        />
      )
    }

    window.dispatchEvent(
      new CustomEvent('addToast', {
        detail: {
          color: 'red',
          content,
          buttonPlacement: 'center',
          customButton: (
            <ModalSwitch modalId="loginModal">
              {(open: any) => (
                <button type="button" onClick={() => open()}>
                  登入
                </button>
              )}
            </ModalSwitch>
          )
        }
      })
    )
    return
  }

  throw error
}

export const QueryErrorHandler = ({
  result,
  children
}: {
  result: QueryResult
  children: QueryProps['children']
}) => {
  if (result.error) {
    checkError(result.error)
  }

  return <>{children(result)}</>
}

export const MutationErrorHandler = ({
  result,
  mutateFn,
  children
}: {
  result: MutationResult
  mutateFn: MutationFn
  children: MutationProps['children']
}) => {
  if (result.error) {
    checkError(result.error)
  }

  const mutateWithCatch: MutationFn = async options => {
    try {
      const mutationResult = await mutateFn(options)
      return mutationResult
    } catch (err) {
      checkError(err)
    }
  }

  return <>{children(mutateWithCatch, result)}</>
}
