import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { getQuery } from '~/common/utils'

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
  const id = getQuery({ router, key: 'draftId' })
  const [publish] = useMutation<PublishArticle>(PUBLISH_ARTICLE)

  const onPublish = async () => {
    publish({ variables: { id } })
    closeDialog()
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

      <Dialog.Content hasGrow>
        <PublishSlide />
      </Dialog.Content>
    </>
  )
}

export default PublishContent
