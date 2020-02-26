import { Button, TextIcon, useResponsive } from '~/components'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG,
  PATHS
} from '~/common/enums'
import { analytics, appendTarget } from '~/common/utils'

export const SignUpButton: React.FC<{ trackType: string }> = ({
  children,
  trackType
}) => {
  const isSmallUp = useResponsive({ type: 'sm-up' })()

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

  return (
    <Button
      size={[null, '2.25rem']}
      spacing={[0, 'loose']}
      bgColor="green"
      {...clickProps}
    >
      <TextIcon color="white" weight="md">
        {children}
      </TextIcon>
    </Button>
  )
}
