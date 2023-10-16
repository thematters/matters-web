import { FormattedMessage } from 'react-intl'

import { IconEdit16, Menu } from '~/components'

interface EditButtonProps {
  openEditCommentDialog: () => void
}

const EditButton = ({ openEditCommentDialog }: EditButtonProps) => {
  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Edit"
          description="src/components/Comment/DropdownActions/EditButton.tsx"
        />
      }
      icon={<IconEdit16 size="mdS" />}
      onClick={openEditCommentDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default EditButton
