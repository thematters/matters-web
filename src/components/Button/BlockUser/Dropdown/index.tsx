import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { BlockUser } from '~/components/GQL/mutations/__generated__/BlockUser'
import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'
import BLOCK_USER from '~/components/GQL/mutations/blockUser'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'

import { TEXT } from '~/common/enums'
import ICON_BLOCK from '~/static/icons/block.svg?sprite'
import ICON_UNBLOCK from '~/static/icons/unblock.svg?sprite'

import { BlockButtonUser } from './__generated__/BlockButtonUser'
import styles from './styles.css'

const fragments = {
  user: gql`
    fragment BlockButtonUser on User {
      id
      isBlocked
    }
  `
}

const TextIconBlock = () => (
  <TextIcon
    icon={<Icon id={ICON_BLOCK.id} viewBox={ICON_BLOCK.viewBox} size="small" />}
    spacing="tight"
  >
    <Translate zh_hant={TEXT.zh_hant.block} zh_hans={TEXT.zh_hans.block} />
  </TextIcon>
)

const TextIconUnblock = () => (
  <TextIcon
    icon={
      <Icon id={ICON_UNBLOCK.id} viewBox={ICON_UNBLOCK.viewBox} size="small" />
    }
    spacing="tight"
  >
    <Translate zh_hant={TEXT.zh_hant.unblock} zh_hans={TEXT.zh_hans.unblock} />
  </TextIcon>
)

const BlockUserButton = ({
  user,
  hideDropdown
}: {
  user: BlockButtonUser
  hideDropdown: () => void
}) => {
  const [blockUser] = useMutation<BlockUser>(BLOCK_USER, {
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
        onClick={() => {
          unblockUser()
          hideDropdown()
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
      onClick={() => {
        blockUser()
        hideDropdown()
      }}
    >
      <TextIconBlock />

      <style jsx>{styles}</style>
    </button>
  )
}

BlockUserButton.fragments = fragments

export default BlockUserButton
