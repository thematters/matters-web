import { FormattedMessage } from 'react-intl'

import { Button, ButtonProps, IconArrowRight8, TextIcon } from '~/components'

type ViewAllButtonProps = ButtonProps

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ ...props }) => {
  return (
    <Button
      size={[null, '1.75rem']}
      spacing={[0, 'tight']}
      borderColor="green"
      {...props}
    >
      <TextIcon
        icon={<IconArrowRight8 size="xs" />}
        color="green"
        size="xs"
        weight="md"
        textPlacement="left"
      >
        <FormattedMessage defaultMessage="View All" description="" />
      </TextIcon>
    </Button>
  )
}
