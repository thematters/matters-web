import { useQuery } from '@apollo/react-hooks'
import _flatten from 'lodash/flatten'
import { useContext, useEffect } from 'react'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png'
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
  Head,
  InfiniteScroll,
  List,
  Media,
  QueryError,
  Spinner,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserCommentsPublicQuery, UserIdUserQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import { USER_COMMENTS_PRIVATE, USER_COMMENTS_PUBLIC, USER_ID } from './gql'

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
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const { data, loading, error } = useQuery<UserIdUserQuery>(USER_ID, {
    variables: { userName },
  })
  const user = data?.user

  if (loading) {
    return (
      <>
        <UserTabs />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <UserTabs />
        <QueryError error={error} />
      </>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return (
      <>
        <UserTabs />
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
        // keywords={...} // show user's top10 most used tags?
        description={user.info.description}
        image={user.info.profileCover || IMAGE_LOGO_192.src}
      />
      <UserTabs />
      <Media at="sm">
        <BaseUserComments user={user} spacingX="base" />
      </Media>
      <Media greaterThan="sm">
        <BaseUserComments user={user} spacingX={0} />
      </Media>
    </>
  )
}

const BaseUserComments = ({
  user,
  spacingX,
}: { spacingX: 0 | 'base' } & UserIdUserQuery) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserCommentsPublicQuery>(USER_COMMENTS_PUBLIC, {
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
  const loadPrivate = (publicData?: UserCommentsPublicQuery) => {
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
              spacing={['tight', spacingX]}
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
                    spacing={['tight', spacingX]}
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
