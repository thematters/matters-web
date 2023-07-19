import { FormattedMessage } from 'react-intl'

import { IconRemove24, Menu } from '~/components'

const DeleteCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Delete" />}
      icon={<IconRemove24 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default DeleteCommentButton
