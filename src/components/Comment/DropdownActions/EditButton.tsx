import { Icon, Menu, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

const EditButton = ({
  hideDropdown,
  editComment
}: {
  hideDropdown: () => void
  editComment: () => void
}) => {
  return (
    <Menu.Item
      onClick={() => {
        editComment()
        hideDropdown()
      }}
    >
      <TextIcon icon={<Icon.Edit size="md" />} size="md" spacing="base">
        <Translate zh_hant={TEXT.zh_hant.edit} zh_hans={TEXT.zh_hans.edit} />
      </TextIcon>
    </Menu.Item>
  )
}

export default EditButton
