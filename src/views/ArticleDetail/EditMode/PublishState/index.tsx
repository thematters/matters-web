import PendingState from './PendingState'
import PublishedState from './PublishedState'
import styles from './styles.css'

import { EditModeArticle_article_drafts as EditModeDraft } from '../__generated__/EditModeArticle'

interface Props {
  article: {
    title: string
    slug: string
    mediaHash: string
    author: {
      userName: string | null
    }
  }
  draft: EditModeDraft

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
        <PendingState draft={draft} mediaHash={article.mediaHash} />
      )}
      {isPublished && !isSameHash && isValidHash && (
        <PublishedState article={article} draft={draft} cancel={cancel} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default PublishState
