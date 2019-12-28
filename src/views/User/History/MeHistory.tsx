import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ArticleDigest, InfiniteScroll, Placeholder } from '~/components'
import EmptyHistory from '~/components/Empty/EmptyHistory'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { MeHistoryFeed } from './__generated__/MeHistoryFeed'

const ME_HISTORY_FEED = gql`
  query MeHistoryFeed(
    $after: String
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      activity {
        history(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              article {
                ...FeedDigestArticle
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

const MeHistory = () => {
  const { data, loading, error, fetchMore } = useQuery<MeHistoryFeed>(
    ME_HISTORY_FEED
  )

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.activity.history'
  const { edges, pageInfo } = data?.viewer?.activity.history || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyHistory />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.READ_HISTORY,
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li
            key={cursor}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.READ_HISTORY,
                location: i
              })
            }
          >
            <ArticleDigest.Feed
              article={node.article}
              hasBookmark
              hasDateTime
            />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}

export default MeHistory
