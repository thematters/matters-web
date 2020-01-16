import { Icon, TextIcon, Translate } from '~/components'

const EditProfileButton = ({
  setEditing
}: {
  setEditing: (value: boolean) => void
}) => (
  <button type="button" onClick={() => setEditing(true)}>
    <TextIcon icon={<Icon.Settings />} color="grey">
      <Translate zh_hant="編輯資料" zh_hans="编辑资料" />
    </TextIcon>
  </button>
)

export default EditProfileButton
