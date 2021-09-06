import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconUnfollow24,
  LanguageContext,
  Menu,
} from '~/components'

import { translate } from '~/common/utils'

export interface DropdownActionsControls {
  actions?: React.ReactNode
}

type DropdownActionsProps = DropdownActionsControls

type BaseDropdownActionsProps = DropdownActionsProps

const BaseDropdownActions = ({ actions }: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

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
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup="true"
          onClick={openDialog}
          ref={ref}
        >
          <IconUnfollow24 style={{ width: '1.125rem', height: '1.125rem' }} />
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
