import gql from 'graphql-tag'

import DropdownActions from '../DropdownActions'

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
    ${DropdownActions.fragments.collection}
  `,
}
