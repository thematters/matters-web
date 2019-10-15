import React from 'react'
import { Mutation as ApolloMutation } from 'react-apollo'

import { MutationErrorHandler } from './GraphqlErrorHandler'

export const Mutation = ({ children, ...rest }: any) => (
  <ApolloMutation {...rest}>
    {(mutateFn: any, result: any) => (
      <MutationErrorHandler result={result} mutateFn={mutateFn}>
        {children}
      </MutationErrorHandler>
    )}
  </ApolloMutation>
)
