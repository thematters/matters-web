import {
  Button,
  ButtonProps,
  IconSize,
  TextIcon,
  Translate,
  useResponsive
} from '~/components'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'

interface LoginButtonBaseProps {
  iconSize?: Extract<IconSize, 'md'>
  isPlain?: boolean
}

type LoginButtonProps = LoginButtonBaseProps &
  Pick<ButtonProps, 'bgColor' | 'size' | 'spacing'>

export const LoginButton: React.FC<LoginButtonProps> = ({
  bgColor,
  iconSize,
  isPlain,
  size,
  spacing
}) => {
  const isSmallUp = useResponsive('sm-up')
  const clickProps = isSmallUp
    ? {
        onClick: () => {
          window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
          window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
        }
      }
    : appendTarget({ ...PATHS.AUTH_LOGIN, fallbackCurrent: true })

  if (isPlain) {
    return (
      <Button aria-haspopup="true" {...clickProps}>
        <Translate id="login" />
      </Button>
    )
  }

  const isGreen = bgColor === 'green'
  const buttonBgActiveColor = isGreen ? undefined : 'grey-lighter'
  const buttonSize = size || [null, '2.25rem']
  const buttonSpacing = spacing || [0, 'loose']
  const textIconColor = isGreen ? 'white' : 'green'
  const textIconSize = iconSize || undefined

  return (
    <Button
      bgColor={bgColor}
      size={buttonSize}
      spacing={buttonSpacing}
      bgActiveColor={buttonBgActiveColor}
      aria-haspopup="true"
      {...clickProps}
    >
      <TextIcon color={textIconColor} size={textIconSize} weight="md">
        <Translate id="login" />
      </TextIcon>
    </Button>
  )
}
