import gql from 'graphql-tag'

import DropdownActions from '~/components/CommentDigest/DropdownActions'
import FooterActions from '~/components/CommentDigest/FooterActions'
import { UserDigest } from '~/components/UserDigest'

const base = gql`
  fragment BaseDigestComment on Comment {
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
    ...DigestActionsComment
    ...DropdownActionsComment
  }
  ${UserDigest.Mini.fragments.user}
  ${FooterActions.fragments.comment}
  ${DropdownActions.fragments.comment}
`

export default {
  base,
  feed: gql`
    fragment FeedDigestComment on Comment {
      ...BaseDigestComment
      article {
        title
      }
      comments(input: { sort: oldest, first: null })
        @include(if: $hasDescendants) {
        edges {
          cursor
          node {
            ...BaseDigestComment
          }
        }
      }
    }
    ${base}
  `,
  followee: gql`
    fragment FolloweeFeedDigestComment on Comment {
      ...BaseDigestComment
      article {
        title
      }
      comments(input: { sort: oldest, first: null })
        @include(if: $hasDescendants) {
        edges {
          cursor
          node {
            ...BaseDigestComment
          }
        }
      }
    }
    ${base}
  `
}
