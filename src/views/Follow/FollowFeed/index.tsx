import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { FollowFeed } from './__generated__/FollowFeed'

const FOLLOW_FEED = gql`
  query FollowFeed(
    $after: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      recommendation {
        followeeArticles(input: { first: 10, after: $after }) {
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
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

export default () => {
  return (
    <Query query={FOLLOW_FEED}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: FollowFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        const connectionPath = 'viewer.recommendation.followeeArticles'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () => {
          analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
            type: FEED_TYPE.FOLLOW,
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
            <Head
              title={{
                zh_hant: TEXT.zh_hant.follow,
                zh_hans: TEXT.zh_hans.follow
              }}
            />

            <PageHeader
              pageTitle={
                <Translate
                  zh_hant={TEXT.zh_hant.follow}
                  zh_hans={TEXT.zh_hans.follow}
                />
              }
            />

            <InfiniteScroll
              hasNextPage={pageInfo.hasNextPage}
              loadMore={loadMore}
            >
              <ul>
                {edges.map(
                  ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                    <li
                      key={cursor}
                      onClick={() =>
                        analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                          type: FEED_TYPE.FOLLOW,
                          location: i
                        })
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
          </>
        )
      }}
    </Query>
  )
}
