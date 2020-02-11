import { Button, Icon, TextIcon, Translate } from '~/components'
import TagDialog from '~/components/TagDialog'

import { TEXT } from '~/common/enums'

interface EditTagButtonProps {
  id?: string
  content?: string
  description?: string
}

const EditTagButton = (props: EditTagButtonProps) => (
  <TagDialog {...props}>
    {({ open }) => (
      <Button
        size={[null, '1.5rem']}
        spacing={[0, 'xtight']}
        bgHoverColor="green-lighter"
        onClick={open}
      >
        <TextIcon
          icon={<Icon.Edit color="green" size="xs" />}
          size="sm"
          color="green"
        >
          <Translate
            zh_hant={TEXT.zh_hant.editTag}
            zh_hans={TEXT.zh_hans.editTag}
          />
        </TextIcon>
      </Button>
    )}
  </TagDialog>
)

export default EditTagButton
