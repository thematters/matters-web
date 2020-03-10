import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import _get from 'lodash/get'

import {
  ArticleDigestFeed,
  InfiniteScroll,
  List,
  PageHeader,
  Spinner,
  Translate,
  useResponsive,
  ViewMoreButton
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'

import { SeachArticles } from './__generated__/SeachArticles'

const SEARCH_ARTICLES = gql`
  query SeachArticles($key: String!, $first: Int!, $after: String) {
    search(input: { key: $key, type: Article, first: $first, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Article {
            ...ArticleDigestFeedArticle
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article}
`

const SearchArticles = ({ q }: { q: string }) => {
  const isLargeUp = useResponsive('lg-up')
  const { data, loading, fetchMore, networkStatus } = useQuery<SeachArticles>(
    SEARCH_ARTICLES,
    {
      variables: { key: q, first: 10 },
      notifyOnNetworkStatusChange: true
    }
  )
  const isNewLoading = networkStatus === NetworkStatus.setVariables

  if (loading && (!data?.search || isNewLoading)) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptySearch
        inSidebar={false}
        description={<Translate id="emptySearchResults" />}
      />
    )
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.SEARCH_ARTICLE,
      location: edges.length,
      entrance: q
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={isLargeUp && pageInfo.hasNextPage}
      loadMore={loadMore}
    >
      <PageHeader is="h2" title={<Translate id="article" />} />
      <List hasBorder>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Article' && (
              <List.Item key={cursor}>
                <ArticleDigestFeed
                  article={node}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                      type: FEED_TYPE.SEARCH_ARTICLE,
                      location: i,
                      entrance: q
                    })
                  }
                />
              </List.Item>
            )
        )}
      </List>

      {!isLargeUp && pageInfo.hasNextPage && (
        <ViewMoreButton onClick={loadMore} loading={loading} />
      )}
    </InfiniteScroll>
  )
}

export default SearchArticles
