import { useContext, useEffect } from 'react'

import { filterComments, mergeConnections } from '~/common/utils'
import {
  QueryError,
  usePublicQuery,
  ViewerContext,
  ViewMoreCommentButton,
} from '~/components'
import {
  DescendantCommentsCommentPrivateQuery,
  DescendantCommentsCommentPublicQuery,
} from '~/gql/graphql'

import Feed from '../../Feed'
import Placeholder from '../../Placeholder'
import {
  DESCENDANT_COMMENTS_COMMENT_PRIVATE,
  DESCENDANT_COMMENTS_COMMENT_PUBLIC,
} from '../gql'
import styles from './styles.module.css'

type DescendantCommentPublic = NonNullable<
  NonNullable<
    DescendantCommentsCommentPublicQuery['comment'] & { __typename: 'Comment' }
  >['comments']['edges']
>[0]['node']
type DescendantCommentPrivate = NonNullable<
  NonNullable<DescendantCommentsCommentPrivateQuery['nodes']>[0] & {
    __typename: 'Comment'
  }
>

type DescendantComment = DescendantCommentPublic &
  Partial<Omit<DescendantCommentPrivate, '__typename'>>

type Comment = NonNullable<
  DescendantCommentsCommentPublicQuery['comment'] & { __typename: 'Comment' }
>

type Props = {
  id: string
  replySubmitCallback?: () => void
}

export const DescendantComments = ({ id, ...props }: Props) => {
  const viewer = useContext(ViewerContext)

  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<DescendantCommentsCommentPublicQuery>(
      DESCENDANT_COMMENTS_COMMENT_PUBLIC,
      {
        variables: {
          id,
        },
        fetchPolicy: 'cache-and-network',
      }
    )

  // pagination
  const connectionPath = 'comment.comments'
  const comment = data?.comment as Comment
  const { edges, pageInfo } = comment?.comments || {}

  // const descendantComments = filterComments<DescendantCommentPublic>(
  //   (edges || []).map(({ node }) => node)
  // )

  // private data
  const loadPrivate = (publicData?: DescendantCommentsCommentPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = (publicData.comment as Comment).comments.edges || []
    const publicDescendantComments = filterComments<DescendantComment>(
      publiceEdges.map(({ node }) => node)
    )

    const publicIds = publicDescendantComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    client.query({
      query: DESCENDANT_COMMENTS_COMMENT_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [id, viewer.id])

  // load next page
  const loadMore = async () => {
    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
        first: 30,
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

  if (edges?.length === 0) {
    return null
  }

  return (
    <>
      <ul className={styles.descendants}>
        {edges?.map(({ node: descendantComment }) => (
          <li key={descendantComment.id}>
            <Feed
              comment={descendantComment}
              type={'article'}
              avatarSize="md"
              hasReply
              hasUserName
              {...props}
            />
          </li>
        ))}
      </ul>
      {!pageInfo.hasNextPage && <ViewMoreCommentButton onClick={loadMore} />}
    </>
  )
}
