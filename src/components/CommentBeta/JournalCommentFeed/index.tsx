import classNames from 'classnames'
import React from 'react'

import { COMMENT_FEED_ID_PREFIX, TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Avatar,
  AvatarSize,
  CommentFormType,
  DateTime,
  LinkWrapper,
} from '~/components'
import {
  JournalCommentFeedCommentPrivateFragment,
  JournalCommentFeedCommentPublicFragment,
} from '~/gql/graphql'

import Content from '../Content'
import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import { FooterActionsControls } from '../FooterActions'
import ReplyButton from '../FooterActions/ReplyButton'
import UpvoteButton from '../FooterActions/UpvoteButton'
import RoleLabel from '../RoleLabel'
// import { fragments } from './gql'
import styles from './styles.module.css'

export type JournalCommentControls = {
  avatarSize?: AvatarSize
  hasUserName?: boolean
} & FooterActionsControls &
  DropdownActionsControls

export type JournalCommentProps = {
  comment: JournalCommentFeedCommentPublicFragment &
    Partial<JournalCommentFeedCommentPrivateFragment>
  type: CommentFormType
} & JournalCommentControls

const BaseJournalCommentFeed = ({
  comment,
  type,
  avatarSize = 32,
  hasUserName,
  replySubmitCallback,
  ...actionControls
}: JournalCommentProps) => {
  const { id, author, parentComment } = comment
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const contentClasses = classNames({
    [styles.contentContainer]: true,
    // [styles.descendant]: !!parentComment,
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
          <DropdownActions
            comment={comment}
            type={type}
            hasPin={false}
            inCard={actionControls.inCard}
          />
        </section>
      </header>

      <section className={contentClasses}>
        <Content comment={comment} type={type} size={15} limit={5} />

        <section className={styles.footer}>
          <UpvoteButton comment={comment} inCard />
          <ReplyButton
            type={type}
            comment={comment}
            inCard
            onClick={() => {
              // TODO:
              // if (editor === activeEditor) {
              //   setActiveEditor(null)
              // }
              // toggleShowForm()
            }}
          />
        </section>
      </section>
    </article>
  )
}

/**
 * Memoizing
 */
type MemoizedJournalCommentFeed = React.MemoExoticComponent<
  React.FC<JournalCommentProps>
>
// & {
//   fragments: typeof fragments
// }

const JournalCommentFeed = React.memo(
  BaseJournalCommentFeed,
  ({ comment: prevComment, disabled: prevDisabled }, { comment, disabled }) => {
    return (
      prevComment.content === comment.content &&
      prevComment.upvotes === comment.upvotes &&
      prevComment.myVote === comment.myVote &&
      prevComment.state === comment.state &&
      prevComment.author.isBlocked === comment.author.isBlocked &&
      prevDisabled === disabled
    )
  }
) as MemoizedJournalCommentFeed

// JournalCommentFeed.fragments = fragments

export default JournalCommentFeed