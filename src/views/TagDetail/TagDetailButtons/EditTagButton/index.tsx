import { Button, Icon, TagDialog, TextIcon, Translate } from '~/components'

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
        bgActiveColor="green-lighter"
        onClick={open}
        aria-haspopup="true"
      >
        <TextIcon
          icon={<Icon.Edit color="green" size="xs" />}
          size="sm"
          color="green"
        >
          <Translate id="editTag" />
        </TextIcon>
      </Button>
    )}
  </TagDialog>
)

export default EditTagButton
