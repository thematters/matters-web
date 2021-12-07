import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconEdit16,
  IconLogbook24,
  IconMore32,
  IconSettings32,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { translate } from '~/common/utils'

import { EditProfileDialog } from './EditProfileDialog'

import { DropdownActionsUserPrivate } from './__generated__/DropdownActionsUserPrivate'
import { DropdownActionsUserPublic } from './__generated__/DropdownActionsUserPublic'

interface DropdownActionsProps {
  user: DropdownActionsUserPublic & Partial<DropdownActionsUserPrivate>
  isMe: boolean
}

interface DialogProps {
  openEditProfileDialog: () => void
  openBlockUserDialog: () => void
}

interface Controls {
  hasEditProfile: boolean
  hasBlockUser: boolean
  hasLogbook: boolean
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps & Controls

const fragments = {
  user: {
    public: gql`
      fragment DropdownActionsUserPublic on User {
        id
        info {
          cryptoWallet {
            id
            address
            nfts {
              id
            }
          }
        }
        ...BlockUserPublic
        ...EditProfileDialogUserPublic
      }
      ${BlockUser.fragments.user.public}
      ${EditProfileDialog.fragments.user.public}
    `,
    private: gql`
      fragment DropdownActionsUserPrivate on User {
        id
        ...BlockUserPrivate
        ...EditProfileDialogUserPrivate
      }
      ${BlockUser.fragments.user.private}
      ${EditProfileDialog.fragments.user.private}
    `,
  },
}

const BaseDropdownActions = ({
  user,

  hasEditProfile,
  hasBlockUser,
  hasLogbook,

  openEditProfileDialog,
  openBlockUserDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)
  const logbookUrl = `${process.env.NEXT_PUBLIC_TRAVELOGGERS_URL}${
    lang === 'en' ? '/' : '/zh/'
  }owner/${user.info.cryptoWallet?.address}`

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasEditProfile && (
        <Menu.Item onClick={openEditProfileDialog}>
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <Translate id="editUserProfile" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasLogbook && (
        <Menu.Item htmlHref={logbookUrl} htmlTarget="_blank">
          <TextIcon icon={<IconLogbook24 size="md" />} size="md" spacing="base">
            <Translate id="logbook" />
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
      {({ openDialog, ref }) => (
        <Button
          bgColor="half-black"
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup="true"
          onClick={openDialog}
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
    hasLogbook:
      Array.isArray(user.info.cryptoWallet?.nfts) &&
      (user.info.cryptoWallet?.nfts || []).length > 0,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <EditProfileDialog user={user}>
      {({ openDialog: openEditProfileDialog }) => (
        <BlockUser.Dialog user={user}>
          {({ openDialog: openBlockUserDialog }) => (
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
