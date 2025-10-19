import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconMore from '@/public/static/icons/24px/more.svg'
import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import {
  Button,
  Dropdown,
  Icon,
  Menu,
  Spinner,
  SubmitReport,
  toast,
  ViewerContext,
  withDialog,
} from '~/components'
import { SubmitReportDialogProps } from '~/components/Dialogs/SubmitReportDialog/Dialog'
import { MomentDigestDropdownActionsMomentFragment } from '~/gql/graphql'

import DeleteMoment from './DeleteMoment'
import { DeleteMomentDialogProps } from './DeleteMoment/Dialog'

const isAdminView = process.env.NEXT_PUBLIC_ADMIN_VIEW === 'true'

const DynamicToggleSpamButton = dynamic(
  () => import('~/components/ToggleSpam'),
  {
    loading: () => <Spinner />,
  }
)

const fragments = {
  moment: gql`
    fragment MomentDigestDropdownActionsMoment on Moment {
      id
      state
      author {
        id
        userName
      }
    }
  `,
}

type DropdownActionsProps = {
  moment: MomentDigestDropdownActionsMomentFragment
}

interface Controls {
  hasDelete: boolean
  hasReport: boolean
}

interface DialogProps {
  openDeleteMomentDialog: () => void
  openSubmitReportDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const BaseDropdownActions = ({
  hasDelete,
  hasReport,
  moment,

  openDeleteMomentDialog,
  openSubmitReportDialog,
}: BaseDropdownActionsProps) => {
  const viewer = useContext(ViewerContext)

  const Content = () => (
    <Menu>
      {hasReport && <SubmitReport.Button openDialog={openSubmitReportDialog} />}
      {hasDelete && <DeleteMoment.Button openDialog={openDeleteMomentDialog} />}

      {/**********
       * Admin
       ************/}
      {isAdminView && viewer.isAdmin && (
        <>
          <Menu.Divider />
          <DynamicToggleSpamButton type="moment" id={moment.id} />
        </>
      )}
    </Menu>
  )

  const intl = useIntl()
  const moreActionText = intl.formatMessage({
    defaultMessage: 'More Actions',
    id: 'A7ugfn',
  })

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          spacing={[8, 8]}
          textColor="greyDark"
          textActiveColor="green"
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <Icon icon={IconMore} size={22} />
        </Button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { moment } = props
  const viewer = useContext(ViewerContext)
  const { isArchived, isFrozen } = viewer

  const isMomentAuthor = moment.author.id === viewer.id
  const isActive = moment.state === 'active'

  const controls = {
    hasDelete: isMomentAuthor && isActive,
    hasReport: !isMomentAuthor,
  }

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  if (_isEmpty(_pickBy(controls)) && !viewer.isAdmin) {
    return null
  }

  if (isArchived) {
    return null
  }

  const WithReport = withDialog<Omit<SubmitReportDialogProps, 'children'>>(
    BaseDropdownActions as React.ComponentType<object>,
    SubmitReport.Dialog,
    { id: moment.id },
    ({ openDialog }) => ({
      ...props,
      ...controls,
      openSubmitReportDialog: openDialog,
    })
  )

  const WithDeleteMoment = withDialog<
    Omit<DeleteMomentDialogProps, 'children'>
  >(WithReport, DeleteMoment.Dialog, { moment }, ({ openDialog }) => {
    return {
      ...props,
      ...controls,
      openDeleteMomentDialog: isFrozen ? forbid : openDialog,
    }
  })

  return <WithDeleteMoment />
}

DropdownActions.fragments = fragments

export default DropdownActions
