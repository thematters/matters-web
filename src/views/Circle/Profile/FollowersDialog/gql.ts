import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const CIRCLE_FOLLOWERS_PUBLIC = gql`
  query CircleFollowersPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      ... on Circle {
        id
        cover
        displayName
        description
        followers(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
              ...UserDigestRichUserPrivate
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`

export const CIRCLE_FOLLOWERS_PRIVATE = gql`
  query CircleFollowersPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      ... on User {
        id
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
