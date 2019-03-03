import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_POST_DARK from '~/static/icons/post-dark.svg?sprite'

import styles from './styles.css'

const EditButton = ({
  hideDropdown,
  editComment
}: {
  hideDropdown: () => void
  editComment: () => void
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        editComment()
        hideDropdown()
      }}
    >
      <TextIcon
        icon={
          <Icon
            id={ICON_POST_DARK.id}
            viewBox={ICON_POST_DARK.viewBox}
            size="small"
          />
        }
        spacing="tight"
      >
        <Translate zh_hant="編輯" zh_hans="编辑" />
      </TextIcon>
      <style jsx>{styles}</style>
    </button>
  )
}

export default EditButton
