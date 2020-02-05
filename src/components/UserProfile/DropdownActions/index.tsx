import gql from 'graphql-tag'
import { useState } from 'react'

import { Button, Dropdown, Icon, Menu, PopperInstance } from '~/components'
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
        <Menu width="sm">
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
      <Button
        spacing={['xtight', 'xtight']}
        bgHoverColor="grey-lighter"
        aria-label="更多操作"
        aria-haspopup="true"
      >
        <Icon.More color="black" size="md-s" />
      </Button>
    </Dropdown>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
