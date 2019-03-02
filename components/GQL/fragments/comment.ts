import gql from 'graphql-tag'

import Actions from '~/components/CommentDigest/Actions'
import { UserDigest } from '~/components/UserDigest'

export default {
  base: gql`
    fragment BaseDigestComment on Comment {
      id
      state
      content
      pinned
      author {
        ...UserDigestMiniUser
      }
      parentComment {
        id
      }
      replyTo {
        id
        author {
          ...UserDigestMiniUser
        }
      }
      ...DigestActionsComment
    }
    ${UserDigest.Mini.fragments.user}
    ${Actions.fragments.comment}
  `
}
