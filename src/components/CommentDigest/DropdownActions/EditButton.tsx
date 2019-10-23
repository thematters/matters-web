import { Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'
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
        <Translate zh_hant={TEXT.zh_hant.edit} zh_hans={TEXT.zh_hans.edit} />
      </TextIcon>

      <style jsx>{styles}</style>
    </button>
  )
}

export default EditButton
