import { FormattedMessage } from 'react-intl'

import { Button, IconPen16, TextIcon } from '~/components'

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
          <TextIcon icon={<IconPen16 />} weight="md" size="mdS">
            <FormattedMessage defaultMessage="Add Articles" />
          </TextIcon>
        </Button>
      )}
    </AddCircleArticleDialog>
  )
}

export default AddArticlesButton
