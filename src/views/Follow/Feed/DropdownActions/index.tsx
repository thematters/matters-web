import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useIntl } from 'react-intl'

import IconUnfollow from '@/public/static/icons/24px/unfollow.svg'
import { Button, Dropdown, Icon, Menu } from '~/components'

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
          spacing={[8, 8]}
          bgActiveColor="greyLighterActive"
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
        >
          <Icon
            icon={IconUnfollow}
            style={{ width: '1.125rem', height: '1.125rem' }}
          />
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
