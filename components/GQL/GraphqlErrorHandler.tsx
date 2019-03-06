import { ApolloError } from 'apollo-client'
import React from 'react'
import {
  MutationFn,
  MutationProps,
  MutationResult,
  QueryProps,
  QueryResult
} from 'react-apollo'

import { errorCode } from '~/common/enums'

const checkFor = (code: string, errors: ApolloError['graphQLErrors']) =>
  errors && errors.find(e => e.extensions.code === code)

const checkError = ({ networkError, graphQLErrors }: ApolloError) => {
  if (networkError) {
    // should redirect to error page
    console.log(networkError)
  }

  if (checkFor(errorCode.UNAUTHENTICATED, graphQLErrors)) {
    // trigger notification for log in
    console.log(errorCode.UNAUTHENTICATED)
  }
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
      throw err
    }
  }

  return <>{children(mutateWithCatch, result)}</>
}
