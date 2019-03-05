import React from 'react'
import { Query as ApolloQuery, QueryProps } from 'react-apollo'

import { QueryErrorHandler } from './GraphqlErrorHandler'

export const Query = ({ children, ...rest }: QueryProps) => (
  <ApolloQuery errorPolicy="all" {...rest}>
    {result => (
      <QueryErrorHandler result={result}>{children}</QueryErrorHandler>
    )}
  </ApolloQuery>
)
