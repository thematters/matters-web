import { FormattedMessage } from 'react-intl'

import { Button, ButtonProps, TextIcon } from '~/components'

type ViewAllButtonProps = ButtonProps

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ ...props }) => {
  return (
    <Button
      size={[null, '1.75rem']}
      spacing={[0, 'tight']}
      borderColor="green"
      borderWidth="sm"
      {...props}
    >
      <TextIcon color="green" size="xs" weight="md" textPlacement="left">
        <FormattedMessage defaultMessage="View All" />
      </TextIcon>
    </Button>
  )
}
