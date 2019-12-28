import classNames from 'classnames'
import _get from 'lodash/get'
import { useState } from 'react'

import CommentForm from '~/components/Form/CommentForm'
import { FeedDigestComment_comments_edges_node } from '~/components/GQL/fragments/__generated__/FeedDigestComment'
import { UserDigest } from '~/components/UserDigest'

import CommentContent from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import CancelEditButton from './CancelEditButton'
import PinnedLabel from './PinnedLabel'
import ReplyTo from './ReplyTo'
import styles from './styles.css'

const DescendantComment = ({
  comment,
  inArticle,
  commentCallback,
  ...actionControls
}: {
  comment: FeedDigestComment_comments_edges_node
  inArticle?: boolean
  commentCallback?: () => void
} & FooterActionsControls) => {
  const [edit, setEdit] = useState(false)
  const containerClass = classNames({
    container: true,
    'in-article': inArticle
  })
  const id = comment.parentComment
    ? `${comment.parentComment.id}-${comment.id}`
    : comment.id

  return (
    <section className={containerClass} id={actionControls.hasLink ? id : ''}>
      <header className="header">
        <div>
          <section className="author-row">
            <UserDigest.Mini
              user={comment.author}
              avatarSize="xsmall"
              textWeight="medium"
              textSize="msmall"
              hasUserName={inArticle}
            />
            {comment.pinned && <PinnedLabel />}
          </section>

          {comment.replyTo &&
            (!comment.parentComment ||
              comment.replyTo.id !== comment.parentComment.id) && (
              <ReplyTo user={comment.replyTo.author} inArticle={!!inArticle} />
            )}
        </div>
        <DropdownActions comment={comment} editComment={() => setEdit(true)} />
      </header>

      <div className="content-wrap">
        {edit && (
          <CommentForm
            commentId={comment.id}
            articleId={comment.article.id}
            articleAuthorId={comment.article.author.id}
            submitCallback={() => setEdit(false)}
            extraButton={<CancelEditButton onClick={() => setEdit(false)} />}
            blocked={comment.article.author.isBlocking}
            defaultExpand={edit}
            defaultContent={comment.content}
          />
        )}
        {!edit && (
          <CommentContent
            state={comment.state}
            content={comment.content}
            blocked={comment.author.isBlocked}
          />
        )}
        {!edit && (
          <FooterActions
            comment={comment}
            refetch={inArticle}
            commentCallback={commentCallback}
            {...actionControls}
          />
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default DescendantComment
