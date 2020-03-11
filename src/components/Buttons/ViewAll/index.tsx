import { Button, ButtonProps, Icon, TextIcon, Translate } from '~/components'

type ViewAllButtonProps = {
  arrowIconDirection?: 'down' | 'right'
} & ButtonProps

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  arrowIconDirection = 'right',
  ...props
}) => {
  const icon =
    arrowIconDirection === 'right' ? (
      <Icon.Right size="xs" />
    ) : (
      <Icon.Down size="xs" />
    )

  return (
    <Button
      size={[null, '1.25rem']}
      spacing={[0, 'xtight']}
      bgColor="grey-lighter"
      {...props}
    >
      <TextIcon
        icon={icon}
        color="grey"
        size="xs"
        weight="md"
        textPlacement="left"
      >
        <Translate id="viewAll" />
      </TextIcon>
    </Button>
  )
}
