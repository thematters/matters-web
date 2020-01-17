import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  ArticleDigest,
  Card,
  Comment,
  Head,
  InfiniteScroll,
  List,
  Spinner
} from '~/components'
import EmptyComment from '~/components/Empty/EmptyComment'
import { QueryError } from '~/components/GQL'

import {
  filterComments,
  getQuery,
  mergeConnections,
  toPath
} from '~/common/utils'
import IMAGE_LOGO_192 from '~/static/icon-192x192.png?url'

import styles from './styles.css'

import {
  UserCommentFeed,
  UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node
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
              ...TitleArticle
              comments(input: { filter: { author: $id }, first: null }) {
                edges {
                  cursor
                  node {
                    ...FeedComment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Title.fragments.article}
  ${Comment.Feed.fragments.comment}
`

const UserCommentsWrap = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })

  const { data, loading, error } = useQuery<UserIdUser>(USER_ID, {
    variables: { userName }
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.user) {
    return null
  }

  return (
    <>
      <Head
        title={{
          zh_hant: `${data.user.displayName}發表的評論`,
          zh_hans: `${data.user.displayName}发表的评论`
        }}
        description={data.user.info.description}
        image={IMAGE_LOGO_192}
      />
      <UserComments user={data.user} />
    </>
  )
}

const UserComments = ({ user }: UserIdUser) => {
  const { data, loading, error, fetchMore } = useQuery<UserCommentFeed>(
    USER_COMMENT_FEED,
    {
      variables: { id: user?.id }
    }
  )

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
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {edges.map(articleEdge => {
          const commentEdges = articleEdge.node.comments.edges
          const filteredComments = filterComments(
            (commentEdges || []).map(({ node }) => node)
          ) as UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node[]

          if (filteredComments.length <= 0) {
            return null
          }

          return (
            <List.Item spacing={['base', 0]} key={articleEdge.cursor}>
              <section className="article-title">
                <ArticleDigest.Title article={articleEdge.node} is="h3" />
              </section>

              <List>
                {filteredComments.map(comment => (
                  <List.Item noBorder key={comment.id}>
                    <Card
                      spacing={['tight', 0]}
                      {...toPath({ page: 'commentDetail', comment })}
                    >
                      <Comment.Feed
                        comment={comment}
                        avatarSize="md"
                        hasCreatedAt
                        hasLink
                      />
                    </Card>
                  </List.Item>
                ))}
              </List>
            </List.Item>
          )
        })}

        <style jsx>{styles}</style>
      </List>
    </InfiniteScroll>
  )
}

export default UserCommentsWrap
