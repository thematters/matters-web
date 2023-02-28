import { FormattedMessage } from 'react-intl'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
} from '~/common/enums'
import { appendTarget } from '~/common/utils'
import { Button, ButtonProps, IconSize, Media, TextIcon } from '~/components'

interface LoginButtonBaseProps {
  iconSize?: Extract<IconSize, 'md'>
  isPlain?: boolean
}

type LoginButtonProps = LoginButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing' | 'onClick'>

export const LoginButton: React.FC<LoginButtonProps> = ({
  bgColor,
  iconSize,
  isPlain,
  size,
  spacing,
  onClick,
}) => {
  const smUpProps = {
    onClick: () => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
      onClick?.()
    },
  }
  const smProps = appendTarget(PATHS.LOGIN, true)

  if (isPlain) {
    return (
      <>
        <Media at="sm">
          <Button {...smProps}>
            <FormattedMessage
              defaultMessage="Log in"
              description="src/components/Buttons/Login/index.tsx"
            />
          </Button>
        </Media>
        <Media greaterThan="sm">
          <Button aria-haspopup="dialog" {...smUpProps}>
            <FormattedMessage
              defaultMessage="Log in"
              description="src/components/Buttons/Login/index.tsx"
            />
          </Button>
        </Media>
      </>
    )
  }

  const isGreen = bgColor === 'green'
  const buttonBgActiveColor = isGreen ? undefined : 'grey-lighter'
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
        description="src/components/Buttons/Login/index.tsx"
      />
    </TextIcon>
  )

  return (
    <>
      <Media at="sm">
        <Button {...buttonProps} {...smProps}>
          <ButtonText />
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button aria-haspopup="dialog" {...buttonProps} {...smUpProps}>
          <ButtonText />
        </Button>
      </Media>
    </>
  )
}
