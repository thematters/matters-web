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
    spacing={[0, 8]}
    textColor="greyDarker"
    textActiveColor="black"
    {...props}
  >
    <TextIcon
      icon={<Icon icon={IconReset} size={20} />}
      size={14}
      weight="medium"
    >
      <FormattedMessage defaultMessage="Shuffle" id="Pp/0po" />
    </TextIcon>
  </Button>
)
