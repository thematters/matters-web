import gql from 'graphql-tag'

import { CircleCommentContent } from '~/components/CircleComment/Content'
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
        ...CircleCommentContentCommentPublic
        ...CircleCommentContentCommentPrivate
      }
    }
    ${UserDigest.Rich.fragments.user.public}
    ${CircleCommentContent.fragments.comment.public}
    ${CircleCommentContent.fragments.comment.private}
  `,
}
