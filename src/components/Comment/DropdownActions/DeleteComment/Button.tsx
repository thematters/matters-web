import { Icon, Menu, TextIcon, Translate } from '~/components'

const DeleteCommentButton = ({ showDialog }: { showDialog: () => void }) => {
  return (
    <Menu.Item onClick={showDialog}>
      <TextIcon icon={<Icon.RemoveMedium size="md" />} size="md" spacing="base">
        <Translate id="delete" />
      </TextIcon>
    </Menu.Item>
  )
}

export default DeleteCommentButton
