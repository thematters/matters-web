import {
  Button,
  Icon,
  IconColor,
  IconSize,
  ShareDialog,
  ShareDialogProps
} from '~/components'

import { TEXT } from '~/common/enums'

type ShareButtonProps = {
  size?: Extract<IconSize, 'md-s'>
  color?: Extract<IconColor, 'grey' | 'black'>
  inCard: boolean
} & Omit<ShareDialogProps, 'children'>

export const ShareButton: React.FC<ShareButtonProps> = ({
  size,
  color = 'black',
  inCard,
  ...props
}) => (
  <ShareDialog {...props}>
    {({ open }) => (
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor={inCard ? 'grey-lighter-active' : 'green-lighter'}
        aria-label={TEXT.zh_hant.share}
        aria-haspopup="true"
        onClick={open}
      >
        <Icon.Share size={size} color={color} />
      </Button>
    )}
  </ShareDialog>
)
