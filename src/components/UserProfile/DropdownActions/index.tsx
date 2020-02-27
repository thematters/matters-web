import gql from 'graphql-tag'

import { Button, DropdownDialog, Icon, Menu, Translate } from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { TEXT } from '~/common/enums'

import { DropdownActionsUser } from './__generated__/DropdownActionsUser'

const fragments = {
  user: gql`
    fragment DropdownActionsUser on User {
      id
      ...BlockUser
    }
    ${BlockUser.fragments.user}
  `
}

const DropdownActions = ({ user }: { user: DropdownActionsUser }) => {
  return (
    <BlockUser.Dialog user={user}>
      {({ open: showDialog }) => (
        <DropdownDialog
          dropdown={{
            content: (
              <Menu width={'sm'}>
                <BlockUser.Button user={user} showDialog={showDialog} />
              </Menu>
            ),
            placement: 'bottom-end'
          }}
          dialog={{
            content: (
              <Menu>
                <BlockUser.Button user={user} showDialog={showDialog} />
              </Menu>
            ),
            title: <Translate id="moreActions" />
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
      )}
    </BlockUser.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
