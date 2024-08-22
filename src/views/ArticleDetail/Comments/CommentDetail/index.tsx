import { parseCommentHash } from '~/common/utils'
import {
  CommentThreadComment,
  CommentThreadCommentType,
  QueryError,
  useJumpToComment,
  usePublicQuery,
} from '~/components'
import { CommentDetailQuery } from '~/gql/graphql'

import { Placeholder } from '../Placeholder'
import { COMMENT_DETAIL } from './gql'

const CommentDetail = () => {
  const { ref, setReadyJump } = useJumpToComment({})
  const { parentId } = parseCommentHash()

  // Data Fetching
  const { data, loading, error } = usePublicQuery<CommentDetailQuery>(
    COMMENT_DETAIL,
    {
      variables: {
        id: parentId,
      },
      fetchPolicy: 'network-only',
    }
  )

  /**
   * Render
   */
  if (loading && !data) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (data?.node?.__typename !== 'Comment') {
    return null
  }

  const comment = data.node as CommentThreadCommentType

  return (
    <section ref={ref}>
      <CommentThreadComment
        comment={comment}
        hasLink
        firstRenderCallback={() => setReadyJump(true)}
        isInCommentDetail
      />
    </section>
  )
}

export default CommentDetail
