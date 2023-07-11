import { FormattedMessage } from 'react-intl'

import { IconEdit20, Menu } from '~/components'

const EditCollectionButton = ({ openDialog }: { openDialog: () => void }) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Edit collection" />}
      icon={<IconEdit20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
      textColor="greyDarker"
      textActiveColor="black"
    />
  )
}

export default EditCollectionButton
