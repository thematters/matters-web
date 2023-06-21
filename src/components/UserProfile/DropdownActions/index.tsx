import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Button,
  Dropdown,
  IconEdit16,
  IconLogbook1,
  IconLogbook2,
  // IconLogbook24,
  IconMore32,
  IconSettings32,
  LanguageContext,
  Menu,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import {
  DropdownActionsUserPrivateFragment,
  DropdownActionsUserPublicFragment,
} from '~/gql/graphql'

import { EditProfileDialog } from './EditProfileDialog'

interface DropdownActionsProps {
  user: DropdownActionsUserPublicFragment &
    Partial<DropdownActionsUserPrivateFragment>
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

  const intl = useIntl()
  const Content = () => (
    <Menu>
      {hasEditProfile && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Edit" description="" />}
          icon={<IconEdit16 size="mdS" />}
          onClick={openEditProfileDialog}
          ariaHasPopup="dialog"
        />
      )}

      {hasLogbook && (
        <>
          <Menu.Item
            text={
              <FormattedMessage
                defaultMessage="Logbook 2.0"
                description="src/components/UserProfile/DropdownActions/index.tsx"
              />
            }
            icon={<IconLogbook2 size="mdS" />}
            htmlHref={logbook2Url}
            htmlTarget="_blank"
            is="anchor"
          />

          <Menu.Item
            text={
              <FormattedMessage
                defaultMessage="Logbook 1.0"
                description="src/components/UserProfile/DropdownActions/index.tsx"
              />
            }
            icon={<IconLogbook1 size="mdS" />}
            htmlHref={logbook1Url}
            htmlTarget="_blank"
            is="anchor"
          />
        </>
      )}

      {hasBlockUser && (
        <BlockUser.Button user={user} openDialog={openBlockUserDialog} />
      )}
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ ref }) => (
        <Button
          bgColor="halfBlack"
          aria-label={intl.formatMessage({
            defaultMessage: 'More Actions',
            description: '',
          })}
          aria-haspopup="listbox"
          ref={ref}
        >
          {hasEditProfile ? (
            <IconSettings32 size="lg" color="white" />
          ) : (
            <IconMore32 size="lg" color="white" />
          )}
        </Button>
      )}
    </Dropdown>
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
