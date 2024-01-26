import { useState } from 'react'

import { filterComments } from '~/common/utils'
import { CommentFormType } from '~/components'
import {
  ThreadCommentCommentBetaPrivateFragment,
  ThreadCommentCommentBetaPublicFragment,
} from '~/gql/graphql'

import Feed from '../Feed'
import ExpandButton from './ExpandButton'
import { fragments } from './gql'
import styles from './styles.module.css'

const COLLAPSE_COUNT = 2

interface ThreadCommentControls {
  type: CommentFormType
  defaultExpand?: boolean
  hasPin?: boolean
  hasLink?: boolean
  hasUpvote?: boolean
  hasDownvote?: boolean
  replySubmitCallback?: () => void
  disabled?: boolean
}

type Comment = ThreadCommentCommentBetaPublicFragment &
  Partial<ThreadCommentCommentBetaPrivateFragment>

type ThreadCommentProps = {
  comment: Comment
} & ThreadCommentControls

export const ThreadCommentBeta = ({
  comment,
  type,
  defaultExpand,
  ...props
}: ThreadCommentProps) => {
  const descendants = filterComments(
    (comment.comments?.edges || []).map(({ node }) => node)
  ) as Comment[]
  const restCount = descendants.length - COLLAPSE_COUNT
  const [expand, setExpand] = useState(defaultExpand || restCount <= 0)

  return (
    <section className={styles.container}>
      <Feed comment={comment} type={type} hasReply hasUserName {...props} />

      {descendants.length > 0 && (
        <ul className={styles.descendants}>
          {descendants
            .slice(0, expand ? undefined : COLLAPSE_COUNT)
            .map((descendantComment) => (
              <li key={descendantComment.id}>
                <Feed
                  comment={descendantComment}
                  type={type}
                  avatarSize="md"
                  hasReply
                  hasUserName
                  {...props}
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
    </section>
  )
}

ThreadCommentBeta.fragments = fragments
