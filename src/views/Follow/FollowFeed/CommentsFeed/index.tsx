import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { EmptyArticle, InfiniteScroll, List, Spinner } from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import FollowComment from '../FollowComment'

import { FollowCommentsFeed } from './__generated__/FollowCommentsFeed'

const FOLLOW_COMMENTS = gql`
  query FollowCommentsFeed($after: String) {
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
`

const CommentsFeed = () => {
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch,
  } = useQuery<FollowCommentsFeed>(FOLLOW_COMMENTS)

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
                  type: 'follow-comment',
                  contentType: 'comment',
                  styleType: 'card',
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

export default CommentsFeed
