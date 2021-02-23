import gql from 'graphql-tag'

import CommentContent from '~/components/Comment/Content'
import { UserDigest } from '~/components/UserDigest'

export const fragments = {
  circle: gql`
    fragment AuthorWidgetCircle on Circle {
      id
      owner {
        id
        ...UserDigestRichUserPublic
      }
      pinnedBroadcast {
        ...ContentCommentPublic
        ...ContentCommentPrivate
      }
    }
    ${UserDigest.Rich.fragments.user.public}
    ${CommentContent.fragments.comment.public}
    ${CommentContent.fragments.comment.private}
  `,
}
