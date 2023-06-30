import _flatten from 'lodash/flatten'
import { useContext, useEffect } from 'react'

import {
  analytics,
  filterComments,
  mergeConnections,
  toPath,
} from '~/common/utils'
import {
  ArticleDigestTitle,
  Card,
  Comment,
  EmptyComment,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { UserCommentsPublicQuery } from '~/gql/graphql'

import { USER_COMMENTS_PRIVATE, USER_COMMENTS_PUBLIC } from './gql'

type CommentedArticleComment = NonNullable<
  NonNullable<
    NonNullable<
      UserCommentsPublicQuery['node'] & { __typename: 'User' }
    >['commentedArticles']['edges']
  >[0]['node']['comments']['edges']
>[0]['node']
type CommentArticle = NonNullable<
  NonNullable<
    NonNullable<
      UserCommentsPublicQuery['node'] & { __typename: 'User' }
    >['commentedArticles']['edges']
  >[0]['node']['comments']['edges']
>[0]['node'] & { __typename: 'Article' }

const UserComments = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserCommentsPublicQuery>(USER_COMMENTS_PUBLIC, {
      variables: { id: viewer?.id },
    })

  // pagination
  const connectionPath = 'node.commentedArticles'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'User' &&
      data.node.commentedArticles &&
      data.node.commentedArticles) ||
    {}

  // private data
  const loadPrivate = (publicData?: UserCommentsPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const articles =
      publicData?.node?.__typename === 'User'
        ? publicData.node.commentedArticles.edges || []
        : []
    const publiceNodes = _flatten(
      articles.map(({ node }) =>
        (node.comments.edges || []).map(({ node: comment }) => comment)
      )
    )
    const publicIds = publiceNodes.map((comment) => comment.id)

    client.query({
      query: USER_COMMENTS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_comment',
      location: edges?.length || 0,
    })

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

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
              spacing={['tight', 0]}
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
                    spacing={['tight', 0]}
                    bgColor="none"
                    {...toPath({
                      page: 'commentDetail',
                      comment,
                      article: comment.node as CommentArticle,
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

export default UserComments
