import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import DropdownActions from './DropdownActions'
import FooterActions from './FooterActions'

const comment = gql`
  fragment Comment on Comment {
    id
    state
    content
    pinned
    author {
      ...UserDigestMiniUser
      isBlocking
      isBlocked
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
    article {
      title
    }
    ...DigestActionsComment
    ...DropdownActionsComment
  }
  ${UserDigest.Mini.fragments.user}
  ${FooterActions.fragments.comment}
  ${DropdownActions.fragments.comment}
`

export default {
  comment,
  descendantsIncluded: gql`
    fragment DescendantsIncludedComment on Comment {
      ...Comment
      comments(input: { sort: oldest, first: null }) {
        edges {
          cursor
          node {
            ...Comment
          }
        }
      }
    }
    ${comment}
  `
}
