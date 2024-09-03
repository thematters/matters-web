import { useLazyQuery } from '@apollo/client'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import {
  AvatarSize,
  CircleCommentFormType,
  Media,
  UserDigest,
} from '~/components'
import {
  CircleCommentFeedCommentPrivateFragment,
  CircleCommentFeedCommentPublicFragment,
  RefetchCircleCommentQuery,
} from '~/gql/graphql'

import { CircleCommentContent } from '../Content'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import ReplyTo from '../ReplyTo'
import { fragments, REFETCH_CIRCLE_COMMENT } from './gql'
import styles from './styles.module.css'

export type CircleCommentControls = {
  avatarSize?: AvatarSize
  hasUserName?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type CircleCommentProps = {
  comment: CircleCommentFeedCommentPublicFragment &
    Partial<CircleCommentFeedCommentPrivateFragment>
  type: CircleCommentFormType
} & CircleCommentControls

const BaseCommentFeed = ({
  comment,
  type,
  avatarSize = 32,
  hasUserName,
  replySubmitCallback,
  ...actionControls
}: CircleCommentProps) => {
  const [refetchComment] = useLazyQuery<RefetchCircleCommentQuery>(
    REFETCH_CIRCLE_COMMENT,
    {
      fetchPolicy: 'network-only',
    }
  )

  const { id, replyTo, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
    }

    refetchComment({ variables: { id: parentComment?.id || id } })
  }

  return (
    <article
      className={styles.comment}
      id={actionControls.hasLink ? nodeId : ''}
      data-test-id={TEST_ID.CIRCLE_COMMENT_FEED}
    >
      <header className={styles.header}>
        <UserDigest.Mini
          user={author}
          avatarSize={avatarSize}
          textSize={15}
          textWeight="medium"
          hasAvatar
          hasDisplayName
          hasUserName={hasUserName}
        />

        <section className={styles.right}>
          <DropdownActions
            comment={comment}
            type={type}
            hasPin={actionControls.hasPin}
            inCard={actionControls.inCard}
          />
        </section>
      </header>

      {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
        <section className={styles.replyToContainer}>
          <ReplyTo user={replyTo.author} />
        </section>
      )}

      <section className={styles.contentContainer}>
        <Media at="sm">
          <CircleCommentContent
            comment={comment}
            type={type}
            size={15}
            limit={17}
          />
        </Media>
        <Media greaterThan="sm">
          <CircleCommentContent
            comment={comment}
            type={type}
            size={15}
            limit={13}
          />
        </Media>

        <FooterActions
          comment={comment}
          type={type}
          replySubmitCallback={submitCallback}
          {...actionControls}
        />
      </section>
    </article>
  )
}

/**
 * Memoizing
 */
type MemoizedCircleCommentFeed = React.MemoExoticComponent<
  React.FC<CircleCommentProps>
> & {
  fragments: typeof fragments
}

export const CircleCommentFeed = React.memo(
  BaseCommentFeed,
  ({ comment: prevComment, disabled: prevDisabled }, { comment, disabled }) => {
    return (
      prevComment.content === comment.content &&
      prevComment.upvotes === comment.upvotes &&
      prevComment.myVote === comment.myVote &&
      prevComment.state === comment.state &&
      prevComment.pinned === comment.pinned &&
      prevComment.author.isBlocked === comment.author.isBlocked &&
      prevDisabled === disabled
    )
  }
) as MemoizedCircleCommentFeed

CircleCommentFeed.fragments = fragments
