import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { ReactComponent as IconUnpin } from '@/public/static/icons/24px/unpin.svg'
import { ERROR_CODES } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, Menu, toast, useMutation } from '~/components'
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
        cache.evict({
          id: cache.identify(collection.author),
          fieldName: 'pinnedWorks',
        })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
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
          <Icon icon={IconUnpin} size={20} />
        ) : (
          <Icon icon={IconPin} size={20} />
        )
      }
      onClick={togglePin}
    />
  )
}

PinButton.fragments = fragments

export default PinButton
