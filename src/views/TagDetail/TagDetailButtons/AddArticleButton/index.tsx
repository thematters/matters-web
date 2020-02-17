import { Button, Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

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
          bgHoverColor="green-lighter"
          onClick={open}
        >
          <TextIcon icon={<Icon.Add color="green" size="xs" />} color="green">
            <Translate
              zh_hant={TEXT.zh_hant.addArticleTag}
              zh_hans={TEXT.zh_hans.addArticleTag}
            />
          </TextIcon>
        </Button>
      )}
    </TagArticleDialog>
  )
}

export default AddArticleButton
