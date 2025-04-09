import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDelete } from '@/public/static/icons/24px/delete.svg'
import { Icon, Menu } from '~/components'

interface RemoveArticleCollectionButtonProps {
  openDialog: () => void
}

const RemoveArticleCollectionButton = ({
  openDialog,
}: RemoveArticleCollectionButtonProps) => {
  return (
    <Menu.Item
      text={
        <FormattedMessage defaultMessage="Remove from collection" id="0Om2Kl" />
      }
      icon={<Icon icon={IconDelete} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default RemoveArticleCollectionButton
