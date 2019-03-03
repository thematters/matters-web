import gql from 'graphql-tag'

import DropdownActions from '~/components/CommentDigest/DropdownActions'
import FooterActions from '~/components/CommentDigest/FooterActions'
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
      ...DropdownActionsComment
    }
    ${UserDigest.Mini.fragments.user}
    ${FooterActions.fragments.comment}
    ${DropdownActions.fragments.comment}
  `
}
