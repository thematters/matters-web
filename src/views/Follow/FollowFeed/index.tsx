import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  Head,
  InfiniteScroll,
  List,
  Spinner,
} from '~/components'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { analytics, mergeConnections } from '~/common/utils'

import FeedType, { FollowFeedType } from './FeedType'
import FollowComment from './FollowComment'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { FollowArticleFeed } from './__generated__/FollowArticleFeed'
import { FollowCommentFeed } from './__generated__/FollowCommentFeed'

const queries = {
  article: gql`
    query FollowArticleFeed($after: String) {
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
                  ...ArticleDigestFeedArticle
                }
              }
            }
          }
        }
      }
    }
    ${ArticleDigestFeed.fragments.article}
  `,
  comment: gql`
    query FollowCommentFeed($after: String) {
      viewer {
        id
        recommendation {
          followeeComments(input: { first: 10, after: $after }) {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
            edges {
              cursor
              node {
                __typename
                ... on Comment {
                  ...FollowComment
                }
              }
            }
          }
        }
      }
    }
    ${FollowComment.fragments.comment}
  `,
}

const ArticlesFeed = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    FollowArticleFeed
  >(queries.article)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followeeArticles'
  const { edges, pageInfo } =
    data?.viewer?.recommendation.followeeArticles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'follow',
      location: edges.length,
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
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestFeed
              article={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'follow',
                  contentType: 'article',
                  styleType: 'no_cover',
                  location: i,
                })
              }
              inFollowFeed
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const CommentsFeed = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    FollowCommentFeed
  >(queries.comment)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.followeeComments'
  const { edges, pageInfo } =
    data?.viewer?.recommendation.followeeComments || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'follow',
      location: edges.length,
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
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <FollowComment
              comment={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'follow',
                  contentType: 'article',
                  styleType: 'comment',
                  location: i,
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const FollowFeed = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const { followFeedType } = data?.clientPreference || {
    followFeedType: 'article',
  }
  const setFeedType = (type: FollowFeedType) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { followFeedType: type },
      })
    }
  }

  return (
    <>
      <Head title={{ id: 'follow' }} />
      <section className="topbar">
        <FeedType
          type={followFeedType as FollowFeedType}
          setFeedType={setFeedType}
        />
      </section>
      {followFeedType === 'article' && <ArticlesFeed />}
      {followFeedType === 'comment' && <CommentsFeed />}
    </>
  )
}

export default FollowFeed
