import React from 'react'

import { EmptyLayout, SpinnerBlock, Throw404 } from '~/components'
import { QueryError } from '~/components/GQL'

type DraftLoadingStatesProps = {
  loading: boolean
  error?: any
  draft?: any
  isNewDraft: () => boolean
}

export const DraftLoadingStates: React.FC<DraftLoadingStatesProps> = ({
  loading,
  error,
  draft,
  isNewDraft,
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

  return null
}
