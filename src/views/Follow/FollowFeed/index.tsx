import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import {
  ArticleDigest,
  CommentDigest,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { QueryError } from '~/components/GQL'
import CommentFragments from '~/components/GQL/fragments/comment'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { FollowFeed as FollowFeedType } from './__generated__/FollowFeed'
import styles from './styles.css'

const FOLLOW_FEED = gql`
  query FollowFeed(
    $after: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
    $hasDescendantComments: Boolean = false
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
              __typename
              ... on Article {
                ...FolloweeFeedDigestArticle
              }
              ... on Comment {
                ...FolloweeFeedDigestComment
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.followee}
  ${CommentFragments.followee}
`

const FollowFeed = () => {
  const { data, loading, error, fetchMore } = useQuery<FollowFeedType>(
    FOLLOW_FEED
  )

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
            className={node.__typename === 'Article' ? 'article' : 'comment'}
          >
            {node.__typename === 'Article' && (
              <ArticleDigest.Feed
                article={node}
                hasDateTime
                hasBookmark
                inFolloweeFeed
              />
            )}
            {node.__typename === 'Comment' && (
              <CommentDigest.Feed
                comment={node}
                hasLink
                hasDropdownActions={false}
                inFolloweeFeed
              />
            )}
          </li>
        ))}
      </ul>
      <style jsx>{styles}</style>
    </InfiniteScroll>
  )
}

export default () => (
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

    <FollowFeed />
  </>
)
