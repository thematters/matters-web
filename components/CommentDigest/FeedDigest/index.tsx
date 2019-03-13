import _get from 'lodash/get'
import { useState } from 'react'

import CommentForm from '~/components/Form/CommentForm'
import { FeedDigestComment } from '~/components/GQL/fragments/__generated__/FeedDigestComment'
import commentFragments from '~/components/GQL/fragments/comment'
import { Label } from '~/components/Label'
import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import CommentContent from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import styles from './styles.css'

const fragments = {
  comment: commentFragments.feed
}

const ReplyTo = ({ user }: any) => (
  <>
    <span className="reply-to">
      <Translate zh_hant="回復" zh_hans="回复" />
    </span>
    <UserDigest.Mini
      user={user}
      avatarSize="xxxsmall"
      textWeight="medium"
      spacing="xxtight"
    />
    <style jsx>{styles}</style>
  </>
)

const PinnedLabel = () => (
  <span className="label">
    <Label size="small">
      <Translate zh_hant="作者推薦" zh_hans="作者推荐" />
    </Label>
    <style jsx>{styles}</style>
  </span>
)

const CancelEditButton = ({ onClick }: { onClick: () => void }) => (
  <button className="cancel-button" type="button" onClick={() => onClick()}>
    <Translate zh_hant="取消" zh_hans="取消" />
    <style jsx>{styles}</style>
  </button>
)

const DescendantComment = ({
  comment,
  ...actionControls
}: { comment: any } & FooterActionsControls) => {
  const [edit, setEdit] = useState(false)

  return (
    <section className="container">
      <header className="header">
        <div className="avatars">
          <UserDigest.Mini
            user={comment.author}
            avatarSize="xsmall"
            textWeight="medium"
          />
          {comment.replyTo &&
            (!comment.parentComment ||
              comment.replyTo.id !== comment.parentComment.id) && (
              <ReplyTo user={comment.replyTo.author} />
            )}
          {comment.pinned && <PinnedLabel />}
        </div>
        <DropdownActions comment={comment} editComment={() => setEdit(true)} />
      </header>

      <div className="content-wrap">
        {edit && (
          <CommentForm
            commentId={comment.id}
            articleId={comment.article.id}
            articleMediaHash={comment.article.mediaHash || ''}
            defaultContent={comment.content}
            submitCallback={() => setEdit(false)}
            extraButton={<CancelEditButton onClick={() => setEdit(false)} />}
          />
        )}
        {!edit && (
          <CommentContent state={comment.state} content={comment.content} />
        )}
        {!edit && <FooterActions comment={comment} {...actionControls} />}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

const FeedDigest = ({
  comment,
  ...actionControls
}: { comment: FeedDigestComment } & FooterActionsControls) => {
  const [edit, setEdit] = useState(false)
  const { state, content, author, replyTo, parentComment, pinned } = comment
  const descendantComments = _get(comment, 'comments.edges', []).filter(
    ({ node }: { node: any }) => node.state === 'active'
  )

  return (
    <section className="container">
      <header className="header">
        <div className="avatars">
          <UserDigest.Mini
            user={author}
            avatarSize="small"
            textWeight="medium"
          />
          {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
            <ReplyTo user={replyTo.author} />
          )}
          {pinned && <PinnedLabel />}
        </div>
        <DropdownActions comment={comment} editComment={() => setEdit(true)} />
      </header>

      <div className="content-wrap">
        {edit && (
          <CommentForm
            commentId={comment.id}
            articleId={comment.article.id}
            articleMediaHash={comment.article.mediaHash || ''}
            defaultContent={comment.content}
            submitCallback={() => setEdit(false)}
            extraButton={<CancelEditButton onClick={() => setEdit(false)} />}
          />
        )}
        {!edit && <CommentContent state={state} content={content} />}
        {!edit && <FooterActions comment={comment} {...actionControls} />}

        {descendantComments.length > 0 && (
          <ul className="descendant-comments">
            {descendantComments.map(
              ({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <DescendantComment comment={node} {...actionControls} />
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
