import { Button, SignUpDialog, TextIcon } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

export const SignUpButton: React.FC<{ trackType: string }> = ({
  children,
  trackType
}) => {
  return (
    <SignUpDialog>
      {({ open }) => (
        <Button
          size={[null, '2.25rem']}
          spacing={[0, 'loose']}
          bgColor="green"
          onClick={() => {
            analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, {
              type: trackType
            })
            open()
          }}
        >
          <TextIcon color="white" weight="md">
            {children}
          </TextIcon>
        </Button>
      )}
    </SignUpDialog>
  )
}
