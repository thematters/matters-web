import classNames from 'classnames'
import React from 'react'

import { COMMENT_FEED_ID_PREFIX, TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Avatar,
  AvatarSize,
  CommentThreadCommentType,
  DateTime,
  LinkWrapper,
} from '~/components'
import {
  CommentFeedCommentPrivateFragment,
  CommentFeedCommentPublicFragment,
  RoleLabelCommentFragment,
} from '~/gql/graphql'

import { CommentContent } from '../Content'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import RoleLabel from '../RoleLabel'
import { fragments } from './gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type CommentControls = {
  avatarSize?: AvatarSize
  hasUserName?: boolean
  spacingLeft?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type CommentProps = {
  comment: CommentFeedCommentPublicFragment &
    Partial<CommentFeedCommentPrivateFragment>
  pinnedComment?: CommentThreadCommentType
} & CommentControls

const BaseCommentFeed = ({
  comment,
  pinnedComment,
  avatarSize = 32,
  hasUserName,
  spacingLeft,
  replySubmitCallback,
  ...actionControls
}: CommentProps) => {
  const { id, author, parentComment } = comment
  const node =
    comment.node.__typename === 'Article' ||
    comment.node.__typename === 'Moment'
      ? comment.node
      : undefined
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
    }
  }

  const contentClasses = classNames({
    [styles.contentContainer]: true,
    [styles.spacingLeft]: !!spacingLeft,
    [styles.descendant]: !!parentComment,
  })

  const userProfilePath = toPath({
    page: 'userProfile',
    userName: author.userName || '',
  })

  const commentDetailPath = toPath({
    page: 'commentDetail',
    comment,
    article: node,
    moment: node,
  })

  return (
    <article
      className={styles.comment}
      id={`${COMMENT_FEED_ID_PREFIX}${nodeId}`}
      data-test-id={TEST_ID.ARTICLE_COMMENT_FEED}
    >
      <header className={styles.header}>
        <section className={styles.left}>
          <section className={styles.author}>
            <LinkWrapper {...userProfilePath}>
              <Avatar user={author} />
            </LinkWrapper>
            <section className={styles.info}>
              <section className={styles.top}>
                <LinkWrapper {...userProfilePath}>
                  <section className={styles.displayName}>
                    {author.displayName}
                  </section>
                </LinkWrapper>
                <RoleLabel comment={comment as RoleLabelCommentFragment} />
              </section>
              <LinkWrapper {...commentDetailPath}>
                <DateTime date={comment.createdAt} color="grey" />
              </LinkWrapper>
            </section>
          </section>
        </section>
        <section className={styles.right}>
          <PinnedLabel comment={comment} />
          <DropdownActions
            comment={comment}
            pinnedComment={pinnedComment}
            hasPin={actionControls.hasPin}
            inCard={actionControls.inCard}
          />
        </section>
      </header>

      <section className={contentClasses}>
        <CommentContent comment={comment} size={15} limit={5} />

        <FooterActions
          comment={comment}
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
  Placeholder: typeof Placeholder
}

export const CommentFeed = React.memo(
  BaseCommentFeed,
  (
    {
      comment: prevComment,
      pinnedComment: prevPinnedComment,
      disabled: prevDisabled,
    },
    { comment, pinnedComment, disabled }
  ) => {
    return (
      prevComment.content === comment.content &&
      prevComment.upvotes === comment.upvotes &&
      prevComment.myVote === comment.myVote &&
      prevComment.state === comment.state &&
      prevComment.pinned === comment.pinned &&
      prevComment.author.isBlocked === comment.author.isBlocked &&
      prevDisabled === disabled &&
      prevPinnedComment?.id === pinnedComment?.id
    )
  }
) as MemoizedCommentFeed

CommentFeed.fragments = fragments
CommentFeed.Placeholder = Placeholder
