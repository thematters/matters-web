import { gql } from '@apollo/client'
import { useState } from 'react'

import { Comment } from '~/components'

import { filterComments } from '~/common/utils'

import ExpandButton from './ExpandButton'
import styles from './styles.css'

import { ResponseCommentCommentPrivate } from './__generated__/ResponseCommentCommentPrivate'
import { ResponseCommentCommentPublic } from './__generated__/ResponseCommentCommentPublic'

const COLLAPSE_COUNT = 2

interface ResponseCommentControls {
  defaultExpand?: boolean
  hasLink?: boolean
  commentCallback?: () => void
}

type Comment = ResponseCommentCommentPublic &
  Partial<ResponseCommentCommentPrivate>

type ResponseCommentProps = {
  comment: Comment
} & ResponseCommentControls

const fragments = {
  comment: {
    public: gql`
      fragment ResponseCommentCommentPublic on Comment {
        id
        ...FeedCommentPublic
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentPublic
            }
          }
        }
      }
      ${Comment.Feed.fragments.comment.public}
    `,
    private: gql`
      fragment ResponseCommentCommentPrivate on Comment {
        id
        ...FeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentPrivate
            }
          }
        }
      }
      ${Comment.Feed.fragments.comment.private}
    `,
  },
}

const ResponseComment = ({
  comment,
  defaultExpand,
  hasLink,
  commentCallback,
}: ResponseCommentProps) => {
  const descendants = filterComments(
    (comment.comments?.edges || []).map(({ node }) => node)
  ) as Comment[]
  const restCount = descendants.length - COLLAPSE_COUNT
  const [expand, setExpand] = useState(defaultExpand || restCount <= 0)

  return (
    <section className="container">
      <Comment.Feed
        comment={comment}
        hasReply
        hasUserName
        hasCreatedAt
        hasLink={hasLink}
        commentCallback={commentCallback}
      />

      {descendants.length > 0 && (
        <ul className="descendants">
          {descendants
            .slice(0, expand ? undefined : COLLAPSE_COUNT)
            .map((descendantComment) => (
              <li key={descendantComment.id}>
                <Comment.Feed
                  comment={descendantComment}
                  avatarSize="md"
                  hasReply
                  hasUserName
                  hasCreatedAt
                  hasLink={hasLink}
                  commentCallback={commentCallback}
                />
              </li>
            ))}

          {!expand && (
            <ExpandButton
              onClick={() => setExpand(true)}
              restCount={restCount}
            />
          )}
        </ul>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

ResponseComment.fragments = fragments

export default ResponseComment
