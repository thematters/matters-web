import {
  Button,
  ButtonProps,
  Icon,
  IconColor,
  IconSize,
  ShareDialog,
  ShareDialogProps
} from '~/components'

import { TEXT } from '~/common/enums'

type ShareButtonBaseProps = {
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 'md-s'>
  iconColor?: Extract<IconColor, 'grey' | 'black'>
  inCard: boolean
} & Omit<ShareDialogProps, 'children'>

type ShareButtonProps = ShareButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing'>

export const ShareButton: React.FC<ShareButtonProps> = ({
  children,

  bgColor,
  hasIcon = true,
  iconSize,
  iconColor = 'black',
  inCard,
  size,
  spacing,
  ...props
}) => {
  const isGreen = bgColor === 'green'
  const buttonBgActiveColor = isGreen
    ? undefined
    : inCard
    ? 'grey-lighter-active'
    : 'grey-lighter'
  const buttonSpacing = spacing || ['xtight', 'xtight']

  return (
    <ShareDialog {...props}>
      {({ open }) => (
        <Button
          bgColor={bgColor}
          size={size}
          spacing={buttonSpacing}
          bgActiveColor={buttonBgActiveColor}
          aria-label={TEXT.zh_hant.share}
          aria-haspopup="true"
          onClick={open}
        >
          {hasIcon && <Icon.Share size={iconSize} color={iconColor} />}
          {children}
        </Button>
      )}
    </ShareDialog>
  )
}
