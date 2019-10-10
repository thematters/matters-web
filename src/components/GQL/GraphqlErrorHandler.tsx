import _get from 'lodash/get'
import React from 'react'
import { MutationResult, QueryResult } from 'react-apollo'

import { checkError } from './error'

export const QueryErrorHandler = ({
  result,
  children
}: {
  result: QueryResult
  children: any
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
  mutateFn: any
  children: any
}) => {
  const mutateWithCatch: any = async (options: any) => {
    try {
      const mutationResult = await mutateFn(options)
      return mutationResult
    } catch (err) {
      checkError(err)
    }
  }

  return <>{children(mutateWithCatch, result)}</>
}
