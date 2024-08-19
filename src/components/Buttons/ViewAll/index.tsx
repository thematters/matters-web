import { FormattedMessage } from 'react-intl'

import { Button, ButtonProps, TextIcon } from '~/components'

type ViewAllButtonProps = ButtonProps

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ ...props }) => {
  return (
    <Button
      size={[null, '1.75rem']}
      spacing={[0, 12]}
      borderColor="green"
      borderWidth="sm"
      {...props}
    >
      <TextIcon color="green" size={12} weight="medium" placement="left">
        <FormattedMessage defaultMessage="View All" id="wbcwKd" />
      </TextIcon>
    </Button>
  )
}
