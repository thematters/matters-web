import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  Dropdown,
  IconUnfollow24,
  LanguageContext,
  Menu,
} from '~/components'

export interface DropdownActionsControls {
  actions?: React.ReactNode
}

type DropdownActionsProps = DropdownActionsControls

type BaseDropdownActionsProps = DropdownActionsProps

const BaseDropdownActions = ({ actions }: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const Content = () => <Menu>{actions}</Menu>

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          spacing={['xtight', 'xtight']}
          bgActiveColor="greyLighterActive"
          aria-label={translate({ id: 'moreActions', lang })}
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
