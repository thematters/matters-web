import { Button, IconAdd, TextIcon, Translate } from '~/components'

import TagArticleDialog from './TagArticleDialog'

interface AddArticleButtonProps {
  id?: string
}

const AddArticleButton: React.FC<AddArticleButtonProps> = ({ id }) => {
  return (
    <TagArticleDialog id={id}>
      {({ open }) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgActiveColor="grey-lighter"
          onClick={open}
          aria-haspopup="true"
        >
          <TextIcon icon={<IconAdd color="green" size="xs" />} color="green">
            <Translate id="addArticleTag" />
          </TextIcon>
        </Button>
      )}
    </TagArticleDialog>
  )
}

export default AddArticleButton
