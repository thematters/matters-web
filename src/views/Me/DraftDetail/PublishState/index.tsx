import draftFragments from '~/components/GQL/fragments/draft'

import ErrorState from './ErrorState'
import PendingState from './PendingState'
import PublishedState from './PublishedState'
import styles from './styles.css'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'

const PublishState = ({ draft }: { draft: PublishStateDraft }) => {
  const isPending = draft.publishState === 'pending'
  const isError = draft.publishState === 'error'
  const isPublished = draft.publishState === 'published'

  if (!isPending && !isError && !isPublished) {
    return null
  }

  return (
    <section className="container">
      {isPending && <PendingState draft={draft} />}
      {isError && <ErrorState draft={draft} />}
      {isPublished && <PublishedState />}

      <style jsx>{styles}</style>
    </section>
  )
}

PublishState.fragments = {
  draft: draftFragments.publishState,
}

export default PublishState
