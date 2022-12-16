import { IconIPFS24, Menu, TextIcon, Translate } from '~/components'

interface FingerprintButtonProps {
  openDialog: () => void
}

const FingerprintButton = ({ openDialog }: FingerprintButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconIPFS24 size="md" />} size="md" spacing="base">
        <Translate id="IPFSEntrance" />
      </TextIcon>
    </Menu.Item>
  )
}

export default FingerprintButton
