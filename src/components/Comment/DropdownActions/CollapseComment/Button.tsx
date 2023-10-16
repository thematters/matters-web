import { FormattedMessage } from 'react-intl'

import { IconCollapse16, Menu } from '~/components'

const CollapseCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Collapse"
          description="src/components/Comment/DropdownActions/CollapseComment/Button.tsx"
        />
      }
      icon={<IconCollapse16 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default CollapseCommentButton
