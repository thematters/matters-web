import IconReset from '@/public/static/icons/24px/reset.svg'
import { Button, ButtonProps, Icon } from '~/components'

type ShuffleButtonProps = ButtonProps

export const ShuffleButton: React.FC<ShuffleButtonProps> = ({ ...props }) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 8]}
    textColor="greyDarker"
    textActiveColor="black"
    {...props}
  >
    <Icon icon={IconReset} size={20} />
  </Button>
)
