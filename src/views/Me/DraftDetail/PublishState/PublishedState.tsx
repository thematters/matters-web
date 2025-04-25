import { useApolloClient } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { MAX_META_SUMMARY_LENGTH } from '~/common/enums'
import { makeSummary, toPath } from '~/common/utils'
import { Dialog, ShareDialog, useRoute, ViewerContext } from '~/components'
import { PublishStateDraftFragment } from '~/gql/graphql'

const BasePublishedState = ({
  openShareDialog,
}: {
  openShareDialog: () => void
}) => {
  useEffect(() => {
    openShareDialog()
  }, [])

  return null
}

const PublishedState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  const viewer = useContext(ViewerContext)
  const { router } = useRoute()
  const client = useApolloClient()

  useEffect(() => {
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
  }, [])

  if (!draft.article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article: draft.article,
  })

  return (
    <ShareDialog
      disableNativeShare
      title={
        draft.article.author?.displayName
          ? `${makeSummary(draft.article.title, MAX_META_SUMMARY_LENGTH)} - ${draft.article.author.displayName} - Matters`
          : `${makeSummary(draft.article.title, MAX_META_SUMMARY_LENGTH)} - Matters`
      }
      path={path.href}
      description={
        <p>
          <FormattedMessage
            defaultMessage="Article successfully published. Share it on different platforms to receive more likes and donations!"
            id="0zZd0T"
            description="src/views/Me/DraftDetail/PublishState/PublishedState.tsx"
          />
        </p>
      }
      headerTitle={
        <FormattedMessage
          defaultMessage="Article published"
          id="Lhhi5l"
          description="src/views/Me/DraftDetail/PublishState/PublishedState.tsx"
        />
      }
      btns={
        <Dialog.RoundedButton
          text={
            <FormattedMessage
              defaultMessage="View article"
              id="YWQTXE"
              description="src/views/Me/DraftDetail/PublishState/PublishedState.tsx"
            />
          }
          onClick={() => router.replace(path.href)}
        />
      }
      smUpBtns={
        <Dialog.TextButton
          text={
            <FormattedMessage
              defaultMessage="View article"
              id="YWQTXE"
              description="src/views/Me/DraftDetail/PublishState/PublishedState.tsx"
            />
          }
          onClick={() => router.replace(path.href)}
        />
      }
    >
      {({ openDialog }) => <BasePublishedState openShareDialog={openDialog} />}
    </ShareDialog>
  )
}

export default PublishedState
