import { useContext, useEffect } from 'react'

import { COMMENTS_COUNT } from '~/common/enums'
import { filterComments, mergeConnections } from '~/common/utils'
import {
  ArticleCommentForm,
  CommentThreadComment,
  EmptyComment,
  InfiniteScroll,
  List,
  Media,
  QueryError,
  Spacer,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  LatestCommentsPrivateQuery,
  LatestCommentsPublicQuery,
} from '~/gql/graphql'

import { Placeholder } from '../Placeholder'
import { LATEST_COMMENTS_PRIVATE, LATEST_COMMENTS_PUBLIC } from './gql'

type CommentPublic = NonNullable<
  NonNullable<
    LatestCommentsPublicQuery['article'] & { __typename: 'Article' }
  >['comments']['edges']
>[0]['node']
type CommentPrivate = NonNullable<
  NonNullable<LatestCommentsPrivateQuery['nodes']>[0] & {
    __typename: 'Comment'
  }
>
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

type CommentArticle = NonNullable<
  LatestCommentsPublicQuery['article'] & { __typename: 'Article' }
>

const LatestComments = ({ id, lock }: { id: string; lock: boolean }) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<LatestCommentsPublicQuery>(LATEST_COMMENTS_PUBLIC, {
      variables: { id, first: COMMENTS_COUNT },
      fetchPolicy: 'cache-and-network',
    })

  // pagination
  const connectionPath = 'article.comments'
  const article = data?.article as CommentArticle
  const { edges, pageInfo } = article?.comments || {}

  const articleId = article?.id
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )
  const pinnedComment = article?.pinnedComments?.[0]

  // private data
  const loadPrivate = (publicData?: LatestCommentsPublicQuery) => {
    if (!viewer.isAuthed || !publicData || !articleId) {
      return
    }

    const publiceEdges =
      (publicData.article as CommentArticle)?.comments.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    client.query({
      query: LATEST_COMMENTS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    // FIXME: Delayed loading of private data allows private data to guarantee writing to the final result
    setTimeout(() => {
      loadPrivate(data)
    }, 100)
  }, [articleId, viewer.id])

  // load next page
  const loadMore = async () => {
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

  /**
   * Render
   */
  if (loading && !data) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <section id="latest-comments">
      <Media greaterThan="sm">
        <ArticleCommentForm
          articleId={article?.id}
          isFallbackEditor
          showClear
        />
        <Spacer size="sp16" />
      </Media>
      {!comments || (comments.length <= 0 && <EmptyComment />)}
      {!!comments && comments.length > 0 && (
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          loader={
            <>
              <Placeholder />
              <Spacer size="sp24" />
            </>
          }
          eof
          eofSpacingTop="base"
        >
          <List spacing={[0, 0]} hasBorder={false}>
            {!!pinnedComment && (
              <List.Item key={pinnedComment.id}>
                <CommentThreadComment
                  comment={pinnedComment}
                  hasLink
                  disabled={lock}
                />
              </List.Item>
            )}
            {comments.map(
              (comment) =>
                !comment.pinned &&
                comment.state !== 'archived' && (
                  <List.Item key={comment.id}>
                    <CommentThreadComment
                      comment={comment}
                      pinnedComment={pinnedComment}
                      hasLink
                      disabled={lock}
                    />
                  </List.Item>
                )
            )}
          </List>
        </InfiniteScroll>
      )}
    </section>
  )
}

export default LatestComments
