import { useContext, useEffect } from 'react'

import {
  ArticleDigestFeed,
  Cover,
  EmptyLayout,
  EOF,
  Head,
  Layout,
  List,
  PullToRefresh,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  UserDigest,
  useResponsive,
  useRoute,
  ViewerContext,
} from '~/components'

import { analytics } from '~/common/utils'

import IMAGE_TOPIC_COVER from '@/public/static/images/tag-cover.png'

import { TOPIC_DETAIL_PRIVATE, TOPIC_DETAIL_PUBLIC } from './gql'
import styles from './styles.css'

import {
  TopicDetailPublic,
  TopicDetailPublic_node_Topic_articles as TopicArticle,
} from './__generated__/TopicDetailPublic'

const Topics = () => {
  const isSmallUp = useResponsive('sm-up')

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

  const ArticleList = ({ articles }: { articles: TopicArticle[] }) => (
    <section className="articles">
      <List>
        {articles.map((article, i) => (
          <List.Item key={article.id}>
            <ArticleDigestFeed
              article={article}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'topic_article',
                  contentType: 'article',
                  location: i,
                  id: article.id,
                })
              }
            />
          </List.Item>
        ))}
      </List>

      <style jsx>{styles}</style>
    </section>
  )

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        mode={isSmallUp ? undefined : 'transparent-absolute'}
        left={
          <Layout.Header.BackButton
            mode={isSmallUp ? undefined : 'black-solid'}
          />
        }
        right={
          isSmallUp ? (
            <UserDigest.Rich
              user={topic.author}
              size="sm"
              spacing={[0, 0]}
              bgColor="none"
            />
          ) : undefined
        }
      />

      <Head
        title={`${topic.title} - ${topic?.author.displayName} (@${topic.author.userName})`}
        noSuffix
        description={topic.description}
        image={topic.cover}
      />

      <PullToRefresh>
        <header>
          <Cover
            cover={topic.cover}
            fallbackCover={IMAGE_TOPIC_COVER.src}
            type="topic"
          />

          <h1 className="title">{topic.title}</h1>

          <p className="description">{topic.description}</p>
        </header>

        {topic.articles && topic.articles.length > 0 && (
          <ArticleList articles={topic.articles} />
        )}

        {topic.chapters?.map((chapter) =>
          chapter.articles && chapter.articles.length > 0 ? (
            <section className="chapter" key={chapter.id}>
              <h2 className="title">{chapter.title}</h2>
              <p className="description">{chapter.description}</p>

              <ArticleList articles={chapter.articles} />
            </section>
          ) : null
        )}

        <EOF />

        <style jsx>{styles}</style>
      </PullToRefresh>
    </Layout.Main>
  )
}

export default Topics
