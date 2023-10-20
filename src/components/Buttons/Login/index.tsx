import { FormattedMessage } from 'react-intl'

import { CLOSE_ACTIVE_DIALOG, OPEN_UNIVERSAL_AUTH_DIALOG } from '~/common/enums'
import { Button, ButtonProps, IconSize, TextIcon } from '~/components'

interface LoginButtonBaseProps {
  iconSize?: Extract<IconSize, 'md'>
}

type LoginButtonProps = LoginButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing' | 'onClick'>

export const LoginButton: React.FC<LoginButtonProps> = ({
  bgColor,
  iconSize,
  size,
  spacing,
  onClick,
}) => {
  const props = {
    onClick: () => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
      onClick?.()
    },
  }

  const isGreen = bgColor === 'green'
  const buttonBgActiveColor = isGreen ? undefined : 'greyLighter'
  const buttonSize = size || [null, '2.25rem']
  const buttonSpacing = spacing || [0, 'loose']
  const textIconColor = isGreen ? 'white' : 'green'
  const textIconSize = iconSize || undefined
  const buttonProps: ButtonProps = {
    bgColor,
    size: buttonSize,
    spacing: buttonSpacing,
    bgActiveColor: buttonBgActiveColor,
  }
  const ButtonText = () => (
    <TextIcon color={textIconColor} size={textIconSize} weight="md">
      <FormattedMessage
        defaultMessage="Log in"
        id="skbUBl"
        description="src/components/Buttons/Login/index.tsx"
      />
    </TextIcon>
  )

  return (
    <>
      <Button aria-haspopup="dialog" {...buttonProps} {...props}>
        <ButtonText />
      </Button>
    </>
  )
}
