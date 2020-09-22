import { useQuery } from '@apollo/react-hooks'
import _flatten from 'lodash/flatten'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import {
  ArticleDigestTitle,
  Card,
  Comment,
  EmptyComment,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  usePublicQuery,
  usePullToRefresh,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import {
  analytics,
  filterComments,
  getQuery,
  mergeConnections,
  toPath,
} from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import UserTabs from '../UserTabs'
import { USER_COMMENTS_PRIVATE, USER_COMMENTS_PUBLIC, USER_ID } from './gql'

import {
  UserCommentsPublic,
  UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node,
} from './__generated__/UserCommentsPublic'
import { UserIdUser } from './__generated__/UserIdUser'

type CommentedArticleComment = UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node

const UserComments = () => {
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
        image={user.info.profileCover || IMAGE_LOGO_192}
      />
      <UserTabs />
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
      variables: {
        after: pageInfo?.endCursor,
      },
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
  if (!user || !user.id) {
    return null
  }

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
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default UserComments
