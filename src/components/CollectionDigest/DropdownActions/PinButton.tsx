import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { IconPin20, IconUnPin20, Menu, useMutation } from '~/components'
import {
  PinButtonCollectionFragment,
  TogglePinWorkMutation,
} from '~/gql/graphql'

const TOGGLE_PIN = gql`
  mutation TogglePinWork($id: ID!, $pinned: Boolean!) {
    putCollection(input: { id: $id, pinned: $pinned }) {
      id
      pinned
    }
  }
`

const fragments = {
  collection: gql`
    fragment PinButtonCollection on Collection {
      id
      pinned
    }
  `,
}

const PinButton = ({
  collection,
}: {
  collection: PinButtonCollectionFragment
}) => {
  const [togglePin] = useMutation<TogglePinWorkMutation>(TOGGLE_PIN, {
    variables: { id: collection.id, pinned: !collection.pinned },
    optimisticResponse: {
      putCollection: {
        id: collection.id,
        pinned: !collection.pinned,
        __typename: 'Collection',
      },
    },
  })

  return (
    <Menu.Item
      text={
        collection.pinned ? (
          <FormattedMessage
            defaultMessage="Unpin from profile"
            description="src/components/CollectionDigest/DropdownActions/PinButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Pin to profile"
            description="src/components/CollectionDigest/DropdownActions/PinButton.tsx"
          />
        )
      }
      icon={
        collection.pinned ? (
          <IconUnPin20 size="mdS" />
        ) : (
          <IconPin20 size="mdS" />
        )
      }
      onClick={togglePin}
    />
  )
}

PinButton.fragments = fragments

export default PinButton
