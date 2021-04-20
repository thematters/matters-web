import { gql } from '@apollo/client'

import { UserDigest } from '~/components/UserDigest'

export const CIRCLE_MEMBERS_PUBLIC = gql`
  query CircleMembersPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      ... on Circle {
        id
        cover
        displayName
        description
        members(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              user {
                ...UserDigestRichUserPublic
                ...UserDigestRichUserPrivate
              }
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`

export const CIRCLE_MEMBERS_PRIVATE = gql`
  query CircleMembersPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      ... on User {
        id
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
