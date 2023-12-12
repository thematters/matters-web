import { IconWarning22, Menu } from '~/components'

type ArchiveUserButtonProps = {
  openDialog: () => void
}

const ArchiveUserButton: React.FC<ArchiveUserButtonProps> = ({
  openDialog,
}) => {
  return (
    <Menu.Item
      text="註銷用戶"
      icon={<IconWarning22 size="mdS" />}
      textColor="red"
      textActiveColor="redDark"
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default ArchiveUserButton
