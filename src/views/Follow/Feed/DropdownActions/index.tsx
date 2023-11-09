import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useIntl } from 'react-intl'

import { Button, Dropdown, IconUnfollow24, Menu } from '~/components'

export interface DropdownActionsControls {
  actions?: React.ReactNode
}

type DropdownActionsProps = DropdownActionsControls

type BaseDropdownActionsProps = DropdownActionsProps

const BaseDropdownActions = ({ actions }: BaseDropdownActionsProps) => {
  const Content = () => <Menu>{actions}</Menu>

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
          spacing={['xtight', 'xtight']}
          bgActiveColor="greyLighterActive"
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <IconUnfollow24 style={{ width: '1.125rem', height: '1.125rem' }} />
        </Button>
      )}
    </Dropdown>
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
