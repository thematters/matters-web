import { FormattedMessage } from 'react-intl'

import { IconEdit16, Menu, TextIcon } from '~/components'

interface EditButtonProps {
  openEditCommentDialog: () => void
}

const EditButton = ({ openEditCommentDialog }: EditButtonProps) => {
  return (
    <Menu.Item onClick={openEditCommentDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
        <FormattedMessage
          defaultMessage="Edit"
          description="src/components/Comment/DropdownActions/EditButton.tsx"
        />
      </TextIcon>
    </Menu.Item>
  )
}

export default EditButton
