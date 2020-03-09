import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Dialog, Spinner, Throw404, Translate } from '~/components'
import { QueryError, useMutation } from '~/components/GQL'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, getQuery } from '~/common/utils'

import PublishSlide from './PublishSlide'

import { DraftPublishDialog } from './__generated__/DraftPublishDialog'
import { PublishArticle } from './__generated__/PublishArticle'

interface PublishContentProps {
  closeDialog: () => void
}

const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(input: { id: $id }) {
      id
      publishState
      scheduledAt
    }
  }
`

const DRAFT_PUBLISH_DIALOG = gql`
  query DraftPublishDialog($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        title
        content
        publishState
      }
    }
  }
`

const PublishContent: React.FC<PublishContentProps> = ({ closeDialog }) => {
  const router = useRouter()
  const id = getQuery({ router, key: 'id' })
  const { data, error, loading } = useQuery<DraftPublishDialog>(
    DRAFT_PUBLISH_DIALOG,
    {
      variables: { id }
    }
  )
  const [publish] = useMutation<PublishArticle>(PUBLISH_ARTICLE, {
    optimisticResponse: {
      publishArticle: {
        id,
        scheduledAt: new Date(Date.now() + 1000).toISOString(),
        publishState: 'pending' as any,
        __typename: 'Draft'
      }
    }
  })

  const draft = data?.node?.__typename === 'Draft' && data.node

  if (error) {
    return <QueryError error={error} />
  }

  if (loading) {
    return <Spinner />
  }

  if (!draft) {
    return <Throw404 />
  }

  const hasContent = draft.content && draft.content.length > 0
  const hasTitle = draft.title && draft.title.length > 0
  const isUnpublished = draft.publishState === 'unpublished'
  const publishable = id && isUnpublished && hasContent && hasTitle
  const onPublish = async () => {
    const { data: publishData } = await publish({ variables: { id } })

    const state = publishData?.publishArticle.publishState || 'unpublished'

    if (state === 'pending' || state === 'published') {
      closeDialog()
    }

    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_PUBLISH_IN_MODAL)
  }

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={<Translate id="publish" />}
      disabled={!publishable}
      onClick={onPublish}
    />
  )

  return (
    <>
      <Dialog.Header
        title="publish"
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]} hasGrow>
        <PublishSlide />
      </Dialog.Content>
    </>
  )
}

export default PublishContent
