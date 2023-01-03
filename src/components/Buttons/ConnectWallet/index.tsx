import { PATHS } from '~/common/enums'
import { Button, TextIcon, Translate } from '~/components'

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
        <Translate id="connectWallet" />
      </TextIcon>
    </Button>
  )
}
