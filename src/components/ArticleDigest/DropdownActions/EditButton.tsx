import { IconEdit, Menu, TextIcon, Translate } from '~/components'

const EditArticleButton = ({ editArticle }: { editArticle: () => void }) => {
  return (
    <Menu.Item onClick={editArticle}>
      <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
        <Translate id="editArticle" />
      </TextIcon>
    </Menu.Item>
  )
}

export default EditArticleButton
