import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAnalytics24,
  IconEdit16,
  IconLogout24,
  IconMore32,
  IconSettings32,
  Menu,
  TextIcon,
  Translate,
  UnsubscribeCircleDialog,
  ViewerContext,
} from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import { fragments } from './gql'

import { DropdownActionsCirclePrivate } from './__generated__/DropdownActionsCirclePrivate'
import { DropdownActionsCirclePublic } from './__generated__/DropdownActionsCirclePublic'

interface DialogProps {
  circle: DropdownActionsCirclePublic & Partial<DropdownActionsCirclePrivate>
  openUnsubscribeCircleDialog: () => void
}

type DropdownActionsProps = {
  circle: DropdownActionsCirclePublic & Partial<DropdownActionsCirclePrivate>
}

interface Controls {
  isCircleOwner: boolean
  hasUnsubscribeCircle: boolean
}

type BaseDropdownActionsProps = DialogProps & Controls

const BaseDropdownActions = ({
  circle,

  isCircleOwner,
  hasUnsubscribeCircle,

  openUnsubscribeCircleDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {isCircleOwner && (
        <Menu.Item {...toPath({ page: 'circleSettings', circle })}>
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <Translate id="manageCircle" />
          </TextIcon>
        </Menu.Item>
      )}

      {isCircleOwner && (
        <Menu.Item {...toPath({ page: 'circleAnalytics', circle })}>
          <TextIcon
            icon={<IconAnalytics24 size="md" />}
            size="md"
            spacing="base"
          >
            <Translate id="circleAnalytics" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasUnsubscribeCircle && (
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
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={openDialog}
          ref={ref}
        >
          {isCircleOwner ? (
            <IconSettings32 size="lg" color="white" />
          ) : (
            <IconMore32 size="lg" color="white" />
          )}
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = ({ circle }: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const isOwner = circle.owner.id === viewer.id
  const isMember = !!circle.isMember
  const controls = {
    isCircleOwner: isOwner,
    hasUnsubscribeCircle: isMember,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <UnsubscribeCircleDialog id={circle.id}>
      {({ openDialog: openUnsubscribeCircleDialog }) => (
        <BaseDropdownActions
          circle={circle}
          {...controls}
          openUnsubscribeCircleDialog={openUnsubscribeCircleDialog}
        />
      )}
    </UnsubscribeCircleDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
