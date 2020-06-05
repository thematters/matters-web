import { IconCollapse, Menu, TextIcon, Translate } from '~/components'

const CollapseCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconCollapse size="md" />} size="md" spacing="base">
        <Translate id="collapseComment" />
      </TextIcon>
    </Menu.Item>
  )
}

export default CollapseCommentButton
