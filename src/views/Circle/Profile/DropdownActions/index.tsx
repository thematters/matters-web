import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconData from '@/public/static/icons/24px/data.svg'
import IconEdit from '@/public/static/icons/24px/edit.svg'
import IconLogout from '@/public/static/icons/24px/logout.svg'
import IconMore from '@/public/static/icons/24px/more.svg'
import IconSettings from '@/public/static/icons/24px/settings.svg'
import { toPath } from '~/common/utils'
import {
  Button,
  Dropdown,
  Icon,
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
          icon={<Icon icon={IconEdit} size={20} />}
          {...toPath({ page: 'circleSettings', circle })}
          is="link"
        />
      )}

      {isCircleOwner && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Analytics" id="GZJpDf" />}
          icon={<Icon icon={IconData} size={20} />}
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
          icon={<Icon icon={IconLogout} size={20} />}
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
            <Icon icon={IconSettings} size={32} color="white" />
          ) : (
            <Icon icon={IconMore} size={32} color="white" />
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
