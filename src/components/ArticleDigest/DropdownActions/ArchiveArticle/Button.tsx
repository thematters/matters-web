import { Icon, Menu, TextIcon, Translate } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon
        icon={<Icon.ArchiveMedium size="md" />}
        size="md"
        spacing="base"
      >
        <Translate id="hide" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ArchiveArticleButton
