import { FormattedMessage } from 'react-intl'

import { IconHashTag16, Menu, TextIcon } from '~/components'

interface AddMyArticlesButtonProps {
  onClick: () => void
}

const AddMyArticlesButton: React.FC<AddMyArticlesButtonProps> = ({
  onClick,
}) => {
  return (
    <Menu.Item onClick={onClick}>
      <TextIcon icon={<IconHashTag16 size="md" />} size="md" spacing="base">
        <FormattedMessage
          defaultMessage="Add Article"
          description="src/views/TagDetail/Buttons/AddButton/AddMyArticlesButton/index.tsx"
        />
      </TextIcon>
    </Menu.Item>
  )
}

export default AddMyArticlesButton
