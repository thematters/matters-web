import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Dialog, Spinner, Translate } from '~/components'
import { QueryError, useMutation } from '~/components/GQL'
import Throw404 from '~/components/Throw404'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, getQuery } from '~/common/utils'

import PublishSlide from './PublishSlide'

import { DraftPublishDialog } from './__generated__/DraftPublishDialog'
import { PublishArticle } from './__generated__/PublishArticle'

interface PublishContentProps {
  close: () => void
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

const PublishContent: React.FC<PublishContentProps> = ({ close }) => {
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

  return (
    <>
      <Dialog.Content spacing={[0, 0]}>
        <PublishSlide />
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Button
          onClick={() => {
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_SAVE_DRAFT_IN_MODAL)
            close()
          }}
          bgColor="grey-lighter"
          textColor="black"
        >
          <Translate zh_hant="暫存作品" zh_hans="暫存作品" />
        </Dialog.Button>

        <Dialog.Button
          disabled={!publishable}
          onClick={async () => {
            const { data: publishData } = await publish({ variables: { id } })
            const state =
              publishData?.publishArticle.publishState || 'unpublished'

            if (state === 'pending' || state === 'published') {
              close()
            }

            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_PUBLISH_IN_MODAL)
          }}
        >
          <Translate
            zh_hant={TEXT.zh_hant.publish}
            zh_hans={TEXT.zh_hans.publish}
          />
        </Dialog.Button>
      </Dialog.Footer>
    </>
  )
}

export default PublishContent
