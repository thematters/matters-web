import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Button, TextIcon } from '~/components'

export const ConnectWalletButton = () => {
  return (
    <Button
      bgColor="green"
      size={[null, '2rem']}
      spacing={[0, 'base']}
      aria-haspopup="dialog"
      href={PATHS.ME_SETTINGS_CONNECT_WALLET}
    >
      <TextIcon color="white" weight="md">
        <FormattedMessage defaultMessage="Connect Wallet" />
      </TextIcon>
    </Button>
  )
}
