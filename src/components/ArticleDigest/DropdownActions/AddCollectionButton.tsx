import { FormattedMessage } from 'react-intl'

import IconBook from '@/public/static/icons/24px/book.svg'
import { Icon, Menu } from '~/components'

interface AddCollectionButtonProps {
  openDialog: () => void
}

const AddCollectionButton = ({ openDialog }: AddCollectionButtonProps) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Add to collection" id="ub1kHa" />}
      icon={<Icon icon={IconBook} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default AddCollectionButton
