import gql from 'graphql-tag'

import { PublishStateDraft } from './__generated__/PublishStateDraft'
import ErrorState from './ErrorState'
import PendingState from './PendingState'
import PublishedState from './PublishedState'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment PublishStateDraft on Draft {
      id
      publishState
      scheduledAt
    }
  `
}

const PublishState = ({ draft }: { draft: PublishStateDraft }) => {
  const isPending = draft.publishState === 'pending'
  const isError = draft.publishState === 'error'
  const isPublished = draft.publishState === 'published'

  return (
    <section className="container">
      {isPending && <PendingState draft={draft} />}
      {isError && <ErrorState draft={draft} />}
      {isPublished && <PublishedState />}
      <style jsx>{styles}</style>
    </section>
  )
}

PublishState.fragments = fragments

export default PublishState
