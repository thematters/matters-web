import { Button, Icon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

interface Props {
  allowed: boolean
}

export default ({ allowed }: Props) => (
  <ModalSwitch modalId={allowed ? 'publishModal' : 'likeCoinTermModal'}>
    {(open: any) => (
      <Button
        size="lg"
        bgColor="green"
        icon={<Icon.Write size="md" />}
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_PUBLISH_BUTTON)
          open()
        }}
      >
        <Translate zh_hant="發佈" zh_hans="发布" />
      </Button>
    )}
  </ModalSwitch>
)
