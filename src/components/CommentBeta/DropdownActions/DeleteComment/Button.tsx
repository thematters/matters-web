import { FormattedMessage } from 'react-intl'

import { IconTrash20, Menu } from '~/components'

const DeleteCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
      icon={<IconTrash20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="red"
      textActiveColor="redDark"
    />
  )
}

export default DeleteCommentButton
