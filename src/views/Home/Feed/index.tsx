import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'

import {
  FeedDigest,
  InfiniteScroll,
  List,
  LoadMore,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { useResponsive } from '~/components/Hook'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import SortBy from './SortBy'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { HottestFeed } from './__generated__/HottestFeed'
import { NewestFeed } from './__generated__/NewestFeed'

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
  ${FeedDigest.fragments.article}
`

export const queries = {
  hottest: gql`
    query HottestFeed($after: String) {
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
    query NewestFeed($after: String) {
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

const Feed = ({ feedSortType: sortBy }: { feedSortType: SortBy }) => {
  const isMediumUp = useResponsive({ type: 'md-up' })()
  const { data, error, loading, fetchMore, networkStatus } = useQuery<
    HottestFeed | NewestFeed
  >(queries[sortBy], {
    notifyOnNetworkStatusChange: true
  })

  const connectionPath = 'viewer.recommendation.feed'
  const result = data?.viewer?.recommendation.feed
  const { edges, pageInfo } = result || {}
  const isNewLoading = networkStatus === NetworkStatus.loading

  if (loading && (!result || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
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
          path: connectionPath,
          dedupe: true
        })
    })
  }

  return (
    <>
      <InfiniteScroll
        hasNextPage={isMediumUp && pageInfo.hasNextPage}
        loadMore={loadMore}
      >
        <List hasBorder>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <FeedDigest
                article={node}
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: sortBy,
                    location: i
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      {!isMediumUp && pageInfo.hasNextPage && (
        <LoadMore onClick={loadMore} loading={loading} />
      )}
    </>
  )
}

const HomeFeed = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE)
  const { feedSortType } = data?.clientPreference || {
    feedSortType: 'hottest'
  }
  const setSortBy = (type: SortBy) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { feedSortType: type }
      })
    }
  }

  return (
    <>
      <PageHeader
        title={
          feedSortType === 'hottest' ? (
            <Translate zh_hant="熱門作品" zh_hans="热门作品" />
          ) : (
            <Translate zh_hant="最新作品" zh_hans="最新作品" />
          )
        }
        is="h2"
      >
        <SortBy sortBy={feedSortType as SortBy} setSortBy={setSortBy} />
      </PageHeader>

      <Feed feedSortType={feedSortType as SortBy} />
    </>
  )
}

export default HomeFeed
