import Link from 'next/link'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { BlockUser } from '~/components/GQL/fragments/__generated__/BlockUser'
import userFragments from '~/components/GQL/fragments/user'
import { BlockUser as BlockUserMutate } from '~/components/GQL/mutations/__generated__/BlockUser'
import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'
import BLOCK_USER from '~/components/GQL/mutations/blockUser'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'

import { ADD_TOAST, PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

const fragments = {
  user: userFragments.block
}

const TextIconBlock = () => (
  <TextIcon icon={<Icon.Block />} spacing="tight">
    <Translate zh_hant={TEXT.zh_hant.blockUser} zh_hans={TEXT.zh_hans.block} />
  </TextIcon>
)

const TextIconUnblock = () => (
  <TextIcon icon={<Icon.Unblock />} spacing="tight">
    <Translate
      zh_hant={TEXT.zh_hant.unblockUser}
      zh_hans={TEXT.zh_hans.unblockUser}
    />
  </TextIcon>
)

const BlockUserButton = ({
  user,
  hideDropdown
}: {
  user: BlockUser
  hideDropdown: () => void
}) => {
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

  if (user.isBlocked) {
    return (
      <button
        type="button"
        onClick={async () => {
          hideDropdown()
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
        }}
      >
        <TextIconUnblock />

        <style jsx>{styles}</style>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={async () => {
        hideDropdown()
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
                <Link {...PATHS.ME_SETTINGS_BLOCKED}>
                  <a>
                    <Translate zh_hant="管理封鎖" zh_hans="管理屏蔽" />
                  </a>
                </Link>
              )
            }
          })
        )
      }}
    >
      <TextIconBlock />

      <style jsx>{styles}</style>
    </button>
  )
}

BlockUserButton.fragments = fragments

export default BlockUserButton
