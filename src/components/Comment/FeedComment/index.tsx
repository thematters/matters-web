import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'

import { AvatarSize, UserDigest } from '~/components'
import CommentForm from '~/components/Form/CommentForm'

import CancelEditButton from '../CancelEditButton'
import Content from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from './ReplyTo'
import styles from './styles.css'

import { FeedCommentComment } from './__generated__/FeedCommentComment'

export type CommentControls = {
  avatarSize?: Extract<AvatarSize, 'md' | 'lg'>
  hasUserName?: boolean
} & FooterActionsControls

export type CommentProps = {
  comment: FeedCommentComment
} & CommentControls

const fragments = {
  comment: gql`
    fragment FeedCommentComment on Comment {
      id
      author {
        id
        ...UserDigestMiniUser
      }
      replyTo {
        id
        author {
          id
          ...ReplyToUser
        }
      }
      ...ContentComment
      ...PinnedLabelComment
      ...DropdownActionsComment
      ...FooterActionsComment
    }

    ${UserDigest.Mini.fragments.user}
    ${ReplyTo.fragments.user}
    ${Content.fragments.comment}
    ${PinnedLabel.fragments.comment}
    ${DropdownActions.fragments.comment}
    ${FooterActions.fragments.comment}
  `
}

export const FeedComment = ({
  comment,
  refetch,
  avatarSize = 'lg',
  hasUserName,
  ...actionControls
}: CommentProps) => {
  const [edit, setEdit] = useState(false)
  const { id, article, replyTo, content, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  return (
    <article id={actionControls.hasLink ? nodeId : ''}>
      <header>
        <UserDigest.Mini
          user={author}
          avatarSize={avatarSize}
          textSize="md-s"
          textWeight="md"
          hasUserName={hasUserName}
        />

        <section className="right">
          <PinnedLabel comment={comment} />

          <DropdownActions
            comment={comment}
            editComment={() => setEdit(true)}
          />
        </section>
      </header>

      {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
        <ReplyTo user={replyTo.author} />
      )}

      <section className="content-container">
        {edit && (
          <CommentForm
            commentId={id}
            articleId={article.id}
            articleAuthorId={article.author.id}
            submitCallback={() => setEdit(false)}
            extraButton={<CancelEditButton onClick={() => setEdit(false)} />}
            blocked={article.author.isBlocking}
            defaultContent={content}
            defaultExpand={edit}
          />
        )}

        {!edit && <Content comment={comment} />}

        {!edit && <FooterActions comment={comment} {...actionControls} />}
      </section>

      <style jsx>{styles}</style>
    </article>
  )
}

FeedComment.fragments = fragments

export default FeedComment
