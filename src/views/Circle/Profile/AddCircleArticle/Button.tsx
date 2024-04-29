import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPen } from '@/public/static/icons/pen.svg'
import { Button, Icon, TextIcon } from '~/components'

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
          <TextIcon icon={<Icon icon={IconPen} />} weight="md" size="mdS">
            <FormattedMessage defaultMessage="Add Articles" id="k97/u7" />
          </TextIcon>
        </Button>
      )}
    </AddCircleArticleDialog>
  )
}

export default AddArticlesButton
