import gql from 'graphql-tag'

import {
  BlockUserButton,
  Button,
  DropdownDialog,
  Icon,
  Menu,
  Translate
} from '~/components'

import { TEXT } from '~/common/enums'

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
  const Content = ({ type }: { type: 'dialog' | 'dropdown' }) => {
    const isDropdown = type === 'dropdown'

    return (
      <Menu width={isDropdown ? 'sm' : undefined}>
        <BlockUserButton user={user} />
      </Menu>
    )
  }

  return (
    <DropdownDialog
      dropdown={{
        content: <Content type="dropdown" />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content type="dialog" />,
        title: (
          <Translate
            zh_hant={TEXT.zh_hant.moreActions}
            zh_hans={TEXT.zh_hans.moreActions}
          />
        ),
        showHeader: false
      }}
    >
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgHoverColor="grey-lighter"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <Icon.More color="black" size="md-s" />
        </Button>
      )}
    </DropdownDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
