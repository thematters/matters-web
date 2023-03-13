import { FormattedMessage } from 'react-intl'

import { IconCollapse16, Menu, TextIcon } from '~/components'

const CollapseCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconCollapse16 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Collapse" description="src/components/Comment/DropdownActions/CollapseComment/Button.tsx"/>
      </TextIcon>
    </Menu.Item>
  )
}

export default CollapseCommentButton
