import gql from 'graphql-tag'

import DeleteCollection from './DeleteCollection'
import EditCollection from './EditCollection'
import PinButton from './PinButton'

export const fragments = {
  collection: gql`
    fragment DropdownActionsCollection on Collection {
      id
      ...PinButtonCollection
      ...DeleteCollectionCollection
      ...EditCollectionCollection
    }
    ${PinButton.fragments.collection}
    ${DeleteCollection.fragments.collection}
    ${EditCollection.fragments.collection}
  `,
}
