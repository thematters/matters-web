import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { toPath } from '~/common/utils'
import { IconPin20, IconUnPin20, Menu, toast, useMutation } from '~/components'
import { updateUserArticles } from '~/components/GQL'
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
      author {
        id
        userName
      }
    }
  `,
}

const PinButton = ({
  collection,
}: {
  collection: PinButtonCollectionFragment
}) => {
  const [togglePin] = useMutation<TogglePinWorkMutation>(
    TOGGLE_PIN,
    {
      variables: { id: collection.id, pinned: !collection.pinned },
      optimisticResponse: {
        putCollection: {
          id: collection.id,
          pinned: !collection.pinned,
          __typename: 'Collection',
        },
      },
      update: (cache) => {
        updateUserArticles({
          cache,
          targetId: collection.id,
          userName: collection.author.userName!,
          type: collection.pinned ? 'unpin' : 'pin',
        })
      },
      onCompleted: () => {
        toast.success({
          message: collection.pinned ? (
            <FormattedMessage
              defaultMessage="Unpinned from profile"
              id="Ihwz5K"
            />
          ) : (
            <FormattedMessage defaultMessage="Pinned to profile" id="XuYhBC" />
          ),
          actions: collection.pinned
            ? undefined
            : [
                {
                  content: (
                    <FormattedMessage defaultMessage="View" id="FgydNe" />
                  ),
                  href: toPath({
                    page: 'userProfile',
                    userName: collection.author.userName!,
                  }).href,
                },
              ],
        })
      },
    },
    {
      toastType: 'success',
      customErrors: {
        [ERROR_CODES.ACTION_LIMIT_EXCEEDED]: (
          <FormattedMessage
            defaultMessage="Up to 3 articles/collections can be pinned"
            id="2oxLHg"
          />
        ),
      },
    }
  )

  return (
    <Menu.Item
      text={
        collection.pinned ? (
          <FormattedMessage
            defaultMessage="Unpin from profile"
            id="DyuHBH"
            description="src/components/CollectionDigest/DropdownActions/PinButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Pin to profile"
            id="xOUZu2"
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
