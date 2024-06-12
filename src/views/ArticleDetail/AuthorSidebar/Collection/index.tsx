import { FormattedMessage } from 'react-intl'

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

const Collection = ({ article, collectionId }: CollectionProps) => {
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
      type: 'article_detail_author_sidebar_collection',
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
      {collection.articles.totalCount > 0 && (
        <LinkWrapper {...collectionDetailPath}>
          <section className={styles.totalCount}>
            <FormattedMessage
              defaultMessage="{totalCount} articles"
              id="S15KFb"
              values={{
                totalCount: collection.articles.totalCount,
              }}
            />
          </section>
        </LinkWrapper>
      )}
      <section className={styles.feed}>
        <InfiniteScroll
          hasNextPage={pageInfo?.hasNextPage}
          loadMore={loadMore}
          loader={<ArticleDigestAuthorSidebarFeedPlaceholder />}
        >
          <List borderPosition="top">
            {edges?.map(
              (
                { node, cursor },
                i // TODO: find focus factor
              ) => (
                <List.Item key={cursor}>
                  <ArticleDigestAuthorSidebar
                    article={node}
                    titleTextSize={14}
                    collectionId={collectionId}
                    titleColor={
                      node.id === article?.id ? 'black' : 'greyDarker'
                    }
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
              )
            )}
          </List>
        </InfiniteScroll>
      </section>
    </section>
  )
}

export default Collection
