import { Button, Icon } from '~/components'

const ReplyButton = ({
  onClick,
  disabled
}: {
  onClick: () => any
  disabled: boolean
}) => (
  <Button
    spacing={['xtight', 'xtight']}
    bgHoverColor="grey-lighter"
    onClick={onClick}
    disabled={disabled}
    aira-label="回覆評論"
  >
    <Icon.Comment />
  </Button>
)

export default ReplyButton
