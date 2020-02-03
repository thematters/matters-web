import { Button, Icon, TextIcon, Translate } from '~/components'

const EditProfileButton = ({
  setEditing
}: {
  setEditing: (value: boolean) => void
}) => (
  <Button
    spacing={['xxtight', 'xtight']}
    bgHoverColor="grey-lighter"
    onClick={() => setEditing(true)}
  >
    <TextIcon icon={<Icon.SettingsMedium />} color="grey">
      <Translate zh_hant="編輯資料" zh_hans="编辑资料" />
    </TextIcon>
  </Button>
)

export default EditProfileButton
