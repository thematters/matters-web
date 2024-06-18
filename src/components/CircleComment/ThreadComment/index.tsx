import { useState } from 'react'

import { filterComments } from '~/common/utils'
import { CircleCommentFormType } from '~/components'
import {
  CircleCommentThreadCommentCommentPrivateFragment,
  CircleCommentThreadCommentCommentPublicFragment,
} from '~/gql/graphql'

import { CircleCommentFeed } from '../Feed'
import ExpandButton from './ExpandButton'
import { fragments } from './gql'
import styles from './styles.module.css'

const COLLAPSE_COUNT = 2

interface ThreadCommentControls {
  type: CircleCommentFormType
  defaultExpand?: boolean
  hasPin?: boolean
  hasLink?: boolean
  hasUpvote?: boolean
  hasDownvote?: boolean
  replySubmitCallback?: () => void
  disabled?: boolean
}

type Comment = CircleCommentThreadCommentCommentPublicFragment &
  Partial<CircleCommentThreadCommentCommentPrivateFragment>

type ThreadCommentProps = {
  comment: Comment
} & ThreadCommentControls

export const CircleThreadComment = ({
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
      <CircleCommentFeed
        comment={comment}
        type={type}
        hasReply
        hasUserName
        hasCreatedAt
        {...props}
      />

      {descendants.length > 0 && (
        <ul className={styles.descendants}>
          {descendants
            .slice(0, expand ? undefined : COLLAPSE_COUNT)
            .map((descendantComment) => (
              <li key={descendantComment.id}>
                <CircleCommentFeed
                  comment={descendantComment}
                  type={type}
                  avatarSize={24}
                  hasReply
                  hasUserName
                  hasCreatedAt
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

CircleThreadComment.fragments = fragments
