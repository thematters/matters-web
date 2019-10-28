import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { BlockUser } from '~/components/GQL/fragments/__generated__/BlockUser'
import userFragments from '~/components/GQL/fragments/user'
import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'
import BlocKUserModal from '~/components/Modal/BlockUserModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'
import ICON_BLOCK from '~/static/icons/block.svg?sprite'
import ICON_UNBLOCK from '~/static/icons/unblock.svg?sprite'

import styles from './styles.css'

const fragments = {
  user: userFragments.block
}

const TextIconBlock = () => (
  <TextIcon
    icon={<Icon id={ICON_BLOCK.id} viewBox={ICON_BLOCK.viewBox} size="small" />}
    spacing="tight"
  >
    <Translate zh_hant={TEXT.zh_hant.blockUser} zh_hans={TEXT.zh_hans.block} />
  </TextIcon>
)

const TextIconUnblock = () => (
  <TextIcon
    icon={
      <Icon id={ICON_UNBLOCK.id} viewBox={ICON_UNBLOCK.viewBox} size="small" />
    }
    spacing="tight"
  >
    <Translate
      zh_hant={TEXT.zh_hant.unblockUser}
      zh_hans={TEXT.zh_hans.unblockUser}
    />
  </TextIcon>
)

const BlockUserButton = ({
  user,
  isShown,
  hideDropdown
}: {
  user: BlockUser
  isShown: boolean
  hideDropdown: () => void
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

  return (
    <>
      {user.isBlocked && (
        <button
          type="button"
          onClick={() => {
            unblockUser()
            hideDropdown()
          }}
        >
          <TextIconUnblock />

          <style jsx>{styles}</style>
        </button>
      )}

      {!user.isBlocked && (
        <ModalSwitch modalId="blockUserModal">
          {(open: any) => (
            <button
              type="button"
              onClick={() => {
                open()
                hideDropdown()
              }}
            >
              <TextIconBlock />

              <style jsx>{styles}</style>
            </button>
          )}
        </ModalSwitch>
      )}

      {isShown && (
        <ModalInstance modalId="blockUserModal" title="blockUser">
          {(props: ModalInstanceProps) => (
            <BlocKUserModal {...props} user={user} />
          )}
        </ModalInstance>
      )}
    </>
  )
}

BlockUserButton.fragments = fragments

export default BlockUserButton
