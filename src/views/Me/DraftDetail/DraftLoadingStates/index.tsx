import { ApolloError } from '@apollo/client'
import React, { ReactNode } from 'react'

import { EmptyLayout, SpinnerBlock, Throw404 } from '~/components'
import { QueryError } from '~/components/GQL'
import { DraftDetailQueryQuery } from '~/gql/graphql'

type DraftLoadingStatesProps = {
  loading: boolean
  error?: ApolloError
  draft?: DraftDetailQueryQuery['node']
  isNewDraft: () => boolean
  children?: ReactNode
}

export const DraftLoadingStates: React.FC<DraftLoadingStatesProps> = ({
  loading,
  error,
  draft,
  isNewDraft,
  children,
}) => {
  if (loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!draft && !isNewDraft()) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  if (children) {
    return <>{children}</>
  }

  return null
}
