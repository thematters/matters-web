import { IconLike, Menu, TextIcon, Translate } from '~/components'

interface AppreciatorsButtonProps {
  openDialog: () => void
}

const AppreciatorsButton = ({ openDialog }: AppreciatorsButtonProps) => {
  return (
    <Menu.Item onClick={openDialog}>
      <TextIcon icon={<IconLike size="md" />} size="md" spacing="base">
        <Translate id="viewAppreciators" />
      </TextIcon>
    </Menu.Item>
  )
}

export default AppreciatorsButton
