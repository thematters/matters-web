import { useLazyQuery } from '@apollo/client'
import React from 'react'

import { AvatarSize, CommentFormType, UserDigest } from '~/components'

import Content from '../Content'
import DonatorLabel from '../DonatorLabel'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
import { fragments, REFETCH_COMMENT } from './gql'
import styles from './styles.css'

import { FeedCommentPrivate } from './__generated__/FeedCommentPrivate'
import { FeedCommentPublic } from './__generated__/FeedCommentPublic'
import { RefetchComment } from './__generated__/RefetchComment'

export type CommentControls = {
  avatarSize?: Extract<AvatarSize, 'md' | 'lg'>
  hasUserName?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type CommentProps = {
  comment: FeedCommentPublic & Partial<FeedCommentPrivate>
  type: CommentFormType
} & CommentControls

export const BaseCommentFeed = ({
  comment,
  type,
  avatarSize = 'lg',
  hasUserName,
  replySubmitCallback,
  ...actionControls
}: CommentProps) => {
  const [refetchComment] = useLazyQuery<RefetchComment>(REFETCH_COMMENT, {
    fetchPolicy: 'network-only',
  })

  const { id, replyTo, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
    }

    refetchComment({ variables: { id: parentComment?.id || id } })
  }

  return (
    <article id={actionControls.hasLink ? nodeId : ''}>
      <header>
        <UserDigest.Mini
          user={author}
          avatarSize={avatarSize}
          textSize="md-s"
          textWeight="md"
          hasAvatar
          hasDisplayName
          hasUserName={hasUserName}
        />

        <section className="right">
          <DonatorLabel comment={comment} />
          <PinnedLabel comment={comment} />
          <DropdownActions
            comment={comment}
            type={type}
            hasPin={actionControls.hasPin}
            inCard={actionControls.inCard}
          />
        </section>
      </header>

      {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
        <section className="reply-to-container">
          <ReplyTo user={replyTo.author} />
        </section>
      )}

      <section className="content-container">
        <Content comment={comment} type={type} size="md-s" />
        <FooterActions
          comment={comment}
          type={type}
          replySubmitCallback={submitCallback}
          {...actionControls}
        />
      </section>

      <style jsx>{styles}</style>
    </article>
  )
}

/**
 * Memoizing
 */
type MemoizedCommentFeed = React.MemoExoticComponent<React.FC<CommentProps>> & {
  fragments: typeof fragments
}

const CommentFeed = React.memo(
  BaseCommentFeed,
  ({ comment: prevComment, disabled: prevDisabled }, { comment, disabled }) => {
    return (
      prevComment.content === comment.content &&
      prevComment.upvotes === comment.upvotes &&
      prevComment.downvotes === comment.downvotes &&
      prevComment.state === comment.state &&
      prevComment.pinned === comment.pinned &&
      prevComment.author.isBlocked === comment.author.isBlocked &&
      prevDisabled === disabled
    )
  }
) as MemoizedCommentFeed

CommentFeed.fragments = fragments

export default CommentFeed
