import gql from 'graphql-tag'

import { fragments as dropdownFragments } from '../DropdownActions/gql'

export const fragments = {
  collection: gql`
    fragment CollectionDigestFeedCollection on Collection {
      id
      title
      description
      cover
      updatedAt
      author {
        id
        userName
        displayName
      }
      articles(input: { first: 0 }) {
        totalCount
      }
      ...DropdownActionsCollection
    }
    ${dropdownFragments.collection}
  `,
}
