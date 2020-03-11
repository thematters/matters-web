import {
  Button,
  ButtonBgColor,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  Icon,
  IconColor,
  IconSize,
  ShareDialog,
  ShareDialogProps
} from '~/components'

import { TEXT } from '~/common/enums'

type ShareButtonProps = {
  bgColor?: ButtonBgColor
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 'md-s'>
  iconColor?: Extract<IconColor, 'grey' | 'black'>
  inCard: boolean
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacingY, ButtonSpacingX]
} & Omit<ShareDialogProps, 'children'>

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
    : 'green-lighter'
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
