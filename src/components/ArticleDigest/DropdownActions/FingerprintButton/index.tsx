import { IconIPFSMedium, Menu, TextIcon, Translate } from '~/components'

interface FingerprintButtonProps {
  openDialog: () => void
}

const FingerprintButton = ({ openDialog }: FingerprintButtonProps) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconIPFSMedium size="md" />} size="md" spacing="base">
        <Translate id="IPFSEntrance" />
      </TextIcon>
    </Menu.Item>
  )
}

export default FingerprintButton
