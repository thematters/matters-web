import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import { Button, DropdownDialog, IconUnfollow24, Menu } from '~/components'

import { TEXT } from '~/common/enums'

export interface DropdownActionsControls {
  actions?: React.ReactNode
}

type DropdownActionsProps = DropdownActionsControls

type BaseDropdownActionsProps = DropdownActionsProps

const BaseDropdownActions = ({ actions }: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>{actions}</Menu>
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
          spacing={['xtight', 'xtight']}
          bgActiveColor="grey-lighter-active"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={openDialog}
          ref={ref}
        >
          <IconUnfollow24 style={{ width: '1.125rem', height: '1.125rem'}} />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { actions } = props

  const controls = {
    actions,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return <BaseDropdownActions {...props} {...controls} />
}

export default DropdownActions
