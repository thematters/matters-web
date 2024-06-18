import classNames from 'classnames'
import React from 'react'

import { COMMENT_FEED_ID_PREFIX, TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  ArticleThreadCommentType,
  Avatar,
  AvatarSize,
  DateTime,
  LinkWrapper,
} from '~/components'
import {
  ArticleFeedCommentPrivateFragment,
  ArticleFeedCommentPublicFragment,
} from '~/gql/graphql'

import { ArticleCommentContent } from '../Content'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import RoleLabel from '../RoleLabel'
import { fragments } from './gql'
import styles from './styles.module.css'

export type CommentControls = {
  avatarSize?: AvatarSize
  hasUserName?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type CommentProps = {
  comment: ArticleFeedCommentPublicFragment &
    Partial<ArticleFeedCommentPrivateFragment>
  pinnedComment?: ArticleThreadCommentType
} & CommentControls

const BaseCommentFeed = ({
  comment,
  pinnedComment,
  avatarSize = 32,
  hasUserName,
  replySubmitCallback,
  ...actionControls
}: CommentProps) => {
  const { id, author, parentComment } = comment
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
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

  const userProfilePath = toPath({
    page: 'userProfile',
    userName: author.userName || '',
  })

  const commentDetailPath = toPath({
    page: 'commentDetail',
    comment,
    article,
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
        <ArticleCommentContent comment={comment} size={15} limit={5} />

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
type MemoizedArticleCommentFeed = React.MemoExoticComponent<
  React.FC<CommentProps>
> & {
  fragments: typeof fragments
}

export const ArticleCommentFeed = React.memo(
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
) as MemoizedArticleCommentFeed

ArticleCommentFeed.fragments = fragments
