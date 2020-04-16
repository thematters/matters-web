import { Button, TextIcon, Translate, useResponsive } from '~/components'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG,
  PATHS,
} from '~/common/enums'
import { analytics, appendTarget } from '~/common/utils'

interface SignUpButtonProps {
  isPlain?: boolean
  trackType: string
}

export const SignUpButton: React.FC<SignUpButtonProps> = ({
  children,
  isPlain,
  trackType,
}) => {
  const isSmallUp = useResponsive('sm-up')

  const clickProps = isSmallUp
    ? {
        onClick: () => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
            type: trackType,
          })
          window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
          window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_DIALOG))
        },
      }
    : {
        ...appendTarget(PATHS.SIGNUP, true),
        onClick: () => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
            type: trackType,
          })
        },
      }

  if (isPlain) {
    return (
      <Button aria-haspopup="true" {...clickProps}>
        {children}
      </Button>
    )
  }

  return (
    <Button
      bgColor="green"
      size={[null, '2.25rem']}
      spacing={[0, 'loose']}
      aria-haspopup="true"
      {...clickProps}
    >
      <TextIcon color="white" weight="md">
        <Translate id="register" />
      </TextIcon>
    </Button>
  )
}
