import { Icon, TextIcon, Translate } from '~/components'

import ICON_FLAG from '~/static/icons/flag.svg?sprite'

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
        alert('TODO: report comment')
        hideDropdown()
      }}
    >
      <TextIcon
        icon={
          <Icon id={ICON_FLAG.id} viewBox={ICON_FLAG.viewBox} size="small" />
        }
        spacing="tight"
      >
        <Translate zh_hant="檢舉" zh_hans="检举" />
      </TextIcon>
      <style jsx>{styles}</style>
    </button>
  )
}

export default EditButton
