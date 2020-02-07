import gql from 'graphql-tag'

import {
  Button,
  Dropdown,
  focusPopper,
  hidePopperOnClick,
  Icon,
  Menu
} from '~/components'
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
  return (
    <Dropdown
      content={
        <Menu width="sm">
          <BlockUserButton user={user} />
        </Menu>
      }
      placement="bottom-end"
      onShown={instance => {
        focusPopper(instance)
        hidePopperOnClick(instance)
      }}
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
