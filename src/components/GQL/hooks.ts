import { OperationVariables, QueryResult } from '@apollo/react-common'
import {
  LazyQueryHookOptions,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryTuple,
  useLazyQuery as baseUseLazyQuery,
  useMutation as baseUseMutation,
  useQuery as baseUseQuery,
} from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'

import { GQL_CONTEXT_PUBLIC_QUERY_KEY } from '~/common/enums'

import { useRoute } from '../Hook'
import { toastMutationErrors, ToastMutationErrorsOptions } from './error'

/**
 * `useMutation` wrapper with error catching
 *
 */
type CustomMutationProps = ToastMutationErrorsOptions

export const useMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
  customMutationProps?: CustomMutationProps
): MutationTuple<TData, TVariables> => {
  const { isInPath } = useRoute()
  const isInCallback = isInPath('CALLBACK_PROVIDER')
  const shouldToast = !isInCallback
  const [mutate, result] = baseUseMutation(mutation, {
    onError: (error) =>
      toastMutationErrors(error, shouldToast, customMutationProps),
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
export const usePublicQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
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
  TData = any,
  TVariables = OperationVariables,
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>,
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
  TData = any,
  TVariables = OperationVariables,
>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables> = {}
): QueryResult<TData, TVariables>['refetch'] => {
  const { refetch } = baseUseQuery<TData, TVariables>(query, {
    ...options,
    skip: true,
  })

  const imperativelyCallQuery = (queryVariables: TVariables) => {
    return refetch(queryVariables)
  }

  return imperativelyCallQuery
}
