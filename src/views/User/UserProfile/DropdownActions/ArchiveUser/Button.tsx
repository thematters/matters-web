import IconWarn from '@/public/static/icons/24px/warn.svg'
import { Icon, Menu } from '~/components'

type ArchiveUserButtonProps = {
  openDialog: () => void
}

const ArchiveUserButton: React.FC<ArchiveUserButtonProps> = ({
  openDialog,
}) => {
  return (
    <Menu.Item
      text="註銷用戶"
      icon={<Icon icon={IconWarn} size={20} />}
      textColor="red"
      textActiveColor="redDark"
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default ArchiveUserButton
