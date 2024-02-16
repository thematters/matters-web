import classNames from 'classnames'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import {
  Avatar,
  AvatarSize,
  CommentFormType,
  DateTime,
  Media,
} from '~/components'
import {
  FeedCommentBetaPrivateFragment,
  FeedCommentBetaPublicFragment,
} from '~/gql/graphql'

import Content from '../Content'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import RoleLabel from '../RoleLabel'
import { fragments } from './gql'
import styles from './styles.module.css'

export type CommentControls = {
  avatarSize?: Extract<AvatarSize, 'md' | 'lg'>
  hasUserName?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type CommentProps = {
  comment: FeedCommentBetaPublicFragment &
    Partial<FeedCommentBetaPrivateFragment>
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
  const { id, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
    }
  }

  const contentClasses = classNames({
    [styles.contentContainer]: true,
    [styles.descendant]: !!parentComment,
  })

  return (
    <article
      className={styles.comment}
      id={nodeId}
      data-test-id={TEST_ID.ARTICLE_COMMENT_FEED}
    >
      <header className={styles.header}>
        <section className={styles.left}>
          <section className={styles.author}>
            <Avatar user={author} />
            <section className={styles.info}>
              <section className={styles.top}>
                <section className={styles.displayName}>
                  {author.displayName}
                </section>
                <RoleLabel comment={comment} />
              </section>
              <DateTime date={comment.createdAt} color="grey" />
            </section>
          </section>
        </section>
        <section className={styles.right}>
          <PinnedLabel comment={comment} />
          <DropdownActions
            comment={comment}
            type={type}
            hasPin={actionControls.hasPin}
            inCard={actionControls.inCard}
          />
        </section>
      </header>

      <section className={contentClasses}>
        <Media at="sm">
          <Content comment={comment} type={type} size="mdS" limit={5} />
        </Media>
        <Media greaterThan="sm">
          <Content comment={comment} type={type} size="mdS" limit={5} />
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
