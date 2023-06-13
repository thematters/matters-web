import { FormattedMessage } from 'react-intl'

import { IconArchive20, Menu, TextIcon } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon
        icon={<IconArchive20 size="mdS" color="red" />}
        size="md"
        spacing="base"
        color="red"
      >
        <FormattedMessage defaultMessage="Archive" description="" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ArchiveArticleButton
