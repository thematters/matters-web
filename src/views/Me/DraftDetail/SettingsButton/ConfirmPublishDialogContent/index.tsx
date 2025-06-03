import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IMAGE_PUBLISH from '@/public/static/images/publish-1.svg?url'
import { analytics } from '~/common/utils'
import { Dialog, useMutation, useRoute, ViewerContext } from '~/components'
import { PublishArticleMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface ConfirmPublishDialogContentProps {
  onBack: () => void
  closeDialog: () => void
}

const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(input: { id: $id }) {
      id
      publishState
    }
  }
`

const ConfirmPublishDialogContent: React.FC<
  ConfirmPublishDialogContentProps
> = ({ onBack, closeDialog }) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const draftId = getQuery('draftId')
  const [publish] = useMutation<PublishArticleMutation>(PUBLISH_ARTICLE, {
    update(cache) {
      cache.evict({ id: cache.identify(viewer), fieldName: 'articles' })
      cache.evict({ id: cache.identify(viewer), fieldName: 'writings' })
      cache.gc()
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch()
    },
  })

  const onPublish = async () => {
    publish({ variables: { id: draftId } })
    closeDialog()
  }

  const SubmitButton = (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Publish" id="syEQFE" />}
      onClick={() => {
        onPublish()
        analytics.trackEvent('click_button', {
          type: `publish`,
          pageType: 'edit_draft',
        })
      }}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Notice"
            id="REQGgU"
            description="src/views/Me/DraftDetail/SettingsButton/ConfirmPublishDialogContent/index.tsx"
          />
        }
        leftBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            onClick={onBack}
          />
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        <Dialog.Content.Message align="left" smUpAlign="left">
          <section className={styles.imageContainer}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${IMAGE_PUBLISH.src})` }}
            />
          </section>

          <h2>
            <FormattedMessage defaultMessage="Welcome onboard!" id="1exrSw" />
          </h2>
          <p>
            <FormattedMessage
              defaultMessage="Your work will be stored in IPFS network. Currently the fee is covered by Matters."
              id="1DNHwi"
            />
          </p>
          <ul>
            <li>
              <FormattedMessage
                defaultMessage="Article will be published to IPFS, others can not tamper with it, and you own the copyright."
                id="fxhue9"
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="Content hash and gateway addresses will be public, and can be used for sharing."
                id="SwoXPI"
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="You can edit the article four times after publishing it. You can also archive the original and republish.."
                id="ZOW313"
              />
            </li>
          </ul>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={onBack}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default ConfirmPublishDialogContent
