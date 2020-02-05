import { Button, Icon } from '~/components'

const ReplyButton = ({
  onClick,
  active,
  disabled
}: {
  onClick: () => any
  active: boolean
  disabled: boolean
}) => (
  <Button
    spacing={['xtight', 'xtight']}
    bgHoverColor="grey-lighter"
    onClick={onClick}
    disabled={disabled}
  >
    <Icon.Comment color={active ? 'green' : undefined} />
  </Button>
)

export default ReplyButton
