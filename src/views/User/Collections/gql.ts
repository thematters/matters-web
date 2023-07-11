import gql from 'graphql-tag'

import { CollectionDigest } from '~/components'

const fragments = gql`
  fragment CollectionsUser on User {
    id
    userName
    displayName
    avatar
    info {
      description
      profileCover
    }
    collections(input: { first: 20, after: $after }) {
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

export const USER_COLLECTIONS = gql`
  query UserCollections($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      ...CollectionsUser
    }
  }
  ${fragments}
`
