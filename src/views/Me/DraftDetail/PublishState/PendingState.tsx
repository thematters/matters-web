import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { Layout, Translate } from '~/components'
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

    return () => {
      stopPolling()
    }
  }, [])

  return (
    <Layout.Notice
      color="green"
      content={<FormattedMessage defaultMessage="Publishing..." id="PesLat" />}
      subDescription={
        <Translate
          zh_hant="上鏈後，作品不可刪除，去中心化保存"
          zh_hans="上链后，作品不可删除，去中心化保存"
          en="After publication, your work cannot be deleted."
        />
      }
    />
  )
}

export default PendingState
