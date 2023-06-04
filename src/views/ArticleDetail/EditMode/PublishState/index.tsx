import { useState } from 'react'

import PendingState from './PendingState'
import PublishedState from './PublishedState'
import styles from './styles.module.css'

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
  cancel: () => void
}

const PublishState = ({ article, cancel }: Props) => {
  const [publishState, setPublishState] = useState('pending')
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'
  const [mediaHash, setMediaHash] = useState('')

  if (!isPending && !isPublished) {
    return null
  }

  return (
    <section className={styles.container}>
      {isPending && (
        <PendingState
          id={article.id}
          articleMediaHash={article.mediaHash}
          updatePublishState={(media) => {
            setPublishState('published')
            setMediaHash(media)
          }}
        />
      )}
      {isPublished && (
        <PublishedState
          article={article}
          cancel={cancel}
          newestMediaHash={mediaHash}
        />
      )}
    </section>
  )
}

export default PublishState
