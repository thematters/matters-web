import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  DropdownDialog,
  IconEdit16,
  IconLogbook1,
  IconLogbook2,
  // IconLogbook24,
  IconMore32,
  IconSettings32,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { DropdownActionsUserPrivate } from './__generated__/DropdownActionsUserPrivate'
import { DropdownActionsUserPublic } from './__generated__/DropdownActionsUserPublic'
import { EditProfileDialog } from './EditProfileDialog'

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
            hasNFTs
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
  const address = user.info.cryptoWallet?.address
  const logbook1Url = `${process.env.NEXT_PUBLIC_TRAVELOGGERS_URL}${
    lang === 'en' ? '/' : '/zh/'
  }owner/${address}`
  const logbook2Url = `${process.env.NEXT_PUBLIC_LOGBOOKS_URL}/bookcase/?address=${address}`

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasEditProfile && (
        <Menu.Item onClick={openEditProfileDialog} ariaHasPopup="dialog">
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <Translate id="editUserProfile" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasLogbook && (
        <>
          <Menu.Item htmlHref={logbook2Url} htmlTarget="_blank" is="anchor">
            <TextIcon
              icon={<IconLogbook2 size="md" />}
              size="md"
              spacing="base"
            >
              <Translate
                zh_hant="航行日誌 2.0"
                zh_hans="航行日志 2.0"
                en="Logbook 2.0"
              />
            </TextIcon>
          </Menu.Item>
          <Menu.Item htmlHref={logbook1Url} htmlTarget="_blank" is="anchor">
            <TextIcon
              icon={<IconLogbook1 size="md" />}
              size="md"
              spacing="base"
            >
              <Translate
                zh_hant="航行日誌 1.0"
                zh_hans="航行日志 1.0"
                en="Logbook 1.0"
              />
            </TextIcon>
          </Menu.Item>
        </>
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
      {({ openDialog, type, ref }) => (
        <Button
          bgColor="half-black"
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup={type}
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
    hasLogbook: !!user.info.cryptoWallet?.hasNFTs,
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
