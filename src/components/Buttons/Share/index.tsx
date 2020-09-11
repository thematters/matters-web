import {
  Button,
  ButtonProps,
  IconColor,
  IconShare,
  IconSize,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

import { TEXT } from '~/common/enums'

type ShareButtonBaseProps = {
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 'md-s'>
  iconColor?: Extract<IconColor, 'green' | 'grey' | 'black' | 'white'>
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
  const isHalfBlack = bgColor === 'half-black'
  const buttonBgActiveColor =
    isGreen || isHalfBlack
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
          {hasIcon && <IconShare size={iconSize} color={iconColor} />}
          {children}
        </Button>
      )}
    </ShareDialog>
  )
}
