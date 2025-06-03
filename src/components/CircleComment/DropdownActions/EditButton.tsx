import { FormattedMessage } from 'react-intl'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import { Icon, Menu } from '~/components'

interface EditButtonProps {
  openEditCommentDialog: () => void
}

const EditButton = ({ openEditCommentDialog }: EditButtonProps) => {
  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Edit"
          id="6vgoSf"
          description="src/components/CircleComment/DropdownActions/EditButton.tsx"
        />
      }
      icon={<Icon icon={IconEdit} size={20} />}
      onClick={openEditCommentDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default EditButton
