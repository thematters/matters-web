import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { filterComments } from '~/common/utils'
import { ViewMoreCommentButton } from '~/components'
import {
  CommentThreadCommentCommentPrivateFragment,
  CommentThreadCommentCommentPublicFragment,
} from '~/gql/graphql'

import { CommentFeed } from '../Feed'
import { DescendantComments } from './DescendantComments'
import { fragments } from './gql'
import styles from './styles.module.css'

const COLLAPSE_COUNT = 3

interface CommentThreadCommentControls {
  hasPin?: boolean
  hasLink?: boolean
  hasUpvote?: boolean
  hasDownvote?: boolean
  replySubmitCallback?: () => void
  disabled?: boolean
  firstRenderCallback?: () => void
  isInCommentDetail?: boolean
}

export type CommentThreadCommentType =
  CommentThreadCommentCommentPublicFragment &
    Partial<CommentThreadCommentCommentPrivateFragment>

type ThreadCommentProps = {
  comment: CommentThreadCommentType
  pinnedComment?: CommentThreadCommentType
} & CommentThreadCommentControls

export const CommentThreadComment = ({
  comment,
  pinnedComment,
  firstRenderCallback,
  isInCommentDetail,
  ...props
}: ThreadCommentProps) => {
  const { pageInfo } = comment.comments
  const descendants = filterComments(
    (comment.comments?.edges || []).map(({ node }) => node)
  ) as CommentThreadCommentType[]
  const [showViewMore, setShowViewMore] = useState(true)

  useEffect(() => {
    if (firstRenderCallback) {
      firstRenderCallback()
    }
  }, [])

  if (!pageInfo.hasNextPage) {
    return (
      <section className={styles.container}>
        <CommentFeed
          comment={comment}
          isInCommentDetail={isInCommentDetail}
          pinnedComment={pinnedComment}
          hasReply
          {...props}
        />

        {descendants.length > 0 && (
          <ul className={styles.descendants}>
            {descendants.map((descendantComment, index) => (
              <li
                key={descendantComment.id}
                className={classNames({
                  [styles.lastDescendant]: index === descendants.length - 1,
                })}
              >
                <CommentFeed
                  comment={descendantComment}
                  pinnedComment={pinnedComment}
                  hasReply
                  isInCommentDetail={isInCommentDetail}
                  {...props}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }
  const subComments = descendants.slice(COLLAPSE_COUNT)

  return (
    <section className={styles.container}>
      <CommentFeed
        comment={comment}
        pinnedComment={pinnedComment}
        hasReply
        {...props}
      />

      <ul className={styles.descendants}>
        {descendants.slice(0, COLLAPSE_COUNT).map((descendantComment) => (
          <li key={descendantComment.id}>
            <CommentFeed
              comment={descendantComment}
              pinnedComment={pinnedComment}
              hasReply
              isInCommentDetail={isInCommentDetail}
              {...props}
            />
          </li>
        ))}
        {showViewMore && (
          <>
            {subComments.map((descendantComment) => (
              <li key={descendantComment.id}>
                <CommentFeed
                  comment={descendantComment}
                  pinnedComment={pinnedComment}
                  hasReply
                  isInCommentDetail={isInCommentDetail}
                  {...props}
                />
              </li>
            ))}
            <ViewMoreCommentButton onClick={() => setShowViewMore(false)} />
          </>
        )}
        {!showViewMore && (
          <DescendantComments
            id={comment.id}
            endCurosr={pageInfo.endCursor || ''}
            comments={subComments}
            isInCommentDetail={isInCommentDetail}
            pinnedComment={pinnedComment}
            {...props}
          />
        )}
      </ul>
    </section>
  )
}

CommentThreadComment.fragments = fragments
