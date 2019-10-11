import React from 'react'
import { Query as ApolloQuery } from 'react-apollo'

import ErrorBoundary from '~/components/ErrorBoundary'

import { QueryErrorHandler } from './GraphqlErrorHandler'

export const Query = ({ children, ...rest }: any) => (
  <ErrorBoundary>
    <ApolloQuery errorPolicy="all" {...rest}>
      {(result: any) => (
        <QueryErrorHandler result={result}>{children}</QueryErrorHandler>
      )}
    </ApolloQuery>
  </ErrorBoundary>
)
