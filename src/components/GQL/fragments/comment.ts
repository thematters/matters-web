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
      author {
        id
        isBlocking
      }
      comments(input: { sort: oldest, first: null })
        @include(if: $hasDescendantComments) {
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
      author {
        id
        isBlocking
      }
      article {
        title
      }
      comments(input: { sort: oldest, first: null })
        @include(if: $hasDescendantComments) {
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
