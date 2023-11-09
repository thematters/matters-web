import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Button,
  Dropdown,
  IconAnalytics24,
  IconEdit16,
  IconLogout24,
  IconMore32,
  IconSettings32,
  Menu,
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
  const Content = () => (
    <Menu>
      {isCircleOwner && (
        <Menu.Item
          text={
            <FormattedMessage
              defaultMessage="Manage Circle"
              id="q+N5Wd"
              description="src/views/Circle/Profile/DropdownActions/index.tsx"
            />
          }
          icon={<IconEdit16 size="mdS" />}
          {...toPath({ page: 'circleSettings', circle })}
          is="link"
        />
      )}

      {isCircleOwner && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Analytics" id="GZJpDf" />}
          icon={<IconAnalytics24 size="mdS" />}
          {...toPath({ page: 'circleAnalytics', circle })}
          is="link"
        />
      )}

      {hasUnsubscribeCircle && (
        <Menu.Item
          text={
            <FormattedMessage
              defaultMessage="Unsubscribe Circle"
              id="8xPi0N"
              description="src/views/Circle/Profile/DropdownActions/index.tsx"
            />
          }
          icon={<IconLogout24 size="mdS" />}
          onClick={openUnsubscribeCircleDialog}
          aria-haspopup="dialog"
        />
      )}
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          bgColor="halfBlack"
          aria-label={intl.formatMessage({
            defaultMessage: 'More Actions',
            id: 'A7ugfn',
          })}
          aria-haspopup="listbox"
          ref={ref}
        >
          {isCircleOwner ? (
            <IconSettings32 size="lg" color="white" />
          ) : (
            <IconMore32 size="lg" color="white" />
          )}
        </Button>
      )}
    </Dropdown>
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
