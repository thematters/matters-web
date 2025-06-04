import classNames from 'classnames'
import React from 'react'

import {
  COMMENT_FEED_ID_PREFIX,
  NEW_POST_COMMENT_MUTATION_RESULT,
  TEST_ID,
} from '~/common/enums'
import { sessionStorage, toPath } from '~/common/utils'
import {
  Avatar,
  CommentThreadCommentType,
  DateTime,
  LinkWrapper,
} from '~/components'
import {
  CommentFeedCommentPrivateFragment,
  CommentFeedCommentPublicFragment,
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

  const isMoment = comment.node.__typename === 'Moment'
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

  const newPostCommentMutationResult = sessionStorage.get(
    NEW_POST_COMMENT_MUTATION_RESULT
  )

  const isNewPostComment = newPostCommentMutationResult === id

  const commentClasses = classNames({
    [styles.comment]: true,
    [styles.playSlideDownFade]: isNewPostComment,
    [styles.momentComment]: isMoment,
  })

  return (
    <article
      className={commentClasses}
      id={`${COMMENT_FEED_ID_PREFIX}${nodeId}`}
      data-test-id={TEST_ID.ARTICLE_COMMENT_FEED}
      onAnimationEnd={() => {
        if (isNewPostComment) {
          sessionStorage.remove(NEW_POST_COMMENT_MUTATION_RESULT)
        }
      }}
    >
      <header className={styles.header}>
        <section className={styles.left}>
          <section
            className={styles.author}
            data-test-id={TEST_ID.ARTICLE_COMMENT_FEED_AUTHOR}
          >
            <LinkWrapper {...userProfilePath}>
              <Avatar user={author} />
            </LinkWrapper>
            <section className={styles.info}>
              <section className={styles.top}>
                <LinkWrapper {...userProfilePath}>
                  <section
                    className={styles.displayName}
                    data-test-id={
                      TEST_ID.ARTICLE_COMMENT_FEED_AUTHOR_DISPLAY_NAME
                    }
                  >
                    {author.displayName}
                  </section>
                </LinkWrapper>
                <RoleLabel comment={comment} />
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
        <CommentContent
          comment={comment}
          size={15}
          limit={5}
          expandable={!isMoment}
        />

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
      prevPinnedComment?.id === pinnedComment?.id &&
      prevComment.fromDonator === comment.fromDonator &&
      prevComment.dropdownComments.totalCount ===
        comment.dropdownComments.totalCount
    )
  }
) as MemoizedCommentFeed

CommentFeed.fragments = fragments
CommentFeed.Placeholder = Placeholder
