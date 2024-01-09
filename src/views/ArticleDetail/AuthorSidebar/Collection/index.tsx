import { analytics, mergeConnections, toPath } from '~/common/utils'
import {
  ArticleDigestAuthorSidebar,
  InfiniteScroll,
  LinkWrapper,
  List,
  QueryError,
  Throw404,
  usePublicQuery,
} from '~/components'
import {
  ArticleDetailPublicQuery,
  AuthorSidebarCollectionQuery,
} from '~/gql/graphql'

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

export const Collection = ({ article, collectionId }: CollectionProps) => {
  /**
   * Data Fetching
   */
  const { data, loading, error, fetchMore } =
    usePublicQuery<AuthorSidebarCollectionQuery>(AUTHOR_SIDEBAR_COLLECTION, {
      variables: { id: collectionId },
    })
  const collection = data?.node!

  /**
   * Render
   */
  if (loading) {
    return <FeedPlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!collection || collection.__typename !== 'Collection') {
    return <Throw404 />
  }

  // pagination
  const connectionPath = 'node.articles'
  const { edges, pageInfo } = collection?.articles || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'article_detail_author-sidebar-collection',
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
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
      <LinkWrapper {...collectionDetailPath}>
        <title>{collection.title}</title>
      </LinkWrapper>
      {collection.description && (
        <LinkWrapper {...collectionDetailPath}>
          <section className={styles.description}>
            {collection.description}
          </section>
        </LinkWrapper>
      )}
      <section className={styles.feed}>
        <InfiniteScroll
          hasNextPage={pageInfo?.hasNextPage}
          loadMore={loadMore}
          loader={<ArticleDigestAuthorSidebarFeedPlaceholder />}
        >
          <List>
            {edges?.map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
                <ArticleDigestAuthorSidebar
                  article={node}
                  titleTextSize="sm"
                  collectionId={collectionId}
                  titleColor={node.id === article?.id ? 'black' : 'greyDarker'}
                />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </section>
    </section>
  )
}
