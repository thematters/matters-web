import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { useContext } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Error, Icon, InfiniteScroll, Placeholder, Spinner } from '~/components'
import { CommentDigest } from '~/components/CommentDigest'
import { ViewerContext } from '~/components/Viewer'

import { mergeConnections, toPath } from '~/common/utils'
import ICON_CHEVRON_RIGHT from '~/static/icons/chevron-right.svg?sprite'

import EmptyComments from '../EmptyComments'
import { MeCommentFeed } from './__generated__/MeCommentFeed'
import styles from './styles.css'

const ME_COMMENT_FEED = gql`
  query MeCommentFeed($cursor: String, $viewerId: ID) {
    viewer {
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
            comments(input: { author: $viewerId }) {
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
  ${CommentDigest.Feed.fragments.comment}
`

export default () => {
  const viewer = useContext(ViewerContext)

  return (
    <Query query={ME_COMMENT_FEED} variables={{ viewerId: viewer.id }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: MeCommentFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'viewer.commentedArticles'
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

        if (edges.length <= 0) {
          return <EmptyComments />
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
