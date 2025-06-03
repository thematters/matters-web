import {
  LazyQueryHookOptions,
  MutationHookOptions,
  MutationTuple,
  NoInfer,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  QueryTuple,
  useLazyQuery as baseUseLazyQuery,
  useMutation as baseUseMutation,
  useQuery as baseUseQuery,
} from '@apollo/client'
import { DocumentNode } from 'graphql'

import { GQL_CONTEXT_PUBLIC_QUERY_KEY } from '~/common/enums'

import { toastMutationErrors, ToastMutationErrorsOptions } from './error'

/**
 * `useMutation` wrapper with error catching
 *
 */
type CustomMutationProps = ToastMutationErrorsOptions

export const useMutation = <TData = unknown, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<NoInfer<TData>, NoInfer<TVariables>>,
  customMutationProps?: CustomMutationProps
): MutationTuple<TData, TVariables> => {
  const [mutate, result] = baseUseMutation(mutation, {
    onError: (error) => toastMutationErrors(error, customMutationProps),
    ...options,
  })

  return [mutate, result]
}

/**
 * `useQuery` wrappers work with `authLink` of `withApollo.ts` for separating
 * public and private queries;
 *
 * @see {@url https://github.com/thematters/matters-web/issues/1051}
 */
interface CustomQueryProps {
  publicQuery?: boolean
}
export const usePublicQuery = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  options?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>,
  customQueryProps?: CustomQueryProps
): QueryResult<TData, TVariables> => {
  const publicQuery = customQueryProps?.publicQuery

  const result = baseUseQuery(query, {
    ...options,
    context: {
      [GQL_CONTEXT_PUBLIC_QUERY_KEY]:
        typeof publicQuery === 'boolean' ? publicQuery : true,
    },
  })

  return result
}

export const usePublicLazyQuery = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>,
  customQueryProps?: CustomQueryProps
): QueryTuple<TData, TVariables> => {
  const publicQuery = customQueryProps?.publicQuery

  const result = baseUseLazyQuery(query, {
    ...options,
    context: {
      [GQL_CONTEXT_PUBLIC_QUERY_KEY]:
        typeof publicQuery === 'boolean' ? publicQuery : true,
    },
  })

  return result
}

/**
 * Small wrapper around `useQuery` so that we can use it imperatively.
 *
 * @see Credit: https://github.com/apollographql/react-apollo/issues/3499#issuecomment-586039082
 *
 * @example
 * const callQuery = useImperativeQuery(query, options)
 * const handleClick = async () => {
 *   const{ data, error } = await callQuery()
 * }
 */
export const useImperativeQuery = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables> = {}
): QueryResult<TData, TVariables>['refetch'] => {
  const { refetch } = baseUseQuery<TData, TVariables>(query, {
    ...options,
    skip: true,
  })

  const imperativelyCallQuery = (queryVariables?: Partial<TVariables>) => {
    return refetch(queryVariables)
  }

  return imperativelyCallQuery
}
