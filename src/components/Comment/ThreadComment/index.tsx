import { useState } from 'react'

import { CommentFormType } from '~/components'

import { filterComments } from '~/common/utils'

import Feed from '../Feed'
import ExpandButton from './ExpandButton'
import { fragments } from './gql'
import styles from './styles.css'

import { ThreadCommentCommentPrivate } from './__generated__/ThreadCommentCommentPrivate'
import { ThreadCommentCommentPublic } from './__generated__/ThreadCommentCommentPublic'

const COLLAPSE_COUNT = 2

interface ThreadCommentControls {
  type: CommentFormType
  defaultExpand?: boolean
  hasLink?: boolean
  commentCallback?: () => void
}

type Comment = ThreadCommentCommentPublic & Partial<ThreadCommentCommentPrivate>

type ThreadCommentProps = {
  comment: Comment
} & ThreadCommentControls

export const ThreadComment = ({
  comment,
  type,
  defaultExpand,
  hasLink,
  commentCallback,
}: ThreadCommentProps) => {
  const descendants = filterComments(
    (comment.comments?.edges || []).map(({ node }) => node)
  ) as Comment[]
  const restCount = descendants.length - COLLAPSE_COUNT
  const [expand, setExpand] = useState(defaultExpand || restCount <= 0)

  return (
    <section className="container">
      <Feed
        comment={comment}
        type={type}
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
                <Feed
                  comment={descendantComment}
                  type="article"
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

ThreadComment.fragments = fragments
