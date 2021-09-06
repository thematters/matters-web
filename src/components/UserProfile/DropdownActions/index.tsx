import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAnalytics24,
  IconEdit16,
  IconLogout24,
  IconMail24,
  IconMore32,
  IconSettings32,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  UnsubscribeCircleDialog,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { toPath, translate } from '~/common/utils'

import { EditProfileDialog } from './EditProfileDialog'
import { fragments } from './gql'

import { DropdownActionsUserPrivate } from './__generated__/DropdownActionsUserPrivate'
import { DropdownActionsUserPublic } from './__generated__/DropdownActionsUserPublic'

interface DropdownActionsProps {
  user: DropdownActionsUserPublic & Partial<DropdownActionsUserPrivate>
  isMe: boolean
}

interface DialogProps {
  openEditProfileDialog: () => void
  openBlockUserDialog: () => void
  openUnsubscribeCircleDialog: () => void
}

interface Controls {
  hasEditProfile: boolean
  hasBlockUser: boolean
  isCircleMember: boolean
  isCircleOwner: boolean
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps & Controls

const BaseDropdownActions = ({
  user,

  hasEditProfile,
  hasBlockUser,
  isCircleMember,
  isCircleOwner,

  openEditProfileDialog,
  openBlockUserDialog,
  openUnsubscribeCircleDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasEditProfile && (
        <Menu.Item onClick={openEditProfileDialog}>
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <Translate id="editUserProfile" />
          </TextIcon>
        </Menu.Item>
      )}

      {isCircleOwner && (
        <Menu.Item
          {...toPath({
            page: 'userManageCircleInvitation',
            userName: user.userName || '',
          })}
        >
          <TextIcon icon={<IconMail24 size="md" />} size="md" spacing="base">
            <Translate id="manageCircleInvitation" />
          </TextIcon>
        </Menu.Item>
      )}

      {isCircleOwner && (
        <Menu.Item
          {...toPath({ page: 'userAnalytics', userName: user.userName || '' })}
        >
          <TextIcon
            icon={<IconAnalytics24 size="md" />}
            size="md"
            spacing="base"
          >
            <Translate id="circleAnalytics" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasBlockUser && (
        <BlockUser.Button user={user} openDialog={openBlockUserDialog} />
      )}

      {isCircleMember && (
        <Menu.Item onClick={openUnsubscribeCircleDialog}>
          <TextIcon icon={<IconLogout24 size="md" />} size="md" spacing="base">
            <Translate id="unsubscribeCircle" />
          </TextIcon>
        </Menu.Item>
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
  const circle = user.ownCircles && user.ownCircles[0]
  const controls = {
    hasEditProfile: isMe,
    hasBlockUser: !isMe,
    isCircleMember: !isMe && !!circle?.isMember && !!circle.id,
    isCircleOwner: isMe && circle?.owner.id === user.id,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <UnsubscribeCircleDialog id={circle?.id || ''}>
      {({ openDialog: openUnsubscribeCircleDialog }) => (
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
                  openUnsubscribeCircleDialog={openUnsubscribeCircleDialog}
                />
              )}
            </BlockUser.Dialog>
          )}
        </EditProfileDialog>
      )}
    </UnsubscribeCircleDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
