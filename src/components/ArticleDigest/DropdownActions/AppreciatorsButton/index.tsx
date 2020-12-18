import { IconActionClap16, Menu, TextIcon, Translate } from '~/components'

interface AppreciatorsButtonProps {
  openDialog: () => void
}

const AppreciatorsButton = ({ openDialog }: AppreciatorsButtonProps) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconActionClap16 size="md" />} size="md" spacing="base">
        <Translate id="viewAppreciators" />
      </TextIcon>
    </Menu.Item>
  )
}

export default AppreciatorsButton
