import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { Icon, Menu } from '~/components'

const EditCollectionButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Edit collection" id="WQT8ZA" />}
      icon={<Icon icon={IconEdit} size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="greyDarker"
      textActiveColor="black"
    />
  )
}

export default EditCollectionButton
