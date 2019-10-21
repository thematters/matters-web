import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import {
  ArticleDigest,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { QueryError } from '~/components/GQL'

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
  const { data, loading, error, fetchMore } = useQuery<FollowFeed>(FOLLOW_FEED)

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followeeArticles'
  const { edges, pageInfo } =
    (data && data.viewer && data.viewer.recommendation.followeeArticles) || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

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

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <ul>
          {edges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.FOLLOW,
                  location: i
                })
              }
            >
              <ArticleDigest.Feed article={node} hasDateTime hasBookmark />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </>
  )
}
