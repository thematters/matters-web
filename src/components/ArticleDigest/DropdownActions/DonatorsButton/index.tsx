import { IconDonate24, Menu, TextIcon, Translate } from '~/components'

interface DonatorsButtonProps {
  openDialog: () => void
}

const DonatorsButton = ({ openDialog }: DonatorsButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconDonate24 size="md" />} size="md" spacing="base">
        <Translate id="viewSupporters" />
      </TextIcon>
    </Menu.Item>
  )
}

export default DonatorsButton
