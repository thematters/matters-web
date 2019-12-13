import { OperationVariables } from '@apollo/react-common'
import {
  MutationHookOptions,
  MutationTuple,
  useMutation as baseUseMutation
} from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'

import { mutationOnError } from './error'

export const useMutation = <TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> => {
  const [mutate, result] = baseUseMutation(mutation, {
    onError: error => mutationOnError(error),
    ...options
  })

  return [mutate, result]
}
