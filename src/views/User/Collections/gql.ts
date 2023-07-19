import gql from 'graphql-tag'

import { CollectionDigest } from '~/components'

import UserTabs from '../UserTabs'

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
    ...TabsUser
  }
  ${CollectionDigest.Feed.fragments.collection}
  ${UserTabs.fragments.user}
`

export const USER_COLLECTIONS = gql`
  query UserCollections($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      ...CollectionsUser
    }
  }
  ${fragments}
`
