import { FormattedMessage } from 'react-intl'

import IconReset from '@/public/static/icons/24px/reset.svg'
import { Button, ButtonProps, Icon, TextIcon } from '~/components'

type ShuffleButtonProps = ButtonProps

export const ShuffleButton: React.FC<ShuffleButtonProps> = ({ ...props }) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 8]}
    textColor="greyDarker"
    textActiveColor="black"
    {...props}
  >
    <TextIcon icon={<Icon icon={IconReset} size={20} />} size={14}>
      <FormattedMessage defaultMessage="Shuffle" id="Pp/0po" />
    </TextIcon>
  </Button>
)
