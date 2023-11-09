import { FormattedMessage } from 'react-intl'

import { IconMute20, Menu, toast, useMutation } from '~/components'
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

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="User unblocked. User can now comment on your articles."
          id="mSAY3/"
          description="src/components/BlockUser/Button/index.tsx"
        />
      ),
    })
  }

  if (user.isBlocked) {
    return (
      <Menu.Item
        text={
          <FormattedMessage
            defaultMessage="Unblock"
            id="bBYO6x"
            description="src/components/BlockUser/Button/index.tsx"
          />
        }
        icon={<IconMute20 size="mdS" />}
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
      text={<FormattedMessage defaultMessage="Block User" id="vAc1Bw" />}
      icon={<IconMute20 size="mdS" />}
    />
  )
}

export default BlockUserButton
