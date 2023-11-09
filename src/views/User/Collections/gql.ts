import gql from 'graphql-tag'

// FIXME: This is a hack to avoid circular dependency.
import { fragments as CollectionDigestFeedFragments } from '~/components/CollectionDigest/Feed/gql'

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
    status {
      state
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
  ${CollectionDigestFeedFragments.collection}
`

export const USER_COLLECTIONS = gql`
  query UserCollections($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      ...CollectionsUser
    }
  }
  ${fragments}
`
