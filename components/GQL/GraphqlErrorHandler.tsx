import _get from 'lodash/get'
import React from 'react'
import {
  MutationFn,
  MutationProps,
  MutationResult,
  QueryProps,
  QueryResult
} from 'react-apollo'

import { checkError } from './error'

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
