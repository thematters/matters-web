import gql from 'graphql-tag'

import CollectionArticles from './CollectionArticles'
import CollectionProfile from './CollectionProfile'

const fragments = {
  collection: gql`
    fragment CollectionDetailCollection on Collection {
      id
      author {
        id
        displayName
        userName
      }
      ...CollectionProfileCollection
      ...CollectionArticlesCollection
    }
    ${CollectionProfile.fragments.collection}
    ${CollectionArticles.fragments.collection}
  `,
}

export const COLLECTION_DETAIL = gql`
  query CollectionDetail($id: ID!, $first: first_Int_min_0!) {
    node(input: { id: $id }) {
      id
      ... on Collection {
        ...CollectionDetailCollection
      }
    }
  }
  ${fragments.collection}
`
