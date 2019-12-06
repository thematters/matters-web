import gql from 'graphql-tag'
import { DraftDetailQuery_node_Draft } from '~/views/Me/DraftDetail/__generated__/DraftDetailQuery'

import { useMutation } from '~/components/GQL'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { PublishArticle } from './__generated__/PublishArticle'
import PublishSlide from './PublishSlide'
import styles from './styles.css'

/**
 * This component is for publishing modal.
 *
 * Usage:
 *
 * ```jsx
 *   <PublishModal
 *     close={close}
 *     draftId={draftId}
 *   />
 * ```
 */

interface Props extends ModalInstanceProps {
  draft: DraftDetailQuery_node_Draft
}

const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($draftId: ID!) {
    publishArticle(input: { id: $draftId }) {
      id
      publishState
      scheduledAt
    }
  }
`

export const PublishModal: React.FC<Props> = ({ close, draft }) => {
  const draftId = draft.id
  const hasContent = draft.content && draft.content.length > 0
  const hasTitle = draft.title && draft.title.length > 0
  const isUnpublished = draft.publishState === 'unpublished'
  const publishable = draftId && isUnpublished && hasContent && hasTitle

  const [publish] = useMutation<PublishArticle>(PUBLISH_ARTICLE, {
    optimisticResponse: {
      publishArticle: {
        id: draftId,
        scheduledAt: new Date(Date.now() + 1000).toISOString(),
        publishState: 'pending' as any,
        __typename: 'Draft'
      }
    }
  })

  return (
    <section>
      <Modal.Content layout="full-width" spacing="none">
        <PublishSlide />
      </Modal.Content>

      <div className="buttons">
        <Modal.FooterButton
          onClick={() => {
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_SAVE_DRAFT_IN_MODAL)
            close()
          }}
          bgColor="white"
        >
          <Translate zh_hant="暫存作品" zh_hans="暫存作品" />
        </Modal.FooterButton>

        <Modal.FooterButton
          disabled={!publishable}
          onClick={async () => {
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_PUBLISH_IN_MODAL)
            const { data } = await publish({ variables: { draftId } })
            const state = data?.publishArticle.publishState || 'unpublished'

            if (state === 'pending' || state === 'published') {
              close()
            }
          }}
        >
          <Translate zh_hant="發佈作品" zh_hans="发布作品" />
        </Modal.FooterButton>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}
