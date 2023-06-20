import { FormattedMessage } from 'react-intl'

import { IconArchive20, Menu, TextIcon } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="red"
      textActiveColor="redDark"
    >
      <TextIcon icon={<IconArchive20 size="mdS" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Archive" description="" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ArchiveArticleButton
