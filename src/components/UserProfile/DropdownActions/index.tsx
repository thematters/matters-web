import gql from 'graphql-tag'
import { useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import BlockUserButton from '~/components/Button/BlockUser/Dropdown'

import ICON_MORE_SMALL from '~/static/icons/more-small.svg?sprite'

import { DropdownActionsUser } from './__generated__/DropdownActionsUser'

const fragments = {
  user: gql`
    fragment DropdownActionsUser on User {
      id
      ...BlockButtonUser
    }
    ${BlockUserButton.fragments.user}
  `
}

const DropdownContent: React.FC<{
  user: DropdownActionsUser
  hideDropdown: () => void
}> = ({ user, hideDropdown }) => {
  return (
    <Menu>
      <Menu.Item>
        <BlockUserButton user={user} hideDropdown={hideDropdown} />
      </Menu.Item>
    </Menu>
  )
}

const DropdownActions = ({ user }: { user: DropdownActionsUser }) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  return (
    <Dropdown
      content={<DropdownContent user={user} hideDropdown={hideDropdown} />}
      trigger="click"
      onCreate={setInstance}
      placement="bottom-end"
      zIndex={301}
    >
      <button type="button" aria-label="更多操作">
        <Icon
          size="small"
          id={ICON_MORE_SMALL.id}
          viewBox={ICON_MORE_SMALL.viewBox}
        />
      </button>
    </Dropdown>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
