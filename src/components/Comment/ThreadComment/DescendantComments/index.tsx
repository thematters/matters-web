import classNames from 'classnames'
import _uniqBy from 'lodash/uniqBy'
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

import { CommentFeed } from '../../Feed'
import Placeholder from '../../Placeholder'
import { CommentThreadCommentType } from '..'
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
  endCurosr: string
  isInCommentDetail?: boolean
  comments?: CommentThreadCommentType[]
  pinnedComment?: CommentThreadCommentType
}

export const DescendantComments = ({
  id,
  comments,
  pinnedComment,
  endCurosr,
  isInCommentDetail,
  ...props
}: Props) => {
  const viewer = useContext(ViewerContext)

  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<DescendantCommentsCommentPublicQuery>(
      DESCENDANT_COMMENTS_COMMENT_PUBLIC,
      {
        variables: {
          id,
          after: endCurosr,
        },
        fetchPolicy: 'cache-and-network',
      }
    )

  // pagination
  const connectionPath = 'comment.comments'
  const comment = data?.comment as Comment
  const { edges, pageInfo } = comment?.comments || {}

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

  const uniqueResult = _uniqBy(
    [
      ...(comments || []),
      ...(filterComments(
        (edges || []).map(({ node }) => node)
      ) as CommentThreadCommentType[]),
    ],
    (comment) => comment.id
  )

  const result = uniqueResult.sort((n1, n2) => {
    return Date.parse(n1.createdAt) - Date.parse(n2.createdAt)
  })

  if (result.length === 0) {
    return null
  }

  return (
    <>
      {result.map((node, index) => (
        <li
          key={node.id}
          className={classNames({
            [styles.lastDescendant]: index === result.length - 1,
          })}
        >
          <CommentFeed
            comment={node}
            pinnedComment={pinnedComment}
            hasReply
            isInCommentDetail={isInCommentDetail}
            {...props}
          />
        </li>
      ))}
      {pageInfo.hasNextPage && <ViewMoreCommentButton onClick={loadMore} />}
    </>
  )
}
