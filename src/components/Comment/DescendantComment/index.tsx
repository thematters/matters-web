import classNames from 'classnames'
import _get from 'lodash/get'
import { useState } from 'react'

import CommentForm from '~/components/Form/CommentForm'
import { UserDigest } from '~/components/UserDigest'

import CancelEditButton from '../CancelEditButton'
import CommentContent from '../Content'
import DropdownActions from '../DropdownActions'
import ReplyTo from '../FeedComment/ReplyTo'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import styles from '../styles.css'

import { DescendantsIncludedComment_comments_edges_node } from '../__generated__/DescendantsIncludedComment'

const DescendantComment = ({
  comment,
  inArticle,
  ...actionControls
}: {
  comment: DescendantsIncludedComment_comments_edges_node
  inArticle?: boolean
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
              avatarSize="md"
              textWeight="md"
              textSize="sm-s"
              hasUserName={inArticle}
            />
            {comment.pinned && <PinnedLabel comment={comment} />}
          </section>

          {comment.replyTo &&
            (!comment.parentComment ||
              comment.replyTo.id !== comment.parentComment.id) && (
              <ReplyTo user={comment.replyTo.author} />
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
        {!edit && <CommentContent comment={comment} />}
        {!edit && (
          <FooterActions
            comment={comment}
            refetch={inArticle}
            {...actionControls}
          />
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default DescendantComment
