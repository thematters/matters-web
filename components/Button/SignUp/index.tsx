import { Button } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

export default ({ children, extraStyle, type }: any) => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => (
      <Button
        is="button"
        size="large"
        bgColor="green"
        style={extraStyle}
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START, { type })
          open()
        }}
      >
        {children}
      </Button>
    )}
  </ModalSwitch>
)
