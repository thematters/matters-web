import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  IconColor,
  IconShare16,
  IconSize,
  LanguageContext,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

import { translate } from '~/common/utils'

type ShareButtonBaseProps = {
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 'md-s'>
  iconColor?: Extract<IconColor, 'green' | 'grey' | 'black' | 'white'>
  inCard: boolean
} & Omit<ShareDialogProps, 'children'>

type ShareButtonProps = ShareButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing'>

export const ShareButton: React.FC<
  React.PropsWithChildren<ShareButtonProps>
> = ({
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
  const { lang } = useContext(LanguageContext)

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
      {({ openDialog }) => (
        <Button
          bgColor={bgColor}
          size={size}
          spacing={buttonSpacing}
          bgActiveColor={buttonBgActiveColor}
          aria-label={translate({ id: 'share', lang })}
          aria-haspopup="dialog"
          onClick={openDialog}
        >
          {hasIcon && <IconShare16 size={iconSize} color={iconColor} />}
          {children}
        </Button>
      )}
    </ShareDialog>
  )
}
