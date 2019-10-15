import _get from 'lodash/get'

import { Icon, TextIcon, Translate } from '~/components'

import ICON_SETTINGS from '~/static/icons/settings.svg?sprite'

const EditProfileButton = ({
  setEditing
}: {
  setEditing: (value: boolean) => void
}) => (
  <button type="button" onClick={() => setEditing(true)}>
    <TextIcon
      icon={
        <Icon
          id={ICON_SETTINGS.id}
          viewBox={ICON_SETTINGS.viewBox}
          size="small"
        />
      }
      color="grey"
    >
      <Translate zh_hant="編輯資料" zh_hans="编辑资料" />
    </TextIcon>
  </button>
)

export default EditProfileButton
