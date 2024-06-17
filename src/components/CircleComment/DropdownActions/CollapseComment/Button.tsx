import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCollapse } from '@/public/static/icons/24px/collapse.svg'
import { Icon, Menu } from '~/components'

const CollapseCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Collapse"
          id="pRV+UD"
          description="src/components/Comment/DropdownActions/CollapseComment/Button.tsx"
        />
      }
      icon={<Icon icon={IconCollapse} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default CollapseCommentButton
