import { useIntl } from 'react-intl'

import { ReactComponent as IconShare } from '@/public/static/icons/24px/share.svg'
import { Icon, Menu } from '~/components'

interface ShareButtonProps {
  openDialog: () => void
}

const ShareButton = ({ openDialog }: ShareButtonProps) => {
  const intl = useIntl()

  return (
    <Menu.Item
      text={intl.formatMessage({
        defaultMessage: 'Share Article',
        id: '/GyMKa',
      })}
      icon={<Icon icon={IconShare} size={20} />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default ShareButton
