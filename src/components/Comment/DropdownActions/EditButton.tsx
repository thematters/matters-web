import { IconEdit, Menu, TextIcon, Translate } from '~/components'

interface EditButtonProps {
  openEditCommentDialog: () => void
}

const EditButton = ({ openEditCommentDialog }: EditButtonProps) => {
  return (
    <Menu.Item onClick={openEditCommentDialog}>
      <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
        <Translate id="edit" />
      </TextIcon>
    </Menu.Item>
  )
}

export default EditButton
