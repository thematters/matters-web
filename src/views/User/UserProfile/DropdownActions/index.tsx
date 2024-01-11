import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Button,
  Dropdown,
  EditProfileDialog,
  IconMore16,
  IconMore22,
  IconRss20,
  IconShare20,
  Menu,
  RssFeedDialog,
  RssFeedDialogProps,
  ShareDialog,
  ShareDialogProps,
  Spinner,
  Translate,
  ViewerContext,
  withDialog,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'
import { BlockUserDialogProps } from '~/components/BlockUser/Dialog'
import {
  AuthorRssFeedFragment,
  DropdownActionsUserPrivateFragment,
  DropdownActionsUserPublicFragment,
} from '~/gql/graphql'

import type { ArchiveUserDialogProps } from './ArchiveUser/Dialog'
import type {
  OpenToggleRestrictUserDialogWithProps,
  ToggleRestrictUserDialogProps,
} from './ToggleRestrictUser/Dialog'

const isAdminView = process.env.NEXT_PUBLIC_ADMIN_VIEW === 'true'

const DynamicToggleRestrictUserButton = dynamic(
  () => import('./ToggleRestrictUser/Button'),
  { loading: () => <Spinner /> }
)
const DynamicToggleRestrictUserDialog = dynamic(
  () => import('./ToggleRestrictUser/Dialog'),
  { loading: () => <Spinner /> }
)
const DynamicArchiveUserButton = dynamic(() => import('./ArchiveUser/Button'), {
  loading: () => <Spinner />,
})
const DynamicArchiveUserDialog = dynamic(() => import('./ArchiveUser/Dialog'), {
  loading: () => <Spinner />,
})

interface DropdownActionsProps {
  user: DropdownActionsUserPublicFragment &
    AuthorRssFeedFragment &
    Partial<DropdownActionsUserPrivateFragment>
  isMe: boolean
  isInAside?: boolean
}

interface DialogProps {
  openBlockUserDialog: () => void
  openRssFeedDialog: () => void
  openShareDialog: () => void
}

interface Controls {
  hasEditProfile: boolean
  hasBlockUser: boolean
  hasRssFeed: boolean
}

interface AdminProps {
  openToggleRestrictDialog: (
    props: OpenToggleRestrictUserDialogWithProps
  ) => void
  openArchiveDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps &
  DialogProps &
  Controls &
  AdminProps

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

  hasBlockUser,
  hasRssFeed,

  openBlockUserDialog,
  openRssFeedDialog,
  openShareDialog,

  // admin
  openToggleRestrictDialog,
  openArchiveDialog,
}: BaseDropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const Content = () => (
    <Menu>
      <Menu.Item
        onClick={openShareDialog}
        ariaHasPopup="dialog"
        textColor="greyDarker"
        textActiveColor="black"
        spacing={['xtight', 'base']}
        text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
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

      {/* admin */}
      {isAdminView && viewer.isAdmin && (
        <>
          <Menu.Divider />
          <DynamicToggleRestrictUserButton
            id={user.id}
            openDialog={openToggleRestrictDialog}
          />
          <DynamicArchiveUserButton openDialog={openArchiveDialog} />
        </>
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
                  id: 'A7ugfn',
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
                  id: 'A7ugfn',
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
                  id: 'A7ugfn',
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
  const viewer = useContext(ViewerContext)

  const controls = {
    hasEditProfile: isMe,
    hasBlockUser: !!viewer.id && !isMe,
    hasRssFeed: user?.articles.totalCount > 0 && !!user?.info.ipnsKey,
  }

  const WithShare = withDialog<Omit<ShareDialogProps, 'children'>>(
    BaseDropdownActions,
    ShareDialog,
    { tags: [user.displayName, user.userName].filter(Boolean) as string[] },
    ({ openDialog }) => ({
      user,
      isMe,
      isInAside,
      ...controls,
      openShareDialog: openDialog,
    })
  )
  const WithRssFeed = withDialog<Omit<RssFeedDialogProps, 'children'>>(
    WithShare,
    RssFeedDialog,
    { user },
    ({ openDialog }) => ({
      openRssFeedDialog: openDialog,
    })
  )
  const WithBlockUser = withDialog<Omit<BlockUserDialogProps, 'children'>>(
    WithRssFeed,
    BlockUser.Dialog,
    { user },
    ({ openDialog }) => ({ openBlockUserDialog: openDialog })
  )

  // exclude admin code on build
  if (!isAdminView || !viewer.isAdmin) {
    return <WithBlockUser />
  }

  /**
   * ADMIN ONLY
   */
  const WithToggleRestrict = withDialog<
    Omit<ToggleRestrictUserDialogProps, 'children'>
  >(
    WithBlockUser,
    DynamicToggleRestrictUserDialog,
    { id: user.id, userName: user.userName! },
    ({ openDialog }) => ({ openToggleRestrictDialog: openDialog })
  )
  const WithArchiveUser = withDialog<Omit<ArchiveUserDialogProps, 'children'>>(
    WithToggleRestrict,
    DynamicArchiveUserDialog,
    { id: user.id, userName: user.userName! },
    ({ openDialog }) => ({ openArchiveDialog: openDialog })
  )

  return <WithArchiveUser />
}

DropdownActions.fragments = fragments

export default DropdownActions
