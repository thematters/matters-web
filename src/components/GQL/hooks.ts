import {
  MutationOptions,
  MutationTuple,
  OperationVariables,
  useMutation as baseUseMutation,
} from '@apollo/client'
import { DocumentNode } from 'graphql'

import { mutationOnError } from './error'

export const useMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutate, result] = baseUseMutation(mutation, {
    onError: mutationOnError,
    ...options,
  })

  return [mutate, result]
}
