import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDelete } from '@/public/static/icons/24px/delete.svg'
import { Icon, Menu } from '~/components'

const DeleteCommentButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
      icon={<Icon icon={IconDelete} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default DeleteCommentButton
