import { OperationVariables, QueryResult } from '@apollo/react-common'
import { LazyQueryHookOptions, QueryLazyOptions } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import {
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  useLazyQuery as baseUseLazyQuery,
  useMutation as baseUseMutation,
  useQuery as baseUseQuery
} from 'react-apollo'

import { checkError } from './error'

export const useQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const result = baseUseQuery(query, {
    errorPolicy: 'all',
    onError: error => checkError(error),
    ...options
  })

  return result
}

export const useLazyQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>
): [
  (options?: QueryLazyOptions<TVariables> | undefined) => void,
  QueryResult<TData, TVariables>
] => {
  const [lazyQuery, result] = baseUseLazyQuery(query, {
    errorPolicy: 'all',
    onError: error => checkError(error),
    ...options
  })

  return [lazyQuery, result]
}

export const useMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutate, result] = baseUseMutation(mutation, {
    onError: error => checkError(error),
    ...options
  })

  return [mutate, result]
}
