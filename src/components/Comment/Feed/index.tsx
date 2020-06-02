import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AvatarSize, UserDigest } from '~/components'

import Content from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
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
  `,
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
  const [refetchComment] = useLazyQuery<RefetchComment>(REFETCH_COMMENT)

  const { id, replyTo, author, parentComment } = comment
  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const footerCommentCallback = () => {
    if (commentCallback) {
      commentCallback()
    }

    refetchComment({ variables: { id: parentComment?.id || id } })
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
          <DropdownActions comment={comment} inCard={actionControls.inCard} />
        </section>
      </header>

      {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
        <section className="reply-to-container">
          <ReplyTo user={replyTo.author} />
        </section>
      )}

      <section className="content-container">
        <Content comment={comment} size="md-s" />
        <FooterActions
          comment={comment}
          commentCallback={footerCommentCallback}
          {...actionControls}
        />
      </section>

      <style jsx>{styles}</style>
    </article>
  )
}

Feed.fragments = fragments

export default Feed
