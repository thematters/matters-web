import { Icon, TextIcon, Translate } from '~/components'

import ICON_POST_DARK from '~/static/icons/post-dark.svg?sprite'

import styles from './styles.css'

const EditButton = ({
  commentId,
  hideDropdown
}: {
  commentId: string
  hideDropdown: () => void
}) => {
  return (
    <button
      type="button"
      onClick={() => {
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
