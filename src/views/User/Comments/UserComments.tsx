import { useQuery } from '@apollo/react-hooks'
import _flatten from 'lodash/flatten'
import { useContext, useEffect } from 'react'

import {
  ArticleDigestTitle,
  Card,
  Comment,
  EmptyComment,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import {
  analytics,
  filterComments,
  mergeConnections,
  toPath,
} from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import UserTabs from '../UserTabs'
import { USER_COMMENTS_PRIVATE, USER_COMMENTS_PUBLIC, USER_ID } from './gql'

import {
  UserCommentsPublic,
  UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node,
  UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Article,
} from './__generated__/UserCommentsPublic'
import { UserIdUser } from './__generated__/UserIdUser'

type CommentedArticleComment = UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node
type CommentArticle = UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Article

const UserComments = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const { data, loading, error } = useQuery<UserIdUser>(USER_ID, {
    variables: { userName },
  })
  const user = data?.user
  const hasSubscriptions = (user?.subscribedCircles?.totalCount || 0) > 0

  if (loading) {
    return (
      <>
        <UserTabs hasSubscriptions={hasSubscriptions} />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <UserTabs hasSubscriptions={hasSubscriptions} />
        <QueryError error={error} />
      </>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return (
      <>
        <UserTabs hasSubscriptions={hasSubscriptions} />
        <EmptyComment />
      </>
    )
  }

  return (
    <>
      <Head
        title={{
          zh_hant: `${user.displayName} 發布的評論`,
          zh_hans: `${user.displayName} 发布的评论`,
          en: `${user.displayName}'s comments`,
        }}
        description={user.info.description}
        image={user.info.profileCover || IMAGE_LOGO_192}
      />
      <UserTabs hasSubscriptions={hasSubscriptions} />
      <BaseUserComments user={user} />
    </>
  )
}

const BaseUserComments = ({ user }: UserIdUser) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<UserCommentsPublic>(USER_COMMENTS_PUBLIC, {
    variables: { id: user?.id },
  })

  // pagination
  const connectionPath = 'node.commentedArticles'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'User' &&
      data.node.commentedArticles &&
      data.node.commentedArticles) ||
    {}

  // private data
  const loadPrivate = (publicData?: UserCommentsPublic) => {
    if (!viewer.isAuthed || !publicData || !user) {
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
  }, [user?.id, viewer.id])

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

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

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
