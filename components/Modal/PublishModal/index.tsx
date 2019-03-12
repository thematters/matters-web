import gql from 'graphql-tag'
import _get from 'lodash/get'
import { FC } from 'react'

import { Mutation } from '~/components/GQL'
import { Translate } from '~/components/Language'
import ModalContent from '~/components/Modal/Content'

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
  draftId: string
}

const MUTATION_PUBLISH_ARTICLE = gql`
  mutation PublishArticle($draftId: ID!) {
    publishArticle(input: { id: $draftId, delay: 0 }) {
      id
      publishState
      scheduledAt
    }
  }
`

export const PublishModal: FC<Props> = ({ close, draftId }) => {
  const publishArticle = (publish: any) => {
    if (!publish) {
      return undefined
    }

    publish({ variables: { draftId } })
      .then(({ data }: any) => {
        const state = _get(data, 'publishArticle.publishState', 'unpublished')
        if (state === 'pending') {
          close()
        }
      })
      .catch((result: any) => {
        // TODO: Handle error
      })
  }

  return (
    <section>
      <ModalContent
        layout="full-width"
        spacing="none"
        containerStyle={{ padding: 0 }}
      >
        <PublishSlide />
      </ModalContent>
      <div className="buttons">
        <button className="save" onClick={close}>
          <Translate zh_hant="暫存草稿箱" zh_hans="暫存草稿箱" />
        </button>

        <Mutation
          mutation={MUTATION_PUBLISH_ARTICLE}
          optimisticResponse={{
            publishArticle: {
              id: draftId,
              scheduledAt: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
              publishState: 'pending',
              __typename: 'Draft'
            }
          }}
        >
          {publish => (
            <button
              className="publish"
              onClick={() => {
                publishArticle(publish)
              }}
            >
              <Translate zh_hant="發佈" zh_hans="发布" />
            </button>
          )}
        </Mutation>
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}
