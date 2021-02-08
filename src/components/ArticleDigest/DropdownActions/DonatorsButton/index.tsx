import { IconDonate24, Menu, TextIcon, Translate } from '~/components'

interface DonatorsButtonProps {
  openDialog: () => void
}

const DonatorsButton = ({ openDialog }: DonatorsButtonProps) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconDonate24 size="md" />} size="md" spacing="base">
        <Translate id="viewDonators" />
      </TextIcon>
    </Menu.Item>
  )
}

export default DonatorsButton
