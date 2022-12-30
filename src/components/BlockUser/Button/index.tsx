import { ADD_TOAST } from '~/common/enums'
import {
  IconMute24,
  IconUnMute24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
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
          content: <Translate id="successUnblock" />,
        },
      })
    )
  }

  if (user.isBlocked) {
    return (
      <Menu.Item onClick={onUnblock}>
        <TextIcon icon={<IconUnMute24 size="md" />} size="md" spacing="base">
          <Translate id="unblockUser" />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconMute24 size="md" />} size="md" spacing="base">
        <Translate id="blockUser" />
      </TextIcon>
    </Menu.Item>
  )
}

export default BlockUserButton
