import gql from 'graphql-tag'

import CollectionProfile from './CollectionProfile'

export const COLLECTION_DETAIL = gql`
  query CollectionDetail($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Collection {
        id
        author {
          id
          displayName
          userName
        }
        ...CollectionProfileCollection
      }
    }
  }
  ${CollectionProfile.fragments.collection}
`
