import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import {
  Button,
  DropdownDialog,
  IconEdit16,
  IconMore32,
  IconSettings32,
  Menu,
  TextIcon,
  Translate,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { TEXT } from '~/common/enums'

import { EditProfileDialog } from './EditProfileDialog'

import { DropdownActionsUserPublic } from './__generated__/DropdownActionsUserPublic'

interface DropdownActionsProps {
  user: DropdownActionsUserPublic
  isMe: boolean
}

interface DialogProps {
  openEditProfileDialog: () => void
  openBlockUserDialog: () => void
}

interface Controls {
  hasEditProfile: boolean
  hasBlockUser: boolean
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps & Controls

const fragments = {
  user: {
    public: gql`
      fragment DropdownActionsUserPublic on User {
        id
        ...BlockUserPublic
        ...EditProfileDialogUserPublic
      }
      ${BlockUser.fragments.user.public}
      ${EditProfileDialog.fragments.user}
    `,
    private: gql`
      fragment DropdownActionsUserPrivate on User {
        id
        ...BlockUserPrivate
      }
      ${BlockUser.fragments.user.private}
    `,
  },
}

const BaseDropdownActions = ({
  user,

  hasEditProfile,
  hasBlockUser,

  openEditProfileDialog,
  openBlockUserDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasEditProfile && (
        <Menu.Item onClick={openEditProfileDialog}>
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <Translate id="editUserProfile" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasBlockUser && (
        <BlockUser.Button user={user} openDialog={openBlockUserDialog} />
      )}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Button
          bgColor="half-black"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          {hasEditProfile ? (
            <IconSettings32 size="lg" color="white" />
          ) : (
            <IconMore32 size="lg" color="white" />
          )}
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = ({ user, isMe }: DropdownActionsProps) => {
  const controls = {
    hasEditProfile: isMe,
    hasBlockUser: !isMe,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <EditProfileDialog user={user}>
      {({ open: openEditProfileDialog }) => (
        <BlockUser.Dialog user={user}>
          {({ open: openBlockUserDialog }) => (
            <BaseDropdownActions
              user={user}
              isMe={isMe}
              {...controls}
              openEditProfileDialog={openEditProfileDialog}
              openBlockUserDialog={openBlockUserDialog}
            />
          )}
        </BlockUser.Dialog>
      )}
    </EditProfileDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
