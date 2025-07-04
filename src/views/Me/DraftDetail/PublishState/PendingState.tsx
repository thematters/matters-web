import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { toast } from '~/components'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import {
  DraftPublishStateQuery,
  PublishStateDraftFragment,
} from '~/gql/graphql'

const PendingState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  const { startPolling, stopPolling } = useQuery<DraftPublishStateQuery>(
    DRAFT_PUBLISH_STATE,
    {
      variables: { id: draft.id },
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    }
  )

  useEffect(() => {
    startPolling(1000 * 2)

    toast.info({
      message: (
        <FormattedMessage
          defaultMessage="Publishing, please wait..."
          id="Vp5L/O"
        />
      ),
      duration: Infinity,
    })

    return () => {
      stopPolling()
    }
  }, [])

  return null
}

export default PendingState
