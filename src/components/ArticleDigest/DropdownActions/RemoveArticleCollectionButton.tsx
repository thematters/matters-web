import { FormattedMessage } from 'react-intl'

import { IconTrash20, Menu } from '~/components'

interface RemoveArticleCollectionButtonProps {
  openDialog: () => void
}

const RemoveArticleCollectionButton = ({
  openDialog,
}: RemoveArticleCollectionButtonProps) => {
  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Remove from collection" />}
      icon={<IconTrash20 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default RemoveArticleCollectionButton
