import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useQuery } from 'react-apollo'

import {
  InfiniteScroll,
  LoadMore,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { useResponsive } from '~/components/Hook'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { HottestFeed } from './__generated__/HottestFeed'
import { NewestFeed } from './__generated__/NewestFeed'
import SortBy from './SortBy'

const feedFragment = gql`
  fragment FeedArticleConnection on ArticleConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        ...FeedDigestArticle
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

export const queries = {
  hottest: gql`
    query HottestFeed(
      $after: String
      $hasArticleDigestActionAuthor: Boolean = false
      $hasArticleDigestActionBookmark: Boolean = true
      $hasArticleDigestActionTopicScore: Boolean = false
    ) {
      viewer {
        id
        recommendation {
          feed: hottest(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  newest: gql`
    query NewestFeed(
      $after: String
      $hasArticleDigestActionAuthor: Boolean = false
      $hasArticleDigestActionBookmark: Boolean = true
      $hasArticleDigestActionTopicScore: Boolean = false
    ) {
      viewer {
        id
        recommendation {
          feed: newest(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `
}

type SortBy = 'hottest' | 'newest'

const Feed = ({
  feedSortType: sortBy,
  client
}: {
  feedSortType: SortBy
  client: ApolloClient<any>
}) => {
  const isMediumUp = useResponsive({ type: 'medium-up' })

  const setSortBy = (type: SortBy) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { feedSortType: type }
      })
    }
  }

  const { data, loading, fetchMore } = useQuery<HottestFeed | NewestFeed>(
    queries[sortBy],
    {
      notifyOnNetworkStatusChange: true
    }
  )

  const connectionPath = 'viewer.recommendation.feed'
  const { edges, pageInfo } =
    (data && data.viewer && data.viewer.recommendation.feed) || {}

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  if (!edges || !pageInfo) {
    return null
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: sortBy,
      location: edges.length
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
    <>
      <PageHeader
        pageTitle={
          sortBy === 'hottest' ? (
            <Translate zh_hant="熱門作品" zh_hans="热门作品" />
          ) : (
            <Translate zh_hant="最新作品" zh_hans="最新作品" />
          )
        }
      >
        <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      </PageHeader>

      <InfiniteScroll
        hasNextPage={isMediumUp && pageInfo.hasNextPage}
        loadMore={loadMore}
      >
        <ul>
          {edges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: sortBy,
                  location: i
                })
              }
            >
              <ArticleDigest.Feed article={node} hasDateTime hasBookmark />
            </li>
          ))}
        </ul>
      </InfiniteScroll>

      {!isMediumUp && pageInfo.hasNextPage && (
        <LoadMore onClick={loadMore} loading={loading} />
      )}
    </>
  )
}

export default () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const { feedSortType } = (data && data.clientPreference) || {
    feedSortType: 'hottest'
  }

  return <Feed feedSortType={feedSortType as SortBy} client={client} />
}
