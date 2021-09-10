import { useContext, useEffect } from 'react'

import {
  EmptyLayout,
  Head,
  Layout,
  PullToRefresh,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  UserDigest,
  useRoute,
  ViewerContext,
} from '~/components'

import { TOPIC_DETAIL_PRIVATE, TOPIC_DETAIL_PUBLIC } from './gql'

import { TopicDetailPublic } from './__generated__/TopicDetailPublic'

const Topics = () => {
  const { getQuery } = useRoute()
  const id = getQuery('topicId')
  const viewer = useContext(ViewerContext)

  // public data
  const { data, loading, error, client } = usePublicQuery<TopicDetailPublic>(
    TOPIC_DETAIL_PUBLIC,
    {
      variables: { id },
    }
  )

  const topic = data?.node?.__typename === 'Topic' ? data.node : null

  // fetch private data
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !topic) {
      return
    }

    await client.query({
      query: TOPIC_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { id },
    })
  }

  useEffect(() => {
    loadPrivate()
  }, [topic, viewer.id])

  /**
   * Render:Loading
   */
  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  /**
   * Render:Error
   */
  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  /**
   * Render:404
   */
  if (!topic) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <UserDigest.Rich
            user={topic.author}
            size="sm"
            spacing={[0, 0]}
            bgColor="none"
          />
        }
      />

      <Head
        title={`${topic.title} - ${topic?.author.displayName} (@${topic.author.userName})`}
        noSuffix
        description={topic.description}
        image={topic.cover}
      />

      <PullToRefresh>{topic?.title}</PullToRefresh>
    </Layout.Main>
  )
}

export default Topics
