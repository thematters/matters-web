import { IconArchiveMedium, Menu, TextIcon, Translate } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconArchiveMedium size="md" />} size="md" spacing="base">
        <Translate id="hide" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ArchiveArticleButton
