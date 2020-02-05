import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'

import { AvatarSize, UserDigest } from '~/components'

import CancelEditButton from '../CancelEditButton'
import Content from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import CommentForm from '../Form'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from './ReplyTo'
import styles from './styles.css'

import { FeedComment } from './__generated__/FeedComment'
import { RefetchComment } from './__generated__/RefetchComment'

export type CommentControls = {
  avatarSize?: Extract<AvatarSize, 'md' | 'lg'>
  hasUserName?: boolean
} & FooterActionsControls

export type CommentProps = {
  comment: FeedComment
} & CommentControls

const fragments = {
  comment: gql`
    fragment FeedComment on Comment {
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

const REFETCH_COMMENT = gql`
  query RefetchComment($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...FeedComment
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedComment
            }
          }
        }
      }
    }
  }
  ${fragments.comment}
`

export const Feed = ({
  comment,
  avatarSize = 'lg',
  hasUserName,
  commentCallback,
  ...actionControls
}: CommentProps) => {
  const [edit, setEdit] = useState(false)
  const [refetchComment] = useLazyQuery<RefetchComment>(REFETCH_COMMENT)

  const { id, article, replyTo, content, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id
  const submitCallback = () => {
    setEdit(false)
  }
  const footerCommentCallback = () => {
    if (commentCallback) {
      commentCallback()
    }

    refetchComment({
      variables: { id: parentComment?.id || id }
    })
  }

  return (
    <article id={actionControls.hasLink ? nodeId : ''}>
      <header>
        <UserDigest.Mini
          user={author}
          avatarSize={avatarSize}
          textSize="md-s"
          textWeight="md"
          hasAvatar
          hasDisplayName
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
        {!edit && <Content comment={comment} size="md-s" />}
        {!edit && (
          <FooterActions
            comment={comment}
            commentCallback={footerCommentCallback}
            {...actionControls}
          />
        )}

        {edit && (
          <CommentForm
            commentId={id}
            articleId={article.id}
            articleAuthorId={article.author.id}
            submitCallback={submitCallback}
            extraButton={<CancelEditButton onClick={() => setEdit(false)} />}
            blocked={article.author.isBlocking}
            defaultContent={content}
            defaultExpand={edit}
          />
        )}
      </section>

      <style jsx>{styles}</style>
    </article>
  )
}

Feed.fragments = fragments

export default Feed
