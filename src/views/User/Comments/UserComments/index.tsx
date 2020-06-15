import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  ArticleDigestTitle,
  Card,
  Comment,
  EmptyComment,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  usePullToRefresh,
} from '~/components'
import { QueryError } from '~/components/GQL'

import {
  filterComments,
  getQuery,
  mergeConnections,
  toPath,
} from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import UserTabs from '../../UserTabs'

import {
  UserCommentFeed,
  UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node,
} from './__generated__/UserCommentFeed'
import { UserIdUser } from './__generated__/UserIdUser'

const USER_ID = gql`
  query UserIdUser($userName: String!) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
      }
      status {
        state
      }
    }
  }
`

const USER_COMMENT_FEED = gql`
  query UserCommentFeed($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on User {
        id
        commentedArticles(input: { first: 5, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              ...ArticleDigestTitleArticle
              comments(input: { filter: { author: $id }, first: null }) {
                edges {
                  cursor
                  node {
                    ...FeedCommentPublic
                    ...FeedCommentPrivate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestTitle.fragments.article}
  ${Comment.Feed.fragments.comment.public}
  ${Comment.Feed.fragments.comment.private}
`

const UserCommentsWrap = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })

  const { data, loading, error } = useQuery<UserIdUser>(USER_ID, {
    variables: { userName },
  })
  const user = data?.user

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!user || user?.status?.state === 'archived') {
    return null
  }

  return (
    <>
      <Head
        title={{
          zh_hant: `${user.displayName}發佈的評論`,
          zh_hans: `${user.displayName}发布的评论`,
        }}
        description={user.info.description}
        image={IMAGE_LOGO_192}
      />
      <UserTabs />
      <UserComments user={user} />
    </>
  )
}

const UserComments = ({ user }: UserIdUser) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    UserCommentFeed
  >(USER_COMMENT_FEED, {
    variables: { id: user?.id },
  })

  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  if (!user || !user.id) {
    return null
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'node.commentedArticles'
  const { edges, pageInfo } =
    (data &&
      data.node &&
      data.node.__typename === 'User' &&
      data.node.commentedArticles &&
      data.node.commentedArticles) ||
    {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyComment />
  }

  const loadMore = () =>
    fetchMore({
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

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List spacing={['loose', 0]}>
        {edges.map((articleEdge) => {
          const commentEdges = articleEdge.node.comments.edges
          const filteredComments = filterComments(
            (commentEdges || []).map(({ node }) => node)
          ) as UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node[]

          if (filteredComments.length <= 0) {
            return null
          }

          return (
            <List.Item key={articleEdge.cursor}>
              <Card
                spacing={['tight', 'base']}
                bgColor="none"
                {...toPath({
                  page: 'articleDetail',
                  article: articleEdge.node,
                })}
              >
                <ArticleDigestTitle article={articleEdge.node} is="h3" />
              </Card>

              <List hasBorder={false}>
                {filteredComments.map((comment) => (
                  <List.Item key={comment.id}>
                    <Card
                      spacing={['tight', 'base']}
                      {...toPath({ page: 'commentDetail', comment })}
                    >
                      <Comment.Feed
                        comment={comment}
                        hasCreatedAt
                        hasLink
                        inCard
                      />
                    </Card>
                  </List.Item>
                ))}
              </List>
            </List.Item>
          )
        })}
      </List>
    </InfiniteScroll>
  )
}

export default UserCommentsWrap
