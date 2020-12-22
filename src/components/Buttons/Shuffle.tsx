import {
  Button,
  ButtonProps,
  IconReload12,
  TextIcon,
  TextIconProps,
  Translate,
} from '~/components'

type ShuffleButtonProps = ButtonProps & Pick<TextIconProps, 'color'>

export const ShuffleButton: React.FC<ShuffleButtonProps> = ({
  color,
  ...props
}) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 'xtight']}
    bgActiveColor="grey-lighter"
    {...props}
  >
    <TextIcon
      icon={<IconReload12 size="xs" />}
      color={color || 'grey'}
      size="xs"
      weight="md"
    >
      <Translate id="shuffle" />
    </TextIcon>
  </Button>
)
