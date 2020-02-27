import { Icon, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'

import { ADD_TOAST } from '~/common/enums'

import { BlockUser } from '~/components/GQL/fragments/__generated__/BlockUser'
import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'

const BlockUserButton = ({
  user,
  showDialog
}: {
  user: BlockUser
  showDialog: () => void
}) => {
  const [unblockUser] = useMutation<UnblockUser>(UNBLOCK_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      unblockUser: {
        id: user.id,
        isBlocked: false,
        __typename: 'User'
      }
    }
  })
  const onUnblock = async () => {
    await unblockUser()
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate id="successUnblock" />
        }
      })
    )
  }

  if (user.isBlocked) {
    return (
      <Menu.Item onClick={onUnblock}>
        <TextIcon
          icon={<Icon.UnMuteMedium size="md" />}
          size="md"
          spacing="base"
        >
          <Translate id="unblockUser" />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={showDialog}>
      <TextIcon icon={<Icon.MuteMedium size="md" />} size="md" spacing="base">
        <Translate id="blockUser" />
      </TextIcon>
    </Menu.Item>
  )
}

export default BlockUserButton
