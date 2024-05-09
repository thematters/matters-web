import { useLazyQuery } from '@apollo/react-hooks'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import { AvatarSize, CommentFormType, Media, UserDigest } from '~/components'
import {
  FeedCommentPrivateFragment,
  FeedCommentPublicFragment,
  RefetchCommentQuery,
} from '~/gql/graphql'

import Content from '../Content'
import DonatorLabel from '../DonatorLabel'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
import { fragments, REFETCH_COMMENT } from './gql'
import styles from './styles.module.css'

export type CommentControls = {
  avatarSize?: AvatarSize
  hasUserName?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type CommentProps = {
  comment: FeedCommentPublicFragment & Partial<FeedCommentPrivateFragment>
  type: CommentFormType
} & CommentControls

export const BaseCommentFeed = ({
  comment,
  type,
  avatarSize = 32,
  hasUserName,
  replySubmitCallback,
  ...actionControls
}: CommentProps) => {
  const [refetchComment] = useLazyQuery<RefetchCommentQuery>(REFETCH_COMMENT, {
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
    <article
      className={styles.comment}
      id={actionControls.hasLink ? nodeId : ''}
      data-test-id={TEST_ID.ARTICLE_COMMENT_FEED}
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
        <section className={styles.replyToContainer}>
          <ReplyTo user={replyTo.author} />
        </section>
      )}

      <section className={styles.contentContainer}>
        <Media at="sm">
          <Content comment={comment} type={type} size={15} limit={17} />
        </Media>
        <Media greaterThan="sm">
          <Content comment={comment} type={type} size={15} limit={13} />
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
type MemoizedCommentFeed = React.MemoExoticComponent<React.FC<CommentProps>> & {
  fragments: typeof fragments
}

const CommentFeed = React.memo(
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
) as MemoizedCommentFeed

CommentFeed.fragments = fragments

export default CommentFeed
