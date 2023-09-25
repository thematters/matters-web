import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  LATER_SEARCH_RESULTS_LENGTH,
  MAX_SEARCH_RESULTS_LENGTH,
} from '~/common/enums'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptySearch,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  usePublicQuery,
  useRoute,
} from '~/components'
import {
  ArticleDigestFeedArticlePrivateFragment,
  ArticleDigestFeedArticlePublicFragment,
  SearchAggregateArticlesPublicQuery,
} from '~/gql/graphql'

import { SEARCH_AGGREGATE_ARTICLES_PUBLIC } from './gql'

const AggregateArticleResults = () => {
  const { getQuery } = useRoute()
  const q = getQuery('q')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore } =
    usePublicQuery<SearchAggregateArticlesPublicQuery>(
      SEARCH_AGGREGATE_ARTICLES_PUBLIC,
      {
        variables: { key: q },
      }
    )

  useEffect(() => {
    analytics.trackEvent('load_more', {
      type: 'search_article',
      location: 0,
      searchKey: q,
    })
  }, [])

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  const intl = useIntl()

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptySearch
        description={
          <Translate
            zh_hant="沒有找到相關文章，換個關鍵詞試試？"
            zh_hans="没有找到相关文章，换个关键词试试？"
            en="No articles found. Try a different keyword?"
          />
        }
      />
    )
  }

  // load next page
  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_article',
      location: edges?.length || 0,
      searchKey: q,
    })

    return fetchMore({
      variables: {
        first:
          edges.length === MAX_SEARCH_RESULTS_LENGTH - 10
            ? 10
            : LATER_SEARCH_RESULTS_LENGTH,
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      <Head
        title={intl.formatMessage(
          {
            defaultMessage: '{q} - Matters Search',
            description: 'src/views/Search/AggregateResults/Articles.tsx',
          },
          { q: stripSpaces(q) }
        )}
        path={`/search?q=${stripSpaces(q)}&type=article`}
        noSuffix
      />

      <InfiniteScroll
        hasNextPage={
          pageInfo.hasNextPage && edges.length < MAX_SEARCH_RESULTS_LENGTH
        }
        loadMore={loadMore}
        eof={<FormattedMessage defaultMessage="End of the results" />}
      >
        <List>
          {edges.map(
            ({ node, cursor }, i) =>
              node.__typename === 'Article' && (
                <List.Item key={cursor + node.id}>
                  <ArticleDigestFeed
                    article={
                      node as ArticleDigestFeedArticlePublicFragment &
                        Partial<ArticleDigestFeedArticlePrivateFragment>
                    }
                    hasCircle={false}
                    hasFollow={false}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'search_article',
                        contentType: 'article',
                        location: i,
                        id: node.id,
                        searchKey: q,
                      })
                    }
                    onClickAuthor={() => {
                      analytics.trackEvent('click_feed', {
                        type: 'search_article',
                        contentType: 'user',
                        location: i,
                        id: node.author.id,
                        searchKey: q,
                      })
                    }}
                  />
                </List.Item>
              )
          )}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default AggregateArticleResults
