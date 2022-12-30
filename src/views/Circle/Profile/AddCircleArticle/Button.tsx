import { Button, IconPen16, TextIcon, Translate } from '~/components'

import AddCircleArticleDialog from './Dialog'

interface AddArticlesButtonProps {
  circle: { id: string; name: string }
}

const AddArticlesButton = ({ circle }: AddArticlesButtonProps) => {
  return (
    <AddCircleArticleDialog circle={circle}>
      {({ openDialog: openAddCircleArticlesDialog }) => (
        <Button
          size={[null, '2rem']}
          spacing={[0, 'tight']}
          textColor="gold"
          textActiveColor="white"
          bgActiveColor="gold"
          borderColor="gold"
          borderWidth="md"
          onClick={openAddCircleArticlesDialog}
          aria-haspopup="dialog"
        >
          <TextIcon icon={<IconPen16 />} weight="md" size="md-s">
            <Translate
              zh_hant="添加作品"
              zh_hans="添加作品"
              en="Add Articles"
            />
          </TextIcon>
        </Button>
      )}
    </AddCircleArticleDialog>
  )
}

export default AddArticlesButton
