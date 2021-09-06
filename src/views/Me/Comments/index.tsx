import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  ArticleDigestTitle,
  Card,
  Comment,
  EmptyComment,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
  ViewerContext,
} from '~/components'

import { filterComments, mergeConnections, toPath } from '~/common/utils'

import {
  MeCommentsFeed,
  MeCommentsFeed_viewer_commentedArticles_edges_node_comments_edges_node,
  MeCommentsFeed_viewer_commentedArticles_edges_node_comments_edges_node_node_Article,
} from './__generated__/MeCommentsFeed'

type CommentedArticle =
  MeCommentsFeed_viewer_commentedArticles_edges_node_comments_edges_node_node_Article
type CommentedArticleComment =
  MeCommentsFeed_viewer_commentedArticles_edges_node_comments_edges_node

const ME_COMMENTS_FEED = gql`
  query MeCommentsFeed($id: ID!, $after: String) {
    viewer {
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
  ${ArticleDigestTitle.fragments.article}
  ${Comment.Feed.fragments.comment.public}
  ${Comment.Feed.fragments.comment.private}
`

const BaseMeComments = () => {
  const viewer = useContext(ViewerContext)

  const { data, loading, error, fetchMore } = useQuery<MeCommentsFeed>(
    ME_COMMENTS_FEED,
    {
      variables: { id: viewer.id },
    }
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.commentedArticles'
  const { edges, pageInfo } = data?.viewer?.commentedArticles || {}

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyComment />
  }

  const articleEdges = edges
    .map((edge) => {
      const commentEdges = edge.node.comments.edges || []
      const comments = filterComments<CommentedArticleComment>(
        commentEdges.map(({ node }) => node)
      )
      return { ...edge, comments }
    })
    .filter(({ comments }) => comments.length > 0)

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List spacing={['loose', 0]}>
        {articleEdges.map(({ cursor, node, comments }) => (
          <List.Item key={cursor}>
            <Card
              spacing={['tight', 'base']}
              bgColor="none"
              {...toPath({
                page: 'articleDetail',
                article: node,
              })}
            >
              <ArticleDigestTitle article={node} is="h3" />
            </Card>

            <List hasBorder={false}>
              {comments.map((comment) => (
                <List.Item key={comment.id}>
                  <Card
                    spacing={['tight', 'base']}
                    {...toPath({
                      page: 'commentDetail',
                      comment,
                      article: comment.node as CommentedArticle,
                    })}
                  >
                    <Comment.Feed
                      comment={comment}
                      type="article"
                      hasCreatedAt
                      hasLink
                      inCard
                    />
                  </Card>
                </List.Item>
              ))}
            </List>
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeComments = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myComments" />}
    />

    <Head title={{ id: 'myComments' }} />

    <BaseMeComments />
  </Layout.Main>
)

export default MeComments
