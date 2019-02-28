import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import {
  Error,
  Head,
  Icon,
  InfiniteScroll,
  Placeholder,
  Spinner
} from '~/components'
import { CommentDigest } from '~/components/CommentDigest'
import EmptyComment from '~/components/Empty/EmptyComment'

import { getQuery, mergeConnections, toPath } from '~/common/utils'
import ICON_CHEVRON_RIGHT from '~/static/icons/chevron-right.svg?sprite'

import { UserCommentFeed } from './__generated__/UserCommentFeed'
import { UserIdUser } from './__generated__/UserIdUser'
import styles from './styles.css'

const USER_ID = gql`
  query UserIdUser($userName: String!) {
    user(input: { userName: $userName }) {
      id
      displayName
    }
  }
`
const USER_COMMENT_FEED = gql`
  query UserCommentFeed(
    $id: ID!
    $cursor: String
    $hasDescendantComments: Boolean = false
  ) {
    node(input: { id: $id }) {
      ... on User {
        id
        commentedArticles(input: { first: 5, after: $cursor }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              title
              slug
              author {
                id
                userName
              }
              mediaHash
              comments(input: { author: $id }) {
                edges {
                  cursor
                  node {
                    ...FeedDigestComment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${CommentDigest.Feed.fragments.comment}
`

const UserCommentsWrap: React.FC<WithRouterProps> = ({ router }) => {
  const userName = getQuery({ router, key: 'userName' })

  return (
    <Query query={USER_ID} variables={{ userName }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        return (
          <>
            <Head
              title={{
                zh_hant: `${data.user.displayName}發表的評論`,
                zh_hans: `${data.user.displayName}发表的评论`
              }}
            />
            <UserComments user={data.user} />
          </>
        )
      }}
    </Query>
  )
}

const UserComments = ({ user }: UserIdUser) => {
  if (!user || !user.id) {
    return null
  }

  return (
    <Query query={USER_COMMENT_FEED} variables={{ id: user.id }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: UserCommentFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'node.commentedArticles'
        const { edges, pageInfo } = _get(data, connectionPath)
        const loadMore = () =>
          fetchMore({
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

        if (!edges || edges.length <= 0) {
          return <EmptyComment />
        }

        return (
          <InfiniteScroll
            hasNextPage={pageInfo.hasNextPage}
            loadMore={loadMore}
            loading={loading}
            loader={<Spinner />}
          >
            <ul className="article-list">
              {edges.map((articleEdge: { node: any; cursor: any }) => {
                const commentEdges = _get(articleEdge, 'node.comments.edges')
                const articlePath = toPath({
                  page: 'articleDetail',
                  userName: articleEdge.node.author.userName,
                  slug: articleEdge.node.slug,
                  mediaHash: articleEdge.node.mediaHash
                })

                return (
                  <li key={articleEdge.cursor} className="article-item">
                    <Link {...articlePath}>
                      <a>
                        <h3>
                          {articleEdge.node.title}
                          <Icon
                            id={ICON_CHEVRON_RIGHT.id}
                            viewBox={ICON_CHEVRON_RIGHT.viewBox}
                            style={{ width: 12, height: 12 }}
                          />
                        </h3>
                      </a>
                    </Link>

                    <ul className="comment-list">
                      {commentEdges &&
                        commentEdges.map(
                          (commentEdge: { node: any; cursor: any }) => (
                            <li key={commentEdge.cursor}>
                              <CommentDigest.Feed comment={commentEdge.node} />
                            </li>
                          )
                        )}
                    </ul>
                  </li>
                )
              })}
              <style jsx>{styles}</style>
            </ul>
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}

export default withRouter(UserCommentsWrap)
