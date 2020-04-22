import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  ArticleDigestFeed,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'

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

const SearchArticles = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  const { data, loading, fetchMore, networkStatus } = useQuery<SeachArticles>(
    SEARCH_ARTICLES,
    {
      variables: { key: q, first: 10 },
      notifyOnNetworkStatusChange: true,
    }
  )
  const isNewLoading = networkStatus === NetworkStatus.setVariables

  if (loading && (!data?.search || isNewLoading)) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptySearch description={<Translate id="emptySearchResults" />} />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.SEARCH_ARTICLE,
      location: edges.length,
      entrance: q,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
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
                      entrance: q,
                    })
                  }
                />
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchArticles
