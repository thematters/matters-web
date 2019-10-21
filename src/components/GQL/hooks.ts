import { OperationVariables } from '@apollo/react-common'
import { DocumentNode } from 'graphql'
import {
  MutationHookOptions,
  MutationTuple,
  useMutation as baseUseMutation
} from 'react-apollo'

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
