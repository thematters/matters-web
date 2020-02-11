import { Button, Icon, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import userFragments from '~/components/GQL/fragments/user'
import BLOCK_USER from '~/components/GQL/mutations/blockUser'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'
import { useResponsive } from '~/components/Hook'

import { ADD_TOAST, PATHS, TEXT } from '~/common/enums'

import { BlockUser } from '~/components/GQL/fragments/__generated__/BlockUser'
import { BlockUser as BlockUserMutate } from '~/components/GQL/mutations/__generated__/BlockUser'
import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'

const fragments = {
  user: userFragments.block
}

const BlockUserButton = ({ user }: { user: BlockUser }) => {
  const isMediumUp = useResponsive({ type: 'md-up' })()

  const [blockUser] = useMutation<BlockUserMutate>(BLOCK_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      blockUser: {
        id: user.id,
        isBlocked: true,
        __typename: 'User'
      }
    }
  })
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
          content: (
            <Translate
              zh_hant={TEXT.zh_hant.unblockSuccess}
              zh_hans={TEXT.zh_hans.unblockSuccess}
            />
          )
        }
      })
    )
  }
  const onBlock = async () => {
    await blockUser()
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant={TEXT.zh_hant.blockSuccess}
              zh_hans={TEXT.zh_hans.blockSuccess}
            />
          ),
          customButton: (
            <Button
              href={PATHS.ME_SETTINGS_BLOCKED.as}
              size={[null, '1.25rem']}
              spacing={[0, 0]}
            >
              <TextIcon
                icon={<Icon.Right size="xs" color="green" />}
                textPlacement="left"
              >
                {isMediumUp ? (
                  <Translate zh_hant="管理封鎖" zh_hans="管理屏蔽" />
                ) : (
                  <Translate zh_hant="查看" zh_hans="查看" />
                )}
              </TextIcon>
            </Button>
          )
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
          <Translate
            zh_hant={TEXT.zh_hant.unblockUser}
            zh_hans={TEXT.zh_hans.unblockUser}
          />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={onBlock}>
      <TextIcon icon={<Icon.MuteMedium size="md" />} size="md" spacing="base">
        <Translate
          zh_hant={TEXT.zh_hant.blockUser}
          zh_hans={TEXT.zh_hans.block}
        />
      </TextIcon>
    </Menu.Item>
  )
}

BlockUserButton.fragments = fragments

export default BlockUserButton
