import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Button,
  Dropdown,
  IconMore16,
  IconMore22,
  IconRss20,
  IconShare20,
  Menu,
  RssFeedDialog,
  ShareDialog,
  Translate,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import {
  AuthorRssFeedFragment,
  DropdownActionsUserPrivateFragment,
  DropdownActionsUserPublicFragment,
} from '~/gql/graphql'

import { EditProfileDialog } from './EditProfileDialog'

interface DropdownActionsProps {
  user: DropdownActionsUserPublicFragment &
    AuthorRssFeedFragment &
    Partial<DropdownActionsUserPrivateFragment>
  isMe: boolean
  isInAside?: boolean
}

interface DialogProps {
  openEditProfileDialog: () => void
  openBlockUserDialog: () => void
  openRssFeedDialog: () => void
  openShareDialog: () => void
}

interface Controls {
  hasEditProfile: boolean
  hasBlockUser: boolean
  hasRssFeed: boolean
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
  isMe,
  isInAside = false,

  hasEditProfile,
  hasBlockUser,
  hasRssFeed,

  openEditProfileDialog,
  openBlockUserDialog,
  openRssFeedDialog,
  openShareDialog,
}: BaseDropdownActionsProps) => {
  const intl = useIntl()
  const Content = () => (
    <Menu>
      <Menu.Item
        onClick={openShareDialog}
        ariaHasPopup="dialog"
        textColor="greyDarker"
        textActiveColor="black"
        spacing={['xtight', 'base']}
        text={<FormattedMessage defaultMessage="Share" />}
        icon={<IconShare20 size="mdS" />}
      />
      {hasRssFeed && (
        <Menu.Item
          onClick={openRssFeedDialog}
          ariaHasPopup="dialog"
          textColor="greyDarker"
          textActiveColor="black"
          spacing={['xtight', 'base']}
          text={<Translate id="subscriptions" />}
          icon={<IconRss20 size="mdS" />}
        />
      )}

      {hasBlockUser && (
        <BlockUser.Button user={user} openDialog={openBlockUserDialog} />
      )}
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => {
        return (
          <>
            {isInAside && isMe && (
              <Button
                textColor="greyDarker"
                textActiveColor="green"
                aria-label={intl.formatMessage({
                  defaultMessage: 'More Actions',
                })}
                onClick={openDropdown}
                ref={ref}
              >
                <IconMore22 size="mdM" />
              </Button>
            )}
            {isInAside && !isMe && (
              <Button
                spacing={['xtight', 'xtight']}
                textColor="greyDarker"
                textActiveColor="black"
                borderWidth="md"
                borderColor="greyDarker"
                borderActiveColor="black"
                aria-label={intl.formatMessage({
                  defaultMessage: 'More Actions',
                })}
                onClick={openDropdown}
                ref={ref}
              >
                <IconMore22 size="mdM" />
              </Button>
            )}
            {!isInAside && (
              <Button
                spacing={['xtight', 'xtight']}
                textColor="greyDarker"
                textActiveColor="black"
                borderWidth="md"
                borderColor="greyDarker"
                borderActiveColor="black"
                aria-label={intl.formatMessage({
                  defaultMessage: 'More Actions',
                })}
                onClick={openDropdown}
                ref={ref}
              >
                <IconMore16 />
              </Button>
            )}
          </>
        )
      }}
    </Dropdown>
  )
}

const DropdownActions = ({ user, isMe, isInAside }: DropdownActionsProps) => {
  const controls = {
    hasEditProfile: isMe,
    hasBlockUser: !isMe,
    hasRssFeed: user?.articles.totalCount > 0 && !!user?.info.ipnsKey,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <ShareDialog
      tags={[user.displayName, user.userName].filter(Boolean) as string[]}
    >
      {({ openDialog: openShareDialog }) => (
        <RssFeedDialog user={user}>
          {({ openDialog: openRssFeedDialog }) => (
            <EditProfileDialog user={user}>
              {({ openDialog: openEditProfileDialog }) => (
                <BlockUser.Dialog user={user}>
                  {({ openDialog: openBlockUserDialog }) => (
                    <BaseDropdownActions
                      user={user}
                      isMe={isMe}
                      isInAside={isInAside}
                      {...controls}
                      openEditProfileDialog={openEditProfileDialog}
                      openBlockUserDialog={openBlockUserDialog}
                      openRssFeedDialog={openRssFeedDialog}
                      openShareDialog={openShareDialog}
                    />
                  )}
                </BlockUser.Dialog>
              )}
            </EditProfileDialog>
          )}
        </RssFeedDialog>
      )}
    </ShareDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
