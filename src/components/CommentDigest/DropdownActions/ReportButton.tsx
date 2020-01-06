import { Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

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
      <TextIcon icon={<Icon.Flag size="sm" />} spacing="tight">
        <Translate
          zh_hant={TEXT.zh_hant.report}
          zh_hans={TEXT.zh_hans.report}
        />
      </TextIcon>

      <style jsx>{styles}</style>
    </button>
  )
}

export default EditButton
