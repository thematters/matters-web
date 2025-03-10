import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { LatestVersionArticleQuery } from '~/gql/graphql'

import { LATEST_VERSION_ARTICLE } from './gql'
import PendingState from './PendingState'
import PublishedState from './PublishedState'
import styles from './styles.module.css'

interface PublishStateProps {
  articleId: string
  currVersionId: string
}

type State = 'pending' | 'published'

const PublishState = ({ articleId, currVersionId }: PublishStateProps) => {
  const [initVersionId] = useState(currVersionId)
  const [publishState, setPublishState] = useState<State>('pending')
  const isPending = publishState === 'pending'
  const isPublished = publishState === 'published'

  const { data, startPolling, stopPolling, refetch, client } =
    useQuery<LatestVersionArticleQuery>(LATEST_VERSION_ARTICLE, {
      variables: { id: articleId },
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    })
  const latestVersionId =
    data?.article &&
    data.article.__typename === 'Article' &&
    data.article.versions?.edges[0]?.node.id

  useEffect(() => {
    startPolling(1000 * 2)

    refetch && refetch()

    return () => {
      stopPolling()
    }
  }, [])

  useEffect(() => {
    if (!latestVersionId || latestVersionId === initVersionId) {
      return
    }

    stopPolling()
    setPublishState('published')

    client.cache.evict({
      id: client.cache.identify({ __typename: 'Article', id: articleId }),
    })
    client.cache.gc()
  }, [latestVersionId])

  return (
    <section className={styles.container}>
      {isPending && <PendingState />}
      {isPublished && data?.article && (
        <PublishedState
          article={
            data.article as NonNullable<
              LatestVersionArticleQuery['article'] & { __typename: 'Article' }
            >
          }
        />
      )}
    </section>
  )
}

export default PublishState
