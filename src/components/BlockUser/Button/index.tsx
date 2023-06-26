import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { IconMute20, IconUnMute24, Menu, useMutation } from '~/components'
import TOGGLE_BLOCK_USER from '~/components/GQL/mutations/toggleBlockUser'
import {
  BlockUserPrivateFragment,
  BlockUserPublicFragment,
  ToggleBlockUserMutation,
} from '~/gql/graphql'

const BlockUserButton = ({
  user,
  openDialog,
}: {
  user: BlockUserPublicFragment & Partial<BlockUserPrivateFragment>
  openDialog: () => void
}) => {
  const [unblockUser] = useMutation<ToggleBlockUserMutation>(
    TOGGLE_BLOCK_USER,
    {
      variables: { id: user.id, enabled: false },
      optimisticResponse: {
        toggleBlockUser: {
          id: user.id,
          isBlocked: false,
          __typename: 'User',
        },
      },
    }
  )
  const onUnblock = async () => {
    await unblockUser()
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <FormattedMessage
              defaultMessage="User unblocked. User can now comment on your articles."
              description="src/components/BlockUser/Button/index.tsx"
            />
          ),
        },
      })
    )
  }

  if (user.isBlocked) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Unblock"
            description="src/components/BlockUser/Button/index.tsx"
          />
        }
        icon={<IconUnMute24 size="mdS" />}
        onClick={onUnblock}
      />
    )
  }

  return (
    <Menu.Item
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="greyDarker"
      textActiveColor="black"
      text={<FormattedMessage defaultMessage="Block User" description="" />}
      icon={<IconMute20 size="mdS" />}
    />
  )
}

export default BlockUserButton
