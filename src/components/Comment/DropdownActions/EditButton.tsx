import { IconEdit16, Menu, TextIcon, Translate } from '~/components'

interface EditButtonProps {
  openEditCommentDialog: () => void
}

const EditButton = ({ openEditCommentDialog }: EditButtonProps) => {
  return (
    <Menu.Item onClick={openEditCommentDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
        <Translate id="edit" />
      </TextIcon>
    </Menu.Item>
  )
}

export default EditButton
