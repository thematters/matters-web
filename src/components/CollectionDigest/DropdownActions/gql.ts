import gql from 'graphql-tag'

import DeleteCollection from './DeleteCollection'
import PinButton from './PinButton'

export const fragments = {
  collection: gql`
    fragment DropdownActionsCollection on Collection {
      id
      ...PinButtonCollection
      ...DeleteCollectionCollection
    }
    ${PinButton.fragments.collection}
    ${DeleteCollection.fragments.collection}
  `,
}
