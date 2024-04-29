import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconReset } from '@/public/static/icons/24px/reset.svg'
import {
  Button,
  ButtonProps,
  Icon,
  TextIcon,
  TextIconProps,
} from '~/components'

type ShuffleButtonProps = ButtonProps & Pick<TextIconProps, 'color'>

export const ShuffleButton: React.FC<ShuffleButtonProps> = ({
  color,
  ...props
}) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 'xtight']}
    bgActiveColor="greyLighter"
    {...props}
  >
    <TextIcon
      icon={<Icon icon={IconReset} size="xs" />}
      color={color || 'grey'}
      size="xs"
      weight="md"
    >
      <FormattedMessage defaultMessage="Shuffle" id="Pp/0po" />
    </TextIcon>
  </Button>
)
