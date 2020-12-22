import { IconCollapse16, Menu, TextIcon, Translate } from '~/components'

const CollapseCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconCollapse16 size="md" />} size="md" spacing="base">
        <Translate id="collapseComment" />
      </TextIcon>
    </Menu.Item>
  )
}

export default CollapseCommentButton
