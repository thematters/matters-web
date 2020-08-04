import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const SEARCH_USERS_PUBLIC = gql`
  query SeachUsersPublic($key: String!, $after: String) {
    search(input: { key: $key, type: User, first: 20, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestRichUserPublic
            ...UserDigestRichUserPrivate
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`

export const SEARCH_USERS_PRIVATE = gql`
  query SeachUsersPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
