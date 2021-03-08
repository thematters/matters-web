import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const USER_FOLLOWING_TAGS_PUBLIC = gql`
  query UserFollowingTagsPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      info {
        profileCover
        description
      }
      status {
        state
      }
      following {
        tags(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...TagDigestRichTagPublic
              ...TagDigestRichTagPrivate
            }
          }
        }
      }
    }
  }
  ${TagDigest.Rich.fragments.tag.public}
  ${TagDigest.Rich.fragments.tag.private}
`

export const USER_FOLLOWING_TAGS_PRIVATE = gql`
  query UserFollowingTagsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Tag {
        ...TagDigestRichTagPrivate
      }
    }
  }
  ${TagDigest.Rich.fragments.tag.private}
`
