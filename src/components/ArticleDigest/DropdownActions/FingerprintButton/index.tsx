import { IconIPFS24, Menu, Translate } from '~/components'

interface FingerprintButtonProps {
  openDialog: () => void
}

const FingerprintButton = ({ openDialog }: FingerprintButtonProps) => {
  return (
    <Menu.Item
      text={<Translate id="IPFSEntrance" />}
      icon={<IconIPFS24 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default FingerprintButton
