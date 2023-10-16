import { IconDonate24, Menu, Translate } from '~/components'

interface DonatorsButtonProps {
  openDialog: () => void
}

const DonatorsButton = ({ openDialog }: DonatorsButtonProps) => {
  return (
    <Menu.Item
      text={<Translate id="viewSupporters" />}
      icon={<IconDonate24 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default DonatorsButton
