import {
  Button,
  IconPen16,
  TextIcon,
  Translate,
  useFeatures,
} from '~/components'

import AddCircleArticleDialog from './Dialog'

interface AddArticlesButtonProps {
  circle: { id: string; name: string }
}

const AddArticlesButton = ({ circle }: AddArticlesButtonProps) => {
  const features = useFeatures()

  if (!features.circle_management) {
    return null
  }

  return (
    <AddCircleArticleDialog circle={circle}>
      {({ open: openAddCircleArticlesDialog }) => (
        <Button
          size={['7rem', '2rem']}
          textColor="gold"
          textActiveColor="white"
          bgActiveColor="gold"
          borderColor="gold"
          borderWidth="md"
          onClick={openAddCircleArticlesDialog}
          aria-haspopup="true"
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
