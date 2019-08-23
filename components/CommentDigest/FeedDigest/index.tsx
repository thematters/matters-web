import classNames from 'classnames'
import _get from 'lodash/get'
import { useState } from 'react'

import CommentForm from '~/components/Form/CommentForm'
import {
  FeedDigestComment,
  FeedDigestComment_comments_edges_node
} from '~/components/GQL/fragments/__generated__/FeedDigestComment'
import commentFragments from '~/components/GQL/fragments/comment'
import { Icon } from '~/components/Icon'
import { Label } from '~/components/Label'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import { TEXT } from '~/common/enums'
import ICON_MORE_CONTENT from '~/static/icons/more-content.svg?sprite'

import CommentContent from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import styles from './styles.css'

const COLLAPSE_DESCENDANT_COUNT = 2

const fragments = {
  comment: commentFragments.feed
}

const ReplyTo = ({ user, inArticle }: { user: any; inArticle: boolean }) => (
  <section className="reply-to">
    <span className="wording">
      <Translate zh_hant={TEXT.zh_hant.reply} zh_hans={TEXT.zh_hans.reply} />
    </span>
    <UserDigest.Mini
      user={user}
      avatarSize="xxxsmall"
      textWeight="medium"
      spacing="xxtight"
      hasUserName={inArticle}
    />
    <style jsx>{styles}</style>
  </section>
)

const PinnedLabel = () => (
  <span className="label">
    <Label size="small">
      <Translate
        zh_hant={TEXT.zh_hant.authorRecommend}
        zh_hans={TEXT.zh_hant.authorRecommend}
      />
    </Label>
    <style jsx>{styles}</style>
  </span>
)

const CancelEditButton = ({ onClick }: { onClick: () => void }) => (
  <button className="cancel-button" type="button" onClick={() => onClick()}>
    <Translate zh_hant={TEXT.zh_hant.cancel} zh_hans={TEXT.zh_hans.cancel} />
    <style jsx>{styles}</style>
  </button>
)

const DescendantComment = ({
  comment,
  inArticle,
  ...actionControls
}: {
  comment: FeedDigestComment_comments_edges_node
  inArticle?: boolean
} & FooterActionsControls) => {
  const [edit, setEdit] = useState(false)
  const containerClass = classNames({
    container: true,
    'in-article': inArticle
  })

  return (
    <section className={containerClass} id={comment.id}>
      <header className="header">
        <div className="avatars">
          <UserDigest.Mini
            user={comment.author}
            avatarSize="xsmall"
            textWeight="medium"
            textSize="msmall"
            hasUserName={inArticle}
          />
          {comment.replyTo &&
            (!comment.parentComment ||
              comment.replyTo.id !== comment.parentComment.id) && (
              <ReplyTo user={comment.replyTo.author} inArticle={!!inArticle} />
            )}
          {comment.pinned && <PinnedLabel />}
        </div>
        <DropdownActions
          comment={comment}
          editComment={() => setEdit(true)}
          refetch={inArticle}
        />
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
            defaultExpand={edit}
          />
        )}
        {!edit && (
          <CommentContent state={comment.state} content={comment.content} />
        )}
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

const FeedDigest = ({
  comment,
  inArticle,
  defaultExpand,
  ...actionControls
}: {
  comment: FeedDigestComment
  inArticle?: boolean
  defaultExpand?: boolean
} & FooterActionsControls) => {
  const [edit, setEdit] = useState(false)
  const { state, content, author, replyTo, parentComment, pinned } = comment
  const descendantComments = _get(comment, 'comments.edges', []).filter(
    ({ node }: { node: any }) => node.state === 'active'
  )
  const restDescendantCommentCount =
    descendantComments.length - COLLAPSE_DESCENDANT_COUNT
  const [expand, setExpand] = useState(
    defaultExpand || restDescendantCommentCount <= 0
  )
  const containerClass = classNames({
    container: true,
    'in-article': inArticle
  })

  return (
    <section className={containerClass} id={comment.id}>
      <header className="header">
        <div className="avatars">
          <UserDigest.Mini
            user={author}
            avatarSize="small"
            textWeight="medium"
            hasUserName={inArticle}
          />
          {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
            <ReplyTo user={replyTo.author} inArticle={!!inArticle} />
          )}
          {pinned && <PinnedLabel />}
        </div>
        <DropdownActions
          comment={comment}
          editComment={() => setEdit(true)}
          refetch={inArticle}
        />
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
            defaultExpand={edit}
          />
        )}
        {!edit && <CommentContent state={state} content={content} />}
        {!edit && (
          <FooterActions
            comment={comment}
            refetch={inArticle}
            {...actionControls}
          />
        )}

        {descendantComments.length > 0 && (
          <ul className="descendant-comments">
            {descendantComments
              .slice(0, expand ? undefined : COLLAPSE_DESCENDANT_COUNT)
              .map(({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <DescendantComment
                    comment={node}
                    inArticle={inArticle}
                    {...actionControls}
                  />
                </li>
              ))}
            {!expand && (
              <button
                className="more-button"
                type="button"
                onClick={() => setExpand(true)}
              >
                <TextIcon
                  icon={
                    <Icon
                      id={ICON_MORE_CONTENT.id}
                      viewBox={ICON_MORE_CONTENT.viewBox}
                      size="small"
                    />
                  }
                  color="green"
                  size="sm"
                  textPlacement="left"
                  spacing="xxtight"
                >
                  <Translate
                    zh_hant={`查看 ${restDescendantCommentCount} 條回應`}
                    zh_hans={`查看 ${restDescendantCommentCount} 条回应`}
                  />
                </TextIcon>
              </button>
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
