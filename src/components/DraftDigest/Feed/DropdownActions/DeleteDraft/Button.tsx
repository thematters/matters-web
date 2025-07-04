import { useIntl } from 'react-intl'

import IconDelete from '@/public/static/icons/24px/delete.svg'
import { Icon, Menu } from '~/components'

type DeleteDraftButtonProps = {
  openDialog: () => void
}

const DeleteDraftButton: React.FC<DeleteDraftButtonProps> = ({
  openDialog,
}) => {
  const intl = useIntl()

  return (
    <Menu.Item
      onClick={openDialog}
      text={intl.formatMessage({
        defaultMessage: 'Delete draft',
        id: 'mij/rJ',
      })}
      textColor="red"
      icon={<Icon icon={IconDelete} size={20} />}
      ariaHasPopup="dialog"
    />
  )
}

export default DeleteDraftButton
