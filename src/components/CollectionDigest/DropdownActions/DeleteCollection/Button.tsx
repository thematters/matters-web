import { FormattedMessage } from 'react-intl'

import { IconTrash20, Menu } from '~/components'

const DeleteCollectionButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Delete collection" id="m4GG4b" />}
      icon={<IconTrash20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="red"
      textActiveColor="redDark"
    />
  )
}

export default DeleteCollectionButton
