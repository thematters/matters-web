import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigest,
  Head,
  InfiniteScroll,
  List,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import FollowComment from './FollowComment'
import styles from './styles.css'

import { FollowFeed as FollowFeedType } from './__generated__/FollowFeed'

const FOLLOW_FEED = gql`
  query FollowFeed($after: String) {
    viewer {
      id
      recommendation {
        followeeWorks(input: { first: 10, after: $after }) {
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
                ...FeedDigestArticle
              }
              ... on Comment {
                ...FollowComment
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
  ${FollowComment.fragments.comment}
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

  const connectionPath = 'viewer.recommendation.followeeWorks'
  const { edges, pageInfo } = data?.viewer?.recommendation.followeeWorks || {}

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
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item
            className={node.__typename === 'Article' ? 'article' : 'comment'}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.FOLLOW,
                location: i
              })
            }
            key={cursor}
          >
            {node.__typename === 'Article' && (
              <ArticleDigest.Feed article={node} />
            )}
            {node.__typename === 'Comment' && <FollowComment comment={node} />}
          </List.Item>
        ))}
      </List>

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
