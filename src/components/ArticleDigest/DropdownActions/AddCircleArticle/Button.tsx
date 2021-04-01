import { IconCircle24, Menu, TextIcon, Translate } from '~/components'

const AddCircleArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconCircle24 size="md" />} size="md" spacing="base">
        <Translate zh_hant="加入圍爐" zh_hans="加入围炉" en="Add to Circle" />
      </TextIcon>
    </Menu.Item>
  )
}

export default AddCircleArticleButton
