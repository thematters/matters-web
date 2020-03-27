import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, getQuery } from '~/common/utils'

import PublishSlide from './PublishSlide'

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

const PublishContent: React.FC<PublishContentProps> = ({ closeDialog }) => {
  const router = useRouter()
  const id = getQuery({ router, key: 'id' })
  const [publish] = useMutation<PublishArticle>(PUBLISH_ARTICLE, {
    optimisticResponse: {
      publishArticle: {
        id,
        scheduledAt: new Date(Date.now() + 1000).toISOString(),
        publishState: 'pending' as any,
        __typename: 'Draft',
      },
    },
  })

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
