import { FormattedMessage } from 'react-intl'

import IconDelete from '@/public/static/icons/24px/delete.svg'
import { Icon, Menu } from '~/components'

const DeleteMomentButton = ({ openDialog }: { openDialog: () => void }) => (
  <Menu.Item
    text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
    icon={<Icon icon={IconDelete} size={20} />}
    onClick={openDialog}
    ariaHasPopup="dialog"
    textColor="red"
    textActiveColor="redDark"
  />
)

export default DeleteMomentButton
