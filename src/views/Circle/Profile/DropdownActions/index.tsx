import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { toPath } from '~/common/utils'
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
  UnsubscribeCircleDialog,
  ViewerContext,
} from '~/components'
import {
  DropdownActionsCirclePrivateFragment,
  DropdownActionsCirclePublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'

interface DialogProps {
  circle: DropdownActionsCirclePublicFragment &
    Partial<DropdownActionsCirclePrivateFragment>
  openUnsubscribeCircleDialog: () => void
}

type DropdownActionsProps = {
  circle: DropdownActionsCirclePublicFragment &
    Partial<DropdownActionsCirclePrivateFragment>
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
  const intl = useIntl()
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {isCircleOwner && (
        <Menu.Item {...toPath({ page: 'circleSettings', circle })} is="link">
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <FormattedMessage
              defaultMessage="Manage Circle"
              description="src/views/Circle/Profile/DropdownActions/index.tsx"
            />
          </TextIcon>
        </Menu.Item>
      )}

      {isCircleOwner && (
        <Menu.Item {...toPath({ page: 'circleAnalytics', circle })} is="link">
          <TextIcon
            icon={<IconAnalytics24 size="md" />}
            size="md"
            spacing="base"
          >
            <FormattedMessage defaultMessage="Analytics" description="" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasUnsubscribeCircle && (
        <Menu.Item onClick={openUnsubscribeCircleDialog} aria-haspopup="dialog">
          <TextIcon icon={<IconLogout24 size="md" />} size="md" spacing="base">
            <FormattedMessage
              defaultMessage="Unsubscribe Circle"
              description="src/views/Circle/Profile/DropdownActions/index.tsx"
            />
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
      {({ openDialog, type, ref }) => (
        <Button
          bgColor="halfBlack"
          aria-label={intl.formatMessage({
            defaultMessage: 'More Actions',
            description: '',
          })}
          aria-haspopup={type}
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
