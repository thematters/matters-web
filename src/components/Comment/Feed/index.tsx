import { useLazyQuery } from '@apollo/react-hooks'
import React from 'react'

import { AvatarSize, UserDigest } from '~/components'

import Content from '../Content'
import DropdownActions from '../DropdownActions'
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
} & FooterActionsControls

export type CommentProps = {
  comment: FeedCommentPublic & Partial<FeedCommentPrivate>
} & CommentControls

export const BaseCommentFeed = ({
  comment,
  avatarSize = 'lg',
  hasUserName,
  commentCallback,
  ...actionControls
}: CommentProps) => {
  const [refetchComment] = useLazyQuery<RefetchComment>(REFETCH_COMMENT)

  const { id, replyTo, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const footerCommentCallback = () => {
    if (commentCallback) {
      commentCallback()
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
          <PinnedLabel comment={comment} />
          <DropdownActions comment={comment} inCard={actionControls.inCard} />
        </section>
      </header>

      {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
        <section className="reply-to-container">
          <ReplyTo user={replyTo.author} />
        </section>
      )}

      <section className="content-container">
        <Content comment={comment} size="md-s" />
        <FooterActions
          comment={comment}
          commentCallback={footerCommentCallback}
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
  ({ comment: prevComment }, { comment }) => {
    return (
      prevComment.content === comment.content &&
      prevComment.upvotes === comment.upvotes &&
      prevComment.downvotes === comment.downvotes &&
      prevComment.state === comment.state
    )
  }
) as MemoizedCommentFeed

CommentFeed.fragments = fragments

export default CommentFeed
