import { OperationVariables, QueryResult } from '@apollo/react-common'
import {
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  useMutation as baseUseMutation,
  useQuery as baseUseQuery,
} from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'

import { GQL_CONTEXT_PUBLIC_QUERY_KEY } from '~/common/enums'

import { mutationOnError } from './error'

export const useMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutate, result] = baseUseMutation(mutation, {
    onError: (error) => mutationOnError(error),
    ...options,
  })

  return [mutate, result]
}

export const usePublicQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const result = baseUseQuery(query, {
    ...options,
    context: {
      [GQL_CONTEXT_PUBLIC_QUERY_KEY]: true,
    },
  })

  return result
}
