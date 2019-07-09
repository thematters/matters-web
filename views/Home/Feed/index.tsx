import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import {
  InfiniteScroll,
  LoadMore,
  PageHeader,
  Placeholder,
  Responsive,
  Translate
} from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { Query } from '~/components/GQL'
import { SystemContext } from '~/components/System'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { FeedArticleConnection } from './__generated__/FeedArticleConnection'
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

export const queries: { [key: string]: any } = {
  hottest: gql`
    query HottestFeed(
      $cursor: String
      $hasArticleDigestActionAuthor: Boolean = false
      $hasArticleDigestActionBookmark: Boolean = true
      $hasArticleDigestActionTopicScore: Boolean = false
    ) {
      viewer {
        id
        recommendation {
          feed: hottest(input: { first: 10, after: $cursor }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  newest: gql`
    query NewestFeed(
      $cursor: String
      $hasArticleDigestActionAuthor: Boolean = false
      $hasArticleDigestActionBookmark: Boolean = true
      $hasArticleDigestActionTopicScore: Boolean = false
    ) {
      viewer {
        id
        recommendation {
          feed: newest(input: { first: 10, after: $cursor }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `
}

type SortBy = 'hottest' | 'newest'

export default () => {
  const { feedSortBy, setFeedSortBy } = useContext(SystemContext)
  const sortBy = (feedSortBy || 'hottest') as SortBy

  return (
    <>
      <Query query={queries[sortBy]} notifyOnNetworkStatusChange>
        {({
          data,
          loading,
          fetchMore
        }: QueryResult & { data: FeedArticleConnection }) => {
          if (loading && !_get(data, 'viewer.recommendation.feed')) {
            return <Placeholder.ArticleDigestList />
          }

          const connectionPath = 'viewer.recommendation.feed'
          const { edges, pageInfo } = _get(data, connectionPath, {
            edges: [],
            pageInfo: {}
          })
          const loadMore = () => {
            analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
              type: sortBy,
              location: edges.length
            })
            return fetchMore({
              variables: {
                cursor: pageInfo.endCursor
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
                <SortBy sortBy={sortBy} setSortBy={setFeedSortBy} />
              </PageHeader>

              <Responsive.MediumUp>
                {(match: boolean) => (
                  <>
                    <InfiniteScroll
                      hasNextPage={match && pageInfo.hasNextPage}
                      loadMore={loadMore}
                    >
                      <ul>
                        {edges.map(
                          (
                            { node, cursor }: { node: any; cursor: any },
                            i: number
                          ) => (
                            <li
                              key={cursor}
                              onClick={() =>
                                analytics.trackEvent(
                                  ANALYTICS_EVENTS.CLICK_FEED,
                                  {
                                    type: sortBy,
                                    location: i
                                  }
                                )
                              }
                            >
                              <ArticleDigest.Feed
                                article={node}
                                hasDateTime
                                hasBookmark
                              />
                            </li>
                          )
                        )}
                      </ul>
                    </InfiniteScroll>

                    {!match && pageInfo.hasNextPage && (
                      <LoadMore onClick={loadMore} loading={loading} />
                    )}
                  </>
                )}
              </Responsive.MediumUp>
            </>
          )
        }}
      </Query>
    </>
  )
}
