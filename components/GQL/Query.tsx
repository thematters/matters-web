import React from 'react'
import { Query as ApolloQuery, QueryProps } from 'react-apollo'

import ErrorBoundary from '~/components/ErrorBoundary'

import { QueryErrorHandler } from './GraphqlErrorHandler'

export const Query = ({ children, ...rest }: QueryProps) => (
  <ErrorBoundary>
    <ApolloQuery errorPolicy="all" {...rest}>
      {result => (
        <QueryErrorHandler result={result}>{children}</QueryErrorHandler>
      )}
    </ApolloQuery>
  </ErrorBoundary>
)
