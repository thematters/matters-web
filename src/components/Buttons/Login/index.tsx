import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, ButtonProps, IconSize, TextIcon } from '~/components'

interface LoginButtonBaseProps {
  iconSize?: Extract<IconSize, 24>
  resideIn?: 'visitorWall' | 'migration'
}

type LoginButtonProps = LoginButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing' | 'onClick'>

export const LoginButton: React.FC<LoginButtonProps> = ({
  bgColor,
  iconSize,
  size,
  spacing,
  onClick,
  resideIn,
}) => {
  const props = {
    onClick: () => {
      // deprecated
      // window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          ...(resideIn
            ? { detail: { trigger: UNIVERSAL_AUTH_TRIGGER[resideIn] } }
            : {}),
        })
      )
      onClick?.()
    },
  }

  const isGreen = bgColor === 'green'
  const buttonBgActiveColor = isGreen ? undefined : 'greyLighter'
  const buttonSize = size || [null, '2.25rem']
  const buttonSpacing = spacing || [0, 24]
  const textIconColor = isGreen ? 'white' : 'green'
  const textIconSize = iconSize || undefined
  const buttonProps: ButtonProps = {
    bgColor,
    size: buttonSize,
    spacing: buttonSpacing,
    bgActiveColor: buttonBgActiveColor,
  }

  return (
    <Button aria-haspopup="dialog" {...buttonProps} {...props}>
      <TextIcon color={textIconColor} size={textIconSize} weight="medium">
        <FormattedMessage
          defaultMessage="Log in"
          id="skbUBl"
          description="src/components/Buttons/Login/index.tsx"
        />
      </TextIcon>
    </Button>
  )
}
