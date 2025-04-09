import gql from 'graphql-tag'

import CollectionProfile from './CollectionProfile'

export const COLLECTION_DETAIL_PUBLIC = gql`
  query CollectionDetailPublic($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Collection {
        id
        author {
          id
          displayName
          userName
        }
        ...CollectionProfileCollectionPublic
        ...CollectionProfileCollectionPrivate
      }
    }
  }
  ${CollectionProfile.fragments.collection.public}
  ${CollectionProfile.fragments.collection.private}
`

export const COLLECTION_DETAIL_PRIVATE = gql`
  query CollectionDetailPrivate($id: ID!) {
    node(input: { id: $id }) {
      ... on Collection {
        ...CollectionProfileCollectionPrivate
      }
    }
  }
  ${CollectionProfile.fragments.collection.private}
`
