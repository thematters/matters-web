import { Button, TextIcon, useResponsive } from '~/components'
import { Translate } from '~/components/Language'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG,
  PATHS
} from '~/common/enums'
import { analytics, appendTarget } from '~/common/utils'

interface SignUpButtonProps {
  trackType: string
}

export const SignUpButton: React.FC<SignUpButtonProps> = ({ trackType }) => {
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
    : {
        ...appendTarget({ ...PATHS.AUTH_SIGNUP, fallbackCurrent: true }),
        onClick: () => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
            type: trackType
          })
        }
      }

  return (
    <Button
      size={[null, '2.25rem']}
      spacing={[0, 'loose']}
      bgColor="green"
      aria-haspopup="true"
      {...clickProps}
    >
      <TextIcon color="white" weight="md">
        <Translate id="register" />
      </TextIcon>
    </Button>
  )
}
