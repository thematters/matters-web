import { IconCollapse16, Menu, TextIcon, Translate } from '~/components'

const CollapseCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconCollapse16 size="md" />} size="md" spacing="base">
        <Translate zh_hant="闔上" zh_hans="折叠" />
      </TextIcon>
    </Menu.Item>
  )
}

export default CollapseCommentButton
