import gql from 'graphql-tag'

import { CollectionDigest } from '~/components'

const fragments = gql`
  fragment CollectionsUser on User {
    id
    collections(input: { first: null }) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          ...CollectionDigestFeedCollection
        }
      }
    }
  }
  ${CollectionDigest.Feed.fragments.collection}
`

// with `Public` suffix, query as an anonymous user
export const USER_COLLECTIONS = gql`
  query UserCollections($userName: String!) {
    user(input: { userName: $userName }) {
      ...CollectionsUser
    }
  }
  ${fragments}
`
