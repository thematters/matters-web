import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconColor,
  IconShare24,
  IconSize,
  LanguageContext,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

type ShareButtonBaseProps = {
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 'mdS' | 'md'>
  iconColor?: Extract<IconColor, 'green' | 'grey' | 'black' | 'white'>
  inCard: boolean
} & Omit<ShareDialogProps, 'children'>

type ShareButtonProps = ShareButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing' | 'disabled'>

export const ShareButton: React.FC<
  React.PropsWithChildren<ShareButtonProps>
> = ({
  children,

  bgColor,
  hasIcon = true,
  iconSize,
  iconColor = 'black',
  disabled,
  inCard,
  size,
  spacing,
  ...props
}) => {
  const { lang } = useContext(LanguageContext)

  const isGreen = bgColor === 'green'
  const isHalfBlack = bgColor === 'halfBlack'
  const buttonBgActiveColor =
    isGreen || isHalfBlack
      ? undefined
      : inCard
      ? 'greyLighterActive'
      : 'greyLighter'
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
          disabled={disabled}
        >
          {hasIcon && <IconShare24 size={iconSize} color={iconColor} />}
          {children}
        </Button>
      )}
    </ShareDialog>
  )
}
