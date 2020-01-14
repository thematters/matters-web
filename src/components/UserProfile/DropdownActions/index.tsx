import gql from 'graphql-tag'
import { useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import BlockUserButton from '~/components/Button/BlockUser/Dropdown'

import { DropdownActionsUser } from './__generated__/DropdownActionsUser'

const fragments = {
  user: gql`
    fragment DropdownActionsUser on User {
      id
      ...BlockUser
    }
    ${BlockUserButton.fragments.user}
  `
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
      content={
        <Menu>
          <Menu.Item>
            <BlockUserButton user={user} hideDropdown={hideDropdown} />
          </Menu.Item>
        </Menu>
      }
      trigger="click"
      onCreate={setInstance}
      placement="bottom-end"
      zIndex={301}
    >
      <button type="button" aria-label="更多操作" aria-haspopup="true">
        <Icon.MoreSmall color="black" />
      </button>
    </Dropdown>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
