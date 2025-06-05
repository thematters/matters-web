import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ARTICLE_DIGEST_AUTHOR_SIDEBAR_ID_PREFIX } from '~/common/enums'
import {
  analytics,
  fromGlobalId,
  indexToCursor,
  mergeConnections,
  toPath,
  unshiftConnections,
} from '~/common/utils'
import {
  DualScroll,
  List,
  QueryError,
  Throw404,
  usePublicQuery,
} from '~/components'
import {
  ArticleDetailPublicQuery,
  AuthorSidebarCollectionQuery,
} from '~/gql/graphql'

import { ArticleDigestAuthorSidebar } from '../ArticleDigestAuthorSidebar'
import {
  ArticleDigestAuthorSidebarFeedPlaceholder,
  FeedPlaceholder,
} from '../Placeholder'
import { AUTHOR_SIDEBAR_COLLECTION } from './gql'
import styles from './styles.module.css'

type CollectionProps = {
  collectionId: string
  article: ArticleDetailPublicQuery['article']
}

const Collection = ({ article, collectionId }: CollectionProps) => {
  const cursor = article ? indexToCursor(fromGlobalId(article.id).id) : null
  const [lastTopArticleId, setLastTopArticleId] = useState<string | null>(null)

  /**
   * Data Fetching
   */
  const {
    data: prevData,
    loading: prevLoading,
    error: prevError,
    fetchMore: prevFetchMore,
  } = usePublicQuery<AuthorSidebarCollectionQuery>(AUTHOR_SIDEBAR_COLLECTION, {
    variables: { id: collectionId, before: cursor, includeBefore: true },
  })

  const {
    data: afterData,
    loading: afterLoading,
    error: afterError,
    fetchMore: afterFetchMore,
  } = usePublicQuery<AuthorSidebarCollectionQuery>(AUTHOR_SIDEBAR_COLLECTION, {
    variables: { id: collectionId, after: cursor },
  })

  const collection = prevData?.node
  const prevCollection = prevData?.node
  const afterCollection = afterData?.node

  useEffect(() => {
    if (!article) return
    const articleDigestAuthorSidebar = document.getElementById(
      `${ARTICLE_DIGEST_AUTHOR_SIDEBAR_ID_PREFIX}${article.id}`
    )
    if (articleDigestAuthorSidebar) {
      articleDigestAuthorSidebar.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [article, prevLoading, afterLoading])

  useEffect(() => {
    if (!prevData?.node || prevData.node.__typename !== 'Collection') return
    setLastTopArticleId(prevData.node.articles.edges?.[0]?.node.id || null)
  }, [prevData])

  /**
   * Render
   */
  if (prevLoading || afterLoading) {
    return <FeedPlaceholder />
  }
  if (prevError || afterError) {
    return <QueryError error={prevError ?? afterError!} />
  }

  if (
    !collection ||
    collection.__typename !== 'Collection' ||
    !afterCollection ||
    afterCollection.__typename !== 'Collection' ||
    !prevCollection ||
    prevCollection.__typename !== 'Collection'
  ) {
    return <Throw404 />
  }

  // pagination
  const connectionPath = 'node.articles'
  const { edges: prevEdges, pageInfo: prevPageInfo } =
    prevCollection?.articles || {}
  const { edges: afterEdges, pageInfo: afterPageInfo } =
    afterCollection?.articles || {}
  const edges = [...(prevEdges || []), ...(afterEdges || [])]

  // load previous page
  const loadPreviousMore = async () => {
    if (!prevPageInfo?.hasPreviousPage) {
      return
    }

    await prevFetchMore({
      variables: { before: prevPageInfo?.startCursor, includeBefore: false },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        unshiftConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    const lastTopArticleDigest = document.getElementById(
      `${ARTICLE_DIGEST_AUTHOR_SIDEBAR_ID_PREFIX}${lastTopArticleId}`
    )
    if (lastTopArticleDigest) {
      lastTopArticleDigest.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      })
    }
  }

  // load next page
  const loadAfterMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'article_detail_author_sidebar_collection',
      location: afterEdges?.length || 0,
    })

    await afterFetchMore({
      variables: { after: afterPageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  const collectionDetailPath = toPath({
    page: 'collectionDetail',
    userName: article?.author.userName || '',
    collection: {
      id: collection.id,
    },
  })

  return (
    <section className={styles.container}>
      <Link {...collectionDetailPath}>
        <title>{collection.title}</title>
      </Link>
      {collection.articles.totalCount > 0 && (
        <Link {...collectionDetailPath}>
          <section className={styles.totalCount}>
            <FormattedMessage
              defaultMessage="{totalCount} articles"
              id="S15KFb"
              values={{
                totalCount: collection.articles.totalCount,
              }}
            />
          </section>
        </Link>
      )}
      <DualScroll
        hasPreviousPage={prevPageInfo?.hasPreviousPage}
        hasNextPage={afterPageInfo?.hasNextPage}
        loadPrevious={loadPreviousMore}
        loadMore={loadAfterMore}
        loader={<ArticleDigestAuthorSidebarFeedPlaceholder />}
        className={styles.feed}
      >
        <List borderPosition="top">
          {edges?.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestAuthorSidebar
                article={node}
                titleTextSize={14}
                collectionId={collectionId}
                titleColor={node.id === article?.id ? 'black' : 'greyDarker'}
                showCover={false}
                clickEvent={() => {
                  analytics.trackEvent('click_feed', {
                    type: 'article_detail_author_sidebar_collection',
                    contentType: 'article',
                    location: i,
                    id: node.id,
                  })
                }}
              />
            </List.Item>
          ))}
        </List>
      </DualScroll>
    </section>
  )
}

export default Collection
