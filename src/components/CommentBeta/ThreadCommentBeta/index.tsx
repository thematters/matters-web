import { filterComments } from '~/common/utils'
import { CommentFormType } from '~/components'
import {
  ThreadCommentCommentBetaPrivateFragment,
  ThreadCommentCommentBetaPublicFragment,
} from '~/gql/graphql'

import Feed from '../Feed'
import { DescendantComments } from './DescendantComments'
import { fragments } from './gql'
import styles from './styles.module.css'

// const COLLAPSE_COUNT = 3

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
  // const restCount = descendants.length - COLLAPSE_COUNT
  // const [expand, setExpand] = useState(defaultExpand || restCount <= 0)

  return (
    <section className={styles.container}>
      <Feed comment={comment} type={type} hasReply hasUserName {...props} />

      {descendants.length > 0 && (
        <DescendantComments id={comment.id} {...props} />
      )}
    </section>
  )
}

ThreadCommentBeta.fragments = fragments
