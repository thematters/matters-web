import {
  Button,
  ButtonProps,
  IconArrowRight8,
  TextIcon,
  Translate,
} from '~/components'

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
        <Translate id="viewAll" />
      </TextIcon>
    </Button>
  )
}
