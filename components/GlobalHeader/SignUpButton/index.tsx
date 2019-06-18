import { Button, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

export default () => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => (
      <Button
        is="button"
        size="large"
        bgColor="green"
        style={{ minWidth: '5rem' }}
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_START)
          open()
        }}
      >
        <Translate
          zh_hant={TEXT.zh_hant.register}
          zh_hans={TEXT.zh_hans.register}
        />
      </Button>
    )}
  </ModalSwitch>
)
