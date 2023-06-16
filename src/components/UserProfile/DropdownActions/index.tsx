import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Button,
  DropdownDialog,
  IconMore32,
  IconRss20,
  IconShare20,
  Menu,
  RssFeedDialog,
  ShareDialog,
  TextIcon,
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
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item
        onClick={openShareDialog}
        ariaHasPopup="dialog"
        textColor="greyDarker"
        textActiveColor="black"
        spacing={['xtight', 'base']}
      >
        <TextIcon icon={<IconShare20 size="mdS" />} size="md" spacing="tight">
          <FormattedMessage defaultMessage="Share" description="" />
        </TextIcon>
      </Menu.Item>

      {hasRssFeed && (
        <Menu.Item
          onClick={openRssFeedDialog}
          ariaHasPopup="dialog"
          textColor="greyDarker"
          textActiveColor="black"
          spacing={['xtight', 'base']}
        >
          <TextIcon icon={<IconRss20 size="mdS" />} size="md" spacing="tight">
            <Translate id="subscriptions" />
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
      {({ openDialog, type, ref }) => {
        return (
          <>
            {isInAside && isMe && (
              <Button
                textColor="greyDarker"
                textActiveColor="green"
                aria-label={intl.formatMessage({
                  defaultMessage: 'More Actions',
                  description: '',
                })}
                aria-haspopup={type}
                onClick={openDialog}
                ref={ref}
              >
                <IconMore32 size="md" />
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
                  description: '',
                })}
                aria-haspopup={type}
                onClick={openDialog}
                ref={ref}
              >
                <IconMore32 size="md" />
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
                  description: '',
                })}
                aria-haspopup={type}
                onClick={openDialog}
                ref={ref}
              >
                <IconMore32 />
              </Button>
            )}
          </>
        )
      }}
    </DropdownDialog>
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
