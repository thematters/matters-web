import { useIntl } from 'react-intl'

import { IconShare16, Menu } from '~/components'

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
      icon={<IconShare16 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default ShareButton
