import { FormattedMessage } from 'react-intl'

import IconDelete from '@/public/static/icons/24px/delete.svg'
import { Icon, Menu } from '~/components'

const DeleteCollectionButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Delete collection" id="m4GG4b" />}
      icon={<Icon icon={IconDelete} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="red"
      textActiveColor="redDark"
    />
  )
}

export default DeleteCollectionButton
