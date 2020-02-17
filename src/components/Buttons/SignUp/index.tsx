import { Button, TextIcon } from '~/components'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_SIGNUP_DIALOG
} from '~/common/enums'
import { analytics } from '~/common/utils'

export const SignUpButton: React.FC<{ trackType: string }> = ({
  children,
  trackType
}) => {
  return (
    <Button
      size={[null, '2.25rem']}
      spacing={[0, 'loose']}
      bgColor="green"
      onClick={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
          type: trackType
        })
        window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_DIALOG))
      }}
    >
      <TextIcon color="white" weight="md">
        {children}
      </TextIcon>
    </Button>
  )
}
