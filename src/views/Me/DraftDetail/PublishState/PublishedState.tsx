import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Dialog, ShareDialog, useImperativeQuery } from '~/components'
import { MeDraftFeedQuery, PublishStateDraftFragment } from '~/gql/graphql'

import { ME_DRAFTS_FEED } from '../../Drafts/gql'

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
  const router = useRouter()

  // refetch /me/drafts on published
  const refetch = useImperativeQuery<MeDraftFeedQuery>(ME_DRAFTS_FEED, {
    variables: { id: draft.id },
  })
  useEffect(() => {
    refetch()
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
      title={draft.article.title}
      path={encodeURI(path.href)}
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
