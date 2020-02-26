import { Icon, Menu, TextIcon, Translate } from '~/components'

const EditButton = ({ editComment }: { editComment: () => void }) => {
  return (
    <Menu.Item onClick={editComment}>
      <TextIcon icon={<Icon.Edit size="md" />} size="md" spacing="base">
        <Translate id="edit" />
      </TextIcon>
    </Menu.Item>
  )
}

export default EditButton
