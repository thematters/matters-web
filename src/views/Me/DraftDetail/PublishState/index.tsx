import baseToast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { toast, useRoute } from '~/components'
import draftFragments from '~/components/GQL/fragments/draft'
import { PublishStateDraftFragment } from '~/gql/graphql'

import ErrorState from './ErrorState'
import PendingState from './PendingState'
import styles from './styles.module.css'

const PublishState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  const { router } = useRoute()
  const isPending = draft.publishState === 'pending'
  const isError = draft.publishState === 'error'
  const isPublished = draft.publishState === 'published'

  if (!isPending && !isError && !isPublished) {
    return null
  }

  if (isPublished) {
    if (!draft.article) {
      return null
    }

    baseToast.dismiss()
    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="The article has been successfully published and will be synced to IPFS soon."
          id="QOLRFh"
          description="src/views/Me/DraftDetail/PublishState/index.tsx"
        />
      ),
    })
    const path = toPath({
      page: 'articleDetail',
      article: draft.article,
    })
    router.push(path.href)
    return null
  }

  return (
    <section className={styles.container}>
      {isPending && <PendingState draft={draft} />}
      {isError && <ErrorState draft={draft} />}
    </section>
  )
}

PublishState.fragments = {
  draft: draftFragments.publishState,
}

export default PublishState
