import { Button, TextIcon } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

const SignUpButton: React.FC<{ trackType: string }> = ({
  children,
  trackType
}) => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => (
      <Button
        size={[null, '2rem']}
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
  </ModalSwitch>
)

export default SignUpButton
