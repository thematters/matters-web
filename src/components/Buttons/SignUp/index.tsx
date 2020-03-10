import {
  Button,
  ButtonBgColor,
  ButtonHeight,
  ButtonSpacingX,
  ButtonSpacingY,
  ButtonWidth,
  TextIcon,
  useResponsive
} from '~/components'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG,
  PATHS
} from '~/common/enums'
import { analytics, appendTarget } from '~/common/utils'

interface SignUpButtonProps {
  bgColor?: ButtonBgColor | null
  size?: [ButtonWidth, ButtonHeight]
  spacing?: [ButtonSpacingY, ButtonSpacingX]
  textWeight?: 'normal'
  trackType: string
}

export const SignUpButton: React.FC<SignUpButtonProps> = ({
  bgColor = 'green',
  children,
  size,
  spacing,
  textWeight,
  trackType
}) => {
  const isSmallUp = useResponsive('sm-up')

  const clickProps = isSmallUp
    ? {
        onClick: () => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
            type: trackType
          })
          window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
          window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_DIALOG))
        }
      }
    : appendTarget({ ...PATHS.AUTH_SIGNUP, fallbackCurrent: true })

  const isGreen = bgColor === 'green'
  const buttonBgColor = isGreen ? 'green' : undefined
  const buttonSize = size || [null, '2.25rem']
  const buttonSpacing = spacing || [0, 'loose']
  const textIconColor = isGreen ? 'white' : 'green'
  const textIconWeight = textWeight || 'md'

  return (
    <Button
      bgColor={buttonBgColor}
      size={buttonSize}
      spacing={buttonSpacing}
      aria-haspopup="true"
      {...clickProps}
    >
      <TextIcon color={textIconColor} weight={textIconWeight}>
        {children}
      </TextIcon>
    </Button>
  )
}
