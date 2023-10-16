import { FormattedMessage } from 'react-intl'

import { IconBook20, Menu } from '~/components'

interface AddCollectionButtonProps {
  openDialog: () => void
}

const AddCollectionButton = ({ openDialog }: AddCollectionButtonProps) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Add to collection" />}
      icon={<IconBook20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default AddCollectionButton
