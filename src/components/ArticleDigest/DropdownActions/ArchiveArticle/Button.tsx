import { FormattedMessage } from 'react-intl'

import { IconArchive20, Menu } from '~/components'

const ArchiveArticleButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Archive" />}
      icon={<IconArchive20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="red"
      textActiveColor="redDark"
    />
  )
}

export default ArchiveArticleButton
