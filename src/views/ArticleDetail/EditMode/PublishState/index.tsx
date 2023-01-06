import { EditModeArticleQuery } from '~/gql/graphql'

import PendingState from './PendingState'
import PublishedState from './PublishedState'
import styles from './styles.css'

interface Props {
  article: {
    id: string
    title: string
    slug: string
    mediaHash: string
    author: {
      userName?: string | null
    }
  }
  draft: NonNullable<
    NonNullable<
      EditModeArticleQuery['article'] & { __typename: 'Article' }
    >['drafts']
  >[0]

  isSameHash: boolean

  cancel: () => void
}

const PublishState = ({
  article,
  draft,

  isSameHash,

  cancel,
}: Props) => {
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const isValidHash = typeof draft.mediaHash === 'string' && draft.mediaHash

  if (!isPending && !isPublished) {
    return null
  }

  return (
    <section className="container">
      {(isPending || isPublished) && !isValidHash && (
        <PendingState draft={draft} id={article.id} />
      )}
      {isPublished && !isSameHash && isValidHash && (
        <PublishedState article={article} draft={draft} cancel={cancel} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default PublishState
