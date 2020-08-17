import { IconAddMedium, Menu, TextIcon, Translate } from '~/components'

interface AddSelectedArticlesButtonProps {
  onClick: () => void
}

const AddSelectedArticlesButton: React.FC<AddSelectedArticlesButtonProps> = ({
  onClick,
}) => {
  return (
    <>
      <Menu.Item onClick={onClick}>
        <TextIcon icon={<IconAddMedium size="md" />} size="md" spacing="base">
          <Translate id="tagAddSelectedArticle" />
        </TextIcon>
      </Menu.Item>
      <Menu.Divider spacing="xtight" />
    </>
  )
}

export default AddSelectedArticlesButton
