import { IconArchive24, Menu, TextIcon, Translate } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconArchive24 size="md" />} size="md" spacing="base">
        <Translate id="archive" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ArchiveArticleButton
