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
} & Omit<ShareDialogProps, 'children'>

export const ShareButton: React.FC<ShareButtonProps> = ({
  size,
  color = 'black',
  ...props
}) => (
  <ShareDialog {...props}>
    {({ open }) => (
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor="grey-lighter"
        aria-label={TEXT.zh_hant.share}
        aria-haspopup="true"
        onClick={open}
      >
        <Icon.Share size={size} color={color} />
      </Button>
    )}
  </ShareDialog>
)
