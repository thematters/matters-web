import { useApolloClient } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { toast, useRoute, ViewerContext } from '~/components'
import { PublishStateDraftFragment } from '~/gql/graphql'

const PublishedState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  const viewer = useContext(ViewerContext)
  const { router } = useRoute()
  const client = useApolloClient()

  useEffect(() => {
    if (!draft.article) {
      return
    }

    // refresh cacahe
    client.refetchQueries({
      updateCache: (cache) => {
        // evict viewer.drafts
        cache.evict({ id: cache.identify(viewer), fieldName: 'drafts' })

        // evict campaign if it exists
        if (draft.campaigns[0] && draft.campaigns[0].campaign) {
          client.cache.evict({
            id: client.cache.identify(draft.campaigns[0].campaign),
          })
        }

        // evict circle if it exists
        if (draft.access.circle) {
          client.cache.evict({
            id: client.cache.identify(draft.access.circle),
          })
        }

        cache.gc()
      },
    })

    // toast success
    toast.info({
      message: (
        <FormattedMessage
          defaultMessage="The article has been successfully published and will be synced to IPFS soon."
          id="s2s6tx"
        />
      ),
    })

    // redirect to article detail
    router.push(
      toPath({
        page: 'articleDetail',
        article: draft.article,
      }).href
    )
  }, [draft.article?.id])

  return null
}

export default PublishedState
